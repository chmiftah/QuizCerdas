<template>
  <div class="space-y-6">
    <!-- Question Text with Audio Player Button -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Big Chunky 3D Benar / Salah Buttons -->
    <div class="grid grid-cols-2 gap-4 sm:gap-6 pt-4 max-w-md mx-auto">
      <!-- Benar Button -->
      <button 
        @click="handleSelect('Benar')"
        :disabled="isChecked"
        class="p-6 rounded-3xl border-2 border-b-8 flex flex-col items-center justify-center gap-3 transition-all duration-150 cursor-pointer select-none group active:translate-y-1 active:border-b-2"
        :class="getTrueClass()"
      >
        <div class="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-xs">
          <CheckCircle2 class="w-11 h-11 stroke-[3]" />
        </div>
        <span class="font-heading text-xl sm:text-2xl font-black">BENAR</span>
      </button>

      <!-- Salah Button -->
      <button 
        @click="handleSelect('Salah')"
        :disabled="isChecked"
        class="p-6 rounded-3xl border-2 border-b-8 flex flex-col items-center justify-center gap-3 transition-all duration-150 cursor-pointer select-none group active:translate-y-1 active:border-b-2"
        :class="getFalseClass()"
      >
        <div class="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform shadow-xs">
          <XCircle class="w-11 h-11 stroke-[3]" />
        </div>
        <span class="font-heading text-xl sm:text-2xl font-black">SALAH</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const handleSelect = (val) => {
  if (props.isChecked) return
  playPop()
  emit('select', val)
}

const getTrueClass = () => {
  if (props.isChecked) {
    if (props.exercise.correct_answer === 'Benar') {
      return 'bg-emerald-100 border-emerald-500 border-b-emerald-700 text-emerald-900 shadow-emerald-500/20 animate-jelly'
    }
    if (props.selectedOption === 'Benar' && !props.isCorrect) {
      return 'bg-rose-100 border-rose-500 border-b-rose-700 text-rose-900 shadow-rose-500/20 animate-shake'
    }
    return 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-40 cursor-not-allowed'
  }

  if (props.selectedOption === 'Benar') {
    return 'bg-emerald-50 border-emerald-500 border-b-emerald-600 text-emerald-900 shadow-lg scale-[1.03]'
  }

  return 'bg-white border-slate-200 border-b-slate-300 shadow-sm hover:border-emerald-400 hover:bg-emerald-50/40'
}

const getFalseClass = () => {
  if (props.isChecked) {
    if (props.exercise.correct_answer === 'Salah') {
      return 'bg-emerald-100 border-emerald-500 border-b-emerald-700 text-emerald-900 shadow-emerald-500/20 animate-jelly'
    }
    if (props.selectedOption === 'Salah' && !props.isCorrect) {
      return 'bg-rose-100 border-rose-500 border-b-rose-700 text-rose-900 shadow-rose-500/20 animate-shake'
    }
    return 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-40 cursor-not-allowed'
  }

  if (props.selectedOption === 'Salah') {
    return 'bg-rose-50 border-rose-500 border-b-rose-600 text-rose-900 shadow-lg scale-[1.03]'
  }

  return 'bg-white border-slate-200 border-b-slate-300 shadow-sm hover:border-rose-400 hover:bg-rose-50/40'
}
</script>
