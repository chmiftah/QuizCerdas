<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div class="bg-white rounded-[32px] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border-4 border-purple-300 overflow-hidden animate-pop">
        
        <!-- Modal Top Header -->
        <div class="p-5 sm:p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-between gap-4 shrink-0 shadow-md">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              ⚡
            </div>
            <div>
              <h3 class="font-heading text-xl sm:text-2xl font-black tracking-tight">
                Generator & Import Soal Otomatis
              </h3>
              <p class="text-xs sm:text-sm text-purple-100 font-heading">
                Buat banyak soal sekaligus dengan AI, rumus matematika instan, atau paste JSON!
              </p>
            </div>
          </div>

          <button 
            @click="closeModal" 
            class="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/35 text-white flex items-center justify-center text-lg font-black cursor-pointer active:scale-90 transition-transform shadow-xs shrink-0"
          >
            ✕
          </button>
        </div>

        <!-- 3 Generator Tabs Navigation -->
        <div class="flex items-center gap-2 p-3 bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto">
          <button 
            @click="activeSubTab = 'ai'"
            class="px-4 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            :class="activeSubTab === 'ai' ? 'bg-purple-600 text-white shadow-md scale-105' : 'text-slate-600 hover:bg-white'"
          >
            <span>🤖</span>
            <span>1. AI One-Click Generator</span>
          </button>

          <button 
            @click="activeSubTab = 'math'"
            class="px-4 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            :class="activeSubTab === 'math' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'text-slate-600 hover:bg-white'"
          >
            <span>🧮</span>
            <span>2. Smart Math Generator (Offline)</span>
          </button>

          <button 
            @click="activeSubTab = 'json'"
            class="px-4 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            :class="activeSubTab === 'json' ? 'bg-sky-600 text-white shadow-md scale-105' : 'text-slate-600 hover:bg-white'"
          >
            <span>📋</span>
            <span>3. Bulk Paste JSON</span>
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          <!-- ========================================================= -->
          <!-- TAB 1: AI ONE-CLICK GENERATOR                             -->
          <!-- ========================================================= -->
          <div v-if="activeSubTab === 'ai'" class="space-y-5 animate-pop">
            <div class="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 flex items-start gap-3">
              <span class="text-2xl shrink-0">💡</span>
              <div class="text-xs text-purple-900 font-body leading-relaxed">
                <strong>AI Scaffolding Approach (Level 1–7):</strong>
                Generator ini otomatis menyusun 7 soal bertingkat dari visual sederhana (Level 1), seret objek (Level 2), mencari objek (Level 3), mencocokkan (Level 4), perbandingan (Level 5), pola angka (Level 6), hingga soal cerita (Level 7).
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1 md:col-span-2">
                <label class="font-heading font-black text-xs text-slate-700">Topik Pembelajaran</label>
                <input 
                  v-model="aiForm.topic" 
                  type="text" 
                  placeholder="Contoh: Penjumlahan 1 sampai 10 dengan buah-buahan ceria" 
                  class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Target Usia / Jenjang</label>
                <select v-model="aiForm.targetAudience" class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 bg-white">
                  <option value="Anak TK (4-6 Tahun)">Anak TK (4-6 Tahun)</option>
                  <option value="SD Kelas 1 (6-7 Tahun)">SD Kelas 1 (6-7 Tahun)</option>
                  <option value="SD Kelas 2-3 (7-9 Tahun)">SD Kelas 2-3 (7-9 Tahun)</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Jumlah Soal</label>
                <select v-model.number="aiForm.questionCount" class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 bg-white">
                  <option :value="7">7 Soal (1 Pelajaran Lengkap Level 1-7)</option>
                  <option :value="14">14 Soal (2 Pelajaran)</option>
                  <option :value="21">21 Soal (3 Pelajaran)</option>
                </select>
              </div>
            </div>

            <button 
              @click="generateWithAI"
              :disabled="isGenerating"
              class="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-heading font-black text-sm sm:text-base shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              <span v-if="isGenerating" class="animate-spin text-xl">⏳</span>
              <span v-else class="text-xl">⚡</span>
              <span>{{ isGenerating ? 'Sedang Meracik Soal Bertingkat...' : 'Mulai Generate Soal dengan AI' }}</span>
            </button>
          </div>

          <!-- ========================================================= -->
          <!-- TAB 2: SMART MATH GENERATOR (OFFLINE / INSTANT)           -->
          <!-- ========================================================= -->
          <div v-else-if="activeSubTab === 'math'" class="space-y-5 animate-pop">
            <div class="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <span class="text-2xl shrink-0">🧮</span>
              <div class="text-xs text-emerald-900 font-body leading-relaxed">
                <strong>Generator Rumus Matematika Instan:</strong>
                100% offline tanpa kuota AI. Sistem secara otomatis membuat soal hitung unik, pilihan pengecoh masuk akal, dan gambar visual objek.
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Jenis Operasi / Materi</label>
                <select v-model="mathForm.type" class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 bg-white">
                  <option value="addition_visual">➕ Penjumlahan Gambar (Visual Counting)</option>
                  <option value="subtraction_visual">➖ Pengurangan Gambar</option>
                  <option value="missing_number">🔢 Melengkapi Angka Hilang (Pola Barisan)</option>
                  <option value="comparison">⚖️ Perbandingan Jumlah (Lebih/Kurang)</option>
                  <option value="count_select">🍎 Hitung & Pilih Jumlah Objek</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Rentang Angka</label>
                <select v-model="mathForm.range" class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 bg-white">
                  <option value="1-10">Angka 1 sampai 10 (Pemula TK/SD 1)</option>
                  <option value="1-20">Angka 1 sampai 20 (SD Kelas 1)</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Pilihan Ikon Objek Emoji</label>
                <div class="flex items-center gap-2 flex-wrap pt-1">
                  <button 
                    v-for="e in ['🍎', '🚗', '⭐', '🐱', '🎈', '🍦', '🐶', '⚽']" 
                    :key="e"
                    @click="mathForm.emoji = e"
                    class="w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition-all cursor-pointer"
                    :class="mathForm.emoji === e ? 'bg-emerald-100 border-emerald-500 scale-110 shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-100'"
                  >
                    {{ e }}
                  </button>
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-heading font-black text-xs text-slate-700">Jumlah Butir Soal</label>
                <select v-model.number="mathForm.count" class="w-full p-3 rounded-xl border-2 border-slate-200 font-heading font-bold text-sm text-slate-800 bg-white">
                  <option :value="7">7 Butir Soal</option>
                  <option :value="10">10 Butir Soal</option>
                  <option :value="14">14 Butir Soal</option>
                </select>
              </div>
            </div>

            <button 
              @click="generateMathBatch"
              class="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl font-heading font-black text-sm sm:text-base shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>🎲</span>
              <span>Generate Soal Matematika Sekarang (Instan)</span>
            </button>
          </div>

          <!-- ========================================================= -->
          <!-- TAB 3: BULK PASTE JSON IMPORTER                           -->
          <!-- ========================================================= -->
          <div v-else-if="activeSubTab === 'json'" class="space-y-5 animate-pop">
            <div class="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 flex items-start gap-3">
              <span class="text-2xl shrink-0">📋</span>
              <div class="text-xs text-sky-900 font-body leading-relaxed">
                <strong>Paste JSON Eksternal:</strong>
                Anda bisa menempelkan JSON hasil prompt dari ChatGPT atau Gemini luar (menggunakan prompt panduan dari file <code>master soal.md</code>). Sistem akan otomatis memvalidasi 29 jenis tipe interaktif.
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label class="font-heading font-black text-xs text-slate-700">Paste Format JSON Kuis</label>
                <button 
                  @click="pasteSampleJson"
                  class="text-[11px] font-heading font-black text-sky-700 hover:underline cursor-pointer"
                >
                  📝 Isi Contoh JSON
                </button>
              </div>
              <textarea 
                v-model="rawJsonText"
                rows="7"
                placeholder='[ { "id": "ex_1", "type": "multiple_choice", "question": "...", "options": [...], "correct_answer": "..." } ]'
                class="w-full p-3 rounded-2xl border-2 border-slate-200 font-mono text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
              ></textarea>
            </div>

            <button 
              @click="validateAndParseJson"
              class="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-heading font-black text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>🔍</span>
              <span>Validasi & Muat Preview Soal</span>
            </button>
          </div>

          <!-- ========================================================= -->
          <!-- GENERATED / PARSED EXERCISES PREVIEW SECTION              -->
          <!-- ========================================================= -->
          <div v-if="generatedExercises.length > 0" class="pt-4 border-t-2 border-slate-200 space-y-4 animate-pop">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-xs border border-emerald-300">
                  ✅ {{ generatedExercises.length }} Soal Siap Diimpor
                </span>
                <span class="text-xs text-slate-500 font-bold">
                  Target: {{ targetLessonLabel }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <button 
                  @click="copyGeneratedJson" 
                  class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-heading font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  <span>📋</span> Salin JSON
                </button>
                <button 
                  @click="clearGenerated" 
                  class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-heading font-bold cursor-pointer transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>

            <!-- List Preview Cards -->
            <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
              <div 
                v-for="(ex, idx) in generatedExercises" 
                :key="ex.id || idx"
                class="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-start gap-3 hover:border-purple-300 transition-colors"
              >
                <!-- Number / Visual Badge -->
                <div class="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-xl shrink-0 font-black shadow-2xs">
                  {{ ex.visual?.label || '🎯' }}
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0 space-y-1">
                  <div class="flex items-center gap-2 flex-wrap text-[10px] font-black uppercase">
                    <span class="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md">
                      #{{ idx + 1 }} • {{ ex.type }}
                    </span>
                    <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                      Kunci: {{ ex.correct_answer }}
                    </span>
                  </div>

                  <p class="font-heading font-black text-sm text-slate-800 leading-snug">
                    {{ ex.question }}
                  </p>

                  <div v-if="ex.options && ex.options.length > 0" class="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 font-bold">
                    <span class="text-slate-400">Pilihan:</span>
                    <span 
                      v-for="(opt, oIdx) in ex.options" 
                      :key="oIdx"
                      class="px-2 py-0.5 bg-white border rounded-md text-[10px] font-black"
                      :class="String(opt) === String(ex.correct_answer) ? 'border-emerald-400 text-emerald-800 bg-emerald-50' : 'border-slate-200 text-slate-700'"
                    >
                      {{ opt }}
                    </span>
                  </div>

                  <p v-if="ex.explanation" class="text-[11px] text-slate-500 italic">
                    💡 {{ ex.explanation }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Import Action Footer -->
            <div class="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 class="font-heading font-black text-sm text-purple-950">
                  Sudah sesuai dengan kebutuhanmu?
                </h4>
                <p class="text-xs text-purple-800 font-body">
                  Klik tombol di samping untuk memasukkan soal ke pelajaran aktif.
                </p>
              </div>

              <button 
                @click="injectToLesson" 
                class="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-heading font-black text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>🚀</span>
                <span>Terapkan ke Pelajaran Ini</span>
              </button>
            </div>

          </div>

        </div>

        <!-- Modal Bottom Footer -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span class="text-xs font-heading font-bold text-slate-500">
            Mendukung 29 Jenis Tipe Soal Interaktif EdTech
          </span>
          <button 
            @click="closeModal" 
            class="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-heading font-black cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  targetLessonLabel: { type: String, default: 'Pelajaran Aktif' }
})

