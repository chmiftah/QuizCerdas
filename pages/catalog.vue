<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Main Top Navigation Bar (Disesuaikan berdasarkan Domain & Status Pengguna) -->
    <AppTopBar v-if="userStore.isAuthenticated || isAppSubdomain" />
    <LandingHeader v-else />

    <!-- Catalog Dashboard Main Container -->
    <main class="max-w-6xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-8 flex-1 space-y-6 sm:space-y-8 pb-40 sm:pb-24">
      


      <!-- Clean Catalog Header (No Gradient, No AI Slop) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-heading font-black">
            <span>📚</span>
            <span>Katalog Pembelajaran</span>
          </div>
          <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Pilih Materi Belajar
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 font-body max-w-xl">
            Pilih modul yang sesuai dengan jenjang usia anak. Setiap materi dilengkapi petualangan interaktif dan panduan audio.
          </p>
        </div>

        <!-- Level XP Mini Pill (Clean & Functional) -->
        <ClientOnly>
          <div class="bg-white rounded-2xl p-3 border-2 border-slate-200 shadow-2xs w-full sm:w-64 shrink-0 space-y-1.5">
            <div class="flex items-center justify-between text-xs font-heading font-black text-slate-700">
              <span>🦉 Level {{ userStore.userLevel }}</span>
              <span class="text-amber-600">{{ userStore.xp % 100 }}/100 XP</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                class="bg-[#58cc02] h-full rounded-full transition-all duration-500" 
                :style="{ width: `${Math.min(100, Math.max(10, userStore.xp % 100))}%` }"
              ></div>
            </div>
          </div>
        </ClientOnly>
      </div>

      <!-- SECTION: LANJUTKAN BELAJAR (Hanya tampil jika ada modul yang sedang berjalan) -->
      <div v-if="continueCourseItem" class="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-6 shadow-sm space-y-3 animate-pop">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg sm:text-xl">▶️</span>
            <h2 class="font-heading font-black text-sm sm:text-base text-amber-950">
              Lanjutkan Belajar Terakhir
            </h2>
          </div>
          <span class="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full font-heading font-black text-[10px]">
            Sedang Berjalan
          </span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5 flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl shrink-0">{{ continueCourseItem.icon }}</span>
              <h3 class="font-heading font-black text-slate-800 text-base sm:text-lg truncate">
                {{ continueCourseItem.title }}
              </h3>
              <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-heading font-bold">
                {{ getSubjectLabel(continueCourseItem.category) }} • {{ continueCourseItem.target_audience }}
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1 max-w-md">
              <div class="flex items-center justify-between text-[11px] font-heading font-bold text-slate-600">
                <span>Progress Pembelajaran</span>
                <span class="text-duo-green font-black">{{ continueCourseItem.stats.progress }}%</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  class="bg-duo-green h-full rounded-full transition-all duration-500" 
                  :style="{ width: `${continueCourseItem.stats.progress}%` }"
                ></div>
              </div>
            </div>
          </div>

          <button 
            @click="selectAndOpenCourse(continueCourseItem.id)"
            class="px-6 py-3 duo-btn-green text-xs sm:text-sm font-heading font-extrabold whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
          >
            <span>Lanjutkan Petualangan</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      <!-- SECTION: AGE / LEVEL SELECTOR (UNTUK SIAPA?) -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">🎯</span>
            <h2 class="font-heading font-black text-sm sm:text-base text-slate-800">
              Untuk Siapa?
            </h2>
            <span class="text-xs text-slate-400 font-heading font-medium hidden sm:inline">
              Pilih jenjang anak agar materi disesuaikan
            </span>
          </div>
          <button 
            v-if="selectedGrade !== 'all'"
            @click="selectedGrade = 'all'"
            class="text-xs text-duo-blue font-heading font-bold hover:underline cursor-pointer"
          >
            Lihat Semua Jenjang
          </button>
        </div>

        <!-- Grade Selector Buttons Grid / Horizontal Scroll on Mobile -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          <button 
            v-for="grade in gradeOptions" 
            :key="grade.id"
            @click="selectedGrade = grade.id"
            type="button"
            class="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-heading font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 border-2 active:scale-95"
            :class="selectedGrade === grade.id 
              ? 'bg-duo-green text-white border-emerald-600 shadow-md scale-102' 
              : 'bg-white text-slate-700 border-slate-200 hover:border-duo-green/60 hover:bg-slate-50'"
          >
            <span>{{ grade.icon }}</span>
            <span>{{ grade.label }}</span>
            <span v-if="grade.sub" class="text-[10px] opacity-75 font-normal">({{ grade.sub }})</span>
          </button>
        </div>
      </div>

      <!-- SECTION: FILTER CONTROLS (Subject, Tier, Search, View Mode) -->
      <div ref="catalogSectionRef" class="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 scroll-mt-24">
        <!-- Top Controls: Subject Filters & Search -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <!-- Subject Visual Pills (Horizontal Scroll) -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar flex-1">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeCategory = cat.id"
              type="button"
              class="px-3 py-1.5 sm:py-2 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 border"
              :class="activeCategory === cat.id 
                ? 'bg-slate-800 text-white font-black shadow-xs border-slate-800' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'"
            >
              <span>{{ cat.icon }}</span>
              <span>{{ cat.label }}</span>
            </button>
          </div>

          <!-- Compact Search Box -->
          <div class="relative w-full lg:w-64 shrink-0">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari materi..." 
              class="w-full px-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-heading font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-duo-blue focus:bg-white transition-all"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              class="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Sub Row: Tier Filter (Semua/Gratis/Pro) & View Switcher (Kartu/Daftar) -->
        <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-heading">
          <!-- Free / Pro Tier Switcher -->
          <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 font-bold">
            <button 
              @click="activeTier = 'all'"
              type="button"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs"
              :class="activeTier === 'all' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'"
            >
              Semua Paket
            </button>
            <button 
              @click="activeTier = 'free'"
              type="button"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs flex items-center gap-1"
              :class="activeTier === 'free' ? 'bg-emerald-500 text-white shadow-xs font-black' : 'text-slate-600 hover:text-emerald-700'"
            >
              <span>🐣</span> Gratis
            </button>
            <button 
              @click="activeTier = 'pro'"
              type="button"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs flex items-center gap-1"
              :class="activeTier === 'pro' ? 'bg-amber-400 text-amber-950 shadow-xs font-black' : 'text-slate-600 hover:text-amber-700'"
            >
              <span>👑</span> Premium
            </button>
          </div>

          <!-- View Mode Toggle: Kartu & Daftar -->
          <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 font-bold">
            <button 
              @click="viewMode = 'grid'"
              type="button"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs"
              :class="viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'"
              title="Tampilan Grid Kartu Game"
            >
              <span>▦</span>
              <span>Kartu</span>
            </button>
            <button 
              @click="viewMode = 'list'"
              type="button"
              class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs"
              :class="viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'"
              title="Tampilan Daftar Ringkas"
            >
              <span>☰</span>
              <span>Daftar</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- STATE 1: LOADING SKELETON STATE                              -->
      <!-- ============================================================ -->
      <div v-if="courseStore.isLoading" class="space-y-4">
        <div class="flex items-center justify-between text-xs font-heading font-bold text-slate-400">
          <span class="animate-pulse">⏳ Sedang memuat modul petualangan belajar...</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="n in 6" :key="n" class="bg-white rounded-3xl border-2 border-slate-200 p-5 space-y-4 shadow-sm animate-pulse">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 bg-slate-200 rounded-2xl"></div>
              <div class="w-16 h-5 bg-slate-200 rounded-full"></div>
            </div>
            <div class="space-y-2">
              <div class="w-3/4 h-5 bg-slate-200 rounded-lg"></div>
              <div class="w-full h-3 bg-slate-100 rounded"></div>
              <div class="w-2/3 h-3 bg-slate-100 rounded"></div>
            </div>
            <div class="pt-3 border-t border-slate-100 space-y-2">
              <div class="w-full h-2 bg-slate-200 rounded-full"></div>
              <div class="w-full h-10 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- STATE 2: API ERROR STATE (DENGAN TOMBOL COBA LAGI)           -->
      <!-- ============================================================ -->
      <div v-else-if="courseStore.error && courseStore.catalogRegistry.length === 0" class="text-center py-16 px-6 bg-white rounded-3xl border-2 border-rose-200 space-y-4 shadow-sm animate-pop">
        <div class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-rose-200">
          😕
        </div>
        <div class="space-y-1 max-w-md mx-auto font-heading">
          <h3 class="text-xl font-black text-slate-800">Modul Belum Dapat Dimuat</h3>
          <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Sepertinya ada kendala saat mengambil data modul dari server. Tenang, mari coba muat ulang kembali.
          </p>
        </div>
        <button 
          @click="courseStore.retryFetchCourses()" 
          type="button"
          class="px-6 py-3 bg-duo-blue hover:bg-sky-600 text-white font-heading font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>🔄 Coba Lagi</span>
        </button>
      </div>

      <!-- ============================================================ -->
      <!-- STATE 3: EMPTY FILTER RESULTS STATE                          -->
      <!-- ============================================================ -->
      <div v-else-if="filteredCourses.length === 0" class="text-center py-14 px-6 bg-white rounded-3xl border-2 border-slate-200 space-y-4 shadow-sm animate-pop">
        <div class="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-amber-200">
          🦉
        </div>
        <div class="space-y-1 max-w-md mx-auto font-heading">
          <h3 class="text-xl font-black text-slate-800">Belum Ada Petualangan di Sini</h3>
          <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Coba pilih kategori atau jenjang lainnya untuk menemukan materi belajar yang seru.
          </p>
        </div>
        <button 
          @click="resetAllFilters" 
          type="button"
          class="px-5 py-2.5 bg-duo-green hover:bg-emerald-600 text-white font-heading font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>🔄 Reset Semua Filter</span>
        </button>
      </div>

      <!-- ============================================================ -->
      <!-- STATE 4: SUCCESS + DATA VIEW                                 -->
      <!-- ============================================================ -->
      <div v-else class="space-y-6">
        
        <!-- Results Summary Bar & Page Size Selector -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-heading font-bold text-slate-600">
          <span class="flex items-center gap-1.5 flex-wrap">
            <span>✨ Menampilkan</span>
            <strong class="text-slate-900 font-black">
              {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }}
              dari {{ filteredCourses.length }} Modul Belajar
            </strong>
            <span v-if="selectedGrade !== 'all'" class="text-duo-blue">• Jenjang {{ getGradeLabel(selectedGrade) }}</span>
          </span>

          <div class="flex items-center gap-3">
            <span v-if="searchQuery" class="text-slate-400 truncate max-w-[140px]">
              "{{ searchQuery }}"
            </span>

            <!-- Items per page selector -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px]">
              <span class="px-1.5 text-slate-500 font-bold">Per hal:</span>
              <button 
                v-for="size in [6, 12]" 
                :key="size"
                @click="itemsPerPage = size; currentPage = 1"
                type="button"
                class="px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer"
                :class="itemsPerPage === size ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500 hover:text-slate-900'"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------- -->
        <!-- VIEW MODE A: GRID KARTU (GAME LEVEL STYLE)                 -->
        <!-- ---------------------------------------------------------- -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div 
            v-for="item in paginatedCourses" 
            :key="`grid-${item.id}`"
            class="bg-white rounded-3xl border-3 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            :class="getCardBorderClass(item.themeColor)"
          >
            <div class="space-y-4">
              <!-- Top Row: Icon & Access Badge -->
              <div class="flex items-start justify-between gap-3">
                <div 
                  class="w-13 h-13 rounded-2xl flex items-center justify-center font-heading text-2xl font-black shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                  :class="getIconBgClass(item.themeColor)"
                >
                  {{ item.icon }}
                </div>

                <div class="flex flex-col items-end gap-1.5">
                  <span 
                    v-if="item.isPro"
                    class="px-2.5 py-0.5 bg-amber-400 text-amber-950 rounded-full font-heading font-black text-[10px] shadow-2xs border border-amber-300 flex items-center gap-1"
                  >
                    <span>👑</span>
                    <span>PREMIUM</span>
                  </span>
                  <span 
                    v-else
                    class="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-[10px] shadow-2xs border border-emerald-300 flex items-center gap-1"
                  >
                    <span>🐣</span>
                    <span>GRATIS</span>
                  </span>

                  <!-- Target Audience Badge -->
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-heading font-extrabold text-[10px] max-w-[170px] truncate text-right">
                    🎯 {{ item.target_audience }}
                  </span>
                </div>
              </div>

              <!-- Title & Description -->
              <div class="space-y-1.5">
                <span class="text-[10px] font-heading font-extrabold uppercase tracking-wider" :class="getCategoryTextClass(item.category)">
                  {{ getSubjectLabel(item.category) }}
                </span>
                <h3 class="font-heading text-base sm:text-lg font-black text-slate-800 line-clamp-1 group-hover:text-duo-green transition-colors">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-slate-500 font-body line-clamp-2 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>

              <!-- Lesson & Progress Stats -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div class="flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                  <span>{{ getCourseStats(item).lessons }} Pelajaran</span>
                  <span class="text-duo-green font-black">{{ getCourseStats(item).progress }}% Selesai</span>
                </div>
                <!-- Progress Line -->
                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    class="bg-duo-green h-full rounded-full transition-all duration-500" 
                    :style="{ width: `${getCourseStats(item).progress}%` }"
                  ></div>
                </div>
                <div class="flex items-center justify-between text-[10px] font-heading font-bold text-slate-400">
                  <span>{{ getCourseStats(item).completedLessons }} dari {{ getCourseStats(item).lessons }} tuntas</span>
                  <span class="text-amber-600 font-black">⭐ +20 XP</span>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="pt-4 border-t border-slate-100 mt-4">
              <button 
                @click="selectAndOpenCourse(item.id)" 
                class="w-full py-3 text-center text-xs sm:text-sm font-heading font-extrabold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer rounded-2xl active:scale-98"
                :class="getActionButtonClass(item)"
              >
                <span>{{ getActionButtonLabel(item) }}</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------- -->
        <!-- VIEW MODE B: DAFTAR (COMPACT LIST VIEW)                    -->
        <!-- ---------------------------------------------------------- -->
        <div v-else-if="viewMode === 'list'" class="space-y-3">
          <div 
            v-for="item in paginatedCourses" 
            :key="`list-${item.id}`"
            class="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm hover:border-duo-green transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div 
                class="w-12 h-12 rounded-2xl flex items-center justify-center font-heading text-2xl font-black shrink-0 shadow-xs"
                :class="getIconBgClass(item.themeColor)"
              >
                {{ item.icon }}
              </div>
              <div class="min-w-0 space-y-0.5">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-heading font-black text-slate-800 text-sm sm:text-base truncate">
                    {{ item.title }}
                  </h3>
                  <span 
                    class="px-2 py-0.2 rounded-full font-heading font-black text-[9px]"
                    :class="item.isPro ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'"
                  >
                    {{ item.isPro ? '👑 PRO' : '🐣 GRATIS' }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 font-heading">
                  {{ getSubjectLabel(item.category) }} • {{ item.target_audience }}
                </p>
              </div>
            </div>

            <!-- Progress & CTA -->
            <div class="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
              <div class="text-right space-y-0.5 min-w-28">
                <span class="text-xs font-heading font-black text-duo-green">{{ getCourseStats(item).progress }}% Selesai</span>
                <div class="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-duo-green h-full rounded-full" :style="{ width: `${getCourseStats(item).progress}%` }"></div>
                </div>
              </div>

              <button 
                @click="selectAndOpenCourse(item.id)" 
                class="px-5 py-2.5 rounded-xl font-heading font-extrabold text-xs whitespace-nowrap cursor-pointer shadow-xs"
                :class="getActionButtonClass(item)"
              >
                {{ getActionButtonLabel(item) }}
              </button>
            </div>
          </div>
        </div>

        <!-- ============================================================ -->
        <!-- PAGINATION CONTROLS                                          -->
        <!-- ============================================================ -->
        <div v-if="totalPages > 1" class="pt-6 pb-12 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <!-- Page Info Summary -->
          <p class="text-xs font-heading font-bold text-slate-500">
            Halaman <span class="text-slate-900 font-black">{{ currentPage }}</span> dari <span class="text-slate-900 font-black">{{ totalPages }}</span>
          </p>

          <!-- Navigation Buttons -->
          <div class="flex items-center gap-1.5 font-heading">
            <!-- Prev Button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              type="button"
              class="px-3.5 py-2 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 transition-all select-none"
              :class="currentPage === 1 
                ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-duo-green hover:text-duo-green active:scale-95 shadow-2xs cursor-pointer'"
            >
              <span>❮</span>
              <span class="hidden sm:inline">Sebelumnya</span>
            </button>

            <!-- Page Number Buttons -->
            <div class="flex items-center gap-1">
              <template v-for="(p, idx) in visiblePages" :key="idx">
                <span v-if="p === '...'" class="px-2 text-slate-400 text-xs font-bold select-none">…</span>
                <button
                  v-else
                  @click="goToPage(p)"
                  type="button"
                  class="w-9 h-9 rounded-xl border-2 font-black text-xs transition-all flex items-center justify-center active:scale-95 select-none"
                  :class="currentPage === p 
                    ? 'bg-duo-green text-white border-emerald-600 shadow-sm' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-duo-green/60 hover:bg-slate-50 shadow-2xs cursor-pointer'"
                >
                  {{ p }}
                </button>
              </template>
            </div>

            <!-- Next Button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              type="button"
              class="px-3.5 py-2 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 transition-all select-none"
              :class="currentPage === totalPages 
                ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed' 
                : 'bg-white text-slate-700 border-slate-200 hover:border-duo-green hover:text-duo-green active:scale-95 shadow-2xs cursor-pointer'"
            >
              <span class="hidden sm:inline">Berikutnya</span>
              <span>❯</span>
            </button>
          </div>
        </div>

      </div>

      <!-- GUEST CALLOUT BANNER AT BOTTOM (Clean Solid Card, No Gradient) -->
      <div v-if="!userStore.isLoggedIn" class="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
            💾
          </div>
          <div>
            <h3 class="font-heading font-black text-slate-800 text-sm sm:text-base">Simpan Progress Belajar Ananda</h3>
            <p class="text-xs text-slate-600 font-body">Daftar akun gratis sekarang agar XP, bintang prestasi, dan riwayat belajar anak tersimpan secara permanen.</p>
          </div>
        </div>
        <NuxtLink 
          to="/register" 
          class="px-6 py-3 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-xs sm:text-sm border-b-4 border-[#3b8a02] shadow-xs whitespace-nowrap shrink-0 active:scale-95 transition-all"
        >
          🚀 Buat Akun Gratis
        </NuxtLink>
      </div>

    </main>

    <!-- App Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs font-heading text-slate-400">
      <div class="max-w-5xl mx-auto px-4 space-y-1">
        <p>Pintara • Petualangan Belajar Edukatif untuk Anak Usia 4–9 Tahun</p>
        <p class="text-[11px] text-slate-400">Matematika, Sains & Dunia Hewan, Bahasa Indonesia, dan Logika Interaktif</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { usePaywall } from '~/composables/usePaywall'

// SEO Meta Tags
useSeoMeta({
  title: 'Katalog Modul Belajar Anak PAUD, TK & SD | Pintara',
  description: 'Pilihan lengkap materi belajar anak usia 4–9 tahun: Matematika, Sains & Dunia Hewan, Bahasa Indonesia, dan Logika Spasial dengan 29 variasi kuis bergambar.',
  keywords: 'katalog modul belajar anak, kurikulum paud tk sd, materi calistung anak, soal matematika kelas 1 sd, sains anak tk',
  ogTitle: 'Katalog Petualangan Belajar Anak — Pintara',
  ogDescription: 'Pilih modul belajar anak usia 4–9 tahun dengan quiz interaktif, visual bergambar, dan reward XP.',
  ogImage: 'https://pintara.id/images/og-banner.png',
  ogUrl: 'https://pintara.id/catalog',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://pintara.id/catalog' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Katalog Modul Belajar Pintara',
        'url': 'https://pintara.id/catalog',
        'description': 'Kumpulan modul pembelajaran edukatif interaktif untuk anak usia 4 hingga 9 tahun.',
        'provider': {
          '@type': 'Organization',
          'name': 'Pintara',
          'url': 'https://pintara.id'
        }
      })
    }
  ]
})

