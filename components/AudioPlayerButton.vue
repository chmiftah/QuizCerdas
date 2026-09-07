<template>
  <button
    @click="togglePlay"
    type="button"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border-2 transition-all duration-200 shadow-sm cursor-pointer select-none shrink-0 group active:scale-95"
    :class="isSpeaking 
      ? 'bg-duo-green text-white border-duo-green-dark shadow-duo-green scale-105 animate-pulse' 
      : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 hover:border-sky-300 shadow-2xs'"
    :title="isSpeaking ? 'Hentikan Suara' : 'Dengarkan Soal (Suara TTS)'"
    :aria-label="isSpeaking ? 'Hentikan Suara' : 'Dengarkan Soal (Suara TTS)'"
  >
    <!-- Speaker / Playing Icon -->
    <Volume2 v-if="!isSpeaking" class="w-5 h-5 group-hover:scale-110 transition-transform" />
    <VolumeX v-else class="w-5 h-5 animate-bounce" />

    <!-- Optional Label -->
    <span v-if="showLabel" class="font-heading font-extrabold text-xs sm:text-sm">
      {{ isSpeaking ? 'Membaca...' : 'Baca Soal' }}
    </span>
  </button>
</template>

<script setup>
import { Volume2, VolumeX } from 'lucide-vue-next'
import { useVoiceNarrator } from '~/composables/useVoiceNarrator'

const props = defineProps({
  text: { type: String, required: true },
  showLabel: { type: Boolean, default: false },
  autoPlay: { type: Boolean, default: false }
})

const { isSpeaking, speak, stop, replay } = useVoiceNarrator()

const togglePlay = () => {
  if (isSpeaking.value) {
    stop()
  } else {
    speak(props.text, true)
  }
}
</script>
