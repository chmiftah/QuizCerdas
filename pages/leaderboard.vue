<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white">
    <!-- Header Navigation -->
    <HeaderNav />

    <main id="main-content" class="flex-1 py-8 px-4 max-w-6xl mx-auto w-full space-y-8 safe-mobile-padding">
      <!-- LEAGUE HERO BANNER -->
      <section class="relative rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden animate-pop" :class="[leagueBgGradient]">
        <!-- Background Glow Blobs -->
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Left Banner Text -->
          <div class="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-heading font-black border border-white/30">
              <span class="text-base">{{ userStore.leagueTier.icon }}</span>
              <span>LIGA MINGGUAN • DIVISI {{ userStore.leagueTier.name.toUpperCase() }}</span>
            </div>

            <h1 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
              Papan Peringkat & Liga Mingguan 🏆
            </h1>

            <p class="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              Tingkatkan akumulasi XP mingguanmu dengan memecahkan soal kuis! Top 3 di akhir minggu akan naik tingkat ke Liga yang lebih tinggi!
            </p>

            <!-- User Quick Stats Pill -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div class="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2">
                <span class="text-xl">⚡</span>
                <div class="text-left">
                  <span class="text-[10px] uppercase font-heading font-extrabold text-white/70 block">XP Mingguan</span>
                  <span class="font-heading font-black text-lg text-amber-300">{{ userStore.weeklyXP }} XP</span>
                </div>
              </div>

              <div class="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2">
                <span class="text-xl">🏅</span>
                <div class="text-left">
                  <span class="text-[10px] uppercase font-heading font-extrabold text-white/70 block">Posisi Kamu</span>
                  <span class="font-heading font-black text-lg text-emerald-300">Peringkat #{{ currentUserRank }}</span>
                </div>
              </div>

              <div class="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2">
                <span class="text-xl">⏰</span>
                <div class="text-left">
                  <span class="text-[10px] uppercase font-heading font-extrabold text-white/70 block">Sisa Waktu</span>
                  <span class="font-heading font-black text-sm text-cyan-200">3 Hari 14 Jam</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Mascot Spotlight -->
          <div class="lg:col-span-4 flex flex-col items-center justify-center">
            <div class="relative group">
              <KikoAvatar size="xl" :showLevelBadge="true" />
            </div>
            <div class="mt-4 text-center">
              <span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-heading font-black text-white">
                {{ userStore.kikoTitle.icon }} {{ userStore.kikoTitle.title }}
              </span>
              <p class="text-[11px] text-white/80 font-body mt-1">{{ userStore.kikoTitle.subtitle }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- MAIN CONTENT GRID (LEADERBOARD TABLE + SIDEBAR) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- LEFT COLUMN: LEADERBOARD LIST (8 Cols) -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Tier Filter Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button 
              v-for="tier in tiers" 
              :key="tier.id"
              @click="selectedTier = tier.id"
              class="px-4 py-2.5 rounded-2xl font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 border-2 transition-all cursor-pointer whitespace-nowrap"
              :class="selectedTier === tier.id ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'"
            >
              <span>{{ tier.icon }}</span>
              <span>{{ tier.name }}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full" :class="selectedTier === tier.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'">
                ≥{{ tier.minXP }} XP
              </span>
            </button>
          </div>

          <!-- Leaderboard Cards Container -->
          <div class="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
            <!-- Header Legend -->
            <div class="bg-slate-100/80 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-heading font-extrabold text-slate-500">
              <span>PERINGKAT SISWA</span>
              <span>XP MINGGUAN</span>
            </div>

            <!-- Leaderboard Rows -->
            <div class="divide-y divide-slate-100">
              <div 
                v-for="(student, index) in filteredLeaderboard" 
                :key="student.id"
                class="px-5 py-4 flex items-center justify-between transition-colors hover:bg-slate-50/80 relative"
                :class="[
                  student.isUser ? 'bg-emerald-50/80 font-bold border-l-4 border-emerald-500' : '',
                  index < 3 ? 'bg-amber-50/30' : ''
                ]"
              >
                <!-- Left Info: Rank + Avatar + Name -->
                <div class="flex items-center gap-3 sm:gap-4">
                  <!-- Rank Badge -->
                  <div class="w-8 sm:w-10 text-center font-heading font-black text-base sm:text-lg flex items-center justify-center">
                    <span v-if="index === 0" class="text-2xl drop-shadow-xs">🥇</span>
                    <span v-else-if="index === 1" class="text-2xl drop-shadow-xs">🥈</span>
                    <span v-else-if="index === 2" class="text-2xl drop-shadow-xs">🥉</span>
                    <span v-else class="text-slate-400 font-bold">#{{ index + 1 }}</span>
                  </div>

                  <!-- Avatar Icon -->
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border-2 border-slate-200 flex items-center justify-center text-2xl shadow-2xs">
                    {{ student.avatar }}
                  </div>

                  <!-- Student Name & Status Tag -->
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="font-heading font-black text-sm sm:text-base text-slate-800">
                        {{ student.name }}
                      </h4>
                      <span v-if="student.isUser" class="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-heading font-black">
                        Kamu
                      </span>
                    </div>
                    <div class="flex items-center gap-2 text-[11px] text-slate-500 font-body">
                      <span>{{ student.grade }}</span>
                      <span>•</span>
                      <span class="text-amber-600 font-semibold">🔥 Streak {{ student.streak }} Hari</span>
                    </div>
                  </div>
                </div>

                <!-- Right Info: XP & Zone Badge -->
                <div class="text-right flex items-center gap-3">
                  <div class="text-right">
                    <span class="font-heading font-black text-sm sm:text-base text-slate-800 block">
                      {{ student.weeklyXP }} XP
                    </span>
                    <span 
                      v-if="index < 3" 
                      class="text-[10px] font-heading font-extrabold text-emerald-600 flex items-center justify-end gap-0.5"
                    >
                      <span>⬆ Promosi</span>
                    </span>
                    <span 
                      v-else-if="index >= 8" 
                      class="text-[10px] font-heading font-extrabold text-rose-500 flex items-center justify-end gap-0.5"
                    >
                      <span>⬇ Degradasi</span>
                    </span>
                    <span v-else class="text-[10px] font-heading font-semibold text-slate-400">
                      Zona Aman
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Promotion Footer Info Banner -->
            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-t border-emerald-100 flex items-center justify-between text-xs font-heading font-bold text-emerald-800">
              <span class="flex items-center gap-1.5">
                <span>🚀</span>
                <span>Top 3 di akhir minggu otomatis naik divisi liga berikutnya!</span>
              </span>
              <NuxtLink to="/catalog" class="duo-btn-green px-3 py-1.5 text-xs shadow-xs">
                ⚡ Cari XP Sekarang ➔
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: SIDEBAR WIDGETS (4 Cols) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Embedded Daily Quests Card -->
          <DailyQuestsCard />

          <!-- Kiko Evolution Progress Card -->
          <div class="bg-gradient-to-b from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg space-y-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div class="flex items-center gap-3 border-b border-white/20 pb-3">
              <div class="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
                🎓
              </div>
              <div>
                <h3 class="font-heading font-black text-base">Evolusi Kiko</h3>
                <p class="text-[11px] text-white/80 font-body">Kumpulkan XP untuk menaikkan Level</p>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-center text-xs font-heading font-extrabold">
                <span>Level {{ userStore.userLevel }}</span>
                <span>Level {{ userStore.userLevel + 1 }}</span>
              </div>

              <!-- XP Progress Bar -->
              <div class="bg-black/20 h-4 rounded-full p-0.5 overflow-hidden border border-white/20">
                <div 
                  class="bg-gradient-to-r from-amber-300 to-yellow-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  :style="{ width: `${Math.min(100, Math.round(((100 - userStore.xpToNextLevel) / 100) * 100))}%` }"
                ></div>
              </div>

              <p class="text-xs text-center font-heading font-bold text-amber-200">
                Butuh {{ userStore.xpToNextLevel }} XP lagi untuk naik Level!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

