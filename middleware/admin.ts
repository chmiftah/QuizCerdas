import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  // Auth state is persisted in localStorage, so skip SSR evaluation to prevent false redirects
  if (import.meta.server) {
    return
  }

  const userStore = useUserStore()

  // Always load user state from localStorage on client side if not loaded
  if (!userStore.isAuthenticated || !userStore.currentUser) {
    userStore.loadFromStorage()
  }

  // 1. If not authenticated after loading from storage, redirect to login
  if (!userStore.isAuthenticated || !userStore.currentUser) {
    return navigateTo({
      path: '/login',
      query: { 
        redirect: to.fullPath,
        reason: 'admin_required'
      }
    })
  }

  // 2. If authenticated but role is NOT admin, block access and redirect to home
  if (userStore.currentUser.role !== 'admin') {
    return navigateTo({
      path: '/',
      query: { 
        error: 'access_denied'
      }
    })
  }
})
