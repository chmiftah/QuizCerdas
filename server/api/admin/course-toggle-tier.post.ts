import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  const body = await readBody(event)

  if (!body || !body.courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID Kursus (courseId) diperlukan'
    })
  }

  const courseId = body.courseId
  const isPro = Boolean(body.isPro)

  try {
    const existing = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!existing) {
      // If course is currently only in memory/default, upsert basic record
      const defaultFeatures = isPro ? ['Kuis Interaktif', 'pro_access'] : ['Kuis Interaktif']
      const created = await prisma.course.create({
        data: {
          id: courseId,
          title: body.title || 'Modul Pembelajaran',
          description: body.description || '',
          targetAudience: 'Semua Siswa',
          category: 'math',
          icon: '⭐',
          themeColor: 'purple',
          features: defaultFeatures,
          units: []
        }
      })

      return {
        success: true,
        message: `Status kursus '${courseId}' diatur ke ${isPro ? '👑 PRO' : '🐣 GRATIS'}`,
        isPro: isPro,
        courseId: created.id
      }
    }

    // Process features to include or remove 'pro_access'
    let rawFeatures: any = existing.features
    let updatedFeatures: any[] = []

    if (Array.isArray(rawFeatures)) {
      updatedFeatures = rawFeatures.filter((f: any) => f !== 'pro_access')
      if (isPro) {
        updatedFeatures.push('pro_access')
      }
    } else if (rawFeatures && typeof rawFeatures === 'object') {
      rawFeatures.isPro = isPro
      updatedFeatures = rawFeatures
    } else {
      updatedFeatures = isPro ? ['pro_access'] : ['Kuis Interaktif']
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        features: updatedFeatures
      }
    })

    console.log(`[POSTGRESQL ADMIN] Course '${courseId}' tier changed to ${isPro ? 'PRO' : 'FREE'}`)

    return {
      success: true,
      message: `Status kursus '${updatedCourse.title}' berhasil diubah menjadi ${isPro ? '👑 PRO' : '🐣 GRATIS'}!`,
      courseId: updatedCourse.id,
      isPro: isPro
    }
  } catch (error: any) {
    console.error('[POSTGRESQL ADMIN] Error toggling course tier:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal mengubah status kursus di database: ${error.message}`
    })
  }
})
