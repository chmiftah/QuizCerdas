<template>
  <div class="space-y-6">
    <!-- Question Text with Audio Player Button -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Big Benar / Salah Buttons -->
    <div class="grid grid-cols-2 gap-6 pt-4 max-w-lg mx-auto">
      <!-- Benar Button -->
      <button 
        @click="$emit('select', 'Benar')"
        :disabled="isChecked"
        class="p-6 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 transition-all duration-150 cursor-pointer select-none group"
        :class="getTrueClass()"
      >
        <div class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-duo-green group-hover:scale-110 transition-transform">
          <CheckCircle2 class="w-10 h-10 stroke-[2.5]" />
        </div>
        <span class="font-heading text-2xl font-bold">Benar</span>
      </button>

      <!-- Salah Button -->
      <button 
        @click="$emit('select', 'Salah')"
        :disabled="isChecked"
        class="p-6 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 transition-all duration-150 cursor-pointer select-none group"
        :class="getFalseClass()"
      >
        <div class="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-duo-red group-hover:scale-110 transition-transform">
          <XCircle class="w-10 h-10 stroke-[2.5]" />
        </div>
        <span class="font-heading text-2xl font-bold">Salah</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle2, XCircle } from 'lucide-vue-next'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

defineEmits(['select'])

const getTrueClass = () => {
  if (props.isChecked) {
    if (props.exercise.correct_answer === 'Benar') {
      return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green scale-[1.03]'
    }
    if (props.selectedOption === 'Benar' && !props.isCorrect) {
      return 'bg-rose-50 border-duo-red text-duo-red-dark shadow-duo-red'
    }
    return 'bg-white border-duo-gray-100 opacity-40 cursor-not-allowed'
  }

  if (props.selectedOption === 'Benar') {
    return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green scale-[1.03]'
  }

  return 'bg-white border-duo-gray-100 shadow-duo-gray hover:border-duo-green hover:bg-emerald-50/50'
}

const getFalseClass = () => {
  if (props.isChecked) {
    if (props.exercise.correct_answer === 'Salah') {
      return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green scale-[1.03]'
    }
    if (props.selectedOption === 'Salah' && !props.isCorrect) {
      return 'bg-rose-50 border-duo-red text-duo-red-dark shadow-duo-red'
    }
    return 'bg-white border-duo-gray-100 opacity-40 cursor-not-allowed'
  }

  if (props.selectedOption === 'Salah') {
    return 'bg-rose-50 border-duo-red text-duo-red-dark shadow-duo-red scale-[1.03]'
  }

  return 'bg-white border-duo-gray-100 shadow-duo-gray hover:border-duo-red hover:bg-rose-50/50'
}
</script>
