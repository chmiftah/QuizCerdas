<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
    <!-- Top Navigation -->
    <HeaderNav />

    <main class="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8">

      <!-- ================================================================== -->
      <!-- STATE: NOT AUTHENTICATED (Guest or logged out)                      -->
      <!-- ================================================================== -->
      <div v-if="!userStore.isAuthenticated || userStore.currentUser?.role === 'guest'" class="py-16 text-center animate-pop">
        <div class="bg-white rounded-3xl p-10 sm:p-16 border-2 border-dashed border-slate-200 space-y-6 max-w-lg mx-auto shadow-sm">
          <div class="w-20 h-20 rounded-3xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-4xl mx-auto shadow-sm animate-bounce-slow">
            👨‍👩‍👧
          </div>
          <div class="space-y-2">
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-full text-xs font-heading font-black">
              Area Orang Tua & Guru
            </div>
            <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Masuk Untuk Melihat Laporan
            </h2>
            <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500 leading-relaxed max-w-sm mx-auto">
              Pantau perkembangan belajar anak secara real-time. Login atau buat akun terlebih dahulu untuk mengakses dashboard orang tua.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <NuxtLink to="/login" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-heading font-black text-sm shadow-md active:scale-95 transition-all">
              🔑 Masuk Akun
            </NuxtLink>
            <NuxtLink to="/register" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm shadow-md border-b-4 border-[#3b8a02] active:scale-95 transition-all">
              🚀 Daftar Gratis
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- STATE: LOADING                                                       -->
      <!-- ================================================================== -->
      <div v-else-if="isLoading" class="space-y-8 animate-pulse">
        <!-- Header Skeleton -->
        <div class="bg-slate-200 rounded-3xl h-36"></div>
        <!-- Metrics Skeleton -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="bg-slate-200 rounded-3xl h-24"></div>
        </div>
        <!-- Module Grid Skeleton -->
        <div class="bg-white rounded-3xl p-6 border-2 border-slate-100 space-y-4">
          <div class="h-6 w-56 bg-slate-200 rounded-full"></div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div v-for="i in 6" :key="i" class="h-24 bg-slate-100 rounded-2xl"></div>
          </div>
        </div>
      </div>

      <!-- ================================================================== -->
      <!-- STATE: DASHBOARD LOADED                                              -->
      <!-- ================================================================== -->
      <div v-else class="space-y-8 animate-pop">

        <!-- ---- Title Header ---- -->
        <div class="bg-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div class="space-y-2 z-10">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/30 backdrop-blur-sm rounded-full text-xs font-heading font-extrabold tracking-wider uppercase text-indigo-200 border border-indigo-400/30">
              📊 Laporan Perkembangan Anak
            </div>
            <h1 class="text-3xl sm:text-4xl font-heading font-black drop-shadow-md">
              Area Orang Tua & Guru 👨‍👩‍👧
            </h1>
            <p class="text-sm sm:text-base font-heading text-slate-300 max-w-xl leading-relaxed">
              Pantau statistik belajar, modul yang dikuasai, serta rekomendasi latihan terbaik untuk Ananda
              <strong class="text-amber-300 font-black">{{ userStore.userDisplayName }}</strong>.
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
                <span class="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-heading font-bold text-[10px]">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                  Active Learner
                </span>
              </div>
            </div>
            <template #fallback>
              <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 z-10 shrink-0">
                <div class="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-3xl shadow-md">🦉</div>
                <div>
                  <h3 class="font-heading font-extrabold text-base">Penjelajah Muda</h3>
                  <p class="text-xs text-indigo-200 font-heading">TK B / Kelas 1</p>
                </div>
              </div>
            </template>
          </ClientOnly>

          <!-- Decorative glow -->
          <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-700/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- ---- Quick Metrics Grid ---- -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <!-- Total XP -->
          <div class="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm space-y-1 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Total XP</span>
              <span class="text-xl">⚡</span>
            </div>
            <p class="font-heading font-black text-2xl sm:text-3xl text-amber-500">{{ userStore.xp.toLocaleString('id-ID') }}</p>
            <p class="text-[11px] font-heading font-semibold text-slate-500">Level {{ userStore.userLevel }} Penjelajah</p>
          </div>

          <!-- Streak -->
          <div class="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm space-y-1 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Streak Belajar</span>
              <span class="text-xl">🔥</span>
            </div>
            <p class="font-heading font-black text-2xl sm:text-3xl text-orange-500">{{ userStore.streak }} <span class="text-base font-bold text-slate-400">Hari</span></p>
            <p class="text-[11px] font-heading font-semibold text-slate-500">
              {{ userStore.streak >= 7 ? '🎉 Konsisten Banget!' : userStore.streak >= 3 ? '👍 Terus Semangat!' : 'Mulai Hari Ini ✨' }}
            </p>
          </div>

          <!-- Pelajaran Selesai -->
          <div class="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm space-y-1 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Pelajaran Selesai</span>
              <span class="text-xl">📚</span>
            </div>
            <p class="font-heading font-black text-2xl sm:text-3xl text-emerald-600">{{ totalCompletedLessons }}</p>
            <p class="text-[11px] font-heading font-semibold text-slate-500">Dari seluruh modul</p>
          </div>

          <!-- Modul Dijelajahi -->
          <div class="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm space-y-1 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">Modul Dijelajahi</span>
              <span class="text-xl">🗺️</span>
            </div>
            <p class="font-heading font-black text-2xl sm:text-3xl text-sky-600">
              {{ exploredCoursesCount }}
              <span class="text-base font-bold text-slate-400">/ {{ courseStore.catalogRegistry.length }}</span>
            </p>
            <p class="text-[11px] font-heading font-semibold text-slate-500">Modul berbeda dicoba</p>
          </div>
        </div>

        <!-- ---- Module Progress Grid (replaces hardcoded number heatmap) ---- -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-100 shadow-md space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">
                Progres Per Modul Belajar 🗺️
              </h2>
              <p class="text-xs sm:text-sm font-heading text-slate-500">
                Jumlah pelajaran yang telah diselesaikan anak di setiap modul petualangan.
              </p>
            </div>
            <div class="flex items-center gap-3 text-xs font-heading font-bold shrink-0">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Aktif</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-amber-400"></span> Dimulai</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-slate-200"></span> Belum</span>
            </div>
          </div>

          <div v-if="courseStore.catalogRegistry.length === 0" class="text-center py-8 text-slate-400 font-heading font-semibold text-sm">
            <span class="text-3xl block mb-2">📦</span>
            Memuat data modul...
          </div>

          <!-- Empty state if no modules have been attempted yet -->
          <div v-else-if="attemptedCourses.length === 0" class="text-center py-10 px-4 space-y-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <span class="text-4xl block">🌱</span>
            <h3 class="font-heading font-black text-slate-700 text-base">Belum Ada Modul yang Dikerjakan</h3>
            <p class="text-xs text-slate-500 font-heading max-w-md mx-auto">
              Ananda belum mulai mengerjakan latihan pada modul belajar. Ajak Ananda untuk memulai petualangan pertamanya di katalog kursus!
            </p>
            <div class="pt-1">
              <NuxtLink
                to="/catalog"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-xl font-heading font-black text-xs shadow-sm hover:scale-105 transition-transform"
              >
                <span>📚</span>
                <span>Buka Katalog Modul</span>
              </NuxtLink>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="course in attemptedCourses"
              :key="course.id"
              @click="openModuleHistory(course.id)"
              class="p-4 rounded-2xl border-2 flex flex-col gap-2.5 transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer group relative"
              :class="getModuleCardClass(course.id)"
              title="Klik untuk melihat histori pengerjaan dan evaluasi jawaban"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="text-xl shrink-0 group-hover:scale-110 transition-transform">{{ course.icon || '📖' }}</span>
                  <span class="font-heading font-black text-xs truncate group-hover:text-indigo-600 transition-colors">{{ course.title }}</span>
                </div>
                <span
                  class="text-[10px] font-heading font-black px-2 py-0.5 rounded-full shrink-0"
                  :class="getModuleBadgeClass(course.id)"
                >
                  {{ getModuleStatusLabel(course.id) }}
                </span>
              </div>

              <div class="space-y-1">
                <div class="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="getModuleBarClass(course.id)"
                    :style="{ width: `${getModuleBarWidth(course.id)}%` }"
                  ></div>
                </div>
                <div class="flex items-center justify-between text-[11px] font-heading font-bold">
                  <span class="text-slate-400 text-[10px] font-semibold">
                    {{ getCourseAttemptCount(course.id) > 0 ? `${getCourseAttemptCount(course.id)} soal tercatat` : '' }}
                  </span>
                  <p :class="getModuleTextClass(course.id)">
                    {{ getCompletedLessonsForCourse(course.id) }} pelajaran selesai
                  </p>
                </div>
              </div>

              <!-- Button CTA to see history -->
              <div class="pt-1 mt-auto border-t border-slate-100/80">
                <button
                  type="button"
                  class="w-full py-1.5 px-2.5 rounded-xl bg-white/80 hover:bg-white text-indigo-700 hover:text-indigo-800 border border-slate-200/70 font-heading font-black text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-2xs group-hover:border-indigo-300 group-hover:bg-indigo-50/50"
                >
                  <span>🔍</span>
                  <span>Lihat Histori & Jawaban</span>
                  <span class="text-[10px] opacity-60">➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ---- Recent Activity Log ---- -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-100 shadow-md space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">Riwayat Aktivitas Belajar 📋</h2>
              <p class="text-xs text-slate-400 font-heading font-semibold">5 aktivitas terbaru yang telah diselesaikan anak.</p>
            </div>
            <button @click="refreshActivity" :disabled="isRefreshingActivity" class="px-3 py-1.5 text-xs font-heading font-black text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50">
              <span :class="isRefreshingActivity ? 'animate-spin' : ''">🔄</span>
              <span>Refresh</span>
            </button>
          </div>

          <!-- Empty state -->
          <div v-if="recentLogs.length === 0 && !isRefreshingActivity" class="text-center py-8 space-y-2">
            <span class="text-4xl block">🌱</span>
            <p class="font-heading font-black text-slate-600 text-base">Belum Ada Aktivitas</p>
            <p class="font-heading font-semibold text-slate-400 text-xs">Ajak anak untuk mulai petualangan pertamanya di halaman Kursus!</p>
            <NuxtLink to="/catalog" class="inline-flex items-center gap-1.5 mt-2 px-4 py-2 bg-[#58cc02] text-white rounded-xl font-heading font-black text-xs shadow-sm hover:scale-105 transition-transform">
              📚 Mulai Petualangan
            </NuxtLink>
          </div>

          <!-- Loading state -->
          <div v-else-if="isRefreshingActivity" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-14 bg-slate-100 rounded-2xl animate-pulse"></div>
          </div>

          <!-- Activity list -->
          <ul v-else class="space-y-2.5">
            <li
              v-for="log in recentLogs"
              :key="`${log.courseId}-${log.lessonId}-${log.createdAt}`"
              class="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-heading text-base font-black shrink-0"
                :class="log.status === 'checkpoint_completed' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'">
                {{ log.status === 'checkpoint_completed' ? '👑' : '✅' }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-heading font-black text-xs text-slate-700 truncate">
                  {{ formatActivityLabel(log) }}
                </p>
                <p class="font-heading font-semibold text-[11px] text-slate-400">
                  {{ formatActivityDate(log.createdAt) }}
                </p>
              </div>
              <div class="text-right shrink-0">
                <span class="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-heading font-black text-[11px]">
                  ⚡ +{{ log.xpEarned }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- ---- PRO: WhatsApp Weekly Report ---- -->
        <div class="relative bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden space-y-4">
          <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/20 rounded-full text-[11px] font-heading font-black uppercase tracking-wider border border-white/20 text-emerald-100">
                <span>📲 FITUR PRO</span><span>•</span><span>Rangkuman Mingguan Otomatis</span>
              </div>
              <h3 class="font-heading text-xl sm:text-2xl font-black">Sinkronisasi Laporan ke WhatsApp Ayah & Bunda 💬</h3>
              <p class="text-xs sm:text-sm text-emerald-100 font-body max-w-xl">
                Dapatkan rangkuman otomatis waktu belajar, materi yang dikuasai, dan saran latihan Ananda langsung ke WA setiap Minggu sore tanpa perlu login.
              </p>
            </div>

            <!-- If Pro: WA Input Form -->
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
              <p class="text-[10px] text-emerald-200 font-heading">🔔 Status: Siap dikirim setiap Minggu pk 16.00 WIB</p>
            </div>

            <!-- If Free: Paywall Button -->
            <div v-else class="w-full sm:w-auto shrink-0">
              <button
                @click="openPaywallForWA"
                class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-black text-xs sm:text-sm shadow-lg border-2 border-white cursor-pointer active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span>👑</span><span>Aktifkan Laporan WhatsApp (Pro)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ---- PRO: Weakness Matrix (Real Data) ---- -->
        <div class="relative bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-100 shadow-md space-y-6 overflow-hidden">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[11px] font-heading font-black uppercase tracking-wider border border-amber-300 mb-1">
                <span>🧠 ANALISIS MENDALAM</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">Modul yang Butuh Perhatian 🎯</h2>
              <p class="text-xs sm:text-sm font-heading text-slate-500">Modul belajar yang belum aktif dijelajahi — fokuskan pendampingan di sini.</p>
            </div>
          </div>

          <!-- If Pro: Display real data -->
          <div v-if="userStore.isPro">
            <div v-if="weakestModules.length === 0" class="text-center py-6 space-y-2">
              <span class="text-3xl block">🎉</span>
              <p class="font-heading font-black text-emerald-700">Luar Biasa! Semua Modul Sudah Dijelajahi!</p>
              <p class="text-xs text-slate-400 font-heading font-semibold">Anak sudah aktif di semua modul yang tersedia.</p>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="(item, i) in weakestModules"
                :key="item.id"
                class="p-4 rounded-2xl border-2 space-y-2"
                :class="i === 0 ? 'bg-rose-50 border-rose-200' : i === 1 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'"
              >
                <div class="flex items-center justify-between">
                  <span class="flex items-center gap-1.5 text-xs font-heading font-black" :class="i === 0 ? 'text-rose-800' : i === 1 ? 'text-amber-800' : 'text-slate-700'">
                    <span>{{ item.icon }}</span> {{ item.title }}
                  </span>
                  <span class="text-xs font-heading font-black" :class="i === 0 ? 'text-rose-600' : i === 1 ? 'text-amber-600' : 'text-slate-500'">
                    {{ item.completedCount === 0 ? 'Belum Dimulai' : item.completedCount + ' Pelajaran' }}
                  </span>
                </div>
                <p class="text-[11px] font-body" :class="i === 0 ? 'text-rose-700' : i === 1 ? 'text-amber-700' : 'text-slate-600'">
                  {{ item.advice }}
                </p>
              </div>
            </div>
          </div>

          <!-- If Free: Gated Pro -->
          <div v-else class="relative rounded-2xl p-6 border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto">🔒</div>
            <div class="space-y-1 max-w-md mx-auto">
              <h4 class="font-heading text-base font-black text-slate-800">Analisis Kelemahan Eksklusif untuk Akun Pro</h4>
              <p class="text-xs text-slate-500 font-body">Ketahui modul mana yang paling perlu pendampingan agar proses belajar di rumah jauh lebih terarah dan efektif.</p>
            </div>
            <button @click="openPaywallForAnalytics" class="px-6 py-2.5 duo-btn-yellow text-xs font-heading font-black shadow-md cursor-pointer">
              👑 Buka Analisis Mendalam Pro
            </button>
          </div>
        </div>

        <!-- ---- Parent Tips & Recommendations ---- -->
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
              <span>Apresiasi setiap XP yang diperoleh anak dan rayakan bersama ketika ia naik level.</span>
            </li>
            <li class="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-2.5">
              <span class="text-lg shrink-0">⏰</span>
              <span>Targetkan waktu belajar singkat sekitar <strong>5–10 menit per hari</strong> agar konsistensi streak tetap terjaga.</span>
            </li>
          </ul>
        </div>

        <!-- Module History & Answers Modal -->
        <ModuleHistoryModal
          :isOpen="isHistoryModalOpen"
          :courseId="selectedHistoryCourseId"
          @close="isHistoryModalOpen = false"
          @selectCourse="selectedHistoryCourseId = $event"
        />

      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-slate-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { usePaywall } from '~/composables/usePaywall'

const userStore = useUserStore()
const courseStore = useCourseStore()
const { openPaywall } = usePaywall()

// ─── Local State ──────────────────────────────────────────────────────────────
const isLoading = ref(true)
const isRefreshingActivity = ref(false)
const recentLogs = ref([])
const waNumber = ref('')
const isWaSaved = ref(false)
const isHistoryModalOpen = ref(false)
const selectedHistoryCourseId = ref('counting_101')

const openModuleHistory = (courseId) => {
  selectedHistoryCourseId.value = courseId || 'counting_101'
  isHistoryModalOpen.value = true
}

const getCourseAttemptCount = (courseId) => {
  return (userStore.exerciseHistory || []).filter(h => h.courseId === courseId).length
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
const fetchDashboardData = async () => {
  if (!userStore.isAuthenticated || userStore.currentUser?.role === 'guest') {
    isLoading.value = false
    return
  }

  isLoading.value = true
  try {
    await Promise.all([
      userStore.fetchProgressFromDatabase(),
      courseStore.fetchCoursesFromApi(true)
    ])

    // Fetch progress logs for activity feed
    await fetchActivityLogs()
  } catch (e) {
    console.warn('[ParentDashboard] Error loading data:', e)
  } finally {
    isLoading.value = false
  }
}

const fetchActivityLogs = async () => {
  if (!userStore.isAuthenticated || userStore.currentUser?.role === 'guest') return
  try {
    const res = await $fetch('/api/progress/me')
    if (res?.success && Array.isArray(res.progress?.logs)) {
      recentLogs.value = res.progress.logs.slice(0, 5)
    }
  } catch (e) {
    // Silently fail — not critical
    recentLogs.value = []
  }
}

const refreshActivity = async () => {
  isRefreshingActivity.value = true
  await fetchActivityLogs()
  isRefreshingActivity.value = false
}

onMounted(async () => {
  // Load WA number from localStorage
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('parent_wa_number')
      if (saved) waNumber.value = saved
    } catch (e) {}
  }

  await fetchDashboardData()
})

// ─── Computed Metrics ─────────────────────────────────────────────────────────

/** Total completed lessons across all courses */
const totalCompletedLessons = computed(() => {
  const all = userStore.completedLessonsByCourse || {}
  return Object.values(all).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
})

/** Courses that have actually been attempted or completed by the child */
const attemptedCourses = computed(() => {
  return (courseStore.catalogRegistry || []).filter(course => {
    const hasCompletedLessons = (userStore.completedLessonsByCourse?.[course.id] || []).length > 0
    const hasCompletedCheckpoints = (userStore.completedCheckpointsByCourse?.[course.id] || []).length > 0
    const hasRecordedAttempts = (userStore.exerciseHistory || []).some(h => h.courseId === course.id)
    return hasCompletedLessons || hasCompletedCheckpoints || hasRecordedAttempts
  })
})

/** Number of distinct courses with at least 1 completed lesson or attempt */
const exploredCoursesCount = computed(() => {
  return attemptedCourses.value.length
})

// ─── Module Progress Helpers ──────────────────────────────────────────────────

const getCompletedLessonsForCourse = (courseId) => {
  return (userStore.completedLessonsByCourse?.[courseId] || []).length
}

const getModuleBarWidth = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count === 0) return 0
  if (count >= 10) return 100
  // Approximate: show progress relative to 10 lessons as reasonable max
  return Math.min(100, Math.round((count / 10) * 100))
}

