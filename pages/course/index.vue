<template>
  <div class="min-h-screen bg-slate-100 flex flex-col font-body">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <!-- Dashboard Content Container -->
    <main class="max-w-4xl mx-auto w-full px-4 py-6 sm:py-8 flex-1 space-y-6 safe-mobile-padding">

      <!-- ===================================================================== -->
      <!-- STATE 1: SKELETON LOADING STATE (No 0/0 lesson or 0 biomes flash)    -->
      <!-- ===================================================================== -->
      <div v-if="pageState === 'LOADING'" class="space-y-6 animate-pulse">
        <!-- Breadcrumb & Badge Skeleton -->
        <div class="flex items-center justify-between gap-2">
          <div class="h-8 w-24 bg-slate-200 rounded-2xl"></div>
          <div class="h-8 w-44 bg-slate-200 rounded-full"></div>
        </div>

        <!-- Course Hero Banner Skeleton -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 space-y-6 shadow-sm">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-3 w-full max-w-md">
              <div class="h-6 w-36 bg-slate-200 rounded-full"></div>
              <div class="h-10 w-3/4 bg-slate-200 rounded-2xl"></div>
              <div class="h-4 w-full bg-slate-200 rounded-lg"></div>
            </div>
            <div class="w-full md:w-56 h-28 bg-slate-200 rounded-2xl"></div>
          </div>

          <!-- Quick Stats Row Skeleton -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
            <div class="h-14 bg-slate-200 rounded-2xl"></div>
            <div class="h-14 bg-slate-200 rounded-2xl"></div>
            <div class="h-14 bg-slate-200 rounded-2xl"></div>
            <div class="h-14 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>

        <!-- Adventure Map Skeleton -->
        <div class="bg-white rounded-[36px] p-10 border-4 border-dashed border-slate-200 min-h-[460px] flex flex-col items-center justify-center text-center space-y-4">
          <div class="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-3xl animate-bounce">
            🗺️
          </div>
          <div class="space-y-1.5 max-w-sm">
            <div class="h-6 w-52 bg-slate-200 rounded-full mx-auto"></div>
            <div class="h-4 w-64 bg-slate-200 rounded-full mx-auto"></div>
          </div>
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
      <!-- STATE 4: SUCCESS (Real Data Rendered With Full Game Polish)           -->
      <!-- ===================================================================== -->
      <div v-else class="space-y-6 animate-fade-in">
        
        <!-- Top Breadcrumb Navigation & Active Badge -->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <NuxtLink 
            to="/catalog" 
            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-2xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-duo-blue font-heading font-black text-xs shadow-2xs transition-all active:scale-95 shrink-0"
          >
            <span class="text-sm">←</span>
            <span>Kembali ke Katalog</span>
          </NuxtLink>
          
          <div class="flex items-center gap-2 min-w-0 max-w-[280px] sm:max-w-none">
            <span class="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full font-heading font-black text-xs flex items-center gap-1.5 shadow-2xs truncate">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
              <span class="truncate">{{ courseStore.course.title }}</span>
            </span>
            <span v-if="isCoursePro" class="px-2.5 py-0.5 bg-amber-400 text-amber-950 font-heading font-black text-[10px] rounded-full shrink-0 shadow-2xs">
              👑 PRO
            </span>
          </div>
        </div>

        <!-- Locked Pro Course Alert Banner -->
        <div 
          v-if="isCoursePro && !userStore.isPro" 
          class="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-slate-950 shadow-xl border-4 border-amber-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 animate-pop"
        >
          <div class="flex items-center gap-4 z-10">
            <div class="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shrink-0 shadow-md">
              👑
            </div>
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-950 text-amber-300 rounded-full text-[11px] font-heading font-black uppercase tracking-wider">
                <span>🔒 MODUL KHUSUS PRO</span>
              </div>
              <h4 class="font-heading text-lg sm:text-xl font-black text-slate-950 leading-snug">
                Modul Ini Hanya Dapat Diakses Oleh Akun QuizCerdas Pro!
              </h4>
              <p class="text-xs sm:text-sm font-heading font-bold text-amber-950/80">
                Tingkatkan akun sekarang (Rp 99.000/tahun) untuk membuka seluruh pelajaran dan nyawa tanpa batas.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 z-10 w-full sm:w-auto justify-end">
            <button 
              @click="openProPaywall"
              class="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-2xl text-xs sm:text-sm font-heading font-black shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              🚀 Buka dengan Pro (Rp 99.000)
            </button>
          </div>
        </div>

        <!-- Guest Explorer Mode Dialogue Banner (Encouraging & Natural) -->
        <div 
          v-if="!userStore.isAuthenticated" 
          class="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-slate-900 shadow-lg border-4 border-amber-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 animate-pop"
        >
          <div class="flex items-center gap-4 z-10">
            <div class="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shrink-0 shadow-md animate-bounce-slow">
              🧭
            </div>
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/40 rounded-full text-[11px] font-heading font-black uppercase tracking-wider text-slate-900">
                Mode Penjelajah
              </div>
              <h4 class="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug">
                Hai! Kamu Bebas Menjelajahi Peta Petualangan Ini 🗺️
              </h4>
              <p class="text-xs sm:text-sm font-heading font-bold text-slate-800">
                Progress belajar dan bintang XP akan tersimpan otomatis saat kamu mulai mengerjakan!
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 z-10 w-full sm:w-auto justify-end">
            <NuxtLink 
              to="/login" 
              class="duo-btn-blue px-4 py-2.5 text-xs sm:text-sm font-heading font-black shadow-md hover:scale-105 transition-transform text-center"
            >
              🔑 Masuk Akun
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="duo-btn-green px-4 py-2.5 text-xs sm:text-sm font-heading font-black shadow-md hover:scale-105 transition-transform text-center"
            >
              🚀 Daftar Gratis
            </NuxtLink>
          </div>

          <!-- Soft decorative background glow -->
          <div class="absolute -right-8 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        </div>

        <!-- Main Course Hero Banner (Compact so Adventure Map gets primary viewport) -->
        <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl border-4 border-emerald-400 relative overflow-hidden space-y-5 animate-pop">
          
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 z-10 relative">
            <!-- Course Title & Metadata -->
            <div class="space-y-2.5 max-w-xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-heading font-black uppercase tracking-wider backdrop-blur-md text-white border border-white/25 shadow-2xs">
                <span>{{ courseStore.course.icon || '⭐' }}</span>
                <span>{{ getCategoryLabel(courseStore.course.category) }} • {{ courseStore.course.target_audience }}</span>
              </div>
              
              <h1 class="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight drop-shadow-sm">
                {{ courseStore.course.title }}
              </h1>
              
              <p class="text-emerald-50 text-xs sm:text-sm font-body leading-relaxed max-w-lg line-clamp-2">
                {{ courseStore.course.description }}
              </p>
            </div>

            <!-- Overall Course Progress Card -->
            <div class="bg-black/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center shrink-0 space-y-2.5 w-full md:w-60 border border-white/20 shadow-inner">
              <div class="text-[11px] font-heading font-black text-amber-300 uppercase tracking-wider">
                Progres Total Modul
              </div>
              
              <!-- Real Progress Bar -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-heading font-black">
                  <span>Pelajaran</span>
                  <span>{{ completedLessonsCount }} / {{ totalLessonsCount }}</span>
                </div>
                <div class="w-full h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/25">
                  <div 
                    class="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all duration-500 shadow-sm"
                    :style="{ width: `${overallProgressPercent}%` }"
                  ></div>
                </div>
                <p class="text-[11px] font-heading font-black text-amber-300 text-right">
                  {{ overallProgressPercent }}% Selesai
                </p>
              </div>

              <!-- Certificate Button when 100% completed -->
              <button 
                v-if="overallProgressPercent >= 100 && totalLessonsCount > 0"
                @click="showCert = true"
                type="button"
                class="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 rounded-xl font-heading font-black text-xs text-amber-950 transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5 shadow-md border-b-2 border-amber-600"
              >
                <span>🎓 Lihat Sertifikat 📜</span>
              </button>

              <!-- Action Button: Reset Progress -->
              <button 
                v-if="completedLessonsCount > 0"
                @click="resetCurrentCourseProgress" 
                class="w-full py-1.5 px-3 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl font-heading font-bold text-[11px] text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                title="Reset progress untuk modul ini"
              >
                <span>🔄</span> Reset Progress
              </button>
            </div>
          </div>

          <!-- Quick Child Stats Toolbar -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5 border-t border-white/20 z-10 relative">
            <div class="bg-black/15 rounded-2xl p-2.5 flex items-center gap-2.5 border border-white/10">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-heading text-base font-black shadow-xs shrink-0">
                ⭐
              </div>
              <div class="min-w-0">
                <div class="text-[9px] font-heading font-bold text-emerald-100 uppercase truncate">Total XP</div>
                <div class="font-heading text-base font-black text-white truncate">+{{ userStore.xp }} XP</div>
              </div>
            </div>

            <div class="bg-black/15 rounded-2xl p-2.5 flex items-center gap-2.5 border border-white/10">
              <div class="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-heading text-base font-black shadow-xs shrink-0">
                ❤️
              </div>
              <div class="min-w-0">
                <div class="text-[9px] font-heading font-bold text-emerald-100 uppercase truncate">Sisa Nyawa</div>
                <div class="font-heading text-base font-black text-white truncate">{{ userStore.hearts }} / {{ userStore.maxHearts }}</div>
              </div>
            </div>

            <div class="bg-black/15 rounded-2xl p-2.5 flex items-center gap-2.5 border border-white/10">
              <div class="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-heading text-base font-black shadow-xs shrink-0">
                🔥
              </div>
              <div class="min-w-0">
                <div class="text-[9px] font-heading font-bold text-emerald-100 uppercase truncate">Streak Hari</div>
                <div class="font-heading text-base font-black text-white truncate">{{ userStore.streak }} Hari</div>
              </div>
            </div>

            <div class="bg-black/15 rounded-2xl p-2.5 flex items-center gap-2.5 border border-white/10">
              <div class="w-9 h-9 rounded-xl bg-sky-400 text-slate-900 flex items-center justify-center font-heading text-base font-black shadow-xs shrink-0">
                👑
              </div>
              <div class="min-w-0">
                <div class="text-[9px] font-heading font-bold text-emerald-100 uppercase truncate">Checkpoint</div>
                <div class="font-heading text-base font-black text-white truncate">{{ completedCheckpointsCount }} Selesai</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Spaced Repetition Review Card Prompt -->
        <div 
          v-if="userStore.spacedRepetitionQueue.length > 0" 
          class="bg-amber-50 border-4 border-duo-yellow/60 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-pop"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-duo-yellow text-slate-900 flex items-center justify-center font-heading text-2xl font-black shrink-0 shadow-duo-yellow animate-bounce">
              🧠
            </div>
            <div class="space-y-1">
              <h4 class="font-heading text-sm sm:text-base font-black text-amber-950 flex items-center gap-2">
                <span>Review Ingatan Spaced Repetition</span>
                <span class="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full text-xs font-black">
                  {{ userStore.spacedRepetitionQueue.length }} Soal
                </span>
              </h4>
              <p class="text-xs text-amber-800 font-body">
                Mengulang kuis berkala membantu ingatan matematika si kecil melekat lebih lama!
              </p>
            </div>
          </div>
          <NuxtLink to="/course/unit_1/unit1_lesson1" class="duo-btn-yellow px-5 py-2.5 text-xs font-heading font-black shrink-0 w-full sm:w-auto text-center">
            ⚡ Review Sekarang
          </NuxtLink>
        </div>

        <!-- ===================================================================== -->
        <!-- CORE HERO: LEARNING ADVENTURE MAP (SkillTree Component)              -->
        <!-- ===================================================================== -->
        <section class="pt-1">
          <SkillTree />
        </section>
      </div>
    </main>

    <!-- App Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs font-heading text-slate-500 mt-12">
      <div class="max-w-4xl mx-auto px-4 space-y-1">
        <p class="font-bold">CountingDuo EdTech Platform • Nuxt 3 & PostgreSQL</p>
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
    description: 'Modul ini merupakan konten pembelajaran eksklusif QuizCerdas Pro. Tingkatkan akun untuk membuka seluruh materi!',
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

useHead(() => ({
  title: courseStore.course?.title ? `${courseStore.course.title} | CountingDuo` : 'Peta Petualangan Belajar | CountingDuo',
  meta: [
    {
      name: 'description',
      content: courseStore.course?.description || 'Jelajahi peta petualangan belajar berhitung interaktif ramah anak di CountingDuo.'
    }
  ]
}))
</script>
