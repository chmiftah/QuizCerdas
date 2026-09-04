<template>
  <div class="space-y-6 select-none max-w-lg mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Main Target Object Card (Colored Photo) -->
    <div class="max-w-xs mx-auto p-3 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border-4 border-amber-300 shadow-md text-center">
      <span class="text-xs font-heading font-black text-amber-800 uppercase tracking-wider block mb-1">
        🔍 OBJEK TARGET
      </span>
      <div class="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden bg-white border-2 border-amber-200 shadow-inner flex items-center justify-center">
        <img 
          v-if="getObjectImageUrl(targetName)" 
          :src="getObjectImageUrl(targetName)" 
          :alt="targetName" 
          class="w-full h-full object-cover animate-pop" 
        />
        <span v-else class="text-6xl flex items-center justify-center">
          {{ targetName }}
        </span>
      </div>
      <span class="font-heading font-black text-sm text-amber-900 mt-2 block">
        {{ targetName }}
      </span>
    </div>

    <!-- Silhouette Choice Options (Shadow Matching Grid) -->
    <div class="space-y-2">
      <span class="font-heading text-xs font-black uppercase text-slate-400 tracking-wider block text-center">
        Pilih bayangan yang bentuknya paling cocok:
      </span>

      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <button
          v-for="(option, idx) in exercise.options"
          :key="idx"
          @click="selectOption(option)"
          type="button"
          :disabled="isChecked"
          class="relative rounded-3xl border-3 p-3 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 group overflow-hidden bg-slate-900"
          :class="[
            selectedOption === option
              ? isChecked
                ? isCorrect
                  ? 'bg-emerald-950 border-emerald-500 ring-4 ring-emerald-300'
                  : 'bg-rose-950 border-rose-500 ring-4 ring-rose-300'
                : 'bg-amber-950 border-amber-400 ring-4 ring-amber-300 scale-105 shadow-lg'
              : 'border-slate-700 hover:border-emerald-400 hover:scale-102'
          ]"
        >
          <!-- Shadow / Silhouette Image Container (Pure Black Contrast) -->
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex items-center justify-center relative p-1">
            <img 
              v-if="getObjectImageUrl(option)" 
              :src="getObjectImageUrl(option)" 
              :alt="option" 
              class="w-full h-full object-cover filter brightness-0 contrast-200 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
            />
            <span v-else class="text-5xl flex items-center justify-center filter brightness-0 contrast-200">
              {{ option }}
            </span>

            <!-- Selection Checkmark -->
            <span 
              v-if="selectedOption === option"
              class="absolute top-1 right-1 w-6 h-6 rounded-full bg-amber-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md border-2 border-white animate-pop"
            >
              ✓
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const targetName = computed(() => {
  if (props.exercise.target) return props.exercise.target
  return props.exercise.correct_answer || 'Kucing'
})

const selectOption = (opt) => {
  if (props.isChecked) return
  emit('select', opt)
}
</script>
