<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Main Top Navigation Bar -->
    <HeaderNav />

    <!-- Catalog Dashboard Main Container -->
    <main class="max-w-5xl mx-auto w-full px-3.5 sm:px-4 py-4 sm:py-8 flex-1 space-y-4 sm:space-y-6 pb-28 sm:pb-12">
      
      <!-- Hero Welcome Banner (Optimized for Mobile & Desktop) -->
      <div class="bg-indigo-600 rounded-2xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6 animate-pop">
        <!-- Banner Text -->
        <div class="space-y-1.5 sm:space-y-2.5 z-10 max-w-xl">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/15 backdrop-blur-md rounded-full text-[11px] sm:text-xs font-heading font-extrabold text-amber-300 border border-white/20">
            <span>🚀 Modul Interaktif Siswa</span>
          </div>
          <h1 class="font-heading text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Pilih Petualangan Belajarmu! ✨
          </h1>
          <p class="text-indigo-100 text-xs sm:text-sm font-body leading-relaxed max-w-lg hidden sm:block">
            Katalog modul pembelajaran beranimasi & latihan soal interaktif untuk mengasah kecerdasan anak.
          </p>
        </div>

        <!-- User Stats Quick View (Compact on Mobile) -->
        <ClientOnly>
          <div class="z-10 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 w-full md:w-auto shrink-0 flex items-center justify-between gap-3">
            <div class="flex items-center gap-2 sm:gap-3">
              <span class="text-xl sm:text-3xl p-1 sm:p-1.5 bg-white/20 rounded-lg sm:rounded-xl shrink-0">{{ userStore.userAvatar }}</span>
              <div>
                <p class="text-xs font-heading font-black text-amber-300">Level {{ userStore.userLevel }}</p>
                <p class="text-[10px] sm:text-[11px] text-white/80 font-heading font-semibold">{{ userStore.xp }} XP Terkumpul</p>
              </div>
            </div>
            <button 
              @click="resetAllProgress"
              class="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/15 hover:bg-rose-600 hover:border-rose-400 border border-white/20 rounded-lg sm:rounded-xl font-heading font-bold text-[10px] sm:text-[11px] text-white transition-colors cursor-pointer shrink-0"
              title="Reset progress pengerjaan modul (0 XP)"
            >
              🔄 Reset XP
            </button>
          </div>
          <template #fallback>
            <div class="z-10 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 w-full md:w-auto shrink-0 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xl sm:text-3xl p-1 bg-white/20 rounded-lg shrink-0">🦉</span>
                <div>
                  <p class="text-xs font-heading font-black text-amber-300">Level 1</p>
                  <p class="text-[10px] text-white/80 font-heading font-semibold">0 XP</p>
                </div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Catalog Controls & Filters -->
      <div class="space-y-4 sm:space-y-6">
        <div class="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-slate-200 shadow-sm space-y-3 sm:space-y-4">
          <!-- Top Row: Title, Counter & View Switcher -->
          <div class="flex items-center justify-between gap-2">
            <!-- Title & Count -->
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
              <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg sm:text-2xl shrink-0 shadow-2xs">
                📚
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h2 class="font-heading text-base sm:text-2xl font-black text-slate-800 tracking-tight truncate">
                    Modul Belajar
                  </h2>
                  <span class="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px] sm:text-xs font-heading font-black">
                    {{ filteredCourses.length }} Modul
                  </span>
                </div>
                <p class="text-[11px] sm:text-xs font-heading font-medium text-slate-400 hidden sm:block">
                  Pilih materi kuis interaktif sesuai minat & jenjang belajar anak.
                </p>
              </div>
            </div>

            <!-- View Switcher (Carousel / Grid) -->
            <div class="p-1 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center gap-1 border border-slate-200 text-xs font-heading font-bold shrink-0">
              <button 
                @click="viewMode = 'carousel'"
                type="button"
                class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1"
                :class="viewMode === 'carousel' ? 'bg-duo-green text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'"
                title="Tampilan Geser Kartu"
              >
                <span>🎠</span>
                <span class="text-[11px] sm:text-xs">Geser</span>
              </button>
              <button 
                @click="viewMode = 'grid'"
                type="button"
                class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1"
                :class="viewMode === 'grid' ? 'bg-duo-blue text-white shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'"
                title="Tampilan Daftar Kartu"
              >
                <span>📄</span>
                <span class="text-[11px] sm:text-xs">Daftar</span>
              </button>
            </div>
          </div>

          <!-- Middle Row: Tier Filter Segment (Semua / Gratis / Pro) -->
          <div class="grid grid-cols-3 p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 text-xs font-heading font-bold w-full">
            <button 
              @click="activeTier = 'all'"
              type="button"
              class="py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl transition-all cursor-pointer text-center text-[11px] sm:text-xs truncate"
              :class="activeTier === 'all' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'"
            >
              Semua Paket
            </button>
            <button 
              @click="activeTier = 'free'"
              type="button"
              class="py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl transition-all cursor-pointer text-center text-[11px] sm:text-xs flex items-center justify-center gap-1 truncate"
              :class="activeTier === 'free' ? 'bg-emerald-500 text-white shadow-xs font-black' : 'text-slate-600 hover:text-emerald-700'"
            >
              <span>🐣</span>
              <span>Gratis</span>
            </button>
            <button 
              @click="activeTier = 'pro'"
              type="button"
              class="py-1.5 sm:py-2 px-1 sm:px-3 rounded-lg sm:rounded-xl transition-all cursor-pointer text-center text-[11px] sm:text-xs flex items-center justify-center gap-1 truncate"
              :class="activeTier === 'pro' ? 'bg-amber-400 text-amber-950 shadow-xs font-black' : 'text-slate-600 hover:text-amber-700'"
            >
              <span>👑</span>
              <span>Pro</span>
            </button>
          </div>

          <!-- Bottom Row: Category Filter Tabs -->
          <div class="pt-2 sm:pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeCategory = cat.id"
              type="button"
              class="px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl font-heading font-bold text-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
              :class="activeCategory === cat.id ? 'bg-slate-800 text-white font-black shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Empty Filter State (When filters return 0) -->
        <div v-if="filteredCourses.length === 0" class="text-center py-14 px-6 bg-white rounded-3xl border-2 border-slate-200 space-y-4 shadow-sm animate-pop">
          <div class="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-amber-200">
            🔍
          </div>
          <div class="space-y-1 max-w-md mx-auto font-heading">
            <h3 class="text-xl font-black text-slate-800">Tidak Ada Modul Ditemukan</h3>
            <p class="text-slate-500 text-xs leading-relaxed">
              Tidak ada modul yang sesuai dengan kombinasi filter paket 
              <strong class="text-slate-700">({{ activeTier === 'all' ? 'Semua Paket' : activeTier === 'pro' ? '👑 Pro' : '🐣 Gratis' }})</strong> 
              dan kategori yang dipilih.
            </p>
          </div>
          <button 
            @click="resetFilters" 
            type="button"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            🔄 Reset Semua Filter
          </button>
        </div>

        <div v-else class="space-y-8 sm:space-y-12">
          <!-- Multi-Row Auto Loop Carousel for Desktop & Touch Swipe for Mobile -->
          <div v-if="viewMode === 'carousel'" class="space-y-4 sm:space-y-12">
            <!-- MOBILE VIEW: Natural Touch Swipe Gallery (sm:hidden) -->
            <div class="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-none no-scrollbar flex gap-3.5 pb-4">
              <div 
                v-for="item in filteredCourses" 
                :key="`m-carousel-${item.id}`"
                class="snap-center shrink-0 w-[84vw] max-w-[320px] bg-white rounded-3xl border-3 p-4 shadow-md flex flex-col justify-between"
                :class="[getCardBorderClass(item.themeColor)]"
              >
                <div class="space-y-3">
                  <!-- Header: Icon & Badges -->
                  <div class="flex items-start justify-between gap-2">
                    <div 
                      class="w-12 h-12 rounded-2xl flex items-center justify-center font-heading text-2xl font-bold shrink-0 shadow-2xs"
                      :class="getIconBgClass(item.themeColor)"
                    >
                      {{ item.icon }}
                    </div>

                    <div class="flex flex-col items-end gap-1">
                      <span 
                        v-if="item.isPro"
                        class="px-2.5 py-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 rounded-full font-heading font-black text-[11px] shadow-xs border border-amber-300 flex items-center gap-1"
                      >
                        <span>👑</span>
                        <span>PRO</span>
                      </span>
                      <span 
                        v-else
                        class="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-[11px] shadow-2xs border border-emerald-300 flex items-center gap-1"
                      >
                        <span>🐣</span>
                        <span>GRATIS</span>
                      </span>
                      <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-heading font-extrabold text-[10px]">
                        🎯 {{ item.target_audience }}
                      </span>
                    </div>
                  </div>

                  <!-- Title & Description -->
                  <div class="space-y-1">
                    <h3 class="font-heading text-lg font-black text-slate-800 line-clamp-1">
                      {{ item.title }}
                    </h3>
                    <p class="text-xs text-slate-500 font-body line-clamp-2 leading-relaxed">
                      {{ item.description }}
                    </p>
                  </div>

                  <!-- Keterangan Akses Tier -->
                  <div 
                    v-if="item.isPro" 
                    class="p-2 rounded-xl border flex items-center gap-2 text-xs font-heading"
                    :class="userStore.isPro 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300/80 text-amber-950'"
                  >
                    <span class="text-base shrink-0">{{ userStore.isPro ? '✨' : '🔒' }}</span>
                    <div class="flex-1 leading-tight">
                      <p class="font-extrabold text-[11px]" :class="userStore.isPro ? 'text-emerald-800' : 'text-amber-900'">
                        {{ userStore.isPro ? 'Akses Pro Anda Aktif' : 'Modul Khusus QuizCerdas Pro' }}
                      </p>
                      <p class="text-[10px] opacity-80" :class="userStore.isPro ? 'text-emerald-700' : 'text-amber-800'">
                        {{ userStore.isPro ? 'Bebas akses seluruh unit' : 'Buka dengan Pro Rp 99.000/thn' }}
                      </p>
                    </div>
                  </div>
                  <div 
                    v-else 
                    class="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-heading"
                  >
                    <span class="text-base shrink-0">🎁</span>
                    <div class="flex-1 leading-tight">
                      <p class="font-extrabold text-emerald-900 text-[11px]">Modul Pembelajaran Gratis</p>
                      <p class="text-[10px] text-emerald-700 opacity-80">Terbuka untuk semua siswa</p>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                    <span>{{ getCourseStats(item).units }} Unit • {{ getCourseStats(item).lessons }} Pelajaran</span>
                    <span class="text-duo-green-dark font-extrabold">{{ getCourseStats(item).progress }}%</span>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="pt-3">
                  <button 
                    @click="selectAndOpenCourse(item.id)" 
                    class="w-full py-3 text-center text-sm font-heading font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer rounded-xl active:scale-95 transition-transform"
                    :class="item.isPro && !userStore.isPro ? 'duo-btn-yellow' : getButtonClass(item.themeColor)"
                  >
                    <span v-if="item.isPro && !userStore.isPro">👑 Buka Pro (Rp 99.000)</span>
                    <span v-else-if="item.isPro && userStore.isPro">🚀 Buka Belajar (Pro)</span>
                    <span v-else>🚀 Mulai Belajar</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- DESKTOP VIEW: Multi-Row Auto Loop Carousel (hidden sm:block) -->
            <div class="hidden sm:block space-y-12 relative group/carousel">
              <!-- Left Scroll Arrow Button -->
              <button 
                @click="scrollRows('left')"
                class="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all opacity-0 group-hover/carousel:opacity-100 hidden sm:flex cursor-pointer active:scale-95"
                aria-label="Scroll Kiri"
              >
                <span class="text-2xl font-bold">←</span>
              </button>

              <div 
                v-for="row in 2" 
                :key="row"
                :ref="el => rowRefs[row - 1] = el"
                class="relative overflow-hidden scroll-smooth"
              >
                <div 
                  class="flex gap-6 animate-scroll hover:[animation-play-state:paused]"
                  :class="row === 2 ? 'direction-reverse' : ''"
                >
                  <!-- Duplicate items for seamless loop -->
                  <div 
                    v-for="item in [...filteredCourses, ...filteredCourses, ...filteredCourses]" 
                    :key="`${row}-${item.id}-${Math.random()}`"
                    class="bg-white rounded-3xl border-4 p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative overflow-hidden shrink-0 w-[85vw] sm:w-[400px]"
                    :class="[getCardBorderClass(item.themeColor)]"
                  >
                    <div class="space-y-4">
                      <!-- Top Banner & Badge -->
                      <div class="flex items-start justify-between gap-2">
                        <div 
                          class="w-16 h-16 rounded-2xl flex items-center justify-center font-heading text-3xl font-bold group-hover:scale-110 transition-transform"
                          :class="getIconBgClass(item.themeColor)"
                        >
                          {{ item.icon }}
                        </div>

                        <div class="flex flex-col items-end gap-1.5">
                          <!-- TIER BADGE -->
                          <span 
                            v-if="item.isPro"
                            class="px-3 py-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 rounded-full font-heading font-black text-xs shadow-xs border border-amber-300 flex items-center gap-1.5"
                          >
                            <span>👑</span>
                            <span>QUIZCERDAS PRO</span>
                          </span>
                          <span 
                            v-else
                            class="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-xs shadow-2xs border border-emerald-300 flex items-center gap-1.5"
                          >
                            <span>🐣</span>
                            <span>AKSES GRATIS</span>
                          </span>

                          <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md font-heading font-extrabold text-[10px]">
                            🎯 {{ item.target_audience }}
                          </span>
                        </div>
                      </div>

                      <!-- Title & Description -->
                      <div class="space-y-1.5">
                        <h3 class="font-heading text-2xl font-black text-slate-800 transition-colors">
                          {{ item.title }}
                        </h3>
                        <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed line-clamp-2">
                          {{ item.description }}
                        </p>
                      </div>

                      <!-- Keterangan Akses Tier (Free vs Pro) -->
                      <div 
                        v-if="item.isPro" 
                        class="p-2.5 rounded-2xl border flex items-center gap-2.5 text-xs font-heading"
                        :class="userStore.isPro 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                          : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300/80 text-amber-950'"
                      >
                        <span class="text-lg shrink-0">{{ userStore.isPro ? '✨' : '🔒' }}</span>
                        <div class="flex-1 leading-tight">
                          <p class="font-extrabold text-[11px]" :class="userStore.isPro ? 'text-emerald-800' : 'text-amber-900'">
                            {{ userStore.isPro ? 'Akses Pro Anda Aktif' : 'Modul Khusus QuizCerdas Pro' }}
                          </p>
                          <p class="text-[10px] opacity-80" :class="userStore.isPro ? 'text-emerald-700' : 'text-amber-800'">
                            {{ userStore.isPro ? 'Bebas akses seluruh unit & latihan soal' : 'Langganan Rp 99.000/thn untuk membuka semua materi' }}
                          </p>
                        </div>
                      </div>
                      <div 
                        v-else 
                        class="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 text-xs font-heading"
                      >
                        <span class="text-lg shrink-0">🎁</span>
                        <div class="flex-1 leading-tight">
                          <p class="font-extrabold text-emerald-900 text-[11px]">Modul Pembelajaran Gratis</p>
                          <p class="text-[10px] text-emerald-700 opacity-80">Dapat diakses langsung oleh semua akun siswa</p>
                        </div>
                      </div>

                      <!-- Course Metadata Stats -->
                      <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                        <span>
                          {{ getCourseStats(item).units }} Unit • {{ getCourseStats(item).lessons }} Pelajaran
                        </span>

                        <span class="text-duo-green-dark font-extrabold">
                          {{ getCourseStats(item).progress }}% Selesai
                        </span>
                      </div>
                    </div>

                    <!-- Action Button -->
                    <div class="pt-4">
                      <button 
                        @click="selectAndOpenCourse(item.id)" 
                        class="w-full py-3.5 text-center text-sm sm:text-base font-heading font-extrabold flex items-center justify-center gap-2 shadow-lg group-hover:scale-[1.02] transition-transform cursor-pointer rounded-2xl"
                        :class="item.isPro && !userStore.isPro ? 'duo-btn-yellow' : getButtonClass(item.themeColor)"
                      >
                        <span v-if="item.isPro && !userStore.isPro">👑 Buka dengan Pro (Rp 99.000)</span>
                        <span v-else-if="item.isPro && userStore.isPro">🚀 Buka Belajar (Akses Pro)</span>
                        <span v-else>🚀 Mulai Belajar (Gratis)</span>
                        <span class="text-lg">➔</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Scroll Arrow Button -->
              <button 
                @click="scrollRows('right')"
                class="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all opacity-0 group-hover/carousel:opacity-100 hidden sm:flex cursor-pointer active:scale-95"
                aria-label="Scroll Kanan"
              >
                <span class="text-2xl font-bold">→</span>
              </button>
            </div>
          </div>

          <!-- Standard Grid Mode (Mobile & Desktop) -->
          <div 
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            <div 
              v-for="item in filteredCourses" 
              :key="item.id"
              class="bg-white rounded-3xl border-3 sm:border-4 p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative overflow-hidden animate-pop"
              :class="[getCardBorderClass(item.themeColor)]"
            >
              <div class="space-y-3 sm:space-y-4">
                <!-- Top Banner & Badge -->
                <div class="flex items-start justify-between gap-2">
                  <div 
                    class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-heading text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform shrink-0 shadow-2xs"
                    :class="getIconBgClass(item.themeColor)"
                  >
                    {{ item.icon }}
                  </div>

                  <div class="flex flex-col items-end gap-1">
                    <!-- TIER BADGE -->
                    <span 
                      v-if="item.isPro"
                      class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 rounded-full font-heading font-black text-[11px] sm:text-xs shadow-xs border border-amber-300 flex items-center gap-1.5"
                    >
                      <span>👑</span>
                      <span>QUIZCERDAS PRO</span>
                    </span>
                    <span 
                      v-else
                      class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-100 text-emerald-900 rounded-full font-heading font-black text-[11px] sm:text-xs shadow-2xs border border-emerald-300 flex items-center gap-1.5"
                    >
                      <span>🐣</span>
                      <span>AKSES GRATIS</span>
                    </span>

                    <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-heading font-extrabold text-[10px]">
                      🎯 {{ item.target_audience }}
                    </span>
                  </div>
                </div>

                <!-- Title & Description -->
                <div class="space-y-1 sm:space-y-1.5">
                  <h3 class="font-heading text-lg sm:text-2xl font-black text-slate-800 transition-colors leading-snug">
                    {{ item.title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>

                <!-- Keterangan Akses Tier (Free vs Pro) -->
                <div 
                  v-if="item.isPro" 
                  class="p-2.5 rounded-xl sm:rounded-2xl border flex items-center gap-2 text-xs font-heading"
                  :class="userStore.isPro 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300/80 text-amber-950'"
                >
                  <span class="text-base shrink-0">{{ userStore.isPro ? '✨' : '🔒' }}</span>
                  <div class="flex-1 leading-tight">
                    <p class="font-extrabold text-[11px]" :class="userStore.isPro ? 'text-emerald-800' : 'text-amber-900'">
                      {{ userStore.isPro ? 'Akses Pro Anda Aktif' : 'Modul Khusus QuizCerdas Pro' }}
                    </p>
                    <p class="text-[10px] opacity-80" :class="userStore.isPro ? 'text-emerald-700' : 'text-amber-800'">
                      {{ userStore.isPro ? 'Bebas akses seluruh unit & latihan soal' : 'Langganan Rp 99.000/thn untuk membuka semua materi' }}
                    </p>
                  </div>
                </div>
                <div 
                  v-else 
                  class="p-2.5 rounded-xl sm:rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-heading"
                >
                  <span class="text-base shrink-0">🎁</span>
                  <div class="flex-1 leading-tight">
                    <p class="font-extrabold text-emerald-900 text-[11px]">Modul Pembelajaran Gratis</p>
                    <p class="text-[10px] text-emerald-700 opacity-80">Dapat diakses langsung oleh semua akun siswa</p>
                  </div>
                </div>

                <!-- Course Metadata Stats -->
                <div class="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                  <span>
                    {{ getCourseStats(item).units }} Unit • {{ getCourseStats(item).lessons }} Pelajaran
                  </span>
                  <span class="text-duo-green-dark font-extrabold">
                    {{ getCourseStats(item).progress }}% Progress Selesai
                  </span>
                </div>
              </div>

              <!-- Action Button -->
              <div class="pt-3 sm:pt-4">
                <button 
                  @click="selectAndOpenCourse(item.id)" 
                  class="w-full py-3 sm:py-3.5 text-center text-sm sm:text-base font-heading font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:scale-[1.02] transition-all cursor-pointer rounded-xl sm:rounded-2xl"
                  :class="item.isPro && !userStore.isPro ? 'duo-btn-yellow' : getButtonClass(item.themeColor)"
                >
                  <span v-if="item.isPro && !userStore.isPro">👑 Buka dengan Pro (Rp 99.000)</span>
                  <span v-else-if="item.isPro && userStore.isPro">🚀 Buka Belajar (Akses Pro)</span>
                  <span v-else>🚀 Mulai Belajar (Gratis)</span>
                  <span class="text-lg">➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- App Footer -->
    <footer class="bg-white border-t border-duo-gray-100 py-6 text-center text-xs font-heading text-slate-400">
      <div class="max-w-5xl mx-auto px-4 space-y-1">
        <p>Aplikasi Katalog & Pembelajaran Interaktif SD Bergaya Duolingo • Nuxt 3 & PostgreSQL</p>
        <p>Berdasarkan Buku Materi: <em>Counting.pdf by Salma Gull</em></p>
      </div>
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

const activeCategory = ref('all')
const activeTier = ref('all') // 'all' | 'free' | 'pro'
const viewMode = ref('grid')
const rowRefs = ref([])

const resetFilters = () => {
  activeCategory.value = 'all'
  activeTier.value = 'all'
}

const scrollRows = (direction) => {
  rowRefs.value.forEach(el => {
    if (el) {
      const scrollAmount = 424
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  })
}

const categories = [
  { id: 'all', label: '⭐ Semua Modul' },
  { id: 'math', label: '🔢 Matematika' },
  { id: 'indonesian', label: '📚 Bahasa Indonesia' },
  { id: 'science', label: '🌱 Sains & Alam' },
  { id: 'art', label: '🎨 Seni & Geometri' }
]

onMounted(async () => {
  userStore.loadFromStorage()
  await courseStore.loadActiveCourse()
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    viewMode.value = 'carousel'
  } else {
    viewMode.value = 'grid'
  }
})

const filteredCourses = computed(() => {
  let list = courseStore.allCatalogCourses
  if (activeTier.value === 'free') {
    list = list.filter(c => !c.isPro)
  } else if (activeTier.value === 'pro') {
    list = list.filter(c => c.isPro)
  }
  if (activeCategory.value !== 'all') {
    list = list.filter(c => c.category === activeCategory.value)
  }
  return list
})

const selectAndOpenCourse = (courseId) => {
  const targetCourse = courseStore.catalogRegistry.find(c => c.id === courseId)
  if (targetCourse?.isPro && !userStore.isPro) {
    openPaywall({
      reason: 'unit_locked',
      title: `Buka Kursus Pro: ${targetCourse.title} 👑`,
      description: `Modul "${targetCourse.title}" merupakan materi pembelajaran eksklusif QuizCerdas Pro. Tingkatkan akun Anda untuk membuka akses penuh ke seluruh pelajaran dan latihan!`,
      featureHighlight: 'Akses Penuh Kursus Pro'
    })
    return
  }
  courseStore.selectCourse(courseId)
  navigateTo(`/course?id=${courseId}`)
}

const resetAllProgress = () => {
  userStore.resetProgress()
  if (import.meta.client) {
    window.location.reload()
  }
}

const getCourseStats = (item) => {
  if (!item.courseData) return { units: 0, lessons: 0, progress: 0 }
  const unitsCount = item.courseData.units.length
  const lessonsCount = item.courseData.units.reduce((acc, u) => acc + u.lessons.length, 0)
  
  const completedInCourse = userStore.getCompletedLessonsForCourse(item.id).length
  const progress = lessonsCount > 0 ? Math.round((completedInCourse / lessonsCount) * 100) : 0
  return { units: unitsCount, lessons: lessonsCount, progress }
}

const getCardBorderClass = (color) => {
  switch (color) {
    case 'green': return 'border-duo-green/40 hover:border-duo-green'
    case 'sky': return 'border-sky-400/40 hover:border-sky-500'
    case 'blue': return 'border-duo-blue/40 hover:border-duo-blue'
    case 'yellow': return 'border-duo-yellow/40 hover:border-duo-yellow'
    case 'red': return 'border-duo-red/40 hover:border-duo-red'
    default: return 'border-slate-200'
  }
}

const getIconBgClass = (color) => {
  switch (color) {
    case 'green': return 'bg-duo-green text-white shadow-duo-green'
    case 'sky': return 'bg-sky-500 text-white shadow-md'
    case 'blue': return 'bg-duo-blue text-white shadow-duo-blue'
    case 'yellow': return 'bg-duo-yellow text-slate-900 shadow-duo-yellow'
    case 'red': return 'bg-duo-red text-white shadow-duo-red'
    default: return 'bg-slate-500 text-white'
  }
}

const getButtonClass = (color) => {
  switch (color) {
    case 'green': return 'duo-btn-green'
    case 'sky': return 'duo-btn-blue bg-sky-500 border-sky-700 hover:bg-sky-600'
    case 'blue': return 'duo-btn-blue'
    case 'yellow': return 'duo-btn-yellow'
    case 'red': return 'duo-btn-red'
    default: return 'duo-btn-blue'
  }
}
</script>
