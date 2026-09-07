<template>
  <div class="space-y-4 select-none max-w-xl mx-auto w-full">
    <!-- Header Prompt -->
    <div class="space-y-2 text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs font-heading font-extrabold text-sky-900 shadow-2xs">
        <span>👏</span>
        <span>Ketukan Suku Kata (Phonics Rhythm)</span>
      </div>
      <div class="flex items-center justify-center gap-3">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question || 'Hitung berapa ketukan suku kata pada kata berikut!' }}
        </h2>
        <AudioPlayerButton :text="exercise.question || 'Hitung berapa ketukan suku kata pada kata berikut!'" />
      </div>
    </div>

    <!-- Main Word & Clapping Card Container -->
    <div class="bg-white rounded-3xl border-4 border-sky-100 p-5 sm:p-7 shadow-xl space-y-6 relative overflow-hidden transition-all duration-300 hover:border-sky-200 text-center">
      <!-- Background Accents -->
      <div class="absolute -right-8 -top-8 w-28 h-28 bg-sky-100/50 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-8 -bottom-8 w-28 h-28 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Word Illustration Card (Emoji & Syllable Chips) -->
      <div class="space-y-4">
        <!-- Object Illustration Icon if any -->
        <div v-if="wordEmoji" class="text-5xl sm:text-6xl drop-shadow-sm animate-pop">
          {{ wordEmoji }}
        </div>

        <!-- Full Audio Listen Button -->
        <button
          @click="speakFullWord"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 text-sky-700 font-heading font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <span>🔊</span>
          <span>Dengarkan Kata Utuh</span>
        </button>

        <!-- Interactive Syllable Chips -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
          <button
            v-for="(syl, idx) in syllableTokens"
            :key="idx"
            @click="speakSyllable(syl)"
            type="button"
            class="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl border-3 border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 hover:border-sky-400 font-heading font-black text-2xl sm:text-3xl text-sky-900 shadow-sm transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
            :title="`Klik untuk mendengarkan bunyi suku kata: ${syl}`"
          >
            <span>{{ syl }}</span>
            <span class="text-xs text-sky-500 font-normal">🔊</span>
          </button>
        </div>

        <p class="text-[11px] font-heading font-semibold text-slate-400">
          💡 Tips: Sentuh tiap suku kata di atas untuk mendengar bunyinya satu per satu.
        </p>
      </div>

      <!-- Interactive Clapper Button -->
      <div class="bg-slate-50/80 rounded-2xl border-2 border-slate-200 p-4 sm:p-5 max-w-sm mx-auto space-y-3">
        <p class="text-xs font-heading font-bold text-slate-600">
          Tekan tombol untuk bertepuk tangan sesuai jumlah suku kata:
        </p>

        <!-- Clapping Action Button -->
        <button
          @click="handleClap"
          :disabled="isChecked"
          type="button"
          class="relative w-full py-4 px-6 rounded-2xl font-heading font-black text-base sm:text-lg text-white transition-all duration-150 cursor-pointer shadow-lg active:scale-90 flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 border-b-4 border-indigo-800"
          :class="{ 'scale-105 ring-4 ring-sky-300': isClappingAnim }"
        >
          <span class="text-2xl sm:text-3xl transition-transform" :class="{ 'scale-125 rotate-12': isClappingAnim }">
            👏
          </span>
          <span>TEPUK TANGAN!</span>
        </button>

        <!-- Live Clap Meter -->
        <div class="flex items-center justify-between px-2 pt-1">
          <div class="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-600">
            <span>Hitungan Tepukan:</span>
            <span class="px-2.5 py-0.5 rounded-lg bg-sky-500 text-white font-black text-sm animate-pop">
              {{ clapCount }}
            </span>
          </div>

          <button
            v-if="clapCount > 0"
            @click="resetClap"
            :disabled="isChecked"
            type="button"
            class="text-[11px] font-heading font-bold text-slate-500 hover:text-rose-600 cursor-pointer transition-colors"
          >
            ↺ Ulangi
          </button>
        </div>
      </div>

      <!-- Direct Number Options Selection -->
      <div class="space-y-2 pt-2 border-t border-slate-100">
        <p class="text-xs font-heading font-bold text-slate-600">
          Atau langsung pilih jumlah ketukan suku kata di bawah:
        </p>

        <div class="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
          <button
            v-for="opt in optionNumbers"
            :key="opt"
            @click="selectDirectCount(opt)"
            :disabled="isChecked"
            type="button"
            class="p-3 rounded-2xl border-3 font-heading font-black text-center transition-all cursor-pointer shadow-xs active:scale-95"
            :class="[
              selectedCount === String(opt)
                ? 'bg-sky-500 text-white border-sky-600 shadow-sky-200 scale-105 ring-4 ring-sky-200'
                : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
            ]"
          >
            <span class="text-xl sm:text-2xl block mb-0.5">{{ opt }}</span>
            <span class="text-[10px] font-extrabold uppercase opacity-80">Ketukan</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  },
  selectedOption: {
    type: String,
    default: ''
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

// Audio Clap synthesizer
const playClapSound = () => {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    
    // Snappy noise clap effect
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(320, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {
    // Audio context suppressed
  }
}

// Visual & Text Data extraction
const targetWord = computed(() => {
  return props.exercise.visual?.word || props.exercise.audioText || 'KU-CING'
})

const syllableTokens = computed(() => {
  if (props.exercise.visual?.syllables && Array.isArray(props.exercise.visual.syllables)) {
    return props.exercise.visual.syllables
  }
  const clean = targetWord.value.replace(/\s+/g, '')
  if (clean.includes('-')) {
    return clean.split('-').filter(Boolean)
  }
  // Fallback 2-syllable split
  return [clean.slice(0, Math.ceil(clean.length / 2)), clean.slice(Math.ceil(clean.length / 2))]
})

const wordEmoji = computed(() => {
  return props.exercise.visual?.emoji || props.exercise.visual?.label || '🐱'
})

const optionNumbers = computed(() => {
  if (props.exercise.options && Array.isArray(props.exercise.options) && props.exercise.options.length > 0) {
    return props.exercise.options.map(o => parseInt(o, 10)).filter(n => !isNaN(n))
  }
  return [1, 2, 3, 4]
})

const clapCount = ref(0)
const isClappingAnim = ref(false)

const selectedCount = computed(() => {
  return props.selectedOption || String(clapCount.value || '')
})

const handleClap = () => {
  if (props.isChecked) return
  clapCount.value++
  isClappingAnim.value = true
  playClapSound()

  setTimeout(() => {
    isClappingAnim.value = false
  }, 120)

  emit('select', String(clapCount.value))
}

const resetClap = () => {
  if (props.isChecked) return
  clapCount.value = 0
  emit('select', '')
}

const selectDirectCount = (count) => {
  if (props.isChecked) return
  clapCount.value = count
  playClapSound()
  emit('select', String(count))
}

// Text to Speech
const speakSyllable = (syl) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(syl)
    utterance.lang = 'id-ID'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }
}

const speakFullWord = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const plainWord = syllableTokens.value.join('')
    const utterance = new SpeechSynthesisUtterance(plainWord)
    utterance.lang = 'id-ID'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }
}

// Sync external selectedOption
watch(() => props.selectedOption, (newVal) => {
  if (newVal) {
    const num = parseInt(newVal, 10)
    if (!isNaN(num)) {
      clapCount.value = num
    }
  } else {
    clapCount.value = 0
  }
}, { immediate: true })
</script>
