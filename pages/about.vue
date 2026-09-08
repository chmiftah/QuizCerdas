<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <main id="main-content" class="flex-1 space-y-16 sm:space-y-24 py-8 sm:py-12 safe-mobile-padding">
      
      <!-- 1. HERO SECTION (SIMPLIFIED, CLEAN & COMPACT) -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Hero Section Tentang Kami">
        <div class="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-indigo-400/20">
          <!-- Background Decorative Glows -->
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-duo-green/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-duo-blue/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-heading font-extrabold text-amber-300 border border-white/20">
              <span>🦉 Tentang CountingDuo</span>
            </div>

            <h1 class="font-heading text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Membangun Generasi Cerdas Lewat Belajar yang <span class="text-emerald-400">Menyenangkan</span> ✨
            </h1>

            <p class="text-sm sm:text-base text-indigo-100 leading-relaxed font-medium">
              Mengubah waktu layar anak menjadi petualangan belajar kuis interaktif yang seru, edukatif, mandiri, dan 100% aman tanpa iklan.
            </p>

            <!-- Quick Key Highlights Pills -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <a href="#daftar-29-soal" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xs border border-white/15 text-xs font-heading font-bold text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                <span>🎯</span> 29 Tipe Soal ➔
              </a>
              <span class="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-heading font-bold text-sky-200 flex items-center gap-1.5">
                <span>🎤</span> Suara Bahasa Indonesia
              </span>
              <span class="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-heading font-bold text-amber-200 flex items-center gap-1.5">
                <span>🛡️</span> 100% Ramah Anak
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. STATISTIK & PENCAPAIAN KAMI -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Statistik Dampak Edukasi">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-white rounded-3xl p-6 border-3 border-emerald-100 shadow-sm text-center space-y-1.5 hover:border-emerald-300 hover:shadow-md transition-all">
            <span class="text-3xl sm:text-4xl block">🎮</span>
            <div class="font-heading text-3xl sm:text-4xl font-black text-emerald-600">29+</div>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">Tipe Soal Interaktif</p>
            <p class="text-[11px] text-slate-400">Variasi gameplay terlengkap untuk anak</p>
          </div>

          <div class="bg-white rounded-3xl p-6 border-3 border-sky-100 shadow-sm text-center space-y-1.5 hover:border-sky-300 hover:shadow-md transition-all">
            <span class="text-3xl sm:text-4xl block">👨‍👩‍👧‍👦</span>
            <div class="font-heading text-3xl sm:text-4xl font-black text-sky-600">10.000+</div>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">Keluarga Pengguna</p>
            <p class="text-[11px] text-slate-400">Tersebar di berbagai penjuru Nusantara</p>
          </div>

          <div class="bg-white rounded-3xl p-6 border-3 border-amber-100 shadow-sm text-center space-y-1.5 hover:border-amber-300 hover:shadow-md transition-all">
            <span class="text-3xl sm:text-4xl block">📈</span>
            <div class="font-heading text-3xl sm:text-4xl font-black text-amber-600">95%</div>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">Kenaikan Motivasi</p>
            <p class="text-[11px] text-slate-400">Anak belajar mandiri dalam 2 minggu</p>
          </div>

          <div class="bg-white rounded-3xl p-6 border-3 border-purple-100 shadow-sm text-center space-y-1.5 hover:border-purple-300 hover:shadow-md transition-all">
            <span class="text-3xl sm:text-4xl block">💝</span>
            <div class="font-heading text-3xl sm:text-4xl font-black text-purple-600">100%</div>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-700">Gratis & Bebas Iklan</p>
            <p class="text-[11px] text-slate-400">Fokus pada kenyamanan & keamanan anak</p>
          </div>
        </div>
      </section>

      <!-- 3. VISI & MISI KAMI -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Visi dan Misi">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <!-- Visi Card -->
          <div class="bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-10 border-3 border-slate-200 shadow-sm space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl shadow-xs">
                🔭
              </div>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider">
                Visi Kami
              </span>
              <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 leading-snug">
                Demokratisasi Pembelajaran Usia Dini yang Memikat & Berkualitas Tinggi
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                Menjadi platform pendidikan anak usia dini dan sekolah dasar nomor satu di Indonesia yang menghubungkan keseruan bermain (*gamification*) dengan kurikulum berbasis sains, matematika, dan literasi yang bermakna tanpa batasan biaya.
              </p>
            </div>
            <div class="pt-4 border-t border-slate-100 text-xs font-heading font-bold text-emerald-700 flex items-center gap-1.5">
              <span>🌟</span>
              <span>Setiap anak berhak mendapatkan media belajar terbaik.</span>
            </div>
          </div>

          <!-- Misi Card -->
          <div class="bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-10 border-3 border-slate-200 shadow-sm space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl shadow-xs">
                🚀
              </div>
              <span class="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider">
                Misi Kami
              </span>
              <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 leading-snug">
                4 Langkah Nyata Mewujudkan Pendidikan Menyenangkan
              </h2>
              <ul class="space-y-3 text-xs sm:text-sm text-slate-600 font-body">
                <li class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span><strong>Mengembangkan Ragam Soal Interaktif:</strong> Menghadirkan 29 jenis kuis dari logika berhitung, labirin angka, timbangan neraca, hingga membaca nyaring dengan AI suara.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span><strong>Membangun Kebiasaan Positif:</strong> Menggunakan siklus psikologi belajar gamifikasi (streak harian, perolehan XP, toko hadiah virtual).</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span><strong>Lingkungan Bebas Distraksi:</strong> Menjaga aplikasi tetap 100% bebas dari iklan komersial luar demi keselamatan anak.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span><strong>Kolaborasi Bersama Orang Tua:</strong> Dashboard analitik transparan untuk memantau kemajuan belajar anak secara realtime.</span>
                </li>
              </ul>
            </div>
            <div class="pt-4 border-t border-slate-100 text-xs font-heading font-bold text-indigo-700 flex items-center gap-1.5">
              <span>🤝</span>
              <span>Menjembatani peran anak, orang tua, dan guru.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. KARAKTER & MASKOT KAMI -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Karakter dan Sahabat Belajar">
        <div class="space-y-8">
          <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-extrabold text-xs">
              🐾 Karakter Sahabat Belajar
            </span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-slate-800">
              Kenali Teman-Teman Petualanganmu!
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Belajar tidak pernah sendirian. Setiap modul didampingi oleh karakter ceria yang siap memberikan semangat, petunjuk, dan perayaan!
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Kiko The Owl -->
            <div class="bg-white rounded-3xl p-6 border-3 border-emerald-200 shadow-sm flex flex-col items-center text-center space-y-4 group hover:scale-[1.03] transition-transform">
              <div class="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-5xl shadow-sm group-hover:rotate-6 transition-transform">
                🦉
              </div>
              <div class="space-y-1">
                <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-heading font-extrabold uppercase">
                  Maskot Utama
                </span>
                <h3 class="font-heading text-xl font-black text-slate-800">Kiko si Burung Hantu</h3>
                <p class="text-xs font-heading font-semibold text-emerald-700">Pemandu Logika & Berhitung</p>
              </div>
              <p class="text-xs text-slate-600 font-body leading-relaxed">
                Kiko sangat bijaksana dan teliti. Dia selalu siap membisikkan tombol "💡 Petunjuk Kiko" jika kamu menemui soal yang menantang!
              </p>
            </div>

            <!-- Leo The Lion -->
            <div class="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-sm flex flex-col items-center text-center space-y-4 group hover:scale-[1.03] transition-transform">
              <div class="w-24 h-24 rounded-3xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-5xl shadow-sm group-hover:-rotate-6 transition-transform">
                🦁
              </div>
              <div class="space-y-1">
                <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-heading font-extrabold uppercase">
                  Petualang Alam
                </span>
                <h3 class="font-heading text-xl font-black text-slate-800">Leo si Singa Berani</h3>
                <p class="text-xs font-heading font-semibold text-amber-700">Pemandu Sains & Hewan</p>
              </div>
              <p class="text-xs text-slate-600 font-body leading-relaxed">
                Penuh rasa ingin tahu tentang alam semesta, binatang di hutan, dan kehidupan laut. Leo mengajak anak berani mengeksplorasi ilmu sains!
              </p>
            </div>

            <!-- Mimi The Cat -->
            <div class="bg-white rounded-3xl p-6 border-3 border-sky-200 shadow-sm flex flex-col items-center text-center space-y-4 group hover:scale-[1.03] transition-transform">
              <div class="w-24 h-24 rounded-3xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center text-5xl shadow-sm group-hover:rotate-6 transition-transform">
                🐱
              </div>
              <div class="space-y-1">
                <span class="px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full text-[10px] font-heading font-extrabold uppercase">
                  Pencinta Bahasa
                </span>
                <h3 class="font-heading text-xl font-black text-slate-800">Mimi si Kucing Ceria</h3>
                <p class="text-xs font-heading font-semibold text-sky-700">Pemandu Membaca & Kata</p>
              </div>
              <p class="text-xs text-slate-600 font-body leading-relaxed">
                Mimi hobi bercerita dan melafalkan kata-kata baru. Dia selalu bertepuk tangan gembira saat mendengar bacaan nyaring anak-anak!
              </p>
            </div>

            <!-- Bao The Panda -->
            <div class="bg-white rounded-3xl p-6 border-3 border-purple-200 shadow-sm flex flex-col items-center text-center space-y-4 group hover:scale-[1.03] transition-transform">
              <div class="w-24 h-24 rounded-3xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-5xl shadow-sm group-hover:-rotate-6 transition-transform">
                🐼
              </div>
              <div class="space-y-1">
                <span class="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-[10px] font-heading font-extrabold uppercase">
                  Master Puzzle
                </span>
                <h3 class="font-heading text-xl font-black text-slate-800">Bao si Panda Tenang</h3>
                <p class="text-xs font-heading font-semibold text-purple-700">Pemandu Bentuk & Jam</p>
              </div>
              <p class="text-xs text-slate-600 font-body leading-relaxed">
                Sabar dan telaten, Bao melatih fokus anak saat menyusun potongan puzzle, membaca jarum jam analog, dan mengenali bangun geometri!
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. EKSPLORASI DETAIL 29 JENIS SOAL INTERAKTIF [FITUR UTAMA] -->
      <section id="daftar-29-soal" class="max-w-6xl mx-auto px-4 space-y-10" aria-label="29 Jenis Soal Interaktif Lengkap">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-heading font-extrabold text-xs shadow-2xs">
            <span>🎯 Kurikulum Gamifikasi Terlengkap</span>
          </div>
          <h2 class="font-heading text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Eksplorasi 29 Jenis Soal Interaktif
          </h2>
          <p class="text-slate-600 text-sm sm:text-base font-body leading-relaxed">
            Tidak ada lagi anak yang bosan dengan soal pilihan ganda monoton. CountingDuo menyajikan 29 mekanisme permainan kuis yang merangsang kecerdasan kinestetik, visual, auditori, logika matematika, dan literasi membaca.
          </p>
        </div>

        <!-- Filter Tabs & Search Bar Strip -->
        <div class="bg-white p-4 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <!-- Category Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 text-xs font-heading font-extrabold">
              <button 
                v-for="cat in exerciseCategories" 
                :key="cat.id"
                @click="activeQuestionCategory = cat.id"
                type="button"
                class="px-4 py-2 rounded-2xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                :class="activeQuestionCategory === cat.id ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ cat.name }}</span>
                <span class="px-1.5 py-0.5 rounded-full text-[10px]" :class="activeQuestionCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'">
                  {{ cat.count }}
                </span>
              </button>
            </div>

            <!-- Search Question Filter -->
            <div class="relative w-full md:w-72">
              <input 
                v-model="searchQuestionQuery"
                type="text" 
                placeholder="Cari tipe soal, kata kunci..."
                class="w-full pl-9 pr-4 py-2 rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs font-heading font-bold text-slate-800 focus:bg-white focus:border-purple-500 outline-none transition-all"
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <button 
                v-if="searchQuestionQuery" 
                @click="searchQuestionQuery = ''" 
                type="button" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Result Count Indicator -->
          <div class="text-xs font-heading font-bold text-slate-500 flex items-center justify-between border-t border-slate-100 pt-3">
            <span>Menampilkan {{ filteredExerciseTypes.length }} dari 29 Jenis Soal</span>
            <span v-if="searchQuestionQuery" class="text-purple-600">
              Filter pencarian: "{{ searchQuestionQuery }}"
            </span>
          </div>
        </div>

        <!-- 29 Types Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="item in filteredExerciseTypes" 
            :key="item.id"
            class="bg-white rounded-3xl p-6 border-3 border-slate-200 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <!-- Card Top Row: Number, Icon, & Category Tag -->
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-3">
                  <span class="w-12 h-12 rounded-2xl bg-purple-50 border-2 border-purple-100 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    {{ item.icon }}
                  </span>
                  <div>
                    <span class="font-heading font-black text-xs text-purple-600">#{{ item.number }}</span>
                    <h3 class="font-heading font-black text-base sm:text-lg text-slate-800 leading-tight">
                      {{ item.name }}
                    </h3>
                  </div>
                </div>

                <span class="px-2.5 py-1 rounded-xl text-[10px] font-heading font-black uppercase border shrink-0" :class="item.badgeClass">
                  {{ item.categoryName }}
                </span>
              </div>

              <!-- Skill Badge -->
              <div class="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span class="text-amber-500">✨</span>
                <span class="truncate"><strong>Fokus:</strong> {{ item.skill }}</span>
              </div>

              <!-- How Kids Play / Description -->
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Real Example Box -->
              <div class="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1">
                <span class="text-[10px] font-heading font-black uppercase text-purple-800 block">
                  💡 Contoh Format Soal:
                </span>
                <p class="text-xs font-heading font-semibold text-purple-950 italic">
                  "{{ item.example }}"
                </p>
              </div>
            </div>

            <!-- Card Bottom Action: Link to Try in Catalog -->
            <div class="pt-3 border-t border-slate-100">
              <NuxtLink 
                to="/catalog" 
                class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-700 text-xs font-heading font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer group-hover:bg-purple-600 group-hover:text-white"
              >
                <span>Coba Mainkan di Katalog Modul</span>
                <span>➔</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <!-- 6. NILAI UNGGULAN KAMI -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Keunggulan CountingDuo">
        <div class="bg-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 border-3 border-slate-200 shadow-sm space-y-10">
          <div class="text-center max-w-2xl mx-auto space-y-3">
            <span class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-heading font-extrabold text-xs uppercase">
              Mengapa CountingDuo Berbeda?
            </span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-slate-800">
              Standar Edukasi Digital Modern untuk Anak
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Kami merancang setiap aspek aplikasi dengan memperhatikan psikologi perkembangan kognitif anak usia emas (4–9 tahun).
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div class="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-duo-green transition-colors">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                🧠
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Spaced Repetition & Micro-Learning</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Pelajaran disajikan dalam sesi singkat 5–10 menit per hari yang mengulang konsep secara cerdas agar materi melekat erat di memori jangka panjang anak.
              </p>
            </div>

            <div class="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-duo-blue transition-colors">
              <div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl">
                🎤
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Teknologi Speech Recognition Interaktif</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Anak tidak hanya mengetuk layar, tetapi juga berbicara dan membaca nyaring dengan evaluasi suara otomatis bahasa Indonesia secara langsung.
              </p>
            </div>

            <div class="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors">
              <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                🛡️
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Keamanan Privasi & Data Keluarga</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Tidak ada data anak yang dijual ke pihak ketiga. Tanpa tautan eksternal yang mencurigakan dan sistem login terenkripsi berstandar industri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. CALL TO ACTION BANNER -->
      <section class="max-w-6xl mx-auto px-4 text-center" aria-label="Mulai Belajar Sekarang">
        <div class="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 text-white shadow-xl space-y-6 relative overflow-hidden">
          <div class="relative z-10 max-w-2xl mx-auto space-y-4">
            <span class="px-3.5 py-1 bg-white/20 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider">
              Ayo Bergabung Bersama Kami
            </span>
            <h2 class="font-heading text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Mulai Petualangan Belajar Anak Hari Ini! 🚀
            </h2>
            <p class="text-emerald-100 text-sm sm:text-base font-body leading-relaxed">
              Bergabunglah dengan ribuan orang tua cerdas di Indonesia. Daftarkan akun gratis dalam 1 menit dan rasakan perbedaannya!
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <NuxtLink 
                to="/register" 
                class="w-full sm:w-auto px-8 py-4 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-heading font-black text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                id="btn-about-register"
              >
                <span>🌟 Daftar Gratis Sekarang</span>
                <span>➔</span>
              </NuxtLink>

              <NuxtLink 
                to="/catalog" 
                class="w-full sm:w-auto px-7 py-4 bg-emerald-900/40 hover:bg-emerald-900/60 border-2 border-white/30 text-white rounded-2xl font-heading font-black text-base shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                id="btn-about-catalog"
              >
                <span>📚 Jelajahi Katalog Modul</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="bg-slate-900 text-slate-400 py-12 px-4 text-xs font-heading border-t border-slate-800">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-duo-green flex items-center justify-center text-white text-base">
              🦉
            </div>
            <span class="text-white font-extrabold text-lg">CountingDuo</span>
          </div>
          <p class="text-slate-400 text-xs font-body leading-relaxed">
            Platform pembelajaran gamifikasi gratis untuk anak SD & TK. Meliputi Matematika, Sains, Bahasa Indonesia, dan Seni Interaktif.
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Navigasi Utama</p>
          <ul class="space-y-1">
            <li><NuxtLink to="/" class="hover:text-white transition-colors">🏠 Beranda Utama</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">📚 Katalog Modul</NuxtLink></li>
            <li><NuxtLink to="/leaderboard" class="hover:text-white transition-colors">🏆 Liga & Misi</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-white font-bold">ℹ️ Tentang Kami</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Fitur & Aktivitas</p>
          <ul class="space-y-1">
            <li><NuxtLink to="/tracing" class="hover:text-white transition-colors">✏️ Menulis & Tracing</NuxtLink></li>
            <li><NuxtLink to="/coloring" class="hover:text-white transition-colors">🎨 Mewarnai Ceria</NuxtLink></li>
            <li><NuxtLink to="/games/bubble-pop" class="hover:text-white transition-colors">🎈 Balon Angka</NuxtLink></li>
            <li><NuxtLink to="/parent-dashboard" class="hover:text-white transition-colors">📊 Area Orang Tua</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">CountingDuo Indonesia</p>
          <p class="text-slate-400 font-body">Dibuat dengan ❤️ untuk seluruh anak dan pendidik di Indonesia.</p>
          <p class="text-slate-500 text-[11px] pt-1">© 2026 CountingDuo. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Tentang Kami & 29 Tipe Soal Interaktif - CountingDuo',
  meta: [
    {
      name: 'description',
      content: 'Kenali visi, misi, dan daftar lengkap 29 tipe soal kuis interaktif CountingDuo untuk anak usia 4-9 tahun: hitung visual, puzzle, tracing, baca jam, labirin angka, timbangan seimbang, mewarnai, hingga membaca nyaring dengan AI suara.'
    },
    { property: 'og:title', content: 'Tentang Kami & 29 Jenis Soal Interaktif - CountingDuo' },
    { property: 'og:description', content: 'Belajar berhitung, sains, dan membaca nyaring dengan 29 ragam gameplay edukatif bersama Kiko si Burung Hantu.' },
    { property: 'og:type', content: 'website' }
  ]
})

