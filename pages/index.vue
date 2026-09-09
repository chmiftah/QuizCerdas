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
      <!-- ============================================================ -->
      <!-- HERO SECTION                                                 -->
      <!-- ============================================================ -->
      <section class="relative bg-gradient-to-b from-sky-50/80 via-white to-slate-50 pt-10 sm:pt-14 pb-16 px-4 overflow-hidden" aria-label="Hero Section">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- Left Hero Content -->
          <div class="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <!-- Eyebrow Pill -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-800 text-xs sm:text-sm font-heading font-extrabold shadow-2xs">
              <span class="text-sm">🦉</span>
              <span>Platform Belajar Anak Usia 4–9 Tahun</span>
            </div>

            <!-- Headline -->
            <h1 class="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15]">
              Belajar Jadi <span class="text-duo-green underline decoration-duo-yellow decoration-wavy">Petualangan Seru</span> untuk Anak!
            </h1>

            <!-- Subheadline -->
            <p class="text-sm sm:text-base lg:text-lg text-slate-600 font-body leading-relaxed max-w-xl mx-auto lg:mx-0">
              CountingDuo membantu anak belajar Matematika, Sains, Bahasa, dan Logika melalui quiz interaktif, peta jalur belajar, XP, dan reward. Belajar terasa menyenangkan layaknya bermain.
            </p>

            <!-- CTA Group -->
            <div class="space-y-3 pt-1">
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                <NuxtLink 
                  to="/register" 
                  class="px-7 py-3.5 sm:py-4 duo-btn-green text-sm sm:text-base font-extrabold whitespace-nowrap shadow-lg hover:scale-102 transition-transform flex items-center justify-center gap-2"
                  id="btn-hero-register"
                >
                  <span>🚀 Mulai Belajar Gratis</span>
                </NuxtLink>
                <button 
                  @click="handleGuestLogin" 
                  class="px-6 py-3.5 sm:py-4 duo-btn-blue text-sm sm:text-base font-extrabold whitespace-nowrap shadow-md hover:scale-102 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-hero-guest"
                >
                  <span>⚡ Coba Tanpa Daftar</span>
                </button>
              </div>

              <!-- Secondary quick link to catalog -->
              <div class="flex items-center justify-center lg:justify-start">
                <NuxtLink 
                  to="/catalog" 
                  class="text-xs sm:text-sm font-heading font-bold text-slate-400 hover:text-duo-blue underline decoration-dotted transition-colors"
                >
                  Lihat Semua Katalog Materi Pembelajaran ➔
                </NuxtLink>
              </div>
            </div>

            <!-- Trust Points Strip -->
            <div class="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-heading font-bold text-slate-600">
              <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> Gratis
              </span>
              <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> Tanpa Iklan
              </span>
              <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle2 class="w-4 h-4 text-duo-green" /> Bisa Langsung Dicoba
              </span>
            </div>
          </div>

          <!-- Right Hero Visual: Authentic Product Preview Composition -->
          <div class="lg:col-span-6 relative flex justify-center z-10 w-full">
            <div class="relative w-full max-w-md lg:max-w-lg space-y-3">
              <!-- Glow Ambient Background -->
              <div class="absolute -inset-4 bg-emerald-200/30 rounded-3xl blur-2xl pointer-events-none"></div>

              <!-- Main Kid Dashboard Card Preview -->
              <div class="relative bg-white rounded-3xl border-3 border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4">
                <!-- Top Status Header (Simulating Real Child Game Profile) -->
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-duo-green text-white flex items-center justify-center font-heading text-2xl shadow-duo-green">
                      🦉
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5">
                        <span class="font-heading font-black text-slate-800 text-sm sm:text-base">Kiko Sahabat Belajar</span>
                        <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-heading font-black text-[10px]">Level 2</span>
                      </div>
                      <p class="text-xs text-slate-400 font-heading">Petualangan Matematika & Berhitung</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <span class="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 font-heading font-black text-xs">
                      <span>⚡</span> 180 XP
                    </span>
                    <span class="flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 font-heading font-black text-xs">
                      <span>🔥</span> 3 Hari
                    </span>
                  </div>
                </div>

                <!-- Mini Skill Path Node Preview inside Product Card -->
                <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 space-y-2.5">
                  <div class="flex items-center justify-between text-[11px] font-heading font-bold text-slate-500">
                    <span>🗺️ JALUR BELAJAR SAAT INI</span>
                    <span class="text-duo-green font-black">2 / 4 Pos Selesai</span>
                  </div>

                  <!-- 3 Step Progression Preview -->
                  <div class="grid grid-cols-3 gap-2">
                    <div class="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-2xs text-center space-y-1">
                      <div class="w-7 h-7 mx-auto rounded-lg bg-duo-green text-white text-xs flex items-center justify-center font-black">✓</div>
                      <p class="font-heading font-black text-[11px] text-slate-800">Angka 1–5</p>
                      <span class="text-[9px] text-emerald-600 font-bold block">⭐⭐⭐ Selesai</span>
                    </div>

                    <div class="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-2xs text-center space-y-1">
                      <div class="w-7 h-7 mx-auto rounded-lg bg-duo-green text-white text-xs flex items-center justify-center font-black">✓</div>
                      <p class="font-heading font-black text-[11px] text-slate-800">Hitung Objek</p>
                      <span class="text-[9px] text-emerald-600 font-bold block">⭐⭐⭐ Selesai</span>
                    </div>

                    <div class="bg-amber-50 p-2.5 rounded-xl border-2 border-amber-400 shadow-xs text-center space-y-1 animate-pulse">
                      <div class="w-7 h-7 mx-auto rounded-lg bg-amber-500 text-white text-xs flex items-center justify-center font-black">🎯</div>
                      <p class="font-heading font-black text-[11px] text-amber-900">Perbandingan</p>
                      <span class="text-[9px] text-amber-700 font-extrabold block">Aktif Sekarang</span>
                    </div>
                  </div>
                </div>

                <!-- Active Sample Quiz Question Preview -->
                <div class="bg-sky-50/70 rounded-2xl p-3.5 border border-sky-200/80 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-heading font-extrabold text-sky-800">Soal Latihan Interaktif:</span>
                    <span class="text-[11px] font-heading font-black text-duo-green bg-white px-2 py-0.5 rounded-full border border-emerald-200">+20 XP</span>
                  </div>

                  <p class="font-heading font-extrabold text-slate-800 text-sm text-center">
                    Berapa jumlah apel merah di keranjang? 🍎🍎🍎
                  </p>

                  <div class="grid grid-cols-3 gap-2">
                    <div class="py-2 bg-white rounded-xl border border-slate-200 text-center font-heading font-bold text-slate-600 text-sm">
                      2
                    </div>
                    <div class="py-2 bg-emerald-500 text-white rounded-xl border-b-2 border-emerald-700 text-center font-heading font-black text-sm shadow-sm flex items-center justify-center gap-1">
                      <span>3</span> <span>✅</span>
                    </div>
                    <div class="py-2 bg-white rounded-xl border border-slate-200 text-center font-heading font-bold text-slate-600 text-sm">
                      4
                    </div>
                  </div>
                </div>

                <!-- Mascot Companion Callout & 3D Hook -->
                <div class="flex items-center gap-3 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 text-xs font-heading">
                  <span class="text-2xl">🌟</span>
                  <p class="text-emerald-900 font-bold leading-snug">
                    <strong class="font-black text-emerald-950">Hebat!</strong> Setiap jawaban tepat memberikan bintang dan membuka checkpoint berikutnya.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 1 — VALUE PROPOSITION (4 BENEFIT CARDS)               -->
      <!-- ============================================================ -->
      <section class="py-16 px-4 bg-white border-y border-slate-200/80" aria-label="Nilai Utama">
        <div class="max-w-6xl mx-auto space-y-10">
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-green/10 border border-duo-green/30 text-duo-green rounded-full font-heading font-black text-xs uppercase tracking-wider">
              ✨ Dirancang Khusus untuk Anak & Orang Tua
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Belajar yang Terasa Seperti Bermain
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              CountingDuo memadukan kurikulum konsep dasar dengan pengalaman interaktif yang menyenangkan bagi anak usia dini.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Card 1 -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 space-y-3 hover:border-duo-green hover:-translate-y-1 transition-all duration-200 shadow-2xs">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl shadow-xs">
                🎮
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">
                Belajar Sambil Bermain
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Quiz interaktif membuat proses belajar terasa lebih menyenangkan tanpa beban atau paksaan.
              </p>
            </div>

            <!-- Card 2 -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 space-y-3 hover:border-duo-blue hover:-translate-y-1 transition-all duration-200 shadow-2xs">
              <div class="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-2xl shadow-xs">
                🗺️
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">
                Belajar Bertahap
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Materi tersusun dalam peta jalur dari konsep paling dasar hingga level tantangan berikutnya.
              </p>
            </div>

            <!-- Card 3 -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 space-y-3 hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 shadow-2xs">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-xs">
                ⭐
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">
                Setiap Progress Berarti
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Anak mendapatkan XP, streak harian, dan reward saat menyelesaikan setiap sesi latihan.
              </p>
            </div>

            <!-- Card 4 -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200/90 p-6 space-y-3 hover:border-duo-purple hover:-translate-y-1 transition-all duration-200 shadow-2xs">
              <div class="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl shadow-xs">
                👨‍👩‍👧
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">
                Untuk Anak Usia Dini
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Materi, tombol sentuh besar, dan suara dirancang agar mudah dipahami anak usia 4–9 tahun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 2 — HOW IT WORKS (3 LANGKAH MUDAH)                    -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-slate-50" aria-label="Cara Kerja">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-blue/10 border border-duo-blue/30 text-duo-blue rounded-full font-heading font-black text-xs uppercase tracking-wider">
              🚀 Alur Sederhana
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Mulai Belajar dalam <span class="text-duo-green">3 Langkah Mudah</span>
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Tidak perlu instalasi aplikasi rumit. Buka lewat browser, coba kuisnya, dan dampingi anak bertumbuh.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <!-- Step 1 -->
            <div class="bg-white rounded-3xl border-2 border-emerald-200/90 p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="w-10 h-10 rounded-2xl bg-duo-green text-white font-heading font-black text-sm flex items-center justify-center shadow-xs">
                    01
                  </span>
                  <span class="text-2xl">🗺️</span>
                </div>
                <h3 class="font-heading text-lg font-black text-slate-800">Pilih Mata Pelajaran</h3>
                <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  Pilih topik dari Matematika, Dunia Hewan, Bahasa Indonesia, atau Seni & Logika.
                </p>
              </div>

              <!-- Mini UI Mockup -->
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2 text-center text-[11px] font-heading font-bold text-slate-700">
                <span class="p-1.5 bg-white rounded-xl border border-emerald-200 shadow-2xs">🔢 Matematika</span>
                <span class="p-1.5 bg-white rounded-xl border border-amber-200 shadow-2xs">🦁 Hewan</span>
                <span class="p-1.5 bg-white rounded-xl border border-purple-200 shadow-2xs">📖 Bahasa</span>
                <span class="p-1.5 bg-white rounded-xl border border-sky-200 shadow-2xs">🎨 Logika</span>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="bg-white rounded-3xl border-2 border-blue-200/90 p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="w-10 h-10 rounded-2xl bg-duo-blue text-white font-heading font-black text-sm flex items-center justify-center shadow-xs">
                    02
                  </span>
                  <span class="text-2xl">🎮</span>
                </div>
                <h3 class="font-heading text-lg font-black text-slate-800">Jawab Quiz Interaktif</h3>
                <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  Latihan dengan visual bergambar, suara pengucapan, dan respon langsung yang menyenangkan.
                </p>
              </div>

              <!-- Mini UI Mockup -->
              <div class="p-3 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
                <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-duo-blue h-full w-2/3"></div>
                </div>
                <div class="flex items-center justify-between text-[11px] font-heading font-extrabold text-slate-700">
                  <span>3 + 2 = ?</span>
                  <span class="text-duo-green">5 ✅</span>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="w-10 h-10 rounded-2xl bg-amber-500 text-white font-heading font-black text-sm flex items-center justify-center shadow-xs">
                    03
                  </span>
                  <span class="text-2xl">🏆</span>
                </div>
                <h3 class="font-heading text-lg font-black text-slate-800">Kumpulkan XP & Reward</h3>
                <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  Rayakan keberhasilan anak dengan bintang, XP, dan rawat streak belajar harian.
                </p>
              </div>

              <!-- Mini UI Mockup -->
              <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-around text-center">
                <div>
                  <span class="text-lg">⭐</span>
                  <p class="text-[10px] font-heading font-black text-amber-800">+50 XP</p>
                </div>
                <div>
                  <span class="text-lg">🔥</span>
                  <p class="text-[10px] font-heading font-black text-orange-700">Streak +1</p>
                </div>
                <div>
                  <span class="text-lg">🔓</span>
                  <p class="text-[10px] font-heading font-black text-emerald-700">Level Naik</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom CTA -->
          <div class="text-center pt-2">
            <NuxtLink 
              to="/register"
              class="inline-flex items-center gap-2 px-8 py-3.5 duo-btn-green text-sm sm:text-base font-extrabold shadow-md hover:scale-102 transition-transform"
            >
              <span>Ayo Mulai Perjalanan Belajar Anak ➔</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 3 — SUBJECTS                                         -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-white border-y border-slate-200" aria-label="Mata Pelajaran">
        <div class="max-w-6xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-2xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-purple/10 border border-duo-purple/30 text-duo-purple rounded-full font-heading font-black text-xs uppercase tracking-wider">
              📚 Materi Lengkap
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Semua Dasar Belajar Anak dalam Satu Tempat
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Empat fokus pembelajaran utama yang dikemas dalam bentuk petualangan tematik yang hidup.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Subject 1: Math -->
            <div class="bg-emerald-50/70 rounded-3xl border-2 border-emerald-300 p-5 space-y-4 hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <ClientOnly>
                  <Subject3DCanvas subject="math" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-2xl bg-duo-green text-white flex items-center justify-center font-heading text-xl shadow-duo-green">
                    🔢
                  </div>
                  <div>
                    <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">
                      Matematika
                    </h3>
                    <span class="text-[10px] font-heading font-extrabold text-emerald-700">Berhitung & Logika Angka</span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Angka 1–20, menghitung benda konkret, pola bilangan, dan perbandingan lebih banyak / sedikit.
                </p>
              </div>

              <NuxtLink 
                to="/catalog" 
                class="pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-heading font-black text-duo-green hover:underline"
              >
                <span>Lihat Modul Matematika</span>
                <span>➔</span>
              </NuxtLink>
            </div>

            <!-- Subject 2: Science -->
            <div class="bg-amber-50/70 rounded-3xl border-2 border-amber-300 p-5 space-y-4 hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <ClientOnly>
                  <Subject3DCanvas subject="science" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-heading text-xl shadow-md">
                    🦁
                  </div>
                  <div>
                    <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">
                      Sains & Dunia Hewan
                    </h3>
                    <span class="text-[10px] font-heading font-extrabold text-amber-700">Eksplorasi Alam Sekitar</span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Mengenal nama hewan, habitat alam, suara binatang, makanan, dan pengelompokan makhluk hidup.
                </p>
              </div>

              <NuxtLink 
                to="/catalog" 
                class="pt-3 border-t border-amber-200 flex items-center justify-between text-xs font-heading font-black text-amber-700 hover:underline"
              >
                <span>Lihat Modul Sains</span>
                <span>➔</span>
              </NuxtLink>
            </div>

            <!-- Subject 3: Language -->
            <div class="bg-purple-50/70 rounded-3xl border-2 border-purple-300 p-5 space-y-4 hover:shadow-xl hover:border-purple-400 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <ClientOnly>
                  <Subject3DCanvas subject="language" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-2xl bg-duo-purple text-white flex items-center justify-center font-heading text-xl shadow-md">
                    📖
                  </div>
                  <div>
                    <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">
                      Bahasa Indonesia
                    </h3>
                    <span class="text-[10px] font-heading font-extrabold text-purple-700">Literasi Permulaan</span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Mengenal abjad A–Z, huruf vokal & konsonan, kata bergambar, serta latihan menyusun suku kata.
                </p>
              </div>

              <NuxtLink 
                to="/catalog" 
                class="pt-3 border-t border-purple-200 flex items-center justify-between text-xs font-heading font-black text-purple-700 hover:underline"
              >
                <span>Lihat Modul Bahasa</span>
                <span>➔</span>
              </NuxtLink>
            </div>

            <!-- Subject 4: Art & Logic -->
            <div class="bg-sky-50/70 rounded-3xl border-2 border-sky-300 p-5 space-y-4 hover:shadow-xl hover:border-sky-400 transition-all flex flex-col justify-between">
              <div class="space-y-3">
                <ClientOnly>
                  <Subject3DCanvas subject="art" />
                </ClientOnly>

                <div class="flex items-center gap-2.5 pt-1">
                  <div class="w-10 h-10 rounded-2xl bg-duo-blue text-white flex items-center justify-center font-heading text-xl shadow-duo-blue">
                    🎨
                  </div>
                  <div>
                    <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">
                      Seni & Logika
                    </h3>
                    <span class="text-[10px] font-heading font-extrabold text-sky-700">Kreativitas & Spasial</span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 font-body leading-relaxed">
                  Warna primer/sekunder, bentuk geometri dasar, menjiplak huruf/angka, dan teka-teki visual.
                </p>
              </div>

              <NuxtLink 
                to="/catalog" 
                class="pt-3 border-t border-sky-200 flex items-center justify-between text-xs font-heading font-black text-duo-blue hover:underline"
              >
                <span>Lihat Modul Logika</span>
                <span>➔</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 4 — INTERACTIVE DEMO ("COBA SEBELUM MENDAFTAR")      -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-slate-50" aria-label="Demo Kuis">
        <div class="max-w-4xl mx-auto space-y-8">
          <div class="text-center space-y-2 max-w-xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-green/10 border border-duo-green/30 text-duo-green rounded-full font-heading font-black text-xs uppercase tracking-wider">
              🎮 Interaktif Langsung
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Coba Sebelum Mendaftar
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Lihat sendiri bagaimana quiz di CountingDuo bekerja. Pilih jawaban yang benar dan rasakan feedback instannya!
            </p>
          </div>

          <!-- Embedded Multi-Subject Mini Quiz Demo Component -->
          <LandingQuizDemo />
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 5 — CORE DIFFERENTIATOR ("BUKAN SEKADAR KUMPULAN SOAL")-->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-white border-y border-slate-200" aria-label="Diferensiasi Produk">
        <div class="max-w-6xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-2xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-blue/10 border border-duo-blue/30 text-duo-blue rounded-full font-heading font-black text-xs uppercase tracking-wider">
              💡 Pendekatan Pembelajaran
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Bukan Sekadar Kumpulan Soal
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Anak belajar melalui perjalanan yang bertahap, bukan sekadar menjawab soal satu per satu tanpa arah.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Differentiator 1 -->
            <div class="bg-emerald-50/50 rounded-3xl border-2 border-emerald-200 p-6 space-y-3 shadow-2xs">
              <div class="w-11 h-11 rounded-2xl bg-duo-green text-white flex items-center justify-center text-xl shadow-xs">
                🗺️
              </div>
              <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">Skill Path Bertingkat</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Anak mengikuti perjalanan belajar dari skill dasar menuju skill berikutnya secara terstruktur.
              </p>
            </div>

            <!-- Differentiator 2 -->
            <div class="bg-orange-50/50 rounded-3xl border-2 border-orange-200 p-6 space-y-3 shadow-2xs">
              <div class="w-11 h-11 rounded-2xl bg-duo-orange text-white flex items-center justify-center text-xl shadow-xs">
                🔥
              </div>
              <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">Streak Konsistensi</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Mendorong anak kembali belajar secara konsisten setiap hari dengan target belajar 5–10 menit yang ramah.
              </p>
            </div>

            <!-- Differentiator 3 -->
            <div class="bg-amber-50/50 rounded-3xl border-2 border-amber-200 p-6 space-y-3 shadow-2xs">
              <div class="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs">
                ⭐
              </div>
              <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">XP & Pencapaian</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Setiap aktivitas memberikan progress yang dapat dilihat anak, memupuk rasa bangga dan percaya diri.
              </p>
            </div>

            <!-- Differentiator 4 -->
            <div class="bg-purple-50/50 rounded-3xl border-2 border-purple-200 p-6 space-y-3 shadow-2xs">
              <div class="w-11 h-11 rounded-2xl bg-duo-purple text-white flex items-center justify-center text-xl shadow-xs">
                🧠
              </div>
              <h3 class="font-heading text-base sm:text-lg font-black text-slate-800">Pengulangan Materi</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Materi yang belum dikuasai dapat kembali dilatih secara santai tanpa tekanan hukuman nilai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 6 — VISUAL SKILL PATH (CENTERPIECE)                   -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-slate-50" aria-label="Visual Skill Path">
        <div class="max-w-4xl mx-auto space-y-10">
          <div class="text-center space-y-2 max-w-xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-green/10 border border-duo-green/30 text-duo-green rounded-full font-heading font-black text-xs uppercase tracking-wider">
              🗺️ Peta Jalur Belajar
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Satu Langkah Kecil Setiap Hari
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Alur belajar terpandu memastikan anak memahami fondasi awal sebelum beralih ke konsep berikutnya.
            </p>
          </div>

          <!-- Skill Path Centerpiece Visual Board -->
          <div class="bg-white rounded-3xl border-3 border-slate-200 p-6 sm:p-8 shadow-lg space-y-6">
            <!-- Header bar of Skill path -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span class="text-xs font-heading font-extrabold text-duo-green uppercase tracking-wider">Unit 1 • Dasar Berhitung</span>
                <h3 class="font-heading text-lg sm:text-xl font-black text-slate-800">Peta Petualangan Matematika</h3>
              </div>
              
              <!-- Progress Indicator -->
              <div class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full font-heading font-black text-xs text-emerald-800">
                <span>🎯</span>
                <span>3 / 5 Skill Selesai</span>
              </div>
            </div>

            <!-- Path Step by Step Nodes -->
            <div class="space-y-3 sm:space-y-4 max-w-xl mx-auto py-2">
              <!-- Node 1: Completed -->
              <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-2xs">
                <div class="w-10 h-10 rounded-2xl bg-duo-green text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-xs">
                  ✓
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="font-heading font-black text-sm sm:text-base text-slate-800">Mengenal Angka 1–5</p>
                    <span class="text-xs text-emerald-700 font-heading font-black">⭐⭐⭐ Selesai</span>
                  </div>
                  <p class="text-xs text-slate-500 font-body">Visual simbol angka dan asosiasi gambar</p>
                </div>
              </div>

              <!-- Connector Line -->
              <div class="flex justify-center -my-2 text-emerald-300 font-black text-lg">↓</div>

              <!-- Node 2: Completed -->
              <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-2xs">
                <div class="w-10 h-10 rounded-2xl bg-duo-green text-white flex items-center justify-center font-heading font-black text-sm shrink-0 shadow-xs">
                  ✓
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="font-heading font-black text-sm sm:text-base text-slate-800">Menghitung Benda</p>
                    <span class="text-xs text-emerald-700 font-heading font-black">⭐⭐⭐ Selesai</span>
                  </div>
                  <p class="text-xs text-slate-500 font-body">Menghitung apel, bintang, dan mainan</p>
                </div>
              </div>

              <!-- Connector Line -->
              <div class="flex justify-center -my-2 text-amber-400 font-black text-lg">↓</div>

              <!-- Node 3: Active Currently -->
              <div class="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border-3 border-amber-400 shadow-md">
                <div class="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-heading font-black text-base shrink-0 shadow-sm animate-bounce">
                  🎯
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="font-heading font-black text-sm sm:text-base text-amber-950">Membandingkan Jumlah</p>
                    <span class="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-heading font-black">SEDANG AKTIF</span>
                  </div>
                  <p class="text-xs text-amber-800 font-body">Belajar konsep lebih banyak, lebih sedikit, atau sama</p>
                </div>
              </div>

              <!-- Connector Line -->
              <div class="flex justify-center -my-2 text-slate-300 font-black text-lg">↓</div>

              <!-- Node 4: Locked -->
              <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 border border-slate-200 opacity-60">
                <div class="w-10 h-10 rounded-2xl bg-slate-300 text-slate-600 flex items-center justify-center font-heading font-black text-sm shrink-0">
                  🔒
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-heading font-bold text-sm text-slate-600">Penjumlahan Sederhana</p>
                  <p class="text-xs text-slate-400 font-body">Terbuka setelah menyelesaikan pos sebelumnya</p>
                </div>
              </div>

              <!-- Connector Line -->
              <div class="flex justify-center -my-2 text-slate-300 font-black text-lg">↓</div>

              <!-- Node 5: Locked -->
              <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-100 border border-slate-200 opacity-60">
                <div class="w-10 h-10 rounded-2xl bg-slate-300 text-slate-600 flex items-center justify-center font-heading font-black text-sm shrink-0">
                  🔒
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-heading font-bold text-sm text-slate-600">Pengurangan Dasar</p>
                  <p class="text-xs text-slate-400 font-body">Terbuka di tingkat berikutnya</p>
                </div>
              </div>
            </div>

            <!-- Explanatory Parent Callout -->
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center text-xs text-slate-600 font-heading leading-relaxed">
              💡 <strong class="text-slate-800">Mengapa Skill Path penting?</strong> Anak tidak merasa kewalahan karena materi diperkenalkan secara bertahap. Orang tua tidak perlu bingung menentukan apa yang harus dipelajari hari ini.
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 7 — GAMIFICATION                                     -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-white border-y border-slate-200" aria-label="Gamifikasi Sehat">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-full font-heading font-black text-xs uppercase tracking-wider">
              🏆 Motivasi Positif
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Belajar, Dapat XP, Naik Level
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              Gamifikasi yang sehat: berfokus pada apresiasi usaha anak dan pembiasaan rutin, bukan kecanduan.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            <!-- Item 1: XP -->
            <div class="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center space-y-2 hover:border-amber-400 transition-colors">
              <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">XP Reward</h3>
              <p class="text-[11px] text-slate-500 font-body leading-snug">
                Poin pencapaian setiap kali menyelesaikan sesi latihan.
              </p>
            </div>

            <!-- Item 2: Streak -->
            <div class="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center space-y-2 hover:border-orange-400 transition-colors">
              <div class="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl">
                🔥
              </div>
              <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">Streak Harian</h3>
              <p class="text-[11px] text-slate-500 font-body leading-snug">
                Membangun kebiasaan belajar rutin sedikit demi sedikit tiap hari.
              </p>
            </div>

            <!-- Item 3: Badge -->
            <div class="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center space-y-2 hover:border-purple-400 transition-colors">
              <div class="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
                🏆
              </div>
              <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">Badge & Stiker</h3>
              <p class="text-[11px] text-slate-500 font-body leading-snug">
                Koleksi penghargaan saat menuntaskan unit tematik.
              </p>
            </div>

            <!-- Item 4: Nyawa -->
            <div class="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center space-y-2 hover:border-rose-400 transition-colors">
              <div class="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl">
                ❤️
              </div>
              <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">Sistem Nyawa</h3>
              <p class="text-[11px] text-slate-500 font-body leading-snug">
                Anak belajar tanpa takut keliru, nyawa terisi ulang gratis.
              </p>
            </div>

            <!-- Item 5: Unlocked -->
            <div class="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center space-y-2 hover:border-emerald-400 transition-colors col-span-2 sm:col-span-1">
              <div class="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                🔓
              </div>
              <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">Buka Level Baru</h3>
              <p class="text-[11px] text-slate-500 font-body leading-snug">
                Rasa puas saat membuka tantangan level baru berikutnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 8 — PARENT VALUE (DASHBOARD PREVIEW)                 -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-slate-50" aria-label="Area Orang Tua">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Left: Real Parent Dashboard UI Preview -->
          <div class="lg:col-span-6">
            <div class="bg-white rounded-3xl border-3 border-slate-200 shadow-xl p-5 sm:p-7 space-y-5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-lg">
                    📊
                  </div>
                  <div>
                    <h3 class="font-heading font-black text-slate-800 text-sm sm:text-base">Area Orang Tua & Guru</h3>
                    <p class="text-[11px] text-slate-400 font-heading">Ringkasan Perkembangan Ananda</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-heading font-black text-[10px]">
                  Aktif Belajar
                </span>
              </div>

              <!-- 4 Real Metric Tiles -->
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span class="text-[10px] font-heading font-bold text-slate-400 uppercase">Modul Selesai</span>
                  <p class="font-heading font-black text-xl text-emerald-600">8 Modul</p>
                  <p class="text-[10px] text-slate-500">Dari total materi</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span class="text-[10px] font-heading font-bold text-slate-400 uppercase">Total XP</span>
                  <p class="font-heading font-black text-xl text-amber-500">240 XP</p>
                  <p class="text-[10px] text-slate-500">Poin pencapaian</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span class="text-[10px] font-heading font-bold text-slate-400 uppercase">Streak Belajar</span>
                  <p class="font-heading font-black text-xl text-orange-600">5 Hari</p>
                  <p class="text-[10px] text-slate-500">Rutin berturut-turut</p>
                </div>
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span class="text-[10px] font-heading font-bold text-slate-400 uppercase">Evaluasi Latihan</span>
                  <p class="font-heading font-black text-xl text-sky-600">92%</p>
                  <p class="text-[10px] text-slate-500">Akurasi jawaban</p>
                </div>
              </div>

              <!-- Number Mastery / Focus Topic Mockup -->
              <div class="bg-indigo-50/60 rounded-2xl p-3.5 border border-indigo-100 space-y-2">
                <div class="flex items-center justify-between text-xs font-heading font-black text-indigo-900">
                  <span>Penguasaan Konsep Angka (1–10)</span>
                  <span class="text-emerald-700">Baik</span>
                </div>
                <div class="flex items-center gap-1.5 pt-1">
                  <span v-for="n in 10" :key="n" class="flex-1 py-1 rounded-lg text-center text-[10px] font-heading font-black text-white" :class="n <= 7 ? 'bg-emerald-500' : 'bg-amber-400'">
                    {{ n }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-500 font-heading">
                  Hijau: Sangat dipahami • Kuning: Perlu sedikit pendampingan
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Explanation Copy -->
          <div class="lg:col-span-6 space-y-6">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-full font-heading font-black text-xs uppercase tracking-wider">
              👨‍👩‍👧 Nilai untuk Orang Tua
            </span>

            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-snug">
              Orang Tua Bisa Melihat Perjalanan Belajar Anak
            </h2>

            <p class="text-slate-600 text-sm sm:text-base font-body leading-relaxed">
              Tidak perlu menebak anak sudah belajar apa. Lihat progress belajar anak dalam satu dashboard sederhana.
            </p>

            <ul class="space-y-3.5 text-xs sm:text-sm font-heading font-bold text-slate-700">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>Pantau Modul Tuntas:</strong> Ketahui unit apa saja yang sudah diselesaikan anak dengan mandiri.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>Ketahui Topik yang Perlu Dibantu:</strong> Sistem mencatat materi yang masih sering keliru sehingga orang tua bisa mendampingi secara tepat.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>Bebas Stres Tanpa PR Berlebih:</strong> Anak belajar dengan gembira beberapa menit per hari tanpa drama buku pelajaran.</span>
              </li>
            </ul>

            <div class="pt-2">
              <NuxtLink 
                to="/parent-dashboard" 
                class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Lihat Fitur Area Orang Tua ➔</span>
              </NuxtLink>
            </div>
          </div>

        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 9 — AGE LEVEL (JENJANG BELAJAR)                       -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-white border-y border-slate-200" aria-label="Jenjang Usia">
        <div class="max-w-5xl mx-auto space-y-10">
          <div class="text-center space-y-3 max-w-xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-green/10 border border-duo-green/30 text-duo-green rounded-full font-heading font-black text-xs uppercase tracking-wider">
              👶 Disesuaikan Usia Anak
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Materi Sesuai Tahap Tumbuh Kembang
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              CountingDuo dirancang dengan tingkat kesulitan yang tumbuh bersama perkembangan kognitif anak.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- PAUD -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-2xs hover:border-emerald-400 transition-colors">
              <div class="flex items-center justify-between">
                <span class="text-3xl">🧸</span>
                <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-heading font-black text-xs">4–5 Tahun</span>
              </div>
              <h3 class="font-heading text-xl font-black text-slate-800">PAUD</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Mengenal angka, warna cerah, bentuk geometri dasar, suara hewan, dan lingkungan sekitar.
              </p>
              <div class="pt-2 border-t border-slate-200 text-xs font-heading font-extrabold text-emerald-700">
                Fokus: Observasi & Visual
              </div>
            </div>

            <!-- TK -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-2xs hover:border-amber-400 transition-colors">
              <div class="flex items-center justify-between">
                <span class="text-3xl">🎒</span>
                <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-heading font-black text-xs">5–6 Tahun</span>
              </div>
              <h3 class="font-heading text-xl font-black text-slate-800">TK A & TK B</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Pengenalan huruf abjad, urutan angka, pola gambar, kosa kata sederhana, dan logika dasar.
              </p>
              <div class="pt-2 border-t border-slate-200 text-xs font-heading font-extrabold text-amber-700">
                Fokus: Pengenalan Konsep
              </div>
            </div>

            <!-- SD Awal -->
            <div class="bg-slate-50 rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-2xs hover:border-blue-400 transition-colors">
              <div class="flex items-center justify-between">
                <span class="text-3xl">🏫</span>
                <span class="px-3 py-1 bg-sky-100 text-sky-800 rounded-full font-heading font-black text-xs">6–9 Tahun</span>
              </div>
              <h3 class="font-heading text-xl font-black text-slate-800">SD Kelas 1–3</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Berhitung penjumlahan dan pengurangan, membaca kalimat sederhana, sains dunia hewan, dan problem solving.
              </p>
              <div class="pt-2 border-t border-slate-200 text-xs font-heading font-extrabold text-duo-blue">
                Fokus: Penerapan & Latihan
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 10 — TRUST & BENEFITS (PENGGANTI TESTIMONI PALSU)     -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-slate-50" aria-label="Keunggulan Produk">
        <div class="max-w-5xl mx-auto space-y-12">
          <div class="text-center space-y-3 max-w-2xl mx-auto">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-duo-green/10 border border-duo-green/30 text-duo-green rounded-full font-heading font-black text-xs uppercase tracking-wider">
              🛡️ Kejujuran & Keamanan
            </span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Dirancang untuk Membantu Anak Belajar dengan Lebih Menyenangkan
            </h2>
            <p class="text-slate-500 text-xs sm:text-sm font-body">
              CountingDuo dibangun dengan prinsip aman, bebas iklan, dan ramah waktu layar anak.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 space-y-3 shadow-sm">
              <div class="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                🛡️
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">100% Aman & Tanpa Iklan</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Tidak ada iklan video, banner mengganggu, atau link luar yang tidak diinginkan. Anak dapat belajar mandiri dengan aman di perangkat.
              </p>
            </div>

            <div class="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 space-y-3 shadow-sm">
              <div class="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl">
                ⏱️
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Mikro-Sesi 5–10 Menit</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Sesi latihan dirancang singkat dan padat, sesuai dengan rentang fokus anak usia dini agar tidak menyebabkan kelelahan layar.
              </p>
            </div>

            <div class="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 space-y-3 shadow-sm">
              <div class="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                🎈
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Pendekatan Visual Konsep</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Anak tidak menghafal rumus kering, melainkan memahami logika di balik angka dan kata lewat representasi gambar yang konkret.
              </p>
            </div>

            <div class="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-7 space-y-3 shadow-sm">
              <div class="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                📱
              </div>
              <h3 class="font-heading text-lg font-black text-slate-800">Mudah Diakses di Mana Saja</h3>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                Cukup buka web CountingDuo dari smartphone orang tua, tablet keluarga, atau komputer tanpa repot instalasi aplikasi besar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 11 — FAQ                                             -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-white border-t border-slate-200" aria-label="FAQ">
        <div class="max-w-3xl mx-auto space-y-8">
          <div class="text-center space-y-2">
            <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-heading font-extrabold text-xs">❓ Tanya Jawab</span>
            <h2 class="font-heading text-2xl sm:text-4xl font-black text-slate-800">
              Pertanyaan yang Sering Ditanyakan Orang Tua
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 font-body">
              Temukan jawaban seputar penggunaan CountingDuo untuk ananda.
            </p>
          </div>

          <div class="space-y-3">
            <details v-for="(faq, idx) in faqs" :key="idx" class="bg-slate-50 border-2 border-slate-200 hover:border-duo-green rounded-2xl p-4 sm:p-5 transition-all group cursor-pointer">
              <summary class="font-heading font-extrabold text-sm sm:text-base text-slate-800 cursor-pointer flex items-center justify-between gap-4 list-none">
                <span>{{ faq.q }}</span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform shrink-0 text-base">▼</span>
              </summary>
              <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pt-3 border-t border-slate-200/60 mt-3">
                {{ faq.a }}
              </p>
            </details>
          </div>

          <p class="text-center text-xs sm:text-sm text-slate-400 font-body">
            Ingin mencoba langsung? <button @click="handleGuestLogin" class="text-duo-blue font-bold underline cursor-pointer hover:text-duo-blue/80">Coba kuis tanpa daftar</button> atau daftar akun gratis.
          </p>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SECTION 12 — FINAL CTA                                       -->
      <!-- ============================================================ -->
      <section class="py-16 sm:py-20 px-4 bg-sky-50 text-slate-800 text-center relative overflow-hidden border-t border-slate-200">
        <div class="max-w-3xl mx-auto space-y-6 relative z-10">
          <div class="w-16 h-16 rounded-3xl bg-duo-green text-white flex items-center justify-center text-3xl mx-auto shadow-duo-green animate-bounce">
            🦉
          </div>

          <div class="space-y-3">
            <h2 class="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
              Yuk, Mulai Perjalanan Belajar Anak
            </h2>
            <p class="text-xs sm:text-base text-slate-600 font-body max-w-xl mx-auto leading-relaxed">
              Coba CountingDuo sekarang dan biarkan anak belajar melalui permainan, quiz, dan perjalanan skill yang menyenangkan.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <NuxtLink 
              to="/register" 
              class="w-full sm:w-auto px-8 py-4 duo-btn-green text-base font-extrabold shadow-xl hover:scale-102 transition-transform flex items-center justify-center gap-2"
              id="btn-footer-register"
            >
              <span>🚀 Mulai Belajar Gratis</span>
            </NuxtLink>
            <button 
              @click="handleGuestLogin" 
              class="w-full sm:w-auto px-7 py-4 duo-btn-blue text-sm sm:text-base font-extrabold shadow-md hover:scale-102 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              id="btn-footer-guest"
            >
              <span>⚡ Coba Tanpa Daftar</span>
            </button>
          </div>

          <p class="text-[11px] font-heading font-bold text-slate-400 pt-2">
            Gratis Selamanya • Tanpa Iklan • Langsung Bisa Dicoba
          </p>
        </div>
      </section>
    </main>

    <!-- ============================================================ -->
    <!-- SECTION 13 — FOOTER                                          -->
    <!-- ============================================================ -->
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
            Platform pembelajaran anak usia 4–9 tahun. Meliputi Matematika, Sains, Bahasa Indonesia, dan Logika Interaktif.
          </p>
          <p class="text-duo-yellow font-black text-xs">
            Belajar. Bermain. Bertumbuh.
          </p>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Navigasi Utama</p>
          <ul class="space-y-1.5">
            <li><NuxtLink to="/" class="hover:text-white transition-colors">Beranda</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">Katalog Materi</NuxtLink></li>
            <li><NuxtLink to="/course" class="hover:text-white transition-colors">Peta Belajar</NuxtLink></li>
            <li><NuxtLink to="/parent-dashboard" class="hover:text-white transition-colors">Area Orang Tua</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">Tentang Kami</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">Akun & Akses</p>
          <ul class="space-y-1.5">
            <li><NuxtLink to="/login" class="hover:text-white transition-colors">Masuk Akun</NuxtLink></li>
            <li><NuxtLink to="/register" class="hover:text-white transition-colors">Daftar Akun Baru</NuxtLink></li>
            <li><button @click="handleGuestLogin" class="hover:text-white transition-colors text-left cursor-pointer">Coba Mode Tamu</button></li>
          </ul>
        </div>

        <div class="space-y-2">
          <p class="text-white font-bold text-sm">CountingDuo</p>
          <p class="text-slate-400 font-body">Platform belajar anak usia dini dengan quiz, skill path, dan reward.</p>
          <p class="text-slate-500 text-[11px] pt-2">© 2026 CountingDuo. Hak Cipta Dilindungi.</p>
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

// SEO Meta Tags - Parent-oriented, natural, and honest
useSeoMeta({
  title: 'CountingDuo — Belajar Seru untuk Anak Usia 4–9 Tahun',
  description: 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, skill path, XP, dan materi Matematika, Sains, Bahasa, dan Logika.',
  keywords: 'aplikasi belajar anak TK, kuis matematika anak SD, game edukasi anak, belajar berhitung anak, belajar sains anak, platform belajar gamifikasi anak usia dini',
  ogTitle: 'CountingDuo — Belajar Seru untuk Anak Usia 4–9 Tahun',
  ogDescription: 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, skill path, XP, dan materi Matematika, Sains, Bahasa, dan Logika.',
  ogImage: '/images/og-banner.png',
  ogType: 'website',
  ogSiteName: 'CountingDuo',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CountingDuo — Belajar Seru untuk Anak Usia 4–9 Tahun',
  twitterDescription: 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, skill path, XP, dan materi Matematika, Sains, Bahasa, dan Logika.'
})

// JSON-LD Structured Data — Organization + WebApplication + FAQPage (Cleaned from fake ratings)
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
        'description': 'Platform pembelajaran anak usia 4–9 tahun meliputi Matematika, Sains, Bahasa Indonesia, dan Logika Interaktif.',
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
          'audienceType': 'Anak usia 4–9 tahun (PAUD, TK, SD Kelas 1–3)'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'IDR',
          'availability': 'https://schema.org/InStock'
        },
        'description': 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, skill path, XP, dan materi Matematika, Sains, Bahasa, dan Logika.'
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
            'name': 'CountingDuo untuk anak usia berapa?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo dirancang khusus untuk anak usia 4 hingga 9 tahun, mencakup jenjang PAUD, TK A, TK B, serta Sekolah Dasar Kelas 1 hingga Kelas 3.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah CountingDuo benar-benar gratis?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Ya, CountingDuo dapat digunakan gratis tanpa biaya tersembunyi dan tanpa iklan yang mengganggu.' }
          },
          {
            '@type': 'Question',
            'name': 'Mata pelajaran apa saja yang tersedia di CountingDuo?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo mencakup 4 mata pelajaran utama: Matematika, Sains & Dunia Hewan, Bahasa Indonesia, serta Seni & Logika.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah harus mendaftar akun untuk mencoba?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Tidak wajib. Tersedia Mode Tamu sehingga anak atau orang tua dapat langsung mencoba kuis tanpa perlu registrasi.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah bisa digunakan di HP atau tablet?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Bisa, CountingDuo dirancang responsif dan nyaman digunakan di smartphone (HP), tablet, maupun laptop/komputer.' }
          },
          {
            '@type': 'Question',
            'name': 'Bagaimana cara orang tua melihat perkembangan belajar anak?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'CountingDuo menyediakan halaman Area Orang Tua untuk melihat rangkuman modul yang sudah selesai, total XP, streak harian, serta topik yang masih perlu dilatih kembali.' }
          },
          {
            '@type': 'Question',
            'name': 'Apakah ada iklan yang mengganggu?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Tidak ada iklan. CountingDuo menjaga lingkungan belajar anak tetap aman, bersih, dan bebas distraksi komersial.' }
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
    q: 'CountingDuo untuk anak usia berapa?',
    a: 'CountingDuo dirancang untuk anak usia 4 hingga 9 tahun, mencakup jenjang PAUD, TK A, TK B, serta SD Kelas 1 hingga Kelas 3.'
  },
  {
    q: 'Apakah CountingDuo benar-benar gratis?',
    a: 'Ya, modul dasar dan kuis interaktif CountingDuo dapat diakses gratis tanpa iklan komersial yang mengganggu fokus anak.'
  },
  {
    q: 'Mata pelajaran apa saja yang tersedia?',
    a: 'Tersedia 4 topik utama: Matematika (angka, pola, hitung), Sains & Dunia Hewan (habitat, nama hewan, suara), Bahasa Indonesia (abjad, kata, suku kata), dan Seni & Logika (warna, bentuk, spasial).'
  },
  {
    q: 'Apakah harus mendaftar akun untuk mencoba?',
    a: 'Tidak harus! Anda bisa langsung klik tombol "Coba Tanpa Daftar" untuk menjajal mode tamu. Pendaftaran akun gratis disarankan jika ingin menyimpan progres belajar, XP, dan streak secara permanen.'
  },
  {
    q: 'Apakah bisa digunakan di HP atau tablet?',
    a: 'Bisa! CountingDuo dioptimalkan untuk layar sentuh HP dan tablet, dengan ukuran tombol yang nyaman disentuh jari anak-anak.'
  },
  {
    q: 'Bagaimana cara orang tua melihat perkembangan belajar anak?',
    a: 'Melalui Area Orang Tua (Parent Dashboard), orang tua dapat memantau modul yang telah tuntas, konsistensi streak belajar, serta topik kuis yang masih sering dijawab keliru.'
  },
  {
    q: 'Apakah aplikasi ini mengandung iklan?',
    a: 'Sama sekali tidak ada iklan pihak ketiga. Lingkungan belajar dibuat aman dan tenang agar anak dapat berkonsentrasi penuh.'
  }
]
</script>
