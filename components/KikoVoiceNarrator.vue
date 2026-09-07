<template>
  <div class="w-full my-3 sm:my-5 select-none animate-pop">
    <div class="relative bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 p-3.5 sm:p-5 rounded-3xl border-2 sm:border-3 border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5 overflow-hidden">
      
      <!-- Top/Left: Animated Talking Mascot (Kiko) -->
      <div class="flex items-center gap-3 shrink-0">
        <div 
          @click="replaySpeech"
          class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white border-2 border-emerald-300 shadow-md flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-all active:scale-95 group"
          :class="isSpeaking ? 'animate-kiko-talk ring-4 ring-emerald-300/60 shadow-emerald-200' : 'hover:scale-105 hover:border-emerald-400'"
          title="Klik Kiko untuk membacakan soal!"
        >
          <!-- Mascot Avatar Face -->
          <span>{{ mascotAvatar || '🦉' }}</span>

          <!-- Animated Talking Sound Waves Indicator when speaking -->
          <div 
            v-if="isSpeaking" 
            class="absolute -top-2 -right-2 flex items-end gap-0.5 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-white"
          >
            <div class="w-1 bg-white rounded-full animate-sound-wave-1"></div>
            <div class="w-1 bg-white rounded-full animate-sound-wave-2"></div>
            <div class="w-1 bg-white rounded-full animate-sound-wave-3"></div>
          </div>

          <!-- Mini Speaker Badge when idle -->
          <div 
            v-else
            class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-sm border-2 border-white group-hover:scale-110 transition-transform"
          >
            🔊
          </div>
        </div>

        <!-- Mobile Mascot Tag -->
        <div class="sm:hidden">
          <div class="flex items-center gap-1.5">
            <span class="font-heading font-black text-xs text-emerald-950">Kiko Sahabat Belajar</span>
            <span 
              v-if="isSpeaking" 
              class="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase animate-pulse"
            >
              Membaca...
            </span>
          </div>
          <p class="text-[10px] text-emerald-700 font-heading font-bold">Dengarkan panduan suara ceria</p>
        </div>
      </div>

      <!-- Center: Speech Bubble with Question Text -->
      <div class="flex-1 min-w-0 space-y-1.5 w-full">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="hidden sm:flex items-center gap-2">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900 text-[10px] font-heading font-black uppercase tracking-wider">
              <span>🎙️</span>
              <span>Kiko Membacakan Soal</span>
            </span>
            <span v-if="isSpeaking" class="text-xs font-black text-emerald-600 animate-pulse">
              ● Sedang Berbicara
            </span>
          </div>

          <!-- Controls: Auto-Play Toggle Pill -->
          <button 
            @click="toggleAutoPlay"
            type="button"
            class="text-[10px] font-heading font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ml-auto border shadow-2xs"
            :class="autoPlayEnabled 
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200' 
              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'"
            :title="autoPlayEnabled ? 'Suara otomatis aktif saat soal baru muncul' : 'Suara otomatis nonaktif'"
          >
            <span>{{ autoPlayEnabled ? '⚡ Suara Otomatis: ON' : '🔇 Suara Otomatis: OFF' }}</span>
          </button>
        </div>

        <!-- Question Prompt in Speech Bubble -->
        <div 
          @click="replaySpeech" 
          class="bg-white/90 p-3 sm:p-3.5 rounded-2xl border-2 border-emerald-100/80 shadow-2xs cursor-pointer hover:border-emerald-300 transition-colors group"
          title="Klik teks untuk membaca ulang"
        >
          <p class="font-heading font-black text-sm sm:text-base text-slate-800 leading-snug group-hover:text-emerald-900 transition-colors">
            {{ questionText || 'Ayo dengarkan dan selesaikan soal berikut!' }}
          </p>
          <p v-if="instruction" class="text-xs font-heading font-semibold text-emerald-700 mt-1 flex items-center gap-1">
            <span>👉</span>
            <span>{{ instruction }}</span>
          </p>
        </div>
      </div>

      <!-- Right: Main Tactile Audio Control Button -->
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-1 sm:pt-0">
        <button
          @click="toggleAudio"
          type="button"
          class="w-full sm:w-auto px-4 py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md"
          :class="isSpeaking 
            ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25 animate-pulse' 
            : 'bg-gradient-to-r from-emerald-500 to-[#58cc02] hover:from-emerald-600 hover:to-emerald-500 text-white shadow-emerald-500/30'"
        >
          <span>{{ isSpeaking ? '⏹️ Hentikan' : '🔊 Baca Ulang' }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
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
  mascotAvatar: {
    type: String,
    default: '🦉'
  }
})

const { isSpeaking, autoPlayEnabled, speak, autoSpeak, stop, replay, toggleAutoPlay } = useVoiceNarrator()

const toggleAudio = () => {
  if (isSpeaking.value) {
    stop()
  } else {
    replaySpeech()
  }
}

const replaySpeech = () => {
  const fullText = props.instruction 
    ? `${props.questionText}. ${props.instruction}` 
    : props.questionText
  speak(fullText, true)
}

// Auto-narrate question when questionText changes or when mounted
watch(() => props.questionText, (newText) => {
  if (newText) {
    const fullText = props.instruction ? `${newText}. ${props.instruction}` : newText
    autoSpeak(fullText, 400)
  }
}, { immediate: false })

onMounted(() => {
  if (props.questionText) {
    const fullText = props.instruction ? `${props.questionText}. ${props.instruction}` : props.questionText
    autoSpeak(fullText, 500)
  }
})

onUnmounted(() => {
  stop()
})
</script>
