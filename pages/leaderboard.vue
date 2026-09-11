<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-duo-green selection:text-white pb-28 sm:pb-16">
    <!-- Header Navigation -->
    <HeaderNav />

    <main id="main-content" class="flex-1 max-w-5xl mx-auto w-full px-3.5 sm:px-6 pt-3 sm:pt-6 space-y-5 safe-mobile-padding">
      <!-- 1. LEAGUE OVERVIEW CONTEXT (COMPACT, WARM & MOBILE-FIRST) -->
      <section class="bg-white rounded-3xl border-2 border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-black shadow-2xs text-white" :class="tierBadgeClass">
                <span>{{ userStore.leagueTier.icon }}</span>
                <span>Divisi {{ userStore.leagueTier.name }}</span>
              </span>
              <span class="text-xs font-heading font-bold text-slate-400">• Minggu Ini</span>
            </div>
            <h1 class="font-heading text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Papan Peringkat Belajar 🏆
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 font-body">
              Kumpulkan XP dari kuis untuk terus berkembang dan melaju ke liga berikutnya!
            </p>
          </div>

          <!-- Quick Info Badges: Countdown & Promotion note -->
          <div class="flex items-center gap-2 shrink-0 self-start sm:self-center pt-1 sm:pt-0">
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-heading font-bold text-slate-600 border border-slate-200">
              <span>⏰</span>
              <span>Sisa 3 Hari</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl text-xs font-heading font-extrabold text-emerald-700 border border-emerald-200">
              <span>🚀</span>
              <span>Top 3 Naik Liga</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. PINNED / HIGHLIGHTED "PERINGKAT KAMU" SUMMARY CARD -->
      <!-- Allows child & parents to see their rank immediately without scrolling -->
      <section class="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50/80 rounded-2xl border-2 border-emerald-200/90 p-3.5 sm:p-4 shadow-2xs">
        <div class="flex items-center justify-between gap-3">
          <!-- Left: Rank + Avatar + Name -->
          <div class="flex items-center gap-3 min-w-0">
            <!-- Rank Badge -->
            <div class="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-heading font-black flex flex-col items-center justify-center shadow-xs shrink-0">
              <span class="text-[9px] uppercase tracking-wider leading-none text-emerald-100">Rank</span>
              <span class="leading-none text-base">#{{ currentUserRank }}</span>
            </div>

            <!-- Avatar -->
            <div class="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
              {{ userStore.userAvatar }}
            </div>

            <!-- User Details -->
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <h2 class="font-heading font-black text-sm sm:text-base text-slate-800 truncate">
                  {{ userStore.userDisplayName }}
                </h2>
                <span class="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-heading font-black shrink-0">
                  Kamu
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-slate-500 font-body">
                <span>Level {{ userStore.userLevel }}</span>
                <span>•</span>
                <span class="text-amber-700 font-bold flex items-center gap-0.5">
                  <span>🔥</span> {{ userStore.streak }} Hari Rutin
                </span>
              </div>
            </div>
          </div>

          <!-- Right: XP + Encouraging status -->
          <div class="text-right shrink-0">
            <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-emerald-200 shadow-2xs">
              <span class="text-base leading-none">⭐</span>
              <span class="font-heading font-black text-sm sm:text-base text-slate-800">
                {{ userStore.weeklyXP }}
              </span>
              <span class="text-[11px] font-heading font-extrabold text-slate-500">XP</span>
            </div>
            <p class="text-[11px] font-heading font-extrabold text-emerald-700 pt-1">
              {{ currentUserRank <= 3 ? '🎉 Di Zona Naik Liga!' : '💪 Sedikit lagi ke Top 3!' }}
            </p>
          </div>
        </div>
      </section>

      <!-- 3. TIER FILTER TABS (Clean, Touch-Friendly, Horizontally Scrollable) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button 
          v-for="tier in tiers" 
          :key="tier.id"
          @click="selectedTier = tier.id"
          type="button"
          class="px-3.5 py-2 rounded-2xl font-heading font-extrabold text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          :class="selectedTier === tier.id ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'"
        >
          <span>{{ tier.icon }}</span>
          <span>{{ tier.name }}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded-full" :class="selectedTier === tier.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'">
            ≥{{ tier.minXP }} XP
          </span>
        </button>
      </div>

      <!-- Info banner when previewing other league tiers -->
      <div 
        v-if="selectedTier !== userCurrentTierId" 
        class="bg-sky-50 border border-sky-200 text-sky-900 text-xs font-heading font-bold px-3.5 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 animate-pop"
      >
        <span class="flex items-center gap-1.5">
          <span>👀</span>
          <span>Melihat Peringkat Divisi {{ tiers.find(t => t.id === selectedTier)?.name }}. Kamu aktif di Divisi {{ userStore.leagueTier.name }}.</span>
        </span>
        <button 
          @click="selectedTier = userCurrentTierId" 
          class="text-sky-700 hover:text-sky-900 underline font-black cursor-pointer self-start sm:self-auto shrink-0"
        >
          Kembali ke Divisi Saya ➔
        </button>
      </div>

      <!-- 4. MAIN CONTENT (RESPONSIVE: SINGLE COLUMN ON MOBILE, 2 COLS ON DESKTOP) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- LEFT COLUMN: LEADERBOARD LIST (8 Cols on Desktop) -->
        <div class="lg:col-span-8 space-y-4">
          <!-- Leaderboard Cards Container -->
          <div class="bg-white rounded-3xl border-2 border-slate-200/80 shadow-2xs overflow-hidden">
            <!-- Header Legend -->
            <div class="bg-slate-50/90 px-4 sm:px-5 py-2.5 border-b border-slate-200/80 flex items-center justify-between text-xs font-heading font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Peringkat Siswa</span>
              <span>XP Mingguan</span>
            </div>

            <!-- Empty State if no students -->
            <div v-if="filteredLeaderboard.length === 0" class="p-8 text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-amber-100 text-3xl mx-auto flex items-center justify-center">
                🦉
              </div>
              <h3 class="font-heading font-black text-slate-800 text-base">Belum ada ranking minggu ini</h3>
              <p class="text-xs sm:text-sm text-slate-500 font-body max-w-sm mx-auto">
                Yuk selesaikan kuis pertamamu untuk mulai mengumpulkan XP dan masuk ke papan peringkat!
              </p>
              <NuxtLink to="/catalog" class="duo-btn-green inline-flex px-4 py-2 text-xs">
                Mulai Belajar Sekarang ➔
              </NuxtLink>
            </div>

            <!-- Leaderboard List Rows -->
            <div v-else class="divide-y divide-slate-100">
              <div 
                v-for="(student, index) in filteredLeaderboard" 
                :key="student.id"
                class="px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-2.5 transition-colors relative"
                :class="[
                  student.isUser ? 'bg-emerald-50/80 font-bold border-l-4 border-emerald-500' : 'hover:bg-slate-50/80',
                  index === 0 ? 'bg-amber-50/30' : '',
                  index === 1 ? 'bg-slate-50/40' : '',
                  index === 2 ? 'bg-orange-50/25' : ''
                ]"
              >
                <!-- Left Info: Rank + Avatar + Name -->
                <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <!-- Rank Badge (Distinct Top 3 without giant podium) -->
                  <div class="w-8 sm:w-9 text-center font-heading font-black text-sm sm:text-base flex items-center justify-center shrink-0">
                    <span v-if="index === 0" class="text-2xl drop-shadow-xs" title="Juara 1">🥇</span>
                    <span v-else-if="index === 1" class="text-2xl drop-shadow-xs" title="Juara 2">🥈</span>
                    <span v-else-if="index === 2" class="text-2xl drop-shadow-xs" title="Juara 3">🥉</span>
                    <span v-else class="text-slate-400 font-extrabold">#{{ index + 1 }}</span>
                  </div>

                  <!-- Avatar Icon -->
                  <div 
                    class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-2xs shrink-0 border"
                    :class="[
                      index === 0 ? 'bg-amber-100 border-amber-200' :
                      index === 1 ? 'bg-slate-100 border-slate-300' :
                      index === 2 ? 'bg-orange-100 border-orange-200' :
                      'bg-slate-100 border-slate-200'
                    ]"
                  >
                    {{ student.avatar }}
                  </div>

                  <!-- Student Name & Status Tag -->
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <h4 class="font-heading font-black text-xs sm:text-sm text-slate-800 truncate">
                        {{ student.name }}
                      </h4>
                      <span v-if="student.isUser" class="px-2 py-0.2 bg-emerald-500 text-white rounded-full text-[10px] font-heading font-black shrink-0">
                        Kamu
                      </span>
                    </div>
                    <div class="flex items-center gap-2 text-[11px] text-slate-500 font-body">
                      <span>{{ student.grade }}</span>
                      <span>•</span>
                      <span class="text-amber-600 font-semibold flex items-center gap-0.5">
                        <span>🔥</span> {{ student.streak }} Hari
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Right Info: XP & Positive Status Badge -->
                <div class="text-right shrink-0">
                  <div class="font-heading font-black text-xs sm:text-sm text-slate-800 flex items-center justify-end gap-1">
                    <span class="text-amber-500 text-xs">⭐</span>
                    <span>{{ student.weeklyXP }}</span>
                    <span class="text-[10px] font-bold text-slate-400">XP</span>
                  </div>
                  
                  <!-- Positive Encouraging Status (Never says "Degradasi") -->
                  <span 
                    v-if="index < 3" 
                    class="text-[10px] font-heading font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>🚀 Naik Liga</span>
                  </span>
                  <span 
                    v-else-if="index < 7" 
                    class="text-[10px] font-heading font-bold text-slate-400 inline-block mt-0.5"
                  >
                    <span>✨ Zona Aman</span>
                  </span>
                  <span 
                    v-else 
                    class="text-[10px] font-heading font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>💪 Semangat!</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Promotion Footer Info Banner -->
            <div class="bg-emerald-50/80 px-4 sm:px-5 py-3 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-heading font-bold text-emerald-800">
              <span class="flex items-center gap-1.5 text-center sm:text-left">
                <span>🚀</span>
                <span>Top 3 di akhir minggu otomatis melaju ke liga berikutnya!</span>
              </span>
              <NuxtLink to="/catalog" class="duo-btn-green px-3 py-1.5 text-xs shadow-xs whitespace-nowrap shrink-0">
                ⚡ Kumpulkan XP ➔
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: SIDEBAR WIDGETS (4 Cols on Desktop, Stacked on Mobile) -->
        <div class="lg:col-span-4 space-y-5">
          <!-- Kiko Evolution Progress Card -->
          <div class="bg-white rounded-3xl border-2 border-purple-200/90 p-4 sm:p-5 shadow-2xs space-y-3.5 relative overflow-hidden">
            <div class="flex items-center justify-between border-b border-purple-100 pb-3">
              <div class="flex items-center gap-3">
                <KikoAvatar size="sm" :showLevelBadge="true" />
                <div>
                  <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">
                    {{ userStore.kikoTitle.title }}
                  </h3>
                  <p class="text-[11px] text-slate-500 font-body">Teman setia belajarmu setiap hari</p>
                </div>
              </div>
              <span class="px-2.5 py-1 bg-purple-50 text-purple-700 font-heading font-extrabold text-xs rounded-xl border border-purple-200">
                Level {{ userStore.userLevel }}
              </span>
            </div>

            <!-- XP Progress Bar -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-xs font-heading font-extrabold text-slate-600">
                <span>Progres Level</span>
                <span class="text-purple-700 font-black">{{ 100 - userStore.xpToNextLevel }} / 100 XP</span>
              </div>
              <div class="bg-slate-100 h-3 rounded-full p-0.5 overflow-hidden border border-slate-200">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500 shadow-2xs"
                  :style="{ width: `${Math.min(100, Math.round(((100 - userStore.xpToNextLevel) / 100) * 100))}%` }"
                ></div>
              </div>
              <p class="text-[11px] text-slate-500 font-heading font-bold text-center pt-0.5">
                ✨ Butuh <strong class="text-purple-700">{{ userStore.xpToNextLevel }} XP</strong> lagi untuk naik level!
              </p>
            </div>
          </div>

          <!-- Embedded Daily Quests Card -->
          <DailyQuestsCard />
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
  title: 'Papan Peringkat & Liga Mingguan Belajar Anak | CountingDuo',
  description: 'Bersaing seru dengan teman-teman di Liga Mingguan CountingDuo. Selesaikan kuis, kumpulkan XP, dan raih posisi teratas di Divisi Diamond!',
  keywords: 'papan peringkat anak, leaderboard kuis edukasi, liga mingguan belajar, gamifikasi anak sd tk',
  ogTitle: 'Papan Peringkat Liga Mingguan — CountingDuo',
  ogDescription: 'Kumpulkan XP dari kuis dan naik ke liga belajar berikutnya!',
  ogImage: 'https://countingduo.id/images/og-banner.png',
  ogUrl: 'https://countingduo.id/leaderboard',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://countingduo.id/leaderboard' }
  ]
})

