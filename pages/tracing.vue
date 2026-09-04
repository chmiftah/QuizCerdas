<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
    <!-- Header -->
    <HeaderNav />

    <!-- Main Tracing Room -->
    <main class="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-8 animate-pop">
      <!-- Title & Banner -->
      <div class="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-2 text-center sm:text-left z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-heading font-extrabold tracking-wider uppercase">
            ✏️ Kanvas Belajar Menulis
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black drop-shadow-md">
            Menjiplak Angka 1 – 10 🎨
          </h1>
          <p class="text-sm sm:text-base font-heading font-semibold text-amber-100 max-w-md">
            Gunakan jarimu di atas layar untuk mengikuti garis panduan angka!
          </p>
        </div>

        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 animate-bounce">
          ✏️
        </div>
      </div>

      <!-- Number Selection Pills (1 to 10) -->
      <div class="bg-white p-4 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-3">
        <div class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider text-center">
          PILIH ANGKA YANG INGIN DITULIS:
        </div>
        <div class="flex flex-wrap justify-center gap-2.5">
          <button
            v-for="num in 10"
            :key="num"
            @click="activeNumber = num"
            class="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl font-heading font-black text-lg sm:text-xl border-3 transition-all cursor-pointer shadow-xs active:scale-95"
            :class="activeNumber === num 
              ? 'bg-amber-400 text-white border-amber-600 shadow-md scale-110' 
              : completedNumbers.has(num) 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-300'"
          >
            {{ num }}
          </button>
        </div>
      </div>

      <!-- Tracing Canvas Component -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-duo-gray-100 shadow-md flex flex-col items-center gap-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl font-heading font-black text-amber-600">
            Latihan Menulis Angka:
          </span>
          <span class="w-10 h-10 rounded-2xl bg-amber-400 text-white font-heading font-black text-2xl flex items-center justify-center shadow-md">
            {{ activeNumber }}
          </span>
        </div>

        <NumberTracingCanvas
          :number="activeNumber"
          @completed="handleCompleted"
        />
      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-duo-gray-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeNumber = ref(1)
const completedNumbers = ref(new Set())

const handleCompleted = (num) => {
  completedNumbers.value.add(num)
}
</script>