// Categories filter
const exerciseCategories = [
  { id: 'all', name: 'Semua Soal', icon: '⭐', count: 29 },
  { id: 'math', name: 'Angka & Hitung', icon: '🔢', count: 8 },
  { id: 'visual', name: 'Visual & Gambar', icon: '🎨', count: 7 },
  { id: 'logic', name: 'Logika & Pola', icon: '🧩', count: 8 },
  { id: 'language', name: 'Bahasa & Audio', icon: '🔤', count: 6 }
]

const activeQuestionCategory = ref('all')
const searchQuestionQuery = ref('')

// Complete Database of 29 Interactive Question Types
const allExerciseTypes = [
  // 1. Angka & Berhitung (7 Jenis)
  {
    number: 1,
    id: 'multiple_choice',
    name: 'Pilihan Ganda',
    icon: '🔘',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Pengenalan Konsep & Jumlah Objek',
    description: 'Format klasik yang interaktif. Anak memilih 1 dari 4 pilihan kartu angka/jawaban dengan efek suara ceria dan animasi pop saat ditekan.',
    example: 'Ada berapa buah apel di gambar? (Pilihan: 1, 2, 3, 4)'
  },
  {
    number: 2,
    id: 'count_select',
    name: 'Hitung & Sentuh Objek',
    icon: '🔢',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Keterampilan Menghitung Kinestetik',
    description: 'Anak mengetuk objek buah atau bintang di layar satu per satu (terdengar suara hitungan 1, 2, 3 secara audio) sebelum memilih kartu angka total yang sesuai.',
    example: 'Sentuh setiap bintang emas di layar lalu tentukan jumlah keseluruhannya!'
  },
  {
    number: 3,
    id: 'fill_in_blank',
    name: 'Isian Singkat',
    icon: '✍️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Mengetik & Input Angka Mandiri',
    description: 'Melatih anak mengetik mandiri. Mengetikkan jawaban angka atau kata pendek pada kotak input tanpa bantuan opsi kartu pilihan.',
    example: '2 + 3 = [ ... ] (Ketikkan angka 5 pada kolom isian)'
  },
  {
    number: 4,
    id: 'fill_missing_number',
    name: 'Deret Angka Hilang',
    icon: '❓',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Kelancaran Urutan Angka (Forward Counting)',
    description: 'Menemukan angka yang hilang di tengah atau akhir barisan deret hitung urut bertahap.',
    example: 'Lengkapi deret berikut: 1, 2, [ ? ], 4, 5'
  },
  {
    number: 5,
    id: 'comparison',
    name: 'Perbandingan Kuantitas',
    icon: '⚖️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Estimasi Nilai Lebih Banyak / Sedikit',
    description: 'Menyandingkan dua kelompok benda bersebelahan untuk melatih pemahaman visual konsep "lebih banyak", "lebih sedikit", atau "sama dengan".',
    example: 'Kelompok mana yang memiliki buah jeruk lebih banyak? (Kelompok A atau B)'
  },
  {
    number: 6,
    id: 'number_tracing',
    name: 'Tebalkan Garis Angka',
    icon: '✏️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Motorik Halus Menulis (Penmanship)',
    description: 'Kanvas interaktif untuk anak menjiplak dan menggoreskan garis jari mengikuti jalur putus-putus bentuk angka 1 sampai 10.',
    example: 'Tebalkan garis putus-putus untuk menulis angka 5 secara rapi!'
  },
  {
    number: 7,
    id: 'time_reading',
    name: 'Membaca Jam Analog',
    icon: '⏰',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Literasi Waktu & Jam Dinding',
    description: 'Menampilkan jam analog dengan jarum jam pendek dan jarum menit panjang. Melatih anak memahami waktu dan jadwal harian secara praktis.',
    example: 'Jarum pendek di angka 3 dan jarum panjang di angka 12, jam berapa ini? (03:00)'
  },

  // 2. Visual & Observasi (6 Jenis)
  {
    number: 8,
    id: 'shadow_matching',
    name: 'Cocokkan Siluet Bayangan',
    icon: '👥',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Diskriminasi Visual & Persepsi Bentuk',
    description: 'Anak mengamati siluet bayangan hitam dan mencocokkannya dengan karakter atau gambar hewan berwarna yang pas.',
    example: 'Pilih hewan mana yang memiliki siluet bayangan seperti di atas!'
  },
  {
    number: 9,
    id: 'seek_find',
    name: 'Cari & Temukan Objek',
    icon: '🔎',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Fokus, Konsentrasi & Ketelitian',
    description: 'Ilustrasi pemandangan interaktif tempat anak harus mencari dan mengetuk objek tertentu yang tersembunyi di taman atau ruangan.',
    example: 'Temukan 2 ekor kupu-kupu yang bersembunyi di taman bunga!'
  },
  {
    number: 10,
    id: 'hotspot',
    name: 'Klik Area Bagian Tubuh/Benda',
    icon: '🎯',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Identifikasi Anatomi & Komponen Objek',
    description: 'Anak menyentuh titik area koordinat tertentu pada gambar diagram (misal: bagian kepala hewan atau roda kendaraan).',
    example: 'Klik pada area kepala anjing di gambar!'
  },
  {
    number: 11,
    id: 'true_false_image',
    name: 'Benar / Salah Gambar Nyata',
    icon: '🖼️',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Validasi Fakta Visual Berbasis Foto',
    description: 'Menampilkan foto dunia nyata (hewan, buah, pemandangan) dan meminta anak memverifikasi apakah deskripsinya benar atau salah.',
    example: 'Apakah ini gambar buah apel merah segar? (Benar / Salah)'
  },
  {
    number: 12,
    id: 'shape_transform',
    name: 'Transformasi Bentuk Geometri',
    icon: '🔷',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Kecerdasan Spasial & Rotasi 2D',
    description: 'Melatih rotasi mental anak dengan mengamati bagaimana suatu bangun geometri berubah jika diputar 90° atau 180° ke bawah.',
    example: 'Jika segitiga merah 🔺 diputar 180° ke bawah, bentuknya menjadi: (🔻)'
  },
  {
    number: 13,
    id: 'puzzle_assembly',
    name: 'Susun Keping Puzzle',
    icon: '🧩',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Sintesis Spasial & Rekonstruksi Gambar',
    description: 'Menyusun potongan pecahan puzzle gambar acak ke urutan posisi yang benar agar menghasilkan gambar yang padu.',
    example: 'Susun kepingan puzzle gambar kucing dari kepala, badan, hingga ekor!'
  },

  // 3. Logika & Pengelompokan (7 Jenis)
  {
    number: 14,
    id: 'matching',
    name: 'Pasangkan Garis Relasi',
    icon: '🔗',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Asosiasi Konsep & Korelasi Pasangan',
    description: 'Menghubungkan kartu kolom kiri dengan pasangan yang tepat di kolom kanan (misal: induk dengan anak hewan, angka dengan kuantitas).',
    example: 'Pasangkan angka 1 dengan 🍎 dan angka 2 dengan 🍎🍎!'
  },
  {
    number: 15,
    id: 'drag_and_drop',
    name: 'Seret & Masukkan ke Keranjang',
    icon: '🖐️',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Koordinasi Motorik & Perhitungan Kuota',
    description: 'Interaksi menyeret objek satu per satu dari meja belanjaan dan melepaskannya ke dalam keranjang belanja sesuai instruksi kuota.',
    example: 'Seret tepat 3 buah apel ke dalam keranjang belanja Kiko!'
  },
  {
    number: 16,
    id: 'category_sorting',
    name: 'Kelompokkan ke Kategori',
    icon: '📦',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Klasifikasi Taksonomi & Logika Himpunan',
    description: 'Memilah berbagai macam kartu benda ke dalam kelompok kategori yang tepat (misal: Makanan vs Kendaraan, Hewan Darat vs Hewan Air).',
    example: 'Kelompokkan mana yang termasuk Buah dan mana yang termasuk Sayur!'
  },
  {
    number: 17,
    id: 'drag_to_sort',
    name: 'Seret ke Wadah Klasifikasi',
    icon: '🗂️',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Keterampilan Sortir Kinestetik Langsung',
    description: 'Varian dinamis dari penyortiran dengan wadah drop-zone animasi yang merespons sentuhan seret kartu secara langsung.',
    example: 'Seret kartu singa ke wadah Hutan dan ikan badut ke wadah Laut!'
  },
  {
    number: 18,
    id: 'sequence_ordering',
    name: 'Urutan Logis Kronologis',
    icon: '🔢',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Pemahaman Sebab-Akibat & Tahapan',
    description: 'Mengurutkan peristiwa atau kartu bilangan dari awal sampai akhir (misal: biji ➔ tunas ➔ pohon bunga).',
    example: 'Urutkan tahapan pertumbuhan tanaman dari yang pertama hingga terakhir!'
  },
  {
    number: 19,
    id: 'pattern_matching',
    name: 'Runtunan Pola Berulang',
    icon: '🧩',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Penalaran Induktif & Prediksi Pola',
    description: 'Menganalisis irama pola gambar berulang (ABAB, AABB, ABC) dan menentukan objek selanjutnya.',
    example: 'Lengkapi pola buah berikut: 🍎 🍌 🍎 🍌 ... [ ? ]'
  },
  {
    number: 20,
    id: 'odd_one_out',
    name: 'Temukan yang Berbeda',
    icon: '🔍',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Analisis Anomali & Pengecualian',
    description: 'Menampilkan 4 kartu benda di mana 3 kartu memiliki kesamaan karakteristik dan 1 kartu tidak cocok. Anak dilatih mencari alasannya.',
    example: 'Kucing, Anjing, Kelinci, Mobil — mana satu benda yang paling berbeda?'
  },

  // 4. Bahasa, Audio & Memori (5 Jenis)
  {
    number: 21,
    id: 'reading',
    name: 'Membaca Nyaring (Speech AI)',
    icon: '📖',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Literasi Membaca, Artikulasi & Percaya Diri',
    description: 'Anak mendengarkan contoh pelafalan model suara (TTS), lalu menekan mikrofon untuk membaca kalimat dengan lantang. Kata yang dibaca benar langsung menyala hijau cerah!',
    example: 'Bacalah kalimat: "Budi suka membaca buku cerita."'
  },
  {
    number: 22,
    id: 'word_building',
    name: 'Susun Huruf Jadi Kata',
    icon: '🔤',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Fonik, Ejaan & Kosakata Indonesia',
    description: 'Menyusun kepingan huruf alfabet yang teracak untuk merangkai ejaan nama hewan, buah, atau kata benda yang dimaksud.',
    example: 'Susun huruf acak [ K - U - U - B ] menjadi nama benda: B-U-K-U!'
  },
  {
    number: 23,
    id: 'sound_matching',
    name: 'Tebak Sumber Suara',
    icon: '🔊',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Persepsi Auditori & Pendengaran Kritis',
    description: 'Mendengarkan rekaman suara autentik (suara burung, raungan harimau, bel sepeda) lalu menebak gambar sumber suara tersebut.',
    example: 'Dengarkan suara "Kwek-kwek!", hewan manakah yang mengeluarkan suara ini? (🦆 Bebek)'
  },
  {
    number: 24,
    id: 'true_false',
    name: 'Benar / Salah Teks Fakta',
    icon: '⚖️',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Pemahaman Bacaan & Logika Dasar',
    description: 'Membaca pernyataan singkat seputar pengetahuan umum dan menentukan kebenaran logikanya dengan tombol Benar/Salah.',
    example: 'Apakah gajah adalah hewan darat terbesar di bumi? (Benar)'
  },
  {
    number: 25,
    id: 'memory_flip',
    name: 'Kartu Memori Balik Pasangan',
    icon: '🃏',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Memori Jangka Pendek & Daya Ingat Visual',
    description: 'Permainan membalik sepasang kartu tertutup untuk mengingat letak gambar hewan atau angka kembar yang sama.',
    example: 'Buka kartu dan temukan 2 pasang gambar hewan kucing dan kelinci yang sama!'
  },
  {
    number: 26,
    id: 'number_maze',
    name: 'Labirin Logika Angka',
    icon: '🌀',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Penelusuran Jalur & Aturan Pola Angka',
    description: 'Petak labirin berangka di mana anak mengarahkan maskot Kiko melangkah dari petak Mulai ke Selesai mengikuti aturan pola (genap, ganjil, kelipatan, atau deret berurutan).',
    example: 'Ikuti jalur angka genap: 2 ➔ 4 ➔ 6 ➔ 8 ➔ 10 untuk mencapai bendera selesai!'
  },
  {
    number: 27,
    id: 'balance_scale',
    name: 'Timbangan Neraca Seimbang',
    icon: '⚖️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Konsep Kesetaraan Aljabar Awal & Penjumlahan',
    description: 'Simulasi fisika neraca timbangan interaktif. Anak meletakkan bobot buah di piring kanan agar timbangan seimbang sempurna dengan piring kiri.',
    example: 'Piring kiri bermassa 5kg, piring kanan ada 2kg. Berapa bobot yang harus ditambahkan agar seimbang? (3kg)'
  },
  {
    number: 28,
    id: 'color_by_number',
    name: 'Mewarnai Berdasarkan Angka',
    icon: '🎨',
    category: 'visual',
    categoryName: 'Visual & Observasi',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Mengenali Angka Melalui Warna & Koordinasi Visual-Motorik',
    description: 'Kanvas gambar vektor (SVG) ramah anak dengan bidang-bidang bernomor. Anak memilih warna cat di palet dan menyentuh bagian yang sesuai hingga gambar hidup berwarna-warni!',
    example: 'Warnai gambar kupu-kupu: 1 = Merah, 2 = Kuning, 3 = Biru, 4 = Hijau!'
  },
  {
    number: 29,
    id: 'syllable_clapping',
    name: 'Ketukan Suku Kata (Phonics)',
    icon: '👏',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Kesadaran Fonologis & Segmentasi Suku Kata',
    description: 'Segmentasi ritmik suku kata kata benda bahasa Indonesia. Anak mendengarkan audio per suku kata, lalu bertepuk tangan dengan tombol tepuk beranimasi untuk menghitung jumlah ketukannya.',
    example: 'Dengarkan kata "KU-CING" 🐱. Berapa jumlah tepukan suku katanya? (2 Ketukan)'
  }
]

// Filtered Computed List
const filteredExerciseTypes = computed(() => {
  let list = allExerciseTypes
  if (activeQuestionCategory.value !== 'all') {
    list = list.filter(t => t.category === activeQuestionCategory.value)
  }
  if (searchQuestionQuery.value.trim()) {
    const q = searchQuestionQuery.value.toLowerCase().trim()
    list = list.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.skill.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) ||
      t.example.toLowerCase().includes(q)
    )
  }
  return list
})
</script>
