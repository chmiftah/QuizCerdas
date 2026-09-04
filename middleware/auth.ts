import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return
  }

  const userStore = useUserStore()

  if (!userStore.isAuthenticated) {
    userStore.loadFromStorage()
  }

  if (!userStore.isAuthenticated) {
    return navigateTo({
      path: '/login',
      query: { 
        redirect: to.fullPath,
        reason: 'auth_required'
      }
    })
  }
})
