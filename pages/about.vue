<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-[#58cc02] selection:text-white">
    <!-- Header Navigasi -->
    <AppTopBar v-if="userStore.isAuthenticated || isAppSubdomain" />
    <LandingHeader v-else />

    <main id="main-content" class="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      <!-- ===================================================================== -->
      <!-- 1. HERO SECTION (BERSIH, RAMAH, TANPA GRADIENT)                        -->
      <!-- ===================================================================== -->
      <section class="text-center space-y-4 pt-4 sm:pt-8" aria-label="Hero Tentang Pintara">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-heading font-black text-xs">
          <span>🦉</span>
          <span>Tentang Pintara</span>
        </div>

        <h1 class="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Belajar Ceria, Tumbuh Percaya Diri
        </h1>

        <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Pintara hadir untuk mengubah waktu layar <em>(screen time)</em> anak menjadi petualangan belajar yang bermakna. Anak tidak sekadar menghafal, tetapi diajak mencoba, memecahkan masalah, dan memahami konsep dasar secara mandiri.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-3">
          <NuxtLink 
            to="/catalog" 
            class="px-6 py-3 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm border-b-4 border-[#3b8a02] shadow-sm active:scale-95 transition-all"
          >
            🚀 Jelajahi Katalog Belajar
          </NuxtLink>
          <NuxtLink 
            to="/pricing" 
            class="px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 rounded-2xl font-heading font-black text-sm shadow-2xs active:scale-95 transition-all"
          >
            👑 Paket Pintara Pro
          </NuxtLink>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 2. TIGA NILAI UTAMA PINTARA                                           -->
      <!-- ===================================================================== -->
      <section class="space-y-6" aria-label="Tiga Nilai Utama">
        <div class="text-center space-y-1">
          <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-800">
            Mengapa Memilih Pintara?
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">
            Tiga prinsip dasar dalam merancang setiap materi untuk anak usia 4–9 tahun.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Card 1 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-black">
              ⏱️
            </div>
            <h3 class="font-heading font-black text-base text-slate-800">
              Sesi Singkat 5–10 Menit
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              Disusun dalam format pelajaran mikro agar sesuai dengan rentang konsentrasi anak usia dini, sehingga belajar terasa ringan dan tidak melelahkan.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl font-black">
              🛡️
            </div>
            <h3 class="font-heading font-black text-base text-slate-800">
              100% Bebas Iklan & Aman
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              Tanpa iklan pihak ketiga, tanpa pop-up yang mengecoh, dan tanpa konten di luar materi edukasi. Ruang bermain yang sepenuhnya aman untuk anak.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-black">
              🔊
            </div>
            <h3 class="font-heading font-black text-base text-slate-800">
              Narasi Audio Bahasa Indonesia
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              Setiap soal dilengkapi panduan suara berbahasa Indonesia yang jelas, membantu anak yang belum lancar membaca untuk belajar secara mandiri.
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 3. KURIKULUM SESUAI JENJANG                                           -->
      <!-- ===================================================================== -->
      <section class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-sm space-y-6" aria-label="Jenjang Kurikulum">
        <div class="space-y-1 text-center sm:text-left">
          <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-heading font-black text-[11px] uppercase tracking-wider">
            Kurikulum Terarah
          </span>
          <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-800">
            Disesuaikan dengan Tahap Tumbuh Kembang
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">
            Materi berjenjang mulai dari pengenalan awal hingga pemahaman logika dasar.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="inline-block px-2.5 py-0.5 bg-emerald-500 text-white rounded-lg font-heading font-black text-[11px]">
              PAUD (4–5 Tahun)
            </div>
            <h4 class="font-heading font-bold text-sm text-slate-800">Pengenalan & Motorik</h4>
            <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Mengenal bentuk & warna</li>
              <li>Menghitung benda 1–5</li>
              <li>Menebalkan garis dan angka</li>
            </ul>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="inline-block px-2.5 py-0.5 bg-sky-500 text-white rounded-lg font-heading font-black text-[11px]">
              TK A & B (5–6 Tahun)
            </div>
            <h4 class="font-heading font-bold text-sm text-slate-800">Fondasi Calistung</h4>
            <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Mengenal angka 1–20</li>
              <li>Penjumlahan visual sederhana</li>
              <li>Mengenal huruf dan suku kata</li>
            </ul>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div class="inline-block px-2.5 py-0.5 bg-amber-500 text-slate-950 rounded-lg font-heading font-black text-[11px]">
              SD Awal (7–9 Tahun)
            </div>
            <h4 class="font-heading font-bold text-sm text-slate-800">Logika & Pemecahan Masalah</h4>
            <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Operasi hitung penjumlahan & pengurangan</li>
              <li>Pola deret angka & teka-teki logika</li>
              <li>Sains alam & dunia sekitar</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 4. SAHABAT BELAJAR ANAK                                               -->
      <!-- ===================================================================== -->
      <section class="space-y-6" aria-label="Sahabat Belajar">
        <div class="text-center space-y-1">
          <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-800">
            Karakter Sahabat Belajar
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">
            Menemani anak sepanjang jalur petualangan dengan dorongan positif.
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white rounded-2xl p-4 border-2 border-slate-200 text-center space-y-1.5 shadow-2xs">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl">
              🦉
            </div>
            <h4 class="font-heading font-black text-sm text-slate-800">Kiko</h4>
            <p class="text-[11px] text-slate-500">Pemandu petualangan yang ramah dan bijak</p>
          </div>

          <div class="bg-white rounded-2xl p-4 border-2 border-slate-200 text-center space-y-1.5 shadow-2xs">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-orange-100 border border-orange-300 flex items-center justify-center text-2xl">
              🦁
            </div>
            <h4 class="font-heading font-black text-sm text-slate-800">Leo</h4>
            <p class="text-[11px] text-slate-500">Pemberi semangat berhitung dan tantangan</p>
          </div>

          <div class="bg-white rounded-2xl p-4 border-2 border-slate-200 text-center space-y-1.5 shadow-2xs">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-2xl">
              🐰
            </div>
            <h4 class="font-heading font-black text-sm text-slate-800">Mimi</h4>
            <p class="text-[11px] text-slate-500">Teman cerita dan latihan membaca ceria</p>
          </div>

          <div class="bg-white rounded-2xl p-4 border-2 border-slate-200 text-center space-y-1.5 shadow-2xs">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl">
              🐼
            </div>
            <h4 class="font-heading font-black text-sm text-slate-800">Bao</h4>
            <p class="text-[11px] text-slate-500">Penjelajah sains, warna, dan flora fauna</p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 5. PERTANYAAN SERING DIAJUKAN (FAQ)                                   -->
      <!-- ===================================================================== -->
      <section class="max-w-3xl mx-auto space-y-4" aria-label="FAQ">
        <div class="text-center space-y-1 pb-2">
          <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-800">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p class="text-xs sm:text-sm text-slate-500">
            Informasi penting yang sering ditanyakan para orang tua.
          </p>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white rounded-2xl border-2 border-slate-200 shadow-2xs overflow-hidden"
          >
            <button 
              @click="faq.open = !faq.open"
              type="button"
              class="w-full p-4 text-left font-heading font-black text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span>{{ faq.question }}</span>
              <span class="text-slate-400 font-bold shrink-0 text-sm">
                {{ faq.open ? '−' : '+' }}
              </span>
            </button>
            <div v-if="faq.open" class="px-4 pb-4 text-xs sm:text-sm text-slate-600 font-body leading-relaxed border-t border-slate-100 pt-3">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 6. AJAKAN BELAJAR (CLEAN SOLID BANNER, NO GRADIENT)                   -->
      <!-- ===================================================================== -->
      <section class="bg-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-md" aria-label="Ajakan Belajar">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black">
          🚀
        </div>
        <h2 class="font-heading text-2xl sm:text-3xl font-black tracking-tight">
          Ajak Si Kecil Mencoba Hari Ini
        </h2>
        <p class="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Mulai dengan modul gratis tanpa perlu kartu kredit. Lihat bagaimana si kecil menikmati proses belajarnya.
        </p>
        <div class="pt-2">
          <NuxtLink 
            to="/catalog" 
            class="inline-block px-6 py-3 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm border-b-4 border-[#3b8a02] shadow-sm active:scale-95 transition-all"
          >
            Mulai Belajar Sekarang ➔
          </NuxtLink>
        </div>
      </section>

    </main>

    <!-- Footer Bersih -->
    <footer class="bg-white border-t border-slate-200 py-8 font-heading text-xs text-slate-500 mt-12">
      <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div class="flex items-center gap-2 font-black text-slate-800 text-sm">
          <span>🦉</span>
          <span>Pintara</span>
          <span class="text-slate-400 font-normal text-xs">• Platform Edukasi Ceria Anak Indonesia</span>
        </div>
        <div class="flex items-center gap-4 text-xs font-bold">
          <NuxtLink to="/catalog" class="hover:text-slate-800">Katalog</NuxtLink>
          <NuxtLink to="/pricing" class="hover:text-slate-800">Paket Pro</NuxtLink>
          <NuxtLink to="/parent-dashboard" class="hover:text-slate-800">Area Ortu</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAppDomain } from '~/composables/useAppDomain'

