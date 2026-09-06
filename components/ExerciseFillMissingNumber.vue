<template>
  <div class="space-y-6 select-none">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Number Display with Blank -->
    <div class="flex items-center justify-center gap-4 bg-amber-50 p-6 rounded-3xl border-3 border-amber-200 max-w-md mx-auto shadow-md">
      <div 
        v-for="(val, idx) in displayValues" 
        :key="idx"
        class="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-white border-2 flex items-center justify-center font-heading text-4xl font-black text-slate-800 shadow-sm transition-all"
        :class="val === '?' ? 'bg-amber-100 border-dashed border-amber-400 text-amber-700 animate-pulse ring-4 ring-amber-300/50' : 'border-slate-200'"
      >
        <span v-if="val !== '?'">{{ val }}</span>
      </div>
    </div>

    <!-- Number Pad with Delete & Backspace -->
    <div class="grid grid-cols-6 gap-2 max-w-md mx-auto pt-4">
      <button
        v-for="num in 10"
        :key="num-1"
        @click="updateInput(num-1)"
        type="button"
        class="aspect-square rounded-xl bg-white border-2 border-slate-200 font-heading text-2xl font-black text-slate-700 hover:border-duo-green hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer shadow-sm"
        :class="{ 'bg-duo-green text-white border-duo-green-dark': String(fillBlankInput).endsWith(String(num-1)) }"
      >
        {{ num-1 }}
      </button>
      <button @click="backspace" class="aspect-square rounded-xl bg-slate-100 text-slate-500 font-heading font-black text-sm border border-slate-200" title="Backspace">
        ⌫
      </button>
      <button @click="clearInput" class="col-span-2 py-2 bg-rose-50 text-rose-600 rounded-xl font-heading font-black text-sm border border-rose-200" title="Clear All">
        🗑️ Hapus Semua
      </button>
    </div>

    <!-- Keyboard Listener -->
    <div class="hidden" @keydown="handleKeydown"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  fillBlankInput: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['update:fillBlankInput'])

const displayValues = computed(() => {
  const seq = props.exercise.visual?.sequence || [1, 2, '?', 4]
  return seq.map(v => v === '?' && props.fillBlankInput ? props.fillBlankInput : v)
})

const updateInput = (val) => {
  if (props.isChecked) return
  // Append digit to current input
  const newVal = props.fillBlankInput + String(val)
  emit('update:fillBlankInput', newVal)
}

const backspace = () => {
  if (props.isChecked) return
  const newVal = props.fillBlankInput.slice(0, -1)
  emit('update:fillBlankInput', newVal)
}

const clearInput = () => {
  if (props.isChecked) return
  emit('update:fillBlankInput', '')
}

const handleKeydown = (e) => {
  if (props.isChecked) return
  if (e.key >= '0' && e.key <= '9') {
    updateInput(e.key)
  } else if (e.key === 'Backspace') {
    backspace()
  } else if (e.key === 'Delete') {
    clearInput()
  }
}

const removeKeydownListener = () => {
  window.removeEventListener('keydown', handleKeydown)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  removeKeydownListener()
})
</script>