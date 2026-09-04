import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.course || !body.course.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Data JSON kursus tidak valid. Wajib memiliki field "course" dan "id".'
    })
  }

  const c = body.course

  try {
    const savedCourse = await prisma.course.upsert({
      where: { id: c.id },
      update: {
        title: c.title || 'Judul Kuis Baru',
        description: c.description || '',
        targetAudience: c.target_audience || 'Anak TK & SD Kelas 1',
        category: c.category || 'math',
        icon: c.icon || '🔢',
        themeColor: c.themeColor || 'purple',
        features: c.features || ['7 Jenis Soal Interaktif', 'Jawab Suara 🎤'],
        units: c.units || []
      },
      create: {
        id: c.id,
        title: c.title || 'Judul Kuis Baru',
        description: c.description || '',
        targetAudience: c.target_audience || 'Anak TK & SD Kelas 1',
        category: c.category || 'math',
        icon: c.icon || '🔢',
        themeColor: c.themeColor || 'purple',
        features: c.features || ['7 Jenis Soal Interaktif', 'Jawab Suara 🎤'],
        isReady: true,
        units: c.units || []
      }
    })

    console.log(`[POSTGRESQL ADMIN] Saved course '${savedCourse.id}' (${savedCourse.title}) to database`)

    return {
      success: true,
      message: `Berhasil menyimpan kursus '${savedCourse.title}' ke database PostgreSQL!`,
      course: savedCourse
    }
  } catch (error: any) {
    console.error('[POSTGRESQL ADMIN] Course save error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal menyimpan kursus ke database: ${error.message}`
    })
  }
})
