<template>
  <div v-if="isSupported && !disabled" class="relative flex flex-col items-center select-none shrink-0">
    <!-- Active Speech Transcript Bubble -->
    <div 
      v-if="isListening || spokenTranscript" 
      class="absolute bottom-full mb-2 left-0 bg-rose-50 border border-rose-300 rounded-xl px-2.5 py-1 shadow-md text-[10px] sm:text-xs font-heading font-extrabold text-rose-800 animate-pop flex items-center gap-1.5 whitespace-nowrap z-30 pointer-events-none"
    >
      <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0"></span>
      <span class="truncate max-w-[110px] sm:max-w-none">
        {{ spokenTranscript ? `"${spokenTranscript}"` : 'Bicara...' }}
      </span>
    </div>

    <!-- Microphone Toggle Button -->
    <button
      @click="toggleMic"
      type="button"
      class="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border sm:border-2 font-heading font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer group active:scale-95 shrink-0"
      :class="isListening 
        ? 'bg-rose-500 text-white border-rose-700 shadow-rose-500/50 scale-105 animate-pulse' 
        : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-2xs'"
      :title="isListening ? 'Hentikan Mikrofon' : 'Jawab Menggunakan Suara / Bicara'"
    >
      <Mic v-if="!isListening" class="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-rose-500 shrink-0" />
      <MicOff v-else class="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-white shrink-0" />

      <span class="hidden xs:inline sm:inline">
        {{ isListening ? 'Mendengar...' : 'Suara' }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { Mic, MicOff } from 'lucide-vue-next'
import { useVoiceRecognition } from '~/composables/useVoiceRecognition'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [] }
})

const emit = defineEmits(['voiceSelect'])

const { isSupported, isListening, spokenTranscript, startListening, stopListening } = useVoiceRecognition()
const { playPop } = useSoundEffects()

const toggleMic = () => {
  if (isListening.value) {
    stopListening()
  } else {
    playPop()
    startListening((parsedValue, rawText) => {
      if (parsedValue) {
        emit('voiceSelect', parsedValue)
        speakFeedback(`Jawabanmu ${parsedValue}`)
      }
    }, props.options)
  }
}

const speakFeedback = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.1
    window.speechSynthesis.speak(utterance)
  }
}
</script>
