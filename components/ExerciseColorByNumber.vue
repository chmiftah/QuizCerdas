<template>
  <div class="space-y-4 select-none max-w-xl mx-auto w-full">
    <!-- Header Prompt & Subtitle -->
    <div class="space-y-2 text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-pink-50 border border-pink-200 rounded-full text-xs font-heading font-extrabold text-pink-900 shadow-2xs">
        <span>🎨</span>
        <span>Mewarnai Berdasarkan Angka</span>
      </div>
      <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
        {{ exercise.question || 'Warnai setiap bagian gambar sesuai nomor pada palet cat!' }}
      </h2>
    </div>

    <!-- Main Canvas Card Container -->
    <div class="bg-white rounded-3xl border-4 border-pink-100 p-4 sm:p-6 shadow-xl space-y-4 relative overflow-hidden transition-all duration-300 hover:border-pink-200">
      <!-- Background Accents -->
      <div class="absolute -right-10 -top-10 w-32 h-32 bg-pink-100/40 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-100/40 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Top Status: Remaining Segments & Reset -->
      <div class="flex items-center justify-between gap-2 px-1 text-xs font-heading font-bold">
        <div class="flex items-center gap-1.5 text-slate-600">
          <span>🖌️ Bagian Terisi:</span>
          <span class="px-2 py-0.5 rounded-lg bg-pink-100 text-pink-800 font-mono font-extrabold">
            {{ filledCount }}/{{ totalSegments }}
          </span>
        </div>

        <button
          @click="resetColors"
          :disabled="isChecked || filledCount === 0"
          type="button"
          class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold cursor-pointer transition-colors disabled:opacity-40"
        >
          <span>↺ Hapus Cat</span>
        </button>
      </div>

      <!-- Interactive SVG Illustration Canvas (Cute Friendly Butterfly) -->
      <div class="relative bg-slate-50/80 rounded-2xl border-2 border-slate-200 p-3 sm:p-4 max-w-sm mx-auto shadow-inner flex items-center justify-center">
        <svg 
          viewBox="0 0 320 280" 
          class="w-full max-h-[260px] drop-shadow-sm select-none cursor-pointer"
        >
          <!-- Antennae -->
          <path d="M 155 70 Q 140 30 115 40" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round" />
          <circle cx="112" cy="40" r="6" fill="#F59E0B" />
          <path d="M 165 70 Q 180 30 205 40" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round" />
          <circle cx="208" cy="40" r="6" fill="#F59E0B" />

          <!-- SEGMENT 1: Top-Left Wing (Target: 1) -->
          <g @click="paintSegment('seg_1', 1)" class="transition-transform hover:scale-[1.01] origin-center">
            <path
              d="M 150 100 C 110 30 40 40 40 100 C 40 150 100 160 150 140 Z"
              :fill="segmentFills['seg_1'] || '#F8FAFC'"
              stroke="#64748B"
              stroke-width="3"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_1']" x="90" y="105" font-size="20" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">1</text>
          </g>

          <!-- SEGMENT 2: Top-Right Wing (Target: 1) -->
          <g @click="paintSegment('seg_2', 1)" class="transition-transform hover:scale-[1.01] origin-center">
            <path
              d="M 170 100 C 210 30 280 40 280 100 C 280 150 220 160 170 140 Z"
              :fill="segmentFills['seg_2'] || '#F8FAFC'"
              stroke="#64748B"
              stroke-width="3"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_2']" x="230" y="105" font-size="20" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">1</text>
          </g>

          <!-- SEGMENT 3: Bottom-Left Wing (Target: 2) -->
          <g @click="paintSegment('seg_3', 2)" class="transition-transform hover:scale-[1.01] origin-center">
            <path
              d="M 145 150 C 90 150 60 210 110 240 C 140 250 155 190 150 160 Z"
              :fill="segmentFills['seg_3'] || '#F8FAFC'"
              stroke="#64748B"
              stroke-width="3"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_3']" x="110" y="205" font-size="20" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">2</text>
          </g>

          <!-- SEGMENT 4: Bottom-Right Wing (Target: 2) -->
          <g @click="paintSegment('seg_4', 2)" class="transition-transform hover:scale-[1.01] origin-center">
            <path
              d="M 175 150 C 230 150 260 210 210 240 C 180 250 165 190 170 160 Z"
              :fill="segmentFills['seg_4'] || '#F8FAFC'"
              stroke="#64748B"
              stroke-width="3"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_4']" x="210" y="205" font-size="20" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">2</text>
          </g>

          <!-- Wing Spots Detail: Left Spot (Target: 3) -->
          <g @click="paintSegment('seg_5', 3)">
            <circle
              cx="95"
              cy="95"
              r="16"
              :fill="segmentFills['seg_5'] || '#FFFFFF'"
              stroke="#64748B"
              stroke-width="2"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_5']" x="95" y="101" font-size="16" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">3</text>
          </g>

          <!-- Wing Spots Detail: Right Spot (Target: 3) -->
          <g @click="paintSegment('seg_6', 3)">
            <circle
              cx="225"
              cy="95"
              r="16"
              :fill="segmentFills['seg_6'] || '#FFFFFF'"
              stroke="#64748B"
              stroke-width="2"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_6']" x="225" y="101" font-size="16" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">3</text>
          </g>

          <!-- SEGMENT 7: Caterpillar Body (Target: 4) -->
          <g @click="paintSegment('seg_7', 4)">
            <!-- Body Oval -->
            <ellipse
              cx="160"
              cy="165"
              rx="16"
              ry="50"
              :fill="segmentFills['seg_7'] || '#F8FAFC'"
              stroke="#64748B"
              stroke-width="3"
              class="transition-colors duration-300"
            />
            <text v-if="!segmentFills['seg_7']" x="160" y="172" font-size="18" font-weight="900" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">4</text>
          </g>

          <!-- Head & Friendly Face -->
          <circle cx="160" cy="95" r="22" fill="#FEF08A" stroke="#475569" stroke-width="3" />
          <!-- Eyes -->
          <circle cx="152" cy="92" r="3.5" fill="#1E293B" />
          <circle cx="168" cy="92" r="3.5" fill="#1E293B" />
          <!-- Cheeks -->
          <circle cx="147" cy="100" r="3" fill="#F472B6" opacity="0.6" />
          <circle cx="173" cy="100" r="3" fill="#F472B6" opacity="0.6" />
          <!-- Smile -->
          <path d="M 154 102 Q 160 108 166 102" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Color Palette Swatches Bar -->
      <div class="space-y-2 pt-2 border-t border-slate-100">
        <p class="text-xs font-heading font-bold text-slate-600 text-center">
          Pilih warna di bawah, lalu sentuh bidang bernomor yang sesuai:
        </p>

        <div class="grid grid-cols-4 gap-2 sm:gap-3">
          <button
            v-for="c in palette"
            :key="c.num"
            @click="selectPaletteColor(c)"
            :disabled="isChecked"
            type="button"
            class="p-2 sm:p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
            :class="[
              activeColor.num === c.num
                ? 'scale-105 ring-4 ring-offset-1 ring-slate-400 shadow-md'
                : 'hover:scale-102 opacity-90'
            ]"
            :style="{ borderColor: c.hex, backgroundColor: activeColor.num === c.num ? c.hex : '#FFFFFF' }"
          >
            <div 
              class="w-6 h-6 rounded-full border-2 border-white shadow-xs flex items-center justify-center font-heading font-black text-xs text-white"
              :style="{ backgroundColor: c.hex }"
            >
              {{ c.num }}
            </div>
            <span 
              class="text-[11px] font-heading font-black truncate max-w-full"
              :class="activeColor.num === c.num ? 'text-white' : 'text-slate-700'"
            >
              {{ c.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Completion Banner -->
      <transition name="fade">
        <div 
          v-if="isAllCompleted" 
          class="p-3 bg-emerald-500 text-white rounded-2xl font-heading font-black text-xs sm:text-sm text-center shadow-md animate-pop flex items-center justify-center gap-2"
        >
          <span>🎉 Kupu-kupu sudah diwarnai dengan sempurna! Klik "Cek Jawaban"!</span>
        </div>
      </transition>
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

// Palette Definition
const defaultPalette = [
  { num: 1, label: 'Merah', hex: '#EF4444' },
  { num: 2, label: 'Kuning', hex: '#FBBF24' },
  { num: 3, label: 'Biru', hex: '#3B82F6' },
  { num: 4, label: 'Hijau', hex: '#10B981' }
]

const palette = computed(() => {
  return props.exercise.visual?.palette || defaultPalette
})

const activeColor = ref(palette.value[0])

// Segment definitions & target numbers
const segmentTargets = {
  seg_1: 1,
  seg_2: 1,
  seg_3: 2,
  seg_4: 2,
  seg_5: 3,
  seg_6: 3,
  seg_7: 4
}

const totalSegments = Object.keys(segmentTargets).length

// Current fills map: { seg_1: '#EF4444', ... }
const segmentFills = ref({})

const filledCount = computed(() => Object.keys(segmentFills.value).length)

const isAllCompleted = computed(() => {
  if (filledCount.value < totalSegments) return false
  return Object.keys(segmentTargets).every(segId => {
    const targetNum = segmentTargets[segId]
    const targetPalette = palette.value.find(p => p.num === targetNum)
    return segmentFills.value[segId] === targetPalette?.hex
  })
})

const selectPaletteColor = (c) => {
  if (props.isChecked) return
  activeColor.value = c
  playTone(440, 0.08)
}

const paintSegment = (segId, targetNum) => {
  if (props.isChecked) return

  const chosenColor = activeColor.value
  segmentFills.value = {
    ...segmentFills.value,
    [segId]: chosenColor.hex
  }

  // Play audio feedback
  if (chosenColor.num === targetNum) {
    playTone(587.33, 0.12) // D5
  } else {
    playTone(329.63, 0.12) // E4
  }

  emitAnswer()
}

const resetColors = () => {
  if (props.isChecked) return
  segmentFills.value = {}
  emit('select', '')
  playTone(261.63, 0.1)
}

const emitAnswer = () => {
  // If all segments filled correctly, emit 'completed'
  if (isAllCompleted.value) {
    emit('select', 'completed')
  } else {
    // Or emit status map / count
    emit('select', `filled_${filledCount.value}`)
  }
}

// Watch external selectedOption
watch(() => props.selectedOption, (newVal) => {
  if (!newVal && Object.keys(segmentFills.value).length > 0) {
    segmentFills.value = {}
  }
}, { immediate: true })
</script>