const userStore = useUserStore()
const courseStore = useCourseStore()
const { openPaywall } = usePaywall()
const { isAppSubdomain } = useAppDomain()

// Reactive filter states
const catalogSectionRef = ref(null)
const selectedGrade = ref('all')
const activeCategory = ref('all')
const activeTier = ref('all') // 'all' | 'free' | 'pro'
const viewMode = ref('grid') // 'grid' | 'list' | 'path'
const searchQuery = ref('')

// Pagination states
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Grade options (Untuk Siapa?)
const gradeOptions = [
  { id: 'all', label: 'Semua Jenjang', icon: '🌟' },
  { id: 'paud', label: 'PAUD', sub: '4–5 Thn', icon: '🧸' },
  { id: 'tk_a', label: 'TK A', sub: '5 Thn', icon: '🎒' },
  { id: 'tk_b', label: 'TK B', sub: '5–6 Thn', icon: '🎈' },
  { id: 'sd_1', label: 'SD 1', sub: '6–7 Thn', icon: '🏫' },
  { id: 'sd_2', label: 'SD 2', sub: '7–8 Thn', icon: '📚' },
  { id: 'sd_3', label: 'SD 3', sub: '8–9 Thn', icon: '🎯' }
]

// Subject categories
const categories = [
  { id: 'all', label: 'Semua Pelajaran', icon: '📚' },
  { id: 'math', label: 'Matematika', icon: '🔢' },
  { id: 'science', label: 'Sains & Alam', icon: '🌱' },
  { id: 'indonesian', label: 'Bahasa Indonesia', icon: '📖' },
  { id: 'art', label: 'Seni & Logika', icon: '🎨' }
]

