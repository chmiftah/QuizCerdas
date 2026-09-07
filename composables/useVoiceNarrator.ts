import { ref } from 'vue'

// Global singleton reactive state so all components are 100% in sync
const isSpeaking = ref(false)
const autoPlayEnabled = ref(true)
const currentText = ref('')
const currentInstruction = ref('')

let currentAudioFallback: HTMLAudioElement | null = null
let autoPlayTimer: any = null

export const useVoiceNarrator = () => {
  // Initialize auto-play setting from localStorage on client
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('duo_voice_narration_autoplay')
      if (saved !== null) {
        autoPlayEnabled.value = saved === 'true'
      }
    } catch (e) {}
  }

  // Clean text before reading: strip markdown, excessive punctuation, and standalone emoji
  const cleanTextForSpeech = (raw: string): string => {
    if (!raw) return ''
    return raw
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Stop any ongoing speech or fallback audio
  const stop = () => {
    isSpeaking.value = false

    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer)
      autoPlayTimer = null
    }

    if (import.meta.client && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch (e) {}
    }

    if (currentAudioFallback) {
      try {
        currentAudioFallback.pause()
        currentAudioFallback.currentTime = 0
      } catch (e) {}
      currentAudioFallback = null
    }
  }

  // Fallback to server streaming TTS API if Web Speech API has no Indonesian voice
  const speakWithFallbackAudio = (text: string) => {
    if (!import.meta.client) return
    try {
      stop()
      isSpeaking.value = true
      const audioUrl = `/api/tts?text=${encodeURIComponent(text)}&lang=id`
      const audio = new Audio(audioUrl)
      currentAudioFallback = audio

      audio.onended = () => {
        isSpeaking.value = false
        currentAudioFallback = null
      }

      audio.onerror = () => {
        isSpeaking.value = false
        currentAudioFallback = null
      }

      audio.play().catch(() => {
        isSpeaking.value = false
        currentAudioFallback = null
      })
    } catch (err) {
      isSpeaking.value = false
      currentAudioFallback = null
    }
  }

  // Primary speech function using Web Speech Synthesis API (100% offline & zero latency)
  const speak = (text: string, force: boolean = false) => {
    if (!import.meta.client) return
    if (!text || (!force && !autoPlayEnabled.value)) return

    const sanitized = cleanTextForSpeech(text)
    if (!sanitized) return

    stop()
    currentText.value = sanitized

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel() // reset queue

        const utterance = new SpeechSynthesisUtterance(sanitized)
        utterance.lang = 'id-ID'
        
        // Kid-friendly speech tuning: slightly higher pitch (cheerful & friendly) and clear articulation
        utterance.pitch = 1.15
        utterance.rate = 0.90

        // Find natural Indonesian voice if available in user's OS/browser (e.g. Edge Natural, Google Bahasa Indonesia, Ardi, Gadis)
        const voices = window.speechSynthesis.getVoices()
        const idVoice = voices.find(v => 
          v.lang.startsWith('id') || 
          v.lang.startsWith('ID') || 
          v.name.toLowerCase().includes('indonesian') || 
          v.name.toLowerCase().includes('indonesia') || 
          v.name.toLowerCase().includes('gadis') || 
          v.name.toLowerCase().includes('ardi')
        )

        if (idVoice) {
          utterance.voice = idVoice
        }

        utterance.onstart = () => {
          isSpeaking.value = true
        }

        utterance.onend = () => {
          isSpeaking.value = false
        }

        utterance.onerror = (e) => {
          // If native speech fails (e.g. voice loading error), gracefully fallback to audio endpoint
          if (e.error !== 'canceled') {
            speakWithFallbackAudio(sanitized)
          } else {
            isSpeaking.value = false
          }
        }

        isSpeaking.value = true
        window.speechSynthesis.speak(utterance)
      } catch (err) {
        speakWithFallbackAudio(sanitized)
      }
    } else {
      speakWithFallbackAudio(sanitized)
    }
  }

  // Auto-speak with a small delay for page/question transition
  const autoSpeak = (text: string, delayMs: number = 350) => {
    if (!autoPlayEnabled.value || !text) return
    stop()
    autoPlayTimer = setTimeout(() => {
      speak(text, false)
    }, delayMs)
  }

  // Toggle Auto-Play Preference
  const toggleAutoPlay = () => {
    autoPlayEnabled.value = !autoPlayEnabled.value
    if (import.meta.client) {
      try {
        localStorage.setItem('duo_voice_narration_autoplay', String(autoPlayEnabled.value))
      } catch (e) {}
    }
    if (!autoPlayEnabled.value) {
      stop()
    } else if (currentText.value) {
      speak(currentText.value, true)
    }
  }

  // Replay current text or provided text on demand (force = true)
  const replay = (text?: string) => {
    const target = text || currentText.value
    if (target) {
      speak(target, true)
    }
  }

  return {
    isSpeaking,
    autoPlayEnabled,
    currentText,
    currentInstruction,
    speak,
    autoSpeak,
    stop,
    replay,
    toggleAutoPlay
  }
}
