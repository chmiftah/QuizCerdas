<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-pop">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-4 border-duo-gray-100 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <!-- Background Victory Glow -->
        <div class="absolute -top-24 -left-24 w-48 h-48 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
        <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>

        <!-- Trophy Header -->
        <div class="relative z-10 space-y-2">
          <div class="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center text-5xl shadow-xl animate-bounce">
            🏆
          </div>
          <h2 class="text-3xl font-heading font-black text-slate-800">
            Pelajaran Selesai! 🎉
          </h2>
          <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500">
            Luar biasa! Kamu menyelesaikan kuis dengan sangat baik!
          </p>
        </div>

        <!-- 3 Golden Stars Reveal -->
        <div class="flex items-center justify-center gap-3 py-2">
          <div 
            v-for="star in 3" 
            :key="star"
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md border-3 transition-transform duration-300"
            :class="star <= stars 
              ? 'bg-amber-400 border-amber-500 text-white scale-110 shadow-amber-300/50 animate-pop' 
              : 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'"
          >
            ⭐
          </div>
        </div>

        <!-- XP & Stats Cards -->
        <div class="grid grid-cols-2 gap-3 z-10 relative">
          <div class="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-center space-y-0.5">
            <span class="text-[10px] font-heading font-bold text-amber-800 uppercase tracking-wider block">TOTAL XP DIPEROLEH</span>
            <span class="font-heading font-black text-2xl text-amber-600">+{{ xpEarned }} XP</span>
          </div>

          <div class="p-3.5 bg-orange-50 rounded-2xl border-2 border-orange-200 text-center space-y-0.5">
            <span class="text-[10px] font-heading font-bold text-orange-800 uppercase tracking-wider block">MAX COMBO</span>
            <span class="font-heading font-black text-2xl text-duo-orange">🔥 x{{ maxCombo }}</span>
          </div>
        </div>

        <!-- Action Navigation Buttons -->
        <div class="space-y-3 z-10 relative pt-2">
          <!-- Primary Action: Lanjut ke Quiz Selanjutnya -->
          <button 
            v-if="nextItem && nextItem.path"
            @click="emit('next')"
            type="button"
            class="w-full py-4 duo-btn-green font-heading font-extrabold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer animate-pulse hover:animate-none"
          >
            <span>Lanjut ke Quiz Selanjutnya ➡️</span>
          </button>

          <!-- Return to Map if finished or no next item -->
          <button 
            @click="emit('finish')"
            type="button"
            class="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 font-heading font-extrabold text-sm rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🗺️ Kembali ke Peta Jalur</span>
          </button>

          <!-- Certificate Section (Unlocked ONLY when 100% completed) -->
          <div class="pt-2 border-t border-slate-100">
            <button 
              v-if="isCourseCompleted"
              @click="showCert = true" 
              type="button"
              class="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white font-heading font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🎓 Ambil Sertifikat Kelulusan 📜</span>
            </button>

            <div 
              v-else
              class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-heading font-bold text-slate-400 flex items-center justify-between gap-2"
            >
              <div class="flex items-center gap-1.5 text-slate-500">
                <span>🔒 Sertifikat Terkunci</span>
              </div>
              <span class="text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-black">
                {{ completedCount }}/{{ totalCount }} Pelajaran
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Printable Certificate Modal Component -->
    <CertificateModal 
      :isOpen="showCert" 
      :title="courseTitle || lessonTitle"
      @close="showCert = false" 
    />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  stars: { type: Number, default: 3 },
  xpEarned: { type: Number, default: 30 },
  maxCombo: { type: Number, default: 0 },
  lessonTitle: { type: String, default: '' },
  courseTitle: { type: String, default: '' },
  nextItem: { type: Object, default: null },
  isCourseCompleted: { type: Boolean, default: false },
  completedCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 }
})

const emit = defineEmits(['finish', 'next'])
const showCert = ref(false)
</script>
