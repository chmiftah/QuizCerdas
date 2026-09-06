<template>
  <div class="space-y-5 sm:space-y-6 select-none max-w-xl mx-auto w-full">
    <!-- Header with Question Text and Audio Player Button & Reset Button -->
    <div class="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-duo-gray-100 shadow-xs">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Reset All Pairs Button -->
      <button 
        v-if="hasSelections && !isChecked"
        @click="handleReset"
        type="button"
        class="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200 rounded-2xl font-heading font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
        title="Hapus semua pasangan yang sudah dipilih"
      >
        <RotateCcw class="w-3.5 h-3.5 text-rose-500" />
        <span class="hidden sm:inline">Reset Pasangan</span>
        <span class="sm:hidden">Reset</span>
      </button>
    </div>

    <!-- Instruction Bar -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
      <div class="flex items-center gap-2">
        <span class="text-base sm:text-lg">💡</span>
        <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">
          Tarik garis atau ketuk item di <strong class="text-duo-blue font-extrabold">KIRI</strong> lalu pasangkan dengan item di <strong class="text-duo-green-dark font-extrabold">KANAN</strong>!
        </p>
      </div>
    </div>

    <!-- Interactive Board Container with SVG Connection Lines Overlay -->
    <div 
      ref="boardContainerRef" 
      class="relative pt-2 pb-4 touch-none select-none"
      @mousemove="handleLivePointerMove"
      @mouseup="handleLivePointerUp"
      @touchmove="handleLiveTouchMove"
      @touchend="handleLivePointerUp"
    >
      <!-- SVG Connecting Lines Layer -->
      <svg 
        class="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
      >
        <!-- Glow Filter -->
        <defs>
          <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.25"/>
          </filter>
        </defs>

        <!-- Confirmed Connecting Bezier Lines -->
        <g v-for="line in connectionLines" :key="line.id">
          <!-- Background Glow Halo -->
          <path
            :d="line.d"
            :stroke="line.color"
            stroke-width="9"
            stroke-linecap="round"
            fill="none"
            opacity="0.25"
          />
          <!-- Core Crisp Line -->
          <path
            :d="line.d"
            :stroke="line.color"
            stroke-width="4.5"
            stroke-linecap="round"
            fill="none"
            class="transition-all duration-200"
          />
          <!-- Left Pin Node -->
          <circle :cx="line.x1" :cy="line.y1" r="5.5" :fill="line.color" stroke="#ffffff" stroke-width="2" />
          <!-- Right Pin Node -->
          <circle :cx="line.x2" :cy="line.y2" r="5.5" :fill="line.color" stroke="#ffffff" stroke-width="2" />
        </g>

        <!-- Live Drag / Selection Guide Line -->
        <g v-if="liveDragPath">
          <path
            :d="liveDragPath.d"
            stroke="#3b82f6"
            stroke-width="4"
            stroke-dasharray="6 4"
            stroke-linecap="round"
            fill="none"
          />
          <circle :cx="liveDragPath.x1" :cy="liveDragPath.y1" r="6" fill="#3b82f6" stroke="#ffffff" stroke-width="2" />
          <circle :cx="liveDragPath.x2" :cy="liveDragPath.y2" r="5" fill="#60a5fa" stroke="#ffffff" stroke-width="1.5" />
        </g>
      </svg>

      <!-- Two Column Matching Pairs Grid -->
      <div class="grid grid-cols-2 gap-6 sm:gap-12 relative z-10">
        <!-- Left Column -->
        <div class="space-y-3">
          <h4 class="font-heading text-xs uppercase tracking-wider text-slate-400 font-black mb-1 flex items-center justify-between">
            <span>KIRI</span>
            <span v-if="selectedLeft" class="text-duo-blue text-[11px] font-extrabold animate-pulse">👈 Pasangkan</span>
          </h4>

          <div
            v-for="(left, leftIdx) in leftItems" 
            :key="'left-' + leftIdx"
            :ref="el => setLeftCardRef(left, el)"
            @mousedown="handleLeftPointerDown($event, left)"
            @touchstart="handleLeftTouchStart($event, left)"
            class="w-full p-3.5 sm:p-4 rounded-2xl border-3 font-heading font-bold text-left transition-all duration-200 cursor-pointer relative shadow-sm hover:scale-102 active:scale-98 flex items-center justify-between gap-2"
            :class="getLeftCardClass(left)"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <!-- Only show photo thumbnail if text has no emoji -->
              <img 
                v-if="!hasEmoji(left) && getObjectImageUrl(left)" 
                :src="getObjectImageUrl(left)" 
                :alt="left" 
                class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl shadow-2xs border border-slate-200 shrink-0" 
              />
              <span class="text-base sm:text-xl font-black text-slate-800 truncate">{{ left }}</span>
            </div>

            <!-- Right Pin Connector Socket on the card edge -->
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors shadow-2xs"
              :class="getLeftSocketClass(left)"
            >
              <div 
                class="w-2 h-2 rounded-full transition-all"
                :class="getPairColorForLeft(left) ? 'bg-white scale-110' : (selectedLeft === left ? 'bg-duo-blue animate-ping' : 'bg-transparent')"
              ></div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-3">
          <h4 class="font-heading text-xs uppercase tracking-wider text-slate-400 font-black mb-1">
            KANAN
          </h4>

          <div 
            v-for="(right, rightIdx) in rightItems" 
            :key="'right-' + rightIdx"
            :ref="el => setRightCardRef(right, el)"
            @click="selectRight(right)"
            class="w-full p-3.5 sm:p-4 rounded-2xl border-3 font-heading font-bold text-left transition-all duration-200 cursor-pointer relative shadow-sm flex items-center justify-between gap-2"
            :class="getRightCardClass(right)"
          >
            <!-- Left Pin Connector Socket on the card edge -->
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors shadow-2xs"
              :class="getRightSocketClass(right)"
            >
              <div 
                class="w-2 h-2 rounded-full transition-all"
                :class="getPairColorForRight(right) ? 'bg-white scale-110' : 'bg-transparent'"
              ></div>
            </div>

            <div class="flex items-center gap-2.5 min-w-0 flex-1 justify-end sm:justify-start">
              <!-- Only show photo thumbnail if text has no emoji -->
              <img 
                v-if="!hasEmoji(right) && getObjectImageUrl(right)" 
                :src="getObjectImageUrl(right)" 
                :alt="right" 
                class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl shadow-2xs border border-slate-200 shrink-0" 
              />
              <span class="text-base sm:text-xl font-black text-slate-800 truncate">{{ right }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import { getObjectImageUrl } from '~/composables/useObjectImages'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  matchingSelections: { type: Object, default: () => ({}) },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['pair', 'reset', 'unpair'])
