import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate session token for logged-in users
  const token = getCookie(event, 'auth_session')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid. Silakan login kembali.'
    })
  }

  const session = validateSessionToken(token)
  if (!session) {
    deleteCookie(event, 'auth_session')
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid atau sudah kadaluarsa. Silakan login kembali.'
    })
  }

  // Validate that the user is authorized to update their own data
  if (body.userId && body.userId !== session.userId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Tidak diizinkan mengakses data pengguna lain.'
    })
  }

  // Use session data as source of truth, ignore client-provided userId/email
  const userId = session.userId
  const email = session.email

  // Validate data constraints before saving
  const maxHearts = 5
  const validatedHearts = Math.min(Math.max(0, body.hearts || 0), maxHearts)
  const validatedXp = Math.max(0, body.xp || 0)
  const validatedStreak = Math.max(0, body.streak || 0)

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: validatedXp,
        hearts: validatedHearts,
        streak: validatedStreak,
        completedLessonsByCourse: body.completedLessonsByCourse || {},
        completedCheckpointsByCourse: body.completedCheckpointsByCourse || {}
      }
    })

    // Log progress entry if specific lesson was completed
    if (body.lastCompletedLessonId && body.userId) {
      await prisma.progressLog.create({
        data: {
          userId: body.userId,
          courseId: body.courseId || 'counting_101',
          lessonId: body.lastCompletedLessonId,
          xpEarned: body.xpEarned || 20,
          status: 'completed'
        }
      }).catch(() => {})
    }

    // Log progress entry if specific checkpoint was completed
    if (body.lastCompletedCheckpointId && body.userId) {
      await prisma.progressLog.create({
        data: {
          userId: body.userId,
          courseId: body.courseId || 'counting_101',
          lessonId: body.lastCompletedCheckpointId,
          xpEarned: body.xpEarned || 50,
          status: 'checkpoint_completed'
        }
      }).catch(() => {})
    }

    console.log(`[POSTGRESQL] Progress saved for user ${body.userId || body.email}: XP ${body.xp}`)

    return {
      success: true,
      message: 'Progres berhasil disimpan ke PostgreSQL database',
      updatedCount: updatedUser.count
    }
  } catch (error: any) {
    console.warn('[POSTGRESQL] Progress save DB fallback:', error.message)
    return {
      success: true,
      isFallback: true,
      message: 'Progres tersimpan di lokal storage'
    }
  }
})
