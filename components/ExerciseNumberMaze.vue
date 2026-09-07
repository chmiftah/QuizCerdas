<template>
  <div class="space-y-4 select-none max-w-xl mx-auto w-full">
    <!-- Header Prompt & Rule Badge -->
    <div class="space-y-2 text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-heading font-extrabold text-purple-900 shadow-2xs">
        <span>🌀</span>
        <span>Labirin Logika Angka</span>
      </div>
      <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
        {{ exercise.question || 'Bantu Kiko melewati labirin dengan melangkah sesuai aturan!' }}
      </h2>
      
      <!-- Rule Banner -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs sm:text-sm font-heading font-black text-amber-900 shadow-xs animate-pop">
        <span>🧭 Aturan:</span>
        <span class="text-amber-700 underline decoration-amber-400 decoration-2 font-extrabold">{{ mazeRule }}</span>
      </div>
    </div>

    <!-- Main Maze Card Container -->
    <div class="bg-white rounded-3xl border-4 border-purple-100 p-4 sm:p-6 shadow-xl space-y-4 relative overflow-hidden transition-all duration-300 hover:border-purple-200">
      <!-- Background Accents -->
      <div class="absolute -right-10 -top-10 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Top Guide & Step Counter -->
      <div class="flex items-center justify-between gap-2 text-xs font-heading font-extrabold px-1">
        <div class="flex items-center gap-1.5 text-slate-600">
          <span>🐾 Langkah:</span>
          <span class="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-800 font-mono">{{ path.length }}</span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            @click="playRuleAudio"
            type="button"
            class="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1"
          >
            <span>🔊 Petunjuk</span>
          </button>
          <button
            @click="resetPath"
            :disabled="isChecked || path.length === 0"
            type="button"
            class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-40"
          >
            <span>↺ Ulangi</span>
          </button>
        </div>
      </div>

      <!-- Interactive Maze Grid -->
      <div 
        class="grid gap-2 sm:gap-3 p-3 bg-slate-50/80 rounded-2xl border-2 border-slate-200 max-w-sm mx-auto shadow-inner"
        :style="{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(cell, idx) in flatGrid"
          :key="idx"
          @click="handleCellClick(cell.r, cell.c)"
          class="relative aspect-square rounded-2xl border-2 sm:border-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-sm active:scale-95"
          :class="getCellClass(cell)"
        >
          <!-- Start / End Tags -->
          <span 
            v-if="isStart(cell.r, cell.c)" 
            class="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-emerald-500 text-white rounded-full text-[9px] font-heading font-black tracking-wider uppercase shadow-xs z-10"
          >
            Mulai
          </span>
          <span 
            v-if="isEnd(cell.r, cell.c)" 
            class="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[9px] font-heading font-black tracking-wider uppercase shadow-xs z-10"
          >
            Selesai
          </span>

          <!-- Active Kiko Owl Avatar on Current Head of Path -->
          <div 
            v-if="isCurrentKikoPos(cell.r, cell.c)" 
            class="text-2xl sm:text-3xl animate-bounce drop-shadow-md z-10"
          >
            🦉
          </div>

          <!-- Finished Trophy Icon on Goal if reached -->
          <div 
            v-else-if="isEnd(cell.r, cell.c) && hasReachedEnd" 
            class="text-2xl animate-pop drop-shadow-md z-10"
          >
            🏆
          </div>

          <!-- Cell Number Value -->
          <span 
            class="font-heading font-black text-xl sm:text-2xl transition-colors"
            :class="isVisited(cell.r, cell.c) ? 'text-white' : 'text-slate-800'"
          >
            {{ cell.val }}
          </span>

          <!-- Footstep Dot on Visited Tiles -->
          <span 
            v-if="isVisited(cell.r, cell.c) && !isCurrentKikoPos(cell.r, cell.c)" 
            class="text-[10px] text-emerald-100 opacity-90 leading-none mt-0.5"
          >
            🐾 #{{ getStepNumber(cell.r, cell.c) }}
          </span>
        </div>
      </div>

      <!-- Path Preview Trail Strip -->
      <div class="pt-2 border-t border-slate-100">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-heading font-bold text-slate-500">
          <span class="shrink-0 text-slate-400">Jejak Jalur:</span>
          <div v-if="path.length === 0" class="text-slate-400 text-[11px] italic">
            Ketuk petak "Mulai" untuk memulai langkah Kiko 🦉
          </div>
          <div v-else class="flex items-center gap-1 shrink-0">
            <span 
              v-for="(p, i) in path" 
              :key="i"
              class="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-black shadow-2xs animate-pop"
            >
              {{ p.val }}
              <span v-if="i < path.length - 1" class="text-slate-300 ml-1">➔</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Success Goal Reached Banner -->
      <transition name="fade">
        <div 
          v-if="hasReachedEnd" 
          class="p-3 bg-emerald-500 text-white rounded-2xl font-heading font-black text-xs sm:text-sm text-center shadow-md animate-pop flex items-center justify-center gap-2"
        >
          <span>🎉 Kiko berhasil sampai di petak Selesai! Tekan "Cek Jawaban" di bawah!</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

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

// Synthesized Sound Effects
const playTone = (freq, duration = 0.12) => {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {
    // Audio context suppressed
  }
}

