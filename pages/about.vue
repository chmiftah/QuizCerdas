<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <main id="main-content" class="flex-1 space-y-16 sm:space-y-24 py-8 sm:py-12 safe-mobile-padding">
      
      <!-- ===================================================================== -->
      <!-- 1. HERO SECTION (STORYTELLING & INTERACTIVE EDTECH PRODUCT VIBE)      -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Hero Section">
        <div class="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 rounded-[36px] p-6 sm:p-12 text-white shadow-2xl overflow-hidden border-2 border-slate-800">
          <!-- Ambient Background Glows -->
          <div class="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <!-- Left Text Column -->
            <div class="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-heading font-black text-amber-300 border border-white/15 shadow-2xs">
                <span>🦉 Dunia Belajar CountingDuo</span>
              </div>

              <h1 class="font-heading text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                Belajar Bukan Lagi <br class="hidden sm:inline" />
                Duduk dan <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Menghafal.</span>
              </h1>

              <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                CountingDuo mengubah belajar anak menjadi petualangan interaktif yang membuat si kecil aktif mencoba, bermain, dan memahami konsep secara mandiri.
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <NuxtLink 
                  to="/catalog" 
                  class="px-6 py-3.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm shadow-lg border-b-4 border-[#3b8a02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>🚀 Mulai Petualangan</span>
                </NuxtLink>
                <a 
                  href="#cara-belajar" 
                  class="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-heading font-black text-sm border border-white/20 backdrop-blur-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Lihat Cara Belajar</span>
                  <span class="text-xs">↓</span>
                </a>
              </div>
            </div>

            <!-- Right Visual Column: Interactive World UI Mockup -->
            <div class="lg:col-span-5 relative flex justify-center">
              <div class="w-full max-w-sm bg-slate-900/90 rounded-3xl p-5 border-2 border-slate-700/80 shadow-2xl backdrop-blur-md space-y-4 transform hover:rotate-1 transition-transform duration-300">
                <!-- Mini Header inside Mockup -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-heading text-lg font-black shadow-xs">
                      🦉
                    </div>
                    <div>
                      <div class="font-heading font-black text-xs text-white">Petualangan Kiko</div>
                      <div class="text-[10px] text-emerald-400 font-bold">Bioma 1 • Hutan Angka</div>
                    </div>
                  </div>
                  <div class="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full font-heading font-black text-[10px]">
                    ⭐ +120 XP
                  </div>
                </div>

                <!-- Learning Path Representation -->
                <div class="space-y-3 py-2">
                  <!-- Node 1: Completed -->
                  <div class="flex items-center gap-3 p-2.5 bg-emerald-950/40 rounded-2xl border border-emerald-500/30">
                    <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                      ✓
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-heading font-bold text-xs text-white truncate">1. Mengenal Angka 1–5</div>
                      <div class="text-[10px] text-slate-400">Selesai • Hebat!</div>
                    </div>
                    <span class="text-[10px] text-amber-300 font-bold">+20 XP</span>
                  </div>

                  <!-- Node 2: Active (Glowing) -->
                  <div class="flex items-center gap-3 p-2.5 bg-emerald-500/20 rounded-2xl border-2 border-emerald-400 shadow-md animate-pulse">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-[#58cc02] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                      ▶
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-heading font-black text-xs text-white truncate">2. Menghitung Apel</div>
                      <div class="text-[10px] text-emerald-300 font-bold">Mulai di Sini!</div>
                    </div>
                    <span class="text-[10px] text-amber-300 font-black">+20 XP</span>
                  </div>

                  <!-- Node 3: Checkpoint -->
                  <div class="flex items-center gap-3 p-2.5 bg-slate-800/60 rounded-2xl border border-slate-700">
                    <div class="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs font-black shrink-0">
                      👑
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-heading font-bold text-xs text-slate-300 truncate">3. Ujian Checkpoint</div>
                      <div class="text-[10px] text-slate-500">Tantangan Bioma 1</div>
                    </div>
                    <span class="text-[10px] text-purple-300 font-bold">+50 XP</span>
                  </div>
                </div>

                <!-- Floating Kiko Speech Bubble -->
                <div class="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 p-2.5 rounded-2xl font-heading font-black text-xs text-center shadow-md">
                  "Belajar sambil bermain selalu lebih seru!" ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 2. PRODUCT FACTS (REAL METRICS ONLY - NO FAKE STATS)                 -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Fakta Produk">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm text-center space-y-1 hover:border-emerald-300 transition-colors">
            <div class="text-3xl mb-1">🎮</div>
            <div class="font-heading text-3xl sm:text-4xl font-black text-emerald-600">29+</div>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Aktivitas Interaktif</div>
            <p class="text-[11px] text-slate-500 font-body">Kinestetik, visual, logika & audio</p>
          </div>

          <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm text-center space-y-1 hover:border-amber-300 transition-colors">
            <div class="text-3xl mb-1">🐾</div>
            <div class="font-heading text-3xl sm:text-4xl font-black text-amber-600">4</div>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Teman Belajar</div>
            <p class="text-[11px] text-slate-500 font-body">Kiko, Leo, Mimi, dan Bao</p>
          </div>

          <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm text-center space-y-1 hover:border-sky-300 transition-colors">
            <div class="text-3xl mb-1">🌱</div>
            <div class="font-heading text-3xl sm:text-4xl font-black text-sky-600">TK – SD</div>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Jenjang Belajar</div>
            <p class="text-[11px] text-slate-500 font-body">Kurikulum usia 4 hingga 9 tahun</p>
          </div>

          <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-sm text-center space-y-1 hover:border-purple-300 transition-colors">
            <div class="text-3xl mb-1">🛡️</div>
            <div class="font-heading text-3xl sm:text-4xl font-black text-purple-600">100%</div>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Tanpa Iklan</div>
            <p class="text-[11px] text-slate-500 font-body">Fokus belajar tanpa distraksi luar</p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 3. SECTION "APA ITU COUNTINGDUO?" (5-SECOND UNDERSTANDING)           -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Apa Itu CountingDuo">
        <div class="bg-white rounded-[36px] p-6 sm:p-12 border-2 border-slate-200 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <!-- Left Copywriting -->
            <div class="lg:col-span-6 space-y-4">
              <span class="px-3.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
                Mengenal Platform
              </span>
              <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Satu Dunia Belajar untuk Anak
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                CountingDuo adalah platform pembelajaran interaktif untuk anak yang menggabungkan materi kurikulum, permainan kinestetik, latihan terarah, dan perjalanan belajar dalam satu pengalaman yang utuh.
              </p>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                Di sini, anak tidak dituntut menghafal rumus secara kaku. Mereka diajak bereksplorasi langkah demi langkah di sepanjang peta petualangan, memecahkan teka-teki logika, mengamati sains alam, dan melatih pelafalan bahasa dengan rasa percaya diri.
              </p>
            </div>

            <!-- Right Visual: 5-Step Product Pipeline -->
            <div class="lg:col-span-6 bg-slate-50 rounded-3xl p-6 border-2 border-slate-200/80 space-y-3">
              <div class="text-xs font-heading font-black text-slate-500 uppercase tracking-wider mb-2">
                Alur Pengalaman Belajar di CountingDuo
              </div>

              <div class="space-y-2">
                <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-heading font-black text-sm shrink-0">
                    📚
                  </div>
                  <div>
                    <div class="font-heading font-black text-xs text-slate-800">1. Modul Pembelajaran Terstruktur</div>
                    <div class="text-[11px] text-slate-500">Materi disesuaikan dengan kurikulum PAUD, TK A, TK B, dan SD awal.</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div class="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-heading font-black text-sm shrink-0">
                    🗺️
                  </div>
                  <div>
                    <div class="font-heading font-black text-xs text-slate-800">2. Peta Jalur Petualangan</div>
                    <div class="text-[11px] text-slate-500">Anak melihat titik awal, pos yang sedang aktif, dan target berikutnya.</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-heading font-black text-sm shrink-0">
                    🎯
                  </div>
                  <div>
                    <div class="font-heading font-black text-xs text-slate-800">3. Pelajaran Bertahap (Micro-Lessons)</div>
                    <div class="text-[11px] text-slate-500">Sesi ringkas 5–10 menit yang tidak membuat anak cepat lelah.</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div class="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-heading font-black text-sm shrink-0">
                    🎮
                  </div>
                  <div>
                    <div class="font-heading font-black text-xs text-slate-800">4. 29 Ragam Aktivitas Bermain</div>
                    <div class="text-[11px] text-slate-500">Sentuh, seret, tebalkan angka, susun puzzle, hingga bersuara.</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div class="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-sm">
                    ⭐
                  </div>
                  <div>
                    <div class="font-heading font-black text-xs text-slate-800">5. Kemajuan Nyata & Bintang XP</div>
                    <div class="text-[11px] text-slate-500">Membangun rasa bangga dan memotivasi anak untuk terus belajar rutin.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 4. SECTION "BAGAIMANA ANAK BELAJAR?" (4 LANGKAH JELAS)               -->
      <!-- ===================================================================== -->
      <section id="cara-belajar" class="max-w-6xl mx-auto px-4 space-y-8" aria-label="Cara Anak Belajar">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Metode Belajar
          </span>
          <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Bagaimana Anak Belajar?
          </h2>
          <p class="text-slate-600 text-xs sm:text-sm font-body">
            Empat langkah sederhana yang membangun pemahaman konsep secara mendalam tanpa paksaan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Step 1 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-black">
              🗺️
            </div>
            <div class="text-[11px] font-heading font-black text-emerald-600 uppercase tracking-wider">
              Langkah 01
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Jelajahi</h3>
            <p class="text-xs text-slate-600 font-body leading-relaxed">
              Anak memilih modul petualangan sesuai jenjang usia dan mata pelajaran yang disukai: Berhitung, Hewan, atau Bahasa.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl font-black">
              📖
            </div>
            <div class="text-[11px] font-heading font-black text-sky-600 uppercase tracking-wider">
              Langkah 02
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Pelajari</h3>
            <p class="text-xs text-slate-600 font-body leading-relaxed">
              Konsep diperkenalkan lewat visual ceria, ilustrasi autentik, suara narasi Indonesia yang jernih, dan petunjuk Kiko.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-black">
              🎮
            </div>
            <div class="text-[11px] font-heading font-black text-amber-600 uppercase tracking-wider">
              Langkah 03
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Mainkan</h3>
            <p class="text-xs text-slate-600 font-body leading-relaxed">
              Anak aktif menyentuh layar, memindahkan kepingan angka, menyeimbangkan neraca, atau membaca nyaring dengan mikrofon.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3 relative hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl font-black">
              ⭐
            </div>
            <div class="text-[11px] font-heading font-black text-purple-600 uppercase tracking-wider">
              Langkah 04
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Bertumbuh</h3>
            <p class="text-xs text-slate-600 font-body leading-relaxed">
              Anak merayakan keberhasilan dengan bintang XP, mempertahankan streak hari, membuka checkpoint, dan lanjut ke bioma baru!
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 5. FEATURED ACTIVITY SPOTLIGHT (INTERACTIVE DEMO: BUKAN PILIHAN GANDA) -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Aktivitas Unggulan">
        <div class="bg-gradient-to-br from-emerald-50 via-white to-amber-50 rounded-[36px] p-6 sm:p-12 border-3 border-emerald-200 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <!-- Left Narrative -->
            <div class="lg:col-span-6 space-y-4 text-center lg:text-left">
              <span class="px-3.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-heading font-black text-xs uppercase tracking-wider">
                Pengalaman Bermain Nyata
              </span>
              <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                Bukan Sekadar Memilih Jawaban
              </h2>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                Anak belajar dengan menyentuh, menyeret, menyusun, mendengar, membaca, dan bereksperimen. Bukan sekadar menebak huruf A, B, atau C.
              </p>
              <div class="pt-2 text-xs font-heading font-bold text-slate-500">
                👇 Coba ketuk apel di samping untuk mencoba interaksi:
              </div>
            </div>

            <!-- Right Interactive Mini Demo (Count & Touch Simulation) -->
            <div class="lg:col-span-6 flex justify-center">
              <div class="w-full max-w-md bg-white rounded-3xl p-6 border-3 border-emerald-300 shadow-xl space-y-5 text-center">
                <div class="space-y-1">
                  <div class="text-[11px] font-heading font-black text-emerald-700 uppercase tracking-wide">
                    Simulasi: Hitung & Sentuh Objek
                  </div>
                  <h4 class="font-heading font-black text-base text-slate-800">
                    "Ketuk setiap buah apel untuk menghitung!"
                  </h4>
                </div>

                <!-- Apples Touch Area -->
                <div class="flex items-center justify-center gap-4 py-2">
                  <button 
                    v-for="apple in demoApples" 
                    :key="apple.id"
                    @click="toggleApple(apple.id)"
                    class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all duration-200 cursor-pointer active:scale-90 border-2"
                    :class="apple.counted 
                      ? 'bg-emerald-100 border-emerald-400 scale-105 shadow-md' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 shadow-xs'"
                    :title="`Apel ${apple.id}`"
                  >
                    <span>🍎</span>
                    <span 
                      v-if="apple.counted"
                      class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white font-heading font-black text-xs flex items-center justify-center shadow-md animate-pop border-2 border-white"
                    >
                      {{ apple.number }}
                    </span>
                  </button>
                </div>

                <!-- Live Counter Badge -->
                <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div class="text-xs font-heading font-bold text-slate-600">
                    Apel Terhitung:
                  </div>
                  <div class="font-heading font-black text-sm text-emerald-600 flex items-center gap-1.5">
                    <span>{{ countedApplesCount }} / 3 Apel</span>
                    <span v-if="countedApplesCount === 3">🎉 Hebat!</span>
                  </div>
                </div>

                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="resetDemoApples"
                    class="text-xs font-heading font-bold text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  >
                    Reset Hitungan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 6. SECTION 29 AKTIVITAS (COMPACT PREVIEW + INTERACTIVE EXPLORER)     -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4 space-y-8" aria-label="29 Aktivitas Interaktif">
        <div class="text-center max-w-3xl mx-auto space-y-2">
          <span class="px-3.5 py-1 bg-purple-100 text-purple-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Ragam Pembelajaran
          </span>
          <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Belajar dengan 29 Cara Berbeda
          </h2>
          <p class="text-slate-600 text-xs sm:text-sm font-body max-w-xl mx-auto">
            Tidak semua anak belajar dengan cara yang sama. Karena itu CountingDuo menghadirkan berbagai bentuk aktivitas kinestetik, visual, logika, dan bahasa.
          </p>
        </div>

        <!-- 4 Category Breakdown Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-2xl p-4 border-2 border-emerald-200 text-center space-y-1">
            <span class="text-2xl">🔢</span>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Angka & Hitung</div>
            <div class="text-xs text-emerald-600 font-black">8 Aktivitas</div>
          </div>
          <div class="bg-white rounded-2xl p-4 border-2 border-sky-200 text-center space-y-1">
            <span class="text-2xl">🎨</span>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Visual & Gambar</div>
            <div class="text-xs text-sky-600 font-black">7 Aktivitas</div>
          </div>
          <div class="bg-white rounded-2xl p-4 border-2 border-amber-200 text-center space-y-1">
            <span class="text-2xl">🧩</span>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Logika & Pola</div>
            <div class="text-xs text-amber-600 font-black">8 Aktivitas</div>
          </div>
          <div class="bg-white rounded-2xl p-4 border-2 border-purple-200 text-center space-y-1">
            <span class="text-2xl">🔤</span>
            <div class="font-heading font-black text-xs sm:text-sm text-slate-800">Bahasa & Audio</div>
            <div class="text-xs text-purple-600 font-black">6 Aktivitas</div>
          </div>
        </div>

        <!-- Featured 8 Compact Sample Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div 
            v-for="item in featuredSampleActivities" 
            :key="item.id"
            class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-2 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-3xl">{{ item.icon }}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-black" :class="item.badgeClass">
                  {{ item.categoryName }}
                </span>
              </div>
              <h4 class="font-heading font-black text-sm text-slate-800 leading-snug">
                {{ item.name }}
              </h4>
              <p class="text-xs text-slate-500 font-body line-clamp-2">
                {{ item.description }}
              </p>
            </div>
            <div class="pt-2 border-t border-slate-100 text-[11px] font-heading font-bold text-slate-400">
              Contoh: {{ item.example }}
            </div>
          </div>
        </div>

        <!-- Button to Open Full Interactive Explorer Drawer/Modal -->
        <div class="text-center pt-2">
          <button 
            @click="showAllActivitiesModal = true"
            class="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-heading font-black text-sm shadow-md active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>🔍 Lihat & Jelajahi Semua 29 Aktivitas</span>
            <span class="px-2 py-0.5 bg-white/20 text-white rounded-full text-xs">29 Jenis</span>
          </button>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 7. CHARACTER SECTION (STORYTELLING & COMPANION FRIENDS)              -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4 space-y-8" aria-label="Teman Petualangan">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Sahabat Belajar
          </span>
          <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Kenalan dengan Teman Petualanganmu
          </h2>
          <p class="text-slate-600 text-xs sm:text-sm font-body">
            Setiap modul didampingi sahabat ceria yang siap memberikan semangat, petunjuk, dan perayaan!
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Kiko -->
          <div class="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:border-emerald-400 hover:shadow-md transition-all">
            <div class="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-5xl shadow-2xs">
              🦉
            </div>
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-heading font-black uppercase">
                Matematika
              </span>
              <h3 class="font-heading text-xl font-black text-slate-800">Kiko</h3>
              <p class="text-xs font-heading font-bold text-emerald-700">Pemandu Logika & Berhitung</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-heading font-bold text-slate-600 italic">
              "Aku suka angka, logika, dan tantangan yang seru!"
            </div>
          </div>

          <!-- Leo -->
          <div class="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:border-amber-400 hover:shadow-md transition-all">
            <div class="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-5xl shadow-2xs">
              🦁
            </div>
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-heading font-black uppercase">
                Sains & Alam
              </span>
              <h3 class="font-heading text-xl font-black text-slate-800">Leo</h3>
              <p class="text-xs font-heading font-bold text-amber-700">Pemandu Dunia Hewan</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-heading font-bold text-slate-600 italic">
              "Ayo berani menjelajahi keajaiban binatang di bumi!"
            </div>
          </div>

          <!-- Mimi -->
          <div class="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:border-sky-400 hover:shadow-md transition-all">
            <div class="w-20 h-20 rounded-3xl bg-sky-50 border border-sky-200 flex items-center justify-center text-5xl shadow-2xs">
              🐱
            </div>
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full text-[10px] font-heading font-black uppercase">
                Bahasa & Membaca
              </span>
              <h3 class="font-heading text-xl font-black text-slate-800">Mimi</h3>
              <p class="text-xs font-heading font-bold text-sky-700">Pemandu Kata & Ejaan</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-heading font-bold text-slate-600 italic">
              "Bicara nyaring dan temukan banyak kosakata baru!"
            </div>
          </div>

          <!-- Bao -->
          <div class="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:border-purple-400 hover:shadow-md transition-all">
            <div class="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-200 flex items-center justify-center text-5xl shadow-2xs">
              🐼
            </div>
            <div class="space-y-1">
              <span class="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-[10px] font-heading font-black uppercase">
                Bentuk & Puzzle
              </span>
              <h3 class="font-heading text-xl font-black text-slate-800">Bao</h3>
              <p class="text-xs font-heading font-bold text-purple-700">Pemandu Geometri & Waktu</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-heading font-bold text-slate-600 italic">
              "Tenang dan teliti saat menyusun setiap keping puzzle."
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 8. "SERU UNTUK ANAK, NYAMAN UNTUK ORANG TUA" (TWO-SIDED VALUE)       -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4 space-y-8" aria-label="Nilai untuk Anak dan Orang Tua">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="px-3.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Pengalaman Menyeluruh
          </span>
          <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Seru untuk Anak. Nyaman untuk Orang Tua.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <!-- Untuk Anak -->
          <div class="bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 border-2 border-emerald-300 shadow-sm space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-black shadow-sm">
                🎮
              </div>
              <div>
                <h3 class="font-heading text-xl font-black text-slate-800">Untuk Anak</h3>
                <p class="text-xs font-heading font-semibold text-emerald-700">Belajar yang terasa seperti bermain</p>
              </div>
            </div>

            <ul class="space-y-3 font-body text-xs sm:text-sm text-slate-700">
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">✨</span>
                <span><strong>Aktivitas interaktif beragam:</strong> Menghitung, mewarnai, menyusun puzzle, dan labirin.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">🗺️</span>
                <span><strong>Peta petualangan visual:</strong> Menjelajahi bioma bertingkat dengan checkpoint tantangan.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">⭐</span>
                <span><strong>Perolehan XP & streak:</strong> Hadiah positif yang membangun kebanggaan diri tanpa rasa takut gagal.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">🔊</span>
                <span><strong>Audio & visual ramah mata:</strong> Narasi suara bahasa Indonesia yang membimbing setiap langkah.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">🦉</span>
                <span><strong>Sahabat Kiko & kawan-kawan:</strong> Teman belajar setia yang memberi petunjuk saat bingung.</span>
              </li>
            </ul>
          </div>

          <!-- Untuk Orang Tua -->
          <div class="bg-gradient-to-br from-sky-50 via-white to-sky-100/50 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 border-2 border-sky-300 shadow-sm space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl font-black shadow-sm">
                👨‍👩‍👧
              </div>
              <div>
                <h3 class="font-heading text-xl font-black text-slate-800">Untuk Orang Tua</h3>
                <p class="text-xs font-heading font-semibold text-sky-700">Tenang & mudah dipantau</p>
              </div>
            </div>

            <ul class="space-y-3 font-body text-xs sm:text-sm text-slate-700">
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">📈</span>
                <span><strong>Progres belajar transparan:</strong> Mengetahui materi apa saja yang sudah diselesaikan anak.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">🛡️</span>
                <span><strong>100% Bebas iklan komersial:</strong> Lingkungan bermain bersih tanpa konten luar yang membahayakan.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">🇮🇩</span>
                <span><strong>Pengantar Bahasa Indonesia:</strong> Kosa kata dan ejaan yang tepat sesuai kurikulum nasional.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">📚</span>
                <span><strong>Materi bertingkat:</strong> Penataan materi logis dari pengenalan awal hingga pemecahan masalah.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-base shrink-0">⏱️</span>
                <span><strong>Screen-time sehat:</strong> Sesi latihan singkat 5–10 menit yang mudah disesuaikan dengan rutinitas harian.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 9. PRINSIP & FILOSOFI PRODUK ("KAMI PERCAYA...")                     -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4 space-y-8" aria-label="Prinsip Produk">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Filosofi Belajar
          </span>
          <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Kami Percaya...
          </h2>
          <p class="text-slate-600 text-xs sm:text-sm font-body">
            Empat keyamanan mendasar yang menjadi fondasi setiap fitur di CountingDuo.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-2">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl font-black">
              💡
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Anak tidak harus takut salah</h3>
            <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
              Kesalahan bukanlah kegagalan, melainkan petunjuk alami untuk memahami konsep. Di CountingDuo, anak selalu didukung untuk mencoba lagi tanpa kata-kata yang menghakimi.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl font-black">
              🖐️
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Belajar harus terasa aktif</h3>
            <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
              Anak usia dini belajar optimal melalui keterlibatan langsung: menyentuh gambar, menggeser benda, mendengar ritme suku kata, dan mengamati perubahan bentuk.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-2">
            <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center text-xl font-black">
              🌱
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Progres lebih penting daripada skor</h3>
            <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
              Tujuan utama bukanlah menjadi sempurna dalam satu hari, melainkan menumbuhkan kebiasaan belajar rutin dengan rasa gembira dan rasa ingin tahu yang terus bertumbuh.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-2">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center text-xl font-black">
              🛡️
            </div>
            <h3 class="font-heading text-lg font-black text-slate-800">Teknologi harus membantu, bukan mengganggu</h3>
            <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
              Desain aplikasi dibuat tenang, ramah anak, dan fokus pada konten edukasi. Kami menolak jebakan visual casino atau notifikasi berlebihan yang dapat mendistraksi si kecil.
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 10. TEKNOLOGI BERMAKNA (BELAJAR SEDIKIT DEMI SEDIKIT & SUARA)         -->
      <!-- ===================================================================== -->
      <section class="max-w-6xl mx-auto px-4" aria-label="Teknologi Edukasi">
        <div class="bg-white rounded-[36px] p-6 sm:p-12 border-2 border-slate-200 shadow-sm space-y-8">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="px-3.5 py-1 bg-slate-100 text-slate-700 rounded-full font-heading font-black text-xs uppercase tracking-wider">
              Pendekatan Teruji
            </span>
            <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Teknologi Sederhana yang Membantu
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3 p-6 bg-amber-50/60 rounded-3xl border border-amber-200">
              <div class="text-3xl">⏳</div>
              <h3 class="font-heading text-lg font-black text-slate-800">Belajar Sedikit demi Sedikit</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Materi dirancang dalam sesi pendek 5–10 menit per hari. Konsep yang telah dipelajari diulang berkala (pengulangan berjarak) agar ingatan matematika dan literasi anak melekat lebih lama tanpa membuat mereka bosan.
              </p>
            </div>

            <div class="space-y-3 p-6 bg-purple-50/60 rounded-3xl border border-purple-200">
              <div class="text-3xl">🎤</div>
              <h3 class="font-heading text-lg font-black text-slate-800">Anak Bisa Berbicara, Bukan Hanya Menekan</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Dengan fitur membaca nyaring (*speech recognition* ramah anak), anak melafalkan kata secara langsung. Setiap kata yang dibaca dengan benar langsung menyala hijau, melatih keberanian dan kejelasan artikulasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 11. FAQ SINGKAT ORANG TUA                                             -->
      <!-- ===================================================================== -->
      <section class="max-w-4xl mx-auto px-4 space-y-6" aria-label="FAQ">
        <div class="text-center space-y-2">
          <span class="px-3.5 py-1 bg-slate-100 text-slate-700 rounded-full font-heading font-black text-xs uppercase tracking-wider">
            Pertanyaan Umum
          </span>
          <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(faq, fIdx) in faqs" 
            :key="fIdx"
            class="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 transition-all cursor-pointer"
            @click="faq.open = !faq.open"
          >
            <div class="flex items-center justify-between gap-3">
              <h4 class="font-heading font-black text-xs sm:text-sm text-slate-800">
                {{ faq.question }}
              </h4>
              <span class="text-slate-400 font-black text-sm shrink-0">
                {{ faq.open ? '−' : '+' }}
              </span>
            </div>
            <p v-if="faq.open" class="mt-2 text-xs sm:text-sm text-slate-600 font-body leading-relaxed pt-2 border-t border-slate-100">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 12. FINAL CTA SECTION                                                -->
      <!-- ===================================================================== -->
      <section class="max-w-5xl mx-auto px-4" aria-label="Mulai Belajar">
        <div class="bg-gradient-to-r from-emerald-500 via-teal-500 to-[#58cc02] rounded-[36px] p-8 sm:p-12 text-center text-white shadow-xl space-y-6 relative overflow-hidden border-4 border-emerald-300">
          <div class="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mx-auto border border-white/30 shadow-sm">
            🗺️
          </div>

          <div class="space-y-2 max-w-xl mx-auto">
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
              Siap Memulai Petualangan?
            </h2>
            <p class="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
              Pilih pelajaran pertama dan biarkan anak menemukan bahwa belajar bisa terasa menyenangkan.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <NuxtLink 
              to="/catalog" 
              class="px-7 py-3.5 bg-white hover:bg-slate-50 text-emerald-900 rounded-2xl font-heading font-black text-sm shadow-lg active:scale-95 transition-all"
            >
              🚀 Mulai Belajar Gratis
            </NuxtLink>
            <NuxtLink 
              to="/catalog" 
              class="px-6 py-3.5 bg-black/15 hover:bg-black/25 text-white rounded-2xl font-heading font-black text-sm border border-white/30 backdrop-blur-xs active:scale-95 transition-all"
            >
              🗺️ Jelajahi Modul
            </NuxtLink>
          </div>
        </div>
      </section>

    </main>

    <!-- ===================================================================== -->
    <!-- INTERACTIVE MODAL: EXPLORER 29 AKTIVITAS LENGKAP                     -->
    <!-- ===================================================================== -->
    <Teleport to="body">
      <div 
        v-if="showAllActivitiesModal" 
        class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        @click.self="showAllActivitiesModal = false"
      >
        <div class="bg-white rounded-3xl sm:rounded-[36px] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border-4 border-purple-300 overflow-hidden animate-pop">
          <!-- Modal Header -->
          <div class="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-heading text-lg font-black">
                🎯
              </div>
              <div>
                <h3 class="font-heading text-lg sm:text-xl font-black text-slate-800">
                  Daftar Lengkap 29 Jenis Soal & Aktivitas
                </h3>
                <p class="text-xs text-slate-500 font-body">
                  Pilih kategori atau ketik kata kunci untuk melihat detail mekanisme kuis.
                </p>
              </div>
            </div>
            <button 
              @click="showAllActivitiesModal = false"
              class="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-sm font-black transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              ✕
            </button>
          </div>

          <!-- Filter & Search Toolbar inside Modal -->
          <div class="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <button 
                v-for="cat in exerciseCategories" 
                :key="cat.id"
                @click="modalCategoryFilter = cat.id"
                class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1"
                :class="modalCategoryFilter === cat.id ? 'bg-purple-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ cat.name }}</span>
                <span class="text-[10px] px-1 py-0.2 rounded-full" :class="modalCategoryFilter === cat.id ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-500'">
                  {{ cat.count }}
                </span>
              </button>
            </div>

            <!-- Search input -->
            <div class="relative w-full sm:w-60">
              <input 
                v-model="modalSearchQuery"
                type="text" 
                placeholder="Cari aktivitas..."
                class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-heading font-bold text-slate-800 focus:bg-white focus:border-purple-500 outline-none"
              />
              <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            </div>
          </div>

          <!-- Scrollable Activity List inside Modal -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="act in filteredModalActivities" 
                :key="act.id"
                class="p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-300 bg-slate-50/50 hover:bg-white transition-all space-y-2"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl">{{ act.icon }}</span>
                    <h4 class="font-heading font-black text-sm text-slate-800">{{ act.number }}. {{ act.name }}</h4>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-black" :class="act.badgeClass">
                    {{ act.categoryName }}
                  </span>
                </div>
                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  {{ act.description }}
                </p>
                <div class="text-[11px] font-heading font-bold text-slate-500 bg-white p-2 rounded-xl border border-slate-200">
                  <span class="text-purple-700">Contoh:</span> {{ act.example }}
                </div>
              </div>
            </div>

            <div v-if="filteredModalActivities.length === 0" class="py-12 text-center text-slate-500 font-heading text-xs">
              Tidak ada aktivitas yang sesuai dengan pencarian "{{ modalSearchQuery }}".
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-heading">
            <span class="text-slate-500">Total: {{ filteredModalActivities.length }} Aktivitas</span>
            <NuxtLink 
              to="/catalog" 
              class="duo-btn-green px-4 py-2 font-heading font-black text-xs flex items-center gap-1"
            >
              <span>🚀 Coba di Modul Belajar</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- App Footer -->
    <footer class="bg-white border-t border-slate-200 py-10 font-heading text-xs text-slate-500 mt-12">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div class="col-span-2 sm:col-span-1 space-y-2">
          <div class="flex items-center gap-2 font-black text-slate-800 text-sm">
            <span>🦉</span> CountingDuo
          </div>
          <p class="text-slate-400 font-normal font-body">
            Platform pembelajaran anak usia dini dan SD awal berbasis petualangan interaktif ramah anak.
          </p>
        </div>

        <div class="space-y-2">
          <div class="font-black text-slate-800 uppercase tracking-wider">Belajar</div>
          <ul class="space-y-1.5 font-bold">
            <li><NuxtLink to="/catalog" class="hover:text-duo-green">Katalog Modul</NuxtLink></li>
            <li><NuxtLink to="/leaderboard" class="hover:text-duo-green">Liga & Peringkat</NuxtLink></li>
            <li><NuxtLink to="/coloring" class="hover:text-duo-green">Mewarnai Gambar</NuxtLink></li>
            <li><NuxtLink to="/tracing" class="hover:text-duo-green">Tebalkan Garis</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <div class="font-black text-slate-800 uppercase tracking-wider">Orang Tua</div>
          <ul class="space-y-1.5 font-bold">
            <li><NuxtLink to="/parent-dashboard" class="hover:text-duo-green">Dashboard Pemantauan</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="hover:text-duo-green">Paket Belajar Pro</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <div class="font-black text-slate-800 uppercase tracking-wider">Tentang</div>
          <ul class="space-y-1.5 font-bold">
            <li><NuxtLink to="/about" class="text-duo-green">Tentang CountingDuo</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="hover:text-duo-green">Mulai Belajar</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-slate-100 text-center text-slate-400">
        © 2026 CountingDuo • Dibuat dengan cinta untuk anak-anak Indonesia.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Tentang CountingDuo — Platform Belajar Ceria & Interaktif Anak Indonesia',
  description: 'Kenali visi CountingDuo dalam menghadirkan platform edukasi gamifikasi ramah anak usia 4–9 tahun. Dilengkapi 29 jenis kuis interaktif, audio jernih, dan petualangan belajar.',
  keywords: 'tentang countingduo, aplikasi edukasi anak indonesia, metode belajar anak tk sd, kuis matematika ceria, platform calistung interaktif',
  ogTitle: 'Tentang CountingDuo — Belajar Seru Ramah Anak Usia Dini',
  ogDescription: 'Kenali visi CountingDuo dalam menghadirkan pembelajaran ramah anak dengan 29 jenis kuis interaktif, peta skill, dan maskot Kiko.',
  ogImage: 'https://countingduo.id/images/og-banner.png',
  ogUrl: 'https://countingduo.id/about',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://countingduo.id/about' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'Tentang CountingDuo',
        'url': 'https://countingduo.id/about',
        'description': 'Mengenal CountingDuo, inovasi platform edukasi interaktif berbasis gamifikasi untuk anak usia 4–9 tahun di Indonesia.',
        'mainEntity': {
          '@type': 'EducationalOrganization',
          'name': 'CountingDuo',
          'url': 'https://countingduo.id',
          'logo': 'https://countingduo.id/images/og-banner.png',
          'slogan': 'Petualangan Berhitung Ceria untuk Anak Indonesia',
          'knowsAbout': ['Matematika Anak', 'Sains & Hewan', 'Bahasa Indonesia', 'Logika Interaktif']
        }
      })
    }
  ]
})

