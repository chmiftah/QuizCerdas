import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedFromMasterSoal() {
  try {
    // Clear existing course data
    await prisma.course.deleteMany({})

    const courseData = {
      id: "course_berhitung_tk_01",
      title: "Mengenal Angka 1-5 & Berhitung Ceria",
      description: "Petualangan seru belajar angka 1 sampai 5 untuk anak TK!",
      targetAudience: "Anak TK (4-6 tahun)",
      category: "math",
      icon: "⭐",
      themeColor: "blue",
      features: ["13 Jenis Soal Interaktif", "Pedoman Scaffolding 7 Level", "Sudah Divalidasi Kurikulum"],
      isReady: true,
      units: [
        {
          id: "unit_1",
          title: "Unit 1: Berkenalan dengan Angka 1, 2, dan 3",
          order: 1,
          icon: "star",
          color: "blue",
          lessons: [
            {
              id: "u1_lesson1",
              title: "Satu dan Dua yang Lucu",
              order: 1,
              summary: "Belajar mengenali bentuk dan jumlah angka 1 dan 2.",
              exercises: [
                {
                  id: "u1l1_ex1",
                  type: "multiple_choice",
                  difficulty: "easy",
                  question: "Ada berapa buah apel di gambar?",
                  options: ["1", "2", "3", "4"],
                  correct_answer: "1",
                  explanation: "Pintar! Hanya ada 1 buah apel di gambar.",
                  spaced_repetition: true,
                  visual: { type: "objects", label: "🍎", count: 1 }
                },
                {
                  id: "u1l1_ex2",
                  type: "drag_and_drop",
                  difficulty: "easy",
                  question: "Taruh 2 buah pisang 🍌 ke dalam keranjang!",
                  options: [],
                  correct_answer: "2",
                  explanation: "Hebat! Kamu memasukkan 2 pisang.",
                  spaced_repetition: true,
                  visual: { type: "objects", label: "🍌", count: 4 }
                },
                {
                  id: "u1l1_ex3",
                  type: "seek_find",
                  difficulty: "easy",
                  question: "Cari & temukan 1 ekor Kucing 🐱 di taman!",
                  options: [],
                  correct_answer: "1",
                  explanation: "Hebat! Kamu berhasil menemukannya!",
                  spaced_repetition: false,
                  visual: { label: "🐱", items: [{ x: 45, y: 40, icon: "🐱" }] }
                },
                {
                  id: "u1l1_ex4",
                  type: "matching",
                  difficulty: "medium",
                  question: "Pasangkan angka dengan jumlah buah yang sesuai!",
                  options: ["1::🍎", "2::🍎🍎"],
                  correct_answer: "1::🍎|2::🍎🍎",
                  explanation: "Luar biasa! Kamu berhasil memasangkan semua buah!",
                  spaced_repetition: false
                },
                {
                  id: "u1l1_ex5",
                  type: "comparison",
                  difficulty: "medium",
                  question: "Kelompok mana yang jumlahnya LEBIH BANYAK?",
                  options: ["A", "B", "Sama"],
                  correct_answer: "B",
                  explanation: "Tepat! Kelompok B berisi 2 apel, lebih banyak dari Kelompok A (1 apel).",
                  spaced_repetition: false,
                  visual: {
                    groupA: { count: 1, icon: "🍎", label: "Kelompok A" },
                    groupB: { count: 2, icon: "🍎", label: "Kelompok B" }
                  }
                },
                {
                  id: "u1l1_ex6",
                  type: "sequence_ordering",
                  difficulty: "medium",
                  question: "Berapa angka yang hilang pada urutan ini?",
                  options: ["1", "2", "3", "4"],
                  correct_answer: "2",
                  explanation: "Benar sekali! Urutan yang lengkap adalah 1, 2, 3.",
                  spaced_repetition: false,
                  visual: { sequence: ["1", "?", "3"] }
                },
                {
                  id: "u1l1_ex7",
                  type: "fill_in_blank",
                  difficulty: "hard",
                  question: "Ani punya 1 balon 🎈, lalu Ibu memberi 1 balon lagi. Berapa jumlah semua balon Ani?",
                  options: [],
                  correct_answer: "2",
                  explanation: "Luar biasa! 1 balon ditambah 1 balon sama dengan 2 balon!",
                  spaced_repetition: true,
                  visual: { type: "objects", label: "🎈", count: 2 }
                }
              ]
            }
          ],
          checkpoint: {
            id: "unit1_checkpoint",
            title: "Ujian Checkpoint Unit 1",
            exercises: [
              {
                id: "u1_cp_ex1",
                type: "multiple_choice",
                difficulty: "easy",
                question: "Berapa jumlah bintang?",
                options: ["1", "2", "3", "4"],
                correct_answer: "3",
                explanation: "Ada 3 bintang.",
                visual: { type: "objects", label: "⭐", count: 3 }
              },
              {
                id: "u1_cp_ex2",
                type: "drag_and_drop",
                difficulty: "easy",
                question: "Seret 1 apel ke keranjang!",
                options: [],
                correct_answer: "1",
                explanation: "Satu apel dimasukkan.",
                visual: { label: "🍎", count: 3 }
              },
              {
                id: "u1_cp_ex3",
                type: "seek_find",
                difficulty: "easy",
                question: "Temukan 2 anak ayam 🐥!",
                options: [],
                correct_answer: "2",
                explanation: "Ditemukan 2 anak ayam.",
                visual: { label: "🐥", items: [{ x: 30, y: 30, icon: "🐥" }, { x: 70, y: 60, icon: "🐥" }] }
              },
              {
                id: "u1_cp_ex4",
                type: "matching",
                difficulty: "medium",
                question: "Cocokkan angka dan pisang!",
                options: ["1::🍌", "2::🍌🍌", "3::🍌🍌🍌"],
                correct_answer: "1::🍌|2::🍌🍌|3::🍌🍌🍌",
                explanation: "Sempurna!"
              },
              {
                id: "u1_cp_ex5",
                type: "comparison",
                difficulty: "medium",
                question: "Mana yang LEBIH BANYAK?",
                options: ["A", "B", "Sama"],
                correct_answer: "A",
                explanation: "Kelompok A lebih banyak.",
                visual: {
                  groupA: { count: 3, icon: "⭐", label: "Kelompok A" },
                  groupB: { count: 1, icon: "⭐", label: "Kelompok B" }
                }
              },
              {
                id: "u1_cp_ex6",
                type: "pattern_matching",
                difficulty: "medium",
                question: "Pilih gambar berikutnya: 🔴 🔵 🔴 ?",
                options: ["🔴", "🔵", "🟡", "🟢"],
                correct_answer: "🔵",
                explanation: "Pola berselang-seling."
              },
              {
                id: "u1_cp_ex7",
                type: "fill_in_blank",
                difficulty: "hard",
                question: "Budi punya 2 mobil 🚗, diberikan 1 ke adik. Sisa mobil Budi?",
                options: [],
                correct_answer: "1",
                explanation: "2 dikurangi 1 sama dengan 1."
              }
            ]
          }
        }
      ]
    }

    await prisma.course.create({
      data: {
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

    console.log('✅ Success seeding course based on master soal.md!')
  } catch (error) {
    console.error('❌ Error seeding from master soal:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedFromMasterSoal()