const emit = defineEmits(['close', 'import-exercises'])

const activeSubTab = ref('ai')
const isGenerating = ref(false)
const generatedExercises = ref([])

// 1. AI Form State
const aiForm = ref({
  topic: 'Penjumlahan 1 sampai 10 dengan buah-buahan segar',
  targetAudience: 'Anak TK (4-6 Tahun)',
  questionCount: 7
})

// 2. Math Algorithmic Form State
const mathForm = ref({
  type: 'addition_visual',
  range: '1-10',
  emoji: '🍎',
  count: 7
})

// 3. Raw JSON State
const rawJsonText = ref('')

const closeModal = () => {
  emit('close')
}

const clearGenerated = () => {
  generatedExercises.value = []
}

// -------------------------------------------------------------
// 1. GENERATE DENGAN AI (ENDPOINT /api/admin/generate-ai)
// -------------------------------------------------------------
const generateWithAI = async () => {
  isGenerating.value = true
  try {
    const res = await $fetch('/api/admin/generate-ai', {
      method: 'POST',
      body: {
        topic: aiForm.value.topic,
        targetAudience: aiForm.value.targetAudience,
        questionCount: aiForm.value.questionCount
      }
    })

    if (res && res.success && Array.isArray(res.exercises)) {
      generatedExercises.value = res.exercises
    } else {
      alert('Gagal membuat soal AI. Silakan coba lagi.')
    }
  } catch (err) {
    alert('Terjadi kesalahan koneksi saat memanggil generator AI: ' + err.message)
  } finally {
    isGenerating.value = false
  }
}

