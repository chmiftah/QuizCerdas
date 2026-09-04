<template>
  <div class="min-h-screen bg-slate-100 flex flex-col font-body">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <!-- Dashboard Content Container -->
    <main class="max-w-4xl mx-auto w-full px-4 py-6 sm:py-8 flex-1 space-y-6 safe-mobile-padding">
      
      <!-- Top Breadcrumb Navigation & Active Badge -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <NuxtLink 
          to="/catalog" 
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-duo-blue font-heading font-extrabold text-xs sm:text-sm shadow-2xs transition-all hover:scale-105 active:scale-95"
        >
          <span class="text-base">←</span>
          <span>Katalog Pembelajaran</span>
        </NuxtLink>
        
        <div class="flex items-center gap-2">
          <span class="px-3.5 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full font-heading font-extrabold text-xs flex items-center gap-1.5 shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            🎯 Modul Aktif: {{ courseStore.course.title }}
          </span>
        </div>
      </div>

      <!-- Guest Explorer Mode Dialogue Banner -->
      <div 
        v-if="!userStore.isAuthenticated" 
        class="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-slate-900 shadow-lg border-4 border-amber-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 animate-pop"
      >
        <div class="flex items-center gap-4 z-10">
          <div class="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shrink-0 shadow-md animate-bounce">
            🦉
          </div>
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/40 rounded-full text-[11px] font-heading font-black uppercase tracking-wider text-slate-900">
              Mode Penjelajah
            </div>
            <h4 class="font-heading text-lg sm:text-xl font-black text-slate-900 leading-snug">
              Hai! Kamu Bebas Menjelajahi Peta Belajar Ini 🗺️
            </h4>
            <p class="text-xs sm:text-sm font-heading font-semibold text-slate-800">
              Masuk atau daftar akun gratis saat kamu siap mengerjakan soal kuis & mengumpulkan XP!
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 z-10 w-full sm:w-auto justify-end">
          <NuxtLink 
            to="/login" 
            class="duo-btn-blue px-5 py-2.5 text-xs sm:text-sm font-heading font-black shadow-md hover:scale-105 transition-transform"
          >
            🔑 Masuk Akun
          </NuxtLink>
          <NuxtLink 
            to="/register" 
            class="duo-btn-green px-5 py-2.5 text-xs sm:text-sm font-heading font-black shadow-md hover:scale-105 transition-transform"
          >
            🚀 Daftar Gratis
          </NuxtLink>
        </div>

        <!-- Decorative background shapes -->
        <div class="absolute -right-8 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <!-- Main Course Hero Banner & Stat Summary Card -->
      <div class="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-emerald-400/30 relative overflow-hidden space-y-6 animate-pop">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10 relative">
          <!-- Course Title & Description -->
          <div class="space-y-3 max-w-xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider backdrop-blur-md text-emerald-100 border border-white/20">
              <span>{{ courseStore.course.icon }}</span>
              <span>{{ courseStore.course.target_audience }}</span>
            </div>
            
            <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-shadow-sm">
              {{ courseStore.course.title }}
            </h1>
            
            <p class="text-emerald-50 text-sm sm:text-base font-body leading-relaxed max-w-lg">
              {{ courseStore.course.description }}
            </p>
          </div>

          <!-- Overall Course Progress Radial Card -->
          <div class="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/30 text-center shrink-0 space-y-3 w-full md:w-56 shadow-inner">
            <div class="text-xs font-heading font-extrabold text-amber-300 uppercase tracking-wide">
              Progres Total Modul
            </div>
            
            <!-- Progress Bar -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs font-heading font-extrabold">
                <span>Pelajaran</span>
                <span>{{ completedLessonsCount }} / {{ totalLessonsCount }}</span>
              </div>
              <div class="w-full h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div 
                  class="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-500 shadow-sm"
                  :style="{ width: `${overallProgressPercent}%` }"
                ></div>
              </div>
              <p class="text-[11px] font-heading font-bold text-white/90 text-right">
                {{ overallProgressPercent }}% Selesai
              </p>
            </div>

            <!-- Certificate Button when 100% completed -->
            <button 
              v-if="overallProgressPercent >= 100"
              @click="showCert = true"
              type="button"
              class="w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 rounded-xl font-heading font-black text-xs text-amber-950 transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5 shadow-lg border border-amber-200"
            >
              <span>🎓 Lihat & Cetak Sertifikat 📜</span>
            </button>

            <!-- Action Button: Reset Progress -->
            <button 
              @click="resetCurrentCourseProgress" 
              class="w-full py-1.5 px-3 bg-white/10 hover:bg-white/25 border border-white/30 rounded-xl font-heading font-bold text-xs text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <span>🔄</span> Reset Progress Modul
            </button>
          </div>
        </div>

        <!-- Floating Quick Stats Toolbar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20 z-10 relative">
          <div class="bg-black/15 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-xs">
            <div class="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-heading text-lg font-black shadow-xs">
              ⭐
            </div>
            <div>
              <div class="text-[10px] font-heading font-bold text-emerald-100 uppercase">Total XP</div>
              <div class="font-heading text-lg font-black text-white">+{{ userStore.xp }} XP</div>
            </div>
          </div>

          <div class="bg-black/15 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-xs">
            <div class="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-heading text-lg font-black shadow-xs">
              ❤️
            </div>
            <div>
              <div class="text-[10px] font-heading font-bold text-emerald-100 uppercase">Sisa Nyawa</div>
              <div class="font-heading text-lg font-black text-white">{{ userStore.hearts }} / {{ userStore.maxHearts }}</div>
            </div>
          </div>

          <div class="bg-black/15 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-xs">
            <div class="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-heading text-lg font-black shadow-xs">
              🔥
            </div>
            <div>
              <div class="text-[10px] font-heading font-bold text-emerald-100 uppercase">Streak Hari</div>
              <div class="font-heading text-lg font-black text-white">{{ userStore.streak }} Hari</div>
            </div>
          </div>

          <div class="bg-black/15 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-xs">
            <div class="w-10 h-10 rounded-xl bg-sky-400 text-slate-900 flex items-center justify-center font-heading text-lg font-black shadow-xs">
              👑
            </div>
            <div>
              <div class="text-[10px] font-heading font-bold text-emerald-100 uppercase">Checkpoint</div>
              <div class="font-heading text-lg font-black text-white">{{ completedCheckpointsCount }} Selesai</div>
            </div>
          </div>
        </div>

        <!-- Background Decorative Circles -->
        <div class="absolute -right-12 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-12 -top-16 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <!-- Spaced Repetition Review Card Prompt -->
      <div 
        v-if="userStore.spacedRepetitionQueue.length > 0" 
        class="bg-gradient-to-r from-amber-50 to-yellow-50 border-4 border-duo-yellow/60 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-pop"
      >
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-duo-yellow text-slate-900 flex items-center justify-center font-heading text-2xl font-black shrink-0 shadow-duo-yellow animate-bounce">
            🧠
          </div>
          <div class="space-y-1">
            <h4 class="font-heading text-base sm:text-lg font-extrabold text-amber-950 flex items-center gap-2">
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
        <NuxtLink to="/course/unit_1/unit1_lesson1" class="duo-btn-yellow px-5 py-3 text-xs font-heading font-black shrink-0 w-full sm:w-auto text-center">
          ⚡ Review Sekarang
        </NuxtLink>
      </div>

      <!-- Skill Tree Section -->
      <section class="pt-2">
        <!-- Interactive Skill Tree Node Graph -->
        <SkillTree />
      </section>
    </main>

    <!-- App Footer -->
    <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs font-heading text-slate-500 mt-12">
      <div class="max-w-4xl mx-auto px-4 space-y-1">
        <p class="font-bold">CountingDuo EdTech Platform • Nuxt 3 & PostgreSQL</p>
        <p class="text-slate-400">Pembelajaran Berhitung Interaktif SD & TK</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'

const route = useRoute()
const userStore = useUserStore()
const courseStore = useCourseStore()
const showCert = ref(false)

onMounted(async () => {
  userStore.loadFromStorage()
  await courseStore.loadActiveCourse()
  if (route.query.id) {
    courseStore.selectCourse(route.query.id)
  }
})

watch(() => route.query.id, (newId) => {
  if (newId) {
    courseStore.selectCourse(newId)
  }
})

const activeCourseId = computed(() => route.query.id || courseStore.activeCourseId || 'counting_101')

const totalLessonsCount = computed(() => {
  return courseStore.units.reduce((acc, u) => acc + u.lessons.length, 0)
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
</script>
