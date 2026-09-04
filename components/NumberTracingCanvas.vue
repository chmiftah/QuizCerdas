<template>
  <div class="flex flex-col items-center gap-4 select-none">
    <!-- Canvas Container Card -->
    <div class="relative bg-white rounded-3xl border-4 border-amber-300 p-3 shadow-xl overflow-hidden touch-none">
      <canvas
        ref="canvasRef"
        width="340"
        height="340"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend.prevent="stopDrawing"
        class="bg-amber-50/50 rounded-2xl cursor-crosshair border-2 border-dashed border-amber-200"
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
          class="px-6 py-2.5 bg-white text-emerald-700 rounded-2xl font-heading font-extrabold text-sm shadow-md hover:bg-emerald-50 active:scale-95 transition-all"
        >
          🔄 Coba Lagi
        </button>
      </div>
    </div>

    <!-- Controls Bar -->
    <div class="flex items-center gap-3">
      <button
        @click="resetCanvas"
        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-heading font-bold text-xs border border-slate-300 shadow-2xs transition-colors flex items-center gap-1.5"
      >
        <span>🧹 Hapus Kanvas</span>
      </button>
      <button
        @click="checkTracing"
        class="px-5 py-2 duo-btn-green text-xs font-heading font-extrabold rounded-2xl shadow-sm flex items-center gap-1.5"
      >
        <span>✓ Cek Hasil</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  number: { type: Number, default: 1 }
})

const emit = defineEmits(['completed'])

const canvasRef = ref(null)
const isDrawing = ref(false)
const isCompleted = ref(false)
let ctx = null
let drawnPixelCount = 0

const { playPop, playCorrect } = useSoundEffects()

const drawGuideNumber = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // Draw Dotted Guide Number in center
  ctx.save()
  ctx.font = '900 220px "Outfit", "Inter", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 6
  ctx.setLineDash([12, 10])
  ctx.strokeText(String(props.number), 170, 170)

  // Soft background fill number
  ctx.fillStyle = 'rgba(241, 245, 249, 0.6)'
  ctx.fillText(String(props.number), 170, 170)
  ctx.restore()

  drawnPixelCount = 0
  isCompleted.value = false
}

const getCanvasPos = (evt) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

const startDrawing = (evt) => {
  isDrawing.value = true
  const pos = getCanvasPos(evt)
  ctx.beginPath()
  ctx.moveTo(pos.x, pos.y)
  playPop()
}

const draw = (evt) => {
  if (!isDrawing.value || !ctx) return
  const pos = getCanvasPos(evt)

  ctx.lineWidth = 24
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#f59e0b' // Amber gold sparkle stroke
  ctx.shadowColor = '#fbbf24'
  ctx.shadowBlur = 8

  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  drawnPixelCount++
}

const handleTouchStart = (evt) => {
  if (evt.touches.length > 0) {
    startDrawing(evt.touches[0])
  }
}

const handleTouchMove = (evt) => {
  if (evt.touches.length > 0) {
    draw(evt.touches[0])
  }
}

const stopDrawing = () => {
  if (isDrawing.value) {
    isDrawing.value = false
    if (ctx) ctx.closePath()
    if (drawnPixelCount > 30) {
      checkTracing()
    }
  }
}

const checkTracing = () => {
  if (drawnPixelCount > 25) {
    isCompleted.value = true
    playCorrect()
    speakWord(`Luar biasa! Kamu berhasil menjiplak Angka ${props.number}!`)
    emit('completed', props.number)
  }
}

const resetCanvas = () => {
  drawGuideNumber()
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

watch(() => props.number, () => {
  drawGuideNumber()
})

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    drawGuideNumber()
  }
})
</script>
