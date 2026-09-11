<template>
  <div 
    class="min-h-screen bg-slate-50 relative flex flex-col justify-between pb-32 overflow-x-hidden w-full max-w-full transition-all duration-300"
    :class="engine.comboCount >= 5 
      ? 'ring-4 ring-orange-500 shadow-2xl shadow-orange-500/20' 
      : engine.comboCount >= 3 
        ? 'ring-4 ring-amber-400/80' 
        : ''"
  >
    <!-- Playful Educational Doodle Background Pattern Layer -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <!-- Ambient Pastel Vignette Gradients for Depth -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Seamless Educational Doodle Pattern Tile -->
      <div 
        class="absolute inset-0 opacity-[0.065] sm:opacity-[0.075]" 
        style="background-image: url('/images/patterns/doodle_pattern.svg'); background-repeat: repeat; background-size: 280px 280px;"
      ></div>
    </div>

    <!-- Lesson Runner Top Header Bar -->
    <header class="px-2.5 py-2 sm:p-4 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 sticky top-0 z-30 shadow-2xs overflow-hidden">
      <div class="max-w-3xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 w-full min-w-0">
        <!-- Close / Quit Button -->
        <NuxtLink 
          to="/" 
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-transform active:scale-90 shrink-0 border border-slate-200"
          title="Keluar ke Dashboard"
        >
          <X class="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
        </NuxtLink>

        <!-- Question Index Pill (e.g. Soal 2 / 8) -->
        <div class="flex items-center gap-1 px-2.5 py-1 sm:py-1.5 bg-slate-100 border border-slate-200 rounded-xl sm:rounded-2xl font-heading font-black text-[11px] sm:text-xs text-slate-700 whitespace-nowrap shrink-0 shadow-2xs">
          <span class="text-slate-400 font-bold hidden xs:inline">Soal</span>
          <span class="text-emerald-700 font-black">{{ (engine.currentIndex || 0) + 1 }}</span>
          <span class="text-slate-300 font-bold">/</span>
          <span class="text-slate-600 font-extrabold">{{ engine.totalExercises || 0 }}</span>
        </div>

        <!-- Liquid Shimmer Progress Bar Track (Wide & Clear) -->
        <div class="flex-1 bg-slate-100 h-3.5 sm:h-5 rounded-full overflow-hidden p-0.5 border sm:border-2 border-slate-200 min-w-0 relative shadow-inner">
          <div 
            class="bg-gradient-to-r from-emerald-400 via-emerald-500 to-[#58cc02] h-full rounded-full transition-all duration-500 shadow-md relative overflow-hidden flex items-center justify-end pr-1"
            :style="{ width: `${Math.max(engine.progressPercentage, 4)}%` }"
          >
            <!-- Liquid Shimmer Overlay -->
            <div class="absolute inset-0 bg-liquid-shimmer pointer-events-none opacity-50"></div>
          </div>
        </div>

        <!-- Active Combo Multiplier Badge with Fiery Glow -->
        <div 
          v-if="engine.comboCount >= 2" 
          class="flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white rounded-xl sm:rounded-2xl border sm:border-2 border-white font-heading font-black text-[10px] sm:text-xs animate-bounce shadow-md shrink-0" 
          title="Combo Beruntun!"
        >
          <span>🔥 {{ engine.comboCount }}x</span>
        </div>

        <!-- Toggle Progress Path Button (Desktop only to prevent mobile crowding) -->
        <button 
          @click="isPathOpen = !isPathOpen"
          class="hidden sm:flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-heading font-black text-[11px] sm:text-xs rounded-2xl transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95"
          title="Tampilkan / Sembunyikan Peta Jalur Belajar"
        >
          <span>🗺️</span>
          <span>Peta</span>
          <ChevronDown v-if="!isPathOpen" class="w-3.5 h-3.5 text-amber-700" />
          <ChevronUp v-else class="w-3.5 h-3.5 text-amber-700" />
        </button>

        <!-- Petunjuk Kiko Button (Compact on Mobile) -->
        <button
          @click="toggleHint"
          type="button"
          class="w-8 h-8 sm:w-auto px-0 sm:px-3.5 py-0 sm:py-1.5 justify-center bg-amber-100 hover:bg-amber-200 text-amber-900 border sm:border-2 border-amber-300 rounded-xl sm:rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0 active:scale-95"
          title="Petunjuk Kiko"
        >
          <span class="text-sm sm:text-base">💡</span>
          <span class="hidden sm:inline">Petunjuk</span>
        </button>

        <!-- Remaining Hearts with Tactile Badge -->
        <div class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1 sm:py-1.5 bg-rose-50 rounded-xl sm:rounded-2xl border sm:border-2 border-rose-200 text-rose-600 font-heading font-black text-xs sm:text-sm shrink-0 shadow-2xs">
          <Heart class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>{{ userStore.hearts }}</span>
        </div>
      </div>
    </header>

    <!-- Main Question Container -->
    <main class="max-w-2xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8 flex-1 overflow-x-hidden relative z-10">
      <div v-if="engine.currentExercise" class="space-y-4 sm:space-y-8 animate-pop w-full min-w-0">
        <!-- Hint Text Drawer (Opens when Hint button is clicked) -->
        <div v-if="engine.showHint" class="p-3.5 sm:p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs sm:text-sm font-heading font-bold text-amber-900 animate-pop flex items-center gap-3 shadow-sm">
          <span class="text-2xl sm:text-3xl">💡</span>
          <div>
            <span class="block font-black text-amber-950">Petunjuk Kiko:</span>
            <span>{{ getExerciseInstruction(engine.currentExercise.type) || 'Hitung objek satu per satu secara teliti dari kiri ke kanan ya, kamu pasti bisa!' }}</span>
          </div>
        </div>

        <!-- Book-Style Question Visual Illustration -->
        <QuestionVisual :exercise="engine.currentExercise" />

        <!-- Render Specific Exercise Component -->
        <ExerciseMultipleChoice
          v-if="engine.currentExercise.type === 'multiple_choice'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseTrueFalse
          v-else-if="engine.currentExercise.type === 'true_false'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseFillBlank
          v-else-if="engine.currentExercise.type === 'fill_in_blank'"
          :exercise="engine.currentExercise"
          :fillBlankInput="engine.fillBlankInput"
          @update:fillBlankInput="(val) => engine.fillBlankInput = val"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
        />

        <ExerciseDragDrop
          v-else-if="engine.currentExercise.type === 'drag_and_drop'"
          :exercise="engine.currentExercise"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @updateCount="(val) => engine.dragDropCount = val"
        />

        <ExerciseMatching
          v-else-if="engine.currentExercise.type === 'matching'"
          :exercise="engine.currentExercise"
          :matchingSelections="engine.matchingSelections"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @pair="engine.handleMatchingClick"
          @reset="engine.resetMatching"
          @unpair="engine.unpairMatching"
        />

        <ExerciseShadowMatch
          v-else-if="engine.currentExercise.type === 'shadow_matching'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseSequence
          v-else-if="engine.currentExercise.type === 'sequence_ordering'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseComparison
          v-else-if="engine.currentExercise.type === 'comparison'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExercisePattern
          v-else-if="engine.currentExercise.type === 'pattern_matching'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseSeekFind
          v-else-if="engine.currentExercise.type === 'seek_find'"
          :exercise="engine.currentExercise"
          :isChecked="engine.isChecked"
          @updateCount="(val) => engine.dragDropCount = val"
        />

        <ExerciseCategorySort
          v-else-if="engine.currentExercise.type === 'category_sorting'"
          :exercise="engine.currentExercise"
          :isChecked="engine.isChecked"
          @updateCategoryMap="(val) => engine.categoryMap = val"
        />

        <ExerciseOddOneOut
          v-else-if="engine.currentExercise.type === 'odd_one_out'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseMemoryFlip
          v-else-if="engine.currentExercise.type === 'memory_flip'"
          :exercise="engine.currentExercise"
          :isChecked="engine.isChecked"
          @updateMatchCount="(val) => engine.memoryMatchCount = val"
        />

        <ExerciseTrueFalseImage
          v-else-if="engine.currentExercise.type === 'true_false_image'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.handleTrueFalseImage"
        />

        <ExerciseHotspot
          v-else-if="engine.currentExercise.type === 'hotspot'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseWordBuilding
          v-else-if="engine.currentExercise.type === 'word_building'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseSoundMatching
          v-else-if="engine.currentExercise.type === 'sound_matching'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExercisePuzzleAssembly
          v-else-if="engine.currentExercise.type === 'puzzle_assembly'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseFillMissingNumber
          v-else-if="engine.currentExercise.type === 'fill_missing_number'"
          :exercise="engine.currentExercise"
          :fillBlankInput="engine.fillBlankInput"
          @update:fillBlankInput="(val) => engine.fillBlankInput = val"
          :isChecked="engine.isChecked"
        />

        <ExerciseTimeReading
          v-else-if="engine.currentExercise.type === 'time_reading'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseShapeTransform
          v-else-if="engine.currentExercise.type === 'shape_transform'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseCountSelect
          v-else-if="engine.currentExercise.type === 'count_select'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          @select="engine.selectOption"
        />

        <ExerciseDragToSort
          v-else-if="engine.currentExercise.type === 'drag_to_sort'"
          :exercise="engine.currentExercise"
          :isChecked="engine.isChecked"
          @updateCategoryMap="(val) => engine.dragToSortCategoryMap = val"
        />

        <ExerciseNumberTracing
          v-else-if="engine.currentExercise.type === 'number_tracing'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseReading
          v-else-if="engine.currentExercise.type === 'reading'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseNumberMaze
          v-else-if="engine.currentExercise.type === 'number_maze'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseBalanceScale
          v-else-if="engine.currentExercise.type === 'balance_scale'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseColorByNumber
          v-else-if="engine.currentExercise.type === 'color_by_number'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />

        <ExerciseSyllableClapping
          v-else-if="engine.currentExercise.type === 'syllable_clapping'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />
      </div>
    </main>

    <!-- Bottom Check Answer Bar (Visible when not checked) -->
    <footer v-if="!engine.isChecked" class="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 p-3 sm:p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div class="max-w-2xl mx-auto flex items-center justify-between gap-3 sm:gap-4 w-full">
        <!-- Voice Answer Microphone Button -->
        <VoiceAnswerButton 
          :disabled="engine.isChecked"
          :options="currentExerciseOptions"
          @voiceSelect="handleVoiceSelection"
        />

        <button 
          @click="handleManualCheckAnswer"
          type="button"
          class="flex-1 px-4 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-heading font-black rounded-2xl transition-all cursor-pointer text-center justify-center min-w-0 select-none active:translate-y-1 flex items-center gap-2"
          :class="canCheck 
            ? 'duo-btn-green border-b-6 border-emerald-700 shadow-lg shadow-emerald-500/30 hover:scale-[1.01] active:border-b-2' 
            : 'bg-slate-200 border-2 border-b-4 border-slate-300 text-slate-400 cursor-not-allowed'"
        >
          <span class="truncate">PERIKSA JAWABAN 🚀</span>
          <span v-if="canCheck" class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-black/20 text-white/90 text-xs font-heading font-black">
            ↵ Enter
          </span>
        </button>
      </div>
    </footer>

    <!-- Bottom Feedback Drawer (Visible when checked) -->
    <FeedbackDrawer
      :isChecked="engine.isChecked"
      :isCorrect="engine.isCorrect"
      :correctAnswer="engine.currentExercise?.correct_answer"
      :explanation="engine.feedbackExplanation"
      @next="engine.nextExercise"
    />

    <!-- Animated Mascot Companion Kiko -->
    <MascotCompanion
      :isChecked="engine.isChecked"
      :isCorrect="engine.isCorrect"
    />

    <!-- Collapsible Mini Progress Path Drawer -->
    <MiniPathDrawer
      :isOpen="isPathOpen"
      @close="isPathOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, unref, watch, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useVoiceNarrator } from '~/composables/useVoiceNarrator'
