<template>
  <div class="space-y-4 sm:space-y-6 select-none max-w-xl mx-auto">
    <!-- Question Header & Audio Player -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-xl sm:text-2xl text-slate-800 font-black leading-tight">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Target Number Pill Badge -->
      <div class="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl font-heading font-black text-sm shrink-0 shadow-2xs">
        <span>✏️ Angka:</span>
        <span class="text-base text-amber-700">{{ targetNumber }}</span>
      </div>
    </div>

    <!-- Instruction Subtitle with dynamic guidance -->
    <p class="text-xs sm:text-sm font-heading font-bold text-slate-500 text-center">
      Tarik garis dari titik berkedip <span class="text-amber-600 font-extrabold">{{ activeStepIndex + 1 }}</span> ke titik berikutnya untuk menulis <span class="text-amber-600 font-extrabold">angka {{ targetNumber }}</span>! 🎨
    </p>

    <!-- Canvas Container Card -->
    <div class="flex flex-col items-center gap-3">
      <div class="relative bg-white rounded-3xl border-4 border-amber-300 p-2 sm:p-3 shadow-xl overflow-hidden touch-none select-none">
        <canvas
          ref="canvasRef"
          :width="canvasWidth"
          :height="canvasHeight"
          @mousedown="handlePointerDown"
          @mousemove="handlePointerMove"
          @mouseup="handlePointerUp"
          @mouseleave="handlePointerUp"
          @touchstart.prevent="handleTouchStart"
          @touchmove.prevent="handleTouchMove"
          @touchend.prevent="handlePointerUp"
          class="bg-amber-50/40 rounded-2xl cursor-pointer border-2 border-dashed border-amber-200"
        ></canvas>

        <!-- Tracing Success Feedback Overlay Badge -->
        <transition name="fade">
          <div 
            v-if="isCompleted && !isChecked" 
            class="absolute top-4 right-4 bg-emerald-500 text-white px-3.5 py-1.5 rounded-full font-heading font-black text-xs shadow-lg flex items-center gap-1.5 animate-bounce"
          >
            <span>⭐ Bentuk Angka Sempurna!</span>
          </div>
        </transition>

        <!-- Help Toast -->
        <transition name="fade">
          <div 
            v-if="hintMessage" 
            class="absolute bottom-4 left-4 right-4 bg-amber-500/95 text-white px-3.5 py-2.5 rounded-2xl font-heading font-extrabold text-xs text-center shadow-lg animate-bounce flex items-center justify-center gap-1.5"
          >
            <span>💡</span>
            <span>{{ hintMessage }}</span>
          </div>
        </transition>

        <!-- Success Animation Card when Checked Correct -->
        <div 
          v-if="isChecked && isCorrect"
          class="absolute inset-0 bg-emerald-500/90 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center animate-pop space-y-2"
        >
          <div class="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center text-4xl shadow-lg animate-bounce">
            ⭐
          </div>
          <h3 class="font-heading text-2xl font-black">Hebat Sekali!</h3>
          <p class="font-heading font-extrabold text-sm text-emerald-100">
            Kamu berhasil menulis angka {{ targetNumber }} dengan urutan garis yang benar!
          </p>
        </div>
      </div>

      <!-- Real-time Step Progress Bar -->
      <div class="w-full max-w-sm space-y-1.5 px-2">
        <div class="flex items-center justify-between text-xs font-heading font-extrabold">
          <span :class="isCompleted ? 'text-emerald-700' : 'text-slate-600'">
            {{ isCompleted ? '✓ Bentuk Angka Lengkap!' : '✏️ Garis yang Sudah Ditebalkan:' }}
          </span>
          <span 
            class="px-2.5 py-0.5 rounded-full text-[11px] font-black transition-colors" 
            :class="isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'"
          >
            {{ activeStepIndex }} / {{ totalSegments }} Garis ({{ progressPercent }}%)
          </span>
        </div>

        <!-- Progress Bar Track -->
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
          :disabled="isChecked"
          type="button"
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-heading font-bold text-xs border border-slate-300 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <span>🧹 Mulai Ulang</span>
        </button>

        <button
          @click="checkManual"
          :disabled="isChecked"
          type="button"
          class="px-5 py-2 text-xs font-heading font-extrabold rounded-2xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
          :class="isCompleted ? 'duo-btn-green' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'"
        >
          <span>{{ isCompleted ? 'Tersimpan ✓' : '✨ Cek Tulisan' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const canvasRef = ref(null)
const canvasWidth = ref(300)
const canvasHeight = ref(300)
let ctx = null

const isCompleted = ref(false)
const hintMessage = ref('')
let hintTimer = null
let animFrameId = null
let pulsePhase = 0

// Sequential Tracing State
const activeStepIndex = ref(0) // Segment index currently being traced
const isDragging = ref(false)
const currentDragPos = ref(null)

const { playPop, playCorrect, playWrong } = useSoundEffects()

// Canonical Step-by-Step Writing Trajectories for Digits 1 to 10
// Each digit is defined by a strictly ordered sequence of waypoints
const DIGIT_PATHS = {
  1: [
    { x: 0.40, y: 0.32 }, // 1. Beak start
    { x: 0.50, y: 0.22 }, // 2. Top peak
    { x: 0.50, y: 0.48 }, // 3. Mid stem
    { x: 0.50, y: 0.78 }  // 4. Base
  ],
  2: [
    { x: 0.36, y: 0.32 }, // 1. Top-left arc start
    { x: 0.48, y: 0.22 }, // 2. Top arc apex
    { x: 0.64, y: 0.32 }, // 3. Top-right shoulder
    { x: 0.50, y: 0.54 }, // 4. Diagonal slide
    { x: 0.36, y: 0.78 }, // 5. Bottom-left corner
    { x: 0.64, y: 0.78 }  // 6. Base right
  ],
  3: [
    { x: 0.36, y: 0.24 }, // 1. Top-left start
    { x: 0.62, y: 0.24 }, // 2. Top-right corner
    { x: 0.48, y: 0.46 }, // 3. Center junction
    { x: 0.66, y: 0.60 }, // 4. Belly right bulge
    { x: 0.50, y: 0.78 }, // 5. Belly bottom arc
    { x: 0.36, y: 0.72 }  // 6. Bottom tail tip
  ],
  4: [
    { x: 0.60, y: 0.22 }, // 1. High top
    { x: 0.36, y: 0.56 }, // 2. Left corner
    { x: 0.68, y: 0.56 }, // 3. Crossbar right
    { x: 0.60, y: 0.42 }, // 4. Vertical stem top
    { x: 0.60, y: 0.78 }  // 5. Vertical stem base
  ],
  5: [
    { x: 0.64, y: 0.23 }, // 1. Top roof right
    { x: 0.36, y: 0.23 }, // 2. Top roof left corner
    { x: 0.36, y: 0.45 }, // 3. Neck down
    { x: 0.52, y: 0.45 }, // 4. Belly top curve
    { x: 0.66, y: 0.56 }, // 5. Belly right bulge
    { x: 0.64, y: 0.68 }, // 6. Belly lower curve
    { x: 0.50, y: 0.78 }, // 7. Bottom arc
    { x: 0.34, y: 0.72 }  // 8. Bottom tail tip
  ],
  6: [
    { x: 0.58, y: 0.23 }, // 1. Top right start
    { x: 0.38, y: 0.42 }, // 2. Curve down spine
    { x: 0.36, y: 0.64 }, // 3. Bottom left
    { x: 0.50, y: 0.78 }, // 4. Bottom base
    { x: 0.66, y: 0.66 }, // 5. Loop right
    { x: 0.54, y: 0.50 }, // 6. Loop top
    { x: 0.38, y: 0.58 }  // 7. Loop close
  ],
  7: [
    { x: 0.34, y: 0.23 }, // 1. Top-left start
    { x: 0.66, y: 0.23 }, // 2. Top-right corner
    { x: 0.52, y: 0.50 }, // 3. Diagonal middle
    { x: 0.40, y: 0.78 }  // 4. Stem base
  ],
  8: [
    { x: 0.50, y: 0.46 }, // 1. Center crossover
    { x: 0.36, y: 0.32 }, // 2. Top-left arc
    { x: 0.50, y: 0.22 }, // 3. Top peak
    { x: 0.64, y: 0.32 }, // 4. Top-right arc
    { x: 0.50, y: 0.46 }, // 5. Center crossover
    { x: 0.36, y: 0.64 }, // 6. Bottom-left arc
    { x: 0.50, y: 0.78 }, // 7. Bottom peak
    { x: 0.64, y: 0.64 }, // 8. Bottom-right arc
    { x: 0.50, y: 0.46 }  // 9. Back to center
  ],
  9: [
    { x: 0.62, y: 0.46 }, // 1. Loop junction
    { x: 0.46, y: 0.46 }, // 2. Loop bottom
    { x: 0.36, y: 0.34 }, // 3. Loop left
    { x: 0.50, y: 0.22 }, // 4. Loop top peak
    { x: 0.64, y: 0.34 }, // 5. Loop right
    { x: 0.62, y: 0.56 }, // 6. Stem down
    { x: 0.54, y: 0.72 }, // 7. Tail curve
    { x: 0.40, y: 0.78 }  // 8. Tail tip
  ],
  10: [
    // Digit '1'
    { x: 0.24, y: 0.32 },
    { x: 0.32, y: 0.22 },
    { x: 0.32, y: 0.78 },
    // Digit '0'
    { x: 0.66, y: 0.22 },
    { x: 0.52, y: 0.36 },
    { x: 0.52, y: 0.64 },
    { x: 0.66, y: 0.78 },
    { x: 0.80, y: 0.64 },
    { x: 0.80, y: 0.36 },
    { x: 0.66, y: 0.22 }
  ]
}

const targetNumber = computed(() => {
  const ans = props.exercise?.correct_answer
  if (ans !== undefined && ans !== null && ans !== '') {
    const num = parseInt(ans)
    if (!isNaN(num)) return num
  }
  const vis = props.exercise?.visual?.target || props.exercise?.visual?.number
  if (vis !== undefined && vis !== null && vis !== '') {
    const num = parseInt(vis)
    if (!isNaN(num)) return num
  }
  return 1
})

const waypoints = computed(() => {
  const pts = DIGIT_PATHS[targetNumber.value] || [
    { x: 0.50, y: 0.25 },
    { x: 0.50, y: 0.50 },
    { x: 0.50, y: 0.75 }
  ]
  const w = canvasWidth.value
  const h = canvasHeight.value
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

/**
 * Main Render Function: Redraws background, completed segments, active drag, and waypoints
 */
const render = () => {
  if (!ctx || !canvasRef.value) return

  const w = canvasWidth.value
  const h = canvasHeight.value
  const cx = w / 2
  const cy = h / 2

  ctx.clearRect(0, 0, w, h)

  // 1. Soft Silhouette Background Number
  ctx.save()
  const fontSize = Math.round(h * 0.65)
  ctx.font = `900 ${fontSize}px "Outfit", "Inter", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = 'rgba(241, 245, 249, 0.75)'
  ctx.fillText(String(targetNumber.value), cx, cy)

  // 2. Dashed Outline Guide
  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 5
  ctx.setLineDash([10, 8])
  ctx.strokeText(String(targetNumber.value), cx, cy)
  ctx.restore()

  const pts = waypoints.value

  // 3. Draw Completed Segments with glowing amber stroke
  if (activeStepIndex.value > 0) {
    ctx.save()
    ctx.lineWidth = 22
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

  // 4. Draw Current Live Drag Line (from current anchor to pointer)
  if (isDragging.value && currentDragPos.value && activeStepIndex.value < totalSegments.value) {
    const anchor = pts[activeStepIndex.value]
    ctx.save()
    ctx.lineWidth = 20
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

  // 5. Draw Waypoint Nodes
  ctx.save()
  pulsePhase = (pulsePhase + 0.05) % (Math.PI * 2)
  const pulseRadius = 16 + Math.sin(pulsePhase) * 4

  pts.forEach((pt, idx) => {
    const isCompletedPt = idx <= activeStepIndex.value
    const isNextTarget = idx === activeStepIndex.value + 1 && !isCompleted.value
    const isCurrentAnchor = idx === activeStepIndex.value && !isCompleted.value

    // Pulsing target beacon circle
    if (isNextTarget) {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.25)'
      ctx.fill()
    }

    // Main Dot
    ctx.beginPath()
    ctx.arc(pt.x, pt.y, isCompletedPt ? 10 : 8, 0, Math.PI * 2)

    if (isCompletedPt) {
      // Golden Completed Star
      ctx.fillStyle = '#f59e0b'
      ctx.shadowColor = '#fbbf24'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else if (isNextTarget) {
      // Vibrant Blue Target Indicator
      ctx.fillStyle = '#3b82f6'
      ctx.shadowColor = '#60a5fa'
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else {
      // Muted Future Point
      ctx.fillStyle = '#94a3b8'
      ctx.shadowBlur = 0
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Number label inside point
    ctx.save()
    ctx.font = 'bold 10px "Outfit", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(String(idx + 1), pt.x, pt.y)
    ctx.restore()
  })

  ctx.restore()
}

/**
 * Handle Pointer Interaction
 */
const handlePointerDown = (evt) => {
  if (props.isChecked || isCompleted.value) return
  const pos = getCanvasPos(evt)
  const pts = waypoints.value

  const currentAnchor = pts[activeStepIndex.value]
  const distToAnchor = Math.hypot(pos.x - currentAnchor.x, pos.y - currentAnchor.y)

  // Start dragging if touch is within 34px of the current anchor point
  if (distToAnchor <= 34) {
    isDragging.value = true
    currentDragPos.value = pos
    playPop()
  } else {
    // Helpful guide if user tapped somewhere else
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

  // Check if reached next point
  const distToTarget = Math.hypot(pos.x - targetPt.x, pos.y - targetPt.y)

  if (distToTarget <= 26) {
    // Snap to target!
    playPop()
    activeStepIndex.value++

    // If reached end of all segments
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
  emit('select', String(targetNumber.value))
}

const showHint = (msg) => {
  hintMessage.value = msg
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    hintMessage.value = ''
  }, 3500)
}

const checkManual = () => {
  if (props.isChecked) return
  if (isCompleted.value) {
    emit('select', String(targetNumber.value))
  } else {
    playWrong()
    const remain = totalSegments.value - activeStepIndex.value
    showHint(`Tarik garis melewati sisa ${remain} titik untuk melengkapi angka ${targetNumber.value}!`)
  }
}

const resetCanvas = () => {
  if (props.isChecked) return
  activeStepIndex.value = 0
  isDragging.value = false
  currentDragPos.value = null
  isCompleted.value = false
  hintMessage.value = ''
  emit('select', '')
}

const startAnimationLoop = () => {
  const loop = () => {
    render()
    animFrameId = requestAnimationFrame(loop)
  }
  animFrameId = requestAnimationFrame(loop)
}

watch(() => targetNumber.value, () => {
  resetCanvas()
})

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    if (typeof window !== 'undefined' && window.innerWidth < 400) {
      canvasWidth.value = 270
      canvasHeight.value = 270
    }
    startAnimationLoop()
  }
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>