const getModuleCardClass = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count >= 5) return 'bg-emerald-50 border-emerald-200'
  if (count >= 1) return 'bg-amber-50 border-amber-200'
  return 'bg-slate-50 border-slate-200'
}

const getModuleBadgeClass = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count >= 5) return 'bg-emerald-100 text-emerald-800'
  if (count >= 1) return 'bg-amber-100 text-amber-800'
  return 'bg-slate-200 text-slate-500'
}

const getModuleBarClass = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count >= 5) return 'bg-emerald-500'
  if (count >= 1) return 'bg-amber-400'
  return 'bg-slate-300'
}

const getModuleTextClass = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count >= 5) return 'text-emerald-700'
  if (count >= 1) return 'text-amber-700'
  return 'text-slate-400'
}

const getModuleStatusLabel = (courseId) => {
  const count = getCompletedLessonsForCourse(courseId)
  if (count >= 5) return '✅ Aktif'
  if (count >= 1) return '🟡 Dimulai'
  return '⬜ Belum'
}

// ─── Weakness Matrix (PRO - real data) ───────────────────────────────────────

const MODULE_ADVICE = {
  math: 'Coba gunakan benda fisik di rumah untuk berlatih berhitung bersama.',
  science: 'Ajak anak mengamati hewan atau tanaman di sekitar rumah.',
  indonesian: 'Bacakan buku cerita pendek tiap malam untuk melatih kosakata.',
  art: 'Latih kreativitas anak dengan menggambar bentuk sederhana bersama.',
}

