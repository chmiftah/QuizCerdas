<template>
  <!-- If mascot is active (not dismissed) -->
  <div v-if="!isDismissed">
    <!-- Desktop & Tablet: Rich floating companion (draggable & closable) -->
    <div 
      class="hidden sm:flex fixed z-30 items-end gap-2 select-none"
      :style="desktopStyle"
    >
      <!-- Speech Bubble with Close Button -->
      <div 
        v-if="speechBubbleText"
        class="bg-white px-4 py-2.5 rounded-2xl border-3 shadow-xl max-w-xs text-sm font-heading font-extrabold animate-pop flex items-center gap-2 relative group"
        :class="isCorrect ? 'border-duo-green text-duo-green-dark bg-emerald-50' : isChecked ? 'border-duo-red text-duo-red-dark bg-rose-50' : 'border-amber-300 text-amber-900 bg-amber-50'"
      >
        <span>{{ speechBubbleText }}</span>
        <!-- Close bubble button -->
        <button 
          @click.stop="isDismissed = true"
          type="button"
          class="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-black cursor-pointer shrink-0 transition-colors ml-1"
          title="Tutup Kiko"
        >
          ✕
        </button>
      </div>

      <!-- Mascot Avatar Card with Drag & Click -->
      <div 
        class="cursor-grab active:cursor-grabbing transition-transform hover:scale-105 active:scale-95 relative group flex flex-col items-center"
        :class="isChecked && isCorrect ? 'animate-bounce' : isChecked && !isCorrect ? 'animate-pulse' : ''"
        @mousedown="startDragDesktop"
        title="Teman Belajar Kiko 🐼 (Tahan untuk geser, ketuk untuk menyapa!)"
      >
        <!-- Floating Close Pill on Desktop Mascot -->
        <button 
          @click.stop="isDismissed = true"
          type="button"
          class="absolute -top-2 -right-2 z-30 w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-black cursor-pointer shadow-md hover:bg-rose-600 transition-colors"
          title="Tutup Kiko"
        >
          ✕
        </button>
        <KikoAvatar size="md" />
      </div>
    </div>

    <!-- Mobile Screen: Floating Draggable & Closable Pill (Never covers card) -->
    <div 
      class="sm:hidden fixed z-30 flex items-center select-none shadow-lg rounded-2xl"
      :style="mobileStyle"
      @touchstart.passive="startDragMobile"
      @mousedown="startDragMobile"
    >
      <div 
        class="bg-white/95 backdrop-blur-md pl-2 pr-1.5 py-1 rounded-2xl border-2 border-amber-300 flex items-center gap-1.5 cursor-grab active:cursor-grabbing"
      >
        <!-- Click to speak -->
        <button 
          type="button"
          @click="handleClickMobile"
          class="flex items-center gap-1.5 cursor-pointer active:scale-90 transition-transform"
          title="Ketuk untuk menyapa Kiko!"
        >
          <KikoAvatar size="sm" />
          <span class="text-[11px] font-heading font-black text-amber-950 pr-0.5">Kiko 💬</span>
        </button>

        <!-- Drag handle indicator -->
        <span class="text-slate-300 text-xs font-mono select-none px-0.5" title="Tahan dan geser ke posisi yang diinginkan">⠿</span>

        <!-- Close button 'X' -->
        <button 
          type="button"
          @click.stop="isDismissed = true"
          class="w-5 h-5 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center text-[11px] font-black cursor-pointer transition-colors"
          title="Tutup Teman Kiko"
        >
          ✕
        </button>
      </div>
    </div>
  </div>

  <!-- Subtle Reopen Tab if dismissed -->
  <button 
    v-else
    @click="isDismissed = false"
    type="button"
    class="fixed bottom-24 right-0 z-30 bg-amber-400 text-amber-950 font-heading font-black text-[11px] px-2 py-1.5 rounded-l-xl shadow-md border-l-2 border-y-2 border-white flex items-center gap-1 hover:bg-amber-300 transition-all cursor-pointer opacity-70 hover:opacity-100"
    title="Tampilkan kembali Teman Kiko"
  >
    <span>🐼</span>
    <span class="text-[9px]">Kiko</span>
  </button>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const isDismissed = ref(false)
const speechBubbleText = ref('Ayo semangat berhitung bersama Kiko! 🐼')

const correctMessages = [
  'Wah, kamu pintar sekali! ⭐',
  'Luar biasa! Lanjut terus ya! 🚀',
  'Kamu luar biasa hebat! 🏆'
]

const wrongMessages = [
  'Tidak apa-apa, ayo coba lagi! 💪',
  'Kiko yakin kamu pasti bisa! ✨',
  'Tetap semangat, jangan menyerah! ❤️'
]

