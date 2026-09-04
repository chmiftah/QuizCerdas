import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'courseId wajib disertakan.'
    })
  }

  const { courseId } = body

  try {
    await prisma.course.delete({
      where: { id: courseId }
    })

    console.log(`[POSTGRESQL ADMIN] Deleted course '${courseId}' from database`)

    return {
      success: true,
      message: `Kursus dengan ID '${courseId}' berhasil dihapus dari database.`
    }
  } catch (error: any) {
    // P2025 = record not found
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: `Kursus dengan ID '${courseId}' tidak ditemukan di database.`
      })
    }
    console.error('[POSTGRESQL ADMIN] Course delete error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal menghapus kursus: ${error.message}`
    })
  }
})
