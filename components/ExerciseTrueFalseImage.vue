<template>
  <div class="space-y-6 select-none">
    <!-- Question Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Visual Image Card -->
    <div v-if="exercise.image" class="max-w-md mx-auto rounded-3xl border-4 border-slate-200 bg-white p-3 shadow-md relative overflow-hidden group">
      <div class="relative rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center h-52 sm:h-64 w-full">
        <img 
          :src="exercise.image" 
          :alt="exercise.question" 
          @error="(e) => (e.target.style.display = 'none')"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
    </div>

    <!-- 3D Bouncy Duolingo Style Benar / Salah Buttons -->
    <div class="grid grid-cols-2 gap-3.5 sm:gap-6 max-w-md mx-auto pt-2">
      <!-- Benar Button -->
      <button
        @click="selectOption('benar')"
        type="button"
        class="p-4 sm:p-6 rounded-3xl border-2 border-b-8 font-heading font-black text-xl sm:text-2xl transition-all duration-150 cursor-pointer select-none active:translate-y-1 active:border-b-2 flex flex-col items-center justify-center gap-2.5 shadow-sm"
        :class="[
          localSelected === 'benar' 
            ? 'bg-emerald-500 text-white border-emerald-600 border-b-emerald-700 scale-[1.03] shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-300/40' 
            : 'bg-emerald-50/70 text-emerald-800 border-emerald-300 border-b-emerald-400 hover:bg-emerald-100/60 hover:border-emerald-400'
        ]"
      >
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-2xl sm:text-3xl">
          ✅
        </div>
        <span class="tracking-wide">BENAR</span>
      </button>

      <!-- Salah Button -->
      <button
        @click="selectOption('salah')"
        type="button"
        class="p-4 sm:p-6 rounded-3xl border-2 border-b-8 font-heading font-black text-xl sm:text-2xl transition-all duration-150 cursor-pointer select-none active:translate-y-1 active:border-b-2 flex flex-col items-center justify-center gap-2.5 shadow-sm"
        :class="[
          localSelected === 'salah' 
            ? 'bg-rose-500 text-white border-rose-600 border-b-rose-700 scale-[1.03] shadow-lg shadow-rose-500/25 ring-4 ring-rose-300/40' 
            : 'bg-rose-50/70 text-rose-800 border-rose-300 border-b-rose-400 hover:bg-rose-100/60 hover:border-rose-400'
        ]"
      >
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-2xl sm:text-3xl">
          ❌
        </div>
        <span class="tracking-wide">SALAH</span>
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