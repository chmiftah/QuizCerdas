<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200/90 px-3 sm:px-6 py-2.5 shadow-2xs">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- Sisi Kiri: Maskot Kiko & Identitas Petualang -->
      <div class="flex items-center gap-2 sm:gap-3">
        <NuxtLink 
          to="/course" 
          class="flex items-center gap-2 group active:scale-95 transition-transform" 
          title="Kembali ke Peta Petualangan"
        >
          <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#58cc02] border-2 border-emerald-600 flex items-center justify-center text-white font-heading text-lg sm:text-2xl shadow-duo-green group-hover:scale-105 transition-transform">
            🦉
          </div>
          <div class="hidden sm:flex flex-col leading-none">
            <span class="font-heading text-base font-black text-slate-800">
              {{ userStore.currentUser?.name || 'Petualang Cilik' }}
            </span>
            <span class="text-[11px] font-heading font-bold text-slate-400 flex items-center gap-1">
              <span v-if="userStore.isPro" class="text-amber-500 font-extrabold">👑 Pro Explorer</span>
              <span v-else-if="!userStore.isAuthenticated" class="text-sky-500 font-bold">⚡ Mode Tamu</span>
              <span v-else class="text-emerald-600">Level 1 • Murid Cerdas</span>
            </span>
          </div>
        </NuxtLink>

        <!-- Guest Save Account Prompt (Tamu) -->
        <NuxtLink 
          v-if="!userStore.isAuthenticated" 
          to="/register" 
          class="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs font-heading font-extrabold shadow-2xs transition-transform active:scale-95"
        >
          <span>💾</span>
          <span>Simpan Progres (Daftar)</span>
        </NuxtLink>
      </div>

      <!-- Sisi Tengah: Gamified Resource Counters (Streak, Koin, Nyawa) -->
      <div class="flex items-center gap-1.5 sm:gap-3 bg-slate-100/90 p-1 sm:p-1.5 rounded-2xl border border-slate-200">
        
        <!-- 1. Streak Hari -->
        <div class="flex items-center gap-1 px-2 py-1 rounded-xl text-xs sm:text-sm font-heading font-black text-orange-600 hover:bg-white/80 transition-colors" title="Hari berturut-turut belajar">
          <span class="text-sm sm:text-base animate-pulse">🔥</span>
          <span>{{ userStore.streak || 1 }}</span>
        </div>

        <!-- 2. Koin Kiko -->
        <NuxtLink 
          to="/shop" 
          class="flex items-center gap-1.5 px-2 py-1 rounded-xl text-xs sm:text-sm font-heading font-black text-amber-600 hover:bg-white/80 transition-colors cursor-pointer" 
          title="Buka Toko Kustom Kiko"
        >
          <!-- Vector 3D Gold Coin (Universal Cross-Platform) -->
          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 drop-shadow-2xs select-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
            <circle cx="12" cy="12" r="7.5" fill="#FCD34D"/>
            <polygon points="12,6.5 13.7,10 17.5,10.5 14.7,13.2 15.4,17 12,15.2 8.6,17 9.3,13.2 6.5,10.5 10.3,10" fill="#B45309"/>
          </svg>
          <span>{{ userStore.coins || 0 }}</span>
        </NuxtLink>

        <!-- 3. Nyawa (Hearts) -->
        <div 
          @click="openRefillModal" 
          class="flex items-center gap-1 px-2 py-1 rounded-xl text-xs sm:text-sm font-heading font-black text-rose-600 hover:bg-white/80 transition-colors cursor-pointer" 
          title="Jumlah Nyawa Kamu"
        >
          <span class="text-sm sm:text-base">❤️</span>
          <span>{{ userStore.isPro ? '∞' : (userStore.hearts ?? 5) }}</span>
        </div>

      </div>

      <!-- Sisi Kanan: Area Orang Tua (Protected) & Akun -->
      <div class="flex items-center gap-1.5 sm:gap-3">
        
        <!-- Tombol Khusus Area Orang Tua (Hanya tampil jika sudah login & bukan akun tamu) -->
        <button 
          v-if="userStore.isAuthenticated && userStore.currentUser?.role !== 'guest'"
          @click="openParentArea" 
          type="button" 
          class="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-heading font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 transition-all"
          title="Area Khusus Orang Tua (Laporan & Pengaturan)"
        >
          <span class="text-sm sm:text-base">👨‍👩‍👧</span>
          <span class="hidden sm:inline">Area Ortu</span>
          <span class="text-[10px] text-amber-700">🔒</span>
        </button>

        <!-- Tombol Pintara Pro jika belum berlangganan -->
        <button 
          v-if="!userStore.isPro"
          @click="openProModal" 
          type="button"
          class="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-extrabold text-xs border-b-2 border-amber-600 shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <span>👑</span>
          <span>Dapatkan Pro</span>
        </button>

        <!-- Avatar / User Profile Dropdown -->
        <div class="relative">
          <button 
            @click="showProfileMenu = !showProfileMenu" 
            type="button"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-lg cursor-pointer active:scale-95 transition-transform"
            aria-label="Menu Pengguna"
          >
            {{ userStore.currentUser?.avatar || '🧒' }}
          </button>

          <!-- Dropdown Profile Mini -->
          <div 
            v-if="showProfileMenu" 
            @click.outside="showProfileMenu = false"
            class="absolute right-0 mt-2 w-52 bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-2 z-50 animate-pop space-y-1"
          >
            <div class="px-3 py-2 border-b border-slate-100 text-left">
              <p class="font-heading font-black text-xs text-slate-800 truncate">
                {{ userStore.currentUser?.name || 'Petualang Tamu' }}
              </p>
              <p class="text-[10px] text-slate-400 font-body">
                {{ userStore.currentUser?.email || 'Belum terdaftar' }}
              </p>
            </div>

            <NuxtLink 
              to="/course" 
              @click="showProfileMenu = false"
              class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-slate-100"
            >
              <span>🗺️</span>
              <span>Peta Belajar</span>
            </NuxtLink>

            <NuxtLink 
              to="/shop" 
              @click="showProfileMenu = false"
              class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-bold text-slate-700 hover:bg-slate-100"
            >
              <span>🎒</span>
              <span>Ransel & Toko Kiko</span>
            </NuxtLink>

            <button 
              v-if="userStore.isAuthenticated && userStore.currentUser?.role !== 'guest'"
              @click="handleParentAreaFromMenu" 
              type="button"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-bold text-amber-800 hover:bg-amber-50 text-left cursor-pointer"
            >
              <span>👨‍👩‍👧</span>
              <span>Laporan Orang Tua 🔒</span>
            </button>

            <div class="border-t border-slate-100 pt-1">
              <template v-if="userStore.isAuthenticated">
                <button 
                  @click="handleLogout" 
                  type="button" 
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-bold text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                >
                  <span>🚪</span>
                  <span>Keluar Akun</span>
                </button>
              </template>
              <template v-else>
                <NuxtLink 
                  to="/login" 
                  @click="showProfileMenu = false"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-bold text-duo-blue hover:bg-sky-50"
                >
                  <span>🔑</span>
                  <span>Masuk / Daftar Akun</span>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Parent Gate Verification Challenge Dialog -->
    <ParentGateModal 
      v-model="showParentGate" 
      :target-path="parentTargetPath" 
      @success="onParentGateSuccess"
    />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import ParentGateModal from '~/components/app/ParentGateModal.vue'

const userStore = useUserStore()

const showProfileMenu = ref(false)
const showParentGate = ref(false)
const parentTargetPath = ref('/parent-dashboard')

const openParentArea = () => {
  parentTargetPath.value = '/parent-dashboard'
  showParentGate.value = true
}

const handleParentAreaFromMenu = () => {
  showProfileMenu.value = false
  openParentArea()
}

const openProModal = () => {
  parentTargetPath.value = '/pricing'
  showParentGate.value = true
}

const onParentGateSuccess = () => {
  // Callback saat orang tua berhasil memverifikasi tantangan
}

const openRefillModal = () => {
  if (userStore.hearts < userStore.maxHearts && !userStore.isPro) {
    if (confirm('Pulihkan nyawa penuh sekarang? (Gratis di sesi belajar ini)')) {
      userStore.refillHearts()
    }
  }
}

const handleLogout = () => {
  showProfileMenu.value = false
  if (confirm('Yakin ingin keluar dari akun?')) {
    userStore.logout()
    navigateTo('/course')
  }
}
</script>
