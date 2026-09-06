<template>
  <div class="space-y-5 sm:space-y-6 select-none max-w-lg mx-auto w-full">
    <!-- Header with Question Text and Audio Player Button -->
    <div class="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-duo-gray-100 shadow-xs">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Type Badge -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-900 border-2 border-rose-300 rounded-2xl font-heading font-black text-xs shrink-0 shadow-2xs">
        <span>🔎 Yang Beda</span>
      </div>
    </div>

    <!-- 2x2 Options Grid -->
    <div class="grid grid-cols-2 gap-3.5 sm:gap-4">
      <button
        v-for="(option, idx) in exercise.options"
        :key="idx"
        @click="selectOption(option)"
        type="button"
        :disabled="isChecked"
        class="relative rounded-3xl border-3 p-3 sm:p-4 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-2.5 shadow-sm active:scale-95 group overflow-hidden bg-white"
        :class="getCardClass(option)"
      >
        <!-- Visual Container (Consistent Themed Pastel Stage) -->
        <div 
          class="w-full aspect-square rounded-2xl border-2 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-102"
          :class="getStageBg(idx)"
        >
          <!-- 1. Real Photo if ALL options have complete photos and no emoji conflict -->
          <img 
            v-if="shouldShowPhoto(option)" 
            :src="getObjectImageUrl(option)" 
            :alt="option" 
            class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" 
          />

          <!-- 2. Clean Large Emoji (Consistent, high-clarity kid-friendly visual) -->
          <span 
            v-else 
            class="text-6xl sm:text-7xl select-none filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          >
            {{ getEmoji(option) }}
          </span>

          <!-- Selected Check Badge in Top-Right Corner -->
          <transition name="pop">
            <div 
              v-if="selectedOption === option"
              class="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md border-2 border-white animate-pop"
            >
              ✓
            </div>
          </transition>
        </div>

        <!-- Clean Option Label -->
        <span class="font-heading font-black text-sm sm:text-base text-slate-800 tracking-wide text-center">
          {{ getLabel(option) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getObjectImageUrl } from '~/composables/useObjectImages'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const EMOJI_DICT = {
  kucing: '🐱',
  cat: '🐱',
  anjing: '🐶',
  dog: '🐶',
  mobil: '🚗',
  car: '🚗',
  kelinci: '🐰',
  rabbit: '🐰',
  gajah: '🐘',
  singa: '🦁',
  burung: '🐦',
  bebek: '🦆',
  ayam: '🐔',
  sapi: '🐄',
  ikan: '🐟',
  apel: '🍎',
  pisang: '🍌',
  jeruk: '🍊',
  semangka: '🍉',
  stroberi: '🍓'
}

// Extract only the emoji character
const getEmoji = (option) => {
  if (!option) return '❓'
  const str = String(option)
  const match = str.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu)
  if (match && match.length > 0) return match[0]
  const lower = str.toLowerCase()
  for (const [key, em] of Object.entries(EMOJI_DICT)) {
    if (lower.includes(key)) return em
  }
  return '⭐'
}

// Clean label without duplicating emoji
const getLabel = (option) => {
  if (!option) return ''
  const str = String(option)
  // Clean off emoji
  const cleaned = str.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim()
  return cleaned || str
}

// Check if ALL options in this exercise have photos available
// If even one option lacks a photo, use consistent emojis for all 4 to avoid jarring mixed layouts
const allOptionsHavePhotos = computed(() => {
  const opts = props.exercise?.options || []
  if (opts.length === 0) return false
  return opts.every(opt => !!getObjectImageUrl(opt))
})

const shouldShowPhoto = (option) => {
  return allOptionsHavePhotos.value && !!getObjectImageUrl(option)
}

// Stage pastel background colors
const getStageBg = (idx) => {
  const backgrounds = [
    'bg-amber-50/80 border-amber-200',
    'bg-sky-50/80 border-sky-200',
    'bg-rose-50/80 border-rose-200',
    'bg-emerald-50/80 border-emerald-200'
  ]
  return backgrounds[idx % backgrounds.length]
}

const selectOption = (opt) => {
  if (props.isChecked) return
  playPop()
  emit('select', opt)
}

const getCardClass = (option) => {
  const isSelected = props.selectedOption === option

  if (props.isChecked) {
    if (isSelected) {
      return props.isCorrect
        ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300 scale-102 shadow-lg'
        : 'bg-rose-50 border-rose-500 ring-4 ring-rose-300'
    }
    if (option === props.exercise?.correct_answer) {
      return 'bg-emerald-50 border-emerald-400 opacity-90'
    }
    return 'border-slate-200 opacity-50'
  }

  if (isSelected) {
    return 'bg-amber-50 border-amber-400 ring-4 ring-amber-300 scale-102 shadow-lg'
  }

  return 'border-slate-200 hover:border-duo-blue hover:scale-102'
}
</script>
