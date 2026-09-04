<template>
  <div class="space-y-6 select-none max-w-lg mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- 2x2 Options Grid -->
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(option, idx) in exercise.options"
        :key="idx"
        @click="selectOption(option)"
        type="button"
        :disabled="isChecked"
        class="relative rounded-3xl border-3 p-3.5 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-3 shadow-md active:scale-95 group overflow-hidden bg-white"
        :class="[
          selectedOption === option
            ? isChecked
              ? isCorrect
                ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                : 'bg-rose-50 border-rose-500 ring-4 ring-rose-300'
              : 'bg-amber-50 border-amber-400 ring-4 ring-amber-300 scale-102 shadow-lg'
            : 'border-slate-200 hover:border-emerald-400 hover:scale-102'
        ]"
      >
        <!-- Pexels Photo Container -->
        <div class="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative">
          <img 
            v-if="getObjectImageUrl(option)" 
            :src="getObjectImageUrl(option)" 
            :alt="option" 
            @error="(e) => (e.target.style.display = 'none')"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <span v-else class="text-5xl flex items-center justify-center">
            {{ option }}
          </span>

          <!-- Selected Check Badge -->
          <span 
            v-if="selectedOption === option"
            class="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md border-2 border-white animate-pop"
          >
            ✓
          </span>
        </div>

        <!-- Option Label -->
        <span class="font-heading font-extrabold text-base sm:text-lg text-slate-800 tracking-wide text-center">
          {{ option }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const selectOption = (opt) => {
  if (props.isChecked) return
  emit('select', opt)
}
</script>
