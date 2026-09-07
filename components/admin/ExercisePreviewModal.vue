<template>
  <Teleport to="body">
    <div v-if="isOpen && exercise" class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      
      <!-- Backdrop Click to Close -->
      <div class="fixed inset-0" @click="closeModal"></div>

      <!-- Main Modal Window (Kid Tablet Device Simulator Frame) -->
      <div class="relative bg-white rounded-3xl sm:rounded-[36px] border-4 border-purple-200 shadow-2xl w-full max-w-3xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        <!-- Modal Top App Bar -->
        <div class="bg-purple-700 px-5 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl">📱</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-heading font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full text-purple-100">
                  Preview Interaktif
                </span>
                <span 
                  class="text-[10px] font-heading font-black px-2 py-0.5 rounded-full uppercase"
                  :class="difficultyBadgeClass"
                >
                  {{ difficultyLabel }}
                </span>
              </div>
              <h3 class="font-heading text-base sm:text-lg font-black leading-tight flex items-center gap-1.5 mt-0.5">
                <span>{{ typeInfo.icon }}</span>
                <span>{{ typeInfo.label }}</span>
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Edit button shortcut -->
            <button 
              @click="$emit('edit', exercise)" 
              type="button" 
              class="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-heading font-extrabold flex items-center gap-1 transition-all cursor-pointer"
              title="Buka di Editor Soal"
            >
              <span>✏️</span>
              <span class="hidden sm:inline">Edit Soal</span>
            </button>

            <!-- Close button -->
            <button 
              @click="closeModal" 
              type="button" 
              class="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center font-black text-sm transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Question Meta Sub-bar -->
        <div class="bg-purple-50/80 px-5 py-2.5 border-b border-purple-100 flex flex-wrap items-center justify-between gap-2 text-xs font-heading text-purple-900 shrink-0">
          <div class="flex items-center gap-3">
            <span><strong>ID:</strong> <code class="bg-purple-100 px-1.5 py-0.5 rounded text-[11px] font-mono text-purple-800">{{ exercise.id || 'draft_exercise' }}</code></span>
            <span><strong>Kunci Jawaban:</strong> <code class="bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded text-[11px]">{{ displayCorrectAnswer }}</code></span>
          </div>
          <button 
            @click="showJsonInspector = !showJsonInspector" 
            type="button"
            class="text-[11px] font-extrabold text-purple-700 hover:text-purple-900 underline cursor-pointer flex items-center gap-1"
          >
            <span>{ }</span>
            <span>{{ showJsonInspector ? 'Tutup Data JSON' : 'Lihat Data JSON' }}</span>
          </button>
        </div>

        <!-- Collapsible JSON Inspector -->
        <div v-if="showJsonInspector" class="bg-slate-900 text-slate-200 p-4 font-mono text-xs max-h-48 overflow-y-auto border-b border-slate-700 shrink-0">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
            <span>SKEMA DATA SOAL (RAW JSON)</span>
            <button @click="copyJson" type="button" class="text-purple-300 hover:text-white cursor-pointer">
              {{ copied ? '✓ Tersalin!' : '📋 Salin JSON' }}
            </button>
          </div>
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(cleanExerciseData, null, 2) }}</pre>
        </div>

        <!-- Question View Body (Simulated App Canvas) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          
          <!-- Hint / Instruction Toast (if available) -->
          <div v-if="exercise.explanation" class="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-2.5 text-xs font-heading text-blue-900">
            <span class="text-base">💡</span>
            <p class="flex-1">
              <span class="font-black">Petunjuk / Penjelasan:</span> {{ exercise.explanation }}
            </p>
          </div>

          <!-- Question Visual Illustration Header -->
          <QuestionVisual :exercise="cleanExerciseData" />

          <!-- Interactive Exercise Component (All 29 Types Supported) -->
          <div class="bg-white p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm relative min-h-[160px] flex flex-col justify-center">
            
            <!-- 1. Multiple Choice -->
            <ExerciseMultipleChoice
              v-if="cleanExerciseData.type === 'multiple_choice'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 2. True False -->
            <ExerciseTrueFalse
              v-else-if="cleanExerciseData.type === 'true_false'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 3. Fill In Blank -->
            <ExerciseFillBlank
              v-else-if="cleanExerciseData.type === 'fill_in_blank'"
              :exercise="cleanExerciseData"
              :fillBlankInput="fillBlankInput"
              @update:fillBlankInput="(val) => fillBlankInput = val"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
            />

            <!-- 4. Drag Drop -->
            <ExerciseDragDrop
              v-else-if="cleanExerciseData.type === 'drag_and_drop'"
              :exercise="cleanExerciseData"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @updateCount="(val) => dragDropCount = val"
            />

            <!-- 5. Matching -->
            <ExerciseMatching
              v-else-if="cleanExerciseData.type === 'matching'"
              :exercise="cleanExerciseData"
              :matchingSelections="matchingSelections"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @pair="handleMatchingPair"
              @reset="resetMatching"
              @unpair="unpairMatching"
            />

            <!-- 6. Shadow Matching -->
            <ExerciseShadowMatch
              v-else-if="cleanExerciseData.type === 'shadow_matching'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 7. Sequence Ordering -->
            <ExerciseSequence
              v-else-if="cleanExerciseData.type === 'sequence_ordering'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 8. Comparison -->
            <ExerciseComparison
              v-else-if="cleanExerciseData.type === 'comparison'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 9. Pattern Matching -->
            <ExercisePattern
              v-else-if="cleanExerciseData.type === 'pattern_matching'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 10. Seek and Find -->
            <ExerciseSeekFind
              v-else-if="cleanExerciseData.type === 'seek_find'"
              :exercise="cleanExerciseData"
              :isChecked="isChecked"
              @updateCount="(val) => dragDropCount = val"
            />

            <!-- 11. Category Sorting -->
            <ExerciseCategorySort
              v-else-if="cleanExerciseData.type === 'category_sorting'"
              :exercise="cleanExerciseData"
              :isChecked="isChecked"
              @updateCategoryMap="(val) => categoryMap = val"
            />

            <!-- 12. Odd One Out -->
            <ExerciseOddOneOut
              v-else-if="cleanExerciseData.type === 'odd_one_out'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 13. Memory Flip -->
            <ExerciseMemoryFlip
              v-else-if="cleanExerciseData.type === 'memory_flip'"
              :exercise="cleanExerciseData"
              :isChecked="isChecked"
              @updateMatchCount="(val) => memoryMatchCount = val"
            />

            <!-- 14. True False Image -->
            <ExerciseTrueFalseImage
              v-else-if="cleanExerciseData.type === 'true_false_image'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 15. Hotspot -->
            <ExerciseHotspot
              v-else-if="cleanExerciseData.type === 'hotspot'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 16. Word Building -->
            <ExerciseWordBuilding
              v-else-if="cleanExerciseData.type === 'word_building'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 17. Sound Matching -->
            <ExerciseSoundMatching
              v-else-if="cleanExerciseData.type === 'sound_matching'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 18. Puzzle Assembly -->
            <ExercisePuzzleAssembly
              v-else-if="cleanExerciseData.type === 'puzzle_assembly'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 19. Fill Missing Number -->
            <ExerciseFillMissingNumber
              v-else-if="cleanExerciseData.type === 'fill_missing_number'"
              :exercise="cleanExerciseData"
              :fillBlankInput="fillBlankInput"
              @update:fillBlankInput="(val) => fillBlankInput = val"
              :isChecked="isChecked"
            />

            <!-- 20. Time Reading -->
            <ExerciseTimeReading
              v-else-if="cleanExerciseData.type === 'time_reading'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 21. Shape Transform -->
            <ExerciseShapeTransform
              v-else-if="cleanExerciseData.type === 'shape_transform'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 22. Count Select -->
            <ExerciseCountSelect
              v-else-if="cleanExerciseData.type === 'count_select'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              @select="handleSelectOption"
            />

            <!-- 23. Drag To Sort -->
            <ExerciseDragToSort
              v-else-if="cleanExerciseData.type === 'drag_to_sort'"
              :exercise="cleanExerciseData"
              :isChecked="isChecked"
              @updateCategoryMap="(val) => dragToSortCategoryMap = val"
            />

            <!-- 24. Number Tracing -->
            <ExerciseNumberTracing
              v-else-if="cleanExerciseData.type === 'number_tracing'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 25. Reading (Membaca Nyaring) -->
            <ExerciseReading
              v-else-if="cleanExerciseData.type === 'reading'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 26. Number Maze -->
            <ExerciseNumberMaze
              v-else-if="cleanExerciseData.type === 'number_maze'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 27. Balance Scale -->
            <ExerciseBalanceScale
              v-else-if="cleanExerciseData.type === 'balance_scale'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 28. Color By Number -->
            <ExerciseColorByNumber
              v-else-if="cleanExerciseData.type === 'color_by_number'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- 29. Syllable Clapping -->
            <ExerciseSyllableClapping
              v-else-if="cleanExerciseData.type === 'syllable_clapping'"
              :exercise="cleanExerciseData"
              :selectedOption="selectedOption"
              :isChecked="isChecked"
              :isCorrect="isCorrect"
              @select="handleSelectOption"
            />

            <!-- Fallback for unrecognized types -->
            <div v-else class="text-center py-8 text-slate-400 font-heading">
              <span class="text-4xl block mb-2">❓</span>
              <p class="font-bold text-sm text-slate-600">Tipe soal tidak dikenal: <code>{{ cleanExerciseData.type }}</code></p>
            </div>

          </div>

          <!-- Answer Feedback Result Banner (Shown after check) -->
          <div 
            v-if="isChecked" 
            class="p-4 rounded-2xl border-2 transition-all animate-pop flex items-start gap-3.5"
            :class="isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'"
          >
            <div class="text-3xl shrink-0">
              {{ isCorrect ? '🎉' : '❌' }}
            </div>
            <div class="flex-1 space-y-1">
              <h4 class="font-heading font-black text-sm">
                {{ isCorrect ? 'Luar Biasa! Jawaban Benar!' : 'Belum Tepat, Coba Lagi!' }}
              </h4>
              <p class="text-xs font-heading">
                {{ isCorrect ? (cleanExerciseData.explanation || 'Jawaban kamu sudah sesuai dengan kunci kuis.') : `Kunci yang benar: ${displayCorrectAnswer}` }}
              </p>
            </div>
          </div>

        </div>

        <!-- Modal Action Footer Bar -->
        <div class="bg-white px-5 py-3.5 border-t-2 border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button 
            @click="resetAnswerState"
            type="button"
            class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-extrabold text-xs rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>Reset Uji Coba</span>
          </button>

          <div class="flex items-center gap-2">
            <button 
              v-if="!isChecked"
              @click="checkAnswer"
              type="button"
              class="px-6 py-2.5 bg-duo-green hover:bg-emerald-600 text-white font-heading font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              :class="canCheck ? 'opacity-100' : 'opacity-60 cursor-not-allowed'"
              :disabled="!canCheck"
            >
              <span>✅</span>
              <span>Periksa Jawaban</span>
            </button>

            <button 
              v-else
              @click="resetAnswerState"
              type="button"
              class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-heading font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>🔁 Coba Jawab Ulang</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  exercise: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'edit'])

