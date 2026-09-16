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
          Kurikulum & Bioma
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
        <!-- Tombol Masuk / Login -->
        <NuxtLink 
          :to="getAppLink('/login')" 
          class="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
        >
          Masuk
        </NuxtLink>

        <!-- CTA Utama: Mulai Belajar Gratis -->
        <NuxtLink 
          :to="getAppLink('/course')" 
          class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-extrabold text-xs sm:text-sm shadow-duo-green active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
        >
          <span>🚀</span>
          <span>Mulai Belajar</span>
        </NuxtLink>

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
          📚 Kurikulum & Bioma
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

        <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
          <NuxtLink 
            :to="getAppLink('/login')" 
            @click="isMobileMenuOpen = false"
            class="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-xs font-heading font-extrabold text-slate-700"
          >
            Masuk Akun
          </NuxtLink>
          <NuxtLink 
            :to="getAppLink('/course')" 
            @click="isMobileMenuOpen = false"
            class="flex-1 text-center py-2.5 rounded-xl bg-duo-green text-white text-xs font-heading font-extrabold shadow-duo-green"
          >
            Mulai Belajar 🚀
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { useAppDomain } from '~/composables/useAppDomain'

const { getAppLink, getMarketingLink } = useAppDomain()
const isMobileMenuOpen = ref(false)
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
</style>
