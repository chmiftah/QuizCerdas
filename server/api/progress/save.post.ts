import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.userId && !body.email) {
    return {
      success: true,
      message: 'Progres disimpan di memori lokal (Tamu)'
    }
  }

  try {
    const updatedUser = await prisma.user.updateMany({
      where: {
        OR: [
          ...(body.userId ? [{ id: body.userId }] : []),
          ...(body.email ? [{ email: body.email }] : [])
        ]
      },
      data: {
        xp: body.xp,
        hearts: body.hearts,
        streak: body.streak,
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
