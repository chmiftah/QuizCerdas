import prisma from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'
import { createSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.name || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nama lengkap, email, dan kata sandi wajib diisi'
    })
  }

  const username = (body.username || body.name.toLowerCase().replace(/\s+/g, '')).trim()
  const email = body.email.toLowerCase().trim()

  try {
    // Check existing email or username in PostgreSQL
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    })

    if (existingUser) {
      if (existingUser.email === email) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Email sudah terdaftar di database. Silakan gunakan email lain atau login.'
        })
      }
      throw createError({
        statusCode: 400,
        statusMessage: 'Username sudah digunakan di database. Silakan pilih username lain.'
      })
    }

    // Hash password securely with bcrypt
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Save directly to PostgreSQL users table via Prisma
    const newUser = await prisma.user.create({
      data: {
        name: body.name.trim(),
        username: username,
        email: email,
        password: hashedPassword,
        avatar: body.avatar || '🦉',
        grade: body.grade || 'Kelas 1 SD',
        dailyGoalMinutes: body.dailyGoalMinutes ? Number(body.dailyGoalMinutes) : 10,
        xp: 50, // Registration 50 XP bonus!
        hearts: 5,
        streak: 1
      }
    })

    // Generate secure session token for auto-login after registration
    const token = createSessionToken(newUser.id, newUser.email)

    // Set secure HTTP-only cookie
    setCookie(event, 'auth_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 1 day
    })

    console.log(`[POSTGRESQL] User registered successfully: ${newUser.email} (ID: ${newUser.id})`)

    return {
      success: true,
      message: 'Registrasi akun ke database berhasil!',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        grade: newUser.grade,
        role: newUser.role || 'student',
        dailyGoalMinutes: newUser.dailyGoalMinutes,
        xp: newUser.xp,
        hearts: newUser.hearts,
        streak: newUser.streak,
        completedLessonsByCourse: {},
        completedCheckpointsByCourse: {}
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Prisma Register Error:', error.message)
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: `Gagal menyimpan akun ke database: ${error.message}`
    })
  }
})
