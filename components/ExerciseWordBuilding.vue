<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Letter Tiles -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <div
        v-for="(letter, idx) in targetWord"
        :key="idx"
        class="w-12 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 border-b-4 border-slate-300 flex items-center justify-center font-heading text-2xl sm:text-3xl font-black text-slate-400"
      >
        {{ letter }}
      </div>
    </div>

    <!-- Letter Palette -->
    <div class="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
      <button
        v-for="(letter, idx) in shuffledLetters"
        :key="idx"
        @click="pickLetter(letter, idx)"
        type="button"
        class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-md font-heading text-2xl font-black text-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': usedIndices.has(idx) }"
        :disabled="usedIndices.has(idx) || isChecked"
      >
        {{ letter }}
      </button>
    </div>

    <!-- Reset Button -->
    <div class="flex justify-center pt-2">
      <button 
        @click="resetLetters" 
        class="px-4 py-2 text-xs font-heading font-bold text-slate-400 hover:text-rose-600 transition-colors"
      >
        🔄 Hapus Semua Huruf
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const targetWord = ref([])
const usedIndices = ref(new Set())
const shuffledLetters = ref([])

const init = () => {
  const ex = props.exercise
  const word = ex.correct_answer.toUpperCase()
  targetWord.value = Array(word.length).fill('')
  
  // Create palette
  const letters = word.split('')
  // Add some distractors if needed
  const distractors = ['A', 'E', 'I', 'U', 'O', 'S', 'T']
  while(letters.length < word.length + 3) {
    letters.push(distractors[Math.floor(Math.random() * distractors.length)])
  }
  shuffledLetters.value = letters.sort(() => Math.random() - 0.5)
  usedIndices.value = new Set()
  emit('select', '')
}

const pickLetter = (letter, idx) => {
  if (props.isChecked || usedIndices.value.has(idx)) return
  playPop()
  
  const firstEmpty = targetWord.value.findIndex(l => l === '')
  if (firstEmpty !== -1) {
    targetWord.value[firstEmpty] = letter
    usedIndices.value.add(idx)
    emit('select', targetWord.value.join(''))
  }
}

const resetLetters = () => {
  init()
}

watch(() => props.exercise, init, { immediate: true })
</script>