const showJsonInspector = ref(false)
const copied = ref(false)

// Interactive Engine State for Preview
const selectedOption = ref('')
const fillBlankInput = ref('')
const dragDropCount = ref(0)
const categoryMap = ref('')
const dragToSortCategoryMap = ref('')
const memoryMatchCount = ref(0)
const matchingSelections = ref({})
const isChecked = ref(false)
const isCorrect = ref(false)

// Clean Exercise Data (handles options array vs string, visual format, etc.)
const cleanExerciseData = computed(() => {
  if (!props.exercise) return {}
  const ex = { ...props.exercise }
  
  // Ensure options is an array
  if (typeof ex.options === 'string') {
    ex.options = ex.options.split(',').map(s => s.trim()).filter(Boolean)
  } else if (!Array.isArray(ex.options)) {
    ex.options = []
  }

  // Ensure visual object
  if (!ex.visual && ex.visual_emoji) {
    ex.visual = {
      type: 'objects',
      label: ex.visual_emoji,
      count: ex.visual_count || 1
    }
  }

  return ex
})

const difficultyBadgeClass = computed(() => {
  const d = props.exercise?.difficulty
  if (d === 'hard') return 'bg-rose-500 text-white'
  if (d === 'medium') return 'bg-amber-400 text-amber-950'
  return 'bg-emerald-400 text-emerald-950'
})

