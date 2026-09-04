import prisma from '~/server/utils/prisma'
import mengenalAngkaTk from '~/data/course_mengenal_angka_tk.json'
import courseCounting from '~/data/course_counting.json'
import courseBerhitungTk01 from '~/data/course_berhitung_tk_01.json'
import courseHewanTkSd from '~/data/course_hewan_tk_sd.json'

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
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        target_audience: course.targetAudience,
        units: course.units
      }
    }
  } catch (error: any) {
    console.warn('[POSTGRESQL] Fetch course by ID error, checking local fallback:', error.message)
  }

  // Fallback to local files
  if (courseId === 'course_hewan_tk_sd') {
    return courseHewanTkSd.course
  }
  if (courseId === 'course_berhitung_tk_01') {
    return courseBerhitungTk01.course
  }
  if (courseId === 'mengenal_angka_tk') {
    return mengenalAngkaTk.course
  }
  if (courseId === 'counting_101') {
    return courseCounting.course
  }

  throw createError({
    statusCode: 404,
    statusMessage: `Modul "${courseId}" tidak ditemukan`
  })
})
