import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId as string
  const email = query.email as string

  if (!userId && !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parameter userId atau email wajib disertakan'
    })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(userId ? [{ id: userId }] : []),
          ...(email ? [{ email: email }] : [])
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
