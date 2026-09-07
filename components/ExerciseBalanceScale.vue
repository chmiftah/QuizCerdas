<template>
  <div class="space-y-4 select-none max-w-xl mx-auto w-full">
    <!-- Header Prompt -->
    <div class="space-y-2 text-center">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-heading font-extrabold text-amber-900 shadow-2xs">
        <span>⚖️</span>
        <span>Timbangan Neraca Seimbang</span>
      </div>
      <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
        {{ exercise.question || 'Tambahkan bobot yang pas di piring kanan agar timbangan seimbang!' }}
      </h2>
    </div>

    <!-- Main Scale Simulation Card -->
    <div class="bg-white rounded-3xl border-4 border-amber-100 p-4 sm:p-6 shadow-xl space-y-5 relative overflow-hidden transition-all duration-300 hover:border-amber-200">
      <!-- Background Accents -->
      <div class="absolute -right-8 -top-8 w-28 h-28 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>
      <div class="absolute -left-8 -bottom-8 w-28 h-28 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>

      <!-- State Status Indicator -->
      <div class="flex items-center justify-between gap-2 px-2 text-xs font-heading font-black">
        <div class="flex items-center gap-1.5">
          <span class="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
            Kiri: <strong class="text-amber-700 font-mono">{{ leftWeight }} kg</strong>
          </span>
          <span class="text-slate-400 font-bold">vs</span>
          <span class="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
            Kanan: <strong class="text-indigo-700 font-mono">{{ totalRightWeight }} kg</strong>
          </span>
        </div>

        <div>
          <span 
            v-if="isBalanced" 
            class="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-sm animate-pop flex items-center gap-1"
          >
            <span>✨</span> SEIMBANG!
          </span>
          <span 
            v-else-if="totalRightWeight < leftWeight" 
            class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]"
          >
            Kurang {{ leftWeight - totalRightWeight }} kg lagi
          </span>
          <span 
            v-else 
            class="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]"
          >
            Terlalu berat +{{ totalRightWeight - leftWeight }} kg
          </span>
        </div>
      </div>

      <!-- Visual Scale Apparatus -->
      <div class="relative w-full h-56 sm:h-64 flex flex-col items-center justify-end pb-4 pt-8 overflow-visible">
        
        <!-- Central Support Column & Fulcrum -->
        <div class="absolute bottom-4 w-4 h-36 sm:h-40 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t-lg shadow-sm z-0"></div>
        <div class="absolute bottom-2 w-28 h-4 bg-slate-700 rounded-full shadow-md z-0"></div>
        <!-- Pivot Pin -->
        <div class="absolute top-12 w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-md z-20 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>

        <!-- Tilting Beam (Rotates around center) -->
        <div 
          class="absolute top-14 w-64 sm:w-80 h-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 rounded-full shadow-md transition-transform duration-500 ease-out origin-center z-10"
          :style="{ transform: `rotate(${beamRotation}deg)` }"
        >
          <!-- Left Hanging Assembly -->
          <div 
            class="absolute -left-1 top-2 flex flex-col items-center origin-top transition-transform duration-500 ease-out"
            :style="{ transform: `rotate(${-beamRotation}deg)` }"
          >
            <!-- Hanging Chains -->
            <div class="w-20 sm:w-24 flex justify-between px-1">
              <div class="w-0.5 h-16 sm:h-20 bg-slate-400/80"></div>
              <div class="w-0.5 h-16 sm:h-20 bg-slate-400/80"></div>
            </div>
            <!-- Left Pan Tray -->
            <div class="w-24 sm:w-28 h-7 bg-gradient-to-b from-amber-200 to-amber-400 border-2 border-amber-500 rounded-b-3xl shadow-md flex items-center justify-center -mt-1 relative">
              <!-- Fruit tokens on Left Pan -->
              <div class="absolute -top-7 flex items-center justify-center gap-0.5 flex-wrap max-w-[90px]">
                <span 
                  v-for="i in Math.min(leftWeight, 6)" 
                  :key="i"
                  class="text-base sm:text-xl drop-shadow-sm animate-pop"
                >
                  {{ leftFruitEmoji }}
                </span>
              </div>
              <span class="text-[10px] font-heading font-black text-amber-950">{{ leftWeight }} kg</span>
            </div>
          </div>

          <!-- Right Hanging Assembly -->
          <div 
            class="absolute -right-1 top-2 flex flex-col items-center origin-top transition-transform duration-500 ease-out"
            :style="{ transform: `rotate(${-beamRotation}deg)` }"
          >
            <!-- Hanging Chains -->
            <div class="w-20 sm:w-24 flex justify-between px-1">
              <div class="w-0.5 h-16 sm:h-20 bg-slate-400/80"></div>
              <div class="w-0.5 h-16 sm:h-20 bg-slate-400/80"></div>
            </div>
            <!-- Right Pan Tray -->
            <div 
              class="w-24 sm:w-28 h-7 bg-gradient-to-b from-indigo-200 to-indigo-400 border-2 border-indigo-500 rounded-b-3xl shadow-md flex items-center justify-center -mt-1 relative transition-colors"
              :class="{ 'ring-4 ring-emerald-400 from-emerald-200 to-emerald-400 border-emerald-500': isBalanced }"
            >
              <!-- Placed weight tokens on Right Pan -->
              <div class="absolute -top-7 flex items-center justify-center gap-0.5 flex-wrap max-w-[90px]">
                <span 
                  v-for="i in Math.min(totalRightWeight, 6)" 
                  :key="i"
                  class="text-base sm:text-xl drop-shadow-sm animate-pop"
                >
                  {{ rightFruitEmoji }}
                </span>
                <span v-if="totalRightWeight === 0" class="text-sm font-black text-indigo-400/80 animate-pulse">
                  ❓
                </span>
              </div>
              <span class="text-[10px] font-heading font-black text-indigo-950">{{ totalRightWeight }} kg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls & Weight Token Picker -->
      <div class="space-y-3 pt-2 border-t border-slate-100">
        <div class="flex items-center justify-between">
          <p class="text-xs font-heading font-bold text-slate-600">
            Pilih atau letakkan bobot tambahan di piring kanan:
          </p>
          <button
            v-if="userAddedWeight > 0"
            @click="clearAddedWeight"
            :disabled="isChecked"
            type="button"
            class="text-[11px] font-heading font-bold text-slate-500 hover:text-rose-600 cursor-pointer transition-colors"
          >
            ↺ Kosongkan
          </button>
        </div>

        <!-- Option Weights Buttons -->
        <div class="grid grid-cols-4 sm:grid-cols-5 gap-2">
          <button
            v-for="opt in displayOptions"
            :key="opt.val"
            @click="handleSelectWeight(opt.val)"
            :disabled="isChecked"
            type="button"
            class="group p-2.5 sm:p-3 rounded-2xl border-2 sm:border-3 font-heading font-black text-center transition-all cursor-pointer shadow-sm active:scale-95 select-none flex flex-col items-center justify-center gap-0.5"
            :class="[
              userAddedWeight === opt.val
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-200 scale-105 ring-4 ring-indigo-200'
                : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
            ]"
          >
            <span class="text-xl sm:text-2xl group-hover:scale-110 transition-transform">{{ opt.icon }}</span>
            <span class="text-xs sm:text-sm">{{ opt.val }} kg</span>
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