const difficultyLabel = computed(() => {
  const d = props.exercise?.difficulty
  if (d === 'hard') return '🔴 Menantang'
  if (d === 'medium') return '🟡 Sedang'
  return '🟢 Mudah'
})

const displayCorrectAnswer = computed(() => {
  if (!cleanExerciseData.value) return '-'
  return cleanExerciseData.value.correct_answer || cleanExerciseData.value.answer || '-'
})

// Type metadata lookup for title and icon
const typeInfoMap = {
  multiple_choice: { label: 'Pilihan Ganda', icon: '🔘' },
  true_false: { label: 'Benar / Salah', icon: '⚖️' },
  true_false_image: { label: 'Benar / Salah Gambar', icon: '🖼️' },
  fill_in_blank: { label: 'Isian Singkat', icon: '✍️' },
  matching: { label: 'Mencocokkan Garis', icon: '🔗' },
  drag_and_drop: { label: 'Seret & Lepas', icon: '🖐️' },
  drag_to_sort: { label: 'Seret ke Kategori', icon: '🗂️' },
  shadow_matching: { label: 'Cocok Bayangan', icon: '👥' },
  sequence_ordering: { label: 'Urutan Logis', icon: '🔢' },
  pattern_matching: { label: 'Pola Berulang', icon: '🧩' },
  odd_one_out: { label: 'Temukan yang Beda', icon: '🔍' },
  memory_flip: { label: 'Kartu Memori', icon: '🃏' },
  seek_find: { label: 'Cari & Temukan', icon: '🔎' },
  comparison: { label: 'Perbandingan Lebih Besar/Kecil', icon: '⚖️' },
  category_sorting: { label: 'Kelompokkan Kategori', icon: '📦' },
  hotspot: { label: 'Klik Titik Area (Hotspot)', icon: '🎯' },
  word_building: { label: 'Susun Kata Huruf', icon: '🔤' },
  sound_matching: { label: 'Cocokkan Suara', icon: '🔊' },
  puzzle_assembly: { label: 'Susun Keping Puzzle', icon: '🧩' },
  fill_missing_number: { label: 'Lengkapi Angka Hilang', icon: '❓' },
  time_reading: { label: 'Membaca Jam Analog', icon: '⏰' },
  shape_transform: { label: 'Transformasi Bentuk Geometri', icon: '🔷' },
  count_select: { label: 'Hitung & Pilih Angka', icon: '🔢' },
  number_tracing: { label: 'Tebalkan Angka (Tracing)', icon: '✏️' },
  reading: { label: 'Membaca Nyaring', icon: '📖' },
  number_maze: { label: 'Labirin Logika Angka', icon: '🌀' },
  balance_scale: { label: 'Timbangan Seimbang', icon: '⚖️' },
  color_by_number: { label: 'Mewarnai Angka', icon: '🎨' },
  syllable_clapping: { label: 'Ketukan Suku Kata', icon: '👏' }
}

