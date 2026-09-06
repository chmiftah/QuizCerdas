<template>
  <div class="space-y-6 select-none">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Visual Display Area -->
    <div class="p-6 bg-emerald-50 rounded-3xl border-3 border-emerald-200 max-w-lg mx-auto shadow-md">
      <div class="flex flex-wrap justify-center gap-4">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-3xl sm:text-4xl"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <p class="text-center text-sm font-heading font-semibold text-slate-500">
      Hitung jumlah objek di atas, lalu pilih jawaban yang tepat! 👇
    </p>

    <!-- Answer Options -->
    <div class="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-lg mx-auto">
      <button
        v-for="opt in exercise.options"
        :key="opt"
        @click="selectOption(opt)"
        type="button"
        class="aspect-square rounded-2xl border-4 font-heading font-black text-3xl flex items-center justify-center transition-all cursor-pointer shadow-md"
        :class="[
          selectedOption === opt 
            ? 'bg-duo-green text-white border-duo-green-dark scale-105 shadow-lg ring-4 ring-duo-green/20' 
            : 'bg-white text-slate-800 border-slate-200 hover:border-duo-green'
        ]"
      >
        {{ opt }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const items = computed(() => {
  const count = parseInt(props.exercise.correct_answer) || 5
  const icon = props.exercise.visual?.label || '🍎'
  return Array(count).fill(icon)
})

const selectOption = (opt) => {
  if (props.isChecked) return
  emit('select', opt)
}
</script>