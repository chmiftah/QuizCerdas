<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-exit-title"
      >
        <!-- Blurred Frosted Backdrop Overlay -->
        <div 
          @click="$emit('stay')"
          class="fixed inset-0 bg-slate-950/45 backdrop-blur-md transition-all duration-300"
        ></div>

        <!-- Centered Confirmation Dialog Card -->
        <div class="relative z-10 w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border-4 border-amber-300 text-center space-y-4 animate-center-pop">
          
          <!-- Cute Mascot Emotion Icon (Kiko Sedang Sedih/Cemas) -->
          <div class="relative mx-auto w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md animate-bounce-gentle">
            <span>🥺</span>
            <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center border-2 border-white shadow-xs">
              ✕
            </div>
          </div>

          <!-- Dialog Headings -->
          <div class="space-y-1.5">
            <h3 id="quiz-exit-title" class="font-heading text-xl sm:text-2xl font-black text-slate-800">
              Keluar dari Kuis?
            </h3>
            <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500 leading-relaxed">
              Progres soal saat ini <strong class="text-rose-600">tidak akan disimpan</strong> jika kamu keluar sekarang.
            </p>
          </div>

          <!-- Progress Pill Indicator -->
          <div v-if="totalQuestions > 0" class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-heading font-bold text-slate-600">
            <span>📝</span>
            <span>Sedang di Soal {{ currentQuestion }} dari {{ totalQuestions }}</span>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-2.5 pt-1">
            <!-- Primary Action: Lanjut Belajar -->
            <button 
              @click="$emit('stay')"
              type="button"
              class="w-full py-3.5 duo-btn-green font-heading font-extrabold text-sm sm:text-base rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tetap di Kuis & Lanjut ✨</span>
            </button>

            <!-- Secondary Action: Konfirmasi Keluar -->
            <button 
              @click="$emit('leave')"
              type="button"
              class="w-full py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 font-heading font-bold text-xs sm:text-sm rounded-2xl transition-colors active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Keluar (Jangan Simpan)</span>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, default: false },
  currentQuestion: { type: Number, default: 1 },
  totalQuestions: { type: Number, default: 1 }
})

defineEmits(['stay', 'leave'])
</script>

<style scoped>
@keyframes centerPop {
  0% {
    opacity: 0;
    transform: scale(0.88);
  }
  60% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-center-pop {
  animation: centerPop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-bounce-gentle {
  animation: bounceGentle 1.6s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
