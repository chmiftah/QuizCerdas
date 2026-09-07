<template>
  <div class="space-y-6 select-none max-w-xl mx-auto w-full">
    <!-- Header Prompt & Instruction -->
    <div class="space-y-2 text-center">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-heading font-extrabold text-amber-900 shadow-2xs">
        <span>📖</span>
        <span>Latihan Membaca Nyaring</span>
      </div>
      <h2 class="font-heading text-xl sm:text-2xl text-slate-800 font-extrabold leading-snug">
        {{ exercise.question || 'Bacalah kalimat berikut dengan lantang dan jelas:' }}
      </h2>
    </div>

    <!-- Main Reading Text Card -->
    <div class="bg-white rounded-3xl border-4 border-indigo-100 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden text-center transition-all duration-300 hover:border-indigo-200">
      <!-- Background Decorative Accents -->
      <div class="absolute -right-8 -top-8 w-28 h-28 bg-indigo-50 rounded-full blur-xl pointer-events-none"></div>
      <div class="absolute -left-8 -bottom-8 w-28 h-28 bg-emerald-50 rounded-full blur-xl pointer-events-none"></div>

      <!-- Listen to Model Pronunciation Button -->
      <div class="flex items-center justify-center gap-2">
        <button
          @click="playModelAudio"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-700 font-heading font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs active:scale-95"
          :class="{ 'animate-pulse bg-indigo-100 border-indigo-300': isModelPlaying }"
          title="Dengarkan Contoh Pelafalan Benar"
        >
          <Volume2 class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          <span>{{ isModelPlaying ? 'Mendengarkan...' : '🔊 Dengarkan Contoh' }}</span>
        </button>
      </div>

      <!-- Target Words Interactive Display Chips -->
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
        <button
          v-for="(word, idx) in targetWordTokens"
          :key="idx"
          @click="speakSingleWord(word.clean)"
          type="button"
          class="group relative px-3 sm:px-5 py-2 sm:py-3.5 rounded-2xl border-2 sm:border-3 font-heading font-black text-xl sm:text-3xl transition-all duration-300 cursor-pointer shadow-sm active:scale-95 select-none"
          :class="[
            word.isMatched
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200 scale-105'
              : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          ]"
          :title="`Klik untuk dengarkan bunyi kata '${word.clean}'`"
        >
          <span>{{ word.display }}</span>

          <!-- Match Badge -->
          <span 
            v-if="word.isMatched" 
            class="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 border border-white rounded-full flex items-center justify-center text-[10px] text-amber-950 font-black animate-pop shadow-xs"
          >
            ✓
          </span>
        </button>
      </div>

      <!-- Helper Hint: Click Word to Hear -->
      <p class="text-[11px] font-heading font-semibold text-slate-400">
        💡 Tips: Sentuh salah satu kata di atas untuk mendengar suaranya satu per satu.
      </p>

      <!-- Accuracy Score & Star Indicator (Visible after speaking) -->
      <div v-if="matchPercentage > 0" class="pt-2 border-t border-slate-100 flex flex-col items-center gap-1.5 animate-pop">
        <div class="flex items-center gap-1 text-amber-400 text-lg">
          <Star v-for="s in 3" :key="s" class="w-5 h-5" :class="s <= earnedStars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'" />
        </div>
        <div class="flex items-center gap-2">
          <div class="w-32 sm:w-44 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
            <div 
              class="h-full rounded-full transition-all duration-500"
              :class="matchPercentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500'"
              :style="{ width: `${matchPercentage}%` }"
            ></div>
          </div>
          <span class="text-xs font-heading font-extrabold text-slate-700">
            {{ matchPercentage }}% Cocok
          </span>
        </div>
        <p class="text-[11px] font-heading font-bold" :class="matchPercentage >= 70 ? 'text-emerald-600' : 'text-amber-600'">
          {{ matchPercentage >= 70 ? '🎉 Bacaanmu sangat tepat & lancar!' : '💪 Terus coba, suaramu sudah terdengar!' }}
        </p>
      </div>
    </div>

    <!-- Interactive Microphone Recorder Panel -->
    <div class="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm space-y-4 text-center">
      <!-- Main Action Microphone Button -->
      <div class="flex flex-col items-center gap-2">
        <button
          @click="handleMicToggle"
          type="button"
          :disabled="isChecked"
          class="relative group px-6 sm:px-8 py-4 sm:py-5 rounded-3xl font-heading font-black text-sm sm:text-base transition-all duration-200 shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-3 w-full max-w-sm"
          :class="isListening 
            ? 'bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700 shadow-rose-500/30 scale-105 animate-pulse' 
            : hasSpoken
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 shadow-emerald-500/30'
              : 'duo-btn-blue text-white shadow-blue-500/30'"
        >
          <!-- Mic Wave Effect when Recording -->
          <span v-if="isListening" class="absolute inset-0 rounded-3xl bg-rose-500/30 animate-ping pointer-events-none"></span>

          <Mic v-if="!isListening" class="w-6 h-6 text-white shrink-0 group-hover:scale-110 transition-transform" />
          <MicOff v-else class="w-6 h-6 text-white shrink-0 animate-bounce" />

          <span>
            {{ isListening 
              ? 'Mendengarkan Suaramu...' 
              : hasSpoken 
                ? '🔄 Baca Ulang' 
                : '🎤 Tekan & Mulai Membaca' 
            }}
          </span>
        </button>

        <p class="text-xs font-heading font-semibold text-slate-500">
          {{ isListening 
            ? 'Ucapkan kalimat di atas dengan lantang sekarang!' 
            : 'Tekan tombol mikrofon lalu bacalah teks di atas.' 
          }}
        </p>
      </div>

      <!-- Speech Recognition Transcript Bubble -->
      <div 
        v-if="spokenTranscript" 
        class="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm font-heading font-bold text-slate-700 animate-pop space-y-1"
      >
        <span class="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
          Suara Yang Terdengar:
        </span>
        <p class="text-slate-800 italic text-base">
          "{{ spokenTranscript }}"
        </p>
      </div>

      <!-- Fallback Button for Devices Without Microphone / Permission -->
      <div class="pt-2 border-t border-slate-100 flex items-center justify-center gap-3">
        <button
          @click="confirmManualRead"
          type="button"
          :disabled="isChecked"
          class="text-xs font-heading font-bold text-slate-400 hover:text-indigo-600 hover:underline cursor-pointer py-1"
        >
          ✋ Saya sudah selesai membaca tanpa mikrofon
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { Volume2, Mic, MicOff, Star } from 'lucide-vue-next'
import { useVoiceRecognition } from '~/composables/useVoiceRecognition'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const { playPop, playCorrect } = useSoundEffects()
const { isSupported, isListening, spokenTranscript, startListening, stopListening } = useVoiceRecognition()

