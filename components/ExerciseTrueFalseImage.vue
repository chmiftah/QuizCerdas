<template>
  <div class="space-y-6 select-none">
    <!-- Question Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Visual Image -->
    <div v-if="exercise.image" class="max-w-md mx-auto rounded-3xl border-4 border-duo-gray-100 bg-white p-3 shadow-md relative overflow-hidden group">
      <div class="relative rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center h-52 sm:h-64 w-full">
        <img 
          :src="exercise.image" 
          :alt="exercise.question" 
          @error="(e) => (e.target.style.display = 'none')"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <span class="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-heading font-extrabold tracking-wider border border-white/30 shadow-sm">
          📸 FOTO PEXELS
        </span>
      </div>
    </div>

    <!-- Options -->
    <div class="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      <button
        @click="selectOption('benar')"
        type="button"
        class="p-4 sm:p-6 rounded-3xl border-4 font-heading font-black text-xl sm:text-2xl transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-2 shadow-md"
        :class="[
          localSelected === 'benar' 
            ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-lg ring-4 ring-emerald-300/50' 
            : 'bg-white text-emerald-700 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/50'
        ]"
      >
        <span class="text-4xl">✅</span>
        <span>Benar</span>
      </button>

      <button
        @click="selectOption('salah')"
        type="button"
        class="p-4 sm:p-6 rounded-3xl border-4 font-heading font-black text-xl sm:text-2xl transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center gap-2 shadow-md"
        :class="[
          localSelected === 'salah' 
            ? 'bg-rose-500 text-white border-rose-600 scale-105 shadow-lg ring-4 ring-rose-300/50' 
            : 'bg-white text-rose-700 border-rose-300 hover:border-rose-500 hover:bg-rose-50/50'
        ]"
      >
        <span class="text-4xl">❌</span>
        <span>Salah</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const localSelected = ref(props.selectedOption)

const selectOption = (opt) => {
  if (props.isChecked) return
  localSelected.value = opt
  emit('select', opt)
}
</script>