// Interactive Apple Count Demo
const demoApples = ref([
  { id: 1, counted: false, number: 1 },
  { id: 2, counted: false, number: 2 },
  { id: 3, counted: false, number: 3 }
])

const toggleApple = (id) => {
  const a = demoApples.value.find(item => item.id === id)
  if (a) {
    a.counted = !a.counted
  }
}

const resetDemoApples = () => {
  demoApples.value.forEach(a => a.counted = false)
}

const countedApplesCount = computed(() => {
  return demoApples.value.filter(a => a.counted).length
})

// Modal State for 29 Activities
const showAllActivitiesModal = ref(false)
const modalCategoryFilter = ref('all')
const modalSearchQuery = ref('')

// Categories
const exerciseCategories = [
  { id: 'all', name: 'Semua', count: 29, icon: '🌟' },
  { id: 'math', name: 'Angka & Hitung', count: 8, icon: '🔢' },
  { id: 'visual', name: 'Visual & Gambar', count: 7, icon: '🎨' },
  { id: 'logic', name: 'Logika & Pola', count: 8, icon: '🧩' },
  { id: 'language', name: 'Bahasa & Audio', count: 6, icon: '🔤' }
]

// All 29 Exercise Types Data (Full Data Preserved)
const allExerciseTypes = [
  // 1. Angka & Berhitung (8 Jenis)
  {
    number: 1,
    id: 'count_select',
    name: 'Hitung & Sentuh Objek',
    icon: '🍎',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Korespondensi 1-ke-1 & Konsep Jumlah',
    description: 'Anak mengetuk buah atau hewan di layar satu per satu untuk menghitung jumlah totalnya sebelum memilih kartu angka yang pas.',
    example: 'Hitung berapa banyak buah apel di pohon!'
  },
  {
    number: 2,
    id: 'multiple_choice',
    name: 'Pilihan Gambar Interaktif',
    icon: '🔢',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Pengenalan Simbol Angka & Konsep',
    description: 'Menampilkan pertanyaan ramah anak dengan kartu ilustrasi ceria yang dapat disentuh langsung.',
    example: 'Manakah kartu yang menunjukkan angka 4?'
  },
  {
    number: 3,
    id: 'fill_in_blank',
    name: 'Ketik Angka Jawaban',
    icon: '⌨️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Mengetik & Input Angka Mandiri',
    description: 'Melatih anak mengetik mandiri jawaban angka pada kotak input tanpa bantuan opsi kartu pilihan.',
    example: '2 + 3 = [ 5 ]'
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
    example: 'Lengkapi deret: 1, 2, [ 3 ], 4, 5'
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
    description: 'Menyandingkan dua kelompok benda bersebelahan untuk melatih pemahaman visual konsep "lebih banyak" dan "lebih sedikit".',
    example: 'Kelompok mana yang memiliki buah lebih banyak?'
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
    description: 'Kanvas interaktif untuk anak menjiplak garis jari mengikuti jalur putus-putus bentuk angka 1 sampai 10.',
    example: 'Tebalkan garis putus-putus untuk menulis angka 5!'
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
    description: 'Menampilkan jam analog dengan jarum pendek dan panjang untuk melatih anak memahami waktu dan jadwal harian.',
    example: 'Jarum pendek di 3, jarum panjang di 12: Jam berapa ini?'
  },
  {
    number: 8,
    id: 'balance_scale',
    name: 'Timbangan Neraca Seimbang',
    icon: '⚖️',
    category: 'math',
    categoryName: 'Angka & Hitung',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    skill: 'Konsep Kesetaraan Aljabar Awal & Penjumlahan',
    description: 'Simulasi fisika neraca interaktif tempat anak meletakkan bobot buah di piring agar timbangan seimbang.',
    example: 'Piring kiri 5kg, kanan 2kg. Tambahkan bobot berapa agar seimbang?'
  },

  // 2. Visual & Observasi (7 Jenis)
  {
    number: 9,
    id: 'shadow_matching',
    name: 'Cocokkan Siluet Bayangan',
    icon: '👥',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Diskriminasi Visual & Persepsi Bentuk',
    description: 'Anak mengamati siluet bayangan hitam dan mencocokkannya dengan karakter atau gambar hewan berwarna yang pas.',
    example: 'Pilih hewan mana yang memiliki siluet bayangan ini!'
  },
  {
    number: 10,
    id: 'seek_find',
    name: 'Cari & Temukan Objek',
    icon: '🔎',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Fokus, Konsentrasi & Ketelitian',
    description: 'Pemandangan interaktif tempat anak mencari dan mengetuk objek tertentu yang tersembunyi.',
    example: 'Temukan 2 ekor kupu-kupu yang bersembunyi di taman bunga!'
  },
  {
    number: 11,
    id: 'hotspot',
    name: 'Sentuh Bagian Tubuh/Benda',
    icon: '🎯',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Identifikasi Anatomi & Komponen Objek',
    description: 'Anak menyentuh titik area tertentu pada gambar diagram (misal: bagian kepala hewan atau roda mobil).',
    example: 'Klik pada area kepala anjing di gambar!'
  },
  {
    number: 12,
    id: 'true_false_image',
    name: 'Benar / Salah Gambar Nyata',
    icon: '🖼️',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Validasi Fakta Visual Berbasis Foto',
    description: 'Menampilkan foto dunia nyata dan meminta anak memverifikasi apakah deskripsinya benar atau salah.',
    example: 'Apakah ini gambar buah apel merah segar? (Benar / Salah)'
  },
  {
    number: 13,
    id: 'shape_transform',
    name: 'Transformasi Bentuk Geometri',
    icon: '🔷',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Kecerdasan Spasial & Rotasi 2D',
    description: 'Melatih rotasi mental dengan mengamati bagaimana bangun geometri berubah jika diputar arahnya.',
    example: 'Jika segitiga merah diputar ke bawah, bentuknya menjadi apa?'
  },
  {
    number: 14,
    id: 'puzzle_assembly',
    name: 'Susun Keping Puzzle',
    icon: '🧩',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Sintesis Spasial & Rekonstruksi Gambar',
    description: 'Menyusun pecahan puzzle gambar acak ke posisi yang benar agar menghasilkan gambar yang padu.',
    example: 'Susun kepingan puzzle gambar kucing!'
  },
  {
    number: 15,
    id: 'color_by_number',
    name: 'Mewarnai Berdasarkan Angka',
    icon: '🎨',
    category: 'visual',
    categoryName: 'Visual & Gambar',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    skill: 'Mengenali Angka Melalui Warna',
    description: 'Kanvas gambar vektor dengan bidang bernomor. Anak menyentuh bagian sesuai palet warna hingga gambar hidup.',
    example: 'Warnai gambar: 1 = Merah, 2 = Kuning, 3 = Biru!'
  },

  // 3. Logika & Pola (8 Jenis)
  {
    number: 16,
    id: 'matching',
    name: 'Pasangkan Garis Relasi',
    icon: '🔗',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Asosiasi Konsep & Korelasi Pasangan',
    description: 'Menghubungkan kartu kolom kiri dengan pasangan yang tepat di kolom kanan.',
    example: 'Pasangkan induk hewan dengan anaknya!'
  },
  {
    number: 17,
    id: 'drag_and_drop',
    name: 'Seret ke Keranjang',
    icon: '🖐️',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Koordinasi Motorik & Kuota Hitung',
    description: 'Menyeret objek satu per satu dan melepaskannya ke dalam keranjang sesuai kuota instruksi.',
    example: 'Seret tepat 3 buah apel ke keranjang belanja!'
  },
  {
    number: 18,
    id: 'category_sorting',
    name: 'Kelompokkan ke Kategori',
    icon: '📦',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Klasifikasi Himpunan & Taksonomi',
    description: 'Memilah kartu benda ke dalam kelompok kategori yang tepat (misal: Buah vs Sayur).',
    example: 'Kelompokkan mana Makanan dan mana Kendaraan!'
  },
  {
    number: 19,
    id: 'drag_to_sort',
    name: 'Seret ke Wadah Klasifikasi',
    icon: '🗂️',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Keterampilan Sortir Kinestetik Langsung',
    description: 'Varian dinamis penyortiran dengan wadah animasi drop-zone yang merespons sentuhan seret kartu.',
    example: 'Seret singa ke wadah Hutan dan ikan ke Laut!'
  },
  {
    number: 20,
    id: 'sequence_ordering',
    name: 'Urutan Logis Kronologis',
    icon: '🔢',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Pemahaman Sebab-Akibat & Tahapan',
    description: 'Mengurutkan tahapan peristiwa dari awal sampai akhir (misal: biji ➔ tunas ➔ pohon).',
    example: 'Urutkan tahapan pertumbuhan tanaman dari awal hingga berbunga!'
  },
  {
    number: 21,
    id: 'pattern_matching',
    name: 'Runtunan Pola Berulang',
    icon: '🧩',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Penalaran Induktif & Prediksi Pola',
    description: 'Menganalisis irama pola gambar berulang (ABAB, AABB) dan menentukan objek berikutnya.',
    example: 'Lengkapi pola: 🍎 🍌 🍎 🍌 ... [ ? ]'
  },
  {
    number: 22,
    id: 'odd_one_out',
    name: 'Temukan yang Berbeda',
    icon: '🔍',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Analisis Anomali & Pengecualian',
    description: 'Menampilkan 4 kartu benda di mana 1 benda memiliki karakteristik berbeda yang harus ditemukan.',
    example: 'Kucing, Anjing, Kelinci, Mobil — mana yang paling berbeda?'
  },
  {
    number: 23,
    id: 'number_maze',
    name: 'Labirin Logika Angka',
    icon: '🌀',
    category: 'logic',
    categoryName: 'Logika & Pola',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    skill: 'Penelusuran Jalur & Pola Bilangan',
    description: 'Mengarahkan Kiko melangkah dari petak Mulai ke Selesai mengikuti aturan pola angka (genap, ganjil, kelipatan).',
    example: 'Ikuti jalur angka genap: 2 ➔ 4 ➔ 6 ➔ 8 ➔ 10!'
  },

  // 4. Bahasa & Audio (6 Jenis)
  {
    number: 24,
    id: 'reading',
    name: 'Membaca Nyaring (Speech AI)',
    icon: '📖',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Literasi Membaca & Artikulasi Suara',
    description: 'Anak mendengarkan contoh bacaan, lalu menekan mikrofon untuk membaca nyaring. Kata yang benar langsung menyala hijau!',
    example: 'Bacalah kalimat: "Budi suka membaca buku cerita."'
  },
  {
    number: 25,
    id: 'word_building',
    name: 'Susun Huruf Jadi Kata',
    icon: '🔤',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Fonik, Ejaan & Kosakata Indonesia',
    description: 'Menyusun huruf alfabet acak untuk merangkai nama hewan atau benda dengan tepat.',
    example: 'Susun huruf acak [ K - U - U - B ] menjadi B-U-K-U!'
  },
  {
    number: 26,
    id: 'sound_matching',
    name: 'Tebak Sumber Suara',
    icon: '🔊',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Persepsi Auditori & Pendengaran Kritis',
    description: 'Mendengarkan rekaman suara autentik (suara burung, raungan singa, bel) lalu menebak sumber suaranya.',
    example: 'Dengarkan suara "Kwek-kwek!", hewan apa ini? (🦆 Bebek)'
  },
  {
    number: 27,
    id: 'true_false',
    name: 'Benar / Salah Teks Fakta',
    icon: '⚖️',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Pemahaman Bacaan & Logika Dasar',
    description: 'Membaca pernyataan fakta singkat seputar alam dan menentukan kebenarannya dengan tombol Benar/Salah.',
    example: 'Apakah gajah adalah hewan darat terbesar? (Benar)'
  },
  {
    number: 28,
    id: 'memory_flip',
    name: 'Kartu Memori Balik Pasangan',
    icon: '🃏',
    category: 'language',
    categoryName: 'Bahasa & Audio',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    skill: 'Memori Jangka Pendek & Daya Ingat Visual',
    description: 'Permainan membalik kartu tertutup untuk mencari pasangan gambar yang sama.',
    example: 'Buka kartu dan temukan pasangan gambar hewan yang sama!'
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
    description: 'Anak mendengarkan kata dan bertepuk tangan dengan tombol tepuk untuk menghitung jumlah suku katanya.',
    example: 'Dengarkan kata "KU-CING" 🐱. Berapa jumlah suku katanya? (2)'
  }
]