const hasSpoken = ref(false)
const isModelPlaying = ref(false)
const matchedWordsSet = ref(new Set())

// Target Words Extraction
const targetText = computed(() => {
  return (props.exercise.correct_answer || props.exercise.audioText || props.exercise.question || '').trim()
})

const cleanWord = (w) => {
  return w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim()
}

const targetWordTokens = computed(() => {
  const rawWords = targetText.value.split(/\s+/).filter(Boolean)
  return rawWords.map((raw) => {
    const cleaned = cleanWord(raw)
    const isMatched = matchedWordsSet.value.has(cleaned)
    return {
      display: raw,
      clean: cleaned,
      isMatched
    }
  })
})

const matchPercentage = computed(() => {
  const total = targetWordTokens.value.length
  if (total === 0) return 0
  const matched = targetWordTokens.value.filter(t => t.isMatched).length
  return Math.round((matched / total) * 100)
})

const earnedStars = computed(() => {
  const pct = matchPercentage.value
  if (pct >= 85) return 3
  if (pct >= 60) return 2
  if (pct > 0) return 1
  return 0
})

// Compare live speech transcript against target words
const evaluateSpeech = (text) => {
  if (!text) return
  hasSpoken.value = true

  const spokenWords = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').split(/\s+/).filter(Boolean)
  const currentSet = new Set(matchedWordsSet.value)

  targetWordTokens.value.forEach(token => {
    if (spokenWords.some(sw => sw === token.clean || sw.includes(token.clean) || token.clean.includes(sw))) {
      currentSet.add(token.clean)
    }
  })

  matchedWordsSet.value = currentSet

  // Update selected option in parent engine
  emit('select', text)

  if (matchPercentage.value >= 70) {
    playCorrect()
  }
}

// Microphone toggle
const handleMicToggle = () => {
  if (props.isChecked) return
  playPop()

  if (isListening.value) {
    stopListening()
  } else {
    matchedWordsSet.value = new Set()
    startListening((recognizedVal, rawText) => {
      const fullText = rawText || recognizedVal
      evaluateSpeech(fullText)
    })
  }
}

// Model Pronunciation via TTS
const playModelAudio = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  isModelPlaying.value = true

  const utterance = new SpeechSynthesisUtterance(targetText.value)
  utterance.lang = 'id-ID'
  utterance.rate = 0.85 // slightly slower for clear reading model

  // Pick natural voice if available
  const voices = window.speechSynthesis.getVoices()
  const idVoice = voices.find(v => v.lang.startsWith('id') || v.name.includes('Indonesian'))
  if (idVoice) {
    utterance.voice = idVoice
  }

  utterance.onend = () => {
    isModelPlaying.value = false
  }
  utterance.onerror = () => {
    isModelPlaying.value = false
  }

  window.speechSynthesis.speak(utterance)
}

// Single Word Pronunciation
const speakSingleWord = (word) => {
  if (!word || typeof window === 'undefined' || !('speechSynthesis' in window)) return
  playPop()

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = 'id-ID'
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

// Manual Reading Confirmation Fallback
const confirmManualRead = () => {
  playPop()
  hasSpoken.value = true
  // Mark all target words as read
  const allSet = new Set()
  targetWordTokens.value.forEach(t => allSet.add(t.clean))
  matchedWordsSet.value = allSet
  emit('select', targetText.value)
}

// Reset on exercise change
const reset = () => {
  stopListening()
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isModelPlaying.value = false
  hasSpoken.value = false
  matchedWordsSet.value = new Set()

  if (props.selectedOption) {
    evaluateSpeech(props.selectedOption)
  }
}

watch(() => props.exercise, reset, { immediate: true })

onUnmounted(() => {
  stopListening()
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})
</script>