// Mobile dragging position
const mobilePos = ref({ x: null, y: null })
let mobileDragStart = { x: 0, y: 0, posX: 0, posY: 0 }
let isMobileDragging = false
let mobileMoved = false

const mobileStyle = computed(() => {
  if (mobilePos.value.x !== null && mobilePos.value.y !== null) {
    return {
      left: `${mobilePos.value.x}px`,
      top: `${mobilePos.value.y}px`,
      right: 'auto',
      bottom: 'auto'
    }
  }
  // Default position placed safely below header on right
  return {
    top: '64px',
    right: '12px'
  }
})

const startDragMobile = (e) => {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  
  const target = e.currentTarget
  const rect = target.getBoundingClientRect()
  
  if (mobilePos.value.x === null) {
    mobilePos.value.x = rect.left
    mobilePos.value.y = rect.top
  }

  mobileDragStart = {
    x: clientX,
    y: clientY,
    posX: mobilePos.value.x,
    posY: mobilePos.value.y
  }
  isMobileDragging = true
  mobileMoved = false

  const onMove = (moveEvent) => {
    if (!isMobileDragging) return
    const curX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX
    const curY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY

    const dx = curX - mobileDragStart.x
    const dy = curY - mobileDragStart.y

    if (Math.hypot(dx, dy) > 5) {
      mobileMoved = true
    }

    const newX = mobileDragStart.posX + dx
    const newY = mobileDragStart.posY + dy

    // Screen bounds clamping
    const maxX = window.innerWidth - rect.width - 8
    const maxY = window.innerHeight - rect.height - 80

    mobilePos.value.x = Math.max(8, Math.min(maxX, newX))
    mobilePos.value.y = Math.max(50, Math.min(maxY, newY))
  }

  const onEnd = () => {
    isMobileDragging = false
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onEnd)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onEnd)
  }

  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onEnd)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)
}

const handleClickMobile = () => {
  if (!mobileMoved) {
    speakGreeting()
  }
}

// Desktop dragging position
const desktopPos = ref({ x: null, y: null })
let desktopDragStart = { x: 0, y: 0, posX: 0, posY: 0 }
let isDesktopDragging = false
let desktopMoved = false

const desktopStyle = computed(() => {
  if (desktopPos.value.x !== null && desktopPos.value.y !== null) {
    return {
      left: `${desktopPos.value.x}px`,
      top: `${desktopPos.value.y}px`,
      right: 'auto',
      bottom: 'auto'
    }
  }
  return {
    bottom: '6rem',
    right: '2rem'
  }
})

const startDragDesktop = (e) => {
  if (e.target.closest('button')) return
  const clientX = e.clientX
  const clientY = e.clientY

  const target = e.currentTarget.parentElement
  const rect = target.getBoundingClientRect()

  if (desktopPos.value.x === null) {
    desktopPos.value.x = rect.left
    desktopPos.value.y = rect.top
  }

  desktopDragStart = {
    x: clientX,
    y: clientY,
    posX: desktopPos.value.x,
    posY: desktopPos.value.y
  }
  isDesktopDragging = true
  desktopMoved = false

  const onMove = (moveEvent) => {
    if (!isDesktopDragging) return
    const dx = moveEvent.clientX - desktopDragStart.x
    const dy = moveEvent.clientY - desktopDragStart.y

    if (Math.hypot(dx, dy) > 5) {
      desktopMoved = true
    }

    const newX = desktopDragStart.posX + dx
    const newY = desktopDragStart.posY + dy

    const maxX = window.innerWidth - rect.width - 16
    const maxY = window.innerHeight - rect.height - 80

    desktopPos.value.x = Math.max(16, Math.min(maxX, newX))
    desktopPos.value.y = Math.max(60, Math.min(maxY, newY))
  }

  const onEnd = () => {
    isDesktopDragging = false
    if (!desktopMoved) {
      speakGreeting()
    }
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onEnd)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)
}

const speakGreeting = () => {
  speakText('Halo! Aku Kiko teman belajarmu. Ayo berhitung bersama!')
}

const speakText = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.0
    window.speechSynthesis.speak(utterance)
  }
}

watch([() => props.isChecked, () => props.isCorrect], ([checked, correct]) => {
  if (checked) {
    if (correct) {
      const msg = correctMessages[Math.floor(Math.random() * correctMessages.length)]
      speechBubbleText.value = msg
      speakText(msg.replace(/[^\w\s]/gi, ''))
    } else {
      const msg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)]
      speechBubbleText.value = msg
      speakText(msg.replace(/[^\w\s]/gi, ''))
    }
  } else {
    speechBubbleText.value = 'Ayo semangat berhitung bersama Kiko! 🐼'
  }
})

onMounted(() => {
  speechBubbleText.value = 'Ayo semangat berhitung bersama Kiko! 🐼'
})
</script>
