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
      title: 'Pintara — Game Edukasi & Belajar Interaktif Anak Usia Dini (TK & SD)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'description', content: 'Platform belajar dan game edukasi interaktif anak usia 4–9 tahun (TK & SD). Asah kemampuan Berhitung, Matematika, Sains, Membaca, dan Menulis dengan metode gamifikasi seru di Pintara!' },
        { name: 'keywords', content: 'game edukasi anak, belajar berhitung anak tk sd, kuis matematika anak, aplikasi calistung anak, belajar membaca menulis, game pembelajaran seru, platform edukasi anak usia dini, pintara' },
        { name: 'author', content: 'Pintara' },
        { name: 'theme-color', content: '#fbbf24' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        
        // Open Graph / Facebook / WhatsApp
        { property: 'og:site_name', content: 'Pintara' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:title', content: 'Pintara — Game Edukasi & Belajar Interaktif Anak Usia Dini' },
        { property: 'og:description', content: 'Platform belajar anak usia 4–9 tahun dengan quiz interaktif, petualangan 3D maskot, XP, dan materi lengkap Matematika, Sains, Bahasa, dan Logika.' },
        { property: 'og:image', content: 'https://pintara.id/images/og-banner.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Pintara - Platform Belajar Seru Anak Usia Dini' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pintara — Game Edukasi & Belajar Interaktif Anak' },
        { name: 'twitter:description', content: 'Belajar berhitung, sains, dan bahasa jadi petualangan seru layaknya bermain game di Pintara!' },
        { name: 'twitter:image', content: 'https://pintara.id/images/og-banner.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://pintara.id' },
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
