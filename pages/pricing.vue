<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 space-y-10 safe-mobile-padding">
      
      <!-- ========================================================================= -->
      <!-- STATE A: DASHBOARD KELOLA LANGGANAN (HANYA JIKA USER MEMILIKI AKUN PRO)  -->
      <!-- ========================================================================= -->
      <template v-if="userStore.isPro">
        <!-- Top Status Banner -->
        <section class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-900 text-xs sm:text-sm font-heading font-black shadow-xs animate-pop">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>👑 LANGGANAN QUIZCERDAS PRO SEDANG AKTIF</span>
          </div>

          <h1 class="font-heading text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Kelola Langganan Anda
          </h1>

          <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
            Pantau masa aktif, perpanjang periode belajar anak, atau cetak bukti pembayaran resmi Anda.
          </p>
        </section>

        <!-- Subscription Management Overview Card -->
        <section class="bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 rounded-[32px] p-1 shadow-xl">
          <div class="bg-white rounded-[28px] p-6 sm:p-8 space-y-6">
            
            <!-- Header Card with Plan Name and Status Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  👑
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-900">
                      QuizCerdas Pro
                    </h2>
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-heading font-black">
                      🟢 AKTIF
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 font-body mt-0.5">
                    Paket Akses Penuh Tahunan • Akun: <strong class="text-slate-700">{{ userStore.userDisplayName }}</strong> ({{ userStore.currentUser?.email }})
                  </p>
                </div>
              </div>

              <!-- Price Tag -->
              <div class="sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
                <div class="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider">Tarif Langganan</div>
                <div class="font-heading text-2xl sm:text-3xl font-black text-slate-900">
                  Rp 99.000 <span class="text-xs font-bold text-slate-500 font-extrabold">/ tahun</span>
                </div>
              </div>
            </div>

            <!-- Subscription Period & Days Remaining Widget -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Widget 1: Expiry Date -->
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
                <div class="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500">
                  <Calendar class="w-4 h-4 text-amber-600" />
                  <span>Masa Berlaku Hingga</span>
                </div>
                <div class="font-heading text-base sm:text-lg font-black text-slate-800">
                  {{ userStore.subscriptionFormattedExpiry }}
                </div>
                <div class="text-[10px] text-slate-400">Pembaruan otomatis dinonaktifkan</div>
              </div>

              <!-- Widget 2: Days Left Countdown -->
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
                <div class="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500">
                  <Clock class="w-4 h-4 text-emerald-600" />
                  <span>Sisa Waktu Belajar</span>
                </div>
                <div class="font-heading text-base sm:text-lg font-black text-emerald-600">
                  {{ userStore.subscriptionDaysLeft }} Hari Tersisa
                </div>
                <div class="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    class="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    :style="{ width: `${Math.min(100, Math.max(5, (userStore.subscriptionDaysLeft / 365) * 100))}%` }"
                  ></div>
                </div>
              </div>

              <!-- Widget 3: Status & Method -->
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1">
                <div class="flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500">
                  <CreditCard class="w-4 h-4 text-blue-600" />
                  <span>Metode Pembayaran</span>
                </div>
                <div class="font-heading text-base sm:text-lg font-black text-slate-800">
                  {{ invoiceInfo.paymentMethod || 'QRIS / Digital Pay' }}
                </div>
                <div class="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1">
                  <CheckCircle class="w-3 h-3 text-emerald-600" /> Lunas Terverifikasi
                </div>
              </div>
            </div>

            <!-- Active Perks Checklist -->
            <div class="space-y-3 pt-2">
              <h3 class="font-heading text-sm font-black text-slate-800 flex items-center gap-2">
                <span>⭐</span> Fasilitas Pro yang Sedang Dinikmati Anak:
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-heading font-bold text-slate-700">
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                  <div class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>❤️ <strong>Nyawa Tanpa Batas (∞ PRO)</strong> — Bebas salah tanpa takut terkunci</span>
                </div>
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>🗺️ <strong>Seluruh Unit & Bioma Terbuka</strong> (Modul PAUD hingga SD)</span>
                </div>
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                  <div class="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>🎨 <strong>Koleksi Mewarnai & Tracing Lengkap</strong> untuk melatih motorik</span>
                </div>
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                  <div class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>📊 <strong>Laporan Mingguan ke WhatsApp</strong> di Parent Dashboard</span>
                </div>
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <div class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>🖨️ <strong>Download & Cetak Printable PDF</strong> Lembar Kerja Anak</span>
                </div>
                <div class="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-black">✓</div>
                  <span>🚫 <strong>100% Bebas Iklan</strong> & Lingkungan Belajar Terlindungi</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons: Extend, Invoice, and Cancel -->
            <div class="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <!-- Button 1: Extend Pro -->
                <button 
                  @click="openExtendModal = true"
                  class="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-duo-green hover:bg-emerald-600 active:scale-95 text-white font-heading font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform cursor-pointer"
                >
                  <RefreshCw class="w-4 h-4" />
                  <span>Perpanjang Langganan (+1 Tahun)</span>
                </button>

                <!-- Button 2: Invoice Receipt -->
                <button 
                  @click="openInvoiceModal = true"
                  class="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-slate-700 border-2 border-slate-200 font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform cursor-pointer shadow-2xs"
                >
                  <Printer class="w-4 h-4 text-slate-500" />
                  <span>Cetak Bukti Pembayaran</span>
                </button>
              </div>

              <!-- Button 3: Cancel Subscription -->
              <button 
                @click="openCancelModal = true"
                class="w-full sm:w-auto px-4 py-2.5 text-xs font-heading font-extrabold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                ⚠️ Batalkan Langganan
              </button>
            </div>

          </div>
        </section>

        <!-- Quick Shortcut Cards for Pro Parents -->
        <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink 
            to="/" 
            class="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <div>
              <h4 class="font-heading font-black text-slate-800 text-sm">Lanjut Belajar Bersama Kiko</h4>
              <p class="text-xs text-slate-500 font-body">Masuk ke petualangan bioma matematika & calistung</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/parent-dashboard" 
            class="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <div>
              <h4 class="font-heading font-black text-slate-800 text-sm">Buka Area Orang Tua & WhatsApp</h4>
              <p class="text-xs text-slate-500 font-body">Atur nomor WhatsApp untuk penerimaan laporan belajar</p>
            </div>
          </NuxtLink>
        </section>

        <!-- Toggle to view comparison table if Pro user wants to compare -->
        <div class="text-center pt-2">
          <button 
            @click="showComparisonTable = !showComparisonTable"
            class="text-xs font-heading font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            {{ showComparisonTable ? '▲ Sembunyikan Tabel Rincian Paket' : '▼ Lihat Tabel Perbandingan Lengkap Paket Gratis vs Pro' }}
          </button>
        </div>
      </template>

      <!-- ========================================================================= -->
      <!-- STATE B: PENAWARAN HARGA (FREE USER / PRO INGIN LIHAT PERBANDINGAN)       -->
      <!-- ========================================================================= -->
      <template v-if="!userStore.isPro || showComparisonTable">
        <!-- HERO HEADER -->
        <section v-if="!userStore.isPro" class="text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-amber-900 text-xs sm:text-sm font-heading font-black shadow-xs animate-pop">
            <span>⭐ PILIHAN 10.000+ ORANG TUA CERDAS DI INDONESIA</span>
          </div>

          <h1 class="font-heading text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Buka Potensi Penuh Belajar Anak Bersama <span class="text-duo-green underline decoration-duo-yellow decoration-wavy">QuizCerdas Pro</span> 👑
          </h1>

          <p class="text-sm sm:text-base text-slate-600 font-body leading-relaxed max-w-2xl mx-auto">
            Dari Calistung, Berhitung Cepat, hingga Logika Matematika SD. Anak belajar mandiri tanpa rasa takut salah dengan <strong class="text-slate-900">Nyawa Tanpa Batas</strong> & pendampingan kurikulum lengkap.
          </p>
        </section>

        <!-- PRICING CARDS (2 COLUMNS: GRATIS VS PRO 99.000) -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          <!-- PLAN 1: FREE -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="space-y-1">
                <div class="text-xs font-heading font-black uppercase tracking-wider text-slate-400">Dasar</div>
                <h3 class="font-heading text-2xl font-black text-slate-800">Paket Gratis</h3>
                <p class="text-xs text-slate-500 font-body">Coba modul dasar & rasakan serunya gamifikasi belajar.</p>
              </div>

              <div class="font-heading text-3xl font-black text-slate-900">
                Rp 0 <span class="text-xs font-bold text-slate-400">/ selamanya</span>
              </div>

              <ul class="space-y-3 text-xs font-heading font-extrabold text-slate-600 border-t border-slate-100 pt-4">
                <li class="flex items-center gap-2.5">
                  <span class="text-emerald-500 font-black">✓</span> 5 Nyawa per sesi belajar
                </li>
                <li class="flex items-center gap-2.5">
                  <span class="text-emerald-500 font-black">✓</span> Akses Unit 1 (Bioma Pertama)
                </li>
                <li class="flex items-center gap-2.5">
                  <span class="text-emerald-500 font-black">✓</span> Mini games mewarnai dasar
                </li>
                <li class="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>✕</span> Nyawa Tanpa Batas (Bebas Salah)
                </li>
                <li class="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>✕</span> Laporan Mingguan ke WhatsApp
                </li>
                <li class="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>✕</span> Download Printable PDF Lembar Kerja
                </li>
              </ul>
            </div>

            <button 
              disabled 
              class="w-full py-3.5 bg-slate-100 rounded-2xl text-slate-400 font-heading font-black text-xs cursor-default"
            >
              {{ !userStore.isPro ? 'Paket Aktif Saat Ini' : 'Paket Standar' }}
            </button>
          </div>

          <!-- PLAN 2: PRO (RP 99.000) -->
          <div class="bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-1 shadow-2xl relative flex flex-col justify-between">
            <!-- Top Badge -->
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-heading font-black text-xs px-4 py-1 rounded-full shadow-lg border-2 border-white uppercase tracking-wider animate-bounce-slow whitespace-nowrap">
              🔥 PENAWARAN SPESIAL • AKSES 1 TAHUN
            </div>

            <div class="bg-white rounded-[22px] p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div class="space-y-4">
                <div class="space-y-1 pt-1">
                  <div class="text-xs font-heading font-black uppercase tracking-wider text-amber-600">QUIZCERDAS PRO</div>
                  <h3 class="font-heading text-2xl sm:text-3xl font-black text-slate-900">Akses Penuh Pro</h3>
                  <p class="text-xs text-slate-500 font-body">Pengalaman belajar terlengkap, seru, dan tanpa batas untuk anak.</p>
                </div>

                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="font-heading text-4xl font-black text-slate-900">Rp 99.000</span>
                    <span class="text-xs font-bold text-slate-500 font-extrabold">/ tahun</span>
                  </div>
                  <div class="text-xs font-heading font-black text-amber-700 mt-1">Hanya ~Rp 8.250 / bulan (Kurang dari Rp 300 / hari!)</div>
                </div>

                <ul class="space-y-3 text-xs font-heading font-black text-slate-700 border-t border-amber-100 pt-4">
                  <li class="flex items-center gap-2.5 text-amber-900">
                    <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">⭐</span> 
                    <strong>❤️ Nyawa Tanpa Batas (Bebas Salah)</strong>
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</span> 
                    Buka SEMUA Unit & Level Pembelajaran (PAUD - SD)
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</span> 
                    Koleksi Lengkap Coloring & Tracing Angka 1-100
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</span> 
                    Laporan Mingguan Otomatis ke WhatsApp Orang Tua
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</span> 
                    Unlimited Download & Print PDF Lembar Kerja
                  </li>
                  <li class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</span> 
                    100% Bebas Iklan & Pengalaman Aman untuk Anak
                  </li>
                </ul>
              </div>

              <button 
                @click="openCheckoutModal('pro')"
                class="w-full py-4 duo-btn-yellow text-sm font-heading font-black shadow-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                🚀 Aktifkan QuizCerdas Pro (Rp 99.000)
              </button>
            </div>
          </div>

        </section>

        <!-- TRUST & GUARANTEE STRIP -->
        <section class="bg-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-amber-400 text-3xl flex items-center justify-center shadow-md shrink-0">
              🛡️
            </div>
            <div class="space-y-1">
              <h4 class="font-heading text-lg font-black text-amber-950">Garansi 7 Hari Tanpa Risiko</h4>
              <p class="text-xs sm:text-sm text-amber-800 font-body">
                Jika si kecil tidak merasakan kemajuan belajar atau tidak suka dalam 7 hari pertama, kami kembalikan 100% uang Anda tanpa pertanyaan!
              </p>
            </div>
          </div>
        </section>

        <!-- FAQ SECTION -->
        <section class="max-w-3xl mx-auto space-y-6">
          <div class="text-center space-y-1">
            <h3 class="font-heading text-2xl font-black text-slate-800">Pertanyaan yang Sering Diajukan (FAQ)</h3>
            <p class="text-xs text-slate-500">Semua yang perlu Ayah & Bunda ketahui tentang QuizCerdas Pro</p>
          </div>

          <div class="space-y-3">
            <div v-for="(faq, idx) in faqs" :key="idx" class="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 space-y-2 shadow-xs">
              <h5 class="font-heading text-sm font-black text-slate-800 flex items-center gap-2">
                <span class="text-duo-green">Q:</span> {{ faq.q }}
              </h5>
              <p class="text-xs text-slate-600 font-body leading-relaxed pl-5">
                {{ faq.a }}
              </p>
            </div>
          </div>
        </section>
      </template>

    </main>

    <!-- ========================================================================= -->
    <!-- MODAL 1: PERPANJANG LANGGANAN (+1 TAHUN)                                   -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div 
        v-if="openExtendModal" 
        class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-pop"
        @click.self="openExtendModal = false"
      >
        <div class="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full border-4 border-amber-300 shadow-2xl space-y-6 relative">
          <button 
            @click="openExtendModal = false"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-black text-xs cursor-pointer"
          >
            ✕
          </button>

          <div class="text-center space-y-2">
            <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 text-3xl mx-auto flex items-center justify-center shadow-inner">
              🔄
            </div>
            <h3 class="font-heading text-2xl font-black text-slate-900">Perpanjang Langganan</h3>
            <p class="text-xs text-slate-600 font-body">
              Tambahkan 1 Tahun (12 Bulan) masa aktif ke akun QuizCerdas Pro anak Anda.
            </p>
          </div>

          <div class="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2.5 text-xs font-heading">
            <div class="flex justify-between items-center text-slate-600">
              <span>Paket:</span>
              <span class="font-black text-slate-900">QuizCerdas Pro (1 Tahun)</span>
            </div>
            <div class="flex justify-between items-center text-slate-600">
              <span>Masa Aktif Saat Ini:</span>
              <span class="font-black text-slate-800">{{ userStore.subscriptionFormattedExpiry }}</span>
            </div>
            <div class="flex justify-between items-center text-emerald-800 bg-emerald-100/70 p-2 rounded-xl border border-emerald-300">
              <span>Masa Aktif Baru:</span>
              <span class="font-black">➔ {{ calculatedExtendedExpiry }}</span>
            </div>
            <div class="border-t border-amber-200 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
              <span>Total Biaya:</span>
              <span class="text-amber-800 text-base">Rp 99.000</span>
            </div>
          </div>

          <div class="space-y-2">
            <button 
              @click="handleExtendSubscription"
              :disabled="isExtending"
              class="w-full py-3.5 rounded-2xl duo-btn-yellow font-heading font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span v-if="isExtending" class="animate-spin">⏳</span>
              <span v-else>🚀</span>
              <span>{{ isExtending ? 'Memproses Perpanjangan...' : 'Konfirmasi & Bayar Rp 99.000' }}</span>
            </button>
            <button 
              @click="openExtendModal = false"
              class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-heading font-bold text-xs cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- MODAL 2: CETAK BUKTI PEMBAYARAN / FAKTUR RESMI (INVOICE)                  -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div 
        v-if="openInvoiceModal" 
        class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white animate-pop"
        @click.self="openInvoiceModal = false"
      >
        <div class="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full border-2 border-slate-200 shadow-2xl space-y-6 relative print:border-none print:shadow-none print:w-full print:max-w-none">
          
          <!-- Close button (hidden on print) -->
          <button 
            @click="openInvoiceModal = false"
            class="print:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-black text-xs cursor-pointer"
          >
            ✕
          </button>

          <!-- Printable Invoice Content -->
          <div id="printable-receipt" class="space-y-6">
            <!-- Invoice Header -->
            <div class="flex items-center justify-between border-b-2 border-slate-200 pb-4">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white text-xl font-heading shadow-xs">
                  🦉
                </div>
                <div>
                  <h4 class="font-heading text-lg font-black text-slate-900 leading-tight">QuizCerdas</h4>
                  <p class="text-[10px] text-slate-400 font-body">Platform Belajar Cerdas & Menyenangkan</p>
                </div>
              </div>

              <!-- Stamp Paid Badge -->
              <div class="border-2 border-emerald-500 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl text-center rotate-[-3deg]">
                <div class="text-[10px] font-heading font-black tracking-widest uppercase">LUNAS</div>
                <div class="text-[8px] font-heading font-bold">{{ invoiceInfo.date ? formatDate(invoiceInfo.date) : 'TERVERIFIKASI' }}</div>
              </div>
            </div>

            <!-- Invoice Info Block -->
            <div class="grid grid-cols-2 gap-4 text-xs font-heading">
              <div>
                <span class="text-slate-400 block text-[10px] uppercase font-bold">Ditujukan Kepada:</span>
                <span class="font-black text-slate-800 text-sm block">{{ userStore.userDisplayName }}</span>
                <span class="text-slate-500 font-normal block">{{ userStore.currentUser?.email }}</span>
              </div>
              <div class="text-right">
                <span class="text-slate-400 block text-[10px] uppercase font-bold">No. Bukti Pembayaran:</span>
                <span class="font-black text-slate-800 block">{{ invoiceInfo.number }}</span>
                <span class="text-slate-500 font-normal block">Tanggal: {{ invoiceInfo.date ? formatDate(invoiceInfo.date) : 'Hari ini' }}</span>
              </div>
            </div>

            <!-- Itemized Table -->
            <div class="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div class="bg-slate-100 p-3 font-heading font-black text-slate-700 flex justify-between">
                <span>Deskripsi Layanan</span>
                <span>Jumlah</span>
              </div>
              <div class="p-3 bg-white space-y-1">
                <div class="flex justify-between font-heading font-bold text-slate-800">
                  <span>QuizCerdas Pro (Akses Penuh 1 Tahun)</span>
                  <span>Rp 99.000</span>
                </div>
                <p class="text-[10px] text-slate-500 font-body">
                  Termasuk Nyawa Tanpa Batas, seluruh materi PAUD & SD, Tracing & Mewarnai, dan Laporan WA.
                </p>
              </div>
              <div class="bg-slate-50 p-3 font-heading font-black text-slate-900 border-t border-slate-200 flex justify-between text-sm">
                <span>Total Pembayaran (PPN 0%)</span>
                <span class="text-emerald-700">Rp 99.000</span>
              </div>
            </div>

            <!-- Footer Details -->
            <div class="text-[10px] text-slate-500 space-y-1 border-t border-slate-100 pt-3">
              <p>Metode Pembayaran: <strong class="text-slate-700">{{ invoiceInfo.paymentMethod }}</strong></p>
              <p>Masa Aktif Layanan: <strong class="text-slate-700">{{ userStore.subscriptionFormattedExpiry }}</strong></p>
              <p class="text-slate-400 italic">Bukti pembayaran digital ini sah dan diterbitkan secara otomatis oleh sistem QuizCerdas.</p>
            </div>
          </div>

          <!-- Actions Bar (Hidden when printing) -->
          <div class="print:hidden border-t border-slate-100 pt-4 flex gap-2">
            <button 
              @click="printReceipt"
              class="flex-1 py-3 rounded-2xl bg-duo-green hover:bg-emerald-600 text-white font-heading font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer class="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button 
              @click="openInvoiceModal = false"
              class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- MODAL 3: BATALKAN LANGGANAN (CANCEL CONFIRMATION)                          -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div 
        v-if="openCancelModal" 
        class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-pop"
        @click.self="openCancelModal = false"
      >
        <div class="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full border-2 border-rose-200 shadow-2xl space-y-5 relative">
          <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 text-3xl mx-auto flex items-center justify-center">
            ⚠️
          </div>

          <div class="text-center space-y-2">
            <h3 class="font-heading text-xl font-black text-slate-900">Batalkan Langganan Pro?</h3>
            <p class="text-xs text-slate-600 font-body leading-relaxed">
              Jika Ayah/Bunda membatalkan langganan, akun anak akan kembali ke <strong>Paket Gratis</strong> dengan batas 5 nyawa per sesi dan akses terbatas ke Bioma pertama.
            </p>
          </div>

          <div class="bg-rose-50 rounded-2xl p-4 border border-rose-200 space-y-2 text-xs font-heading text-rose-900">
            <div class="font-black text-rose-950">Fitur yang akan dinonaktifkan:</div>
            <ul class="space-y-1.5 pl-2">
              <li>✕ Nyawa Tanpa Batas (Kembali ke 5 nyawa)</li>
              <li>✕ Akses Unit 2, 3, dan bioma lanjutan</li>
              <li>✕ Laporan mingguan via WhatsApp</li>
            </ul>
          </div>

          <div class="space-y-2 pt-1">
            <button 
              @click="handleCancelSubscription"
              :disabled="isCancelling"
              class="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-heading font-black text-xs cursor-pointer shadow-md flex items-center justify-center gap-2 transition-transform disabled:opacity-50"
            >
              <span v-if="isCancelling" class="animate-spin">⏳</span>
              <span>{{ isCancelling ? 'Membatalkan...' : 'Ya, Batalkan Langganan' }}</span>
            </button>
            <button 
              @click="openCancelModal = false"
              class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs cursor-pointer"
            >
              Tetap Berlangganan Pro
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Notification Toast -->
    <Teleport to="body">
      <Transition name="fade-modal">
        <div 
          v-if="toastMessage" 
          class="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl font-heading font-black text-xs sm:text-sm flex items-center gap-2.5 animate-pop"
          :class="toastType === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'"
        >
          <span>{{ toastType === 'success' ? '🎉' : 'ℹ️' }}</span>
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { usePaywall } from '~/composables/usePaywall'
import { Calendar, Clock, CreditCard, CheckCircle, RefreshCw, Printer } from 'lucide-vue-next'
import confetti from 'canvas-confetti'

