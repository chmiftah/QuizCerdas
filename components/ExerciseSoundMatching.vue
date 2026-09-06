<template>
  <div class="space-y-6 select-none">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <button 
        @click="playSound" 
        type="button"
        class="p-3 bg-duo-green text-white rounded-2xl font-heading font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
      >
        <span class="text-xl">🔊</span> Putar Suara
      </button>
    </div>

    <!-- Options Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
      <button
        v-for="opt in exercise.options"
        :key="opt"
        @click="selectOption(opt)"
        type="button"
        class="p-4 rounded-3xl border-4 font-heading font-black text-xl flex flex-col items-center gap-2 transition-all cursor-pointer shadow-md"
        :class="[
          selectedOption === opt 
            ? 'bg-duo-green text-white border-duo-green-dark scale-105 shadow-lg ring-4 ring-duo-green/20' 
            : 'bg-white text-slate-800 border-slate-200 hover:border-duo-green'
        ]"
      >
        <img 
          v-if="getObjectImageUrl(opt)" 
          :src="getObjectImageUrl(opt)" 
          :alt="opt" 
          class="w-16 h-16 object-cover rounded-xl"
        />
        <span>{{ opt }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const playSound = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(props.exercise.audioText || props.exercise.question)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

const selectOption = (opt) => {
  if (props.isChecked) return
  emit('select', opt)
}
</script>