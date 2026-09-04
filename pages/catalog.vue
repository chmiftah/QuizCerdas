<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <!-- Main Top Navigation Bar -->
    <HeaderNav />

    <!-- Catalog Dashboard Main Container -->
    <main class="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8 safe-mobile-padding">
      
      <!-- Hero Welcome Banner -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-pop">
        <div class="space-y-3 z-10 max-w-xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider backdrop-blur-sm border border-white/20">
            <span>🐘 Terhubung Database PostgreSQL</span>
            <span>•</span>
            <span>🎓 Katalog SD & TK</span>
          </div>
          <h1 class="font-heading text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Pilih Petualangan Belajarmu! 🚀
          </h1>
          <p class="text-white/90 text-sm sm:text-base font-body leading-relaxed">
            Selamat datang di katalog pembelajaran interaktif. Seluruh modul dan bank soal kuis dimuat langsung secara realtime dari <strong class="text-amber-300">Database PostgreSQL</strong>.
          </p>
        </div>

        <!-- User Stats Pill Quick View -->
        <div class="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 space-y-2 max-w-xs w-full sm:w-auto">
          <div v-if="userStore.isLoggedIn" class="text-xs font-heading font-extrabold text-amber-200 flex items-center justify-center gap-1">
            <span>{{ userStore.userAvatar }} Halo, {{ userStore.userDisplayName }}!</span>
          </div>
          <span class="text-xs font-heading font-bold uppercase tracking-wider text-purple-200">Level Pengguna</span>
          <div class="font-heading text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
            <span>⭐ Level {{ userStore.userLevel }}</span>
          </div>
          <p class="text-[11px] font-heading font-semibold text-white/80">
            XP: {{ userStore.xp }} / Next Level: +{{ userStore.xpToNextLevel }} XP
          </p>
          <button 
            @click="resetAllProgress"
            class="w-full mt-1 px-3 py-1.5 bg-rose-500/80 hover:bg-rose-600 border border-rose-300/40 rounded-xl font-heading font-bold text-xs text-white transition-colors cursor-pointer"
          >
            🔄 Reset Total Progress (0 XP)
          </button>
        </div>

        <!-- Background Decorative Element -->
        <div class="absolute -right-12 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Catalog View Mode & Category Filter Pills -->
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>📚</span> Modul Pembelajaran Tersedia
            </h2>
            <p class="text-xs font-heading font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
              <span>Pilih pulau modul 3D atau daftar kartu ({{ filteredCourses.length }} Modul)</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </p>
          </div>

          <!-- View Mode Toggle & Category Filter Tabs -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- View Mode Switcher -->
            <div class="p-1 bg-slate-100 rounded-2xl flex items-center gap-1 border border-slate-200">
              <button 
                @click="viewMode = 'map3d'"
                class="px-3.5 py-1.5 rounded-xl font-heading font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                :class="viewMode === 'map3d' ? 'bg-duo-green text-white shadow-duo-green' : 'text-slate-600 hover:text-slate-900'"
              >
                <span>🌴 Peta 3D</span>
              </button>
              <button 
                @click="viewMode = 'grid'"
                class="px-3.5 py-1.5 rounded-xl font-heading font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                :class="viewMode === 'grid' ? 'bg-duo-blue text-white shadow-duo-blue' : 'text-slate-600 hover:text-slate-900'"
              >
                <span>📄 Daftar Kartu</span>
              </button>
            </div>

            <!-- Filter Category Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                @click="activeCategory = cat.id"
                class="px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                :class="activeCategory === cat.id ? 'bg-slate-800 text-white font-extrabold' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'"
              >
                {{ cat.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 3D WORLD MAP NAVIGATION VIEW -->
        <div v-if="viewMode === 'map3d'" class="space-y-4 animate-pop">
          <ClientOnly>
            <WorldMap3DCanvas :courses="filteredCourses" @select-course="selectAndOpenCourse" />
          </ClientOnly>
        </div>

        <!-- Empty State Container when DB has 0 courses -->
        <div v-else-if="filteredCourses.length === 0" class="text-center py-16 px-6 bg-white rounded-3xl border-4 border-dashed border-slate-300 space-y-4 shadow-sm animate-pop">
          <div class="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-4xl mx-auto border-2 border-slate-200">
            📭
          </div>
          <div class="space-y-1 max-w-md mx-auto">
            <h3 class="font-heading text-2xl font-black text-slate-800">Tabel Course Di Database Kosong</h3>
            <p class="text-slate-500 font-body text-xs sm:text-sm leading-relaxed">
              Seluruh modul pembelajaran telah Anda hapus dari tabel <code>courses</code> PostgreSQL. Aplikasi menyajikan data secara murni langsung dari database (0 modul ditemukan).
            </p>
          </div>
        </div>

        <!-- Catalog Course Cards Grid DYNAMIC -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div 
            v-for="item in filteredCourses" 
            :key="item.id"
            class="bg-white rounded-3xl border-4 p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative overflow-hidden animate-pop"
            :class="getCardBorderClass(item.themeColor)"
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

                <div class="flex flex-col items-end gap-1">
                  <span 
                    v-if="item.isReady"
                    class="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full font-heading font-extrabold text-xs shadow-2xs"
                  >
                    ✨ {{ item.target_audience }}
                  </span>
                  <span 
                    class="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-heading font-black text-[10px] shadow-2xs inline-flex items-center gap-1"
                  >
                    <span>🐘 Database PostgreSQL</span>
                  </span>
                </div>
              </div>

              <!-- Title & Description -->
              <div class="space-y-1.5">
                <h3 class="font-heading text-2xl font-black text-slate-800 transition-colors">
                  {{ item.title }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  {{ item.description }}
                </p>
              </div>

              <!-- Module Features Pills -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span 
                  v-for="(feat, idx) in item.features" 
                  :key="idx"
                  class="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-heading font-bold text-[11px] border border-slate-200"
                >
                  {{ feat }}
                </span>
              </div>

              <!-- Course Metadata Stats -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                <span v-if="item.isReady">
                  {{ getCourseStats(item).units }} Unit • {{ getCourseStats(item).lessons }} Pelajaran
                </span>
                <span v-else>
                  Materi Dalam Pengembangan
                </span>

                <span v-if="item.isReady" class="text-duo-green-dark font-extrabold">
                  {{ getCourseStats(item).progress }}% Progress Selesai
                </span>
                <span v-else class="text-slate-400 font-bold">
                  Segera Hadir
                </span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="pt-6">
              <button 
                v-if="item.isReady"
                @click="selectAndOpenCourse(item.id)" 
                class="w-full py-4 text-center text-base font-heading font-extrabold flex items-center justify-center gap-2 shadow-lg group-hover:scale-[1.02] transition-transform cursor-pointer"
                :class="getButtonClass(item.themeColor)"
              >
                <span>🚀 Buka Peta Jalur Belajar</span>
                <span class="text-xl">➔</span>
              </button>

              <button 
                v-else
                disabled
                class="w-full py-4 text-center text-base font-heading font-extrabold flex items-center justify-center gap-2 bg-slate-200 text-slate-400 rounded-2xl cursor-not-allowed"
              >
                <span>🔒 Modul Belum Tersedia</span>
              </button>
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

const userStore = useUserStore()
const courseStore = useCourseStore()

const activeCategory = ref('all')
const viewMode = ref('grid')

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
})

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') {
    return courseStore.allCatalogCourses
  }
  return courseStore.allCatalogCourses.filter(c => c.category === activeCategory.value)
})

const selectAndOpenCourse = (courseId) => {
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
