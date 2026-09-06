<template>
  <div class="space-y-5 sm:space-y-6 select-none max-w-lg mx-auto w-full">
    <!-- Question Header & Audio Player -->
    <div class="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-duo-gray-100 shadow-xs">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Shadow Match Badge -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-900 border-2 border-purple-300 rounded-2xl font-heading font-black text-xs shrink-0 shadow-2xs">
        <span>👥 Cocok Bayangan</span>
      </div>
    </div>

    <!-- 1. MODE A: Target is Silhouette, Options are Colorful Animals -->
    <template v-if="isTargetSilhouette">
      <!-- Shadow Stage / Spotlight -->
      <div class="max-w-xs sm:max-w-sm mx-auto p-4 bg-linear-to-b from-amber-50 to-amber-100/80 rounded-3xl border-4 border-amber-300 shadow-lg text-center relative overflow-hidden">
        <!-- Stage Light Glow Effect -->
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"></div>

        <div class="flex items-center justify-center gap-1.5 mb-2">
          <span class="px-3 py-1 bg-amber-400 text-amber-950 rounded-full font-heading font-black text-[11px] uppercase tracking-wider shadow-xs inline-flex items-center gap-1">
            <span>✨</span> Siluet Bayangan Misterius
          </span>
        </div>

        <!-- Silhouette Display Canvas / Container -->
        <div class="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl bg-white border-3 border-amber-200 shadow-inner flex flex-col items-center justify-center relative p-3">
          <span 
            class="text-7xl sm:text-8xl select-none filter brightness-0 drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
            :title="'Siluet ' + targetLabel"
          >
            {{ targetEmoji }}
          </span>

          <span class="absolute bottom-2 font-heading font-extrabold text-[11px] text-amber-700/80">
            Bayangan siapakah ini? 🤔
          </span>
        </div>
      </div>

      <!-- Options Instruction -->
      <div class="space-y-3">
        <p class="font-heading text-xs font-black uppercase text-slate-500 tracking-wider text-center">
          👇 Pilih hewan atau objek yang cocok dengan bayangannya:
        </p>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            v-for="(option, idx) in exercise.options"
            :key="idx"
            @click="selectOption(option)"
            type="button"
            :disabled="isChecked"
            class="relative rounded-3xl border-3 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2.5 shadow-sm active:scale-95 group text-left sm:text-center"
            :class="getOptionClasses(option)"
          >
            <!-- Colorful Emoji or Image -->
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-100 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <span class="text-4xl sm:text-4xl">
                {{ getEmoji(option) }}
              </span>
            </div>

            <!-- Option Text Label -->
            <div class="flex-1 sm:flex-initial">
              <span class="font-heading font-black text-sm sm:text-base text-slate-800 block">
                {{ getLabel(option) }}
              </span>
            </div>

            <!-- Selection / Checkmark Indicator -->
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 border-2"
              :class="localSelected === option ? 'bg-amber-500 text-white border-white shadow-xs' : 'border-slate-300 bg-white text-transparent'"
            >
              ✓
            </div>
          </button>
        </div>
      </div>
    </template>

    <!-- 2. MODE B: Target is Colorful Object, Options are Silhouette Choices -->
    <template v-else>
      <!-- Target Colored Object -->
      <div class="max-w-xs sm:max-w-sm mx-auto p-4 bg-emerald-50 rounded-3xl border-4 border-emerald-300 shadow-lg text-center">
        <span class="px-3 py-1 bg-emerald-500 text-white rounded-full font-heading font-black text-[11px] uppercase tracking-wider shadow-xs inline-block mb-2">
          🔍 Objek Asli
        </span>

        <div class="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl bg-white border-3 border-emerald-200 shadow-inner flex flex-col items-center justify-center p-3">
          <span class="text-7xl sm:text-8xl select-none">
            {{ targetEmoji }}
          </span>
          <span class="font-heading font-black text-sm text-emerald-950 mt-1">
            {{ targetLabel }}
          </span>
        </div>
      </div>

      <!-- Silhouette Choice Options Grid -->
      <div class="space-y-3">
        <p class="font-heading text-xs font-black uppercase text-slate-500 tracking-wider text-center">
          👇 Pilih bayangan siluet yang cocok untuk {{ targetLabel }}:
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            v-for="(option, idx) in exercise.options"
            :key="idx"
            @click="selectOption(option)"
            type="button"
            :disabled="isChecked"
            class="relative rounded-3xl border-3 p-4 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 group"
            :class="getOptionClasses(option)"
          >
            <!-- Silhouette Spotlight -->
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-50 border-2 border-amber-200 shadow-inner flex items-center justify-center">
              <span class="text-5xl select-none filter brightness-0 drop-shadow-md group-hover:scale-110 transition-transform">
                {{ getEmoji(option) }}
              </span>
            </div>

            <span class="font-heading font-bold text-xs text-slate-600">
              {{ getLabel(option) }}
            </span>

            <!-- Checkmark Indicator -->
            <span 
              v-if="localSelected === option"
              class="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md border-2 border-white animate-pop"
            >
              ✓
            </span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const localSelected = ref(props.selectedOption)