import { X, Heart, ChevronDown, ChevronUp } from 'lucide-vue-next'

const props = defineProps({
  engine: { type: Object, required: true },
  lessonSummary: { type: String, default: '' }
})

const userStore = useUserStore()
const narrator = useVoiceNarrator()
const isPathOpen = ref(false)

const currentExerciseOptions = computed(() => {
  const ex = unref(props.engine.currentExercise)
  if (!ex) return []
  if (ex.options && Array.isArray(ex.options) && ex.options.length > 0) {
    return ex.options
  }
  if (ex.type === 'true_false') {
    return ['Benar', 'Salah']
  }
  return []
})

const canCheck = computed(() => {
  const ex = unref(props.engine.currentExercise)
  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'true_false_image' || ex.type === 'sequence_ordering' || ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'odd_one_out' || ex.type === 'shadow_matching' || ex.type === 'hotspot' || ex.type === 'word_building' || ex.type === 'sound_matching' || ex.type === 'puzzle_assembly' || ex.type === 'time_reading' || ex.type === 'shape_transform' || ex.type === 'count_select' || ex.type === 'number_tracing' || ex.type === 'reading' || ex.type === 'number_maze' || ex.type === 'balance_scale' || ex.type === 'color_by_number' || ex.type === 'syllable_clapping') {
    return !!unref(props.engine.selectedOption)
  }
  if (ex.type === 'fill_in_blank' || ex.type === 'fill_missing_number') {
    const val = unref(props.engine.fillBlankInput) || ''
    return !!val.trim()
  }
  if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
    return unref(props.engine.dragDropCount) >= 0
  }
  if (ex.type === 'category_sorting' || ex.type === 'drag_to_sort') {
    return !!unref(props.engine.categoryMap) || !!unref(props.engine.dragToSortCategoryMap)
  }
  if (ex.type === 'memory_flip') {
    return unref(props.engine.memoryMatchCount) > 0
  }
  if (ex.type === 'matching') {
    const selections = unref(props.engine.matchingSelections) || {}
    return Object.keys(selections).length > 0
  }
  return false
})

