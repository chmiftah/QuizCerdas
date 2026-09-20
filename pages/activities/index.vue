<template>
  <div class="min-h-screen bg-[#f4f7fb] flex flex-col font-body antialiased relative">
    
    <!-- Subtle Educational Doodle Watermark Pattern Background -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 opacity-[0.045] select-none"
      style="background-image: url('/images/patterns/doodle_pattern.svg'); background-repeat: repeat; background-size: 300px 300px;"
      aria-hidden="true"
    ></div>

    <!-- Game App Top Bar -->
    <AppTopBar class="relative z-40" />

    <!-- Main Arcade Content Stage -->
    <main class="relative z-10 max-w-6xl mx-auto w-full px-3.5 sm:px-6 py-5 sm:py-7 flex-1 space-y-7 pb-28">

      <!-- ===================================================================== -->
      <!-- 1. ARCADE HERO SPOTLIGHT: GAME OF THE DAY                             -->
      <!-- ===================================================================== -->
      <section class="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl border-4 border-white/80 p-5 sm:p-8">
        
        <!-- Glowing Ambient Lighting Behind Cards -->
        <div class="absolute -right-16 -top-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <!-- Left: Game Spotlight Copy -->
          <div class="space-y-3.5 max-w-xl text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 text-xs font-heading font-black tracking-wide shadow-xs">
              <span class="animate-ping text-[10px]">🔥</span>
              <span>GAME PILIHAN HARI INI</span>
              <span class="text-white/60">•</span>
              <span class="text-white/90">Paling Digemari</span>
            </div>

            <div class="space-y-1.5">
              <h1 class="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white drop-shadow-sm">
                Balon Gelembung Angka 🎈
              </h1>
              <p class="text-xs sm:text-sm text-slate-300 font-body leading-relaxed max-w-lg">
                Uji refleks dan kejelianmu! Pecahkan gelembung angka secara berurutan secepat mungkin sebelum waktu habis. Dapatkan bintang & koin ekstra!
              </p>
            </div>

            <!-- Meta Badges & Rewards -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-heading font-bold">
              <span class="px-3 py-1 bg-white/10 rounded-xl border border-white/15 text-white flex items-center gap-1.5">
                <span>⏱️</span> 60 Detik
              </span>
              <span class="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-xl flex items-center gap-1.5">
                <span>⭐</span> +30 XP Bonus
              </span>
              <span class="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-xl flex items-center gap-1.5">
                <span>🪙</span> +25 Koin
              </span>
              <span class="px-3 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-200 rounded-xl flex items-center gap-1.5">
                <span>👦</span> Usia 4–8 Thn
              </span>
            </div>

            <!-- Spotlight CTA Button -->
            <div class="pt-2">
              <NuxtLink 
                to="/games/bubble-pop" 
                @click="playPopSound"
                class="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-2xl font-heading font-black text-sm sm:text-base shadow-lg border-b-4 border-[#3b8a02] active:translate-y-1 active:border-b-0 transition-all cursor-pointer group"
              >
                <span>🎮 MAIN SEKARANG</span>
                <span class="group-hover:translate-x-1 transition-transform">➔</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Right: Visual Arcade Showcase Card -->
          <div class="relative shrink-0 w-full sm:w-80 lg:w-72">
            <div class="bg-gradient-to-b from-indigo-900/80 to-purple-900/80 border-2 border-indigo-400/40 rounded-3xl p-5 shadow-2xl backdrop-blur-md space-y-4 text-center">
              
              <!-- Floating Bubble Illustration Container -->
              <div class="relative h-36 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-radial from-purple-500/20 to-transparent"></div>
                <!-- Mini Floating Bubbles -->
                <div class="absolute top-3 left-4 w-9 h-9 rounded-full bg-sky-400/30 border border-sky-300/60 flex items-center justify-center text-xs font-heading font-black text-white animate-bounce-slow">
                  1
                </div>
                <div class="absolute bottom-4 left-10 w-11 h-11 rounded-full bg-emerald-400/30 border border-emerald-300/60 flex items-center justify-center text-sm font-heading font-black text-white animate-bounce">
                  2
                </div>
                <div class="absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-400/30 border border-amber-300/60 flex items-center justify-center text-base font-heading font-black text-white animate-pulse">
                  3
                </div>
                <div class="text-5xl drop-shadow-md select-none">
                  🎈
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-xs font-heading font-black text-purple-200">
                  Mode: Tantangan Refleks
                </div>
                <div class="text-[11px] text-slate-400 font-medium">
                  Sangat disukai untuk pemanasan sebelum belajar kuis utama!
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      <!-- ===================================================================== -->
      <!-- 2. CATALOG HEADER CONTROLS (CATEGORY GENRES & SEARCH BAR)             -->
      <!-- ===================================================================== -->
      <section class="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-2xs space-y-4">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <!-- Left: Title & Count -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-900 flex items-center justify-center text-xl shrink-0 shadow-xs">
              🕹️
            </div>
            <div>
              <h2 class="font-heading font-black text-lg sm:text-xl text-slate-800 leading-tight">
                Pilihan Game & Arena Belajar
              </h2>
              <p class="text-xs text-slate-500 font-heading font-medium">
                {{ filteredGames.length }} Game edukasi ramah anak siap dimainkan
              </p>
            </div>
          </div>

          <!-- Right: Instant Live Search Bar -->
          <div class="relative w-full md:w-72">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari game (misal: balon, warna, tracing)..."
              class="w-full pl-10 pr-4 py-2.5 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm font-heading font-bold text-slate-800 rounded-2xl border-2 border-slate-200 focus:border-[#58cc02] focus:outline-none transition-all placeholder:text-slate-400"
            />
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-black cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Genre Category Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar pt-1 border-t border-slate-100">
          <button 
            v-for="genre in genreOptions" 
            :key="genre.id"
            @click="activeGenre = genre.id; playPopSound()"
            type="button"
            class="px-3.5 py-2 rounded-2xl font-heading font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 border-2 active:scale-95"
            :class="activeGenre === genre.id 
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'"
          >
            <span>{{ genre.icon }}</span>
            <span>{{ genre.label }}</span>
          </button>
        </div>

      </section>

      <!-- ===================================================================== -->
      <!-- 3. GAME CATALOG GRID (REAL GAME CARDS, ANTI-AI-SLOP)                  -->
      <!-- ===================================================================== -->
      <section v-if="filteredGames.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        
        <div 
          v-for="game in filteredGames" 
          :key="game.id"
          class="bg-white rounded-3xl border-3 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
        >
          <!-- Card Visual Header Banner -->
          <div 
            class="relative h-44 p-4 flex flex-col justify-between overflow-hidden"
            :class="game.bannerBg"
          >
            <!-- Pattern Overlay -->
            <div 
              class="absolute inset-0 opacity-15 pointer-events-none select-none"
              style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 16px 16px;"
            ></div>

            <!-- Top Pill Badges -->
            <div class="relative z-10 flex items-center justify-between gap-2">
              <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-heading font-black text-slate-800 shadow-2xs border border-white">
                {{ game.badge }}
              </span>

              <span class="px-2.5 py-1 bg-black/30 backdrop-blur-md text-white rounded-xl text-[10px] font-heading font-black flex items-center gap-1">
                <span>⭐</span> +{{ game.xpReward }} XP
              </span>
            </div>

            <!-- Center Icon / Illustration Mockup -->
            <div class="relative z-10 flex items-center justify-center my-auto">
              <div class="w-18 h-18 rounded-3xl bg-white/95 border-3 border-white/90 shadow-md flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 select-none">
                {{ game.icon }}
              </div>
            </div>

            <!-- Bottom Genre Pill -->
            <div class="relative z-10 flex items-center justify-between text-[11px] font-heading font-extrabold text-white drop-shadow-xs">
              <span>{{ game.genreLabel }}</span>
              <span>{{ game.duration }}</span>
            </div>
          </div>

          <!-- Card Body Details -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            
            <div class="space-y-1.5">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-base sm:text-lg font-heading font-black text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {{ game.title }}
                </h3>
              </div>
              <p class="text-xs text-slate-500 font-body leading-relaxed line-clamp-2">
                {{ game.description }}
              </p>
            </div>

            <!-- Key Skill & Reward Tag Chips -->
            <div class="space-y-3 pt-1">
              <div class="flex flex-wrap items-center gap-1.5 text-[10px] font-heading font-black">
                <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200/80">
                  🎯 {{ game.skillTarget }}
                </span>
                <span class="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                  🪙 +{{ game.coinReward }} Koin
                </span>
                <span v-if="game.targetAge" class="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-200">
                  👶 {{ game.targetAge }}
                </span>
              </div>

              <!-- 3D Play Button -->
              <NuxtLink 
                :to="game.targetPath" 
                @click="playPopSound"
                class="w-full py-3 rounded-2xl text-white font-heading font-black text-xs sm:text-sm shadow-md border-b-4 flex items-center justify-center gap-2 active:translate-y-1 active:border-b-0 transition-all cursor-pointer"
                :class="game.ctaClass"
              >
                <span>{{ game.ctaText }}</span>
                <span>➔</span>
              </NuxtLink>
            </div>

          </div>

        </div>

      </section>

      <!-- ===================================================================== -->
      <!-- EMPTY STATE: IF NO GAMES MATCH SEARCH FILTER                          -->
      <!-- ===================================================================== -->
      <section v-else class="bg-white rounded-3xl p-10 sm:p-14 text-center border-3 border-dashed border-slate-200 space-y-4 max-w-md mx-auto">
        <div class="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 text-3xl flex items-center justify-center mx-auto animate-bounce-slow">
          🔍
        </div>
        <div class="space-y-1">
          <h3 class="font-heading font-black text-lg text-slate-800">
            Game Tidak Ditemukan
          </h3>
          <p class="text-xs text-slate-500 leading-relaxed font-medium">
            Tidak ada game yang cocok dengan pencarian "{{ searchQuery }}". Coba gunakan kata kunci lain ya!
          </p>
        </div>
        <div>
          <button 
            @click="searchQuery = ''; activeGenre = 'all'" 
            type="button"
            class="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-heading font-black text-xs active:scale-95 transition-transform cursor-pointer"
          >
            Tampilkan Semua Game
          </button>
        </div>
      </section>

      <!-- ===================================================================== -->
      <!-- 4. BOTTOM EDUCATIONAL VALUE BANNER                                    -->
      <!-- ===================================================================== -->
      <section class="rounded-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border-2 border-amber-300/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-amber-950">
        <div class="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-amber-500 text-2xl flex items-center justify-center shrink-0 shadow-xs">
          💡
        </div>
        <div class="space-y-0.5 text-center sm:text-left flex-1">
          <h4 class="font-heading font-black text-sm text-amber-950">
            Keseimbangan Belajar & Bermain (Screen Time Bermanfaat)
          </h4>
          <p class="text-xs text-amber-900/80 font-medium leading-relaxed">
            Seluruh mini game di Pintara dirancang khusus tanpa unsur kekerasan, tanpa iklan mengganggu, dan berfokus melatih motorik, seni, refleks, serta kecerdasan spasial anak usia dini.
          </p>
        </div>
        <NuxtLink 
          to="/course" 
          class="px-4 py-2 bg-amber-950 hover:bg-slate-900 text-amber-200 rounded-xl text-xs font-heading font-black shadow-xs transition-transform active:scale-95 shrink-0"
        >
          Kembali Belajar 🗺️
        </NuxtLink>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppTopBar from '~/components/app/AppTopBar.vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const { playPop } = useSoundEffects()

