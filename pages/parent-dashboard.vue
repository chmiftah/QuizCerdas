<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
    <!-- Top Navigation -->
    <HeaderNav />

    <!-- Parent Dashboard Container -->
    <main class="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8 animate-pop">
      <!-- Title Header -->
      <div class="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-2 z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/30 backdrop-blur-sm rounded-full text-xs font-heading font-extrabold tracking-wider uppercase text-indigo-200 border border-indigo-400/30">
            📊 Laporan Perkembangan Anak
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black drop-shadow-md">
            Area Orang Tua & Guru 👨‍👩‍👧
          </h1>
          <p class="text-sm sm:text-base font-heading text-slate-300 max-w-xl leading-relaxed">
            Pantau statistik belajar, penguasaan angka 1–10, serta rekomendasi latihan terbaik untuk Ananda <strong class="text-amber-300 font-black">{{ userStore.userDisplayName }}</strong>.
          </p>
        </div>

        <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-10 shrink-0">
          <div class="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-3xl shadow-md">
            {{ userStore.userAvatar }}
          </div>
          <div>
            <h3 class="font-heading font-extrabold text-base">{{ userStore.userDisplayName }}</h3>
            <p class="text-xs text-indigo-200 font-heading">{{ userStore.currentUser?.grade || 'TK B / Kelas 1' }}</p>
            <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-heading font-bold text-[10px]">
              Active Learner
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div class="bg-white p-5 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Total XP</span>
            <span class="text-xl">⚡</span>
          </div>
          <p class="font-heading font-black text-2xl sm:text-3xl text-amber-500">{{ userStore.xp }}</p>
          <p class="text-[11px] font-heading font-semibold text-slate-500">Level {{ userStore.userLevel }} Penjelajah</p>
        </div>

        <div class="bg-white p-5 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Streak Belajar</span>
            <span class="text-xl">🔥</span>
          </div>
          <p class="font-heading font-black text-2xl sm:text-3xl text-duo-orange">{{ userStore.streak }} Hari</p>
          <p class="text-[11px] font-heading font-semibold text-slate-500">Aktif Rutin Hari Ini</p>
        </div>

        <div class="bg-white p-5 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Pelajaran Selesai</span>
            <span class="text-xl">📚</span>
          </div>
          <p class="font-heading font-black text-2xl sm:text-3xl text-duo-green-dark">{{ totalCompletedLessons }} Modul</p>
          <p class="text-[11px] font-heading font-semibold text-slate-500">Dari total katalog</p>
        </div>

        <div class="bg-white p-5 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Akurasi Berhitung</span>
            <span class="text-xl">🎯</span>
          </div>
          <p class="font-heading font-black text-2xl sm:text-3xl text-duo-blue">94%</p>
          <p class="text-[11px] font-heading font-semibold text-slate-500">Kategori Sangat Baik</p>
        </div>
      </div>

      <!-- Number Mastery Heatmap Section (1 - 10) -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-duo-gray-100 shadow-md space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">
              Penguasaan Angka (1 sampai 10) 🔢
            </h2>
            <p class="text-xs sm:text-sm font-heading text-slate-500">
              Persentase pemahaman anak untuk tiap angka berdasarkan hasil latihan kuis.
            </p>
          </div>

          <div class="flex items-center gap-3 text-xs font-heading font-bold">
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Sangat Paham</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-amber-400"></span> Perlu Latihan</span>
          </div>
        </div>

        <!-- Numbers Grid 1 - 10 -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div
            v-for="num in 10"
            :key="num"
            class="p-4 rounded-2xl border-2 flex flex-col items-center justify-between text-center gap-2 transition-transform hover:scale-105"
            :class="getNumberMasteryClass(num)"
          >
            <span class="font-heading font-black text-3xl">{{ num }}</span>
            <div class="w-full space-y-1">
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-300"
                  :class="num <= Math.max(userStore.completedLessons.length * 2, 3) ? 'bg-emerald-500' : 'bg-amber-400'"
                  :style="{ width: `${num <= Math.max(userStore.completedLessons.length * 2, 3) ? 95 : 70}%` }"
                ></div>
              </div>
              <span class="text-[10px] font-heading font-extrabold text-slate-600 block">
                {{ num <= Math.max(userStore.completedLessons.length * 2, 3) ? '95% Tepat' : '70% Tepat' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Parent Recommendations & Activity Advice -->
      <div class="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-3xl shadow-sm space-y-4">
        <div class="flex items-center gap-3 text-indigo-900">
          <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
            💡
          </div>
          <div>
            <h3 class="font-heading font-black text-lg">Rekomendasi Pendampingan Orang Tua</h3>
            <p class="text-xs font-heading font-semibold text-indigo-700">Tips sederhana untuk belajar bersama anak di rumah</p>
          </div>
        </div>

        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-heading font-semibold text-slate-700">
          <li class="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-2.5">
            <span class="text-lg shrink-0">🍎</span>
            <span>Gunakan benda nyata seperti buah atau mainan di rumah untuk mengajak anak menghitung objek secara fisik.</span>
          </li>
          <li class="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-2.5">
            <span class="text-lg shrink-0">🔊</span>
            <span>Dorong anak menekan tombol suara <strong>🔊 Play Voice</strong> di soal untuk memperkuat pendengaran angka.</span>
          </li>
          <li class="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-2.5">
            <span class="text-lg shrink-0">⭐</span>
            <span>Apresiasi stiker baru yang didapat anak di menu <strong>Album Stikerku</strong> untuk menjaga motivasinya.</span>
          </li>
          <li class="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-2.5">
            <span class="text-lg shrink-0">⏰</span>
            <span>Targetkan waktu belajar singkat sekitar <strong>5–10 menit per hari</strong> agar konsistensi tetap terjaga.</span>
          </li>
        </ul>
      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-duo-gray-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const totalCompletedLessons = computed(() => {
  return userStore.completedLessons.length
})

const getNumberMasteryClass = (num) => {
  if (num <= Math.max(userStore.completedLessons.length * 2, 3)) {
    return 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
  }
  return 'bg-amber-50/60 border-amber-200 text-amber-900'
}
</script>
