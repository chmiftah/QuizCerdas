<template>
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-4 py-2.5 shadow-2xs">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-2">
      <!-- App Brand Logo & Desktop Navigation Links -->
      <div class="flex items-center gap-3 lg:gap-6">
        <NuxtLink to="/" class="flex items-center gap-2 group active:scale-95 transition-transform">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white font-heading text-lg sm:text-xl shadow-duo-green group-hover:scale-105 transition-transform">
            🦉
          </div>
          <div>
            <span class="font-heading text-lg sm:text-xl font-black text-duo-green tracking-tight">Counting</span>
            <span class="font-heading text-lg sm:text-xl font-black text-duo-blue tracking-tight">Duo</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Tabs (Hidden on Mobile) -->
        <nav class="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          <NuxtLink 
            to="/" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all"
            exact-active-class="bg-white text-slate-800 shadow-2xs"
          >
            🏠 Beranda
          </NuxtLink>

          <NuxtLink 
            to="/catalog" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all"
            active-class="bg-white text-slate-800 shadow-2xs"
          >
            📚 Katalog
          </NuxtLink>

          <NuxtLink 
            to="/leaderboard" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all flex items-center gap-1.5 relative"
            active-class="bg-white text-slate-800 shadow-2xs"
          >
            <span>🏆</span>
            <span>Liga & Misi</span>
            <span 
              v-if="userStore.unclaimedQuestsCount > 0" 
              class="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce shadow-xs"
            >
              {{ userStore.unclaimedQuestsCount }}
            </span>
          </NuxtLink>

        

          <!-- Aktivitas Dropdown Menu -->
          <div class="relative">
            <button 
              @click="showActivitiesMenu = !showActivitiesMenu"
              type="button"
              class="px-3.5 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
              :class="isActivityActive ? 'bg-duo-blue text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'"
            >
              <span>🎯</span>
              <span>Aktivitas</span>
              <ChevronDown class="w-3.5 h-3.5 transition-transform duration-200" :class="{ 'rotate-180': showActivitiesMenu }" />
            </button>

            <!-- Dropdown Menu Content -->
            <div 
              v-if="showActivitiesMenu" 
              @click.outside="showActivitiesMenu = false"
              class="absolute left-0 mt-2 w-60 bg-white rounded-2xl border-2 border-duo-gray-100 shadow-xl p-2 z-50 animate-pop space-y-1"
            >
              <div class="px-3 py-1.5 border-b border-slate-100">
                <span class="font-heading font-black text-[10px] text-slate-400 uppercase tracking-wider">Aktivitas & Fitur Extra</span>
              </div>

              <NuxtLink 
                to="/tracing" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                active-class="bg-emerald-50 text-emerald-700"
              >
                <span class="text-base">✏️</span>
                <div class="flex flex-col">
                  <span>Menulis & Tracing</span>
                  <span class="text-[10px] font-normal text-slate-400">Latihan menulis angka & huruf</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/games/bubble-pop" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                active-class="bg-sky-50 text-sky-700"
              >
                <span class="text-base">🎈</span>
                <div class="flex flex-col">
                  <span>Game Balon Angka</span>
                  <span class="text-[10px] font-normal text-slate-400">Permainan meletuskan balon</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/coloring" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                active-class="bg-amber-50 text-amber-700"
              >
                <span class="text-base">🎨</span>
                <div class="flex flex-col">
                  <span>Mewarnai Ceria</span>
                  <span class="text-[10px] font-normal text-slate-400">Kreasi gambar & warna</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/nursery-rhymes" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                active-class="bg-purple-50 text-purple-700"
              >
                <span class="text-base">🎵</span>
                <div class="flex flex-col">
                  <span>Lagu Anak Edukatif</span>
                  <span class="text-[10px] font-normal text-slate-400">Musik & nyanyian anak</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                v-if="userStore.isLoggedIn"
                to="/shop" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-yellow-50 hover:text-yellow-800 transition-colors"
                active-class="bg-yellow-50 text-yellow-800"
              >
                <span class="text-base">🛍️</span>
                <div class="flex flex-col">
                  <span>Toko Kiko</span>
                  <span class="text-[10px] font-normal text-slate-400">Tukar XP dengan kostum</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                v-if="userStore.isLoggedIn"
                to="/stickers" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                active-class="bg-indigo-50 text-indigo-700"
              >
                <span class="text-base">⭐</span>
                <div class="flex flex-col">
                  <span>Koleksi Stikerku</span>
                  <span class="text-[10px] font-normal text-slate-400">Album stiker prestasi</span>
                </div>
              </NuxtLink>

              <div class="border-t border-slate-100 my-1"></div>

              <NuxtLink 
                to="/parent-dashboard" 
                @click="showActivitiesMenu = false"
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                active-class="bg-slate-100 text-slate-900"
              >
                <span class="text-base">📊</span>
                <div class="flex flex-col">
                  <span>Area Orang Tua</span>
                  <span class="text-[10px] font-normal text-slate-400">Laporan & statistik belajar</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>

      <!-- Gamification Indicators & Auth Profile -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Gamification Indicators (Only when logged in) -->
        <template v-if="userStore.isLoggedIn">
          <!-- Streak Indicator -->
          <div class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-orange-50 border sm:border-2 border-orange-200 text-duo-orange-dark font-heading font-bold text-[11px] sm:text-sm shadow-2xs" title="Streak Hari Ini">
            <Flame class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-orange text-duo-orange animate-pulse" />
            <span>{{ userStore.streak }}</span>
          </div>

          <!-- XP Badge -->
          <div class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-50 border sm:border-2 border-amber-200 text-amber-800 font-heading font-bold text-[11px] sm:text-sm shadow-2xs" title="Total XP Kamu">
            <Zap class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-yellow text-duo-yellow-dark" />
            <span class="font-extrabold">{{ userStore.xp }} <span class="hidden sm:inline">XP</span></span>
          </div>

          <!-- Hearts Indicator -->
          <div 
            @click="showHeartModal = true"
            class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-rose-50 border sm:border-2 border-rose-200 text-rose-600 font-heading font-bold text-[11px] sm:text-sm shadow-2xs cursor-pointer hover:bg-rose-100 transition-colors" 
            title="Nyawa Kamu (Klik untuk isi)"
          >
            <Heart class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-red text-duo-red" />
            <span>{{ userStore.hearts }}</span>
          </div>
        </template>

        <!-- User Profile Dropdown or Auth Buttons -->
        <div v-if="userStore.isLoggedIn" class="relative">
          <button 
            @click="showProfileMenu = !showProfileMenu"
            type="button"
            class="flex items-center gap-1.5 pl-2 pr-3 py-1 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors font-heading text-xs font-bold text-slate-700 cursor-pointer"
          >
            <span class="text-base sm:text-lg">{{ userStore.userAvatar }}</span>
            <span class="hidden md:inline max-w-[100px] truncate">{{ userStore.userDisplayName }}</span>
            <ChevronDown class="w-3.5 h-3.5 text-slate-500" />
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="showProfileMenu" 
            @click.outside="showProfileMenu = false"
            class="absolute right-0 mt-2 w-48 bg-white rounded-2xl border-2 border-duo-gray-100 shadow-xl py-2 z-50 animate-pop space-y-1"
          >
            <div class="px-3 py-2 border-b border-slate-100">
              <p class="font-heading font-extrabold text-xs text-slate-800">{{ userStore.userDisplayName }}</p>
              <p class="text-[10px] text-slate-500 truncate">{{ userStore.currentUser?.email }}</p>
              <span class="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-duo-blue rounded-md font-heading font-extrabold text-[10px]">
                {{ userStore.currentUser?.grade || 'Siswa' }}
              </span>
            </div>

            <NuxtLink 
              v-if="userStore.isAdmin"
              to="/admin" 
              @click="showProfileMenu = false"
              class="w-full px-3 py-2 text-left text-xs font-heading font-extrabold text-purple-700 hover:bg-purple-50 flex items-center gap-2"
            >
              <span>🛡️</span> Dashboard Admin
            </NuxtLink>

            <button 
              @click="handleToggleAdmin"
              class="w-full px-3 py-2 text-left text-xs font-heading font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
            >
              <span class="flex items-center gap-2">
                <span>⚙️</span> Switch Admin Mode
              </span>
              <span class="px-1.5 py-0.5 text-[9px] rounded font-black uppercase" :class="userStore.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'">
                {{ userStore.isAdmin ? 'ON' : 'OFF' }}
              </span>
            </button>

            <NuxtLink 
              to="/shop" 
              @click="showProfileMenu = false"
              class="w-full px-3 py-2 text-left text-xs font-heading font-extrabold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
            >
              <span>🛍️</span> Toko Kostum & Hadiah XP
            </NuxtLink>

            <NuxtLink 
              to="/catalog" 
              @click="showProfileMenu = false"
              class="w-full px-3 py-2 text-left text-xs font-heading font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <span>📚</span> Dashboard Katalog
            </NuxtLink>

            <button 
              @click="handleLogout"
              class="w-full px-3 py-2 text-left text-xs font-heading font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
            >
              <span>🚪</span> Keluar Akun
            </button>
          </div>
        </div>

        <div v-else class="flex items-center gap-1 sm:gap-2">
          <NuxtLink 
            to="/login"
            class="px-3 py-1.5 rounded-xl font-heading font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Masuk
          </NuxtLink>
          <NuxtLink 
            to="/register"
            class="px-3 py-1.5 rounded-xl duo-btn-green text-xs font-heading font-extrabold py-1.5"
          >
            Daftar Gratis
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Heart Refill Modal -->
    <Teleport to="body">
      <div v-if="showHeartModal && userStore.isLoggedIn" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-pop">
        <div class="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-duo-gray-100 shadow-2xl text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-rose-100 mx-auto flex items-center justify-center text-duo-red">
            <Heart class="w-10 h-10 fill-duo-red animate-bounce" />
          </div>
          <h3 class="font-heading text-2xl text-slate-800 font-bold">Nyawa Kamu</h3>
          <p class="text-slate-600 text-sm">
            Kamu punya <strong class="text-duo-red">{{ userStore.hearts }} / {{ userStore.maxHearts }}</strong> nyawa tersisa. Setiap kali salah menjawab soal, nyawa berkurang 1.
          </p>

          <div class="pt-2 space-y-2">
            <button 
              @click="refill" 
              class="w-full duo-btn-red py-3 text-base"
            >
              ❤️ Isi Penuh Nyawa (Gratis)
            </button>
            <button 
              @click="confirmReset" 
              class="w-full py-2 text-xs font-heading font-bold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              🔄 Reset Total Semua Progress (XP, Pelajaran & Checkpoint)
            </button>
            <button 
              @click="showHeartModal = false" 
              class="w-full duo-btn-gray py-2 text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </header>

  <!-- Mobile Bottom Navigation Bar -->
  <MobileBottomNav />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { Flame, Zap, Heart, ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const userStore = useUserStore()

const showHeartModal = ref(false)
const showProfileMenu = ref(false)
const showActivitiesMenu = ref(false)

const isActivityActive = computed(() => {
  const path = route.path
  return ['/tracing', '/games/bubble-pop', '/coloring', '/nursery-rhymes', '/shop', '/stickers', '/parent-dashboard'].some(p => path.startsWith(p))
})

const refill = () => {
  userStore.refillHearts()
  showHeartModal.value = false
}

const handleLogout = () => {
  userStore.logout()
  showProfileMenu.value = false
  navigateTo('/')
}

const handleToggleAdmin = () => {
  userStore.toggleAdminRole()
  showProfileMenu.value = false
  if (userStore.isAdmin) {
    navigateTo('/admin')
  } else {
    navigateTo('/')
  }
}

const confirmReset = () => {
  if (confirm('Apakah kamu yakin ingin MERESET TOTAL semua progres belajar, XP, dan checkpoint kembali ke 0?')) {
    userStore.resetProgress()
    if (import.meta.client) {
      localStorage.clear()
      window.location.href = '/'
    }
  }
}
</script>
