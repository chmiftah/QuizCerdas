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
  const isPro = Boolean(c.isPro)

  let rawFeatures: any = c.features
  if (Array.isArray(rawFeatures)) {
    rawFeatures = rawFeatures.filter((f: any) => f !== 'pro_access')
    if (isPro) rawFeatures.push('pro_access')
  } else if (rawFeatures && typeof rawFeatures === 'object') {
    rawFeatures.isPro = isPro
  } else {
    rawFeatures = isPro ? ['pro_access'] : ['Kuis Interaktif']
  }

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
        features: rawFeatures,
        isReady: c.isReady !== undefined ? Boolean(c.isReady) : true,
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
        features: rawFeatures,
        isReady: c.isReady !== undefined ? Boolean(c.isReady) : true,
        units: c.units || []
      }
    })

    console.log(`[POSTGRESQL ADMIN] Saved course '${savedCourse.id}' (${savedCourse.title}) [isPro: ${isPro}] to database`)

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
