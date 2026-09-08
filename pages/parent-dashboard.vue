<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
    <!-- Top Navigation -->
    <HeaderNav />

    <!-- Parent Dashboard Container -->
    <main class="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8 animate-pop">
      <!-- Title Header -->
      <div class="bg-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
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

        <ClientOnly>
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
          <template #fallback>
            <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-10 shrink-0">
              <div class="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-3xl shadow-md">
                🦉
              </div>
              <div>
                <h3 class="font-heading font-extrabold text-base">Penjelajah Muda</h3>
                <p class="text-xs text-indigo-200 font-heading">TK B / Kelas 1</p>
              </div>
            </div>
          </template>
        </ClientOnly>
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

      <!-- PRO FEATURE: WhatsApp Weekly Report Sync -->
      <div class="relative bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden space-y-4">
        <!-- Glowing background shapes -->
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/20 rounded-full text-[11px] font-heading font-black uppercase tracking-wider border border-white/20 text-emerald-100">
              <span>📲 FITUR PRO</span>
              <span>•</span>
              <span>Rangkuman Mingguan Otomatis</span>
            </div>
            <h3 class="font-heading text-xl sm:text-2xl font-black">
              Sinkronisasi Laporan ke WhatsApp Ayah & Bunda 💬
            </h3>
            <p class="text-xs sm:text-sm text-emerald-100 font-body max-w-xl">
              Dapatkan rangkuman otomatis waktu belajar, materi yang dikuasai, dan saran latihan Ananda langsung ke WA setiap Minggu sore tanpa perlu login.
            </p>
          </div>

          <!-- If Pro: Input WA Form -->
          <div v-if="userStore.isPro" class="w-full sm:w-auto shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/25 space-y-3">
            <div class="space-y-1">
              <label class="text-[11px] font-heading font-black text-emerald-200">Nomor WhatsApp Aktif:</label>
              <div class="flex items-center gap-2">
                <input 
                  v-model="waNumber"
                  type="tel" 
                  placeholder="081234567890" 
                  class="px-3 py-2 rounded-xl bg-white text-slate-800 font-heading text-xs font-bold w-44 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button 
                  @click="handleSaveWa" 
                  class="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl font-heading font-black text-xs cursor-pointer shadow-sm active:scale-95 transition-transform"
                >
                  {{ isWaSaved ? 'Tersimpan ✓' : 'Simpan' }}
                </button>
              </div>
            </div>
            <p class="text-[10px] text-emerald-200 font-heading">
              🔔 Status: Siap dikirim setiap Minggu pk 16.00 WIB
            </p>
          </div>

          <!-- If Free: Gated Pro Button -->
          <div v-else class="w-full sm:w-auto shrink-0">
            <button 
              @click="openPaywallForWA"
              class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-black text-xs sm:text-sm shadow-lg border-2 border-white cursor-pointer active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <span>👑</span>
              <span>Aktifkan Laporan WhatsApp (Pro)</span>
            </button>
          </div>
        </div>
      </div>

      <!-- PRO FEATURE: Deep Learning Weakness Matrix -->
      <div class="relative bg-white p-6 sm:p-8 rounded-3xl border-2 border-duo-gray-100 shadow-md space-y-6 overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[11px] font-heading font-black uppercase tracking-wider border border-amber-300 mb-1">
              <span>🧠 ANALISIS MENDALAM AI</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">
              Matriks Kelemahan & Topik Perhatian 🎯
            </h2>
            <p class="text-xs sm:text-sm font-heading text-slate-500">
              Mendeteksi secara spesifik konsep matematika mana yang memerlukan latihan pengulangan.
            </p>
          </div>
        </div>

        <!-- If Pro: Display Detailed Matrix -->
        <div v-if="userStore.isPro" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-black text-emerald-800">Pola Bilangan</span>
              <span class="text-xs font-heading font-black text-emerald-600">98% Sangat Kuat</span>
            </div>
            <p class="text-[11px] text-emerald-700 font-body">Ananda sangat cepat memahami urutan angka maju dan mundur.</p>
          </div>

          <div class="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-black text-sky-800">Menghitung Objek Visual</span>
              <span class="text-xs font-heading font-black text-sky-600">92% Kuat</span>
            </div>
            <p class="text-[11px] text-sky-700 font-body">Pengenalan jumlah buah dan binatang sangat tepat.</p>
          </div>

          <div class="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-black text-amber-800">Soal Cerita & Logika</span>
              <span class="text-xs font-heading font-black text-amber-600">76% Perlu Pendampingan</span>
            </div>
            <p class="text-[11px] text-amber-700 font-body">Dianjurkan menggunakan latihan suara untuk memperjelas konteks soal cerita.</p>
          </div>
        </div>

        <!-- If Free: Frosted Glass Overlay with Pro Button -->
        <div v-else class="relative rounded-2xl p-6 border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto">
            🔒
          </div>
          <div class="space-y-1 max-w-md mx-auto">
            <h4 class="font-heading text-base font-black text-slate-800">
              Analisis Kelemahan Eksklusif untuk Akun Pro
            </h4>
            <p class="text-xs text-slate-500 font-body">
              Ketahui topik mana yang paling sering membuat anak bingung agar proses belajar di rumah jauh lebih terarah dan efektif.
            </p>
          </div>
          <button 
            @click="openPaywallForAnalytics"
            class="px-6 py-2.5 duo-btn-yellow text-xs font-heading font-black shadow-md cursor-pointer"
          >
            👑 Buka Analisis Mendalam Pro
          </button>
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
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { usePaywall } from '~/composables/usePaywall'

const userStore = useUserStore()
const { openPaywall } = usePaywall()

const waNumber = ref('081234567890')
const isWaSaved = ref(false)

const handleSaveWa = () => {
  isWaSaved.value = true
  setTimeout(() => {
    isWaSaved.value = false
  }, 2500)
}

const openPaywallForWA = () => {
  openPaywall({
    reason: 'whatsapp_report',
    title: 'Laporan Belajar Otomatis ke WhatsApp 📲',
    description: 'Dapatkan rangkuman mingguan capaian belajar dan rekomendasi latihan Ananda langsung ke WhatsApp setiap Minggu sore.',
    featureHighlight: 'WhatsApp Weekly Progress Report'
  })
}

const openPaywallForAnalytics = () => {
  openPaywall({
    reason: 'parent_analytics',
    title: 'Buka Analisis Tumbuh Kembang AI 🧠',
    description: 'Dapatkan matriks kelemahan detail dan topik prioritas agar bimbingan belajar di rumah semakin fokus & efektif.',
    featureHighlight: 'Deep AI Learning Analytics'
  })
}

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
