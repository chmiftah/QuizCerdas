<template>
  <div class="bg-white rounded-3xl border-4 border-duo-blue/30 p-6 sm:p-8 shadow-2xl space-y-6 max-w-xl mx-auto relative overflow-hidden animate-pop">
    <!-- Quiz Demo Subject Tabs -->
    <div class="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl font-heading font-extrabold text-xs">
      <button 
        @click="activeSubject = 'math'; resetDemo()" 
        class="px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
        :class="activeSubject === 'math' ? 'bg-duo-green text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
      >
        <span>🔢</span> Matematika
      </button>
      <button 
        @click="activeSubject = 'science'; resetDemo()" 
        class="px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
        :class="activeSubject === 'science' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
      >
        <span>🦁</span> Dunia Hewan
      </button>
      <button 
        @click="activeSubject = 'language'; resetDemo()" 
        class="px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
        :class="activeSubject === 'language' ? 'bg-duo-purple text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
      >
        <span>📖</span> Bahasa Indonesia
      </button>
    </div>

    <!-- Header Badge & Title -->
    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-2xl bg-duo-blue text-white flex items-center justify-center font-heading text-xl shadow-duo-blue">
          ⚡
        </div>
        <div>
          <h3 class="font-heading font-extrabold text-slate-800 text-lg sm:text-xl">Coba Kuis Interaktif!</h3>
          <p class="text-xs text-slate-500 font-heading font-semibold">Rasakan sensasi belajar seru layaknya bermain game</p>
        </div>
      </div>
      <span class="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-800 rounded-full font-heading font-extrabold text-xs shadow-2xs">
        +20 XP Demo
      </span>
    </div>

    <!-- MATH DEMO -->
    <div v-if="activeSubject === 'math'" class="space-y-4 text-center">
      <div class="inline-flex items-center justify-center p-4 bg-sky-50 rounded-2xl border border-sky-200 w-full">
        <p class="font-heading text-lg sm:text-xl text-slate-800 font-extrabold">
          Berapa jumlah bintang di bawah ini?
        </p>
      </div>

      <div class="flex items-center justify-center gap-3 py-3 bg-amber-50/60 rounded-2xl border border-amber-200/60">
        <span v-for="n in 5" :key="n" class="text-4xl animate-bounce" :style="{ animationDelay: `${n * 0.15}s` }">
          ⭐
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <button 
          v-for="opt in [3, 4, 5, 6]" 
          :key="opt"
          @click="checkAnswer(opt, 5)"
          :disabled="isAnswered"
          class="py-3.5 px-4 rounded-2xl font-heading font-extrabold text-lg sm:text-xl border-2 transition-all cursor-pointer select-none flex items-center justify-center gap-2"
          :class="getOptionClass(opt, 5)"
        >
          <span>{{ opt }}</span>
          <span v-if="selectedOption === opt && isCorrect">✅</span>
          <span v-if="selectedOption === opt && !isCorrect">❌</span>
        </button>
      </div>
    </div>

    <!-- SCIENCE / ANIMAL DEMO -->
    <div v-if="activeSubject === 'science'" class="space-y-4 text-center">
      <div class="inline-flex items-center justify-center p-4 bg-amber-50 rounded-2xl border border-amber-200 w-full">
        <p class="font-heading text-lg sm:text-xl text-slate-800 font-extrabold">
          Manakah hewan yang dikenal sebagai "Raja Hutan"? 👑
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <button 
          v-for="opt in [{ id: 'kucing', label: '🐱 Kucing' }, { id: 'singa', label: '🦁 Singa' }, { id: 'kelinci', label: '🐰 Kelinci' }, { id: 'bebek', label: '🦆 Bebek' }]" 
          :key="opt.id"
          @click="checkAnswer(opt.id, 'singa')"
          :disabled="isAnswered"
          class="py-3.5 px-4 rounded-2xl font-heading font-extrabold text-base sm:text-lg border-2 transition-all cursor-pointer select-none flex items-center justify-center gap-2"
          :class="getOptionClass(opt.id, 'singa')"
        >
          <span>{{ opt.label }}</span>
          <span v-if="selectedOption === opt.id && isCorrect">✅</span>
          <span v-if="selectedOption === opt.id && !isCorrect">❌</span>
        </button>
      </div>
    </div>

    <!-- LANGUAGE DEMO -->
    <div v-if="activeSubject === 'language'" class="space-y-4 text-center">
      <div class="inline-flex items-center justify-center p-4 bg-purple-50 rounded-2xl border border-purple-200 w-full">
        <p class="font-heading text-lg sm:text-xl text-slate-800 font-extrabold">
          Huruf pertama dari gambar 🍎 (Apel) adalah?
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <button 
          v-for="opt in ['A', 'B', 'C', 'D']" 
          :key="opt"
          @click="checkAnswer(opt, 'A')"
          :disabled="isAnswered"
          class="py-3.5 px-4 rounded-2xl font-heading font-extrabold text-xl sm:text-2xl border-2 transition-all cursor-pointer select-none flex items-center justify-center gap-2"
          :class="getOptionClass(opt, 'A')"
        >
          <span>{{ opt }}</span>
          <span v-if="selectedOption === opt && isCorrect">✅</span>
          <span v-if="selectedOption === opt && !isCorrect">❌</span>
        </button>
      </div>
    </div>

    <!-- Feedback Drawer Banner -->
    <Transition name="bounce-feedback">
      <div v-if="isAnswered" class="p-4 rounded-2xl border-2 text-center space-y-3" :class="isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'">
        <div class="font-heading text-lg font-black flex items-center justify-center gap-2">
          <span>{{ isCorrect ? '🎉 Luar Biasa! Jawabanmu Benar!' : '😅 Ups, Hampir Benar!' }}</span>
        </div>
        <p class="text-xs sm:text-sm font-body">
          {{ isCorrect ? 'Kamu mendapatkan +20 XP Pertama! Ayo daftar akun gratis sekarang untuk menyimpan progresmu.' : 'Coba periksa lagi pilihan jawabanmu.' }}
        </p>

        <div class="flex flex-col sm:flex-row gap-2 pt-2">
          <NuxtLink 
            to="/register"
            class="flex-1 duo-btn-green py-3 text-sm font-heading font-extrabold"
          >
            🚀 Simpan XP & Daftar Akun
          </NuxtLink>
          <button 
            @click="resetDemo"
            class="px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-heading font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeSubject = ref('math')
const selectedOption = ref(null)
const isAnswered = ref(false)
const isCorrect = ref(false)

const checkAnswer = (val, correctVal) => {
  selectedOption.value = val
  isAnswered.value = true
  isCorrect.value = val === correctVal
}

const getOptionClass = (val, correctVal) => {
  if (!isAnswered.value) {
    return 'bg-white border-duo-gray-200 text-slate-700 hover:border-duo-blue hover:bg-sky-50 shadow-duo-gray'
  }

  if (val === correctVal) {
    return 'bg-emerald-500 border-emerald-700 text-white shadow-md'
  }

  if (selectedOption.value === val && !isCorrect.value) {
    return 'bg-rose-500 border-rose-700 text-white shadow-md animate-shake'
  }

  return 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
}

const resetDemo = () => {
  selectedOption.value = null
  isAnswered.value = false
  isCorrect.value = false
}
</script>