// Fetch courses on SSR / Client setup
const { refresh: refreshCourses } = await useAsyncData('catalog-courses', async () => {
  await courseStore.fetchCoursesFromApi()
  return courseStore.allCatalogCourses
}, { lazy: false })

onMounted(async () => {
  userStore.loadFromStorage()
  if (!courseStore.hasLoaded) {
    await courseStore.fetchCoursesFromApi()
  }
})

// Grade Matcher Helper
const matchGrade = (courseAudience = '', gradeId) => {
  if (gradeId === 'all') return true
  const text = courseAudience.toLowerCase()

  if (gradeId === 'paud') {
    return text.includes('paud') || text.includes('4-5') || text.includes('4-6') || text.includes('4-9')
  }
  if (gradeId === 'tk_a') {
    return text.includes('tk a') || text.includes('tk') || text.includes('4-6') || text.includes('5') || text.includes('4-9')
  }
  if (gradeId === 'tk_b') {
    return text.includes('tk b') || text.includes('tk') || text.includes('5-6') || text.includes('5-7') || text.includes('4-9')
  }
  if (gradeId === 'sd_1') {
    return text.includes('sd 1') || text.includes('sd kelas 1') || text.includes('sd') || text.includes('5-7') || text.includes('4-9')
  }
  if (gradeId === 'sd_2') {
    return text.includes('sd 2') || text.includes('sd kelas 2') || text.includes('sd') || text.includes('4-9')
  }
  if (gradeId === 'sd_3') {
    return text.includes('sd 3') || text.includes('sd kelas 3') || text.includes('sd') || text.includes('4-9')
  }
  return true
}