const typeInfo = computed(() => {
  const type = cleanExerciseData.value.type
  return typeInfoMap[type] || { label: 'Latihan Kuis Interaktif', icon: '⭐' }
})

// Check whether answer can be verified
const canCheck = computed(() => {
  const ex = cleanExerciseData.value
  if (!ex) return false

  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'true_false_image' || 
      ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'odd_one_out' || 
      ex.type === 'shadow_matching' || ex.type === 'sound_matching' || ex.type === 'shape_transform' || 
      ex.type === 'count_select' || ex.type === 'number_tracing' || ex.type === 'time_reading' || 
      ex.type === 'sequence_ordering' || ex.type === 'word_building' || ex.type === 'puzzle_assembly' ||
      ex.type === 'reading' || ex.type === 'number_maze' || ex.type === 'balance_scale' ||
      ex.type === 'color_by_number' || ex.type === 'syllable_clapping') {
    return selectedOption.value !== ''
  }
  if (ex.type === 'hotspot') {
    return selectedOption.value !== ''
  }
  if (ex.type === 'fill_in_blank' || ex.type === 'fill_missing_number') {
    return fillBlankInput.value.trim() !== ''
  }
  if (ex.type === 'matching') {
    return Object.keys(matchingSelections.value).length > 0
  }
  if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
    return dragDropCount.value > 0
  }
  if (ex.type === 'category_sorting') {
    return categoryMap.value !== ''
  }
  if (ex.type === 'drag_to_sort') {
    return dragToSortCategoryMap.value !== ''
  }
  if (ex.type === 'memory_flip') {
    return memoryMatchCount.value > 0
  }
  return true
})

// Web Audio sound effects for instant authentic feedback
const playSound = (type) => {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (type === 'correct') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15) // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3) // G5
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    } else if (type === 'incorrect') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.15)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    }
  } catch (e) {
    // Audio context suppressed
  }
}

// Handlers for user interactions
const handleSelectOption = (opt) => {
  if (isChecked.value) return
  selectedOption.value = String(opt)
}

const handleMatchingPair = (left, right) => {
  if (isChecked.value) return
  for (const key of Object.keys(matchingSelections.value)) {
    if (matchingSelections.value[key] === right) {
      delete matchingSelections.value[key]
    }
  }
  matchingSelections.value[left] = right
}

