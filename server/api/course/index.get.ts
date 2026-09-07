import prisma from '~/server/utils/prisma'
import mengenalAngkaTk from '~/data/course_mengenal_angka_tk.json'
import courseCounting from '~/data/course_counting.json'
import courseBerhitungTk01 from '~/data/course_berhitung_tk_01.json'
import courseHewanTkSd from '~/data/course_hewan_tk_sd.json'
import course24Types1Unit from '~/data/course_24_types_1unit.json'
import coursePenjumlahanBuah from '~/data/course_penjumlahan_buah.json'

const defaultCourses = [
  {
    id: 'course_24_types_1unit',
    title: '🏆 Modul 1 Unit: 29 Jenis Soal Lengkap',
    description: 'Kursus 1 Unit yang menyajikan seluruh 29 jenis tipe soal interaktif secara lengkap dalam satu jalur belajar petualangan.',
    target_audience: 'Anak TK & SD (4-9 tahun)',
    category: 'math',
    icon: '🏆',
    themeColor: 'green',
    features: ['1 Unit Praktis', '29 Jenis Soal Lengkap', 'Membaca Nyaring 📖', 'Marathon & Sesi Bertahap'],
    isReady: true,
    courseData: course24Types1Unit.course
  },
  {
    id: 'course_hewan_tk_sd',
    title: 'Petualangan Dunia Hewan',
    description: 'Mari bermain dan belajar mengenal berbagai macam hewan di sekitar kita, dari hewan peliharaan yang lucu hingga hewan liar di hutan!',
    target_audience: 'Anak TK & SD Kelas 1 (5-7 tahun)',
    category: 'science',
    icon: '🦁',
    themeColor: 'amber',
    features: ['5 Unit Tematik Hewan', 'Suara & Habitat Hewan', 'Permainan Cari & Pasangkan'],
    isReady: true,
    courseData: courseHewanTkSd.course
  },
  {
    id: 'course_berhitung_tk_01',
    title: 'Mengenal Angka 1-5 & Berhitung Ceria',
    description: 'Petualangan seru belajar angka 1 sampai 5 untuk anak usia taman kanak-kanak dengan berbagai permainan interaktif!',
    target_audience: 'Anak TK (4-6 tahun)',
    category: 'math',
    icon: '⭐',
    themeColor: 'blue',
    features: ['Fitur 9 Jenis Soal Interaktif', 'Petunjuk Kiko 💡', 'Tebak Pola & Perbandingan'],
    isReady: true,
    courseData: courseBerhitungTk01.course
  },
  {
    id: 'mengenal_angka_tk',
    title: 'Petualangan Angka Ceria (TK/PAUD)',
    description: 'Modul lengkap mengenal angka 1-10, berhitung, urutan, perbandingan & pola gambar untuk anak TK!',
    target_audience: 'Anak TK (4-6 tahun)',
    category: 'math',
    icon: '🎨',
    themeColor: 'sky',
    features: ['9 Jenis Soal Interaktif', 'Jawab Lewat Suara 🎤', 'Menjiplak Angka ✏️', 'Game Balon 🎈'],
    isReady: true,
    courseData: mengenalAngkaTk.course
  },
  {
    id: 'counting_101',
    title: 'Dasar Berhitung SD Class 1',
    description: 'Latihan berhitung tingkat dasar untuk SD kelas 1.',
    target_audience: 'SD Kelas 1',
    category: 'math',
    icon: '🔢',
    themeColor: 'green',
    features: ['Penjumlahan dasar', 'Kurang tambah'],
    isReady: true,
    courseData: courseCounting.course
  },
  {
    id: 'course_penjumlahan_buah',
    title: 'Penjumlahan Seru dengan Buah-buahan',
    description: 'Belajar penjumlahan 1-20 menggunakan gambar buah-buahan yang menyenangkan! Diadaptasi dari worksheet LembarKerja.com.',
    target_audience: 'Anak TK B & SD Kelas 1 (5-7 tahun)',
    category: 'math',
    icon: '🍎',
    themeColor: 'emerald',
    features: ['10 Soal dari Worksheet Nyata', 'Penjumlahan Bergambar Buah', '3 Pelajaran Bertingkat', 'Ujian Akhir'],
    isReady: true,
    courseData: coursePenjumlahanBuah.course
  }
]

export default defineEventHandler(async (event) => {
  try {
    const dbCourses = await prisma.course.findMany({
      orderBy: { createdAt: 'asc' }
    })

    if (dbCourses && dbCourses.length > 0) {
      const validDbCourses = dbCourses.filter(c => c.id !== 'course_23_types')
      console.log(`[POSTGRESQL] Serving ${validDbCourses.length} courses directly from database`)
      
      return validDbCourses.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        target_audience: c.targetAudience,
        category: c.category || 'math',
        icon: c.icon || '⭐',
        themeColor: c.themeColor || 'green',
        features: c.features || ['Kuis Interaktif'],
        isReady: c.isReady ?? true,
        isFromDatabase: true,
        source: 'postgresql_database',
        courseData: {
          id: c.id,
          title: c.title,
          description: c.description,
          target_audience: c.targetAudience,
          category: c.category || 'math',
          icon: c.icon || '⭐',
          themeColor: c.themeColor || 'green',
          units: c.units || []
        }
      }))
    }
  } catch (error: any) {
    console.warn('[POSTGRESQL] Database error or offline, serving local fallback:', error.message)
  }

  // Fallback when DB is completely empty or offline
  return defaultCourses
})
