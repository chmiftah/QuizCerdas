<template>
  <div class="space-y-6">
    <!-- Question Text with Audio Player Button -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Oversized Input Box -->
    <div class="flex justify-center py-4">
      <div class="relative max-w-sm w-full">
        <input 
          ref="inputRef"
          type="text" 
          :inputmode="isNumericAnswer ? 'numeric' : 'text'"
          :value="fillBlankInput" 
          @input="$emit('update:fillBlankInput', $event.target.value)"
          :disabled="isChecked"
          :placeholder="isNumericAnswer ? 'Isi angka...' : 'Ketik jawaban...'"
          class="w-full text-center font-heading text-3xl sm:text-4xl font-extrabold py-4 px-6 rounded-3xl border-4 transition-all outline-none shadow-inner"
          :class="getInputClass()"
        />
      </div>
    </div>

    <!-- Interactive Word Option Chips for Text Answers (If options are provided) -->
    <div v-if="!isNumericAnswer && exercise.options && exercise.options.length > 0 && !isChecked" class="max-w-md mx-auto space-y-2 pt-1 text-center">
      <p class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">
        Atau pilih kata di bawah ini:
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <button 
          v-for="(wordOpt, idx) in exercise.options" 
          :key="idx"
          @click="selectWordOption(wordOpt)"
          class="px-4 py-2.5 bg-white border-2 border-slate-300 hover:border-duo-blue rounded-2xl font-heading font-black text-slate-800 text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {{ wordOpt }}
        </button>
      </div>
    </div>

    <!-- On-screen Kid Number Keypad (Rendered ONLY if numeric answer) -->
    <div v-if="isNumericAnswer && !isChecked" class="max-w-xs mx-auto space-y-2 pt-2">
      <p class="text-xs text-center font-heading font-bold text-duo-gray-400 uppercase tracking-wider">
        Tekan angka di bawah ini:
      </p>
      <div class="grid grid-cols-5 gap-2">
        <button 
          v-for="num in 10" 
          :key="num"
          @click="appendNumber(num === 10 ? '0' : num.toString())"
          class="duo-btn-gray py-2 text-lg font-heading font-bold rounded-xl cursor-pointer"
        >
          {{ num === 10 ? 0 : num }}
        </button>
      </div>
      <div class="flex justify-center gap-2 pt-1">
        <button 
          @click="clearInput" 
          class="duo-btn-gray px-4 py-1.5 text-xs font-heading font-bold text-duo-red rounded-xl cursor-pointer"
        >
          Hapus Semua
        </button>
      </div>
    </div>

    <!-- Clear Text Input Button (Rendered when text answer input is not empty) -->
    <div v-else-if="!isNumericAnswer && !isChecked && fillBlankInput" class="flex justify-center pt-1">
      <button 
        @click="clearInput" 
        class="duo-btn-gray px-4 py-1.5 text-xs font-heading font-bold text-duo-red rounded-xl cursor-pointer"
      >
        Hapus Text
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  fillBlankInput: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['update:fillBlankInput'])
const inputRef = ref(null)

const isNumericAnswer = computed(() => {
  const ans = props.exercise?.correct_answer
  if (!ans) return true
  return /^\d+$/.test(String(ans).trim())
})

onMounted(() => {
  if (!isNumericAnswer.value && inputRef.value) {
    inputRef.value.focus()
  }
})

const selectWordOption = (word) => {
  if (props.isChecked) return
  emit('update:fillBlankInput', word)
}

const appendNumber = (num) => {
  if (props.isChecked) return
  emit('update:fillBlankInput', props.fillBlankInput + num)
}

const clearInput = () => {
  if (props.isChecked) return
  emit('update:fillBlankInput', '')
}

const getInputClass = () => {
  if (props.isChecked) {
    if (props.isCorrect) {
      return 'bg-emerald-50 border-duo-green text-duo-green-dark shadow-duo-green'
    }
    return 'bg-rose-50 border-duo-red text-duo-red-dark shadow-duo-red animate-shake'
  }
  if (props.fillBlankInput.trim()) {
    return 'bg-duo-blue-lightBg border-duo-blue text-duo-blue-dark shadow-duo-blue'
  }
  return 'bg-white border-duo-gray-200 text-slate-800 focus:border-duo-blue focus:ring-4 focus:ring-duo-blue/20'
}
</script>
