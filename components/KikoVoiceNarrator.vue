<template>
  <div class="w-full my-2 sm:my-3 select-none animate-pop">
    <!-- Single Unified Simple & Clean Question Header Bar -->
    <div class="bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200 p-3 sm:p-4 shadow-sm hover:border-emerald-300 transition-colors flex items-center justify-between gap-3 sm:gap-4">
      
      <!-- Left: Mascot Kiko (Talking Animation) & Question Prompt -->
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <!-- Talking Mascot Avatar Button -->
        <button 
          @click="replaySpeech"
          type="button"
          class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-2xl sm:text-3xl shrink-0 cursor-pointer transition-transform active:scale-90"
          :class="isSpeaking ? 'animate-kiko-talk ring-4 ring-emerald-300/60 shadow-md' : 'hover:scale-105'"
          title="Klik untuk mendengarkan Kiko membaca soal"
        >
          <span>{{ mascotAvatar || '🦉' }}</span>

          <!-- Animated Sound Wave Ripple Badge -->
          <div 
            v-if="isSpeaking" 
            class="absolute -top-1.5 -right-1.5 flex items-end gap-0.5 bg-emerald-500 text-white p-1 rounded-full shadow-sm border-2 border-white"
          >
            <div class="w-0.5 bg-white rounded-full animate-sound-wave-1"></div>
            <div class="w-0.5 bg-white rounded-full animate-sound-wave-2"></div>
            <div class="w-0.5 bg-white rounded-full animate-sound-wave-3"></div>
          </div>
          <span 
            v-else
            class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] shadow-2xs border border-white"
          >
            🔊
          </span>
        </button>

        <!-- Question Prompt & Instructions -->
        <div class="min-w-0 flex-1 space-y-0.5">
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Question Type Pill -->
            <span v-if="typeLabel" class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-heading font-black text-[10px] uppercase">
              {{ typeLabel }}
            </span>
            <span v-if="isSpeaking" class="text-[10px] font-heading font-bold text-emerald-600 animate-pulse flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Kiko sedang membaca...
            </span>
          </div>

          <h2 class="font-heading font-black text-sm sm:text-base md:text-lg text-slate-800 leading-snug truncate">
            {{ displayQuestion }}
          </h2>

          <p v-if="instruction" class="text-[11px] font-heading font-semibold text-slate-500 truncate">
            👉 {{ instruction }}
          </p>
        </div>
      </div>

      <!-- Right: Compact Actions (Speaker, Hint, Auto-Voice Switch) -->
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <!-- Replay Speaker Button -->
        <button
          @click="toggleAudio"
          type="button"
          class="h-10 px-3 sm:px-3.5 rounded-xl border-2 font-heading font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
          :class="isSpeaking 
            ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/30 animate-pulse' 
            : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200'"
          title="Dengarkan Soal"
        >
          <span>{{ isSpeaking ? '⏹️' : '🔊' }}</span>
          <span class="hidden sm:inline">{{ isSpeaking ? 'Stop' : 'Baca' }}</span>
        </button>

        <!-- Hint Button -->
        <button
          @click="$emit('toggle-hint')"
          type="button"
          class="h-10 px-3 sm:px-3.5 rounded-xl border-2 font-heading font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
          :class="showHint 
            ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-amber-400/30' 
            : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border-slate-200'"
          title="Petunjuk Kiko"
        >
          <span>💡</span>
          <span class="hidden sm:inline">Petunjuk</span>
        </button>

        <!-- Auto-Play Toggle (Compact icon button) -->
        <button
          @click="toggleAutoPlay"
          type="button"
          class="h-10 w-10 rounded-xl border-2 font-heading font-black text-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs"
          :class="autoPlayEnabled 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
            : 'bg-slate-100 text-slate-400 border-slate-200'"
          :title="autoPlayEnabled ? 'Suara Otomatis: Aktif (Klik untuk matikan)' : 'Suara Otomatis: Nonaktif (Klik untuk aktifkan)'"
        >
          <span>{{ autoPlayEnabled ? '⚡' : '🔇' }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useVoiceNarrator } from '~/composables/useVoiceNarrator'

const props = defineProps({
  questionText: {
    type: String,
    required: true
  },
  instruction: {
    type: String,
    default: ''
  },
  typeLabel: {
    type: String,
    default: ''
  },
  mascotAvatar: {
    type: String,
    default: '🦉'
  },
  showHint: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-hint'])

const { isSpeaking, autoPlayEnabled, speak, autoSpeak, stop, toggleAutoPlay } = useVoiceNarrator()

// Strip ugly prefixes like "1. [Pilihan Ganda]" from question text for clean display and natural reading
const displayQuestion = computed(() => {
  if (!props.questionText) return ''
  return props.questionText
    .replace(/^\d+[\.\)]\s*(\[[^\]]+\])?\s*/i, '')
    .replace(/^\[[^\]]+\]\s*/i, '')
    .trim()
})

const toggleAudio = () => {
  if (isSpeaking.value) {
    stop()
  } else {
    replaySpeech()
  }
}

const replaySpeech = () => {
  const fullText = props.instruction 
    ? `${displayQuestion.value}. ${props.instruction}` 
    : displayQuestion.value
  speak(fullText, true)
}

// Auto-narrate question when questionText changes or when mounted
watch(() => props.questionText, (newText) => {
  if (newText) {
    const clean = newText
      .replace(/^\d+[\.\)]\s*(\[[^\]]+\])?\s*/i, '')
      .replace(/^\[[^\]]+\]\s*/i, '')
      .trim()
    const fullText = props.instruction ? `${clean}. ${props.instruction}` : clean
    autoSpeak(fullText, 400)
  }
}, { immediate: false })

onMounted(() => {
  if (props.questionText) {
    const clean = displayQuestion.value
    const fullText = props.instruction ? `${clean}. ${props.instruction}` : clean
    autoSpeak(fullText, 500)
  }
})

onUnmounted(() => {
  stop()
})
</script>