const resetMatching = () => {
  if (isChecked.value) return
  matchingSelections.value = {}
}

const unpairMatching = (left) => {
  if (isChecked.value) return
  delete matchingSelections.value[left]
}

// Check answer logic mirroring the student engine
const checkAnswer = () => {
  if (isChecked.value) return
  const ex = cleanExerciseData.value
  let correct = false

  const targetStr = String(ex.correct_answer || '').trim().toLowerCase()

  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'true_false_image' || 
      ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'odd_one_out' || 
      ex.type === 'shadow_matching' || ex.type === 'hotspot' || ex.type === 'sound_matching' || 
      ex.type === 'time_reading' || ex.type === 'shape_transform' || ex.type === 'count_select' || 
      ex.type === 'number_tracing' || ex.type === 'puzzle_assembly' || ex.type === 'sequence_ordering' ||
      ex.type === 'balance_scale' || ex.type === 'syllable_clapping') {
    correct = String(selectedOption.value).trim().toLowerCase() === targetStr
  } else if (ex.type === 'fill_in_blank' || ex.type === 'fill_missing_number') {
    correct = fillBlankInput.value.trim().toLowerCase() === targetStr
  } else if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
    const expectedCount = parseInt(targetStr, 10) || 0
    correct = dragDropCount.value === expectedCount
  } else if (ex.type === 'matching') {
    if (ex.pairs && ex.pairs.length > 0) {
      correct = ex.pairs.every(p => matchingSelections.value[p.left] === p.right)
    } else {
      correct = Object.keys(matchingSelections.value).length > 0
    }
  } else if (ex.type === 'category_sorting') {
    correct = String(categoryMap.value).trim().toLowerCase() === targetStr
  } else if (ex.type === 'drag_to_sort') {
    correct = String(dragToSortCategoryMap.value).trim().toLowerCase() === targetStr
  } else if (ex.type === 'memory_flip') {
    const totalPairs = (ex.options?.length || 4) / 2
    correct = memoryMatchCount.value >= totalPairs
  } else if (ex.type === 'word_building') {
    correct = String(selectedOption.value).trim().toLowerCase() === targetStr
  } else if (ex.type === 'reading') {
    const cleanPunctuation = (str) => String(str || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim()
    const targetClean = cleanPunctuation(targetStr)
    const answerClean = cleanPunctuation(selectedOption.value)
    if (answerClean === targetClean || answerClean.includes(targetClean) || targetClean.includes(answerClean)) {
      correct = true
    } else {
      const targetWords = targetClean.split(/\s+/).filter(Boolean)
      const spokenWords = answerClean.split(/\s+/).filter(Boolean)
      if (targetWords.length > 0) {
        const matched = targetWords.filter(tw => spokenWords.some(sw => sw === tw || sw.includes(tw) || tw.includes(sw))).length
        correct = (matched / targetWords.length) >= 0.7
      } else {
        correct = true
      }
    }
  } else if (ex.type === 'number_maze') {
    const normalizeSeq = (str) => String(str || '').replace(/[\s\->]+/g, ',').split(',').map(s => s.trim()).filter(Boolean).join(',')
    correct = normalizeSeq(selectedOption.value) === normalizeSeq(targetStr)
  } else if (ex.type === 'color_by_number') {
    const userVal = String(selectedOption.value || '').trim().toLowerCase()
    correct = userVal === 'completed' || userVal === targetStr || (targetStr === 'completed' && userVal.includes('completed'))
  } else {
    correct = selectedOption.value !== ''
  }

  isCorrect.value = correct
  isChecked.value = true
  playSound(correct ? 'correct' : 'incorrect')
}

// Reset state
const resetAnswerState = () => {
  selectedOption.value = ''
  fillBlankInput.value = ''
  dragDropCount.value = 0
  categoryMap.value = ''
  dragToSortCategoryMap.value = ''
  memoryMatchCount.value = 0
  matchingSelections.value = {}
  isChecked.value = false
  isCorrect.value = false
}

// Reset when exercise changes or modal opens
watch(() => props.exercise, () => {
  resetAnswerState()
}, { deep: true })

watch(() => props.isOpen, (open) => {
  if (open) {
    resetAnswerState()
    showJsonInspector.value = false
  }
})

const closeModal = () => {
  emit('close')
}

const copyJson = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(cleanExerciseData.value, null, 2))
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>