useSeoMeta({
  title: 'Papan Peringkat & Liga Mingguan | Counting Duo',
  description: 'Bersaing dengan teman-teman di Liga Mingguan Duolingo-style Counting Duo. Kumpulkan XP dan naik ke Liga Diamond!'
})

const selectedTier = ref('bronze')

const tiers = [
  { id: 'bronze', name: 'Bronze', icon: '🥉', minXP: 0 },
  { id: 'silver', name: 'Silver', icon: '🥈', minXP: 100 },
  { id: 'gold', name: 'Gold', icon: '🥇', minXP: 250 },
  { id: 'diamond', name: 'Diamond', icon: '💎', minXP: 400 }
]

// Mock students data combined with current user
const mockStudents = [
  { id: 'std_1', name: 'Ahmad Dani', avatar: '🦊', grade: 'Kelas 2 SD', streak: 7, weeklyXP: 380 },
  { id: 'std_2', name: 'Siti Rahma', avatar: '🦉', grade: 'Kelas 1 SD', streak: 12, weeklyXP: 310 },
  { id: 'std_3', name: 'Bimo Sakti', avatar: '🦁', grade: 'TK B', streak: 5, weeklyXP: 240 },
  { id: 'std_4', name: 'Rania Putri', avatar: '🐰', grade: 'Kelas 1 SD', streak: 3, weeklyXP: 190 },
  { id: 'std_5', name: 'Dafa Algifari', avatar: '🐻', grade: 'Kelas 3 SD', streak: 9, weeklyXP: 150 },
  { id: 'std_6', name: 'Nabila Az-Zahra', avatar: '🐱', grade: 'Kelas 2 SD', streak: 4, weeklyXP: 110 },
  { id: 'std_7', name: 'Fikri Haikal', avatar: '🐯', grade: 'TK B', streak: 2, weeklyXP: 80 },
  { id: 'std_8', name: 'Kevin Sanjaya', avatar: '🐼', grade: 'Kelas 1 SD', streak: 1, weeklyXP: 40 }
]

// Filtered and sorted leaderboard list including the current active user
const filteredLeaderboard = computed(() => {
  const userItem = {
    id: userStore.currentUser?.id || 'user_current',
    name: userStore.userDisplayName,
    avatar: userStore.userAvatar,
    grade: userStore.currentUser?.grade || 'Kelas 1 SD',
    streak: userStore.streak,
    weeklyXP: userStore.weeklyXP,
    isUser: true
  }

  const list = [...mockStudents, userItem]
  // Sort descending by weeklyXP
  list.sort((a, b) => b.weeklyXP - a.weeklyXP)
  return list
})

const currentUserRank = computed(() => {
  const index = filteredLeaderboard.value.findIndex(s => s.isUser)
  return index >= 0 ? index + 1 : 1
})

const leagueBgGradient = computed(() => {
  switch (userStore.leagueTier.name) {
    case 'Diamond': return 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700'
    case 'Gold': return 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600'
    case 'Silver': return 'bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700'
    case 'Bronze':
    default: return 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900'
  }
})
</script>
