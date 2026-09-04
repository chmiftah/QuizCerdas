<template>
  <div class="fixed bottom-24 right-4 z-30 flex items-end gap-2 pointer-events-none select-none">
    <!-- Speech Bubble -->
    <div 
      v-if="speechBubbleText"
      class="bg-white px-4 py-2.5 rounded-2xl border-3 shadow-xl max-w-xs text-xs sm:text-sm font-heading font-extrabold animate-pop pointer-events-auto flex items-center gap-1.5"
      :class="isCorrect ? 'border-duo-green text-duo-green-dark bg-emerald-50' : isChecked ? 'border-duo-red text-duo-red-dark bg-rose-50' : 'border-amber-300 text-amber-900 bg-amber-50'"
    >
      <span>{{ speechBubbleText }}</span>
    </div>

    <!-- Mascot Avatar Card with KikoAvatar Customization -->
    <div 
      class="pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95"
      :class="isChecked && isCorrect ? 'animate-bounce' : isChecked && !isCorrect ? 'animate-pulse' : ''"
      @click="speakGreeting"
      title="Teman Belajar Kiko 🐼 (Ketuk untuk menyapa!)"
    >
      <KikoAvatar size="md" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const speechBubbleText = ref('Ayo semangat berhitung bersama Kiko! 🐼')

const correctMessages = [
  'Wah, kamu pintar sekali! ⭐',
  'Luar biasa! Lanjut terus ya! 🚀',
  'Kamu luar biasa hebat! 🏆'
]

const wrongMessages = [
  'Tidak apa-apa, ayo coba lagi! 💪',
  'Kiko yakin kamu pasti bisa! ✨',
  'Tetap semangat, jangan menyerah! ❤️'
]

const speakGreeting = () => {
  speakText('Halo! Aku Kiko teman belajarmu. Ayo berhitung bersama!')
}

const speakText = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.0
    window.speechSynthesis.speak(utterance)
  }
}

watch([() => props.isChecked, () => props.isCorrect], ([checked, correct]) => {
  if (checked) {
    if (correct) {
      const msg = correctMessages[Math.floor(Math.random() * correctMessages.length)]
      speechBubbleText.value = msg
      speakText(msg.replace(/[^\w\s]/gi, ''))
    } else {
      const msg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)]
      speechBubbleText.value = msg
      speakText(msg.replace(/[^\w\s]/gi, ''))
    }
  } else {
    speechBubbleText.value = 'Ayo semangat berhitung bersama Kiko! 🐼'
  }
})

onMounted(() => {
  speechBubbleText.value = 'Ayo semangat berhitung bersama Kiko! 🐼'
})
</script>
