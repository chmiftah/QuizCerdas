import { computed } from 'vue'

export function useAppDomain() {
  const url = useRequestURL()
  
  // Deteksi apakah sedang diakses via subdomain 'app.' (misal app.pintara.com atau app.localhost:3000)
  const isAppSubdomain = computed(() => {
    return url.hostname.startsWith('app.')
  })

  // Helper untuk mendapatkan link ke Web App (Gamified Arena)
  const getAppLink = (path: string = '/course') => {
    // Normalisasi path agar diawali dengan slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    
    // Jika di production dengan domain utama pintara.com
    if (url.hostname.includes('pintara.com')) {
      return `https://app.pintara.com${cleanPath}`
    }
    
    // Jika di local development dengan app.localhost
    if (url.hostname.startsWith('app.localhost')) {
      return cleanPath
    }

    // Default fallback lokal (path internal biasa)
    return cleanPath
  }

  // Helper untuk mendapatkan link ke Landing Page / Marketing Hub
  const getMarketingLink = (path: string = '/') => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    
    if (url.hostname.startsWith('app.pintara.com')) {
      return `https://pintara.com${cleanPath}`
    }

    if (url.hostname.startsWith('app.localhost')) {
      const port = url.port ? `:${url.port}` : ''
      return `${url.protocol}//localhost${port}${cleanPath}`
    }

    return cleanPath
  }

  return {
    isAppSubdomain,
    getAppLink,
    getMarketingLink
  }
}