// -------------------------------------------------------------
// 2. GENERATE MATH ALGORITHMIC BATCH (OFFLINE / INSTANT)
// -------------------------------------------------------------
const generateMathBatch = () => {
  const count = mathForm.value.count
  const e = mathForm.value.emoji
  const maxN = mathForm.value.range === '1-20' ? 18 : 9
  const list = []

  for (let i = 0; i < count; i++) {
    const id = `math_gen_${Date.now()}_${i + 1}`

    if (mathForm.value.type === 'addition_visual') {
      const a = Math.floor(Math.random() * (maxN / 2)) + 1
      const b = Math.floor(Math.random() * (maxN / 2)) + 1
      const ans = a + b
      const distractors = [ans + 1, Math.max(1, ans - 1), ans + 2, Math.max(1, ans - 2)]
      const options = Array.from(new Set([ans, ...distractors])).slice(0, 4).sort(() => Math.random() - 0.5).map(String)

      list.push({
        id,
        type: 'multiple_choice',
        difficulty: i < 3 ? 'easy' : 'medium',
        question: `Hitunglah penjumlahan objek: ${a} ${e} + ${b} ${e} = ?`,
        options,
        correct_answer: String(ans),
        explanation: `${a} ditambah ${b} adalah ${ans}.`,
        visual: { type: 'objects', label: e, count: ans }
      })
    } else if (mathForm.value.type === 'subtraction_visual') {
      const a = Math.floor(Math.random() * (maxN - 2)) + 3
      const b = Math.floor(Math.random() * (a - 1)) + 1
      const ans = a - b
      const distractors = [ans + 1, Math.max(0, ans - 1), ans + 2]
      const options = Array.from(new Set([ans, ...distractors])).slice(0, 4).sort(() => Math.random() - 0.5).map(String)

      list.push({
        id,
        type: 'multiple_choice',
        difficulty: 'medium',
        question: `Ada ${a} ${e}, lalu ${b} ${e} dimakan. Berapa sisanya?`,
        options,
        correct_answer: String(ans),
        explanation: `${a} dikurang ${b} menyisakan ${ans}.`,
        visual: { type: 'objects', label: e, count: ans }
      })
    } else if (mathForm.value.type === 'missing_number') {
      const start = Math.floor(Math.random() * 5) + 1
      const step = 1
      const seq = [start, start + step, start + (step * 2), start + (step * 3)]
      const missIdx = Math.floor(Math.random() * 2) + 1
      const ans = String(seq[missIdx])
      const displaySeq = seq.map((v, idx) => idx === missIdx ? '?' : String(v))

      list.push({
        id,
        type: 'fill_missing_number',
        difficulty: 'hard',
        question: `Lengkapi angka yang hilang: ${displaySeq.join(', ')}`,
        options: [ans, String(Number(ans) + 1), String(Number(ans) - 1)].sort(() => Math.random() - 0.5),
        correct_answer: ans,
        explanation: `Urutan hitung yang benar adalah ${seq.join(', ')}.`,
        visual: { type: 'number_sequence', sequence: displaySeq }
      })
    } else if (mathForm.value.type === 'comparison') {
      const a = Math.floor(Math.random() * maxN) + 2
      let b = Math.floor(Math.random() * maxN) + 2
      if (a === b) b += 1
      const isMore = a > b

      list.push({
        id,
        type: 'comparison',
        difficulty: 'medium',
        question: `Manakah kelompok ${e} yang jumlahnya LEBIH BANYAK?`,
        options: [`Kotak A (${a} ${e})`, `Kotak B (${b} ${e})`],
        correct_answer: isMore ? `Kotak A (${a} ${e})` : `Kotak B (${b} ${e})`,
        explanation: `${Math.max(a, b)} lebih banyak daripada ${Math.min(a, b)}.`,
        visual: { type: 'comparison_boxes', leftCount: a, rightCount: b, label: e }
      })
    } else {
      // count_select
      const n = Math.floor(Math.random() * maxN) + 2
      const options = [n, n + 1, Math.max(1, n - 1), n + 2].sort(() => Math.random() - 0.5).map(String)

      list.push({
        id,
        type: 'count_select',
        difficulty: 'easy',
        question: `Berapa banyak ${e} yang kamu lihat di gambar?`,
        options,
        correct_answer: String(n),
        explanation: `Mari kita hitung: ada ${n} ${e}.`,
        visual: { type: 'objects', label: e, count: n }
      })
    }
  }

  generatedExercises.value = list
}