const handleVoiceSelection = (val) => {
  const ex = unref(props.engine.currentExercise)
  if (!ex) return

  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'sequence_ordering' || ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'number_tracing' || ex.type === 'reading' || ex.type === 'balance_scale' || ex.type === 'syllable_clapping') {
    props.engine.selectOption(val)
  } else if (ex.type === 'fill_in_blank') {
    props.engine.fillBlankInput = val
  } else if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
    props.engine.dragDropCount = parseInt(val) || 0
  }

  // Automatic Answer Verification after voice selection
  setTimeout(() => {
    if (canCheck.value && !props.engine.isChecked) {
      props.engine.checkAnswer()
    }
  }, 400)
}

const handleManualCheckAnswer = () => {
  narrator.stop()
  if (canCheck.value) {
    props.engine.checkAnswer()
  } else {
    props.engine.showHint = true
    narrator.speak('Pilih atau tentukan jawabanmu terlebih dahulu ya!', true)
  }
}

const toggleHint = () => {
  props.engine.showHint = !props.engine.showHint
  if (props.engine.showHint) {
    const tip = getExerciseInstruction(props.engine.currentExercise?.type) || 'Hitung objek satu per satu secara teliti dari kiri ke kanan ya, kamu pasti bisa!'
    narrator.speak(`Petunjuk: ${tip}`, true)
  } else {
    narrator.stop()
  }
}

