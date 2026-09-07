export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const topic = body?.topic || 'Penjumlahan 1 sampai 10'
  const targetAudience = body?.targetAudience || 'Anak TK & SD Kelas 1'
  const questionCount = Number(body?.questionCount) || 7
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY || ''

  // System Prompt based on master soal.md guidelines
  const systemPrompt = `Kamu adalah EdTech Curriculum Specialist untuk anak TK dan SD Kelas 1 (usia 4-7 tahun).
Tugasmu adalah membuat ${questionCount} butir latihan/soal interaktif yang berjenjang dari mudah ke menantang (scaffolding approach):
- Soal 1 (Level 1): Pengenalan visual/pilihan ganda santai (multiple_choice / true_false / number_tracing).
- Soal 2 (Level 2): Berhitung objek / seret objek (drag_and_drop / count_select).
- Soal 3 (Level 3): Cari objek / visual attention (seek_find / true_false_image / hotspot).
- Soal 4 (Level 4): Pasangan / mencocokkan (matching / shadow_matching).
- Soal 5 (Level 5): Membandingkan jumlah / kelompokkan (comparison / category_sorting / odd_one_out).
- Soal 6 (Level 6): Pola angka / urutan / jam (fill_missing_number / sequence_ordering / time_reading / pattern_matching).
- Soal 7 (Level 7): Isian angka / tantangan cerita (fill_in_blank / word_building).

Format output WAJIB HANYA JSON array murni tanpa markdown formatting atau backticks:
[
  {
    "id": "ex_1",
    "type": "multiple_choice",
    "difficulty": "easy",
    "question": "Ada berapa buah apel merah di bawah ini?",
    "options": ["2", "3", "4", "5"],
    "correct_answer": "3",
    "explanation": "Mari kita hitung apel merah bersama-sama: 1, 2, 3! Ada 3 apel merah.",
    "visual": { "type": "objects", "label": "🍎", "count": 3 }
  }
]

Topik: ${topic}
Target Usia: ${targetAudience}
Pastikan setiap soal memiliki "id", "type", "difficulty", "question", "options" (array string), "correct_answer", "explanation", dan "visual" yang sesuai.`

  // 1. Try Gemini API if API key is provided
  if (apiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      const response = await $fetch<any>(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: 0.6,
            responseMimeType: 'application/json'
          }
        }
      })

      const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text
      if (rawText) {
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsed = JSON.parse(cleaned)
        const exercises = Array.isArray(parsed) ? parsed : (parsed.exercises || parsed.soal || [])
        if (exercises.length > 0) {
          return {
            success: true,
            source: 'gemini-ai',
            exercises: sanitizeExercises(exercises, topic)
          }
        }
      }
    } catch (err: any) {
      console.warn('[AI GENERATOR] Gemini API request failed, falling back to intelligent rule engine:', err.message)
    }
  }

  // 2. Fallback Intelligent Scaffolding Engine (Guaranteed Zero-Failure & Offline Ready)
  const fallbackExercises = generateIntelligentExercises(topic, targetAudience, questionCount)
  return {
    success: true,
    source: 'rule-engine',
    message: apiKey ? 'AI quota exhausted/fallback used' : 'Menggunakan generator cerdas bawaan',
    exercises: fallbackExercises
  }
})

function sanitizeExercises(rawList: any[], topic: string) {
  return rawList.map((ex, idx) => {
    return {
      id: ex.id || `ai_ex_${Date.now()}_${idx + 1}`,
      type: ex.type || 'multiple_choice',
      difficulty: ex.difficulty || (idx < 2 ? 'easy' : idx < 5 ? 'medium' : 'hard'),
      question: ex.question || `Latihan #${idx + 1}: ${topic}`,
      options: Array.isArray(ex.options) ? ex.options.map(String) : ['1', '2', '3', '4'],
      correct_answer: String(ex.correct_answer || (Array.isArray(ex.options) ? ex.options[0] : '1')),
      explanation: ex.explanation || 'Kerja bagus! Jawabanmu sangat tepat.',
      visual: ex.visual || { type: 'objects', label: '⭐', count: 3 }
    }
  })
}

