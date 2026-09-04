<template>
  <button
    @click="togglePlay"
    type="button"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-2xl border-2 transition-all duration-200 shadow-sm cursor-pointer select-none shrink-0 group active:scale-95"
    :class="isPlaying 
      ? 'bg-duo-green text-white border-duo-green-dark shadow-duo-green scale-105 animate-pulse' 
      : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 hover:border-sky-300 shadow-2xs'"
    :title="isPlaying ? 'Hentikan Suara' : 'Dengarkan Soal (Suara TTS)'"
    :aria-label="isPlaying ? 'Hentikan Suara' : 'Dengarkan Soal (Suara TTS)'"
  >
    <!-- Speaker / Playing Icon -->
    <Volume2 v-if="!isPlaying" class="w-6 h-6 group-hover:scale-110 transition-transform" />
    <VolumeX v-else class="w-6 h-6 animate-bounce" />

    <!-- Optional Label -->
    <span v-if="showLabel" class="font-heading font-extrabold text-xs sm:text-sm">
      {{ isPlaying ? 'Memutar...' : 'Baca Soal' }}
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Volume2, VolumeX } from 'lucide-vue-next'

const props = defineProps({
  text: { type: String, required: true },
  showLabel: { type: Boolean, default: false },
  autoPlay: { type: Boolean, default: true }
})

const isPlaying = ref(false)
let currentAudio = null
let currentUtterance = null
let autoPlayTimer = null

const stopAllAudio = () => {
  isPlaying.value = false

  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer)
    autoPlayTimer = null
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }

  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
}

const startPlay = () => {
  stopAllAudio()

  if (!props.text) return

  isPlaying.value = true

  // 1. Try Web Speech API first (uses Microsoft Edge Neural TTS natively in Edge browser)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel() // stop prior speeches

    const utterance = new SpeechSynthesisUtterance(props.text)
    utterance.lang = 'id-ID'
    utterance.rate = 0.9 // slightly slower for clear children's learning

    // Pick Edge / Natural Indonesian voice if available
    const voices = window.speechSynthesis.getVoices()
    const idVoice = voices.find(v => 
      v.lang.startsWith('id') || 
      v.name.includes('Indonesian') || 
      v.name.includes('Gadis') || 
      v.name.includes('Ardi')
    )
    if (idVoice) {
      utterance.voice = idVoice
    }

    utterance.onend = () => {
      isPlaying.value = false
    }

    utterance.onerror = () => {
      // Fallback to Server API audio
      playFallbackAudio()
    }

    currentUtterance = utterance
    window.speechSynthesis.speak(utterance)
  } else {
    // 2. Server API fallback using Google / Edge TTS stream
    playFallbackAudio()
  }
}

const togglePlay = () => {
  if (isPlaying.value) {
    stopAllAudio()
  } else {
    startPlay()
  }
}

const playFallbackAudio = () => {
  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(props.text)}&lang=id`
    currentAudio = new Audio(audioUrl)

    currentAudio.onended = () => {
      isPlaying.value = false
    }

    currentAudio.onerror = () => {
      isPlaying.value = false
    }

    currentAudio.play().catch(() => {
      isPlaying.value = false
    })
  } catch (e) {
    isPlaying.value = false
  }
}

// Auto-play when question text changes or on initial mount
const triggerAutoPlay = () => {
  if (!props.autoPlay || !props.text) return

  stopAllAudio()

  autoPlayTimer = setTimeout(() => {
    startPlay()
  }, 400) // Small delay for smooth UI transition
}

watch(() => props.text, () => {
  triggerAutoPlay()
})

onMounted(() => {
  triggerAutoPlay()
})

onUnmounted(() => {
  stopAllAudio()
})
</script>
