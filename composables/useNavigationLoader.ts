import { ref } from 'vue'

const isNavigating = ref(false)
const navigatingLabel = ref('Memuat petualangan...')
const activeTarget = ref<string | null>(null)
let safetyTimer: any = null

export const useNavigationLoader = () => {
  const startNavigation = (label?: string, targetId?: string) => {
    isNavigating.value = true
    if (label) {
      navigatingLabel.value = label
    }
    if (targetId) {
      activeTarget.value = targetId
    }

    // Safety timeout: dismiss after 7 seconds max in case of any unhandled router edge cases
    if (safetyTimer) clearTimeout(safetyTimer)
    safetyTimer = setTimeout(() => {
      isNavigating.value = false
      activeTarget.value = null
    }, 7000)
  }

  const stopNavigation = () => {
    if (safetyTimer) clearTimeout(safetyTimer)
    // Small delay to ensure smooth transition out
    setTimeout(() => {
      isNavigating.value = false
      activeTarget.value = null
      navigatingLabel.value = 'Memuat petualangan...'
    }, 120)
  }

  const getFriendlyLabel = (path: string, query?: Record<string, any>): string => {
    if (path.startsWith('/course/') && (path.includes('checkpoint') || query?.lessonId)) {
      return 'Menyiapkan arena kuis interaktif... 🎯'
    }
    if (path === '/course' || path.startsWith('/course')) {
      return 'Membuka peta petualangan belajar... 🗺️'
    }
    if (path === '/catalog') {
      return 'Membuka katalog petualangan... 📚'
    }
    if (path === '/onboarding') {
      return 'Menyiapkan perjalanan belajarmu... ✨'
    }
    if (path === '/activities' || path.startsWith('/activities')) {
      return 'Membuka arena kreasi & aktivitas... 🎨'
    }
    if (path === '/leaderboard' || path === '/stickers') {
      return 'Membuka piala & pencapaian... 🏆'
    }
    if (path === '/shop') {
      return 'Membuka toko kustom Kiko... 🎒'
    }
    if (path === '/about') {
      return 'Membuka tentang Pintara... 🦉'
    }
    if (path === '/login' || path === '/register') {
      return 'Menghubungkan ke akun Pintara... 🚀'
    }
    return 'Memuat petualangan... ⏳'
  }

  return {
    isNavigating,
    navigatingLabel,
    activeTarget,
    startNavigation,
    stopNavigation,
    getFriendlyLabel
  }
}
