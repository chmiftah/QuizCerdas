<template>
  <div class="md:hidden">
    <!-- Fixed Mobile Bottom Navigation Bar -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-1.5 px-2 flex justify-around items-center">
      <!-- 1. Beranda -->
      <NuxtLink 
        to="/" 
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95"
        exact-active-class="bg-emerald-100/80 text-emerald-800 font-black shadow-2xs"
      >
        <span class="text-xl leading-none transition-transform group-active:scale-110">🏠</span>
        <span class="text-[10px] font-heading font-extrabold mt-1">Beranda</span>
      </NuxtLink>

      <!-- 2. Katalog -->
      <NuxtLink 
        to="/catalog" 
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95 text-slate-600"
        active-class="bg-emerald-100/80 text-emerald-800 font-black shadow-2xs"
      >
        <span class="text-xl leading-none transition-transform group-active:scale-110">📚</span>
        <span class="text-[10px] font-heading font-extrabold mt-1">Katalog</span>
      </NuxtLink>

      <!-- 3. Liga & Misi -->
      <NuxtLink 
        to="/leaderboard" 
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95 text-slate-600 relative"
        active-class="bg-amber-100/80 text-amber-900 font-black shadow-2xs"
      >
        <span class="text-xl leading-none transition-transform group-active:scale-110">🏆</span>
        <span class="text-[10px] font-heading font-extrabold mt-1">Liga</span>
        <!-- Quest Badge Counter -->
        <span 
          v-if="userStore.unclaimedQuestsCount > 0"
          class="absolute top-1 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce shadow-xs"
        >
          {{ userStore.unclaimedQuestsCount }}
        </span>
      </NuxtLink>

      <!-- 4. Aktivitas (Triggers M3 Bottom Sheet) -->
      <button 
        @click="showBottomSheet = true"
        type="button"
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95 text-slate-600"
        :class="isActivityActive ? 'bg-sky-100/80 text-sky-900 font-black shadow-2xs' : ''"
      >
        <span class="text-xl leading-none transition-transform group-active:scale-110">🎯</span>
        <span class="text-[10px] font-heading font-extrabold mt-1">Aktivitas</span>
      </button>

      <!-- 5. Profil / Akun -->
      <NuxtLink 
        v-if="userStore.isLoggedIn"
        to="/catalog"
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95 text-slate-600"
      >
        <span class="text-xl leading-none">{{ userStore.userAvatar }}</span>
        <span class="text-[10px] font-heading font-extrabold mt-1 truncate max-w-[50px]">Profil</span>
      </NuxtLink>
      <NuxtLink 
        v-else
        to="/login"
        class="flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[56px] min-h-[48px] transition-all cursor-pointer group active:scale-95 text-slate-600"
      >
        <span class="text-xl leading-none">🔑</span>
        <span class="text-[10px] font-heading font-extrabold mt-1">Masuk</span>
      </NuxtLink>
    </nav>

    <!-- MATERIAL DESIGN 3 BOTTOM SHEET MODAL -->
    <Transition name="bottom-sheet">
      <div v-if="showBottomSheet" class="fixed inset-0 z-50 flex items-end justify-center">
        <!-- Backdrop Overlay -->
        <div 
          @click="showBottomSheet = false" 
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        ></div>

        <!-- Sheet Surface Content -->
        <div class="relative z-10 w-full bg-white rounded-t-[32px] p-6 shadow-2xl border-t-2 border-slate-200 max-h-[85vh] overflow-y-auto space-y-5 animate-slide-up">
          <!-- Handle Bar Drag Pill -->
          <div class="w-12 h-1.5 bg-slate-300 rounded-full mx-auto cursor-pointer" @click="showBottomSheet = false"></div>

          <!-- Sheet Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-heading font-black text-lg text-slate-800 flex items-center gap-2">
                <span>🎯</span>
                <span>Aktivitas & Fitur Ekstra</span>
              </h3>
              <p class="text-xs text-slate-500 font-body">Pilih permainan & modul interaktif kesukaanmu</p>
            </div>
            <button 
              @click="showBottomSheet = false" 
              class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer active:scale-90 transition-transform"
            >
              ✕
            </button>
          </div>

          <!-- Activity Cards Grid -->
          <div class="grid grid-cols-2 gap-3.5">
            <!-- 1. Menulis & Tracing -->
            <NuxtLink 
              to="/tracing" 
              @click="showBottomSheet = false"
              class="p-4 bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-emerald-400 active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md">
                ✏️
              </div>
              <span class="font-heading font-extrabold text-xs text-slate-800">Menulis & Tracing</span>
              <span class="text-[10px] text-slate-500 font-body">Latihan jari menjiplak</span>
            </NuxtLink>

            <!-- 2. Game Balon -->
            <NuxtLink 
              to="/games/bubble-pop" 
              @click="showBottomSheet = false"
              class="p-4 bg-sky-50/80 border-2 border-sky-200 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-sky-400 active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-md">
                🎈
              </div>
              <span class="font-heading font-extrabold text-xs text-slate-800">Game Balon Angka</span>
              <span class="text-[10px] text-slate-500 font-body">Letuskan balon cepat</span>
            </NuxtLink>

            <!-- 3. Mewarnai -->
            <NuxtLink 
              to="/coloring" 
              @click="showBottomSheet = false"
              class="p-4 bg-amber-50/80 border-2 border-amber-200 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-amber-400 active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                🎨
              </div>
              <span class="font-heading font-extrabold text-xs text-slate-800">Mewarnai Ceria</span>
              <span class="text-[10px] text-slate-500 font-body">Kreasi kanvas warna</span>
            </NuxtLink>

            <!-- 4. Lagu Anak -->
            <NuxtLink 
              to="/nursery-rhymes" 
              @click="showBottomSheet = false"
              class="p-4 bg-purple-50/80 border-2 border-purple-200 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-purple-400 active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-duo-purple text-white flex items-center justify-center text-2xl shadow-md">
                🎵
              </div>
              <span class="font-heading font-extrabold text-xs text-slate-800">Lagu Anak Edukatif</span>
              <span class="text-[10px] text-slate-500 font-body">Musik & bernyanyi</span>
            </NuxtLink>

            <!-- 5. Toko Kiko (Span 2) -->
            <NuxtLink 
              to="/shop" 
              @click="showBottomSheet = false"
              class="col-span-2 p-4 bg-amber-100 border-2 border-amber-300 rounded-2xl flex items-center gap-4 hover:border-amber-400 active:scale-95 transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                🛍️
              </div>
              <div class="text-left flex-1">
                <span class="font-heading font-extrabold text-sm text-slate-800 block">Toko Kiko</span>
                <span class="text-[11px] text-slate-600 font-body">Tukar XP dengan kostum, topi & isi nyawa</span>
              </div>
              <span class="text-xs font-heading font-black text-amber-800">Buka ➔</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()

const showBottomSheet = ref(false)

const activityRoutes = ['/tracing', '/games/bubble-pop', '/coloring', '/nursery-rhymes', '/shop']
const isActivityActive = computed(() => activityRoutes.some(r => route.path.startsWith(r)))
</script>

<style scoped>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: opacity 0.3s ease;
}
.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
