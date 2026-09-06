<template>
  <div class="flex flex-col items-center gap-3 select-none">
    <!-- Canvas Container Card -->
    <div class="relative bg-white rounded-3xl border-4 border-amber-300 p-3 shadow-xl overflow-hidden touch-none select-none">
      <canvas
        ref="canvasRef"
        width="340"
        height="340"
        @mousedown="handlePointerDown"
        @mousemove="handlePointerMove"
        @mouseup="handlePointerUp"
        @mouseleave="handlePointerUp"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="handlePointerUp"
        class="bg-amber-50/50 rounded-2xl cursor-pointer border-2 border-dashed border-amber-200"
      ></canvas>

      <!-- Completion Overlay Badge -->
      <div 
        v-if="isCompleted" 
        class="absolute inset-0 bg-emerald-500/90 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center animate-pop space-y-3"
      >
        <div class="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center text-4xl shadow-lg animate-bounce">
          ⭐
        </div>
        <h3 class="font-heading text-2xl sm:text-3xl font-black">Luar Biasa!</h3>
        <p class="font-heading font-extrabold text-sm text-emerald-100">
          Kamu Berhasil Menulis Angka {{ number }}!
        </p>
        <button 
          @click="resetCanvas" 
          class="px-6 py-2.5 bg-white text-emerald-700 rounded-2xl font-heading font-extrabold text-sm shadow-md hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
        >
          🔄 Coba Lagi
        </button>
      </div>

      <!-- Hint Toast -->
      <transition name="fade">
        <div 
          v-if="hintMessage" 
          class="absolute bottom-4 left-4 right-4 bg-amber-500/95 text-white px-3.5 py-2.5 rounded-2xl font-heading font-extrabold text-xs text-center shadow-lg animate-bounce flex items-center justify-center gap-1.5"
        >
          <span>💡</span>
          <span>{{ hintMessage }}</span>
        </div>
      </transition>
    </div>

    <!-- Step Progress Bar -->
    <div class="w-full max-w-[340px] space-y-1.5 px-2">
      <div class="flex items-center justify-between text-xs font-heading font-extrabold">
        <span :class="isCompleted ? 'text-emerald-700' : 'text-slate-600'">
          {{ isCompleted ? '✓ Angka Berhasil Ditulis!' : '✏️ Garis yang Ditebalkan:' }}
        </span>
        <span 
          class="px-2.5 py-0.5 rounded-full text-[11px] font-black transition-colors" 
          :class="isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'"
        >
          {{ activeStepIndex }} / {{ totalSegments }} Garis ({{ progressPercent }}%)
        </span>
      </div>

      <div class="w-full h-3 bg-slate-100 rounded-full border border-slate-200 overflow-hidden p-0.5 shadow-inner">
        <div 
          class="h-full rounded-full transition-all duration-300"
          :class="isCompleted ? 'bg-emerald-500 shadow-sm' : 'bg-amber-400'"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>
    </div>

    <!-- Controls Bar -->
    <div class="flex items-center gap-3 pt-1">
      <button
        @click="resetCanvas"
        type="button"
        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-heading font-bold text-xs border border-slate-300 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
      >
        <span>🧹 Mulai Ulang</span>
      </button>
      <button
        @click="checkTracing"
        type="button"
        class="px-5 py-2 text-xs font-heading font-extrabold rounded-2xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
        :class="isCompleted ? 'duo-btn-green' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'"
      >
        <span>{{ isCompleted ? 'Tersimpan ✓' : '✓ Cek Hasil' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  number: { type: Number, default: 1 }
})

const emit = defineEmits(['completed'])

const canvasRef = ref(null)
const isCompleted = ref(false)
const hintMessage = ref('')
let hintTimer = null
let animFrameId = null
let pulsePhase = 0

let ctx = null
const activeStepIndex = ref(0)
const isDragging = ref(false)
const currentDragPos = ref(null)

const { playPop, playCorrect, playWrong } = useSoundEffects()