const tiers = [
  { id: 'bronze', name: 'Bronze', icon: '🥉', minXP: 0 },
  { id: 'silver', name: 'Silver', icon: '🥈', minXP: 100 },
  { id: 'gold', name: 'Gold', icon: '🥇', minXP: 250 },
  { id: 'diamond', name: 'Diamond', icon: '💎', minXP: 400 }
]

// Initialize active tier with user's current league tier
const userCurrentTierId = computed(() => userStore.leagueTier?.name?.toLowerCase() || 'bronze')
const selectedTier = ref(userStore.leagueTier?.name?.toLowerCase() || 'diamond')

const tierBadgeClass = computed(() => {
  const name = userStore.leagueTier?.name?.toLowerCase()
  if (name === 'diamond') return 'bg-cyan-600'
  if (name === 'gold') return 'bg-amber-500'
  if (name === 'silver') return 'bg-slate-500'
  return 'bg-amber-700'
})

// Mock rosters for each league tier so kids see appropriate classmates in each division
const tierRosters = {
  diamond: [
    { id: 'dia_1', name: 'Alif Pratama', avatar: '🦁', grade: 'Kelas 2 SD', streak: 14, weeklyXP: 540 },
    { id: 'dia_2', name: 'Kenzo Alvaro', avatar: '🦊', grade: 'Kelas 3 SD', streak: 10, weeklyXP: 490 },
    { id: 'dia_3', name: 'Clara Bella', avatar: '🐱', grade: 'Kelas 2 SD', streak: 8, weeklyXP: 440 },
    { id: 'dia_4', name: 'Zahra Anindya', avatar: '🐰', grade: 'Kelas 1 SD', streak: 6, weeklyXP: 410 }
  ],
  gold: [
    { id: 'gld_1', name: 'Ahmad Dani', avatar: '🦊', grade: 'Kelas 2 SD', streak: 7, weeklyXP: 380 },
    { id: 'gld_2', name: 'Siti Rahma', avatar: '🦉', grade: 'Kelas 1 SD', streak: 12, weeklyXP: 310 },
    { id: 'gld_3', name: 'Bimo Sakti', avatar: '🦁', grade: 'TK B', streak: 5, weeklyXP: 280 },
    { id: 'gld_4', name: 'Rania Putri', avatar: '🐰', grade: 'Kelas 1 SD', streak: 3, weeklyXP: 260 }
  ],
  silver: [
    { id: 'slv_1', name: 'Dafa Algifari', avatar: '🐻', grade: 'Kelas 3 SD', streak: 9, weeklyXP: 230 },
    { id: 'slv_2', name: 'Nabila Az-Zahra', avatar: '🐱', grade: 'Kelas 2 SD', streak: 4, weeklyXP: 180 },
    { id: 'slv_3', name: 'Fatih Al-Faruq', avatar: '🐯', grade: 'Kelas 1 SD', streak: 3, weeklyXP: 140 },
    { id: 'slv_4', name: 'Aisyah Humaira', avatar: '🐼', grade: 'TK B', streak: 2, weeklyXP: 110 }
  ],
  bronze: [
    { id: 'brz_1', name: 'Fikri Haikal', avatar: '🐯', grade: 'TK B', streak: 2, weeklyXP: 90 },
    { id: 'brz_2', name: 'Kevin Sanjaya', avatar: '🐼', grade: 'Kelas 1 SD', streak: 1, weeklyXP: 70 },
    { id: 'brz_3', name: 'Maya Melinda', avatar: '🐨', grade: 'TK A', streak: 1, weeklyXP: 45 },
    { id: 'brz_4', name: 'Rizky Ramadan', avatar: '🐹', grade: 'PAUD', streak: 1, weeklyXP: 30 }
  ]
}

// Filtered and sorted leaderboard list based on selected tier
const filteredLeaderboard = computed(() => {
  const currentRoster = tierRosters[selectedTier.value] || tierRosters.diamond
  const list = [...currentRoster]

  // If user is currently in the selected tier, include user in list
  if (selectedTier.value === userCurrentTierId.value) {
    list.push({
      id: userStore.currentUser?.id || 'user_current',
      name: userStore.userDisplayName,
      avatar: userStore.userAvatar,
      grade: userStore.currentUser?.grade || 'Kelas 1 SD',
      streak: userStore.streak,
      weeklyXP: userStore.weeklyXP,
      isUser: true
    })
  }

  // Sort descending by weeklyXP
  list.sort((a, b) => b.weeklyXP - a.weeklyXP)
  return list
})

// Current user rank in the active list (or 1 if user is top)
const currentUserRank = computed(() => {
  const index = filteredLeaderboard.value.findIndex(s => s.isUser)
  return index >= 0 ? index + 1 : 1
})
</script>
