<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between pb-32">
    <!-- Lesson Runner Top Header Bar -->
    <header class="p-2.5 sm:p-4 bg-white border-b-2 border-duo-gray-100 sticky top-0 z-30 shadow-2xs">
      <div class="max-w-3xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        <!-- Close / Quit Button -->
        <NuxtLink to="/" class="p-1 text-duo-gray-400 hover:text-slate-800 transition-colors rounded-xl hover:bg-duo-gray-50 shrink-0">
          <X class="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
        </NuxtLink>

        <!-- Progress Bar Track -->
        <div class="flex-1 bg-duo-gray-100 h-3 sm:h-4 rounded-full overflow-hidden p-0.5 border border-duo-gray-200 min-w-0">
          <div 
            class="bg-duo-green h-full rounded-full transition-all duration-300 shadow-sm"
            :style="{ width: `${engine.progressPercentage}%` }"
          ></div>
        </div>

        <!-- Toggle Progress Path Button -->
        <button 
          @click="isPathOpen = !isPathOpen"
          class="flex items-center gap-1 px-2 sm:px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-heading font-bold text-[11px] sm:text-xs rounded-xl sm:rounded-2xl transition-colors cursor-pointer shrink-0 shadow-2xs"
          title="Tampilkan / Sembunyikan Peta Jalur Belajar"
        >
          <span>🗺️</span>
          <span class="hidden sm:inline">Peta Jalur</span>
          <ChevronDown v-if="!isPathOpen" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
          <ChevronUp v-else class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
        </button>

        <!-- Active Combo Multiplier Badge -->
        <div v-if="engine.comboCount >= 2" class="flex items-center gap-1 px-2 sm:px-3 py-1 bg-amber-500 text-white rounded-xl sm:rounded-2xl border-2 border-amber-300 font-heading font-black text-[11px] sm:text-xs animate-bounce shadow-md shrink-0" title="Combo Jawab Benar!">
          <span>🔥 <span class="hidden sm:inline">Combo </span>x{{ engine.comboCount }}!</span>
        </div>

        <!-- Remaining Hearts -->
        <div class="flex items-center gap-1 px-2 sm:px-3 py-1 bg-rose-50 rounded-xl sm:rounded-2xl border border-rose-200 text-duo-red font-heading font-extrabold text-[11px] sm:text-sm shrink-0">
          <Heart class="w-4 h-4 sm:w-5 sm:h-5 fill-duo-red" />
          <span>{{ userStore.hearts }}</span>
        </div>
      </div>
    </header>

    <!-- Main Question Container -->
    <main class="max-w-2xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8 flex-1">
      <div v-if="engine.currentExercise" class="space-y-4 sm:space-y-8 animate-pop">
        <!-- Lesson Summary Header & Hint Button -->
        <div class="flex items-center justify-between gap-3">
          <div v-if="lessonSummary" class="bg-blue-50 border-2 border-duo-blue/30 rounded-2xl p-3 flex items-center gap-2 flex-1">
            <span class="text-base">💡</span>
            <p class="text-xs font-heading font-semibold text-slate-700 truncate">
              {{ lessonSummary }}
            </p>
          </div>

          <button
            @click="toggleHint"
            type="button"
            class="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 rounded-2xl font-heading font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0 active:scale-95"
          >
            <span>💡 Petunjuk Kiko</span>
          </button>
        </div>

        <!-- Hint Text Drawer -->
        <div v-if="engine.showHint" class="p-4 bg-amber-50 border-3 border-amber-300 rounded-2xl text-xs sm:text-sm font-heading font-bold text-amber-900 animate-pop flex items-center gap-3 shadow-md">
          <span class="text-2xl">🐼</span>
          <div>
            <span class="block font-black text-amber-950">Petunjuk Kiko:</span>
            <span>"Hitung objek satu per satu secara teliti dari kiri ke kanan ya, kamu pasti bisa!"</span>
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

        <ExerciseShadowMatch
          v-else-if="engine.currentExercise.type === 'shadow_matching'"
          :exercise="engine.currentExercise"
          :selectedOption="engine.selectedOption"
          :isChecked="engine.isChecked"
          :isCorrect="engine.isCorrect"
          @select="engine.selectOption"
        />
      </div>
    </main>

    <!-- Bottom Check Answer Bar (Visible when not checked) -->
    <footer v-if="!engine.isChecked" class="fixed bottom-0 left-0 right-0 z-20 bg-white border-t-2 border-duo-gray-100 p-3 sm:p-6 shadow-lg">
      <div class="max-w-2xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
        <!-- Voice Answer Microphone Button -->
        <VoiceAnswerButton 
          :disabled="engine.isChecked"
          :options="currentExerciseOptions"
          @voiceSelect="handleVoiceSelection"
        />

        <button 
          @click="handleManualCheckAnswer"
          type="button"
          class="flex-1 sm:flex-initial px-4 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-lg font-heading font-black duo-btn-green rounded-xl sm:rounded-2xl shadow-md transition-transform active:scale-95 cursor-pointer text-center justify-center min-w-0 truncate"
        >
          CEK JAWABAN 🚀
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
import { ref, computed, unref } from 'vue'
import { useUserStore } from '~/stores/user'
import { X, Heart, ChevronDown, ChevronUp } from 'lucide-vue-next'

const props = defineProps({
  engine: { type: Object, required: true },
  lessonSummary: { type: String, default: '' }
})

const userStore = useUserStore()
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
  if (!ex) return false

  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'sequence_ordering' || ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'odd_one_out' || ex.type === 'shadow_matching') {
    return !!unref(props.engine.selectedOption)
  }
  if (ex.type === 'fill_in_blank') {
    const val = unref(props.engine.fillBlankInput) || ''
    return !!val.trim()
  }
  if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
    return unref(props.engine.dragDropCount) >= 0
  }
  if (ex.type === 'category_sorting') {
    return !!unref(props.engine.categoryMap)
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

  if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'sequence_ordering' || ex.type === 'comparison' || ex.type === 'pattern_matching') {
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
  if (canCheck.value) {
    props.engine.checkAnswer()
  } else {
    props.engine.showHint = true
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance('Pilih atau katakan jawabanmu terlebih dahulu ya!')
      utterance.lang = 'id-ID'
      window.speechSynthesis.speak(utterance)
    }
  }
}

const toggleHint = () => {
  props.engine.showHint = !props.engine.showHint
  if (props.engine.showHint && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance('Hitung objek satu per satu secara teliti dari kiri ke kanan ya, kamu pasti bisa!')
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}
</script>
