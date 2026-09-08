import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID Kursus (courseId) diperlukan'
    })
  }

  const courseId = body.courseId
  const isReady = body.isReady !== undefined ? Boolean(body.isReady) : true

  try {
    const existing = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!existing) {
      // If course is only in memory/default, upsert to database with isReady status
      const created = await prisma.course.create({
        data: {
          id: courseId,
          title: body.title || 'Modul Pembelajaran',
          description: body.description || '',
          targetAudience: 'Semua Siswa',
          category: 'math',
          icon: '⭐',
          themeColor: 'purple',
          features: ['Kuis Interaktif'],
          isReady: isReady,
          units: []
        }
      })

      return {
        success: true,
        message: `Status publikasi kursus '${courseId}' berhasil diubah menjadi ${isReady ? '🟢 AKTIF' : '⚪ NONAKTIF'}`,
        isReady: created.isReady,
        courseId: created.id
      }
    }

    const updated = await prisma.course.update({
      where: { id: courseId },
      data: {
        isReady: isReady
      }
    })

    console.log(`[POSTGRESQL ADMIN] Course '${courseId}' status updated: isReady = ${isReady}`)

    return {
      success: true,
      message: `Status kursus '${updated.title}' berhasil diubah menjadi ${isReady ? '🟢 AKTIF (Tampil di Katalog)' : '⚪ NONAKTIF (Sembunyi dari Katalog)'}!`,
      courseId: updated.id,
      isReady: updated.isReady
    }
  } catch (error: any) {
    console.error('[POSTGRESQL ADMIN] Error toggling course status:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal mengubah status aktif kursus di database: ${error.message}`
    })
  }
})
