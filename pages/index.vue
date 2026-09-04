<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Header Navigation -->
    <HeaderNav />

    <!-- Access Control Error Banner -->
    <div v-if="accessErrorMsg" class="bg-rose-600 text-white font-heading font-extrabold text-xs sm:text-sm px-4 py-3 text-center relative flex items-center justify-center gap-2 shadow-md">
      <span>🛑</span>
      <span>{{ accessErrorMsg }}</span>
      <button @click="accessErrorMsg = ''" class="ml-4 bg-white/20 hover:bg-white/30 text-white rounded-full px-2 py-0.5 text-xs font-bold cursor-pointer">✕</button>
    </div>

    <main id="main-content" class="safe-mobile-padding">
      <!-- HERO SECTION -->
      <section class="relative bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-12 pb-16 px-4 overflow-hidden" aria-label="Hero Section">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Hero Content -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-800 text-xs sm:text-sm font-heading font-extrabold shadow-2xs animate-pop">
              <span>🦉 Platform Pembelajaran Interaktif SD & TK</span>
            </div>

            <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15]">
              Belajar <span class="text-duo-green underline decoration-duo-yellow decoration-wavy">Matematika, Sains</span> & <span class="text-duo-blue">Bahasa</span> Paling Seru! 🚀
            </h1>

            <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pelajari konsep berhitung, keanekaragaman dunia hewan, kata & huruf Bahasa Indonesia, serta seni lewat peta jalur petualangan interaktif. Kumpulkan XP, jaga Streak harian, dan naikkan levelmu!
            </p>

            <!-- Bouncy 3D Hero Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <NuxtLink 
                to="/register" 
                class="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 duo-btn-green text-xs sm:text-sm lg:text-base font-extrabold whitespace-nowrap shadow-lg group hover:scale-105 transition-transform"
                id="btn-hero-register"
              >
                <span>🚀 Mulai Petualangan Gratis</span>
              </NuxtLink>

              <NuxtLink 
                to="/catalog" 
                class="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 duo-btn-blue text-xs sm:text-sm lg:text-base font-extrabold whitespace-nowrap shadow-lg group hover:scale-105 transition-transform"
                id="btn-hero-catalog"
              >
                <span>📚 Jelajahi Semua Modul</span>
              </NuxtLink>
            </div>

            <!-- Guest quick link -->
            <div class="pt-1">
              <button 
                @click="handleGuestLogin" 
                class="text-xs sm:text-sm font-heading font-bold text-slate-500 hover:text-duo-blue underline decoration-dotted transition-colors cursor-pointer"
                id="btn-hero-guest"
              >
                ⚡ Coba Masuk Sebagai Mode Tamu (Tanpa Register) ➔
              </button>
            </div>

            <!-- Feature Pills Summary -->
            <div class="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-heading font-bold text-slate-500">
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> 100% Gratis Selamanya
              </span>
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> Ramah Anak TK & SD (Usia 4-9 Thn)
              </span>
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> Tanpa Iklan Mengganggu
              </span>
            </div>
          </div>

          <!-- Right Hero 3D Interactive Mascot Visual -->
          <div class="lg:col-span-5 relative flex justify-center z-10">
            <div class="relative w-full max-w-xl">
              <!-- Background Ambient Blur Glow -->
              <div class="absolute -inset-6 bg-gradient-to-r from-duo-green/30 via-duo-blue/30 to-duo-purple/30 rounded-3xl blur-3xl pointer-events-none"></div>

              <!-- 3D Interactive Hero Canvas Component -->
              <ClientOnly>
                <Hero3DCanvas />
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Decorative Background Blobs -->
        <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-200/30 to-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      <!-- SUBJECTS SHOWCASE SECTION WITH 3D THREE.JS -->
      <section class="py-20 px-4 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-y border-slate-200" aria-label="Mata Pelajaran">
        <div class="max-w-6xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-2xl mx-auto">
            <span class="inline-flex items-center gap-2 px-4 py-1 bg-duo-purple/10 border border-duo-purple/30 text-duo-purple rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-2xs">
              🎓 Visualisasi 3D Interaktif
            </span>
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-slate-800 tracking-tight">
              Satu Aplikasi Untuk Semua <span class="text-duo-blue">Pembelajaran Dasar</span> Anak 🚀
            </h2>
            <p class="text-slate-600 text-sm sm:text-base font-body">
              Setiap mata pelajaran dilengkapi dunia 3D Three.js interaktif. Gerakkan kursor di atas objek 3D untuk memutarnya!
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Subject Card 1: Math 3D -->
            <div class="bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/30 rounded-3xl border-2 border-emerald-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-emerald-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
              <div class="space-y-3">
                <!-- Three.js 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Subject3DCanvas subject="math" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-xl bg-duo-green text-white flex items-center justify-center font-heading text-xl shadow-duo-green group-hover:scale-110 transition-transform">
                    🔢
                  </div>
                  <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-duo-green transition-colors">
                    Matematika & Berhitung
                  </h3>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Mengenal angka 1-20, penjumlahan, pengurangan, perbandingan jumlah, dan tebak pola gambar.
                </p>
              </div>

              <div class="pt-3 border-t border-emerald-100 flex items-center justify-between">
                <span class="text-xs font-heading font-extrabold text-duo-green">9 Jenis Soal Interaktif</span>
                <span class="text-xs font-heading font-black text-duo-green group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Subject Card 2: Science 3D -->
            <div class="bg-gradient-to-b from-amber-50/90 via-white to-amber-50/30 rounded-3xl border-2 border-amber-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-amber-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
              <div class="space-y-3">
                <!-- Three.js 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Subject3DCanvas subject="science" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-heading text-xl shadow-md group-hover:scale-110 transition-transform">
                    🦁
                  </div>
                  <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                    Dunia Hewan & Sains
                  </h3>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Belajar mengenal nama hewan peliharaan & liar, habitat alam, suara binatang, dan pengelompokan mamalia.
                </p>
              </div>

              <div class="pt-3 border-t border-amber-100 flex items-center justify-between">
                <span class="text-xs font-heading font-extrabold text-amber-600">5 Unit Tematik Hewan</span>
                <span class="text-xs font-heading font-black text-amber-600 group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Subject Card 3: Language 3D -->
            <div class="bg-gradient-to-b from-purple-50/90 via-white to-purple-50/30 rounded-3xl border-2 border-purple-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-purple-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
              <div class="space-y-3">
                <!-- Three.js 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Subject3DCanvas subject="language" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-xl bg-duo-purple text-white flex items-center justify-center font-heading text-xl shadow-md group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-duo-purple transition-colors">
                    Bahasa Indonesia
                  </h3>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Mengenal abjad, huruf vokal & konsonan, mencocokkan kata bergambar, serta latihan membaca sederhana.
                </p>
              </div>

              <div class="pt-3 border-t border-purple-100 flex items-center justify-between">
                <span class="text-xs font-heading font-extrabold text-duo-purple">Audio Suara Jelas 🎤</span>
                <span class="text-xs font-heading font-black text-duo-purple group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Subject Card 4: Art & Logic 3D -->
            <div class="bg-gradient-to-b from-sky-50/90 via-white to-sky-50/30 rounded-3xl border-2 border-sky-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-sky-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
              <div class="space-y-3">
                <!-- Three.js 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Subject3DCanvas subject="art" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-xl bg-duo-blue text-white flex items-center justify-center font-heading text-xl shadow-duo-blue group-hover:scale-110 transition-transform">
                    🎨
                  </div>
                  <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-duo-blue transition-colors">
                    Seni, Warna & Logika
                  </h3>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Mengenal warna-warni, bentuk geometri dasar, menjiplak angka/huruf, dan teka-teki logika visual.
                </p>
              </div>

              <div class="pt-3 border-t border-sky-100 flex items-center justify-between">
                <span class="text-xs font-heading font-extrabold text-duo-blue">Latihan Kreativitas</span>
                <span class="text-xs font-heading font-black text-duo-blue group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LIVE INTERACTIVE QUIZ DEMO SECTION -->
      <section class="py-16 px-4 bg-slate-100/70 border-b border-slate-200" aria-label="Demonstrasi Kuis">
        <div class="max-w-4xl mx-auto space-y-6">
          <div class="text-center space-y-2">
            <span class="px-3 py-1 bg-duo-blue/10 text-duo-blue rounded-full font-heading font-extrabold text-xs">
              🎮 Demonstrasi Langsung Interaktif
            </span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-slate-800">
              Coba Kuis Matematika, Sains & Bahasa Sekarang!
            </h2>
            <p class="text-slate-600 text-sm font-body max-w-lg mx-auto">
              Pilih tab subjek di bawah ini, klik jawaban yang menurutmu benar, dan dapatkan XP pertama!
            </p>
          </div>

          <!-- Embedded Multi-Subject Mini Quiz Demo Component -->
          <LandingQuizDemo />
        </div>
      </section>

      <!-- FEATURES GRID SECTION (REDESIGNED STUDIO-GRADE) -->
      <section class="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden my-6 border-y border-slate-700 shadow-2xl" aria-label="Keunggulan">
        <!-- Background Ambient Glow Orbs -->
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-duo-green/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-duo-blue/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-6xl mx-auto space-y-14 relative z-10">
          <!-- Section Header -->
          <div class="text-center space-y-4 max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-duo-green/20 border border-duo-green/50 text-emerald-300 rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-lg backdrop-blur-md animate-pulse">
              ✨ Keunggulan Metode Pembelajaran
            </span>
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Mengapa Anak Menyukai <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-300">Counting Duo?</span> 🦉
            </h2>
            <p class="text-slate-300 text-sm sm:text-base font-body leading-relaxed max-w-2xl mx-auto">
              Dirancang khusus dengan prinsip mikro-pembelajaran interaktif dan gamifikasi psikologis untuk membangun kebiasaan belajar mandiri yang konsisten setiap hari.
            </p>
          </div>

          <!-- 3D Tactile Features Grid WITH THREE.JS CANVAS -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature Card 1: Peta Jalur 3D -->
            <div class="group relative bg-slate-800/80 hover:bg-slate-800 border-2 border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col justify-between overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
              
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="map" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 text-white flex items-center justify-center font-heading text-xl shadow-lg shadow-emerald-500/30 border-b-2 border-emerald-700">
                      🗺️
                    </div>
                    <h3 class="font-heading text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                      Peta Jalur Bertahap
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-emerald-500/30">
                    7 LEVEL
                  </span>
                </div>
                
                <p class="text-xs text-slate-300 font-body leading-relaxed">
                  Materi disusun bertingkat mulai dari pengenalan visual sederhana hingga soal cerita kontekstual dengan *checkpoint* evaluasi.
                </p>
              </div>

              <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-heading font-bold text-emerald-400">
                <span>⚡ 98% Pemahaman Terukur</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 2: Streak & XP 3D -->
            <div class="group relative bg-slate-800/80 hover:bg-slate-800 border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 flex flex-col justify-between overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
              
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="streak" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-heading text-xl shadow-lg shadow-amber-500/30 border-b-2 border-amber-700">
                      🔥
                    </div>
                    <h3 class="font-heading text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      Streak & XP Harian
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-amber-500/30">
                    STREAK HARIAN
                  </span>
                </div>
                
                <p class="text-xs text-slate-300 font-body leading-relaxed">
                  Menjaga konsistensi belajar anak setiap hari lewat sistem nyawa, pembakar *Streak* harian, dan bonus *XP reward*.
                </p>
              </div>

              <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-heading font-bold text-amber-400">
                <span>🔥 +50 XP Setiap Hari</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 3: Spaced Repetition 3D -->
            <div class="group relative bg-slate-800/80 hover:bg-slate-800 border-2 border-yellow-500/40 hover:border-yellow-400 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 flex flex-col justify-between overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
              
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="brain" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-400 text-slate-900 flex items-center justify-center font-heading text-xl shadow-lg shadow-yellow-500/30 border-b-2 border-yellow-600">
                      🧠
                    </div>
                    <h3 class="font-heading text-lg font-black text-white group-hover:text-yellow-300 transition-colors">
                      Pengulangan Cerdas
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-yellow-500/30">
                    ALGORITMA
                  </span>
                </div>
                
                <p class="text-xs text-slate-300 font-body leading-relaxed">
                  Algoritma *Spaced Repetition* otomatis menyajikan ulang soal yang pernah keliru hingga ingatan konsep anak makin kuat.
                </p>
              </div>

              <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-heading font-bold text-yellow-400">
                <span>🧠 Retensi Ingatan 3x Kuat</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 4: Audio Visual 3D -->
            <div class="group relative bg-slate-800/80 hover:bg-slate-800 border-2 border-purple-500/40 hover:border-purple-400 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col justify-between overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="media" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-heading text-xl shadow-lg shadow-purple-500/30 border-b-2 border-purple-700">
                      🎨
                    </div>
                    <h3 class="font-heading text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                      Visual & Audio Jelas
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-purple-500/30">
                    MULTIMEDIA
                  </span>
                </div>
                
                <p class="text-xs text-slate-300 font-body leading-relaxed">
                  Soal dilengkapi ilustrasi objek nyata (hewan, buah, warna) dan pengucapan audio suara jernih ramah anak usia dini.
                </p>
              </div>

              <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-heading font-bold text-purple-400">
                <span>🎧 Pengucapan Audio Suara</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- IMPACT STATS BANNER -->
      <section class="py-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-amber-300">10.000+</p>
            <p class="text-xs sm:text-sm font-heading font-bold text-white/80">Siswa SD & TK Aktif</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-emerald-300">500+</p>
            <p class="text-xs sm:text-sm font-heading font-bold text-white/80">Soal Interaktif Multi-Subjek</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-sky-300">100%</p>
            <p class="text-xs sm:text-sm font-heading font-bold text-white/80">Gratis Selamanya</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-rose-300">4.9 ★</p>
            <p class="text-xs sm:text-sm font-heading font-bold text-white/80">Rating Orang Tua & Guru</p>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="py-16 px-4 bg-slate-50" aria-label="Testimoni">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-xl mx-auto">
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-heading font-extrabold text-xs">
              💬 Ulasan Pengguna
            </span>
            <h2 class="font-heading text-3xl font-black text-slate-800">
              Kata Orang Tua & Guru
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center gap-1 text-amber-400 font-bold">
                ★★★★★
              </div>
              <p class="text-xs sm:text-sm text-slate-600 italic font-body">
                "Anak saya (Kelas 1 SD) dulu malas sekali belajar berhitung dan sains. Sejak pakai Counting Duo, dia malah nagih belajar tiap sore!"
              </p>
              <div class="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-heading font-bold text-rose-600">
                  👩‍🦰
                </div>
                <div>
                  <p class="font-heading text-xs font-bold text-slate-800">Ibu Ratna</p>
                  <p class="text-[10px] text-slate-400">Orang Tua Siswa SD</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center gap-1 text-amber-400 font-bold">
                ★★★★★
              </div>
              <p class="text-xs sm:text-sm text-slate-600 italic font-body">
                "Variasi modul Matematika, Dunia Hewan, dan Bahasa Indonesia di Counting Duo sangat membantu proses belajar mengajar anak murid TK B."
              </p>
              <div class="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-heading font-bold text-duo-blue">
                  👨‍🏫
                </div>
                <div>
                  <p class="font-heading text-xs font-bold text-slate-800">Pak Budi, S.Pd</p>
                  <p class="text-[10px] text-slate-400">Guru Kelas 1 SD</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center gap-1 text-amber-400 font-bold">
                ★★★★★
              </div>
              <p class="text-xs sm:text-sm text-slate-600 italic font-body">
                "Anak saya suka sekali mengumpulkan stiker dan menjaga Streak harian. Pemahamannya tentang angka dan nama hewan meningkat pesat."
              </p>
              <div class="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-heading font-bold text-duo-green">
                  🧔
                </div>
                <div>
                  <p class="font-heading text-xs font-bold text-slate-800">Pak Hendra</p>
                  <p class="text-[10px] text-slate-400">Orang Tua Siswa TK B</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section class="py-16 px-4 bg-white border-t border-slate-200" aria-label="FAQ">
        <div class="max-w-3xl mx-auto space-y-8">
          <div class="text-center space-y-2">
            <h2 class="font-heading text-3xl font-black text-slate-800">
              Pertanyaan Yang Sering Diajukan (FAQ)
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 font-heading font-semibold">
              Semua hal yang perlu Anda ketahui tentang Counting Duo
            </p>
          </div>

          <div class="space-y-4">
            <details v-for="(faq, idx) in faqs" :key="idx" class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 transition-all group">
              <summary class="font-heading font-extrabold text-sm sm:text-base text-slate-800 cursor-pointer flex items-center justify-between">
                <span>{{ faq.q }}</span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pt-3 border-t border-slate-200/60 mt-3">
                {{ faq.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- FINAL CTA BANNER (REDESIGNED 3D SHOWCASE) -->
      <section class="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white text-center relative overflow-hidden border-t border-slate-700 shadow-2xl">
        <!-- Background Ambient Glow Spheres -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 via-sky-500/20 to-purple-500/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-3xl mx-auto space-y-8 relative z-10">
          <!-- Three.js 3D WebGL Mascot & Floating Reward Scene -->
          <ClientOnly>
            <Cta3DCanvas />
          </ClientOnly>

          <div class="space-y-4">
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
              Siap Memulai <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-300">Petualangan Belajarmu?</span> 🚀
            </h2>
            <p class="text-sm sm:text-lg text-slate-300 font-body max-w-xl mx-auto leading-relaxed">
              Daftar gratis dalam 1 menit dan dapatkan bonus <span class="text-amber-300 font-bold">+50 XP</span> pertama untuk membuka Peta Jalur Belajar interaktif!
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <NuxtLink 
              to="/register" 
              class="w-full sm:w-auto px-10 py-4.5 duo-btn-green text-lg shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2 group"
              id="btn-footer-register"
            >
              <span>🌟 Buat Akun Gratis Sekarang</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </NuxtLink>
            <NuxtLink 
              to="/catalog" 
              class="w-full sm:w-auto px-8 py-4.5 duo-btn-blue text-base shadow-xl flex items-center justify-center gap-2 group"
              id="btn-footer-catalog"
            >
              <span>📚 Lihat Semua Katalog Modul</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-slate-900 text-slate-400 py-10 px-4 text-xs font-heading border-t border-slate-800">
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
            <li><NuxtLink to="/" class="hover:text-white transition-colors">Beranda Utama</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">Katalog Modul</NuxtLink></li>
            <li><NuxtLink to="/course" class="hover:text-white transition-colors">Peta Jalur Belajar</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Akun & Akses</p>
          <ul class="space-y-1">
            <li><NuxtLink to="/login" class="hover:text-white transition-colors">Masuk Akun</NuxtLink></li>
            <li><NuxtLink to="/register" class="hover:text-white transition-colors">Daftar Akun Baru</NuxtLink></li>
            <li><button @click="handleGuestLogin" class="hover:text-white transition-colors text-left cursor-pointer">Akses Mode Tamu</button></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Teknologi</p>
          <p class="text-slate-400 font-body">Nuxt 3 • Vue 3 • Pinia • Tailwind CSS</p>
          <p class="text-slate-500 text-[11px]">© 2026 CountingDuo. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { CheckCircle2 } from 'lucide-vue-next'

const route = useRoute()
const userStore = useUserStore()

const accessErrorMsg = ref('')

onMounted(() => {
  if (route.query.error === 'access_denied') {
    accessErrorMsg.value = 'Akses Ditolak: Halaman Panel Admin hanya dapat diakses oleh akun berkategori Administrator.'
  }
})

// SEO Meta Tags Configuration
useSeoMeta({
  title: 'Petualangan Belajar Interaktif Anak TK & SD | Counting Duo',
  description: 'Platform pembelajaran gamifikasi gratis untuk anak SD & TK. Pelajari Matematika, Sains & Dunia Hewan, Bahasa Indonesia, serta Seni lewat kuis interaktif seru!',
  ogTitle: 'Petualangan Belajar Interaktif Anak TK & SD | Counting Duo',
  ogDescription: 'Cara belajar Matematika, Sains, dan Bahasa paling seru untuk anak TK & SD dengan peta jalur gamifikasi.',
  ogImage: '/images/og-banner.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Petualangan Belajar Interaktif Anak TK & SD | Counting Duo',
  twitterDescription: 'Platform pembelajaran gamifikasi gratis untuk anak SD & TK. Kuis interaktif Matematika, Sains, & Bahasa.'
})

// JSON-LD Structured Data Schema for Google Search Indexing
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Counting Duo',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'IDR'
        },
        'description': 'Platform pembelajaran interaktif berbasis gamifikasi untuk anak SD & TK meliputi Matematika, Sains, Bahasa Indonesia, dan Seni.'
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Apakah aplikasi Counting Duo benar-benar gratis?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ya, 100% gratis! Semua modul pembelajaran, peta jalur, dan kuis interaktif dapat diakses tanpa biaya dan tanpa iklan.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Mata pelajaran apa saja yang tersedia di Counting Duo?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Meliputi Matematika & Berhitung, Dunia Hewan & Sains, Bahasa Indonesia & Membaca, serta Seni & Logika Gambar.'
            }
          }
        ]
      })
    }
  ]
})

