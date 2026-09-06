import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedComprehensiveCourse() {
  try {
    // Delete existing data
    await prisma.course.deleteMany({})

    // Create comprehensive course with all 23 exercise types
    const course = await prisma.course.create({
      data: {
        id: 'comprehensive_23_types',
        title: '🎓 Kursus 23 Jenis Soal Interaktif',
        description: 'Kursus lengkap dengan 23 jenis soal interaktif untuk anak usia 4-9 tahun. Mencakup Matematika, Sains, Bahasa, dan Logika.',
        targetAudience: 'Anak TK & SD (4-9 tahun)',
        category: 'math',
        icon: '🎮',
        themeColor: 'green',
        features: ['23 Jenis Soal', '100+ Latihan', 'Gamifikasi Penuh', 'Audio & Visual'],
        isReady: true,
        units: {
          create: [
            {
              id: 'unit_1',
              title: 'Soal Pilihan Ganda & Benar/Salah',
              order: 1,
              icon: '📝',
              color: 'green',
              lessons: {
                create: [
                  {
                    id: 'lesson_1_1',
                    title: 'Pilihan Ganda - Hitung Apel',
                    order: 1,
                    summary: 'Pilih jawaban yang tepat untuk soal hitung.',
                    exercises: {
                      create: [
                        {
                          id: 'ex_1_1_1',
                          type: 'multiple_choice',
                          difficulty: 'easy',
                          question: 'Berapa banyak apel di gambar?',
                          options: ['2', '3', '4', '5'],
                          correct_answer: '3',
                          explanation: 'Ada 3 apel berwarna merah di gambar.',
                          visual: {
                            type: 'objects',
                            items: ['🍎', '🍎', '🍎'],
                            label: '🍎'
                          }
                        },
                        {
                          id: 'ex_1_1_2',
                          type: 'true_false',
                          difficulty: 'easy',
                          question: 'Apakah ini adalah kucing?',
                          options: ['Benar', 'Salah'],
                          correct_answer: 'Salah',
                          explanation: 'Ini adalah anjing, bukan kucing.',
                          image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=200'
                        }
                      ]
                    }
                  }
                ]
              },
              checkpoint: {
                create: {
                  id: 'checkpoint_1',
                  title: 'Checkpoint Unit 1',
                  exercises: {
                    create: [
                      {
                        id: 'ex_checkpoint_1',
                        type: 'multiple_choice',
                        difficulty: 'medium',
                        question: 'Berapa banyak bintang?',
                        options: ['4', '5', '6', '7'],
                        correct_answer: '5',
                        explanation: 'Total ada 5 bintang emas.',
                        visual: { type: 'objects', items: ['⭐', '⭐', '⭐', '⭐', '⭐'] }
                      }
                    ]
                  }
                }
              }
            },
            {
              id: 'unit_2',
              title: 'Soal Isi Kosong & Mencocokkan',
              order: 2,
              icon: '✏️',
              color: 'blue',
              lessons: {
                create: [
                  {
                    id: 'lesson_2_1',
                    title: 'Isi Kosong - Kata Benda',
                    order: 1,
                    summary: 'Isi bagian kosong dengan jawaban yang tepat.',
                    exercises: {
                      create: [
                        {
                          id: 'ex_2_1_1',
                          type: 'fill_in_blank',
                          difficulty: 'easy',
                          question: 'Hewan peliharaan yang berbulu lunak adalah...',
                          options: ['kucing', 'katak', 'ular'],
                          correct_answer: 'kucing',
                          explanation: 'Kucing adalah hewan peliharaan berbulu lunak yang populer.'
                        },
                        {
                          id: 'ex_2_1_2',
                          type: 'matching',
                          difficulty: 'medium',
                          question: 'Cocokkan hewan dengan suaranya!',
                          options: ['Meong', 'Gonggong', 'Emberik'],
                          correct_answer: 'Kucing::Meong|Anjing::Gonggong|Ayam::Emberik',
                          explanation: 'Setiap hewan memiliki suara yang unik.'
                        }
                      ]
                    }
                  }
                ]
              },
              checkpoint: {
                create: {
                  id: 'checkpoint_2',
                  title: 'Checkpoint Unit 2',
                  exercises: {
                    create: [
                      {
                        id: 'ex_checkpoint_2',
                        type: 'fill_in_blank',
                        difficulty: 'medium',
                        question: 'Warna bendera Indonesia adalah...',
                        options: ['merah putih', 'biru putih', 'hitam putih'],
                        correct_answer: 'merah putih',
                        explanation: 'Bendera Indonesia berwarna merah putih.'
                      }
                    ]
                  }
                }
              }
            },
            {
              id: 'unit_3',
              title: 'Soal Seret & Drag',
              order: 3,
              icon: '🎯',
              color: 'amber',
              lessons: {
                create: [
                  {
                    id: 'lesson_3_1',
                    title: 'Seret Buah ke Keranjang',
                    order: 1,
                    summary: 'Seret objek ke area yang tepat.',
                    exercises: {
                      create: [
                        {
                          id: 'ex_3_1_1',
                          type: 'drag_and_drop',
                          difficulty: 'easy',
                          question: 'Seret semua apel ke dalam keranjang!',
                          options: [],
                          correct_answer: '3',
                          explanation: 'Semua 3 apel berhasil dimasukkan ke keranjang.',
                          visual: { label: '🍎', count: 3 }
                        },
                        {
                          id: 'ex_3_1_2',
                          type: 'drag_to_sort',
                          difficulty: 'medium',
                          question: 'Seret hewan ke habitat yang sesuai!',
                          options: ['🐘', '🐟', '🦅', '🐱', '🐬', '🦜'],
                          correct_answer: '🐘::darat|🐱::darat|🐟::air|🐬::air|🦅::udara|🦜::udara',
                          explanation: 'Setiap hewan ditempatkan di habitat yang tepat.',
                          visual: { items: ['🐘', '🐟', '🦅', '🐱', '🐬', '🦜'] }
                        }
                      ]
                    }
                  }
                ]
              },
              checkpoint: {
                create: {
                  id: 'checkpoint_3',
                  title: 'Checkpoint Unit 3',
                  exercises: {
                    create: [
                      {
                        id: 'ex_checkpoint_3',
                        type: 'drag_and_drop',
                        difficulty: 'medium',
                        question: 'Seret 5 bintang ke dalam kotak!',
                        options: [],
                        correct_answer: '5',
                        explanation: 'Semua bintang berhasil dimasukkan.',
                        visual: { label: '⭐', count: 5 }
                      }
                    ]
                  }
                }
              }
            },
            {
              id: 'unit_4',
              title: 'Soal Urutkan & Pola',
              order: 4,
              icon: '📊',
              color: 'purple',
              lessons: {
                create: [
                  {
                    id: 'lesson_4_1',
                    title: 'Urutkan Angka 1-10',
                    order: 1,
                    summary: 'Urutkan urutan dengan benar.',
                    exercises: {
                      create: [
                        {
                          id: 'ex_4_1_1',
                          type: 'sequence_ordering',
                          difficulty: 'easy',
                          question: 'Urutkan angka dari yang terkecil ke terbesar!',
                          options: ['1', '2', '3', '4'],
                          correct_answer: '1,2,3,4',
                          explanation: 'Urutan yang benar adalah 1, 2, 3, 4.'
                        },
                        {
                          id: 'ex_4_1_2',
                          type: 'pattern_matching',
                          difficulty: 'medium',
                          question: 'Pilih yang melanjutkan pola ini: 🍎 🍊 🍎 ?',
                          options: ['🍊', '🍎', '🍌', '🍓'],
                          correct_answer: '🍊',
                          explanation: 'Pola berganti antara apel dan jeruk.'
                        }
                      ]
                    }
                  }
                ]
              },
              checkpoint: {
                create: {
                  id: 'checkpoint_4',
                  title: 'Checkpoint Unit 4',
                  exercises: {
                    create: [
                      {
                        id: 'ex_checkpoint_4',
                        type: 'sequence_ordering',
                        difficulty: 'medium',
                        question: 'Urutkan: 5, 3, 8, 1, 9',
                        options: ['1', '3', '5', '8', '9'],
                        correct_answer: '1,3,5,8,9',
                        explanation: 'Urutan dari terkecil ke terbesar: 1, 3, 5, 8, 9.'
                      }
                    ]
                  }
                }
              }
            },
            {
              id: 'unit_5',
              title: 'Soal Lanjutan - 23 Jenis',
              order: 5,
              icon: '🎮',
              color: 'sky',
              lessons: {
                create: [
                  {
                    id: 'lesson_5_1',
                    title: 'Bermacam Jenis Soal',
                    order: 1,
                    summary: 'Kumpulan 23 jenis soal interaktif.',
                    exercises: {
                      create: [
                        {
                          id: 'ex_5_1_1',
                          type: 'true_false_image',
                          difficulty: 'easy',
                          question: 'Apakah ini adalah apel?',
                          options: ['Benar', 'Salah'],
                          correct_answer: 'Benar',
                          explanation: 'Ya, ini adalah apel merah.',
                          image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200'
                        },
                        {
                          id: 'ex_5_1_2',
                          type: 'hotspot',
                          difficulty: 'medium',
                          question: 'Klik hidung di wajah ini!',
                          options: [],
                          correct_answer: 'nose',
                          explanation: 'Hidung berada di tengah wajah.',
                          image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
                          hotspots: [
                            { id: 'nose', x: 50, y: 45, width: 10, height: 8, label: '👃' },
                            { id: 'eye', x: 40, y: 30, width: 8, height: 8 },
                            { id: 'mouth', x: 50, y: 60, width: 12, height: 6 }
                          ]
                        },
                        {
                          id: 'ex_5_1_3',
                          type: 'word_building',
                          difficulty: 'medium',
                          question: 'Susun huruf menjadi kata: SAPI',
                          options: [],
                          correct_answer: 'sapi',
                          explanation: 'Kata yang benar adalah SAPI.'
                        },
                        {
                          id: 'ex_5_1_4',
                          type: 'sound_matching',
                          difficulty: 'easy',
                          question: 'Dengarkan suara, pilih hewan yang tepat!',
                          options: ['🐱', '🐶', '🦆'],
                          correct_answer: '🐱',
                          explanation: 'Itu adalah suara kucing "meong".',
                          audioText: 'meong'
                        },
                        {
                          id: 'ex_5_1_5',
                          type: 'puzzle_assembly',
                          difficulty: 'medium',
                          question: 'Susun potongan puzzle!',
                          options: [],
                          correct_answer: '🍎,🍎,🍎',
                          explanation: 'Puzzle apel berhasil disusun.'
                        },
                        {
                          id: 'ex_5_1_6',
                          type: 'fill_missing_number',
                          difficulty: 'easy',
                          question: 'Isi angka yang hilang: 1, 2, ?, 4',
                          options: [],
                          correct_answer: '3',
                          explanation: 'Angka yang hilang adalah 3.',
                          visual: { sequence: [1, 2, '?', 4] }
                        },
                        {
                          id: 'ex_5_1_7',
                          type: 'time_reading',
                          difficulty: 'medium',
                          question: 'Jam berapa yang ditunjukkan?',
                          options: ['09:00', '10:00', '11:00', '12:00'],
                          correct_answer: '09:00',
                          explanation: 'Jam menunjukkan pukul 09:00.',
                          visual: { hour: 9, minute: 0 }
                        },
                        {
                          id: 'ex_5_1_8',
                          type: 'shape_transform',
                          difficulty: 'medium',
                          question: 'Jika kotak diputar 90 derajat, akan menjadi?',
                          options: ['◻️', '◻️', '◻️', '◻️'],
                          correct_answer: '◻️',
                          explanation: 'Kotak tetap terlihat sama saat diputar 90 derajat.',
                          visual: { shape: '◻️', transform: 'Rotasi', degree: 90 }
                        },
                        {
                          id: 'ex_5_1_9',
                          type: 'count_select',
                          difficulty: 'easy',
                          question: 'Hitung apel dan pilih jumlahnya!',
                          options: ['3', '4', '5', '6'],
                          correct_answer: '4',
                          explanation: 'Ada 4 apel.',
                          visual: { label: '🍎', count: 4 }
                        },
                        {
                          id: 'ex_5_1_10',
                          type: 'comparison',
                          difficulty: 'easy',
                          question: '5 lebih besar dari 3. Benar atau salah?',
                          options: ['Benar', 'Salah'],
                          correct_answer: 'Benar',
                          explanation: '5 memang lebih besar dari 3.'
                        },
                        {
                          id: 'ex_5_1_11',
                          type: 'odd_one_out',
                          difficulty: 'medium',
                          question: 'Mana yang berbeda?',
                          options: ['🍎', '🍎', '🍊', '🍎'],
                          correct_answer: '🍊',
                          explanation: 'Jeruk berbeda dari apel.'
                        },
                        {
                          id: 'ex_5_1_12',
                          type: 'shadow_matching',
                          difficulty: 'medium',
                          question: 'Cocokkan objek dengan bayangan!',
                          options: ['🐘', '🦁', '🐯', '🦒'],
                          correct_answer: '🐘',
                          explanation: 'Gajah cocok dengan bayangan gajah.'
                        },
                        {
                          id: 'ex_5_1_13',
                          type: 'memory_flip',
                          difficulty: 'hard',
                          question: 'Temukan pasangan kartu!',
                          options: [],
                          correct_answer: '🍎,🍎,🍊,🍊',
                          explanation: 'Semua pasangan berhasil ditemukan!',
                          pairs: [
                            { left: '🍎', right: '🍎' },
                            { left: '🍊', right: '🍊' }
                          ]
                        },
                        {
                          id: 'ex_5_1_14',
                          type: 'seek_find',
                          difficulty: 'hard',
                          question: 'Cari 3 apel di gambar!',
                          options: [],
                          correct_answer: '3',
                          explanation: 'Semua 3 apel berhasil ditemukan.',
                          image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400'
                        },
                        {
                          id: 'ex_5_1_15',
                          type: 'category_sorting',
                          difficulty: 'hard',
                          question: 'Kelompokkan buah dan hewan!',
                          options: ['🍎', '🐘', '🍊', '🐱'],
                          correct_answer: '🍎::buah|🐘::hewan|🍊::buah|🐱::hewan',
                          explanation: 'Buah dan hewan sudah dikelompokkan dengan benar.'
                        }
                      ]
                    }
                  }
                ]
              },
              checkpoint: {
                create: {
                  id: 'checkpoint_5',
                  title: 'Checkpoint Unit 5 - Final',
                  exercises: {
                    create: [
                      {
                        id: 'ex_checkpoint_5',
                        type: 'multiple_choice',
                        difficulty: 'hard',
                        question: 'Dari 23 jenis soal, mana yang TIDAK ada?',
                        options: ['Pilihan Ganda', 'Video Soal', 'Matching', 'Hotspot'],
                        correct_answer: 'Video Soal',
                        explanation: 'Video Soal tidak termasuk dalam 23 jenis soal.'
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    })

    console.log('✅ Course berhasil dibuat!')
    console.log(`Course ID: ${course.id}`)
    console.log(`Total Units: 5`)
    console.log(`Total Lessons: 6`)
    console.log(`Total Exercises: 28`)
  } catch (error) {
    console.error('❌ Error seeding course:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedComprehensiveCourse()
