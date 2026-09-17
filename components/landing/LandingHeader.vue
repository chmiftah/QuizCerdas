<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <NuxtLink :to="getMarketingLink('/')" class="flex items-center gap-2 group active:scale-95 transition-transform shrink-0" title="Pintara - Beranda">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white font-heading text-lg sm:text-xl shadow-duo-green group-hover:scale-105 transition-transform">
          🦉
        </div>
        <div class="flex items-center leading-none">
          <span class="font-heading text-xl sm:text-2xl font-black text-duo-green tracking-tight">Pint</span>
          <span class="font-heading text-xl sm:text-2xl font-black text-duo-blue tracking-tight">ara</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav Links (Khusus Marketing / Orang Tua / Guru) -->
      <nav class="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs font-heading font-extrabold text-slate-700">
        <NuxtLink 
          :to="getMarketingLink('/')" 
          class="px-3.5 py-1.5 rounded-xl transition-all hover:text-slate-900 hover:bg-white/60"
          exact-active-class="bg-white text-slate-900 shadow-2xs"
        >
          Beranda
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/catalog')" 
          class="px-3.5 py-1.5 rounded-xl transition-all hover:text-slate-900 hover:bg-white/60"
          active-class="bg-white text-slate-900 shadow-2xs"
        >
          Pelajaran
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/pricing')" 
          class="px-3.5 py-1.5 rounded-xl transition-all hover:text-slate-900 hover:bg-white/60 flex items-center gap-1"
          active-class="bg-white text-slate-900 shadow-2xs"
        >
          <span>👑</span>
          <span>Pintara Pro</span>
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/about')" 
          class="px-3.5 py-1.5 rounded-xl transition-all hover:text-slate-900 hover:bg-white/60"
          active-class="bg-white text-slate-900 shadow-2xs"
        >
          Tentang Kami
        </NuxtLink>

      </nav>

      <!-- Right Action CTA Group -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <!-- Keadaan 1: Pengguna Sudah Login (Bukan Tamu) -->
        <template v-if="userStore.isAuthenticated && userStore.currentUser?.role !== 'guest'">
          <!-- CTA Lanjut Belajar -->
          <NuxtLink 
            :to="getAppLink('/course')" 
            class="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-extrabold text-xs sm:text-sm shadow-duo-green active:translate-y-0.5 active:shadow-none transition-all items-center gap-1.5"
          >
            <span>🚀</span>
            <span>Lanjut Belajar</span>
          </NuxtLink>

          <!-- User Profile Dropdown Pill -->
          <div class="relative">
            <button 
              @click="isProfileDropdownOpen = !isProfileDropdownOpen"
              type="button"
              class="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 rounded-2xl transition-all cursor-pointer select-none group"
              title="Menu Akun"
            >
              <div class="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 border border-amber-200/80 flex items-center justify-center text-sm shadow-2xs">
                {{ userStore.currentUser?.avatar || '👤' }}
              </div>
              <span class="text-xs font-heading font-black text-slate-800 max-w-[100px] truncate">
                {{ userStore.currentUser?.name || 'Siswa' }}
              </span>
              <ChevronDown 
                class="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200" 
                :class="{ 'rotate-180': isProfileDropdownOpen }" 
              />
            </button>

            <!-- Backdrop overlay to dismiss on outside click -->
            <div 
              v-if="isProfileDropdownOpen" 
              @click="isProfileDropdownOpen = false" 
              class="fixed inset-0 z-40 bg-transparent"
            ></div>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div 
                v-if="isProfileDropdownOpen"
                class="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs font-heading"
              >
                <!-- User info header -->
                <div class="px-3.5 py-2.5 border-b border-slate-100">
                  <div class="flex items-center justify-between gap-1 mb-0.5">
                    <span class="font-extrabold text-slate-900 truncate">{{ userStore.currentUser?.name || 'Siswa Pintara' }}</span>
                    <span 
                      v-if="userStore.isPro" 
                      class="px-1.5 py-0.5 bg-amber-400 text-amber-950 rounded-md text-[9px] font-black tracking-wide shrink-0"
                    >
                      👑 PRO
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-400 truncate font-normal">{{ userStore.currentUser?.email || 'Akun Siswa' }}</p>
                </div>

                <!-- Menu Actions -->
                <div class="p-1 space-y-0.5">
                  <NuxtLink 
                    :to="getAppLink('/course')"
                    @click="isProfileDropdownOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-duo-green transition-colors font-bold"
                  >
                    <span>🗺️</span>
                    <span>Peta Belajar</span>
                  </NuxtLink>

                  <NuxtLink 
                    :to="getMarketingLink('/pricing')"
                    @click="isProfileDropdownOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-amber-700 hover:bg-amber-50 transition-colors font-bold"
                  >
                    <span>👑</span>
                    <span>{{ userStore.isPro ? 'Status Pintara Pro' : 'Langganan Pro' }}</span>
                  </NuxtLink>

                  <div class="h-px bg-slate-100 my-1"></div>

                  <button 
                    @click="handleLogout(); isProfileDropdownOpen = false"
                    type="button"
                    class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors font-bold cursor-pointer"
                  >
                    <span>🚪</span>
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </template>

        <!-- Keadaan 2: Belum Login / Tamu -->
        <template v-else>
          <NuxtLink 
            :to="getAppLink('/login')" 
            class="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Masuk
          </NuxtLink>

          <NuxtLink 
            :to="startLearningLink" 
            class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-extrabold text-xs sm:text-sm shadow-duo-green active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
          >
            <span>🚀</span>
            <span>Mulai Belajar</span>
          </NuxtLink>
        </template>

        <!-- Mobile Menu Toggle Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          type="button"
          class="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer active:scale-95 transition-all"
          aria-label="Buka Menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown Navigation -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-slate-100 mt-3 pt-3 pb-2 space-y-1.5">
        <NuxtLink 
          :to="getMarketingLink('/')" 
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-heading font-extrabold text-slate-700 hover:bg-slate-50"
        >
          🏠 Beranda
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/catalog')" 
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-heading font-extrabold text-slate-700 hover:bg-slate-50"
        >
          📚 Pelajaran
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/pricing')" 
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-heading font-extrabold text-slate-700 hover:bg-slate-50"
        >
          👑 Harga Pintara Pro
        </NuxtLink>

        <NuxtLink 
          :to="getMarketingLink('/about')" 
          @click="isMobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-heading font-extrabold text-slate-700 hover:bg-slate-50"
        >
          ℹ️ Tentang Kami
        </NuxtLink>


        <!-- Profile Bar or Login on Mobile -->
        <div class="pt-2 border-t border-slate-100">
          <div v-if="userStore.isAuthenticated && userStore.currentUser?.role !== 'guest'" class="p-3 bg-slate-50 border border-slate-200/70 rounded-2xl mb-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center text-base shrink-0">
                  {{ userStore.currentUser?.avatar || '👤' }}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="font-heading font-black text-xs text-slate-800 truncate">{{ userStore.currentUser?.name }}</span>
                    <span v-if="userStore.isPro" class="px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded text-[9px] font-black">PRO</span>
                  </div>
                  <p class="text-[10px] text-slate-400 truncate">{{ userStore.currentUser?.email }}</p>
                </div>
              </div>
              <button @click="handleLogout" class="px-2.5 py-1 text-xs text-rose-600 font-bold hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                Keluar
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <NuxtLink 
              v-if="!userStore.isAuthenticated || userStore.currentUser?.role === 'guest'"
              :to="getAppLink('/login')" 
              @click="isMobileMenuOpen = false"
              class="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-xs font-heading font-extrabold text-slate-700 hover:bg-slate-50"
            >
              Masuk Akun
            </NuxtLink>
            <NuxtLink 
              :to="startLearningLink" 
              @click="isMobileMenuOpen = false"
              class="flex-1 text-center py-2.5 rounded-xl bg-duo-green text-white text-xs font-heading font-extrabold shadow-duo-green active:translate-y-0.5 transition-all"
            >
              {{ userStore.isAuthenticated && userStore.currentUser?.role !== 'guest' ? 'Lanjut Belajar 🚀' : 'Mulai Belajar 🚀' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, X, ChevronDown } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user'
import { useAppDomain } from '~/composables/useAppDomain'

const userStore = useUserStore()
const { getAppLink, getMarketingLink } = useAppDomain()
const isMobileMenuOpen = ref(false)
const isProfileDropdownOpen = ref(false)

const startLearningLink = computed(() => {
  return getAppLink(userStore.hasOnboarded ? '/course' : '/onboarding')
})

const handleLogout = () => {
  userStore.logout()
  navigateTo('/')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