const { playPop } = useSoundEffects()

watch(() => props.selectedOption, (newVal) => {
  localSelected.value = newVal
})

const EMOJI_DICT = {
  kucing: '🐱',
  cat: '🐱',
  gajah: '🐘',
  elephant: '🐘',
  burung: '🐦',
  bird: '🐦',
  kelinci: '🐰',
  rabbit: '🐰',
  bebek: '🦆',
  duck: '🦆',
  ayam: '🐔',
  chicken: '🐔',
  anjing: '🐶',
  dog: '🐶',
  singa: '🦁',
  lion: '🦁',
  sapi: '🐄',
  cow: '🐄',
  ikan: '🐟',
  fish: '🐟',
  kepik: '🐞',
  semut: '🐜',
  kupu: '🦋',
  lebah: '🐝',
  zebra: '🦓',
  jerapah: '🦒',
  apel: '🍎',
  pisang: '🍌',
  jeruk: '🍊',
  semangka: '🍉',
  stroberi: '🍓',
  bintang: '⭐',
  mobil: '🚗'
}

function getEmoji(item) {
  if (!item) return '🐾'
  const str = String(item)
  const match = str.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu)
  if (match && match.length > 0) return match[0]
  const lower = str.toLowerCase()
  for (const [key, em] of Object.entries(EMOJI_DICT)) {
    if (lower.includes(key)) return em
  }
  return '🐾'
}

function getLabel(item) {
  if (!item) return ''
  const str = String(item)
  const cleaned = str.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim()
  if (cleaned) return cleaned
  const em = getEmoji(str)
  for (const [name, e] of Object.entries(EMOJI_DICT)) {
    if (e === em) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }
  return str
}

// Determine if the target card is the shadow (Mode A) or the object (Mode B)
const isTargetSilhouette = computed(() => {
  const q = (props.exercise?.question || '').toLowerCase()
  if (q.includes('manakah bayangan') || q.includes('pilih bayangan yang cocok')) {
    return false
  }
  return true
})

const targetRaw = computed(() => {
  if (props.exercise?.visual?.target) return props.exercise.visual.target
  if (props.exercise?.target) return props.exercise.target
  return props.exercise?.correct_answer || 'Kucing 🐱'
})

const targetEmoji = computed(() => {
  return getEmoji(targetRaw.value)
})

const targetLabel = computed(() => {
  return getLabel(targetRaw.value) || getLabel(props.exercise?.correct_answer) || 'Kucing'
})

const selectOption = (option) => {
  if (props.isChecked) return
  localSelected.value = option
  playPop()
  emit('select', option)
}

const getOptionClasses = (option) => {
  const isSel = localSelected.value === option

  if (props.isChecked) {
    if (isSel) {
      return props.isCorrect
        ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
        : 'bg-rose-50 border-rose-500 ring-4 ring-rose-300'
    }
    // Highlight correct answer if checked
    if (option === props.exercise?.correct_answer) {
      return 'bg-emerald-50 border-emerald-400 opacity-90'
    }
    return 'bg-white border-slate-200 opacity-50'
  }

  if (isSel) {
    return 'bg-amber-50 border-amber-400 ring-4 ring-amber-200 scale-102 shadow-md'
  }

  return 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
}
</script>
