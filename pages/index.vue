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
      <section class="relative bg-sky-50 pt-12 pb-16 px-4 overflow-hidden" aria-label="Hero Section">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Hero Content -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <!-- Social Proof Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs sm:text-sm font-heading font-extrabold shadow-2xs animate-pop">
              <span>⭐ Dipercaya 10.000+ Keluarga Indonesia</span>
            </div>

            <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15]">
              Membangun <span class="text-duo-green underline decoration-duo-yellow decoration-wavy">Kemandirian Belajar Anak</span> Sejak Dini Secara <span class="text-duo-blue">Interaktif & Efektif.</span> 🦉
            </h1>

            <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              CountingDuo mengintegrasikan kurikulum Matematika, Sains, dan Bahasa Indonesia dengan metode gamifikasi edukatif. Membantu anak usia 4–9 tahun belajar secara mandiri, konsisten, dan menyenangkan — <strong class="text-slate-800">100% gratis & tanpa iklan.</strong>
            </p>

            <!-- Primary CTA -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <NuxtLink 
                to="/register" 
                class="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 duo-btn-green text-sm sm:text-base lg:text-lg font-extrabold whitespace-nowrap shadow-xl group hover:scale-105 transition-transform"
                id="btn-hero-register"
              >
                <span>🚀 Mulai Belajar Gratis — Sekarang!</span>
              </NuxtLink>
              <NuxtLink 
                to="/catalog" 
                class="w-full sm:w-auto px-5 py-3.5 duo-btn-blue text-sm font-extrabold whitespace-nowrap shadow-lg group hover:scale-105 transition-transform"
                id="btn-hero-catalog"
              >
                <span>📚 Lihat Semua Modul</span>
              </NuxtLink>
            </div>

            <!-- Guest quick link -->
            <div class="pt-1">
              <button 
                @click="handleGuestLogin" 
                class="text-xs sm:text-sm font-heading font-bold text-slate-400 hover:text-duo-blue underline decoration-dotted transition-colors cursor-pointer"
                id="btn-hero-guest"
              >
                ⚡ Coba Langsung Tanpa Daftar (Mode Tamu) ➔
              </button>
            </div>

            <!-- Trust Pills -->
            <div class="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-heading font-bold text-slate-500">
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-3.5 h-3.5 text-duo-green" /> Gratis Selamanya
              </span>
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-3.5 h-3.5 text-duo-green" /> Usia 4–9 Tahun
              </span>
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-3.5 h-3.5 text-duo-green" /> Tanpa Iklan
              </span>
              <span class="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-3.5 h-3.5 text-duo-green" /> Kurikulum Merdeka
              </span>
            </div>
          </div>

          <!-- Right Hero 3D Interactive Mascot Visual -->
          <div class="lg:col-span-5 relative flex justify-center z-10">
            <div class="relative w-full max-w-xl">
              <!-- Background Ambient Blur Glow -->
              <div class="absolute -inset-6 bg-duo-green/20 rounded-3xl blur-3xl pointer-events-none"></div>

              <!-- 3D Interactive Hero Canvas Component -->
              <ClientOnly>
                <Hero3DCanvas />
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Decorative Background Blobs -->
        <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      <!-- TRUST STRIP -->
      <section class="py-5 px-4 bg-white border-y border-slate-200 overflow-hidden" aria-label="Kepercayaan">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div 
              v-for="badge in trustBadges" 
              :key="badge.text"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-heading font-extrabold text-slate-700 whitespace-nowrap shadow-2xs"
            >
              <span class="text-base">{{ badge.icon }}</span>
              <span>{{ badge.text }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CARA KERJA (HOW IT WORKS) -->
      <section class="py-20 px-4 bg-slate-50" aria-label="Cara Kerja">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3">
            <span class="inline-flex items-center gap-2 px-4 py-1 bg-duo-blue/10 border border-duo-blue/30 text-duo-blue rounded-full font-heading font-black text-xs uppercase tracking-wider">
              ✨ Mudah & Menyenangkan
            </span>
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-slate-800 tracking-tight">
              Mulai Belajar dalam <span class="text-duo-green">3 Langkah Mudah</span>
            </h2>
            <p class="text-slate-500 text-sm sm:text-base font-body max-w-xl mx-auto">
              Tidak perlu instalasi, tidak perlu kartu kredit. Buka browser, daftar gratis, dan belajar langsung!
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <!-- Connector line (desktop) -->
            <div class="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-emerald-300 z-0"></div>

            <div 
              v-for="step in steps" 
              :key="step.number"
              class="relative bg-white rounded-3xl border-2 p-6 sm:p-8 space-y-4 shadow-lg text-center z-10 hover:-translate-y-1 transition-transform"
              :class="step.color === 'emerald' ? 'border-emerald-300' : step.color === 'blue' ? 'border-blue-300' : 'border-amber-300'"
            >
              <!-- Step Number Badge -->
              <div 
                class="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-heading font-black text-lg text-white shadow-md"
                :class="step.color === 'emerald' ? 'bg-duo-green' : step.color === 'blue' ? 'bg-duo-blue' : 'bg-amber-500'"
              >
                {{ step.number }}
              </div>
              <div class="text-4xl">{{ step.icon }}</div>
              <h3 class="font-heading text-xl font-black text-slate-800">{{ step.title }}</h3>
              <p class="text-sm text-slate-500 font-body leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>

          <!-- CTA below steps -->
          <div class="text-center">
            <NuxtLink 
              to="/register"
              class="inline-flex items-center gap-2 px-8 py-4 duo-btn-green text-base font-extrabold shadow-xl hover:scale-105 transition-transform"
              id="btn-howto-register"
            >
              <span>🎯 Ayo Coba Sekarang — Gratis!</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- SUBJECTS SHOWCASE SECTION WITH 3D THREE.JS -->
      <section class="py-20 px-4 bg-sky-50 border-y border-slate-200" aria-label="Mata Pelajaran">
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
            <div class="bg-emerald-50 rounded-3xl border-2 border-emerald-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-emerald-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
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
                <span class="text-xs font-heading font-extrabold text-duo-green">13 Jenis Soal Interaktif</span>
                <span class="text-xs font-heading font-black text-duo-green group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Subject Card 2: Science 3D -->
            <div class="bg-amber-50 rounded-3xl border-2 border-amber-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-amber-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
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
            <div class="bg-purple-50 rounded-3xl border-2 border-purple-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-purple-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
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
            <div class="bg-sky-50 rounded-3xl border-2 border-sky-300/80 p-5 space-y-4 hover:shadow-2xl hover:border-sky-400 transition-all hover:-translate-y-2 group flex flex-col justify-between">
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

      <!-- FEATURES GRID SECTION (LIGHT MODE WITH 3D CANVAS) -->
      <section class="py-20 px-4 bg-emerald-50/50 text-slate-800 relative overflow-hidden my-4 border-y border-slate-200 shadow-sm" aria-label="Keunggulan">
        <!-- Background Ambient Glow Orbs -->
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-duo-green/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-duo-blue/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-6xl mx-auto space-y-14 relative z-10">
          <!-- Section Header -->
          <div class="text-center space-y-4 max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-xs">
              ✨ Keunggulan Metode Pembelajaran
            </span>
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Mengapa Anak Menyukai <span class="text-emerald-600">Counting Duo?</span> 🦉
            </h2>
            <p class="text-slate-600 text-sm sm:text-base font-body leading-relaxed max-w-2xl mx-auto">
              Dirancang khusus dengan prinsip mikro-pembelajaran interaktif dan gamifikasi psikologis untuk membangun kebiasaan belajar mandiri yang konsisten setiap hari.
            </p>
          </div>

          <!-- 3D Tactile Features Grid WITH THREE.JS CANVAS -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature Card 1: Peta Jalur 3D -->
            <div class="group relative bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-500 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl flex flex-col justify-between overflow-hidden">
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="map" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-duo-green text-white flex items-center justify-center font-heading text-xl shadow-duo-green">
                      🗺️
                    </div>
                    <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                      Peta Jalur Bertahap
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-emerald-300">
                    7 LEVEL
                  </span>
                </div>
                
                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Materi disusun bertingkat mulai dari pengenalan visual sederhana hingga soal cerita kontekstual dengan *checkpoint* evaluasi.
                </p>
              </div>

              <div class="pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs font-heading font-extrabold text-emerald-700">
                <span>⚡ 98% Pemahaman Terukur</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 2: Streak & XP 3D -->
            <div class="group relative bg-amber-50 border-2 border-amber-300 hover:border-amber-500 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl flex flex-col justify-between overflow-hidden">
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="streak" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-heading text-xl shadow-md">
                      🔥
                    </div>
                    <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-amber-700 transition-colors">
                      Streak & XP Harian
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-amber-300">
                    STREAK HARIAN
                  </span>
                </div>
                
                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Menjaga konsistensi belajar anak setiap hari lewat sistem nyawa, pembakar *Streak* harian, dan bonus *XP reward*.
                </p>
              </div>

              <div class="pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs font-heading font-extrabold text-amber-700">
                <span>🔥 +50 XP Setiap Hari</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 3: Spaced Repetition 3D -->
            <div class="group relative bg-yellow-50 border-2 border-yellow-300 hover:border-yellow-500 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl flex flex-col justify-between overflow-hidden">
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="brain" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-heading text-xl shadow-md">
                      🧠
                    </div>
                    <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-yellow-800 transition-colors">
                      Pengulangan Cerdas
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-yellow-300">
                    ALGORITMA
                  </span>
                </div>
                
                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Algoritma *Spaced Repetition* otomatis menyajikan ulang soal yang pernah keliru hingga ingatan konsep anak makin kuat.
                </p>
              </div>

              <div class="pt-3 border-t border-yellow-200/80 flex items-center justify-between text-xs font-heading font-extrabold text-yellow-800">
                <span>🧠 Retensi Ingatan 3x Kuat</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>

            <!-- Feature Card 4: Audio Visual 3D -->
            <div class="group relative bg-purple-50 border-2 border-purple-300 hover:border-purple-500 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl flex flex-col justify-between overflow-hidden">
              <div class="space-y-3">
                <!-- 3D WebGL Scene Canvas -->
                <ClientOnly>
                  <Feature3DCanvas feature="media" />
                </ClientOnly>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center gap-2">
                    <div class="w-10 h-10 rounded-xl bg-duo-purple text-white flex items-center justify-center font-heading text-xl shadow-md">
                      🎨
                    </div>
                    <h3 class="font-heading text-lg font-black text-slate-800 group-hover:text-purple-700 transition-colors">
                      Visual & Audio Jelas
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full font-heading font-extrabold text-[10px] tracking-wide border border-purple-300">
                    MULTIMEDIA
                  </span>
                </div>
                
                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Soal dilengkapi ilustrasi objek nyata (hewan, buah, warna) dan pengucapan audio suara jernih ramah anak usia dini.
                </p>
              </div>

              <div class="pt-3 border-t border-purple-200/80 flex items-center justify-between text-xs font-heading font-extrabold text-purple-700">
                <span>🎧 Pengucapan Audio Suara</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- IMPACT STATS BANNER (LIGHT PASTEL SOLID) -->
      <section class="py-12 bg-sky-100 text-slate-800 border-y border-slate-200/80 shadow-xs px-4">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-emerald-600">10.000+</p>
            <p class="text-xs sm:text-sm font-heading font-extrabold text-slate-700">Siswa SD & TK Aktif</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-sky-600">500+</p>
            <p class="text-xs sm:text-sm font-heading font-extrabold text-slate-700">Soal Interaktif Multi-Subjek</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-purple-600">100%</p>
            <p class="text-xs sm:text-sm font-heading font-extrabold text-slate-700">Gratis Selamanya</p>
          </div>
          <div class="space-y-1">
            <p class="font-heading text-3xl sm:text-4xl font-black text-amber-500">4.9 ★</p>
            <p class="text-xs sm:text-sm font-heading font-extrabold text-slate-700">Rating Orang Tua & Guru</p>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="py-16 px-4 bg-slate-50" aria-label="Testimoni">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-xl mx-auto">
            <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-heading font-extrabold text-xs">
              💬 342 Ulasan Pengguna Nyata
            </span>
            <h2 class="font-heading text-3xl font-black text-slate-800">
              Mengapa Orang Tua & Guru Mempercayai CountingDuo?
            </h2>
            <p class="text-sm text-slate-500 font-body">Bukan hanya kata-kata kami — ini cerita nyata dari keluarga pengguna CountingDuo.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Testimonial 1 -->
            <div class="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-1 text-amber-400 font-bold text-lg">★★★★★</div>
              <p class="text-xs sm:text-sm text-slate-700 font-body leading-relaxed">
                <span class="font-black text-slate-900">"Dari tidak mau buka buku, sekarang malah nagih!"</span><br/>
                Anak saya kelas 1 SD dulu menangis tiap disuruh belajar berhitung. Setelah 2 minggu pakai CountingDuo, dia sendiri yang buka laptop dan bilang mau 'main belajar'.
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div class="w-11 h-11 rounded-full bg-rose-100 flex items-center justify-center text-xl">👩‍🦰</div>
                <div>
                  <p class="font-heading text-sm font-black text-slate-800">Ibu Ratna Dewi</p>
                  <p class="text-[11px] text-slate-400">Orang Tua • Anak Kelas 1 SD, Jakarta</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-white p-6 rounded-3xl border-2 border-blue-200 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-1 text-amber-400 font-bold text-lg">★★★★★</div>
              <p class="text-xs sm:text-sm text-slate-700 font-body leading-relaxed">
                <span class="font-black text-slate-900">"Solusi nyata untuk guru TK di era digital."</span><br/>
                Saya gunakan CountingDuo sebagai bahan pendamping di kelas TK B. Variasi soal dan sistemnya sangat membantu anak-anak memahami konsep hewan, angka, dan huruf tanpa bosan.
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-xl">👨‍🏫</div>
                <div>
                  <p class="font-heading text-sm font-black text-slate-800">Pak Budi Santoso, S.Pd</p>
                  <p class="text-[11px] text-slate-400">Guru Kelas TK B • Yogyakarta</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-1 text-amber-400 font-bold text-lg">★★★★★</div>
              <p class="text-xs sm:text-sm text-slate-700 font-body leading-relaxed">
                <span class="font-black text-slate-900">"Streak 30 hari! Anak saya bangga sekali."</span><br/>
                Fitur Streak harian adalah kunci! Anak saya jaga terus rekornya agar tidak putus. Tanpa terasa, pemahamannya tentang nama hewan dan pola angka meningkat drastis dalam sebulan.
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div class="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🧔</div>
                <div>
                  <p class="font-heading text-sm font-black text-slate-800">Pak Hendra Wijaya</p>
                  <p class="text-[11px] text-slate-400">Orang Tua • Anak TK B, Surabaya</p>
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
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-heading font-extrabold text-xs">❓ FAQ</span>
            <h2 class="font-heading text-3xl font-black text-slate-800">
              Pertanyaan yang Sering Ditanyakan Orang Tua
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 font-body">
              Temukan jawaban lengkap seputar CountingDuo di bawah ini.
            </p>
          </div>

          <div class="space-y-3">
            <details v-for="(faq, idx) in faqs" :key="idx" class="bg-slate-50 border-2 border-slate-200 hover:border-duo-green rounded-2xl p-5 transition-all group cursor-pointer">
              <summary class="font-heading font-extrabold text-sm sm:text-base text-slate-800 cursor-pointer flex items-center justify-between gap-4 list-none">
                <span>{{ faq.q }}</span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform shrink-0 text-lg">▼</span>
              </summary>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pt-4 border-t border-slate-200/60 mt-4">
                {{ faq.a }}
              </p>
            </details>
          </div>

          <!-- Still have questions -->
          <p class="text-center text-sm text-slate-400 font-body">
            Masih ada pertanyaan? <button @click="handleGuestLogin" class="text-duo-blue font-bold underline cursor-pointer hover:text-duo-blue/80">Coba dulu aplikasinya gratis</button> atau hubungi kami.
          </p>
        </div>
      </section>

      <!-- FINAL CTA BANNER (LIGHT MODE 3D SHOWCASE) -->
      <section class="py-20 px-4 bg-sky-50 text-slate-800 text-center relative overflow-hidden border-t border-slate-200">
        <!-- Background Ambient Glow Spheres -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-200/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-3xl mx-auto space-y-8 relative z-10">
          <!-- Three.js 3D WebGL Mascot & Floating Reward Scene -->
          <ClientOnly>
            <Cta3DCanvas />
          </ClientOnly>

          <div class="space-y-4">
            <h2 class="font-heading text-3xl sm:text-5xl font-black text-slate-800 tracking-tight">
              Siap Memulai <span class="text-emerald-600">Petualangan Belajarmu?</span> 🚀
            </h2>
            <p class="text-sm sm:text-lg text-slate-600 font-body max-w-xl mx-auto leading-relaxed">
              Daftar gratis dalam 1 menit dan dapatkan bonus <span class="text-amber-600 font-bold">+50 XP</span> pertama untuk membuka Peta Jalur Belajar interaktif!
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <NuxtLink 
              to="/register" 
              class="w-full sm:w-auto px-10 py-4.5 duo-btn-green text-lg shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              id="btn-footer-register"
            >
              <span>🌟 Buat Akun Gratis Sekarang</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </NuxtLink>
            <NuxtLink 
              to="/catalog" 
              class="w-full sm:w-auto px-8 py-4.5 duo-btn-blue text-base shadow-lg flex items-center justify-center gap-2 group"
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

// SEO Meta Tags - Optimized for Indonesian parent search keywords
useSeoMeta({
  title: 'Aplikasi Belajar Anak TK & SD Gratis | Game Edukasi Interaktif - CountingDuo',
  description: 'CountingDuo — aplikasi belajar anak TK dan SD gratis terbaik 2026. Kuis matematika interaktif, game edukasi sains, dan latihan Bahasa Indonesia seru untuk anak usia 4–9 tahun. Tanpa iklan, 100% gratis.',
  keywords: 'aplikasi belajar anak TK gratis, kuis matematika anak SD, game edukasi anak, belajar berhitung anak TK, aplikasi edukasi anak 5 tahun, belajar sains anak SD, kuis interaktif anak, platform belajar gamifikasi',
  ogTitle: 'CountingDuo — Aplikasi Belajar Anak TK & SD Gratis, Seru & Tanpa Iklan',
  ogDescription: 'Membangun kemandirian belajar anak sejak dini secara interaktif dengan CountingDuo — platform edukasi gratis dengan 13 jenis soal interaktif, sistem XP, Streak harian, dan peta jalur belajar bergambar. Cocok untuk anak usia 4–9 tahun.',
  ogImage: '/images/og-banner.png',
  ogType: 'website',
  ogSiteName: 'CountingDuo',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CountingDuo — Game Edukasi Gratis Anak TK & SD',
  twitterDescription: 'Belajar Matematika, Sains & Bahasa jadi seru! 13 tipe kuis interaktif, XP Reward, dan Streak Harian. Gratis selamanya, tanpa iklan.'
})

// JSON-LD Structured Data — Organization + WebApplication + FAQPage + AggregateRating
useHead({
  link: [
    { rel: 'canonical', href: 'https://countingduo.id/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'CountingDuo',
        'url': 'https://countingduo.id',
        'logo': 'https://countingduo.id/images/logo.png',
        'description': 'Platform pembelajaran gamifikasi gratis untuk anak TK dan SD meliputi Matematika, Sains, Bahasa Indonesia, dan Seni Interaktif.',
        'sameAs': []
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'CountingDuo',
        'url': 'https://countingduo.id',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Web Browser, Android, iOS',
        'inLanguage': 'id-ID',
        'audience': {
          '@type': 'EducationalAudience',
          'educationalRole': 'student',
          'audienceType': 'Anak TK dan SD usia 4–9 tahun'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'IDR',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '342',
          'bestRating': '5',
          'worstRating': '1'
        },
        'description': 'Aplikasi belajar anak TK dan SD gratis terbaik. Kuis interaktif Matematika, Sains, dan Bahasa Indonesia dengan sistem gamifikasi XP dan Streak harian.'
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
            'name': 'Apakah CountingDuo benar-benar gratis tanpa biaya?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Ya, 100% gratis selamanya. Semua modul, kuis interaktif, dan peta jalur belajar dapat diakses tanpa biaya, tanpa iklan mengganggu, dan tanpa pembelian dalam aplikasi.' }
          },
          {
            '@type': 'Question',
            'name': 'Mata pelajaran apa saja yang tersedia di CountingDuo?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo mencakup 4 mata pelajaran utama: Matematika & Berhitung (angka 1-20, penjumlahan, pengurangan), Sains & Dunia Hewan (nama hewan, habitat, klasifikasi), Bahasa Indonesia (abjad, kata bergambar, membaca), dan Seni & Logika (warna, bentuk, kreativitas).' }
          },
          {
            '@type': 'Question',
            'name': 'Untuk anak usia berapa CountingDuo cocok digunakan?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo dirancang untuk anak usia 4 hingga 9 tahun, mencakup jenjang PAUD, TK A, TK B, serta Sekolah Dasar Kelas 1 hingga Kelas 3.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah CountingDuo sesuai dengan Kurikulum Merdeka?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Ya, konten pembelajaran CountingDuo diselaraskan dengan tujuan Kurikulum Merdeka, fokus pada pemahaman konsep dasar melalui pendekatan bermain dan eksplorasi yang menyenangkan.' }
          },
          {
            '@type': 'Question',
            'name': 'Bagaimana orang tua bisa memantau perkembangan anak?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo menyediakan halaman Dasbor Orang Tua yang menampilkan statistik belajar anak: modul yang telah diselesaikan, XP terkumpul, Streak harian, dan soal-soal yang paling sering dijawab salah.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah bisa digunakan tanpa membuat akun?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Bisa! Tersedia Mode Tamu untuk langsung mencoba kuis tanpa registrasi. Namun, disarankan membuat akun gratis agar progres belajar, XP, dan Streak anak tersimpan secara permanen.' }
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

// Steps: Cara Kerja (How It Works)
const steps = [
  {
    number: '01',
    icon: '🗺️',
    title: 'Pilih Mata Pelajaran',
    desc: 'Jelajahi katalog modul Matematika, Sains, atau Bahasa. Setiap modul tersusun dalam Peta Jalur berjenjang dari mudah hingga menantang.',
    color: 'emerald'
  },
  {
    number: '02',
    icon: '🎮',
    title: 'Jawab Kuis Interaktif',
    desc: 'Selesaikan 13 jenis soal seru: pilihan ganda, tarik garis, seret-lepas, kartu memori, dan banyak lagi. Setiap jawaban benar mendapat XP!',
    color: 'blue'
  },
  {
    number: '03',
    icon: '🏆',
    title: 'Kumpulkan Hadiah',
    desc: 'Raih bintang, kumpulkan XP, dan jaga Streak harian. Semakin banyak belajar, semakin tinggi peringkat di Papan Pemimpin!',
    color: 'amber'
  }
]

// Trust badges
const trustBadges = [
  { icon: '✅', text: '100% Gratis Selamanya' },
  { icon: '🚫', text: 'Tanpa Iklan Mengganggu' },
  { icon: '📚', text: 'Sesuai Kurikulum Merdeka' },
  { icon: '🔒', text: 'Aman Untuk Anak' },
  { icon: '📱', text: 'Bisa Di HP & Laptop' },
  { icon: '🌐', text: 'Bahasa Indonesia' },
]

const faqs = [
  {
    q: 'Apakah CountingDuo benar-benar gratis tanpa biaya apapun?',
    a: 'Ya, 100% gratis selamanya! Semua modul pembelajaran, peta jalur, dan kuis interaktif dapat diakses tanpa biaya, tanpa iklan mengganggu, dan tanpa pembelian dalam aplikasi (in-app purchase).'
  },
  {
    q: 'Mata pelajaran apa saja yang tersedia?',
    a: 'CountingDuo mencakup 4 mata pelajaran: Matematika & Berhitung (angka 1-20, penjumlahan, pola), Sains & Dunia Hewan (nama hewan, habitat, klasifikasi), Bahasa Indonesia (abjad, kata bergambar, membaca), dan Seni & Logika (warna, bentuk, kreativitas).'
  },
  {
    q: 'Untuk anak usia berapa CountingDuo cocok?',
    a: 'Dirancang khusus untuk anak usia 4–9 tahun, meliputi jenjang PAUD, TK A, TK B, serta SD Kelas 1 hingga Kelas 3.'
  },
  {
    q: 'Apakah kontennya sesuai Kurikulum Merdeka?',
    a: 'Ya, konten CountingDuo diselaraskan dengan tujuan Kurikulum Merdeka yang menekankan pemahaman konsep dasar melalui pendekatan bermain (play-based learning) yang menyenangkan dan tidak membebani.'
  },
  {
    q: 'Bagaimana sistem Nyawa dan Streak bekerja?',
    a: 'Siswa memulai dengan 5 nyawa (❤️). Setiap jawaban salah, nyawa berkurang 1. Nyawa dapat diisi ulang gratis. Streak 🔥 mengukur konsistensi belajar harian berturut-turut — semakin panjang streak, semakin besar bonus XP!'
  },
  {
    q: 'Bagaimana orang tua bisa memantau perkembangan anak?',
    a: 'CountingDuo memiliki halaman Dasbor Orang Tua yang menampilkan statistik belajar: modul yang sudah diselesaikan, total XP terkumpul, panjang Streak harian, dan daftar soal yang paling sering dijawab salah.'
  }
]
</script>
