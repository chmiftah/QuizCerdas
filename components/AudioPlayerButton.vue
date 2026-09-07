<template>
  <button
    @click="togglePlay"
    type="button"
    class="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl border-2 transition-all duration-200 shadow-sm cursor-pointer select-none shrink-0 group active:scale-95"
    :class="isSpeaking 
      ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-300/50 scale-105 animate-pulse shadow-md' 
      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 hover:border-emerald-400 shadow-2xs'"
    :title="isSpeaking ? 'Hentikan Suara Kiko' : 'Dengarkan Kiko Membaca Soal'"
    :aria-label="isSpeaking ? 'Hentikan Suara Kiko' : 'Dengarkan Kiko Membaca Soal'"
  >
    <!-- Talking Mascot Avatar Animation -->
    <span 
      class="text-xl sm:text-2xl leading-none select-none transition-transform"
      :class="isSpeaking ? 'animate-kiko-talk' : 'group-hover:scale-110'"
    >
      {{ userStore.userAvatar || '🦊' }}
    </span>

    <!-- Animated Sound Wave Ripple Bars when speaking, or Speaker Icon -->
    <div v-if="isSpeaking" class="flex items-end gap-0.5 h-4 sm:h-5 px-0.5">
      <div class="w-1 bg-white rounded-full animate-sound-wave-1"></div>
      <div class="w-1 bg-white rounded-full animate-sound-wave-2"></div>
      <div class="w-1 bg-white rounded-full animate-sound-wave-3"></div>
    </div>
    <Volume2 v-else class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 group-hover:scale-110 transition-transform shrink-0" />

    <!-- Text Label -->
    <span class="font-heading font-black text-xs sm:text-sm hidden sm:inline">
      {{ isSpeaking ? 'Membaca...' : 'Dengar' }}
    </span>
  </button>
</template>

<script setup>
import { Volume2 } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user'
import { useVoiceNarrator } from '~/composables/useVoiceNarrator'

const props = defineProps({
  text: { type: String, required: true },
  showLabel: { type: Boolean, default: false },
  autoPlay: { type: Boolean, default: false }
})

const userStore = useUserStore()
const { isSpeaking, speak, stop } = useVoiceNarrator()

const togglePlay = () => {
  if (isSpeaking.value) {
    stop()
  } else {
    speak(props.text, true)
  }
}
</script>