const userStore = useUserStore()
const { openPaywall } = usePaywall()

// Modal states
const openExtendModal = ref(false)
const openInvoiceModal = ref(false)
const openCancelModal = ref(false)
const showComparisonTable = ref(false)

const isExtending = ref(false)
const isCancelling = ref(false)

// Toast state
const toastMessage = ref('')
const toastType = ref<'success' | 'info'>('success')

const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
  toastMessage.value = msg
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 4000)
}

// Invoice state
const invoiceInfo = ref({
  number: `INV-QC-${new Date().getFullYear()}-001`,
  planName: 'QuizCerdas Pro (Akses Penuh 1 Tahun)',
  amount: 99000,
  paymentMethod: 'QRIS / GoPay / DANA',
  date: new Date().toISOString()
})

const fetchSubscriptionStatus = async () => {
  if (!userStore.currentUser) return
  try {
    const res = await $fetch<any>('/api/subscription/status', {
      query: { userId: userStore.currentUser.id }
    })
    if (res && res.success && res.invoice) {
      invoiceInfo.value = res.invoice
    }
  } catch (e) {
    console.warn('[SUBSCRIPTION] Could not load invoice data:', e)
  }
}

onMounted(() => {
  fetchSubscriptionStatus()
})

// Calculate extended expiry date (+12 months from current expiry)
const calculatedExtendedExpiry = computed(() => {
  let baseDate = new Date()
  if (userStore.subscriptionExpiresAt && new Date(userStore.subscriptionExpiresAt).getTime() > Date.now()) {
    baseDate = new Date(userStore.subscriptionExpiresAt)
  }
  baseDate.setMonth(baseDate.getMonth() + 12)
  return baseDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

const triggerCelebration = () => {
  if (typeof window === 'undefined') return
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  } catch (e) {}
}

// Actions
const handleExtendSubscription = async () => {
  isExtending.value = true
  try {
    await userStore.upgradeToPro('PRO', 12)
    await fetchSubscriptionStatus()
    openExtendModal.value = false
    triggerCelebration()
    showToast('Selamat! Langganan Pro berhasil diperpanjang 1 tahun ke depan! 🎉', 'success')
  } catch (err: any) {
    alert(err.message || 'Gagal memperpanjang langganan')
  } finally {
    isExtending.value = false
  }
}

const handleCancelSubscription = async () => {
  isCancelling.value = true
  try {
    await userStore.downgradeToFree()
    await fetchSubscriptionStatus()
    openCancelModal.value = false
    showToast('Langganan Pro telah dibatalkan. Akun Anda kembali ke Paket Gratis.', 'info')
  } catch (err: any) {
    alert(err.message || 'Gagal membatalkan langganan')
  } finally {
    isCancelling.value = false
  }
}

const printReceipt = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

const openCheckoutModal = (planType: string) => {
  openPaywall({
    reason: 'general',
    title: 'Tingkatkan ke QuizCerdas Pro 👑',
    description: 'Beri si kecil pengalaman belajar paling lengkap, menyenangkan, dan efektif.'
  })
}

const faqs = [
  {
    q: 'Apakah bisa digunakan di HP / Tablet / Laptop?',
    a: 'Bisa! QuizCerdas berjalan lancar di browser Chrome, Safari, HP Android, iPhone, iPad, maupun laptop tanpa perlu install aplikasi berat.'
  },
  {
    q: 'Mengapa sistem Nyawa Tanpa Batas penting untuk anak?',
    a: 'Anak-anak belajar lewat mencoba dan berani salah. Ketika nyawa mereka habis dan harus menunggu, antusiasme belajar seringkali buyar. Akun Pro memastikan proses eksplorasi belajar berjalan mulus tanpa hambatan.'
  },
  {
    q: 'Bagaimana cara kerja laporan mingguan ke WhatsApp?',
    a: 'Ayah/Bunda cukup memasukkan nomor WhatsApp di Parent Dashboard. Setiap hari Minggu pukul 16:00 WIB, bot QuizCerdas akan mengirim ringkasan waktu belajar, materi yang dikuasai, dan saran latihan untuk minggu depan.'
  },
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Kami mendukung QRIS (bisa scan pakai GoPay, OVO, ShopeePay, DANA, BCA Mobile), serta Virtual Account Bank BCA, Mandiri, BRI, dan BNI.'
  }
]
</script>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-pop {
  animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
