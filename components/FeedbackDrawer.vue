<template>
  <Teleport to="body">
    <div 
      v-if="isChecked" 
      class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 transform shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t-4"
      :class="isCorrect 
        ? 'bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 border-duo-green text-slate-900 animate-pop' 
        : 'bg-gradient-to-r from-rose-100 via-red-50 to-rose-100 border-duo-red text-slate-900 animate-shake'"
    >
      <div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <!-- Feedback Icon, Mascot & Text -->
        <div class="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          <!-- Tactile Status Badge -->
          <div 
            class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center shrink-0 shadow-lg border-2"
            :class="isCorrect 
              ? 'bg-gradient-to-tr from-emerald-500 to-[#58cc02] border-white text-white animate-jelly' 
              : 'bg-gradient-to-tr from-rose-500 to-red-600 border-white text-white'"
          >
            <CheckCircle2 v-if="isCorrect" class="w-7 h-7 sm:w-10 sm:h-10 stroke-[3] drop-shadow-md" />
            <XCircle v-else class="w-7 h-7 sm:w-10 sm:h-10 stroke-[3] drop-shadow-md" />
          </div>

          <!-- Text Messages -->
          <div class="space-y-1 min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-heading text-lg sm:text-2xl font-black tracking-tight" :class="isCorrect ? 'text-emerald-800' : 'text-rose-900'">
                {{ isCorrect ? getCorrectTitle() : 'Jawaban Kurang Tepat!' }}
              </h3>
              
              <!-- Floating Bonus XP Pill on Correct -->
              <span 
                v-if="isCorrect" 
                class="px-2.5 py-0.5 bg-amber-400 text-amber-950 rounded-full font-heading font-black text-xs shadow-md animate-bounce border border-amber-200"
              >
                +XP ⭐
              </span>
            </div>
            
            <p v-if="!isCorrect && correctAnswer" class="text-xs sm:text-sm font-heading font-bold text-slate-800">
              Jawaban yang benar: <span class="text-emerald-700 font-black underline">{{ correctAnswer }}</span>
            </p>

            <p v-if="explanation" class="text-xs sm:text-sm text-slate-700 max-w-xl font-body leading-relaxed line-clamp-2">
              {{ explanation }}
            </p>
          </div>

          <!-- Cheering Kiko Mascot on Desktop -->
          <div class="hidden md:flex items-center justify-center text-4xl shrink-0" :class="isCorrect ? 'animate-bounce' : 'animate-pulse'">
            {{ isCorrect ? '🦉' : '🐣' }}
          </div>
        </div>

        <!-- Action Button -->
        <button 
          @click="handleNext"
          :disabled="isClicked"
          class="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-heading font-black shrink-0 shadow-xl rounded-2xl cursor-pointer transition-all active:scale-90"
          :class="isCorrect 
            ? 'duo-btn-green border-b-6 border-emerald-700 shadow-emerald-500/30' 
            : 'duo-btn-red border-b-6 border-rose-700 shadow-rose-500/30'"
        >
          <span>{{ isCorrect ? 'LANJUTKAN ➔' : 'MENGERTI 👍' }}</span>
        </button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import { useSoundEffects } from '~/composables/useSoundEffects'
import confetti from 'canvas-confetti'

const props = defineProps({
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false },
  correctAnswer: { type: String, default: '' },
  explanation: { type: String, default: '' }
})

const emit = defineEmits(['next'])

const { playCorrect, playWrong } = useSoundEffects()
const isClicked = ref(false)

const triggerConfetti = () => {
  if (typeof window === 'undefined') return
  try {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85, x: 0.5 },
      colors: ['#58cc02', '#ffc800', '#1cb0f6', '#ff4b4b', '#ce82ff']
    })
  } catch (e) {}
}

watch(() => props.isChecked, (val) => {
  if (val) {
    isClicked.value = false
    if (props.isCorrect) {
      playCorrect()
      triggerConfetti()
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
  'Luar Biasa! 🎉',
  'Hebat Sekali! ⭐',
  'Kamu Pintar! 🧠',
  'Jawaban Tepat! 🚀',
  'Keren Banget! 🌟'
]

const getCorrectTitle = () => {
  return correctTitles[Math.floor(Math.random() * correctTitles.length)]
}
</script>
