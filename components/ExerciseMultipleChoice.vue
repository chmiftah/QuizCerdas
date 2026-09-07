<template>
  <div class="space-y-4 sm:space-y-6 w-full min-w-0">
    <!-- Question Text with Audio Player Button -->
    <div class="flex items-center gap-2 sm:gap-3 w-full min-w-0">
      <h2 class="font-heading text-lg sm:text-2xl md:text-3xl text-slate-800 font-bold leading-snug flex-1 min-w-0 break-words">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" class="shrink-0" />
    </div>

    <!-- Option Cards Grid (Chunky 3D Juicy Choice Buttons) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2 w-full">
      <button 
        v-for="(option, idx) in exercise.options" 
        :key="idx"
        @click="handleSelect(option)"
        :disabled="isChecked"
        class="relative p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-b-6 transition-all duration-150 text-left flex items-center justify-between gap-3 group cursor-pointer select-none min-h-[56px] sm:min-h-[68px] w-full min-w-0 overflow-hidden active:translate-y-1 active:border-b-2"
        :class="getOptionClass(option)"
      >
        <div class="flex items-center gap-3 min-w-0 w-full overflow-hidden">
          <!-- Keyboard / Number Badge -->
          <span 
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-heading font-black text-xs sm:text-sm border-2 transition-all shrink-0 shadow-xs"
            :class="getBadgeClass(option)"
          >
            {{ idx + 1 }}
          </span>

          <!-- Object Thumbnail if available -->
          <div v-if="getObjectImageUrl(option)" class="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xs border-2 border-slate-200 shrink-0 bg-slate-50">
            <img 
              :src="getObjectImageUrl(option)" 
              :alt="option" 
              @error="(e) => (e.target.style.display = 'none')"
              class="w-full h-full object-cover" 
            />
          </div>

          <span class="font-heading font-black text-base sm:text-lg text-slate-800 truncate min-w-0 flex-1">
            {{ option }}
          </span>
        </div>

        <!-- Selected Check Indicator -->
        <span v-if="selectedOption === option && !isChecked" class="text-duo-blue font-black text-lg animate-bounce">
          ✨
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
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

const handleSelect = (option) => {
  if (props.isChecked) return
  playPop()
  emit('select', option)
}

const getOptionClass = (option) => {
  if (props.isChecked) {
    if (option === props.exercise.correct_answer) {
      return 'bg-emerald-50 border-emerald-500 border-b-emerald-600 text-emerald-900 shadow-emerald-500/20 animate-jelly'
    }
    if (option === props.selectedOption && !props.isCorrect) {
      return 'bg-rose-50 border-rose-500 border-b-rose-600 text-rose-900 shadow-rose-500/20 animate-shake'
    }
    return 'bg-slate-50 border-slate-200 border-b-slate-300 opacity-50 cursor-not-allowed'
  }

  if (props.selectedOption === option) {
    return 'bg-sky-50 border-sky-400 border-b-sky-600 text-sky-900 shadow-lg scale-[1.02]'
  }

  return 'bg-white border-slate-200 border-b-slate-300 shadow-sm hover:border-sky-400 hover:bg-sky-50/40 hover:scale-[1.01]'
}

const getBadgeClass = (option) => {
  if (props.isChecked) {
    if (option === props.exercise.correct_answer) {
      return 'bg-emerald-500 text-white border-emerald-600'
    }
    if (option === props.selectedOption && !props.isCorrect) {
      return 'bg-rose-500 text-white border-rose-600'
    }
  }
  if (props.selectedOption === option) {
    return 'bg-sky-500 text-white border-sky-600'
  }
  return 'bg-slate-100 text-slate-500 border-slate-300 group-hover:border-sky-400 group-hover:text-sky-600'
}
</script>
