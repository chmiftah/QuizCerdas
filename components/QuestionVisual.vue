<template>
  <div v-if="hasVisual" class="my-2 sm:my-4 animate-pop select-none">
    <!-- 1. Dynamic Book Illustration Card -->
    <div 
      v-if="visualData" 
      class="max-w-md mx-auto rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-duo-gray-100 bg-gradient-to-b from-slate-50 to-amber-50/50 p-2.5 sm:p-5 shadow-md relative overflow-hidden"
    >
      <!-- Clean Top Header Bar (No overlapping) -->
      <div class="flex flex-wrap items-center justify-between gap-1.5 mb-2 sm:mb-3">
        <div v-if="visualData.type === 'objects'" class="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-100 text-emerald-800 font-heading text-[11px] sm:text-xs font-extrabold border border-emerald-300 shadow-2xs">
          <span>👆 Tekan objek untuk menghitung:</span>
        </div>
        <div v-else-if="visualData.type === 'ten_frame'" class="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 text-amber-900 font-heading text-[11px] sm:text-xs font-extrabold border border-amber-300 shadow-2xs">
          <span>🎯 Bingkai Sepuluh ({{ visualData.filled }}/10)</span>
        </div>
        <div v-else-if="visualData.type === 'sequence'" class="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-indigo-100 text-indigo-800 font-heading text-[11px] sm:text-xs font-extrabold border border-indigo-300 shadow-2xs">
          <span>🔢 Urutan Angka:</span>
        </div>
        <div v-else></div>

        <!-- Book Illustration Corner Tag -->
        <span class="bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-duo-gray-200 text-[9px] sm:text-[10px] font-heading font-extrabold text-slate-500 uppercase tracking-wider shrink-0 shadow-2xs">
          📖 ILUSTRASI SOAL
        </span>
      </div>

      <!-- A. Ten Frame Visual -->
      <div v-if="visualData.type === 'ten_frame'" class="space-y-3 pt-1">
        <div class="grid grid-cols-5 gap-2.5 bg-amber-100/80 p-3.5 rounded-2xl border-3 border-amber-300 shadow-inner max-w-xs mx-auto">
          <div 
            v-for="idx in 10" 
            :key="idx"
            class="aspect-square rounded-xl border-2 flex items-center justify-center transition-all duration-200"
            :class="idx <= visualData.filled ? 'bg-duo-yellow border-amber-500 shadow-md scale-95' : 'bg-white/80 border-amber-200'"
          >
            <div 
              v-if="idx <= visualData.filled" 
              class="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-black animate-pulse"
            >
              ★
            </div>
            <span v-else class="text-[10px] font-heading font-bold text-amber-300 opacity-60">
              {{ idx }}
            </span>
          </div>
        </div>
      </div>

      <!-- B. Interactive Object Counting Visual (Apples, Stars, Balloons, Animals, Fruits, etc.) -->
      <div v-else-if="visualData.type === 'objects'" class="space-y-3 pt-1 text-center">
        <div class="flex flex-wrap justify-center items-center gap-3 p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm max-w-md mx-auto min-h-[120px]">
          <div 
            v-for="(item, idx) in visualData.items" 
            :key="idx"
            @click="tapObject(idx)"
            class="relative rounded-2xl bg-slate-50 border-2 transition-all duration-200 flex items-center justify-center overflow-hidden shadow-sm cursor-pointer active:scale-90 group select-none"
            :class="[
              tappedIndices.has(idx) 
                ? 'bg-amber-100 border-amber-400 scale-105 shadow-md ring-4 ring-amber-300/50' 
                : 'border-slate-200 hover:border-emerald-400 hover:scale-105 hover:bg-emerald-50/50',
              getItemCardSize(visualData.items.length)
            ]"
            :style="{ animationDelay: `${idx * 60}ms` }"
          >
            <img 
              v-if="getObjectImageUrl(item)" 
              :src="getObjectImageUrl(item)" 
              :alt="item" 
              @error="(e) => (e.target.style.display = 'none')"
              class="w-full h-full object-cover transition-transform group-hover:scale-110" 
            />
            <span v-else class="flex items-center justify-center w-full h-full" :class="getItemTextSize(visualData.items.length)">
              {{ item }}
            </span>

            <!-- Number Order Badge on Tapped -->
            <span 
              v-if="tappedOrderMap.has(idx)" 
              class="absolute -top-1 -right-1 z-10 w-7 h-7 rounded-full bg-amber-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md animate-bounce border-2 border-white"
            >
              {{ tappedOrderMap.get(idx) }}
            </span>
          </div>
        </div>
      </div>

      <!-- C. Number Line Sequence Visual -->
      <div v-else-if="visualData.type === 'sequence'" class="space-y-3 pt-1 text-center">
        <div class="flex items-center justify-center gap-2 py-3 px-2 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm max-w-md mx-auto overflow-x-auto">
          <div 
            v-for="(num, idx) in visualData.sequence" 
            :key="idx"
            class="w-10 h-12 sm:w-12 sm:h-14 rounded-2xl flex items-center justify-center font-heading font-extrabold text-lg sm:text-xl border-2 transition-all duration-150"
            :class="num === '?' || num === '__' || num === null
              ? 'bg-amber-100 border-amber-400 text-amber-700 animate-pulse scale-105 border-dashed border-3' 
              : 'bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'"
          >
            {{ num === null ? '?' : num }}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Explicit Custom Image URL / Path (Pexels / Local Image) -->
    <div v-else-if="exercise.image" class="max-w-md mx-auto rounded-3xl border-4 border-duo-gray-100 bg-white p-3 shadow-md relative overflow-hidden group hover:shadow-xl transition-all">
      <div class="relative rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center h-52 sm:h-64 w-full">
        <img 
          :src="exercise.image" 
          :alt="exercise.question" 
          @error="(e) => (e.target.style.display = 'none')"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <span class="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-heading font-extrabold tracking-wider border border-white/30 shadow-sm">
          📸 FOTO PEXELS
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true }
})

