// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  experimental: {
    appManifest: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      title: 'CountingDuo — Game Edukasi & Belajar Berhitung Anak Usia Dini (TK & SD)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'description', content: 'Platform belajar dan game edukasi interaktif anak usia 4–9 tahun (TK & SD). Asah kemampuan Berhitung, Matematika, Sains, Membaca, dan Menulis dengan metode gamifikasi seru bergaya Duolingo!' },
        { name: 'keywords', content: 'game edukasi anak, belajar berhitung anak tk sd, kuis matematika anak, aplikasi calistung anak, belajar membaca menulis, game pembelajaran seru, platform edukasi anak usia dini, countingduo, quizcerdas' },
        { name: 'author', content: 'CountingDuo' },
        { name: 'theme-color', content: '#fbbf24' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        
        // Open Graph / Facebook / WhatsApp
        { property: 'og:site_name', content: 'CountingDuo' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:title', content: 'CountingDuo — Game Edukasi & Belajar Berhitung Anak Usia Dini' },
        { property: 'og:description', content: 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, petualangan 3D maskot, XP, dan materi lengkap Matematika, Sains, Bahasa, dan Logika.' },
        { property: 'og:image', content: 'https://countingduo.id/images/og-banner.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'CountingDuo - Platform Belajar Seru Anak Usia Dini' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CountingDuo — Game Edukasi & Belajar Berhitung Anak' },
        { name: 'twitter:description', content: 'Belajar berhitung, sains, dan bahasa jadi petualangan seru layaknya bermain game!' },
        { name: 'twitter:image', content: 'https://countingduo.id/images/og-banner.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://countingduo.id' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    configPath: 'tailwind.config.js'
  }
})