// Default Grid Fallback if not specified in exercise
const defaultGrid = [
  [2, 3, 7],
  [4, 6, 9],
  [5, 8, 10]
]

const grid = computed(() => {
  if (props.exercise.visual?.grid && Array.isArray(props.exercise.visual.grid)) {
    return props.exercise.visual.grid
  }
  return defaultGrid
})

const gridCols = computed(() => grid.value[0]?.length || 3)

const startCoord = computed(() => {
  return props.exercise.visual?.start || [0, 0]
})

const endCoord = computed(() => {
  if (props.exercise.visual?.end) return props.exercise.visual.end
  const rMax = grid.value.length - 1
  const cMax = (grid.value[0]?.length || 1) - 1
  return [rMax, cMax]
})

const mazeRule = computed(() => {
  return props.exercise.visual?.rule || 'Ikuti jalur angka yang tepat menuju Selesai'
})

// Flatten grid for iteration
const flatGrid = computed(() => {
  const result = []
  grid.value.forEach((row, r) => {
    row.forEach((val, c) => {
      result.push({ r, c, val })
    })
  })
  return result
})

// Current path traversed by user: array of { r, c, val }
const path = ref([])

const isStart = (r, c) => r === startCoord.value[0] && c === startCoord.value[1]
const isEnd = (r, c) => r === endCoord.value[0] && c === endCoord.value[1]

const isVisited = (r, c) => path.value.some(p => p.r === r && p.c === c)

const getStepNumber = (r, c) => {
  const idx = path.value.findIndex(p => p.r === r && p.c === c)
  return idx >= 0 ? idx + 1 : 0
}

const isCurrentKikoPos = (r, c) => {
  if (path.value.length === 0) return isStart(r, c)
  const last = path.value[path.value.length - 1]
  return last.r === r && last.c === c
}

const hasReachedEnd = computed(() => {
  if (path.value.length === 0) return false
  const last = path.value[path.value.length - 1]
  return isEnd(last.r, last.c)
})

// Check adjacency: cell must be horizontal or vertical neighbor of current position
const isAdjacentToLast = (r, c) => {
  if (path.value.length === 0) {
    return isStart(r, c)
  }
  const last = path.value[path.value.length - 1]
  const dr = Math.abs(last.r - r)
  const dc = Math.abs(last.c - c)
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1)
}

const getCellClass = (cell) => {
  const { r, c } = cell
  const visited = isVisited(r, c)
  const current = isCurrentKikoPos(r, c)
  const adjacent = isAdjacentToLast(r, c)

  if (visited) {
    return 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200/50 scale-[0.98]'
  }
  if (current) {
    return 'bg-amber-100 border-amber-400 ring-4 ring-amber-300/60 shadow-md'
  }
  if (adjacent && !props.isChecked) {
    return 'bg-purple-50/80 border-purple-300 hover:bg-purple-100 hover:border-purple-400 animate-pulse'
  }
  return 'bg-white border-slate-200 hover:border-slate-300'
}

const emitPath = () => {
  const valString = path.value.map(p => p.val).join(',')
  emit('select', valString)
}

const handleCellClick = (r, c) => {
  if (props.isChecked) return

  const cellVal = grid.value[r]?.[c]
  if (cellVal === undefined) return

  // 1. If clicking an already visited cell: truncate back to that step
  const existingIdx = path.value.findIndex(p => p.r === r && p.c === c)
  if (existingIdx >= 0) {
    path.value = path.value.slice(0, existingIdx + 1)
    playTone(330, 0.1)
    emitPath()
    return
  }

  // 2. If path is empty, must start at start tile
  if (path.value.length === 0) {
    if (isStart(r, c)) {
      path.value.push({ r, c, val: cellVal })
      playTone(440, 0.12)
      emitPath()
    } else {
      // Wrong start tile
      playTone(220, 0.15)
    }
    return
  }

  // 3. Must be adjacent to the last step
  if (isAdjacentToLast(r, c)) {
    path.value.push({ r, c, val: cellVal })
    
    if (isEnd(r, c)) {
      // Victory chime
      playTone(660, 0.2)
      setTimeout(() => playTone(880, 0.3), 150)
    } else {
      const stepFreq = 440 + path.value.length * 40
      playTone(Math.min(stepFreq, 800), 0.12)
    }
    emitPath()
  } else {
    // Not adjacent
    playTone(220, 0.1)
  }
}

const resetPath = () => {
  if (props.isChecked) return
  path.value = []
  emit('select', '')
  playTone(280, 0.1)
}

const playRuleAudio = () => {
  if (typeof window === 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const text = `${props.exercise.question}. Aturannya: ${mazeRule.value}. Mulailah dari petak Mulai!`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

// Watch selectedOption if populated from outside (e.g. preset answer)
watch(() => props.selectedOption, (newVal) => {
  if (!newVal && path.value.length > 0) {
    path.value = []
  }
}, { immediate: true })

onMounted(() => {
  // Auto-place Kiko at start if untouched
  if (path.value.length === 0) {
    const sR = startCoord.value[0]
    const sC = startCoord.value[1]
    const sVal = grid.value[sR]?.[sC]
    if (sVal !== undefined) {
      path.value = [{ r: sR, c: sC, val: sVal }]
      emitPath()
    }
  }
})
</script>
