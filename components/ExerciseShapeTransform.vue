<template>
  <div class="space-y-6 select-none">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Original Shape -->
    <div class="flex justify-center mb-4">
      <div class="text-6xl sm:text-8xl">{{ originalShape }}</div>
    </div>

    <!-- Transformation Info -->
    <p class="text-center text-sm font-heading font-semibold text-slate-600">
      {{ transformationType }}: {{ transformationDegree }}°
    </p>

    <!-- Answer Options -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
      <button
        v-for="(opt, idx) in exercise.options"
        :key="idx"
        @click="selectOption(opt)"
        type="button"
        class="p-6 rounded-2xl border-4 font-heading font-black flex flex-col items-center gap-2 transition-all cursor-pointer shadow-md"
        :class="[
          selectedOption === opt 
            ? 'bg-duo-green text-white border-duo-green-dark scale-105 shadow-lg' 
            : 'bg-white text-slate-800 border-slate-200 hover:border-duo-green'
        ]"
      >
        <div 
          class="text-5xl sm:text-6xl"
          :style="selectedOption === opt && !isChecked ? getTransformStyle(idx) : {}"
        >
          {{ opt }}
        </div>
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

const originalShape = computed(() => {
  return props.exercise.visual?.shape || '◻️'
})

const transformationType = computed(() => {
  return props.exercise.visual?.transform || 'Rotasi'
})

const transformationDegree = computed(() => {
  return props.exercise.visual?.degree || 90
})

const getTransformStyle = (idx) => {
  if (idx === 0) return { transform: `rotate(0deg)` }
  if (idx === 1) return { transform: `rotate(90deg)` }
  if (idx === 2) return { transform: `rotate(180deg)` }
  if (idx === 3) return { transform: `rotate(270deg)` }
  return {}
}

const selectOption = (opt) => {
  if (props.isChecked) return
  emit('select', opt)
}
</script>