// 8 Featured Samples for About Page
const featuredSampleActivities = [
  allExerciseTypes[0], // Hitung & Sentuh
  allExerciseTypes[5], // Tebalkan Garis Angka
  allExerciseTypes[13], // Susun Keping Puzzle
  allExerciseTypes[17], // Kelompokkan ke Kategori
  allExerciseTypes[23], // Membaca Nyaring
  allExerciseTypes[27], // Kartu Memori
  allExerciseTypes[22], // Labirin Logika Angka
  allExerciseTypes[14]  // Mewarnai Berdasarkan Angka
]

// Modal Filtered Activities Computed
const filteredModalActivities = computed(() => {
  let list = allExerciseTypes
  if (modalCategoryFilter.value !== 'all') {
    list = list.filter(a => a.category === modalCategoryFilter.value)
  }
  if (modalSearchQuery.value.trim()) {
    const q = modalSearchQuery.value.toLowerCase().trim()
    list = list.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.skill.toLowerCase().includes(q) ||
      a.example.toLowerCase().includes(q)
    )
  }
  return list
})

// FAQ Items
const faqs = ref([
  {
    question: 'Untuk rentang usia berapa CountingDuo dirancang?',
    answer: 'CountingDuo dirancang khusus untuk anak usia dini (PAUD, TK A, TK B) hingga sekolah dasar awal (Kelas 1–3), yakni rentang usia 4 hingga 9 tahun.',
    open: true
  },
  {
    question: 'Apakah CountingDuo aman dan bebas dari iklan komersial?',
    answer: 'Ya, 100% aman. CountingDuo tidak memuat iklan luar atau pop-up komersial yang mengganggu konsentrasi belajar dan keselamatan anak.',
    open: false
  },
  {
    question: 'Apakah anak perlu bisa membaca lancar untuk menggunakannya?',
    answer: 'Tidak wajib. Setiap instruksi dan soal dilengkapi dengan tombol narasi audio suara berbahasa Indonesia, sehingga anak yang baru belajar membaca tetap bisa belajar secara mandiri.',
    open: false
  },
  {
    question: 'Bagaimana cara orang tua memantau perkembangan belajar anak?',
    answer: 'Orang tua dapat memantau capaian belajar, modul yang telah diselesaikan, serta akumulasi XP anak melalui ringkasan progres di halaman modul maupun dashboard orang tua.',
    open: false
  }
])
</script>
