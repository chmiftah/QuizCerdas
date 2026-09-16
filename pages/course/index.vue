<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f4f9ff] via-[#f8fafc] to-[#f0f7ff] flex flex-col font-body relative">
    <!-- Subtle Educational Doodle Watermark Background (Option 1) -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 opacity-[0.065] select-none"
      style="background-image: url('/images/patterns/doodle_pattern.svg'); background-repeat: repeat; background-size: 320px 320px;"
      aria-hidden="true"
    ></div>

    <!-- Main Game App Top Bar -->
    <AppTopBar class="relative z-40" />

    <!-- Dashboard Content Container (Widescreen 2-Column Responsive Layout) -->
    <main class="relative z-10 max-w-7xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6 flex-1 safe-mobile-padding">

      <!-- ===================================================================== -->
      <!-- STATE 1: SKELETON LOADING STATE                                      -->
      <!-- ===================================================================== -->
      <div v-if="pageState === 'LOADING'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
        <div class="lg:col-span-8 space-y-4">
          <div class="h-12 bg-white rounded-2xl border-2 border-slate-200"></div>
          <div class="h-[600px] bg-white rounded-3xl border-4 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-3">
            <div class="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-3xl animate-bounce">🗺️</div>
            <div class="h-6 w-48 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div class="lg:col-span-4 space-y-4 hidden lg:block">
          <div class="h-44 bg-white rounded-3xl border-2 border-slate-200"></div>
          <div class="h-64 bg-white rounded-3xl border-2 border-slate-200"></div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- STATE 2: COURSE NOT FOUND (Friendly 404 with Back Action)             -->
      <!-- ===================================================================== -->
      <div v-else-if="pageState === 'NOT_FOUND'" class="py-12 px-4 animate-pop">
        <div class="bg-white rounded-3xl p-8 sm:p-14 text-center border-4 border-dashed border-slate-300 space-y-6 max-w-lg mx-auto shadow-md">
          <div class="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl mx-auto shadow-sm animate-bounce-slow">
            🗺️
          </div>
          <div class="space-y-2">
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-heading font-black">
              Modul Tidak Ditemukan
            </div>
            <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Petualangan Belum Tersedia
            </h2>
            <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500 leading-relaxed max-w-sm mx-auto">
              Modul belajar yang kamu cari mungkin sudah dipindahkan atau belum dibuka dalam kurikulum.
            </p>
          </div>
          <div class="pt-2">
            <NuxtLink 
              to="/catalog" 
              class="inline-flex items-center gap-2 px-6 py-3.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm shadow-md border-b-4 border-[#3b8a02] active:scale-95 transition-all"
            >
              <span>📚 Kembali ke Katalog Petualangan</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- STATE 3: API ERROR (Friendly Error State with Retry Button)          -->
      <!-- ===================================================================== -->
      <div v-else-if="pageState === 'ERROR'" class="py-12 px-4 animate-pop">
        <div class="bg-white rounded-3xl p-8 sm:p-14 text-center border-4 border-rose-200 space-y-6 max-w-lg mx-auto shadow-md">
          <div class="w-20 h-20 rounded-3xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-4xl mx-auto shadow-sm animate-bounce-slow">
            😕
          </div>
          <div class="space-y-2">
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-rose-100 text-rose-900 border border-rose-300 rounded-full text-xs font-heading font-black">
              Gangguan Koneksi
            </div>
            <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              Petualangan Belum Bisa Dibuka
            </h2>
            <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500 leading-relaxed max-w-sm mx-auto">
              Terjadi masalah saat mengambil data jalur belajar dari server. Jangan khawatir, kamu bisa mencoba lagi!
            </p>
          </div>
          <div class="flex items-center justify-center gap-3 pt-2">
            <button 
              @click="handleRetry" 
              class="px-5 py-3 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-xs sm:text-sm shadow-md border-b-4 border-[#3b8a02] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🔄 Coba Lagi</span>
            </button>
            <NuxtLink 
              to="/catalog" 
              class="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-2xl font-heading font-black text-xs sm:text-sm shadow-2xs active:scale-95 transition-all"
            >
              <span>📚 Katalog</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- STATE 4: SUCCESS (Widescreen 2-Column Adventure Arena)                 -->
      <!-- ===================================================================== -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
        
        <!-- KOLOM UTAMA (KIRI): PETA PETUALANGAN BELAJAR (SKILL TREE) LANGSUNG DEPAN MATA -->
        <div class="lg:col-span-8 space-y-4">
          
          <!-- Compact Eyebrow Bar: Navigasi Ringkas Modul -->
          <div class="bg-white rounded-2xl border-2 border-slate-200/90 p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <NuxtLink 
                to="/catalog" 
                class="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-heading font-black text-xs transition-colors shrink-0 active:scale-95"
                title="Pilih Modul Pembelajaran Lain"
              >
                <span>←</span>
                <span class="hidden sm:inline">Katalog</span>
              </NuxtLink>
              
              <div class="flex items-center gap-2 min-w-0">
                <span class="font-heading font-black text-xs sm:text-sm text-slate-800 truncate">
                  {{ courseStore.course.title }}
                </span>
                <span v-if="isCoursePro" class="px-2 py-0.5 bg-amber-400 text-amber-950 font-heading font-black text-[10px] rounded-full shrink-0">
                  👑 PRO
                </span>
              </div>
            </div>

            <!-- Progres Mini Pill -->
            <div class="flex items-center gap-2 shrink-0">
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-heading font-black text-[11px] shadow-2xs flex items-center gap-1">
                <span>{{ completedLessonsCount }}/{{ totalLessonsCount }} Selesai</span>
                <span class="hidden sm:inline">({{ overallProgressPercent }}%)</span>
              </span>
            </div>
          </div>

          <!-- Alert Khusus Modul Pro (Hanya Tampil Jika Terkunci) -->
          <div 
            v-if="isCoursePro && !userStore.isPro" 
            class="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-4 text-slate-950 shadow-md border-2 border-amber-300 flex items-center justify-between gap-4 animate-pop"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">👑</span>
              <p class="text-xs font-heading font-black text-slate-950">
                Modul ini memerlukan akun Pintara Pro untuk akses penuh.
              </p>
            </div>
            <button 
              @click="openProPaywall"
              class="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-xl text-xs font-heading font-black shrink-0 transition-transform active:scale-95"
            >
              Buka Pro ➔
            </button>
          </div>

          <!-- CORE ADVENTURE MAP (SKILL TREE) - LANGSUNG TERLIHAT TANPA TERTUTUP BANNER -->
          <section>
            <SkillTree />
          </section>

        </div>

        <!-- KOLOM SAMPING (KANAN): WIDGET PENDAMPING BELAJAR (DESKTOP SIDEBAR) -->
        <aside class="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          
          <!-- Widget 1: Modul Overview Card -->
          <div class="bg-white rounded-3xl p-5 border-2 border-slate-200/90 shadow-sm space-y-3.5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#58cc02] text-white flex items-center justify-center text-2xl shadow-md shrink-0 border-b-2 border-emerald-700">
                {{ courseStore.course.icon || '🦉' }}
              </div>
              <div class="min-w-0">
                <span class="text-[11px] font-heading font-black text-emerald-700 uppercase tracking-wider block">
                  {{ getCategoryLabel(courseStore.course.category) }} • {{ courseStore.course.target_audience }}
                </span>
                <h3 class="font-heading font-black text-slate-800 text-sm sm:text-base truncate">
                  {{ courseStore.course.title }}
                </h3>
              </div>
            </div>

            <p class="text-xs text-slate-500 font-body leading-relaxed line-clamp-2">
              {{ courseStore.course.description }}
            </p>

            <!-- Bar Progres Modul -->
            <div class="space-y-1.5 pt-2 border-t border-slate-100">
              <div class="flex items-center justify-between text-xs font-heading font-bold text-slate-600">
                <span>Kelulusan Materi</span>
                <span class="text-emerald-600 font-black">{{ overallProgressPercent }}%</span>
              </div>
              <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  class="h-full bg-gradient-to-r from-emerald-500 to-[#58cc02] rounded-full transition-all duration-500 shadow-xs" 
                  :style="{ width: `${overallProgressPercent}%` }"
                ></div>
              </div>
            </div>

            <div class="flex items-center justify-between gap-2 pt-1">
              <button 
                v-if="overallProgressPercent >= 100 && totalLessonsCount > 0"
                @click="showCert = true"
                class="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-black text-xs rounded-xl shadow-xs border-b-2 border-amber-600 active:scale-95 transition-all"
              >
                🎓 Sertifikat
              </button>
              <button 
                v-if="completedLessonsCount > 0"
                @click="resetCurrentCourseProgress"
                class="text-xs text-slate-400 hover:text-slate-600 font-heading font-bold py-1 px-2.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reset progres materi"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          <!-- Widget 2: Mode Tamu (Ajakan Simpan Akun Ringkas) -->
          <div 
            v-if="!userStore.isAuthenticated" 
            class="bg-gradient-to-br from-amber-400 via-amber-400 to-yellow-400 rounded-3xl p-5 text-amber-950 shadow-md border-3 border-amber-300 space-y-3 relative overflow-hidden"
          >
            <div class="flex items-start gap-3 relative z-10">
              <div class="w-10 h-10 rounded-2xl bg-white text-2xl flex items-center justify-center shrink-0 shadow-sm border border-amber-200">
                💾
              </div>
              <div class="space-y-0.5">
                <h4 class="font-heading font-black text-sm text-slate-900">
                  Simpan Bintang & Pialamu!
                </h4>
                <p class="text-xs font-heading font-bold text-amber-950/80 leading-snug">
                  Kamu sedang bermain sebagai tamu. Daftar akun gratis agar kemajuan belajar tidak hilang.
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1 relative z-10">
              <NuxtLink 
                to="/register" 
                class="flex-1 text-center py-2 px-3 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-xl text-xs font-heading font-black shadow-md transition-transform active:scale-95"
              >
                🚀 Daftar Gratis
              </NuxtLink>
              <NuxtLink 
                to="/login" 
                class="py-2 px-3 bg-white/80 hover:bg-white text-slate-900 rounded-xl text-xs font-heading font-black transition-colors"
              >
                Masuk
              </NuxtLink>
            </div>
          </div>

          <!-- Widget 3: Misi Harian (Daily Quests - Disembunyikan pada Mobile View) -->
          <div class="hidden lg:block">
            <DailyQuestsCard />
          </div>

        </aside>

      </div>
    </main>

    <!-- App Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs font-heading text-slate-500 mt-12">
      <div class="max-w-4xl mx-auto px-4 space-y-1">
        <p class="font-bold">Pintara EdTech Platform • Nuxt 3 & PostgreSQL</p>
        <p class="text-slate-400">Pembelajaran Berhitung & Kuis Interaktif Anak SD & TK</p>
      </div>
    </footer>

    <!-- Printable Certificate Modal Component -->
    <CertificateModal 
      :isOpen="showCert" 
      :title="courseStore.course ? courseStore.course.title : ''"
      @close="showCert = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { usePaywall } from '~/composables/usePaywall'

const route = useRoute()
const userStore = useUserStore()
const courseStore = useCourseStore()
const { openPaywall } = usePaywall()
const showCert = ref(false)

const activeCourseId = computed(() => {
  return (route.query.id || courseStore.activeCourseId || 'course_24_types_1unit').toString()
})

// SSR Prefetching with useAsyncData
const { data: currentCourse, pending: isCourseLoading, error: courseFetchError, refresh: refreshCourse } = await useAsyncData(
  `course-page-${activeCourseId.value}`,
  async () => {
    // 1. Ensure courses catalog is loaded from API
    if (!courseStore.hasLoaded || courseStore.catalogRegistry.length === 0) {
      await courseStore.fetchCoursesFromApi()
    }
    // 2. Select and fetch the requested course
    const c = await courseStore.selectCourse(activeCourseId.value)
    if (!c) {
      throw createError({
        statusCode: 404,
        statusMessage: `Petualangan "${activeCourseId.value}" tidak ditemukan`
      })
    }
    return c
  },
  {
    watch: [activeCourseId]
  }
)

const pageState = computed(() => {
  if (isCourseLoading.value || courseStore.currentCourseStatus === 'loading') {
    return 'LOADING'
  }
  if (courseFetchError.value || courseStore.currentCourseStatus === 'error' || courseStore.currentCourseStatus === 'not_found') {
    const status = (courseFetchError.value)?.statusCode || (courseFetchError.value)?.response?.status
    if (status === 404 || courseStore.currentCourseStatus === 'not_found') {
      return 'NOT_FOUND'
    }
    return 'ERROR'
  }
  if (courseStore.course && courseStore.course.title) {
    return 'SUCCESS'
  }
  return 'LOADING'
})

const isCoursePro = computed(() => {
  const c = courseStore.catalogRegistry.find(item => item.id === activeCourseId.value) || courseStore.course
  return Boolean(c?.isPro)
})

const getCategoryLabel = (category) => {
  switch (category) {
    case 'math': return 'Matematika'
    case 'science': return 'Sains & Alam'
    case 'indonesian': return 'Bahasa Indonesia'
    case 'art': return 'Seni & Logika'
    default: return 'Pembelajaran'
  }
}

const openProPaywall = () => {
  openPaywall({
    reason: 'unit_locked',
    title: `Buka Kursus Pro: ${courseStore.course?.title || 'Modul Pro'} 👑`,
    description: 'Modul ini merupakan konten pembelajaran eksklusif Pintara Pro. Tingkatkan akun untuk membuka seluruh materi!',
    featureHighlight: 'Akses Penuh Kursus Pro'
  })
}

const handleRetry = async () => {
  await courseStore.fetchCourseById(activeCourseId.value, true)
  await refreshCourse()
}

onMounted(() => {
  userStore.loadFromStorage()
  if (isCoursePro.value && !userStore.isPro) {
    openProPaywall()
  }
})

const totalLessonsCount = computed(() => {
  if (!courseStore.units || courseStore.units.length === 0) return 0
  return courseStore.units.reduce((acc, u) => acc + (u.lessons?.length || 0), 0)
})

const completedLessonsCount = computed(() => {
  return userStore.getCompletedLessonsForCourse(activeCourseId.value).length
})

const completedCheckpointsCount = computed(() => {
  return userStore.getCompletedCheckpointsForCourse(activeCourseId.value).length
})

const overallProgressPercent = computed(() => {
  if (totalLessonsCount.value === 0) return 0
  return Math.round((completedLessonsCount.value / totalLessonsCount.value) * 100)
})

const resetCurrentCourseProgress = () => {
  userStore.resetCourseProgress(activeCourseId.value)
  if (import.meta.client) {
    window.location.reload()
  }
}

useSeoMeta({
  title: () => courseStore.course?.title ? `${courseStore.course.title} — Petualangan Belajar | Pintara` : 'Peta Petualangan Belajar | Pintara',
  description: () => courseStore.course?.description || 'Jelajahi peta petualangan belajar interaktif ramah anak di Pintara. Kuis bergambar, checkpoint seru, dan reward bintang.',
  ogTitle: () => courseStore.course?.title ? `${courseStore.course.title} — Pintara` : 'Peta Petualangan Belajar — Pintara',
  ogDescription: () => courseStore.course?.description || 'Jelajahi jalur belajar interaktif anak usia 4–9 tahun.',
  ogImage: 'https://pintara.id/images/og-banner.png',
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  link: [
    { rel: 'canonical', href: `https://pintara.id/course${activeCourseId.value ? `?id=${activeCourseId.value}` : ''}` }
  ]
}))
</script>