const { playPop } = useSoundEffects()

const tappedIndices = ref(new Set())
const tappedOrderMap = ref(new Map())
let currentCount = 0

// Reset tapped state on exercise change
watch(() => props.exercise, () => {
  tappedIndices.value.clear()
  tappedOrderMap.value.clear()
  currentCount = 0
}, { immediate: true })

const tapObject = (idx) => {
  playPop()

  if (!tappedIndices.value.has(idx)) {
    currentCount++
    tappedIndices.value.add(idx)
    tappedOrderMap.value.set(idx, currentCount)
  }

  const spokenNumber = tappedOrderMap.value.get(idx) || (idx + 1)
  speakWord(`${spokenNumber}!`)
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.1
    window.speechSynthesis.speak(utterance)
  }
}

// Auto-detect or parse visual illustration structure
const visualData = computed(() => {
  const ex = props.exercise
  if (!ex) return null

  // 1. Explicit visual object defined on exercise JSON
  if (ex.visual) {
    const v = ex.visual
    if (v.type === 'objects') {
      let items = v.items
      if (!items || items.length === 0) {
        const count = v.count || parseInt(ex.correct_answer) || 1
        const label = v.label || '🍎'
        items = Array(count).fill(label)
      }
      return {
        type: 'objects',
        items: items
      }
    }
    // Replace hand/finger visual with distinct fruit/object counting items
    if (v.type === 'hand' || v.type === 'fingers') {
      const val = v.value || v.count || parseInt(ex.correct_answer) || 1
      const fruitIcons = ['🍎', '🍊', '🍓', '🎈', '⭐', '🐥']
      const chosenIcon = v.label || fruitIcons[(val - 1) % fruitIcons.length]
      return { 
        type: 'objects', 
        items: Array(val).fill(chosenIcon) 
      }
    }
    if (v.type === 'ten_frame') {
      const filled = v.filled ?? v.value ?? parseInt(ex.correct_answer) ?? 5
      return { 
        type: 'ten_frame', 
        filled: Math.min(Math.max(filled, 0), 10) 
      }
    }
    if (v.type === 'sequence') {
      return { 
        type: 'sequence', 
        sequence: v.sequence || [1, 2, null, 4, 5] 
      }
    }
  }

  // 2. Automatic fallback deduction based on Question & Options
  // Skip automatic object-counting fallback for exercise types that already render their own components (sequence, matching, fill_in_blank without count)
  if (ex.type === 'sequence_ordering' || ex.type === 'matching' || ex.type === 'fill_in_blank') {
    return null
  }

  const q = (ex.question || '').toLowerCase()
  const targetCount = parseInt(ex.correct_answer) || 1

  if (q.includes('ten frame') || q.includes('bingkai sepuluh')) {
    return { type: 'ten_frame', filled: Math.min(Math.max(targetCount, 0), 10) }
  }

  if (q.includes('jari') || q.includes('jempol') || q.includes('tangan')) {
    return { type: 'objects', items: Array(targetCount).fill('🍎') }
  }

  if (q.includes('apel')) {
    return { type: 'objects', items: Array(targetCount).fill('🍎') }
  }
  if (q.includes('balon')) {
    return { type: 'objects', items: Array(targetCount).fill('🎈') }
  }
  if (q.includes('burung')) {
    return { type: 'objects', items: Array(targetCount).fill('🐦') }
  }
  if (q.includes('kucing')) {
    return { type: 'objects', items: Array(targetCount).fill('🐱') }
  }
  if (q.includes('bintang')) {
    return { type: 'objects', items: Array(targetCount).fill('⭐') }
  }
  if (q.includes('bola')) {
    return { type: 'objects', items: Array(targetCount).fill('⚽') }
  }
  if (q.includes('ikan')) {
    return { type: 'objects', items: Array(targetCount).fill('🐟') }
  }
  if (q.includes('pisang') || q.includes('buah')) {
    return { type: 'objects', items: Array(targetCount).fill('🍌') }
  }

  // Check if there are emojis in question or options for counting exercises
  if (ex.type === 'multiple_choice' || ex.type === 'true_false') {
    const objectEmojiMatches = (ex.question + ' ' + (ex.options || []).join(' ')).match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/gu)
    if (objectEmojiMatches && objectEmojiMatches.length > 0) {
      return {
        type: 'objects',
        items: objectEmojiMatches
      }
    }
  }

  return null
})

const hasVisual = computed(() => {
  return !!(props.exercise?.image || visualData.value)
})

const getItemCardSize = (count) => {
  if (count === 1) return 'w-28 h-28 sm:w-36 sm:h-36'
  if (count === 2) return 'w-20 h-20 sm:w-24 sm:h-24'
  if (count === 3) return 'w-16 h-16 sm:w-20 sm:h-20'
  if (count <= 6) return 'w-14 h-14 sm:w-16 sm:h-16'
  return 'w-11 h-11 sm:w-13 sm:h-13'
}

const getItemTextSize = (count) => {
  if (count === 1) return 'text-5xl sm:text-6xl'
  if (count === 2) return 'text-4xl sm:text-5xl'
  if (count === 3) return 'text-3xl sm:text-4xl'
  if (count <= 6) return 'text-2xl sm:text-3xl'
  return 'text-xl sm:text-2xl'
}
</script>