// Auto-speak question on new question load
watch(() => props.engine.currentExercise?.id, (newId) => {
  if (newId && props.engine.currentExercise?.question) {
    narrator.autoSpeak(props.engine.currentExercise.question)
  }
}, { immediate: true })

// Stop narrator speech when answer is checked or component unmounts
watch(() => props.engine.isChecked, (checked) => {
  if (checked) {
    narrator.stop()
  }
})

// Keyboard shortcuts handler (1, 2, 3, 4, Enter, Space)
const handleKeyDown = (e) => {
  // Ignore if typing in text inputs
  const tag = document.activeElement?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea') {
    return
  }

  // 1. If drawer is open (answer checked), Enter or Space advances to next exercise!
  if (props.engine.isChecked) {
    if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
      e.preventDefault()
      props.engine.nextExercise()
      return
    }
  }

  // 2. If not checked yet, Enter checks answer
  if (e.key === 'Enter') {
    e.preventDefault()
    handleManualCheckAnswer()
    return
  }

  // 3. Number keys 1-9 to select options for choice questions
  const num = parseInt(e.key)
  if (!isNaN(num) && num >= 1 && num <= 9 && !props.engine.isChecked) {
    const opts = currentExerciseOptions.value
    if (opts && opts.length >= num) {
      e.preventDefault()
      const selected = opts[num - 1]
      props.engine.selectOption(selected)
    }
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
  narrator.stop()
})

