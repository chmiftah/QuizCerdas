import prisma from './prisma'
import courseCountingData from '../../data/course_counting.json'
import courseAngkaTkData from '../../data/course_mengenal_angka_tk.json'
import courseHewanTkSdData from '../../data/course_hewan_tk_sd.json'
import courseBerhitungTk01Data from '../../data/course_berhitung_tk_01.json'

export async function seedCoursesIfEmpty(force = false) {
  try {
    if (!force) {
      const existingCount = await prisma.course.count()
      if (existingCount >= 4) {
        return
      }
    }

    console.log('[POSTGRESQL] Seeding course catalog & quiz questions into database...')

    const coursesToSeed = [
      {
        id: 'counting_101',
        title: courseCountingData.course.title,
        description: courseCountingData.course.description,
        targetAudience: courseCountingData.course.target_audience,
        category: 'math',
        icon: '🔢',
        themeColor: 'green',
        features: ['🖐️ Berhitung Jari', '🔟 Ten Frame Grid', '👑 Checkpoint Test'],
        isReady: true,
        units: courseCountingData.course.units
      },
      {
        id: 'mengenal_angka_tk',
        title: courseAngkaTkData.course.title,
        description: courseAngkaTkData.course.description,
        targetAudience: courseAngkaTkData.course.target_audience,
        category: 'math',
        icon: '🎈',
        themeColor: 'sky',
        features: ['🐥 Hitung Benda', '⭐ Pasang Angka', '🎯 Ujian TK'],
        isReady: true,
        units: courseAngkaTkData.course.units
      },
      {
        id: 'course_hewan_tk_sd',
        title: courseHewanTkSdData.course.title,
        description: courseHewanTkSdData.course.description,
        targetAudience: courseHewanTkSdData.course.target_audience,
        category: 'science',
        icon: '🦁',
        themeColor: 'amber',
        features: ['5 Unit Tematik Hewan', 'Suara & Habitat Hewan', 'Permainan Cari & Pasangkan'],
        isReady: true,
        units: courseHewanTkSdData.course.units
      },
      {
        id: 'course_berhitung_tk_01',
        title: courseBerhitungTk01Data.course.title,
        description: courseBerhitungTk01Data.course.description,
        targetAudience: courseBerhitungTk01Data.course.target_audience,
        category: 'math',
        icon: '🍎',
        themeColor: 'blue',
        features: ['Mengenal Angka 1-5', 'Perbandingan & Urutan', 'Permainan Interaktif'],
        isReady: true,
        units: courseBerhitungTk01Data.course.units
      }
    ]

    for (const courseData of coursesToSeed) {
      await prisma.course.upsert({
        where: { id: courseData.id },
        update: {
          title: courseData.title,
          description: courseData.description,
          targetAudience: courseData.targetAudience,
          category: courseData.category,
          icon: courseData.icon,
          themeColor: courseData.themeColor,
          features: courseData.features,
          isReady: courseData.isReady,
          units: courseData.units
        },
        create: {
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          targetAudience: courseData.targetAudience,
          category: courseData.category,
          icon: courseData.icon,
          themeColor: courseData.themeColor,
          features: courseData.features,
          isReady: courseData.isReady,
          units: courseData.units
        }
      })
    }

    console.log('[POSTGRESQL] Successfully seeded all courses & quiz questions!')
  } catch (error: any) {
    console.warn('[POSTGRESQL] Course database seeding warning:', error.message)
  }
}