// Built-in intelligent scaffolding Level 1-7 engine
function generateIntelligentExercises(topic: string, audience: string, count: number) {
  const isAnimal = topic.toLowerCase().includes('hewan') || topic.toLowerCase().includes('binatang')
  const isFruit = topic.toLowerCase().includes('buah') || topic.toLowerCase().includes('sayur')
  const isSubtraction = topic.toLowerCase().includes('kurang') || topic.toLowerCase().includes('pengurangan')

  const emojis = isAnimal 
    ? ['🐱', '🐶', '🐰', '🦁', '🦊', '🐼', '🐸'] 
    : isFruit 
      ? ['🍎', '🍌', '🍓', '🍊', '🍇', '🍉', '🍍'] 
      : ['⭐', '🎈', '🚗', '🍬', '🍦', '🎁', '🚀']

  const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)]

  const templates = [
    // Level 1: Pengenalan visual (Multiple Choice)
    () => {
      const e = getRandomEmoji()
      const n = Math.floor(Math.random() * 4) + 2
      const options = [n, n - 1, n + 1, n + 2].sort(() => Math.random() - 0.5).map(String)
      return {
        id: `gen_l1_${Date.now()}_1`,
        type: 'multiple_choice',
        difficulty: 'easy',
        question: `Berapa jumlah ${e} yang ada di bawah ini?`,
        options,
        correct_answer: String(n),
        explanation: `Mari kita hitung bersama: 1 sampai ${n}. Jadi ada ${n} ${e}.`,
        visual: { type: 'objects', label: e, count: n }
      }
    },
    // Level 2: Interaksi fisik / seret objek (Drag & Drop)
    () => {
      const e = getRandomEmoji()
      const target = Math.floor(Math.random() * 3) + 2
      const pool = target + 2
      return {
        id: `gen_l2_${Date.now()}_2`,
        type: 'drag_and_drop',
        difficulty: 'easy',
        question: `Masukkan tepat ${target} buah ${e} ke dalam keranjang belanja!`,
        options: [],
        correct_answer: String(target),
        explanation: `Hebat! Kamu telah berhasil memasukkan ${target} ${e} ke dalam keranjang.`,
        visual: { type: 'objects', label: e, count: pool }
      }
    },
    // Level 3: Cari & Temukan (Seek & Find)
    () => {
      const targetEmoji = getRandomEmoji()
      const distractEmoji = getRandomEmoji() === targetEmoji ? '⭐' : getRandomEmoji()
      const count = Math.floor(Math.random() * 3) + 2
      return {
        id: `gen_l3_${Date.now()}_3`,
        type: 'seek_find',
        difficulty: 'medium',
        question: `Temukan dan sentuh semua ${targetEmoji} di antara objek berikut!`,
        options: [],
        correct_answer: String(count),
        explanation: `Bagus sekali matamu jeli! Ada tepat ${count} ${targetEmoji} yang ditemukan.`,
        visual: { type: 'mixed_objects', target: targetEmoji, targetCount: count, other: distractEmoji, otherCount: 3 }
      }
    },
    // Level 4: Mencocokkan Pasangan (Matching)
    () => {
      const e = getRandomEmoji()
      const n1 = 2, n2 = 3, n3 = 4
      return {
        id: `gen_l4_${Date.now()}_4`,
        type: 'matching',
        difficulty: 'medium',
        question: `Hubungkan angka dengan jumlah ${e} yang sesuai!`,
        options: [`${n1}::${e.repeat(n1)}`, `${n2}::${e.repeat(n2)}`, `${n3}::${e.repeat(n3)}`],
        correct_answer: `${n1}::${e.repeat(n1)}|${n2}::${e.repeat(n2)}|${n3}::${e.repeat(n3)}`,
        explanation: `Cocok! Setiap kartu angka telah terhubung dengan jumlah ${e} yang tepat.`,
        visual: { type: 'matching_preview', icon: e }
      }
    },
    // Level 5: Perbandingan Jumlah (Comparison)
    () => {
      const e1 = getRandomEmoji()
      const e2 = getRandomEmoji() === e1 ? '⭐' : getRandomEmoji()
      const n1 = Math.floor(Math.random() * 4) + 3
      const n2 = Math.floor(Math.random() * 3) + 1
      const isMore = n1 > n2
      return {
        id: `gen_l5_${Date.now()}_5`,
        type: 'comparison',
        difficulty: 'medium',
        question: `Kelompok mana yang jumlahnya LEBIH BANYAK?`,
        options: [`${e1} (${n1})`, `${e2} (${n2})`],
        correct_answer: isMore ? `${e1} (${n1})` : `${e2} (${n2})`,
        explanation: `${n1} lebih banyak daripada ${n2}. Kamu memilih dengan tepat!`,
        visual: { type: 'comparison_boxes', leftLabel: e1, leftCount: n1, rightLabel: e2, rightCount: n2 }
      }
    },
    // Level 6: Angka Hilang / Pola Barisan (Fill Missing Number)
    () => {
      const start = Math.floor(Math.random() * 5) + 1
      const step = 1
      const seq = [start, start + step, start + (step * 2), start + (step * 3)]
      const missingIdx = 2
      const correctVal = String(seq[missingIdx])
      const displaySeq = seq.map((v, i) => i === missingIdx ? '?' : String(v))
      return {
        id: `gen_l6_${Date.now()}_6`,
        type: 'fill_missing_number',
        difficulty: 'hard',
        question: `Lengkapilah angka yang hilang pada barisan hitung berikut!`,
        options: [correctVal, String(seq[missingIdx] + 1), String(seq[missingIdx] - 1), String(seq[missingIdx] + 2)].sort(() => Math.random() - 0.5),
        correct_answer: correctVal,
        explanation: `Urutan yang benar adalah ${seq.join(', ')}. Angka yang hilang adalah ${correctVal}.`,
        visual: { type: 'number_sequence', sequence: displaySeq }
      }
    },
    // Level 7: Soal Cerita Isian (Fill in Blank)
    () => {
      const e = getRandomEmoji()
      const a = Math.floor(Math.random() * 4) + 2
      const b = Math.floor(Math.random() * 3) + 1
      const res = isSubtraction ? Math.max(a, b) - Math.min(a, b) : a + b
      const opText = isSubtraction ? 'diberikan' : 'membeli lagi'
      return {
        id: `gen_l7_${Date.now()}_7`,
        type: 'fill_in_blank',
        difficulty: 'hard',
        question: `Kiko punya ${isSubtraction ? Math.max(a, b) : a} ${e}. Lalu ${opText} ${Math.min(a, b)} ${e}. Berapa sisa ${e} Kiko sekarang?`,
        options: [],
        correct_answer: String(res),
        explanation: `Hitungan: ${isSubtraction ? `${Math.max(a, b)} - ${Math.min(a, b)} = ${res}` : `${a} + ${b} = ${res}`}. Jawaban adalah ${res}.`,
        visual: { type: 'story_math', label: e, count: res }
      }
    }
  ]

  const results = []
  for (let i = 0; i < count; i++) {
    const generatorFn = templates[i % templates.length]
    results.push(generatorFn())
  }
  return results
}