// Filtered Courses Computed
const filteredCourses = computed(() => {
  let list = courseStore.allCatalogCourses

  // Tier filter (free/pro)
  if (activeTier.value === 'free') {
    list = list.filter(c => !c.isPro)
  } else if (activeTier.value === 'pro') {
    list = list.filter(c => c.isPro)
  }

  // Subject Category filter
  if (activeCategory.value !== 'all') {
    list = list.filter(c => c.category === activeCategory.value)
  }

  // Grade filter
  if (selectedGrade.value !== 'all') {
    list = list.filter(c => matchGrade(c.target_audience, selectedGrade.value))
  }

  // Search query filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) || 
      c.target_audience.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    )
  }

  return list
})

// Total Pages computed
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredCourses.value.length / itemsPerPage.value))
})

// Paginated Courses computed
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredCourses.value.slice(start, start + itemsPerPage.value)
})

// Visible Pages calculation with ellipsis support
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = []
  pages.push(1)
  if (current > 3) {
    pages.push('...')
  }
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (current < total - 2) {
    pages.push('...')
  }
  pages.push(total)
  return pages
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  if (import.meta.client) {
    catalogSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Reset page when any filter changes
watch([selectedGrade, activeCategory, activeTier, searchQuery, itemsPerPage], () => {
  currentPage.value = 1
})

// Continue Learning Featured Item (Course with progress > 0 and < 100)
const continueCourseItem = computed(() => {
  const all = courseStore.allCatalogCourses
  for (const c of all) {
    const stats = getCourseStats(c)
    if (stats.progress > 0 && stats.progress < 100) {
      return { ...c, stats }
    }
  }
  return null
})

// Helper methods
const getSubjectLabel = (cat) => {
  switch (cat) {
    case 'math': return 'Matematika'
    case 'science': return 'Sains & Alam'
    case 'indonesian': return 'Bahasa Indonesia'
    case 'art': return 'Seni & Logika'
    default: return 'Pelajaran'
  }
}

const getGradeLabel = (gId) => {
  const item = gradeOptions.find(g => g.id === gId)
  return item ? item.label : 'Semua'
}

const getCourseStats = (item) => {
  if (!item.courseData || !item.courseData.units) {
    return { units: 0, lessons: 0, completedLessons: 0, progress: 0 }
  }
  const unitsCount = item.courseData.units.length
  const lessonsCount = item.courseData.units.reduce((acc, u) => acc + (u.lessons?.length || 0), 0)
  
  const completedInCourse = userStore.getCompletedLessonsForCourse(item.id).length
  const progress = lessonsCount > 0 ? Math.min(100, Math.round((completedInCourse / lessonsCount) * 100)) : 0
  return { units: unitsCount, lessons: lessonsCount, completedLessons: completedInCourse, progress }
}

const resetAllFilters = () => {
  selectedGrade.value = 'all'
  activeCategory.value = 'all'
  activeTier.value = 'all'
  searchQuery.value = ''
  currentPage.value = 1
}

const selectAndOpenCourse = (courseId) => {
  const targetCourse = courseStore.catalogRegistry.find(c => c.id === courseId)
  if (targetCourse?.isPro && !userStore.isPro) {
    openPaywall({
      reason: 'unit_locked',
      title: `Buka Akses Premium: ${targetCourse.title} 👑`,
      description: `Modul "${targetCourse.title}" merupakan materi pembelajaran premium Pintara. Buka akses penuh untuk mendukung kemandirian belajar anak!`,
      featureHighlight: 'Akses Penuh Kursus Premium'
    })
    return
  }
  courseStore.selectCourse(courseId)
  navigateTo(`/course?id=${courseId}`)
}

const confirmResetProgress = () => {
  if (confirm('Apakah kamu yakin ingin mereset seluruh progress belajar dan XP kembali ke 0?')) {
    userStore.resetProgress()
    if (import.meta.client) {
      window.location.reload()
    }
  }
}

// Styling helpers
const getCardBorderClass = (color) => {
  switch (color) {
    case 'green': return 'border-emerald-200 hover:border-duo-green'
    case 'sky': return 'border-sky-200 hover:border-sky-500'
    case 'blue': return 'border-blue-200 hover:border-duo-blue'
    case 'yellow':
    case 'amber': return 'border-amber-200 hover:border-amber-500'
    case 'red': return 'border-rose-200 hover:border-rose-400'
    default: return 'border-slate-200 hover:border-slate-400'
  }
}

const getIconBgClass = (color) => {
  switch (color) {
    case 'green': return 'bg-duo-green text-white shadow-duo-green'
    case 'sky': return 'bg-sky-500 text-white shadow-md'
    case 'blue': return 'bg-duo-blue text-white shadow-duo-blue'
    case 'yellow':
    case 'amber': return 'bg-amber-500 text-white shadow-md'
    case 'red': return 'bg-rose-500 text-white shadow-md'
    default: return 'bg-slate-700 text-white'
  }
}

const getCategoryTextClass = (cat) => {
  switch (cat) {
    case 'math': return 'text-duo-green'
    case 'science': return 'text-amber-700'
    case 'indonesian': return 'text-purple-700'
    case 'art': return 'text-sky-700'
    default: return 'text-slate-500'
  }
}

const getActionButtonClass = (item) => {
  if (item.isPro && !userStore.isPro) {
    return 'duo-btn-yellow text-slate-950 font-black'
  }
  const stats = getCourseStats(item)
  if (stats.progress === 100) {
    return 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-100'
  }
  if (stats.progress > 0) {
    return 'duo-btn-blue text-white'
  }
  return 'duo-btn-green text-white'
}

const getActionButtonLabel = (item) => {
  if (item.isPro && !userStore.isPro) {
    return '👑 Buka Akses Premium'
  }
  const stats = getCourseStats(item)
  if (stats.progress === 100) {
    return '✓ Selesai (Ulangi)'
  }
  if (stats.progress > 0) {
    return `↗ Lanjutkan (${stats.progress}%)`
  }
  return '🚀 Mulai Belajar'
}
</script>
