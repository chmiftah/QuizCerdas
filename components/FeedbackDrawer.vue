<template>
  <Teleport to="body">
    <div 
      v-if="isChecked" 
      class="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 transition-all duration-300 transform animate-pop"
      :class="isCorrect ? 'bg-emerald-100 border-t-4 border-duo-green text-slate-800' : 'bg-rose-100 border-t-4 border-duo-red text-slate-800'"
    >
      <div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Feedback Icon & Text -->
        <div class="flex items-start gap-4">
          <div 
            class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
            :class="isCorrect ? 'bg-duo-green text-white' : 'bg-duo-red text-white'"
          >
            <CheckCircle2 v-if="isCorrect" class="w-9 h-9 stroke-[3]" />
            <XCircle v-else class="w-9 h-9 stroke-[3]" />
          </div>

          <div class="space-y-1">
            <h3 class="font-heading text-xl sm:text-2xl font-extrabold" :class="isCorrect ? 'text-duo-green-dark' : 'text-duo-red-dark'">
              {{ isCorrect ? getCorrectTitle() : 'Jawaban Kurang Tepat!' }}
            </h3>
            
            <p v-if="!isCorrect && correctAnswer" class="text-sm font-heading font-bold text-slate-700">
              Jawaban yang benar: <span class="text-duo-green-dark font-extrabold underline">{{ correctAnswer }}</span>
            </p>

            <p class="text-sm text-slate-700 max-w-xl font-body leading-relaxed">
              {{ explanation }}
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <button 
          @click="handleNext"
          :disabled="isClicked"
          class="w-full sm:w-auto px-8 py-3.5 text-lg font-heading font-bold shrink-0 shadow-lg"
          :class="isCorrect ? 'duo-btn-green' : 'duo-btn-red'"
        >
          {{ isCorrect ? 'Lanjut' : 'Mengerti' }}
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
