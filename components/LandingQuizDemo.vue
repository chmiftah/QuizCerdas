<template>
  <div class="bg-white rounded-3xl border-4 border-slate-200 p-5 sm:p-7 shadow-xl space-y-6 max-w-xl mx-auto relative overflow-hidden">
    <!-- Top Game Bar: Progress, Hearts, XP -->
    <div class="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
      <!-- Heart indicator -->
      <div class="flex items-center gap-1 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-rose-600 font-heading font-black text-xs">
        <span class="text-sm">❤️</span>
        <span>5 / 5</span>
      </div>

      <!-- Subject Tabs -->
      <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl font-heading font-black text-xs">
        <button 
          @click="changeSubject('math')" 
          type="button"
          class="px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          :class="activeSubject === 'math' ? 'bg-duo-green text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🔢</span> <span class="hidden sm:inline">Matematika</span>
        </button>
        <button 
          @click="changeSubject('science')" 
          type="button"
          class="px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          :class="activeSubject === 'science' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🦁</span> <span class="hidden sm:inline">Hewan</span>
        </button>
        <button 
          @click="changeSubject('language')" 
          type="button"
          class="px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
          :class="activeSubject === 'language' ? 'bg-duo-purple text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>📖</span> <span class="hidden sm:inline">Bahasa</span>
        </button>
      </div>

      <!-- XP Pill -->
      <div class="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-amber-800 font-heading font-black text-xs">
        <span>⚡</span>
        <span>+20 XP</span>
      </div>
    </div>

    <!-- Mini Progress Line -->
    <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
      <div 
        class="h-full transition-all duration-500 rounded-full"
        :class="activeSubject === 'math' ? 'bg-duo-green w-1/3' : activeSubject === 'science' ? 'bg-amber-500 w-2/3' : 'bg-duo-purple w-full'"
      ></div>
    </div>

    <!-- MATH DEMO -->
    <div v-if="activeSubject === 'math'" class="space-y-5 text-center">
      <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
        <p class="font-heading text-base sm:text-lg text-slate-800 font-black">
          Berapa jumlah bintang berkilau di bawah ini? ⭐
        </p>
      </div>

      <!-- Visual Counting Board -->
      <div class="flex items-center justify-center gap-2 sm:gap-3 py-4 px-3 bg-amber-50/50 rounded-2xl border border-amber-200/60">
        <div 
          v-for="n in 5" 
          :key="n" 
          class="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white border-2 border-amber-300 shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-110"
        >
          <span class="text-xl sm:text-2xl leading-none">⭐</span>
          <span class="text-[10px] font-heading font-black text-amber-700 leading-none mt-0.5">{{ n }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button 
          v-for="opt in [3, 4, 5, 6]" 
          :key="opt"
          @click="checkAnswer(opt, 5)"
          :disabled="isAnswered"
          class="py-3.5 px-4 rounded-2xl font-heading font-black text-xl border-2 border-b-4 transition-all cursor-pointer select-none flex items-center justify-center gap-2"
          :class="getOptionClass(opt, 5)"
        >
          <span>{{ opt }}</span>
          <span v-if="selectedOption === opt && isCorrect" class="text-base">✅</span>
          <span v-if="selectedOption === opt && !isCorrect" class="text-base">❌</span>
        </button>
      </div>
    </div>

    <!-- SCIENCE / ANIMAL DEMO -->
    <div v-if="activeSubject === 'science'" class="space-y-5 text-center">
      <div class="p-4 bg-amber-50 rounded-2xl border border-amber-200">
        <p class="font-heading text-base sm:text-lg text-slate-800 font-black">
          Manakah hewan gagah yang dijuluki "Raja Hutan"? 👑
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button 
          v-for="opt in [{ id: 'kucing', label: '🐱 Kucing', sound: 'Meong!' }, { id: 'singa', label: '🦁 Singa', sound: 'Aum!' }, { id: 'kelinci', label: '🐰 Kelinci', sound: 'Hop!' }, { id: 'bebek', label: '🦆 Bebek', sound: 'Kwek!' }]" 
          :key="opt.id"
          @click="checkAnswer(opt.id, 'singa')"
          :disabled="isAnswered"
          class="py-3 px-3.5 rounded-2xl font-heading font-black text-sm sm:text-base border-2 border-b-4 transition-all cursor-pointer select-none flex flex-col items-center justify-center gap-0.5"
          :class="getOptionClass(opt.id, 'singa')"
        >
          <span class="text-lg sm:text-xl">{{ opt.label }}</span>
          <span class="text-[10px] text-slate-400 font-normal">({{ opt.sound }})</span>
        </button>
      </div>
    </div>

    <!-- LANGUAGE DEMO -->
    <div v-if="activeSubject === 'language'" class="space-y-5 text-center">
      <div class="p-4 bg-purple-50 rounded-2xl border border-purple-200">
        <p class="font-heading text-base sm:text-lg text-slate-800 font-black">
          Huruf pertama dari nama buah 🍎 <span class="text-duo-purple underline">Apel</span> adalah?
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button 
          v-for="opt in ['A', 'B', 'C', 'D']" 
          :key="opt"
          @click="checkAnswer(opt, 'A')"
          :disabled="isAnswered"
          class="py-3.5 px-4 rounded-2xl font-heading font-black text-2xl border-2 border-b-4 transition-all cursor-pointer select-none flex items-center justify-center gap-2"
          :class="getOptionClass(opt, 'A')"
        >
          <span>{{ opt }}</span>
          <span v-if="selectedOption === opt && isCorrect" class="text-base">✅</span>
          <span v-if="selectedOption === opt && !isCorrect" class="text-base">❌</span>
        </button>
      </div>
    </div>

    <!-- Feedback Drawer Banner -->
    <Transition name="bounce-feedback">
      <div 
        v-if="isAnswered" 
        class="p-4 rounded-2xl border-2 text-center space-y-3 animate-pop" 
        :class="isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'"
      >
        <div class="font-heading text-base sm:text-lg font-black flex items-center justify-center gap-2">
          <span>{{ isCorrect ? '🎉 Luar Biasa! Jawaban Ananda Benar!' : '💪 Hampir Tepat! Terus Berlatih ya!' }}</span>
        </div>
        <p class="text-xs sm:text-sm font-body text-slate-600">
          {{ isCorrect ? 'Anak mendapatkan +20 XP Pertama! Semua soal CountingDuo dilengkapi respon visual ramah anak seperti ini.' : 'Di CountingDuo, anak belajar tanpa rasa takut salah. Materi dapat diulang kapan saja.' }}
        </p>

        <div class="flex flex-col sm:flex-row gap-2 pt-1">
          <NuxtLink 
            to="/register"
            class="flex-1 duo-btn-green py-3 text-xs sm:text-sm font-heading font-extrabold flex items-center justify-center gap-1.5"
          >
            <span>🚀 Mulai Belajar Gratis</span>
          </NuxtLink>
          <button 
            @click="resetDemo"
            class="px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-700 font-heading font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
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

const changeSubject = (subj) => {
  activeSubject.value = subj
  resetDemo()
}

const checkAnswer = (val, correctVal) => {
  selectedOption.value = val
  isAnswered.value = true
  isCorrect.value = val === correctVal
}

const getOptionClass = (val, correctVal) => {
  if (!isAnswered.value) {
    return 'bg-white border-slate-200 border-b-slate-300 text-slate-800 hover:border-duo-blue hover:bg-sky-50/50 hover:border-b-blue-400 active:border-b-2 active:translate-y-0.5 shadow-2xs'
  }

  if (val === correctVal) {
    return 'bg-emerald-500 border-emerald-600 border-b-emerald-700 text-white shadow-md'
  }

  if (selectedOption.value === val && !isCorrect.value) {
    return 'bg-rose-500 border-rose-600 border-b-rose-700 text-white shadow-md animate-shake'
  }

  return 'bg-slate-100 border-slate-200 border-b-slate-200 text-slate-400 opacity-60'
}

const resetDemo = () => {
  selectedOption.value = null
  isAnswered.value = false
  isCorrect.value = false
}
</script>