const weakestModules = computed(() => {
  if (!userStore.isPro) return []
  const catalog = courseStore.catalogRegistry
  if (!catalog.length) return []

  return catalog
    .map(c => ({
      id: c.id,
      title: c.title,
      icon: c.icon || '📖',
      category: c.category || 'math',
      completedCount: getCompletedLessonsForCourse(c.id),
      advice: MODULE_ADVICE[c.category] || 'Dampingi anak untuk memulai petualangan di modul ini.'
    }))
    .filter(m => m.completedCount < 5) // Only show modules not yet "active"
    .sort((a, b) => a.completedCount - b.completedCount) // Lowest first
    .slice(0, 3)
})

// ─── Activity Log Formatters ──────────────────────────────────────────────────

const getCourseTitle = (courseId) => {
  const course = courseStore.catalogRegistry.find(c => c.id === courseId)
  return course?.title || courseId
}

const formatActivityLabel = (log) => {
  const courseTitle = getCourseTitle(log.courseId)
  if (log.status === 'checkpoint_completed') {
    return `👑 Checkpoint selesai di "${courseTitle}"`
  }
  return `✅ Pelajaran selesai di "${courseTitle}"`
}

const formatActivityDate = (isoDate) => {
  if (!isoDate) return ''
  try {
    const date = new Date(isoDate)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000 / 60) // minutes ago

    if (diff < 1) return 'Baru saja'
    if (diff < 60) return `${diff} menit lalu`
    if (diff < 1440) return `${Math.floor(diff / 60)} jam lalu`
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

// ─── WA Save ─────────────────────────────────────────────────────────────────

const handleSaveWa = () => {
  if (import.meta.client) {
    try {
      localStorage.setItem('parent_wa_number', waNumber.value)
    } catch (e) {}
  }
  isWaSaved.value = true
  setTimeout(() => { isWaSaved.value = false }, 2500)
}

// ─── Paywall Actions ──────────────────────────────────────────────────────────

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

// ─── SEO ─────────────────────────────────────────────────────────────────────
useHead({
  title: 'Dashboard Orang Tua | CountingDuo',
  meta: [
    { name: 'description', content: 'Pantau perkembangan belajar anak Anda secara real-time — XP, streak, modul yang dikuasai, dan rekomendasi belajar.' }
  ]
})
</script>
