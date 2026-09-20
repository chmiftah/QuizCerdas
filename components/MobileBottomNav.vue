<template>
  <!-- Render bottom dock only for App & Game routes (Hidden on Landing, About, Pricing, Auth, and Active Quiz) -->
  <div v-if="shouldShowDock" class="z-40">
    <!-- Ultra-Sleek Floating Island Navigation Bar for Kids -->
    <nav 
      class="fixed bottom-3 left-3 right-3 max-w-lg mx-auto z-40 bg-white/95 backdrop-blur-2xl border-2 border-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.18)] rounded-[30px] p-1.5 flex justify-around items-center transition-all duration-300"
      :class="{ 'pointer-events-none opacity-80 cursor-wait': isNavigating }"
    >
      
      <!-- 1. 📚 Belajar (Peta Belajar & Bioma) -->
      <NuxtLink 
        to="/course" 
        @click="handleNavClick('course', 480)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="route.path.startsWith('/course') ? 'bg-gradient-to-b from-emerald-500 to-[#58cc02] text-white shadow-md shadow-emerald-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110 flex items-center justify-center">
          <span v-if="clickedTab === 'course' && isNavigating" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span v-else>🗺️</span>
        </span>
        <span class="text-[10px] font-heading font-black mt-1">Belajar</span>
        <div v-if="route.path.startsWith('/course')" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </NuxtLink>

      <!-- 2. 🎮 Games & Kreasi (Tracing, Mewarnai, Balon, Lagu) -->
      <NuxtLink 
        to="/activities" 
        @click="handleNavClick('activities', 540)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="isActivitiesTabActive ? 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110 flex items-center justify-center">
          <span v-if="clickedTab === 'activities' && isNavigating" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span v-else>🎮</span>
        </span>
        <span class="text-[10px] font-heading font-black mt-1">Games</span>
        <div v-if="isActivitiesTabActive" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </NuxtLink>

      <!-- 3. 🏆 Piala & Juara (Leaderboard, Misi & Stiker) -->
      <NuxtLink 
        to="/leaderboard" 
        @click="handleNavClick('leaderboard', 600)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="route.path.startsWith('/leaderboard') || route.path.startsWith('/stickers') ? 'bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 shadow-md shadow-amber-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110 flex items-center justify-center">
          <span v-if="clickedTab === 'leaderboard' && isNavigating" class="inline-block w-5 h-5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin"></span>
          <span v-else>🏆</span>
        </span>
        <span class="text-[10px] font-heading font-black mt-1">Piala</span>
        
        <!-- Quest Badge Counter -->
        <span 
          v-if="userStore.unclaimedQuestsCount > 0"
          class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white animate-bounce shadow-md"
        >
          {{ userStore.unclaimedQuestsCount }}
        </span>
        <div v-if="route.path.startsWith('/leaderboard') || route.path.startsWith('/stickers')" class="absolute -bottom-1 w-2 h-1 bg-amber-950 rounded-full"></div>
      </NuxtLink>

      <!-- 4. 🎒 Ransel & Toko Kiko (Koin, Baju & Topi) -->
      <NuxtLink 
        to="/shop" 
        @click="handleNavClick('shop', 660)"
        class="relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-90"
        :class="route.path.startsWith('/shop') ? 'bg-gradient-to-b from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30 font-black' : 'text-slate-600 hover:text-slate-900'"
      >
        <span class="text-xl leading-none transition-transform group-hover:scale-110 flex items-center justify-center">
          <span v-if="clickedTab === 'shop' && isNavigating" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span v-else>🎒</span>
        </span>
        <span class="text-[10px] font-heading font-black mt-1">Ransel</span>
        <div v-if="route.path.startsWith('/shop')" class="absolute -bottom-1 w-2 h-1 bg-white rounded-full"></div>
      </NuxtLink>

    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useNavigationLoader } from '~/composables/useNavigationLoader'

const route = useRoute()
const userStore = useUserStore()
const { isNavigating, startNavigation } = useNavigationLoader()
const clickedTab = ref('')

const handleNavClick = (tabId, soundFreq) => {
  clickedTab.value = tabId
  playNavSound(soundFreq)
}

// Sembunyikan bottom nav di halaman marketing, onboarding, auth, admin, atau saat kuis aktif
const shouldShowDock = computed(() => {
  const p = route.path
  
  // Onboarding page must have a dedicated distraction-free flow
  if (p === '/onboarding') return false

  // Un-onboarded visitors should not see app bottom nav
  if (!userStore.hasOnboarded) return false
  
  // Marketing & info pages for parents
  if (p === '/' || p === '/about' || p === '/pricing') return false
  
  // Auth & Admin pages
  if (p === '/login' || p === '/register' || p.startsWith('/admin')) return false
  
  // Active quiz / checkpoint fullscreen view
  if (p.includes('/checkpoint') || (p.startsWith('/course/') && route.params.lessonId)) return false
  
  return true
})

// Tab Kreasi aktif untuk sub-halaman aktivitas
const activitiesPaths = ['/activities', '/tracing', '/coloring', '/games/bubble-pop', '/nursery-rhymes']
const isActivitiesTabActive = computed(() => activitiesPaths.some(sub => route.path.startsWith(sub)))

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
</script>
