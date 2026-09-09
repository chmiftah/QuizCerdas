import prisma from '~/server/utils/prisma'
import mengenalAngkaTk from '~/data/course_mengenal_angka_tk.json'
import courseCounting from '~/data/course_counting.json'
import courseBerhitungTk01 from '~/data/course_berhitung_tk_01.json'
import courseHewanTkSd from '~/data/course_hewan_tk_sd.json'
import course24Types1Unit from '~/data/course_24_types_1unit.json'
import coursePenjumlahanBuah from '~/data/course_penjumlahan_buah.json'

export default defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, 'id')

  if (!courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID modul pembelajaran wajib diisi'
    })
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (course) {
      const isPro = Array.isArray(course.features)
        ? (course.features as any[]).includes('pro_access')
        : Boolean((course.features as any)?.isPro)

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        target_audience: course.targetAudience,
        category: course.category || 'math',
        icon: course.icon || '⭐',
        themeColor: course.themeColor || 'green',
        isPro: isPro,
        units: course.units
      }
    }
  } catch (error: any) {
    console.warn('[POSTGRESQL] Fetch course by ID error, checking local fallback:', error.message)
  }

  // Fallback to local files if database is unreachable or offline
  if (courseId === 'course_24_types_1unit') {
    return {
      ...course24Types1Unit.course,
      isPro: true,
      category: 'math',
      icon: '🏆',
      themeColor: 'green'
    }
  }
  if (courseId === 'course_penjumlahan_buah') {
    return {
      ...coursePenjumlahanBuah.course,
      isPro: true,
      category: 'math',
      icon: '🍎',
      themeColor: 'emerald'
    }
  }
  if (courseId === 'course_hewan_tk_sd') {
    return {
      ...courseHewanTkSd.course,
      category: 'science',
      icon: '🦁',
      themeColor: 'amber'
    }
  }
  if (courseId === 'course_berhitung_tk_01') {
    return {
      ...courseBerhitungTk01.course,
      category: 'math',
      icon: '⭐',
      themeColor: 'blue'
    }
  }
  if (courseId === 'mengenal_angka_tk') {
    return {
      ...mengenalAngkaTk.course,
      category: 'math',
      icon: '🎨',
      themeColor: 'sky'
    }
  }
  if (courseId === 'counting_101') {
    return {
      ...courseCounting.course,
      category: 'math',
      icon: '🔢',
      themeColor: 'green'
    }
  }

  throw createError({
    statusCode: 404,
    statusMessage: `Modul "${courseId}" tidak ditemukan`
  })
})