const handleGuestLogin = () => {
  userStore.loginAsGuest()
  navigateTo('/catalog')
}

const faqs = [
  {
    q: 'Apakah aplikasi Counting Duo benar-benar gratis?',
    a: 'Ya, 100% gratis! Semua modul pembelajaran, peta jalur, dan kuis interaktif dapat diakses tanpa biaya dan tanpa iklan yang mengganggu.'
  },
  {
    q: 'Mata pelajaran apa saja yang ada di Counting Duo?',
    a: 'Counting Duo mencakup berbagai subjek pembelajaran dasar anak usia dini: Matematika & Berhitung, Dunia Hewan & Sains, Bahasa Indonesia & Membaca, serta Seni & Logika Gambar.'
  },
  {
    q: 'Untuk anak usia berapa aplikasi ini cocok?',
    a: 'Aplikasi ini dirancang khusus untuk anak Pendidikan Anak Usia Dini (PAUD), TK B, serta Sekolah Dasar (SD Kelas 1 sampai Kelas 3).'
  },
  {
    q: 'Bagaimana sistem Nyawa dan Streak bekerja?',
    a: 'Siswa memulai dengan 5 nyawa. Jika salah menjawab soal, nyawa berkurang 1. Nyawa dapat diisi ulang gratis kapan saja. Streak mengukur konsistensi belajar harian berturut-turut.'
  },
  {
    q: 'Apakah bisa digunakan tanpa membuat akun?',
    a: 'Bisa! Anda dapat mencoba "Mode Tamu" untuk langsung mengakses katalog dan kuis. Namun, disarankan membuat akun gratis agar progres XP dan Streak tersimpan rapi.'
  }
]
</script>