const DIGIT_PATHS = {
  1: [
    { x: 0.40, y: 0.32 },
    { x: 0.50, y: 0.22 },
    { x: 0.50, y: 0.48 },
    { x: 0.50, y: 0.78 }
  ],
  2: [
    { x: 0.36, y: 0.32 },
    { x: 0.48, y: 0.22 },
    { x: 0.64, y: 0.32 },
    { x: 0.50, y: 0.54 },
    { x: 0.36, y: 0.78 },
    { x: 0.64, y: 0.78 }
  ],
  3: [
    { x: 0.36, y: 0.24 },
    { x: 0.62, y: 0.24 },
    { x: 0.48, y: 0.46 },
    { x: 0.66, y: 0.60 },
    { x: 0.50, y: 0.78 },
    { x: 0.36, y: 0.72 }
  ],
  4: [
    { x: 0.60, y: 0.22 },
    { x: 0.36, y: 0.56 },
    { x: 0.68, y: 0.56 },
    { x: 0.60, y: 0.42 },
    { x: 0.60, y: 0.78 }
  ],
  5: [
    { x: 0.64, y: 0.23 },
    { x: 0.36, y: 0.23 },
    { x: 0.36, y: 0.45 },
    { x: 0.52, y: 0.45 },
    { x: 0.66, y: 0.56 },
    { x: 0.64, y: 0.68 },
    { x: 0.50, y: 0.78 },
    { x: 0.34, y: 0.72 }
  ],
  6: [
    { x: 0.58, y: 0.23 },
    { x: 0.38, y: 0.42 },
    { x: 0.36, y: 0.64 },
    { x: 0.50, y: 0.78 },
    { x: 0.66, y: 0.66 },
    { x: 0.54, y: 0.50 },
    { x: 0.38, y: 0.58 }
  ],
  7: [
    { x: 0.34, y: 0.23 },
    { x: 0.66, y: 0.23 },
    { x: 0.52, y: 0.50 },
    { x: 0.40, y: 0.78 }
  ],
  8: [
    { x: 0.50, y: 0.46 },
    { x: 0.36, y: 0.32 },
    { x: 0.50, y: 0.22 },
    { x: 0.64, y: 0.32 },
    { x: 0.50, y: 0.46 },
    { x: 0.36, y: 0.64 },
    { x: 0.50, y: 0.78 },
    { x: 0.64, y: 0.64 },
    { x: 0.50, y: 0.46 }
  ],
  9: [
    { x: 0.62, y: 0.46 },
    { x: 0.46, y: 0.46 },
    { x: 0.36, y: 0.34 },
    { x: 0.50, y: 0.22 },
    { x: 0.64, y: 0.34 },
    { x: 0.62, y: 0.56 },
    { x: 0.54, y: 0.72 },
    { x: 0.40, y: 0.78 }
  ],
  10: [
    { x: 0.24, y: 0.32 },
    { x: 0.32, y: 0.22 },
    { x: 0.32, y: 0.78 },
    { x: 0.66, y: 0.22 },
    { x: 0.52, y: 0.36 },
    { x: 0.52, y: 0.64 },
    { x: 0.66, y: 0.78 },
    { x: 0.80, y: 0.64 },
    { x: 0.80, y: 0.36 },
    { x: 0.66, y: 0.22 }
  ]
}

const waypoints = computed(() => {
  const pts = DIGIT_PATHS[props.number] || [
    { x: 0.50, y: 0.25 },
    { x: 0.50, y: 0.50 },
    { x: 0.50, y: 0.75 }
  ]
  const w = 340
  const h = 340
  return pts.map(pt => ({
    x: pt.x * w,
    y: pt.y * h
  }))
})

const totalSegments = computed(() => {
  return Math.max(1, waypoints.value.length - 1)
})

const progressPercent = computed(() => {
  if (totalSegments.value === 0) return 0
  return Math.min(100, Math.round((activeStepIndex.value / totalSegments.value) * 100))
})

const getCanvasPos = (evt) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  return {
    x: (evt.clientX - rect.left) * (canvasRef.value.width / rect.width),
    y: (evt.clientY - rect.top) * (canvasRef.value.height / rect.height)
  }
}

