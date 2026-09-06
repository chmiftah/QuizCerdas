<template>
  <div class="space-y-5 sm:space-y-6 select-none max-w-lg mx-auto w-full">
    <!-- Header with Question Text and Audio -->
    <div class="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-duo-gray-100 shadow-xs">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Time Reading Badge -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl font-heading font-black text-xs shrink-0 shadow-2xs">
        <span>⏰ Baca Jam</span>
      </div>
    </div>

    <!-- Analog Clock Card -->
    <div class="p-4 sm:p-6 bg-white rounded-3xl border-4 border-slate-100 shadow-lg flex flex-col items-center gap-4">
      <div class="w-56 h-56 sm:w-68 sm:h-68 relative flex items-center justify-center">
        <!-- SVG Analog Clock Face (Perfect Mathematical Precision) -->
        <svg viewBox="0 0 240 240" class="w-full h-full drop-shadow-md overflow-visible">
          <!-- Outer Bezel Ring -->
          <circle cx="120" cy="120" r="114" fill="#ffffff" stroke="#1e293b" stroke-width="8" />
          <circle cx="120" cy="120" r="106" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
          <circle cx="120" cy="120" r="100" fill="#ffffff" />

          <!-- 60 Minute & Hour Ticks -->
          <g>
            <line
              v-for="tick in ticks"
              :key="'tick-' + tick.minute"
              :x1="tick.x1"
              :y1="tick.y1"
              :x2="tick.x2"
              :y2="tick.y2"
              :stroke="tick.isHour ? '#334155' : '#cbd5e1'"
              :stroke-width="tick.isHour ? '3' : '1.5'"
              stroke-linecap="round"
            />
          </g>

          <!-- 12 Clock Hour Numbers -->
          <text
            v-for="num in clockNumbers"
            :key="'num-' + num.hour"
            :x="num.x"
            :y="num.y"
            text-anchor="middle"
            dominant-baseline="central"
            class="font-heading font-black text-[15px] select-none pointer-events-none"
            :class="num.isMajor ? 'fill-slate-900 font-extrabold text-[16px]' : 'fill-slate-700'"
          >
            {{ num.hour }}
          </text>

          <!-- Hour Hand (Jarum Pendek: Bold Slate-900) -->
          <line
            :x1="hourHand.x1"
            :y1="hourHand.y1"
            :x2="hourHand.x2"
            :y2="hourHand.y2"
            stroke="#0f172a"
            stroke-width="7"
            stroke-linecap="round"
            class="transition-all duration-300"
          />

          <!-- Minute Hand (Jarum Panjang: Sleek Amber-500) -->
          <line
            :x1="minuteHand.x1"
            :y1="minuteHand.y1"
            :x2="minuteHand.x2"
            :y2="minuteHand.y2"
            stroke="#f59e0b"
            stroke-width="4.5"
            stroke-linecap="round"
            class="transition-all duration-300"
          />

          <!-- Center Cap & Pin Pivot -->
          <circle cx="120" cy="120" r="8" fill="#0f172a" />
          <circle cx="120" cy="120" r="3.5" fill="#fbbf24" />
        </svg>
      </div>

      <!-- Educational Hand Legend -->
      <div class="flex items-center justify-center gap-5 pt-1 text-xs font-heading font-extrabold text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-slate-900 inline-block shadow-2xs"></span>
          <span>Jarum Pendek: <span class="text-slate-900 font-black">Jam</span></span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-2xs"></span>
          <span>Jarum Panjang: <span class="text-amber-700 font-black">Menit</span></span>
        </div>
      </div>
    </div>

    <!-- Answer Options Grid -->
    <div class="space-y-2">
      <p class="font-heading text-xs font-black uppercase text-slate-500 tracking-wider text-center">
        👇 Pilih waktu yang tepat:
      </p>

      <div class="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto w-full">
        <button
          v-for="opt in parsedOptions"
          :key="opt"
          @click="selectOption(opt)"
          type="button"
          :disabled="isChecked"
          class="py-3.5 sm:py-4 px-4 rounded-2xl border-3 font-heading font-black text-xl sm:text-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
          :class="getOptionClasses(opt)"
        >
          <span class="text-lg">🕒</span>
          <span>{{ opt }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

// Safe options parser
const parsedOptions = computed(() => {
  const opts = props.exercise?.options
  if (Array.isArray(opts)) return opts
  if (typeof opts === 'string') return opts.split(',').map(s => s.trim())
  return ['03:00', '06:00', '09:00', '12:00']
})

// Parse Time from correct_answer or visual (e.g. "03:00" -> hour: 3, minute: 0)
const parsedTime = computed(() => {
  const ans = props.exercise?.correct_answer || ''
  if (ans.includes(':')) {
    const [h, m] = ans.split(':').map(Number)
    return {
      hour: isNaN(h) ? 3 : h,
      minute: isNaN(m) ? 0 : m
    }
  }

  const vis = props.exercise?.visual
  if (vis && (vis.hour !== undefined || vis.minute !== undefined)) {
    return {
      hour: Number(vis.hour) || 3,
      minute: Number(vis.minute) || 0
    }
  }

  return { hour: 3, minute: 0 }
})

// Center of SVG clock is (120, 120)
const CX = 120
const CY = 120

// 60 Minute Ticks calculation
const ticks = computed(() => {
  const list = []
  for (let m = 0; m < 60; m++) {
    const isHour = m % 5 === 0
    const angleRad = (m * 6 - 90) * (Math.PI / 180)
    const rOuter = 98
    const rInner = isHour ? 90 : 94

    list.push({
      minute: m,
      isHour,
      x1: Math.round((CX + rInner * Math.cos(angleRad)) * 10) / 10,
      y1: Math.round((CY + rInner * Math.sin(angleRad)) * 10) / 10,
      x2: Math.round((CX + rOuter * Math.cos(angleRad)) * 10) / 10,
      y2: Math.round((CY + rOuter * Math.sin(angleRad)) * 10) / 10
    })
  }
  return list
})

// 12 Numbers coordinates
const clockNumbers = computed(() => {
  const list = []
  const radius = 78
  for (let h = 1; h <= 12; h++) {
    const angleRad = (h * 30 - 90) * (Math.PI / 180)
    list.push({
      hour: h,
      isMajor: [12, 3, 6, 9].includes(h),
      x: Math.round((CX + radius * Math.cos(angleRad)) * 10) / 10,
      y: Math.round((CY + radius * Math.sin(angleRad)) * 10) / 10
    })
  }
  return list
})

// Hour Hand (Jarum Pendek: Length 50px, Counterweight 10px)
const hourHand = computed(() => {
  const { hour, minute } = parsedTime.value
  const hAngleDeg = ((hour % 12) + minute / 60) * 30 - 90
  const hAngleRad = hAngleDeg * (Math.PI / 180)

  const length = 52
  const back = 10

  return {
    x1: Math.round((CX - back * Math.cos(hAngleRad)) * 10) / 10,
    y1: Math.round((CY - back * Math.sin(hAngleRad)) * 10) / 10,
    x2: Math.round((CX + length * Math.cos(hAngleRad)) * 10) / 10,
    y2: Math.round((CY + length * Math.sin(hAngleRad)) * 10) / 10
  }
})

// Minute Hand (Jarum Panjang: Length 76px, Counterweight 14px)
const minuteHand = computed(() => {
  const { minute } = parsedTime.value
  const mAngleDeg = minute * 6 - 90
  const mAngleRad = mAngleDeg * (Math.PI / 180)

  const length = 76
  const back = 14

  return {
    x1: Math.round((CX - back * Math.cos(mAngleRad)) * 10) / 10,
    y1: Math.round((CY - back * Math.sin(mAngleRad)) * 10) / 10,
    x2: Math.round((CX + length * Math.cos(mAngleRad)) * 10) / 10,
    y2: Math.round((CY + length * Math.sin(mAngleRad)) * 10) / 10
  }
})

const selectOption = (opt) => {
  if (props.isChecked) return
  playPop()
  emit('select', opt)
}

const getOptionClasses = (opt) => {
  const isSelected = props.selectedOption === opt

  if (props.isChecked) {
    if (isSelected) {
      return props.isCorrect
        ? 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-4 ring-emerald-300 scale-102 shadow-lg'
        : 'bg-rose-50 text-rose-900 border-rose-500 ring-4 ring-rose-300'
    }
    if (opt === props.exercise?.correct_answer) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-400 opacity-90'
    }
    return 'bg-white text-slate-400 border-slate-200 opacity-50'
  }

  if (isSelected) {
    return 'bg-amber-100 text-amber-950 border-amber-400 ring-4 ring-amber-200 scale-105 shadow-lg'
  }

  return 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:scale-102'
}
</script>