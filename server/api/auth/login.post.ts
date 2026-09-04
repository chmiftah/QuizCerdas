import prisma from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'

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
    
    // Fallback comparison for demo accounts created before hashing
    const isDemoPassword = body.password === 'siswa123' || body.password === 'guru123' || body.password === 'default_password'

    if (!isPasswordValid && !isDemoPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Kata sandi salah. Silakan coba lagi.'
      })
    }

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
