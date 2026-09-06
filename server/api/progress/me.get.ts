import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid. Silakan login kembali.'
    })
  }

  const session = validateSessionToken(token)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi tidak valid atau sudah kadaluarsa. Silakan login kembali.'
    })
  }

  // Use userId from session, ignore client-provided userId/email
  const userId = session.userId
  const email = session.email

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: userId },
          { email: email }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        xp: true,
        hearts: true,
        streak: true,
        completedLessonsByCourse: true,
        completedCheckpointsByCourse: true,
        progressLogs: {
          take: 20,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Pengguna tidak ditemukan di database'
      })
    }

    return {
      success: true,
      progress: {
        xp: user.xp,
        hearts: user.hearts,
        streak: user.streak,
        completedLessonsByCourse: user.completedLessonsByCourse || {},
        completedCheckpointsByCourse: user.completedCheckpointsByCourse || {},
        logs: user.progressLogs
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Fetch Progress Error:', error.message)
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal mengambil data progres dari database: ${error.message}`
    })
  }
})