const playTone = (freq, duration = 0.15) => {
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

// Configuration from exercise.visual or defaults
const leftWeight = computed(() => {
  if (props.exercise.visual?.leftWeight !== undefined) {
    return Number(props.exercise.visual.leftWeight)
  }
  const parsed = parseInt(props.exercise.correct_answer, 10)
  return isNaN(parsed) ? 5 : parsed
})

const baseRightWeight = computed(() => {
  return Number(props.exercise.visual?.initialRightWeight || 0)
})

const leftFruitEmoji = computed(() => props.exercise.visual?.leftFruit || '🍎')
const rightFruitEmoji = computed(() => props.exercise.visual?.rightFruit || '🍊')

const userAddedWeight = ref(0)

const totalRightWeight = computed(() => baseRightWeight.value + userAddedWeight.value)

const isBalanced = computed(() => totalRightWeight.value === leftWeight.value && userAddedWeight.value > 0)

// Beam tilt angle calculation in degrees (-8 to +8 deg)
const beamRotation = computed(() => {
  const diff = totalRightWeight.value - leftWeight.value
  const angle = diff * 2.5
  return Math.max(-8, Math.min(8, angle))
})

// Build available options from exercise.options or default numeric tokens
const defaultFruitMap = {
  1: '🍓',
  2: '🍊',
  3: '🍎',
  4: '🍈',
  5: '🍉'
}

const displayOptions = computed(() => {
  let list = []
  if (props.exercise.options && Array.isArray(props.exercise.options) && props.exercise.options.length > 0) {
    list = props.exercise.options.map(opt => {
      const num = parseInt(opt, 10) || 1
      return {
        val: num,
        icon: defaultFruitMap[num] || '📦'
      }
    })
  } else {
    list = [
      { val: 1, icon: '🍓' },
      { val: 2, icon: '🍊' },
      { val: 3, icon: '🍎' },
      { val: 4, icon: '🍈' },
      { val: 5, icon: '🍉' }
    ]
  }
  return list
})

const handleSelectWeight = (w) => {
  if (props.isChecked) return
  userAddedWeight.value = w
  emit('select', String(w))

  if (baseRightWeight.value + w === leftWeight.value) {
    // Balanced chime!
    playTone(523.25, 0.15)
    setTimeout(() => playTone(659.25, 0.2), 120)
  } else {
    playTone(392, 0.12)
  }
}

const clearAddedWeight = () => {
  if (props.isChecked) return
  userAddedWeight.value = 0
  emit('select', '')
  playTone(261.63, 0.1)
}

// Watch external selectedOption
watch(() => props.selectedOption, (newVal) => {
  if (newVal) {
    const parsed = parseInt(newVal, 10)
    if (!isNaN(parsed)) {
      userAddedWeight.value = parsed
    }
  } else {
    userAddedWeight.value = 0
  }
}, { immediate: true })
</script>