const getExerciseInstruction = (type) => {
  const instructionMap = {
    'multiple_choice': 'Pilih satu jawaban yang paling tepat ya!',
    'true_false': 'Pilih apakah pernyataan ini Benar atau Salah!',
    'true_false_image': 'Perhatikan gambar, lalu pilih Benar atau Salah!',
    'fill_in_blank': 'Tulis jawabanmu di kotak yang tersedia!',
    'matching': 'Tarik garis untuk memasangkan gambar yang cocok!',
    'drag_and_drop': 'Seret objek ke kotak jawaban yang sesuai!',
    'shadow_matching': 'Cocokkan objek dengan bentuk bayangannya!',
    'sequence_ordering': 'Susun urutan angka atau gambar secara benar!',
    'pattern_matching': 'Lanjutkan pola berulang yang tepat berikutnya!',
    'odd_one_out': 'Temukan satu gambar yang paling berbeda!',
    'memory_flip': 'Buka kartu dan temukan pasangan yang sama!',
    'seek_find': 'Cari dan hitung objek tersembunyi di gambar!',
    'comparison': 'Tentukan kelompok mana yang lebih banyak atau sedikit!',
    'category_sorting': 'Kelompokkan objek ke kategori yang sesuai!',
    'drag_to_sort': 'Tarik objek ke keranjang kategori yang benar!',
    'hotspot': 'Sentuh atau klik area yang diminta pada gambar!',
    'word_building': 'Susun huruf-huruf menjadi kata yang benar!',
    'sound_matching': 'Dengarkan suara dan pilih gambar yang cocok!',
    'puzzle_assembly': 'Susun potongan puzzle menjadi gambar utuh!',
    'fill_missing_number': 'Tebak angka yang hilang di barisan ini!',
    'time_reading': 'Lihat jarum jam dan pilih waktu yang tepat!',
    'shape_transform': 'Perhatikan perubahan bentuk geometri ini!',
    'count_select': 'Hitung jumlah objeknya, lalu pilih angkanya!',
    'number_tracing': 'Tebalkan garis pola angka ini dengan jarimu!',
    'reading': 'Ucapkan atau baca teks ini dengan nyaring!',
    'number_maze': 'Ikuti jalur labirin angka yang benar!',
    'balance_scale': 'Seimbangkan timbangan dengan jumlah yang sama!',
    'color_by_number': 'Warnai bagian gambar sesuai nomor angkanya!',
    'syllable_clapping': 'Hitung ketukan suku kata dari kata tersebut!'
  }
  return instructionMap[type] || 'Ayo selesaikan tantangan ini!'
}

const getExerciseTypeLabel = (type) => {
  const typeMap = {
    'multiple_choice': 'Pilihan Ganda',
    'true_false': 'Benar/Salah',
    'fill_in_blank': 'Isi Kosong',
    'matching': 'Mencocokkan',
    'drag_and_drop': 'Seret & Lepas',
    'shadow_matching': 'Cocok Bayangan',
    'sequence_ordering': 'Urutkan',
    'pattern_matching': 'Pola',
    'odd_one_out': 'Yang Beda',
    'memory_flip': 'Kartu Memori',
    'seek_find': 'Cari Objek',
    'comparison': 'Perbandingan',
    'category_sorting': 'Kelompokkan',
    'drag_to_sort': 'Seret ke Kategori',
    'true_false_image': 'Benar/Salah Gambar',
    'hotspot': 'Klik Area',
    'word_building': 'Susun Kata',
    'sound_matching': 'Cocok Suara',
    'puzzle_assembly': 'Susun Puzzle',
    'fill_missing_number': 'Angka Hilang',
    'time_reading': 'Baca Jam',
    'shape_transform': 'Transformasi Bentuk',
    'count_select': 'Hitung & Pilih',
    'number_tracing': 'Tebalkan Angka',
    'reading': 'Membaca Nyaring',
    'number_maze': 'Labirin Logika Angka',
    'balance_scale': 'Timbangan Seimbang',
    'color_by_number': 'Mewarnai Angka',
    'syllable_clapping': 'Ketukan Suku Kata'
  }
  return typeMap[type] || 'Soal'
}

const getExerciseTypeIcon = (type) => {
  const iconMap = {
    'multiple_choice': '📝',
    'true_false': '✅',
    'fill_in_blank': '✏️',
    'matching': '🔗',
    'drag_and_drop': '🎯',
    'shadow_matching': '👥',
    'sequence_ordering': '📊',
    'pattern_matching': '🧩',
    'odd_one_out': '🚫',
    'memory_flip': '🃏',
    'seek_find': '🔍',
    'comparison': '⚖️',
    'category_sorting': '📦',
    'drag_to_sort': '📦',
    'true_false_image': '🖼️',
    'hotspot': '🎯',
    'word_building': '🔤',
    'sound_matching': '🔊',
    'puzzle_assembly': '🧩',
    'fill_missing_number': '🔢',
    'time_reading': '⏰',
    'shape_transform': '🔷',
    'count_select': '🔢',
    'number_tracing': '✏️',
    'reading': '📖',
    'number_maze': '🌀',
    'balance_scale': '⚖️',
    'color_by_number': '🎨',
    'syllable_clapping': '👏'
  }
  return iconMap[type] || '🎮'
}
</script>