const { playPop } = useSoundEffects()

const boardContainerRef = ref(null)
const leftCardRefs = ref({})
const rightCardRefs = ref({})

const selectedLeft = ref(null)
const leftItems = ref([])
const rightItems = ref([])

// Live Dragging state
const isDragging = ref(false)
const dragStartLeft = ref(null)
const currentPointerPos = ref({ x: 0, y: 0 })

const hasSelections = computed(() => {
  return Object.keys(props.matchingSelections || {}).length > 0
})

// Distinct, vibrant color palette for connection lines and badges
const PAIR_COLORS = [
  { stroke: '#3b82f6', bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-950' },
  { stroke: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-950' },
  { stroke: '#8b5cf6', bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-950' },
  { stroke: '#f43f5e', bg: 'bg-rose-50', border: 'border-rose-400', text: 'text-rose-950' },
  { stroke: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-950' }
]

const setLeftCardRef = (item, el) => {
  if (el) leftCardRefs.value[item] = el
}

const setRightCardRef = (item, el) => {
  if (el) rightCardRefs.value[item] = el
}

const hasEmoji = (str) => {
  return /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu.test(String(str))
}

watch(() => props.exercise, (newEx) => {
  selectedLeft.value = null
  isDragging.value = false
  dragStartLeft.value = null
  leftCardRefs.value = {}
  rightCardRefs.value = {}

  if (newEx && newEx.options) {
    const parsedPairs = newEx.options.map(opt => opt.split('::'))
    const lefts = parsedPairs.map(p => p[0] ? p[0].trim() : '')
    const rights = parsedPairs.map(p => p[1] ? p[1].trim() : '').filter(r => r !== '')

    leftItems.value = lefts
    rightItems.value = [...rights].sort(() => Math.random() - 0.5)
  }
  nextTick(() => updateLineCoordinates())
}, { immediate: true })

// Connection Lines Data
const connectionLines = ref([])

const updateLineCoordinates = () => {
  if (!boardContainerRef.value) return
  const containerRect = boardContainerRef.value.getBoundingClientRect()
  const lines = []

  const pairs = props.matchingSelections || {}
  const leftKeys = Object.keys(pairs)

  leftKeys.forEach((leftItem, idx) => {
    const rightItem = pairs[leftItem]
    const elLeft = leftCardRefs.value[leftItem]
    const elRight = rightCardRefs.value[rightItem]

    if (elLeft && elRight) {
      const lRect = elLeft.getBoundingClientRect()
      const rRect = elRight.getBoundingClientRect()

      const x1 = Math.round(lRect.right - containerRect.left)
      const y1 = Math.round(lRect.top + lRect.height / 2 - containerRect.top)
      const x2 = Math.round(rRect.left - containerRect.left)
      const y2 = Math.round(rRect.top + rRect.height / 2 - containerRect.top)

      const dx = Math.max(30, (x2 - x1) * 0.5)
      const cx1 = x1 + dx
      const cy1 = y1
      const cx2 = x2 - dx
      const cy2 = y2

      const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
      const palette = PAIR_COLORS[idx % PAIR_COLORS.length]

      let color = palette.stroke
      if (props.isChecked) {
        color = props.isCorrect ? '#10b981' : '#f43f5e'
      }

      lines.push({
        id: `${leftItem}->${rightItem}`,
        x1, y1, x2, y2,
        d,
        color
      })
    }
  })

  connectionLines.value = lines
}

// Watch selections and window changes to keep lines accurately snapped
watch(() => props.matchingSelections, () => {
  nextTick(() => updateLineCoordinates())
}, { deep: true })

let resizeObserver = null

onMounted(() => {
  nextTick(() => {
    updateLineCoordinates()
    if (typeof ResizeObserver !== 'undefined' && boardContainerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateLineCoordinates()
      })
      resizeObserver.observe(boardContainerRef.value)
    }
  })
  window.addEventListener('resize', updateLineCoordinates)
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', updateLineCoordinates)
})

// Live Drag Path Calculation
const liveDragPath = computed(() => {
  if (!isDragging.value || !dragStartLeft.value || !boardContainerRef.value) return null
  const elLeft = leftCardRefs.value[dragStartLeft.value]
  if (!elLeft) return null

  const containerRect = boardContainerRef.value.getBoundingClientRect()
  const lRect = elLeft.getBoundingClientRect()

  const x1 = Math.round(lRect.right - containerRect.left)
  const y1 = Math.round(lRect.top + lRect.height / 2 - containerRect.top)
  const x2 = currentPointerPos.value.x
  const y2 = currentPointerPos.value.y

  const dx = Math.max(20, (x2 - x1) * 0.45)
  const cx1 = x1 + dx
  const cy1 = y1
  const cx2 = x2 - dx
  const cy2 = y2

  return {
    x1, y1, x2, y2,
    d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
  }
})

// Pointer Events for Drag & Tap
const handleLeftPointerDown = (evt, left) => {
  if (props.isChecked) return
  playPop()
  selectedLeft.value = left
  dragStartLeft.value = left
  isDragging.value = true

  const containerRect = boardContainerRef.value?.getBoundingClientRect()
  if (containerRect) {
    currentPointerPos.value = {
      x: evt.clientX - containerRect.left,
      y: evt.clientY - containerRect.top
    }
  }
}

const handleLeftTouchStart = (evt, left) => {
  if (props.isChecked || evt.touches.length === 0) return
  handleLeftPointerDown(evt.touches[0], left)
}

const handleLivePointerMove = (evt) => {
  if (!isDragging.value || !boardContainerRef.value) return
  const containerRect = boardContainerRef.value.getBoundingClientRect()
  currentPointerPos.value = {
    x: evt.clientX - containerRect.left,
    y: evt.clientY - containerRect.top
  }
}

const handleLiveTouchMove = (evt) => {
  if (!isDragging.value || evt.touches.length === 0) return
  handleLivePointerMove(evt.touches[0])
}

const handleLivePointerUp = (evt) => {
  if (!isDragging.value) return
  isDragging.value = false

  // Detect which right card the cursor or finger was released on
  const touch = evt.changedTouches ? evt.changedTouches[0] : evt
  if (touch) {
    const elUnder = document.elementFromPoint(touch.clientX, touch.clientY)
    if (elUnder) {
      for (const rightItem of rightItems.value) {
        const rEl = rightCardRefs.value[rightItem]
        if (rEl && (rEl === elUnder || rEl.contains(elUnder))) {
          if (dragStartLeft.value) {
            playPop()
            emit('pair', dragStartLeft.value, rightItem)
            selectedLeft.value = null
            dragStartLeft.value = null
            return
          }
        }
      }
    }
  }
}

const selectRight = (rightItem) => {
  if (props.isChecked) return
  if (selectedLeft.value) {
    playPop()
    emit('pair', selectedLeft.value, rightItem)
    selectedLeft.value = null
    dragStartLeft.value = null
  }
}

const handleReset = () => {
  selectedLeft.value = null
  isDragging.value = false
  dragStartLeft.value = null
  playPop()
  emit('reset')
}

// Styling Helpers
const getPairColorForLeft = (left) => {
  if (!props.matchingSelections || !props.matchingSelections[left]) return null
  const pairedKeys = Object.keys(props.matchingSelections)
  const index = pairedKeys.indexOf(left)
  if (index === -1) return null
  return PAIR_COLORS[index % PAIR_COLORS.length]
}

const getPairColorForRight = (right) => {
  if (!props.matchingSelections) return null
  const matchedLeft = Object.keys(props.matchingSelections).find(
    k => props.matchingSelections[k] === right
  )
  if (!matchedLeft) return null
  return getPairColorForLeft(matchedLeft)
}

const getLeftCardClass = (left) => {
  if (props.isChecked) {
    return props.isCorrect
      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300'
      : 'bg-rose-50 border-rose-400 text-rose-950 shadow-md'
  }

  const pairColor = getPairColorForLeft(left)
  if (pairColor) {
    return `${pairColor.bg} ${pairColor.border} ${pairColor.text} shadow-md scale-[1.01]`
  }

  if (selectedLeft.value === left) {
    return 'bg-blue-50 border-duo-blue text-blue-900 shadow-md scale-[1.03] ring-4 ring-blue-300/60'
  }

  return 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-slate-50'
}

const getRightCardClass = (right) => {
  if (props.isChecked) {
    return props.isCorrect
      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300'
      : 'bg-rose-50 border-rose-400 text-rose-950 shadow-md'
  }

  const pairColor = getPairColorForRight(right)
  if (pairColor) {
    return `${pairColor.bg} ${pairColor.border} ${pairColor.text} shadow-md scale-[1.01]`
  }

  if (selectedLeft.value) {
    return 'bg-white border-blue-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50/40 hover:scale-102 animate-pulse'
  }

  return 'bg-white border-slate-200 text-slate-700 opacity-90'
}

const getLeftSocketClass = (left) => {
  const pair = getPairColorForLeft(left)
  if (pair) return `border-white shadow-xs`
  if (selectedLeft.value === left) return 'border-duo-blue bg-blue-50'
  return 'border-slate-300 bg-slate-50'
}

const getRightSocketClass = (right) => {
  const pair = getPairColorForRight(right)
  if (pair) return `border-white shadow-xs`
  return 'border-slate-300 bg-slate-50'
}
</script>