const render = () => {
  if (!ctx || !canvasRef.value) return

  const w = 340
  const h = 340
  const cx = 170
  const cy = 170

  ctx.clearRect(0, 0, w, h)

  ctx.save()
  ctx.font = '900 220px "Outfit", "Inter", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = 'rgba(241, 245, 249, 0.65)'
  ctx.fillText(String(props.number), cx, cy)

  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 6
  ctx.setLineDash([12, 10])
  ctx.strokeText(String(props.number), cx, cy)
  ctx.restore()

  const pts = waypoints.value

  if (activeStepIndex.value > 0) {
    ctx.save()
    ctx.lineWidth = 24
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#f59e0b'
    ctx.shadowColor = '#fbbf24'
    ctx.shadowBlur = 10

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i <= activeStepIndex.value && i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y)
    }
    ctx.stroke()
    ctx.restore()
  }

  if (isDragging.value && currentDragPos.value && activeStepIndex.value < totalSegments.value) {
    const anchor = pts[activeStepIndex.value]
    ctx.save()
    ctx.lineWidth = 22
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#fbbf24'
    ctx.shadowColor = '#f59e0b'
    ctx.shadowBlur = 8

    ctx.beginPath()
    ctx.moveTo(anchor.x, anchor.y)
    ctx.lineTo(currentDragPos.value.x, currentDragPos.value.y)
    ctx.stroke()
    ctx.restore()
  }

  ctx.save()
  pulsePhase = (pulsePhase + 0.05) % (Math.PI * 2)
  const pulseRadius = 18 + Math.sin(pulsePhase) * 4

  pts.forEach((pt, idx) => {
    const isCompletedPt = idx <= activeStepIndex.value
    const isNextTarget = idx === activeStepIndex.value + 1 && !isCompleted.value

    if (isNextTarget) {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.25)'
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(pt.x, pt.y, isCompletedPt ? 11 : 9, 0, Math.PI * 2)

    if (isCompletedPt) {
      ctx.fillStyle = '#f59e0b'
      ctx.shadowColor = '#fbbf24'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else if (isNextTarget) {
      ctx.fillStyle = '#3b82f6'
      ctx.shadowColor = '#60a5fa'
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else {
      ctx.fillStyle = '#94a3b8'
      ctx.shadowBlur = 0
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    ctx.save()
    ctx.font = 'bold 11px "Outfit", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(String(idx + 1), pt.x, pt.y)
    ctx.restore()
  })

  ctx.restore()
}

const handlePointerDown = (evt) => {
  if (isCompleted.value) return
  const pos = getCanvasPos(evt)
  const pts = waypoints.value

  const currentAnchor = pts[activeStepIndex.value]
  const distToAnchor = Math.hypot(pos.x - currentAnchor.x, pos.y - currentAnchor.y)

  if (distToAnchor <= 36) {
    isDragging.value = true
    currentDragPos.value = pos
    playPop()
  } else {
    showHint(`Mulai tarik garis dari titik nomor ${activeStepIndex.value + 1} ya! 👆`)
  }
}

const handlePointerMove = (evt) => {
  if (!isDragging.value || isCompleted.value) return
  const pos = getCanvasPos(evt)
  currentDragPos.value = pos

  const pts = waypoints.value
  const targetPt = pts[activeStepIndex.value + 1]

  if (!targetPt) return

  const distToTarget = Math.hypot(pos.x - targetPt.x, pos.y - targetPt.y)

  if (distToTarget <= 28) {
    playPop()
    activeStepIndex.value++

    if (activeStepIndex.value >= totalSegments.value) {
      finishTracing()
    }
  }
}

const handlePointerUp = () => {
  if (isDragging.value) {
    isDragging.value = false
    currentDragPos.value = null
  }
}

const handleTouchStart = (evt) => {
  if (evt.touches.length > 0) {
    handlePointerDown(evt.touches[0])
  }
}

const handleTouchMove = (evt) => {
  if (evt.touches.length > 0) {
    handlePointerMove(evt.touches[0])
  }
}

const finishTracing = () => {
  isDragging.value = false
  currentDragPos.value = null
  isCompleted.value = true
  playCorrect()
  speakWord(`Luar biasa! Kamu berhasil menjiplak Angka ${props.number}!`)
  emit('completed', props.number)
}

const showHint = (msg) => {
  hintMessage.value = msg
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    hintMessage.value = ''
  }, 3500)
}

const checkTracing = () => {
  if (isCompleted.value) {
    emit('completed', props.number)
  } else {
    playWrong()
    const remain = totalSegments.value - activeStepIndex.value
    showHint(`Tarik garis melewati sisa ${remain} titik untuk melengkapi angka ${props.number}!`)
  }
}

const resetCanvas = () => {
  activeStepIndex.value = 0
  isDragging.value = false
  currentDragPos.value = null
  isCompleted.value = false
  hintMessage.value = ''
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

const startAnimationLoop = () => {
  const loop = () => {
    render()
    animFrameId = requestAnimationFrame(loop)
  }
  animFrameId = requestAnimationFrame(loop)
}

watch(() => props.number, () => {
  resetCanvas()
})

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    startAnimationLoop()
  }
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>
