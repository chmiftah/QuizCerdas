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
        class="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center p-4 select-none"
        aria-live="polite"
        role="status"
      >
        <!-- Click Shield Backdrop with Rich Frost Blur -->
        <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-md cursor-wait transition-all duration-300"></div>

        <!-- Centered Glassmorphic Mascot Loading Card -->
        <div class="relative z-10 mx-auto px-7 py-6 bg-white/95 backdrop-blur-2xl border-3 border-emerald-400/90 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] flex flex-col items-center text-center gap-3.5 animate-center-pop max-w-xs sm:max-w-sm">
          
          <!-- Animated Mascot Emblem with Glowing Spinner Ring -->
          <div class="relative">
            <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-[#58cc02] border-2 border-emerald-500 flex items-center justify-center text-3xl shadow-lg animate-bounce-gentle shrink-0">
              🦉
            </div>
            <!-- Spinning Dotted Ring Accent around Mascot -->
            <div class="absolute -inset-1.5 rounded-[26px] border-2 border-dashed border-emerald-400/70 animate-spin-slow pointer-events-none"></div>
          </div>

          <!-- Label & Microcopy -->
          <div class="space-y-1">
            <h3 class="font-heading font-black text-base sm:text-lg text-slate-800 leading-snug">
              {{ navigatingLabel }}
            </h3>
            <p class="text-xs font-heading font-bold text-emerald-600 flex items-center justify-center gap-1">
              <span>Sebentar ya, sedang disiapkan</span>
              <span class="animate-pulse">✨</span>
            </p>
          </div>

          <!-- High-Performance Animated Bouncing Energy Dots -->
          <div class="flex items-center gap-1.5 pt-1">
            <div class="w-2.5 h-2.5 rounded-full bg-[#58cc02] animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style="animation-delay: 300ms"></div>
          </div>
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
@keyframes centerPop {
  0% {
    opacity: 0;
    transform: scale(0.88);
  }
  60% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-center-pop {
  animation: centerPop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-bounce-gentle {
  animation: bounceGentle 1.2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spinSlow 8s linear infinite;
}

.hud-fade-enter-active,
.hud-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.hud-fade-enter-from,
.hud-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
