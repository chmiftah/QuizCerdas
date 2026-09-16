<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50/70 via-slate-50 to-amber-50/40 flex flex-col font-body">
    <!-- Game App Top Bar -->
    <AppTopBar />

    <main class="max-w-5xl mx-auto w-full px-4 py-6 sm:py-8 flex-1 space-y-6 pb-28">
      <!-- Header Banner Arena Kreasi -->
      <div class="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-white">
        <div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div class="space-y-2 max-w-xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-heading font-black">
              <span>🎨</span>
              <span>Zona Bermain & Berkreasi</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-heading font-black tracking-tight">
              Arena Kreasi & Game Kiko!
            </h1>
            <p class="text-xs sm:text-sm text-purple-100 font-body leading-relaxed">
              Asah kreativitas motorik dan refleksmu lewat game seru, mewarnai gambar, menulis angka, dan bernyanyi bersama maskot Kiko!
            </p>
          </div>

          <!-- Kiko Mascot Visual Badge -->
          <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-4xl sm:text-6xl shadow-inner animate-bounce-slow shrink-0">
            🦉
          </div>
        </div>

        <!-- Decorative background circles -->
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -left-10 -top-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <!-- Grid 4 Kartu Aktivitas Utama -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        
        <!-- 1. Menulis & Tracing -->
        <NuxtLink 
          to="/tracing" 
          @click="playPopSound"
          class="group bg-white rounded-3xl p-6 border-3 border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                ✏️
              </div>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-heading font-black border border-emerald-200">
                10 Lembar Angka
              </span>
            </div>

            <div class="space-y-1">
              <h2 class="text-lg sm:text-xl font-heading font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                Latihan Menulis & Tracing
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 font-body leading-relaxed">
                Tarik garis putus-putus dengan jarimu untuk belajar menulis angka 1–10 dengan gerakan rapi dan mandiri.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs font-heading font-bold text-emerald-600 flex items-center gap-1">
              <span>🟢</span> Motorik Halus
            </span>
            <span class="px-4 py-2 rounded-xl bg-emerald-500 group-hover:bg-emerald-600 text-white font-heading font-black text-xs shadow-sm flex items-center gap-1">
              <span>Mulai Tulis</span>
              <span>➔</span>
            </span>
          </div>
        </NuxtLink>

        <!-- 2. Mewarnai Gambar (Coloring) -->
        <NuxtLink 
          to="/coloring" 
          @click="playPopSound"
          class="group bg-white rounded-3xl p-6 border-3 border-sky-200 hover:border-sky-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-800 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                🎨
              </div>
              <span class="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-[11px] font-heading font-black border border-sky-200">
                12 Sketsa Menarik
              </span>
            </div>

            <div class="space-y-1">
              <h2 class="text-lg sm:text-xl font-heading font-black text-slate-800 group-hover:text-sky-600 transition-colors">
                Mewarnai Sesuai Angka
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 font-body leading-relaxed">
                Pilih palet warna sesuai kode nomor untuk menghasilkan lukisan hewan lucu dan pemandangan alam yang indah.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs font-heading font-bold text-sky-600 flex items-center gap-1">
              <span>🔵</span> Seni & Ketelitian
            </span>
            <span class="px-4 py-2 rounded-xl bg-sky-500 group-hover:bg-sky-600 text-white font-heading font-black text-xs shadow-sm flex items-center gap-1">
              <span>Mulai Warna</span>
              <span>➔</span>
            </span>
          </div>
        </NuxtLink>

        <!-- 3. Bubble Pop Game -->
        <NuxtLink 
          to="/games/bubble-pop" 
          @click="playPopSound"
          class="group bg-white rounded-3xl p-6 border-3 border-violet-200 hover:border-violet-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-14 h-14 rounded-2xl bg-violet-100 border-2 border-violet-300 text-violet-800 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                🫧
              </div>
              <span class="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-[11px] font-heading font-black border border-violet-200">
                Mini Game Refleks
              </span>
            </div>

            <div class="space-y-1">
              <h2 class="text-lg sm:text-xl font-heading font-black text-slate-800 group-hover:text-violet-600 transition-colors">
                Balon Gelembung Angka
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 font-body leading-relaxed">
                Pecahkan balon angka yang melayang secara berurutan dari terkecil ke terbesar secepat mungkin!
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs font-heading font-bold text-violet-600 flex items-center gap-1">
              <span>🟣</span> Refleks & Logika
            </span>
            <span class="px-4 py-2 rounded-xl bg-violet-500 group-hover:bg-violet-600 text-white font-heading font-black text-xs shadow-sm flex items-center gap-1">
              <span>Main Game</span>
              <span>➔</span>
            </span>
          </div>
        </NuxtLink>

        <!-- 4. Lagu & Irama Edukasi (Nursery Rhymes) -->
        <NuxtLink 
          to="/nursery-rhymes" 
          @click="playPopSound"
          class="group bg-white rounded-3xl p-6 border-3 border-rose-200 hover:border-rose-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="w-14 h-14 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-800 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                🎵
              </div>
              <span class="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-[11px] font-heading font-black border border-rose-200">
                8 Lagu Interaktif
              </span>
            </div>

            <div class="space-y-1">
              <h2 class="text-lg sm:text-xl font-heading font-black text-slate-800 group-hover:text-rose-600 transition-colors">
                Lagu Berhitung & Riang
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 font-body leading-relaxed">
                Dengarkan musik ceria dan bernyanyi bersama lirik interaktif untuk mengenal angka, hewan, dan benda di sekitar.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <span class="text-xs font-heading font-bold text-rose-600 flex items-center gap-1">
              <span>🔴</span> Auditori & Ritme
            </span>
            <span class="px-4 py-2 rounded-xl bg-rose-500 group-hover:bg-rose-600 text-white font-heading font-black text-xs shadow-sm flex items-center gap-1">
              <span>Dengarkan</span>
              <span>➔</span>
            </span>
          </div>
        </NuxtLink>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppTopBar from '~/components/app/AppTopBar.vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const { playPop } = useSoundEffects()

const playPopSound = () => {
  try {
    playPop()
  } catch (e) {
    // Ignore audio error
  }
}

useSeoMeta({
  title: 'Arena Kreasi & Game Edukasi — Pintara',
  description: 'Latihan menulis angka, mewarnai gambar digital, bermain gelembung angka dan bernyanyi bersama Kiko!'
})
</script>

<style scoped>
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow {
  animation: bounceSlow 3s infinite ease-in-out;
}
</style>
