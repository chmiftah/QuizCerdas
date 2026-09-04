<template>
  <div class="space-y-4 sm:space-y-6 w-full min-w-0">
    <!-- Question Text with Audio Player Button -->
    <div class="flex items-center gap-2 sm:gap-3 w-full min-w-0">
      <h2 class="font-heading text-lg sm:text-2xl md:text-3xl text-slate-800 font-bold leading-snug flex-1 min-w-0 break-words">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" class="shrink-0" />
    </div>

    <!-- Option Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full">
      <button 
        v-for="(option, idx) in exercise.options" 
        :key="idx"
        @click="$emit('select', option)"
        :disabled="isChecked"
        class="relative p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-150 text-left flex items-center justify-between gap-2.5 sm:gap-3 group cursor-pointer select-none min-h-[52px] sm:min-h-[64px] w-full min-w-0 overflow-hidden"
        :class="getOptionClass(option)"
      >
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 w-full overflow-hidden">
          <!-- Keyboard / Number Badge -->
          <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-heading font-bold text-xs sm:text-sm border-2 transition-colors shrink-0"
                :class="getBadgeClass(option)">
            {{ idx + 1 }}
          </span>

          <!-- Pexels Photo Thumbnail if available -->
          <div v-if="getObjectImageUrl(option)" class="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shadow-xs border-2 border-slate-200 shrink-0 bg-slate-50">
            <img 
              :src="getObjectImageUrl(option)" 
              :alt="option" 
              @error="(e) => (e.target.style.display = 'none')"
              class="w-full h-full object-cover" 
            />
          </div>

          <span class="font-heading font-bold text-sm sm:text-lg text-slate-800 truncate min-w-0 flex-1">
            {{ option }}
          </span>
        </div>
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

defineEmits(['select'])

const getOptionClass = (option) => {
  if (props.isChecked) {
    if (option === props.exercise.correct_answer) {
      return 'bg-duo-green-lightBg border-duo-green text-duo-green-dark shadow-duo-green'
    }
    if (option === props.selectedOption && !props.isCorrect) {
      return 'bg-duo-red-lightBg border-duo-red text-duo-red-dark shadow-duo-red'
    }
    return 'bg-white border-duo-gray-100 opacity-50 cursor-not-allowed'
  }

  if (props.selectedOption === option) {
    return 'bg-duo-blue-lightBg border-duo-blue text-duo-blue-dark shadow-duo-blue scale-[1.02]'
  }

  return 'bg-white border-duo-gray-100 shadow-duo-gray hover:border-duo-blue hover:bg-duo-blue-lightBg/30 active:scale-[0.99]'
}

const getBadgeClass = (option) => {
  if (props.isChecked) {
    if (option === props.exercise.correct_answer) {
      return 'bg-duo-green text-white border-duo-green-dark'
    }
    if (option === props.selectedOption && !props.isCorrect) {
      return 'bg-duo-red text-white border-duo-red-dark'
    }
  }
  if (props.selectedOption === option) {
    return 'bg-duo-blue text-white border-duo-blue-dark'
  }
  return 'bg-duo-gray-50 text-duo-gray-400 border-duo-gray-200 group-hover:border-duo-blue group-hover:text-duo-blue'
}
</script>
