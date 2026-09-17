import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  const isCourseRoute = to.path === '/course' || to.path.startsWith('/course/')

  // 1. If visiting /onboarding:
  if (to.path === '/onboarding') {
    if (import.meta.server) {
      const onboardedCookie = useCookie('pintara_onboarded')
      const authSessionCookie = useCookie('auth_session')
      if (onboardedCookie.value === '1' || authSessionCookie.value) {
        return navigateTo({
          path: '/course',
          query: to.query
        })
      }
      return
    }

    if (import.meta.client) {
      const userStore = useUserStore()
      if (!userStore.currentUser) {
        userStore.loadFromStorage()
      }
      if (userStore.hasOnboarded) {
        return navigateTo({
          path: '/course',
          query: to.query
        })
      }
    }
    return
  }

  // 2. If visiting /course or /course/...:
  if (isCourseRoute) {
    // Check SSR first to prevent SSR flash of course content
    if (import.meta.server) {
      const onboardedCookie = useCookie('pintara_onboarded')
      const authSessionCookie = useCookie('auth_session')
      if (!onboardedCookie.value && !authSessionCookie.value) {
        return navigateTo({
          path: '/onboarding',
          query: to.query
        })
      }
      return
    }

    // Check client state
    if (import.meta.client) {
      const userStore = useUserStore()
      userStore.loadFromStorage()

      if (!userStore.hasOnboarded) {
        return navigateTo({
          path: '/onboarding',
          query: to.query
        })
      }
    }
  }
})
