export default defineNuxtRouteMiddleware((to, from) => {
  const url = useRequestURL()

  // Jika pengunjung membuka root ('/') di subdomain app (misal app.pintara.com atau app.localhost)
  if (url.hostname.startsWith('app.') && to.path === '/') {
    return navigateTo('/course')
  }
})
