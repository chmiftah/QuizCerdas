<template>
  <Teleport to="body">
    <div 
      v-if="isChecked" 
      class="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-6 transition-all duration-300 transform animate-pop shadow-2xl"
      :class="isCorrect ? 'bg-emerald-100 border-t-4 border-duo-green text-slate-800' : 'bg-rose-100 border-t-4 border-duo-red text-slate-800'"
    >
      <div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <!-- Feedback Icon & Text -->
        <div class="flex items-start gap-3 sm:gap-4">
          <div 
            class="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-md"
            :class="isCorrect ? 'bg-duo-green text-white' : 'bg-duo-red text-white'"
          >
            <CheckCircle2 v-if="isCorrect" class="w-6 h-6 sm:w-9 sm:h-9 stroke-[3]" />
            <XCircle v-else class="w-6 h-6 sm:w-9 sm:h-9 stroke-[3]" />
          </div>

          <div class="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
            <h3 class="font-heading text-lg sm:text-2xl font-extrabold" :class="isCorrect ? 'text-duo-green-dark' : 'text-duo-red-dark'">
              {{ isCorrect ? getCorrectTitle() : 'Jawaban Kurang Tepat!' }}
            </h3>
            
            <p v-if="!isCorrect && correctAnswer" class="text-xs sm:text-sm font-heading font-bold text-slate-700">
              Jawaban yang benar: <span class="text-duo-green-dark font-extrabold underline">{{ correctAnswer }}</span>
            </p>

            <p v-if="explanation" class="text-xs sm:text-sm text-slate-700 max-w-xl font-body leading-relaxed">
              {{ explanation }}
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <button 
          @click="handleNext"
          :disabled="isClicked"
          class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-heading font-extrabold shrink-0 shadow-lg rounded-xl sm:rounded-2xl cursor-pointer"
          :class="isCorrect ? 'duo-btn-green' : 'duo-btn-red'"
        >
          {{ isCorrect ? 'Lanjut 🚀' : 'Mengerti 👍' }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false },
  correctAnswer: { type: String, default: '' },
  explanation: { type: String, default: '' }
})

const emit = defineEmits(['next'])

const { playCorrect, playWrong } = useSoundEffects()
const isClicked = ref(false)

watch(() => props.isChecked, (val) => {
  if (val) {
    isClicked.value = false
    if (props.isCorrect) {
      playCorrect()
    } else {
      playWrong()
    }
  }
})

const handleNext = () => {
  if (isClicked.value) return
  isClicked.value = true
  emit('next')
}

const correctTitles = [
  'Luar Biasa!',
  'Hebat Sekali! 🎉',
  'Kamu Pintar!',
  'Jawaban Tepat! ⭐',
  'Kerja Bagus! 🚀'
]

const getCorrectTitle = () => {
  return correctTitles[Math.floor(Math.random() * correctTitles.length)]
}
</script>
