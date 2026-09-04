<template>
  <div class="space-y-6 select-none">
    <!-- Question Header with Audio Player Button & Reset Button -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Reset All Pairs Button -->
      <button 
        v-if="hasSelections && !isChecked"
        @click="handleReset"
        type="button"
        class="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200 rounded-2xl font-heading font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
        title="Hapus semua pasangan yang sudah dipilih"
      >
        <RotateCcw class="w-4 h-4 text-rose-500" />
        <span>Reset Pasangan</span>
      </button>
    </div>

    <!-- Instruction Bar -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-2xs">
      <div class="flex items-center gap-2">
        <span class="text-lg">💡</span>
        <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">
          Ketuk item di <strong class="text-duo-blue font-extrabold">KIRI</strong> lalu ketuk pasangannya di <strong class="text-duo-green-dark font-extrabold">KANAN</strong>! Item berpasangan akan memiliki warna yang senada.
        </p>
      </div>
    </div>

    <!-- Two Column Matching Pairs Grid -->
    <div class="grid grid-cols-2 gap-4 sm:gap-8 pt-2">
      <!-- Left Column -->
      <div class="space-y-3">
        <h4 class="font-heading text-xs uppercase tracking-wider text-slate-400 font-black mb-2 flex items-center justify-between">
          <span>KIRI</span>
          <span v-if="selectedLeft" class="text-duo-blue text-[11px] animate-pulse font-extrabold">👈 Pilih pasangan di kanan</span>
        </h4>

        <button 
          v-for="(left, leftIdx) in leftItems" 
          :key="left"
          @click="selectLeft(left)"
          :disabled="isChecked"
          class="w-full p-4 rounded-2xl border-3 font-heading font-bold text-left transition-all duration-200 cursor-pointer relative shadow-sm hover:scale-102 active:scale-98"
          :class="getLeftCardClass(left, leftIdx)"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <img 
                v-if="getObjectImageUrl(left)" 
                :src="getObjectImageUrl(left)" 
                :alt="left" 
                class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl shadow-2xs border border-slate-200 shrink-0" 
              />
              <span class="text-base sm:text-lg font-black text-slate-800">{{ left }}</span>
            </div>

            <!-- Active Selection Indicator -->
            <span v-if="selectedLeft === left" class="w-3.5 h-3.5 rounded-full bg-duo-blue animate-ping"></span>

            <!-- Pair Checkmark Icon (Warna Senada, Tanpa Teks) -->
            <div v-else-if="getPairStyleForLeft(left)" class="flex items-center gap-1">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shadow-2xs" :class="getPairStyleForLeft(left).badgeBg">
                ✓
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- Right Column -->
      <div class="space-y-3">
        <h4 class="font-heading text-xs uppercase tracking-wider text-slate-400 font-black mb-2">
          KANAN
        </h4>

        <button 
          v-for="right in rightItems" 
          :key="right"
          @click="selectRight(right)"
          :disabled="isChecked || (!selectedLeft && !getPairStyleForRight(right))"
          class="w-full p-4 rounded-2xl border-3 font-heading font-bold text-left transition-all duration-200 cursor-pointer relative shadow-sm"
          :class="getRightCardClass(right)"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <img 
                v-if="getObjectImageUrl(right)" 
                :src="getObjectImageUrl(right)" 
                :alt="right" 
                class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl shadow-2xs border border-slate-200 shrink-0" 
              />
              <span class="text-base sm:text-lg font-black text-slate-800">{{ right }}</span>
            </div>

            <!-- Pair Checkmark Icon (Warna Senada, Tanpa Teks) -->
            <div v-if="getPairStyleForRight(right)" class="flex items-center gap-1">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shadow-2xs" :class="getPairStyleForRight(right).badgeBg">
                ✓
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  matchingSelections: { type: Object, default: () => ({}) },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['pair', 'reset', 'unpair'])

const selectedLeft = ref(null)
const leftItems = ref([])
const rightItems = ref([])

const hasSelections = computed(() => {
  return Object.keys(props.matchingSelections || {}).length > 0
})

const pairStyles = [
  { bg: 'bg-blue-100/90', border: 'border-blue-400', text: 'text-blue-950', badgeBg: 'bg-blue-500' },
  { bg: 'bg-emerald-100/90', border: 'border-emerald-400', text: 'text-emerald-950', badgeBg: 'bg-emerald-500' },
  { bg: 'bg-purple-100/90', border: 'border-purple-400', text: 'text-purple-950', badgeBg: 'bg-purple-500' },
  { bg: 'bg-rose-100/90', border: 'border-rose-400', text: 'text-rose-950', badgeBg: 'bg-rose-500' },
  { bg: 'bg-amber-100/90', border: 'border-amber-400', text: 'text-amber-950', badgeBg: 'bg-amber-500' }
]

watch(() => props.exercise, (newEx) => {
  selectedLeft.value = null
  if (newEx && newEx.options) {
    const parsedPairs = newEx.options.map(opt => opt.split('::'))
    const lefts = parsedPairs.map(p => p[0] ? p[0].trim() : '')
    const rights = parsedPairs.map(p => p[1] ? p[1].trim() : '').filter(r => r !== '')

    leftItems.value = lefts
    rightItems.value = [...rights].sort(() => Math.random() - 0.5)
  }
}, { immediate: true })

const selectLeft = (item) => {
  if (props.isChecked) return
  selectedLeft.value = item
}

const selectRight = (item) => {
  if (props.isChecked) return
  if (selectedLeft.value) {
    emit('pair', selectedLeft.value, item)
    selectedLeft.value = null
  }
}

const handleReset = () => {
  selectedLeft.value = null
  emit('reset')
}

const getPairStyleForLeft = (left) => {
  if (!props.matchingSelections || !props.matchingSelections[left]) return null
  const pairedKeys = Object.keys(props.matchingSelections)
  const index = pairedKeys.indexOf(left)
  if (index === -1) return null

  return pairStyles[index % pairStyles.length]
}

const getPairStyleForRight = (right) => {
  if (!props.matchingSelections) return null
  const matchedLeft = Object.keys(props.matchingSelections).find(
    k => props.matchingSelections[k] === right
  )
  if (!matchedLeft) return null
  return getPairStyleForLeft(matchedLeft)
}

const getLeftCardClass = (left) => {
  if (props.isChecked) {
    return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green'
  }

  const style = getPairStyleForLeft(left)
  if (style) {
    return `${style.bg} ${style.border} ${style.text} shadow-md`
  }

  if (selectedLeft.value === left) {
    return 'bg-duo-blue-lightBg border-duo-blue text-duo-blue-dark shadow-duo-blue scale-[1.02] ring-4 ring-duo-blue/30'
  }

  return 'bg-white border-duo-gray-100 shadow-duo-gray hover:border-duo-blue hover:bg-slate-50'
}

const getRightCardClass = (right) => {
  if (props.isChecked) {
    return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green'
  }

  const style = getPairStyleForRight(right)
  if (style) {
    return `${style.bg} ${style.border} ${style.text} shadow-md`
  }

  if (selectedLeft.value) {
    return 'bg-white border-duo-blue/60 shadow-duo-gray hover:border-duo-blue hover:bg-duo-blue-lightBg/30 animate-pulse hover:scale-102'
  }

  return 'bg-white border-duo-gray-100 shadow-duo-gray opacity-75'
}
</script>
