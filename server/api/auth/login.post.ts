import prisma from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'
import { createSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email/Username dan kata sandi wajib diisi'
    })
  }

  const inputIdentifier = body.email.trim().toLowerCase()

  try {
    // Search user by email or username in PostgreSQL
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: inputIdentifier },
          { username: inputIdentifier }
        ]
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Akun tidak ditemukan di database. Silakan periksa kembali email/username atau daftar akun baru.'
      })
    }

    // Compare bcrypt password
    const isPasswordValid = await bcrypt.compare(body.password, user.password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Kata sandi salah. Silakan coba lagi.'
      })
    }

    // Generate secure session token
    const token = createSessionToken(user.id, user.email)

    // Set secure HTTP-only cookie
    setCookie(event, 'auth_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 1 day
    })

    console.log(`[POSTGRESQL] User logged in: ${user.email} (ID: ${user.id})`)

    return {
      success: true,
      message: 'Berhasil masuk ke akun!',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        grade: user.grade,
        role: user.role || 'student',
        subscriptionTier: user.subscriptionTier || 'FREE',
        subscriptionExpiresAt: user.subscriptionExpiresAt ? user.subscriptionExpiresAt.toISOString() : null,
        dailyGoalMinutes: user.dailyGoalMinutes,
        xp: user.xp,
        hearts: user.hearts,
        streak: user.streak,
        completedLessonsByCourse: user.completedLessonsByCourse || {},
        completedCheckpointsByCourse: user.completedCheckpointsByCourse || {}
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Prisma Login Error:', error.message)
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: `Gagal autentikasi database: ${error.message}`
    })
  }
})