const playPopSound = () => {
  try {
    playPop()
  } catch (e) {}
}

const activeGenre = ref('all')
const searchQuery = ref('')

const genreOptions = [
  { id: 'all', label: 'Semua Games', icon: '🕹️' },
  { id: 'reflex', label: 'Refleks & Aksi', icon: '⚡' },
  { id: 'art', label: 'Seni & Mewarnai', icon: '🎨' },
  { id: 'tracing', label: 'Motorik & Menulis', icon: '✏️' },
  { id: 'music', label: 'Musik & Lagu', icon: '🎵' },
  { id: 'rewards', label: 'Hadiah & Stiker', icon: '🏆' }
]

interface GameItem {
  id: string
  title: string
  description: string
  icon: string
  genre: string
  genreLabel: string
  duration: string
  badge: string
  xpReward: number
  coinReward: number
  skillTarget: string
  targetAge: string
  targetPath: string
  bannerBg: string
  ctaClass: string
  ctaText: string
}

const gamesList: GameItem[] = [
  {
    id: 'bubble-pop',
    title: 'Balon Gelembung Angka',
    description: 'Pecahkan gelembung angka secara berurutan dari terkecil ke terbesar secepat mungkin sebelum waktu habis!',
    icon: '🎈',
    genre: 'reflex',
    genreLabel: 'Refleks & Kecepatan',
    duration: '1–2 Mnt',
    badge: '🔥 Paling Populer',
    xpReward: 30,
    coinReward: 25,
    skillTarget: 'Refleks & Urutan Nomor',
    targetAge: 'TK A, TK B, SD 1',
    targetPath: '/games/bubble-pop',
    bannerBg: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
    ctaClass: 'bg-purple-600 hover:bg-purple-500 border-purple-800',
    ctaText: 'Main Game'
  },
  {
    id: 'coloring-canvas',
    title: 'Mewarnai Sesuai Angka',
    description: 'Pilih palet warna sesuai kode angka untuk menghasilkan lukisan hewan lucu dan pemandangan alam yang indah.',
    icon: '🎨',
    genre: 'art',
    genreLabel: 'Seni & Ketelitian',
    duration: 'Santai / Mandiri',
    badge: '12 Sketsa Gambar',
    xpReward: 25,
    coinReward: 20,
    skillTarget: 'Warna, Bentuk & Estetika',
    targetAge: 'Semua Usia',
    targetPath: '/coloring',
    bannerBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white',
    ctaClass: 'bg-sky-500 hover:bg-sky-400 border-blue-700',
    ctaText: 'Mulai Melukis'
  },
  {
    id: 'tracing-numbers',
    title: 'Latihan Menulis & Tracing',
    description: 'Tarik garis putus-putus dengan jari atau stylus untuk melatih anak memegang pensil dan menulis angka 1–10 secara rapi.',
    icon: '✏️',
    genre: 'tracing',
    genreLabel: 'Motorik Halus',
    duration: '10 Lembar Angka',
    badge: '✨ Rekomendasi Guru',
    xpReward: 25,
    coinReward: 20,
    skillTarget: 'Grip Pensil & Menulis',
    targetAge: 'TK A & TK B',
    targetPath: '/tracing',
    bannerBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
    ctaClass: 'bg-[#58cc02] hover:bg-[#46a302] border-[#3b8a02]',
    ctaText: 'Mulai Tracing'
  },
  {
    id: 'nursery-rhymes',
    title: 'Lagu & Irama Berhitung',
    description: 'Dengarkan musik ceria dan bernyanyi bersama lirik interaktif untuk mengenal angka, hewan, dan lingkungan sekitar.',
    icon: '🎵',
    genre: 'music',
    genreLabel: 'Auditori & Musik',
    duration: '8 Lagu Ceria',
    badge: 'Karaoke Anak',
    xpReward: 20,
    coinReward: 15,
    skillTarget: 'Ritme, Kosakata & Lagu',
    targetAge: 'Semua Usia',
    targetPath: '/nursery-rhymes',
    bannerBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white',
    ctaClass: 'bg-rose-500 hover:bg-rose-400 border-rose-700',
    ctaText: 'Dengarkan Musik'
  },
  {
    id: 'sticker-album',
    title: 'Album Stiker & Trofi Kiko',
    description: 'Buka peti harta karun, koleksi stiker lucu maskot Kiko, dan pasang pada lembar stiker prestasimu!',
    icon: '🏆',
    genre: 'rewards',
    genreLabel: 'Pencapaian & Stiker',
    duration: 'Koleksi Bintang',
    badge: '⭐ Reward Pencapaian',
    xpReward: 35,
    coinReward: 30,
    skillTarget: 'Motivasi & Apresiasi Diri',
    targetAge: 'Semua Usia',
    targetPath: '/stickers',
    bannerBg: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
    ctaClass: 'bg-amber-500 hover:bg-amber-400 border-amber-700 text-amber-950',
    ctaText: 'Buka Lembar Stiker'
  },
  {
    id: 'course-challenge',
    title: 'Petualangan Soal Marathon',
    description: 'Taklukkan seluruh pos petualangan dengan 29 jenis variasi kuis bergambar, logika, teka-teki, dan timbangan!',
    icon: '🗺️',
    genre: 'reflex',
    genreLabel: 'Petualangan Belajar',
    duration: 'Jalur Bioma',
    badge: '👑 Modul Lengkap',
    xpReward: 50,
    coinReward: 40,
    skillTarget: 'Matematika & Logika 360°',
    targetAge: 'TK B & SD 1',
    targetPath: '/course?id=course_24_types_1unit',
    bannerBg: 'bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white',
    ctaClass: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-800',
    ctaText: 'Jelajahi Peta'
  }
]

const filteredGames = computed(() => {
  let list = gamesList

  // 1. Filter by Genre
  if (activeGenre.value !== 'all') {
    list = list.filter(g => g.genre === activeGenre.value)
  }

  // 2. Filter by Search Query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(g => 
      g.title.toLowerCase().includes(q) || 
      g.description.toLowerCase().includes(q) || 
      g.skillTarget.toLowerCase().includes(q) ||
      g.genreLabel.toLowerCase().includes(q)
    )
  }

  return list
})

useSeoMeta({
  title: 'Katalog Games & Arena Kreasi Anak — Pintara',
  description: 'Pilih game edukasi seru, melukis warna, menulis angka, mendengarkan lagu berhitung, dan kumpulkan stiker maskot di Pintara!'
})
</script>

<style scoped>
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-bounce-slow {
  animation: bounceSlow 2.5s infinite ease-in-out;
}
</style>
