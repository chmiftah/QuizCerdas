<template>
  <div>
    <!-- 1. Native Nuxt Top Loading Bar with colorful gradient -->
    <NuxtLoadingIndicator 
      color="repeating-linear-gradient(to right, #58cc02 0%, #22c55e 30%, #1cb0f6 70%, #ff9600 100%)" 
      :height="4" 
      :duration="2500" 
      :throttle="0" 
    />

    <!-- 2. Interactive Navigation HUD & Click Shield -->
    <Transition name="hud-fade">
      <div 
        v-if="isNavigating" 
        class="fixed inset-0 z-[9999] pointer-events-auto flex flex-col items-center justify-start pt-6 select-none"
        aria-live="polite"
        role="status"
      >
        <!-- Click Shield Backdrop (Lightweight, Prevents Multiple Clicks) -->
        <div class="fixed inset-0 bg-slate-900/10 backdrop-blur-[1px] cursor-wait transition-opacity duration-200"></div>

        <!-- Floating Island Toast / Mascot Navigation HUD -->
        <div class="relative z-10 mx-auto px-4 py-2.5 sm:py-3 bg-white/95 backdrop-blur-xl border-2 border-emerald-400/80 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.14)] flex items-center gap-3 animate-hud-pop">
          
          <!-- Animated Mascot Emblem with Glow -->
          <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#58cc02] border border-emerald-600 flex items-center justify-center text-lg sm:text-xl shadow-xs animate-bounce-gentle shrink-0">
            🦉
          </div>

          <!-- Label & Microcopy -->
          <div class="flex flex-col pr-1 min-w-[140px] sm:min-w-[180px]">
            <span class="font-heading font-black text-xs sm:text-sm text-slate-800 leading-tight">
              {{ navigatingLabel }}
            </span>
            <span class="text-[10px] font-heading font-bold text-emerald-600 flex items-center gap-1">
              <span>Sebentar ya, sedang disiapkan</span>
              <span class="inline-flex gap-0.5">
                <span class="animate-ping text-[8px]">✨</span>
              </span>
            </span>
          </div>

          <!-- High-Performance Spinning Wheel Ring -->
          <div class="w-5 h-5 shrink-0 border-2 border-slate-200 border-t-emerald-500 border-r-emerald-500 rounded-full animate-spin"></div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNavigationLoader } from '~/composables/useNavigationLoader'

const router = useRouter()
const nuxtApp = useNuxtApp()
const { isNavigating, navigatingLabel, startNavigation, stopNavigation, getFriendlyLabel } = useNavigationLoader()

// Automatic Router Guards to trigger on EVERY click anywhere in the app
router.beforeEach((to, from) => {
  if (to.fullPath !== from.fullPath) {
    const label = getFriendlyLabel(to.path, to.query)
    startNavigation(label)
  }
})

router.afterEach(() => {
  stopNavigation()
})

router.onError(() => {
  stopNavigation()
})

// Nuxt Page Hooks
nuxtApp.hook('page:start', () => {
  startNavigation()
})

nuxtApp.hook('page:finish', () => {
  stopNavigation()
})
</script>

<style scoped>
@keyframes hudPop {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.92);
  }
  60% {
    opacity: 1;
    transform: translateY(4px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-hud-pop {
  animation: hudPop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-bounce-gentle {
  animation: bounceGentle 1.2s ease-in-out infinite;
}

.hud-fade-enter-active,
.hud-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hud-fade-enter-from,
.hud-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