const userStore = useUserStore()
const { isAppSubdomain } = useAppDomain()

useSeoMeta({
  title: 'Tentang Pintara — Platform Belajar Ceria & Interaktif Anak',
  description: 'Pintara adalah platform pembelajaran anak usia dini dan SD awal dengan metode micro-learning 5-10 menit, narasi audio Indonesia, dan 100% aman tanpa iklan.',
  ogTitle: 'Tentang Pintara — Belajar Ceria, Tumbuh Percaya Diri',
  ogDescription: 'Platform edukasi gamifikasi ramah anak usia 4–9 tahun di Indonesia. Aman, interaktif, dan terarah.'
})

// FAQ Items
const faqs = ref([
  {
    question: 'Untuk rentang usia berapa Pintara dirancang?',
    answer: 'Pintara dirancang khusus untuk anak usia dini (PAUD, TK A, TK B) hingga sekolah dasar awal (Kelas 1–3), yakni rentang usia 4 hingga 9 tahun.',
    open: true
  },
  {
    question: 'Apakah Pintara aman dan bebas dari iklan komersial?',
    answer: 'Ya, 100% aman. Pintara tidak memuat iklan luar atau pop-up komersial yang mengganggu konsentrasi belajar dan keselamatan anak.',
    open: false
  },
  {
    question: 'Apakah anak perlu bisa membaca lancar untuk menggunakannya?',
    answer: 'Tidak wajib. Setiap instruksi dan soal dilengkapi dengan tombol narasi audio suara berbahasa Indonesia, sehingga anak yang baru belajar membaca tetap bisa belajar secara mandiri.',
    open: false
  },
  {
    question: 'Bagaimana cara orang tua memantau perkembangan belajar anak?',
    answer: 'Orang tua dapat memantau capaian belajar, modul yang telah diselesaikan, serta akumulasi bintang XP anak melalui halaman modul maupun dashboard orang tua.',
    open: false
  }
])
</script>
