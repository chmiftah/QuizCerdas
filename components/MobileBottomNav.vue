<template>
  <div v-if="!isQuizRoute" class="md:hidden">
    <!-- Ultra-Sleek Floating Glass Island Navigation Bar (iOS / Dynamic Island Style) -->
    <nav class="fixed bottom-3 left-3 right-3 max-w-lg mx-auto z-40 bg-white/90 backdrop-blur-2xl border-2 border-white/80 shadow-[0_12px_40px_rgba(15,23,42,0.18)] rounded-[30px] p-1.5 flex justify-around items-center transition-all duration-300">
      
      <!-- 1. Beranda -->
      <NuxtLink 
        to="/" 
        @click="playNavSound(480)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[54px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="isActiveRoute('/') ? 'bg-gradient-to-b from-emerald-500 to-[#58cc02] text-white shadow-md shadow-emerald-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110">🏠</span>
        <span class="text-[10px] font-heading font-black mt-1">Beranda</span>
        <div v-if="isActiveRoute('/')" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </NuxtLink>

      <!-- 3. Katalog Modul -->
      <NuxtLink 
        to="/catalog" 
        @click="playNavSound(560)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[54px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="route.path.startsWith('/catalog') ? 'bg-gradient-to-b from-sky-400 to-blue-500 text-white shadow-md shadow-blue-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110">📚</span>
        <span class="text-[10px] font-heading font-black mt-1">Katalog</span>
        <div v-if="route.path.startsWith('/catalog')" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </NuxtLink>

      <!-- 4. Liga & Misi -->
      <NuxtLink 
        to="/leaderboard" 
        @click="playNavSound(600)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[54px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="route.path.startsWith('/leaderboard') ? 'bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 shadow-md shadow-amber-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110">🏆</span>
        <span class="text-[10px] font-heading font-black mt-1">Liga</span>
        
        <!-- Quest Badge Counter -->
        <span 
          v-if="userStore.unclaimedQuestsCount > 0"
          class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white animate-bounce shadow-md"
        >
          {{ userStore.unclaimedQuestsCount }}
        </span>
        <div v-if="route.path.startsWith('/leaderboard')" class="absolute -bottom-1 w-2 h-1 bg-amber-950 rounded-full"></div>
      </NuxtLink>

      <!-- 5. Aktivitas Hub (Floating Trigger Button) -->
      <button 
        @click="openActivitiesSheet"
        type="button"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[54px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="isActivityActive ? 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110">🎯</span>
        <span class="text-[10px] font-heading font-black mt-1">Aktivitas</span>
        <div v-if="isActivityActive" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </button>

    </nav>

    <!-- PREMIUM MATERIAL 3 BOTTOM SHEET DRAWER -->
    <Teleport to="body">
      <Transition name="bottom-sheet">
        <div v-if="showBottomSheet" class="fixed inset-0 z-50 flex items-end justify-center">
          <!-- Backdrop Blur Overlay -->
          <div 
            @click="showBottomSheet = false" 
            class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          ></div>

          <!-- Bottom Sheet Container -->
          <div class="relative z-10 w-full max-w-lg bg-gradient-to-b from-white to-slate-50 rounded-t-[36px] p-6 shadow-2xl border-t-4 border-white/80 max-h-[88vh] overflow-y-auto space-y-6 animate-slide-up pb-10">
            
            <!-- Handle Drag Bar -->
            <div class="w-14 h-1.5 bg-slate-300 hover:bg-slate-400 rounded-full mx-auto cursor-pointer transition-colors" @click="showBottomSheet = false"></div>

            <!-- Sheet Title Header -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md border-b-2 border-purple-700">
                  🎯
                </div>
                <div>
                  <h3 class="font-heading font-black text-lg text-slate-800">
                    Pusat Aktivitas Seru
                  </h3>
                  <p class="text-xs text-slate-500 font-body">Main game, mewarnai, bernyanyi & belanja kustom Kiko!</p>
                </div>
              </div>

              <button 
                @click="showBottomSheet = false" 
                class="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-black cursor-pointer active:scale-90 transition-transform shadow-xs"
              >
                ✕
              </button>
            </div>

            <!-- Category Section: Permainan Belajar -->
            <div class="space-y-3">
              <span class="font-heading font-black text-xs text-slate-400 uppercase tracking-wider block">
                🎮 Game Edukasi Interaktif
              </span>

              <div class="grid grid-cols-2 gap-3">
                <!-- 1. Menulis & Tracing -->
                <NuxtLink 
                  to="/tracing" 
                  @click="showBottomSheet = false"
                  class="p-4 bg-emerald-50 hover:bg-emerald-100/70 border-2 border-emerald-200 rounded-3xl flex flex-col items-center text-center space-y-2 active:scale-95 transition-all shadow-xs"
                >
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-[#58cc02] text-white flex items-center justify-center text-2xl shadow-md border-b-2 border-emerald-700">
                    ✏️
                  </div>
                  <div>
                    <span class="font-heading font-black text-xs text-slate-800 block">Menulis Angka</span>
                    <span class="text-[10px] text-slate-500 font-body">Tracing garis & pola</span>
                  </div>
                </NuxtLink>

                <!-- 2. Game Balon -->
                <NuxtLink 
                  to="/games/bubble-pop" 
                  @click="showBottomSheet = false"
                  class="p-4 bg-sky-50 hover:bg-sky-100/70 border-2 border-sky-200 rounded-3xl flex flex-col items-center text-center space-y-2 active:scale-95 transition-all shadow-xs"
                >
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-2xl shadow-md border-b-2 border-blue-700">
                    🎈
                  </div>
                  <div>
                    <span class="font-heading font-black text-xs text-slate-800 block">Game Balon</span>
                    <span class="text-[10px] text-slate-500 font-body">Pecahkan balon angka</span>
                  </div>
                </NuxtLink>

                <!-- 3. Mewarnai -->
                <NuxtLink 
                  to="/coloring" 
                  @click="showBottomSheet = false"
                  class="p-4 bg-amber-50 hover:bg-amber-100/70 border-2 border-amber-200 rounded-3xl flex flex-col items-center text-center space-y-2 active:scale-95 transition-all shadow-xs"
                >
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center text-2xl shadow-md border-b-2 border-amber-600">
                    🎨
                  </div>
                  <div>
                    <span class="font-heading font-black text-xs text-slate-800 block">Mewarnai Ceria</span>
                    <span class="text-[10px] text-slate-500 font-body">Kanvas lukis kreatif</span>
                  </div>
                </NuxtLink>

                <!-- 4. Lagu Anak -->
                <NuxtLink 
                  to="/nursery-rhymes" 
                  @click="showBottomSheet = false"
                  class="p-4 bg-rose-50 hover:bg-rose-100/70 border-2 border-rose-200 rounded-3xl flex flex-col items-center text-center space-y-2 active:scale-95 transition-all shadow-xs"
                >
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center text-2xl shadow-md border-b-2 border-rose-600">
                    🎵
                  </div>
                  <div>
                    <span class="font-heading font-black text-xs text-slate-800 block">Lagu & Irama</span>
                    <span class="text-[10px] text-slate-500 font-body">Nyanyi lagu anak</span>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Category Section: Ekstra & Hadiah -->
            <div class="space-y-3">
              <span class="font-heading font-black text-xs text-slate-400 uppercase tracking-wider block">
                ⭐ Hadiah & Dashboard
              </span>

              <!-- Toko Kiko Card -->
              <NuxtLink 
                to="/shop" 
                @click="showBottomSheet = false"
                class="p-4 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-3xl flex items-center gap-4 hover:border-amber-400 active:scale-95 transition-all shadow-sm"
              >
                <div class="w-13 h-13 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md border-b-2 border-amber-700">
                  🛍️
                </div>
                <div class="text-left flex-1">
                  <span class="font-heading font-black text-sm text-amber-950 block">Toko Kiko</span>
                  <span class="text-[11px] text-amber-800 font-body">Tukar XP dengan kostum, topi & nyawa</span>
                </div>
                <span class="text-xs font-heading font-black px-3 py-1.5 bg-amber-400 text-amber-950 rounded-xl shadow-xs">
                  Buka ➔
                </span>
              </NuxtLink>

              <!-- Parent Dashboard Link -->
              <NuxtLink 
                to="/parent-dashboard" 
                @click="showBottomSheet = false"
                class="p-4 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 rounded-3xl flex items-center gap-4 active:scale-95 transition-all shadow-xs"
              >
                <div class="w-13 h-13 rounded-2xl bg-slate-700 text-white flex items-center justify-center text-3xl shadow-md border-b-2 border-slate-900">
                  👨‍👩‍👧
                </div>
                <div class="text-left flex-1">
                  <span class="font-heading font-black text-sm text-slate-800 block">Dashboard Orang Tua</span>
                  <span class="text-[11px] text-slate-500 font-body">Pantau durasi & progres belajar anak</span>
                </div>
                <span class="text-xs font-heading font-black text-slate-600">
                  Lihat ➔
                </span>
              </NuxtLink>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()
const showBottomSheet = ref(false)

const isActiveRoute = (path) => {
  return route.path === path
}

// Auto-hide bottom dock inside full-screen exercise / quiz routes
const isQuizRoute = computed(() => {
  return route.path.includes('/checkpoint') || (route.path.startsWith('/course/') && route.params.lessonId)
})

const activityRoutes = ['/tracing', '/games/bubble-pop', '/coloring', '/nursery-rhymes', '/shop', '/parent-dashboard', '/stickers']
const isActivityActive = computed(() => activityRoutes.some(r => route.path.startsWith(r)))

const playNavSound = (freq = 500) => {
  if (typeof window === 'undefined') return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.05)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  } catch (e) {}
}

const openActivitiesSheet = () => {
  playNavSound(640)
  showBottomSheet.value = true
}
</script>

<style scoped>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: opacity 0.3s ease;
}
.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