// -------------------------------------------------------------
// 3. BULK PASTE JSON VALIDATOR & PARSER
// -------------------------------------------------------------
const validateAndParseJson = () => {
  if (!rawJsonText.value.trim()) {
    alert('Silakan paste teks JSON terlebih dahulu!')
    return
  }

  try {
    const cleaned = rawJsonText.value.replace(/```json/g, '').replace(/```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    let exercises = []
    if (Array.isArray(parsed)) {
      exercises = parsed
    } else if (parsed.exercises && Array.isArray(parsed.exercises)) {
      exercises = parsed.exercises
    } else if (parsed.course && parsed.course.units) {
      // Extract from whole course
      parsed.course.units.forEach(u => {
        if (u.lessons) {
          u.lessons.forEach(l => {
            if (l.exercises) exercises.push(...l.exercises)
          })
        }
      })
    } else {
      throw new Error('Format JSON tidak memiliki array soal (exercises).')
    }

    if (exercises.length === 0) {
      throw new Error('Tidak ditemukan butir soal di dalam JSON yang dipaste.')
    }

    generatedExercises.value = exercises.map((ex, idx) => ({
      id: ex.id || `imported_${Date.now()}_${idx + 1}`,
      type: ex.type || 'multiple_choice',
      difficulty: ex.difficulty || 'medium',
      question: ex.question || `Soal #${idx + 1}`,
      options: Array.isArray(ex.options) ? ex.options.map(String) : [],
      correct_answer: String(ex.correct_answer || (ex.options ? ex.options[0] : '1')),
      explanation: ex.explanation || '',
      visual: ex.visual || { type: 'objects', label: '⭐', count: 3 }
    }))

  } catch (err) {
    alert('JSON Error: ' + err.message)
  }
}

const pasteSampleJson = () => {
  rawJsonText.value = JSON.stringify([
    {
      "id": "contoh_1",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "Berapa banyak buah apel di bawah ini?",
      "options": ["2", "3", "4", "5"],
      "correct_answer": "3",
      "explanation": "Ada tepat 3 buah apel merah.",
      "visual": { "type": "objects", "label": "🍎", "count": 3 }
    },
    {
      "id": "contoh_2",
      "type": "true_false",
      "difficulty": "easy",
      "question": "Apakah 2 + 2 hasilnya adalah 4?",
      "options": ["Benar", "Salah"],
      "correct_answer": "Benar",
      "explanation": "Benar! 2 ditambah 2 sama dengan 4."
    }
  ], null, 2)
}

const copyGeneratedJson = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(generatedExercises.value, null, 2))
    alert('JSON soal berhasil disalin ke clipboard!')
  }
}

const injectToLesson = () => {
  if (generatedExercises.value.length === 0) return
  emit('import-exercises', generatedExercises.value)
  closeModal()
}
</script>
