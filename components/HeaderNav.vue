<template>
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-2xs">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
      <!-- App Brand Logo & Desktop Navigation Links -->
      <div class="flex items-center gap-3 lg:gap-6 shrink-0">
        <NuxtLink to="/" class="flex items-center gap-1.5 sm:gap-2 group active:scale-95 transition-transform shrink-0" title="CountingDuo">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white font-heading text-base sm:text-xl shadow-duo-green group-hover:scale-105 transition-transform shrink-0">
            🦉
          </div>
          <div class="flex items-center leading-none">
            <span class="font-heading text-[15px] sm:text-xl font-black text-duo-green tracking-tight">Counting</span>
            <span class="font-heading text-[15px] sm:text-xl font-black text-duo-blue tracking-tight">Duo</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Tabs (Hidden on Mobile) -->
        <nav class="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200 shrink-0">
          <NuxtLink 
            to="/" 
            class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            exact-active-class="bg-white text-slate-800 shadow-2xs"
          >
            <span>🏠</span>
            <span>Beranda</span>
          </NuxtLink>

          <NuxtLink 
            to="/catalog" 
            class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            active-class="bg-white text-slate-800 shadow-2xs"
          >
            <span>📚</span>
            <span>Kursus</span>
          </NuxtLink>

          <NuxtLink 
            to="/about" 
            class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            active-class="bg-white text-slate-800 shadow-2xs"
          >
            <span>ℹ️</span>
            <span>Tentang</span>
          </NuxtLink>

          <!-- Extra Logged In Nav Items -->
          <template v-if="userStore.isLoggedIn">
            <NuxtLink 
              to="/leaderboard" 
              class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all flex items-center gap-1.5 relative whitespace-nowrap shrink-0"
              active-class="bg-white text-slate-800 shadow-2xs"
            >
              <span>🏆</span>
              <span>Liga</span>
              <span 
                v-if="userStore.unclaimedQuestsCount > 0" 
                class="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black leading-none animate-bounce shadow-xs"
              >
                {{ userStore.unclaimedQuestsCount }}
              </span>
            </NuxtLink>

            <!-- Aktivitas Dropdown Menu -->
            <div class="relative shrink-0">
              <button 
                @click="showActivitiesMenu = !showActivitiesMenu"
                type="button"
                class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                :class="isActivityActive ? 'bg-duo-blue text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'"
              >
                <span>🎯</span>
                <span>Aktivitas</span>
                <ChevronDown class="w-3.5 h-3.5 transition-transform duration-200 shrink-0" :class="{ 'rotate-180': showActivitiesMenu }" />
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
          </template>
        </nav>
      </div>

      <!-- Gamification Indicators & Auth Profile -->
      <ClientOnly>
        <div class="flex items-center gap-1 sm:gap-2.5 lg:gap-3 shrink-0">
          <!-- Gamification Indicators (Only when logged in) -->
          <template v-if="userStore.isLoggedIn">
            <!-- Streak Indicator -->
            <div class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-orange-50 border sm:border-2 border-orange-200 text-duo-orange-dark font-heading font-bold text-[11px] sm:text-sm shadow-2xs shrink-0 whitespace-nowrap" title="Streak Hari Ini">
              <Flame class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-orange text-duo-orange animate-pulse shrink-0" />
              <span>{{ userStore.streak }}</span>
            </div>

            <!-- XP Badge -->
            <div class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-50 border sm:border-2 border-amber-200 text-amber-800 font-heading font-bold text-[11px] sm:text-sm shadow-2xs shrink-0 whitespace-nowrap" title="Total XP Kamu">
              <Zap class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-yellow text-duo-yellow-dark shrink-0" />
              <span class="font-extrabold">{{ userStore.xp }} <span class="hidden sm:inline">XP</span></span>
            </div>

            <!-- Koin Kiko Badge (Shop Currency) -->
            <NuxtLink 
              to="/shop"
              class="flex items-center gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-100 hover:bg-amber-200 border sm:border-2 border-amber-300 text-amber-900 font-heading font-black text-[11px] sm:text-xs shadow-2xs shrink-0 whitespace-nowrap transition-transform hover:scale-105"
              title="Koin Kiko Kamu (Klik untuk ke Toko)"
            >
              <span class="text-xs sm:text-sm">🪙</span>
              <span>{{ userStore.coins || 0 }}</span>
            </NuxtLink>

            <!-- Hearts Indicator (Unlimited Hearts for PRO, regular 5 for Free) -->
            <div 
              v-if="userStore.hasUnlimitedHearts"
              @click="showHeartModal = true"
              class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 border sm:border-2 border-amber-300 text-slate-950 font-heading font-black text-[11px] sm:text-xs shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0 whitespace-nowrap animate-pulse-glow" 
              title="Nyawa Tanpa Batas (QuizCerdas Pro)"
            >
              <span class="text-xs sm:text-sm">❤️</span>
              <span class="font-black text-amber-950">∞<span class="hidden sm:inline ml-1 font-black">PRO</span></span>
            </div>

            <div 
              v-else
              @click="showHeartModal = true"
              class="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-rose-50 border sm:border-2 border-rose-200 text-rose-600 font-heading font-bold text-[11px] sm:text-sm shadow-2xs cursor-pointer hover:bg-rose-100 transition-colors shrink-0 whitespace-nowrap" 
              title="Nyawa Kamu (Klik untuk isi)"
            >
              <Heart class="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-duo-red text-duo-red shrink-0" />
              <span>{{ userStore.hearts }}</span>
            </div>
          </template>

          <!-- User Profile Dropdown or Auth Buttons -->
          <div v-if="userStore.isLoggedIn" class="relative shrink-0 flex items-center gap-1 sm:gap-2">
            <button 
              @click="showProfileMenu = !showProfileMenu"
              type="button"
              class="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:pl-2 sm:pr-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors font-heading text-xs font-bold text-slate-700 cursor-pointer whitespace-nowrap shrink-0"
              title="Menu Profil"
            >
              <div class="relative flex items-center justify-center shrink-0">
                <div v-if="userAvatarImage" class="w-6 h-6 sm:w-7 sm:h-7 rounded-xl overflow-hidden border border-amber-300 shadow-xs shrink-0 relative">
                  <img :src="userAvatarImage" :alt="userStore.userDisplayName" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none"></div>
                </div>
                <span v-else class="text-base sm:text-lg leading-none">{{ userAvatarDisplay }}</span>
                <div v-if="userHatImage" class="absolute -top-2.5 -right-2 w-4 h-4 z-10 filter drop-shadow-xs pointer-events-none">
                  <img :src="userHatImage" alt="Topi" class="w-full h-full object-contain" />
                </div>
                <span v-else-if="userHatDisplay" class="absolute -top-2.5 -right-1.5 text-[11px] drop-shadow-xs z-10">{{ userHatDisplay }}</span>
              </div>
              <span class="hidden lg:inline max-w-[110px] truncate">{{ userStore.userDisplayName }}</span>
              <span v-if="userStore.isPro" class="hidden sm:inline px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-md font-heading font-black text-[9px]">PRO</span>
              <ChevronDown class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" />
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="showProfileMenu" 
              @click.outside="showProfileMenu = false"
              class="absolute right-0 mt-2 top-full w-56 bg-white rounded-2xl border-2 border-duo-gray-100 shadow-xl py-2 z-50 animate-pop space-y-1"
            >
              <div class="px-3 py-2 border-b border-slate-100 space-y-1">
                <div class="flex items-center justify-between">
                  <p class="font-heading font-extrabold text-xs text-slate-800">{{ userStore.userDisplayName }}</p>
                  <span 
                    class="px-2 py-0.5 rounded-full font-heading font-black text-[10px]"
                    :class="userStore.isPro ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600'"
                  >
                    {{ userStore.isPro ? '👑 PRO' : '🐣 FREE' }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-500 truncate">{{ userStore.currentUser?.email }}</p>
              </div>

              <!-- Pro Upgrade / Manage Link -->
              <NuxtLink 
                to="/pricing" 
                @click="showProfileMenu = false"
                class="w-full px-3 py-2 text-left text-xs font-heading font-extrabold text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center justify-between"
              >
                <span class="flex items-center gap-2">
                  <span>👑</span> {{ userStore.isPro ? 'Kelola Langganan' : 'Upgrade ke Pro' }}
                </span>
                <span class="text-[10px]">➔</span>
              </NuxtLink>

              <!-- Menu Khusus Akun Admin -->
              <template v-if="userStore.isActualAdmin">
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
              </template>

              <NuxtLink 
                to="/parent-dashboard" 
                @click="showProfileMenu = false"
                class="w-full px-3 py-2 text-left text-xs font-heading font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <span>📊</span> Area Orang Tua
              </NuxtLink>

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

          <!-- Logged Out Auth Buttons -->
          <div v-else class="flex items-center gap-1.5 sm:gap-2">
            <NuxtLink 
              to="/login"
              class="hidden sm:inline-flex px-3 py-1.5 rounded-xl font-heading font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Masuk
            </NuxtLink>
            <NuxtLink 
              to="/register"
              class="px-3.5 py-1.5 rounded-xl duo-btn-green text-xs font-heading font-extrabold"
            >
              Mulai Belajar
            </NuxtLink>
          </div>

          <!-- Mobile Hamburger Toggle Button -->
          <button 
            @click="showMobileMenu = !showMobileMenu"
            type="button"
            class="md:hidden w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <X v-if="showMobileMenu" class="w-4 h-4" />
            <Menu v-else class="w-4 h-4" />
          </button>
        </div>

        <template #fallback>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <NuxtLink 
              to="/login"
              class="hidden sm:inline-flex px-3 py-1.5 rounded-xl font-heading font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Masuk
            </NuxtLink>
            <NuxtLink 
              to="/register"
              class="px-3.5 py-1.5 rounded-xl duo-btn-green text-xs font-heading font-extrabold"
            >
              Mulai Belajar
            </NuxtLink>
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Mobile Dropdown Navigation Drawer -->
    <Transition name="slide-down">
      <div 
        v-if="showMobileMenu" 
        class="md:hidden border-t border-slate-200/80 bg-white px-4 py-4 space-y-3 shadow-xl"
      >
        <nav class="grid grid-cols-2 gap-2 text-xs font-heading font-bold">
          <NuxtLink 
            to="/" 
            @click="showMobileMenu = false"
            class="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            exact-active-class="bg-emerald-50 text-duo-green font-extrabold"
          >
            <span>🏠</span>
            <span>Beranda</span>
          </NuxtLink>

          <NuxtLink 
            to="/catalog" 
            @click="showMobileMenu = false"
            class="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            active-class="bg-sky-50 text-duo-blue font-extrabold"
          >
            <span>📚</span>
            <span>Katalog</span>
          </NuxtLink>

          <NuxtLink 
            to="/about" 
            @click="showMobileMenu = false"
            class="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-100 text-slate-700"
            active-class="bg-slate-100 text-slate-900 font-extrabold"
          >
            <span>ℹ️</span>
            <span>Tentang</span>
          </NuxtLink>

          <NuxtLink 
            to="/parent-dashboard" 
            @click="showMobileMenu = false"
            class="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-900 font-extrabold border border-indigo-100"
          >
            <span>👨‍👩‍👧</span>
            <span>Area Orang Tua (Laporan Belajar)</span>
          </NuxtLink>
        </nav>

        <div class="border-t border-slate-100 pt-3 space-y-2">
          <template v-if="!userStore.isLoggedIn">
            <NuxtLink 
              to="/register" 
              @click="showMobileMenu = false"
              class="w-full py-2.5 duo-btn-green text-xs font-heading font-extrabold flex items-center justify-center gap-1.5"
            >
              <span>🚀 Mulai Belajar Gratis</span>
            </NuxtLink>

            <div class="flex items-center justify-between text-xs font-heading pt-1 px-1">
              <button 
                @click="handleGuestMobile" 
                class="text-slate-500 hover:text-duo-blue underline font-bold cursor-pointer"
              >
                ⚡ Coba Mode Tamu
              </button>
              <NuxtLink 
                to="/login" 
                @click="showMobileMenu = false"
                class="text-duo-blue font-extrabold hover:underline"
              >
                Sudah punya akun? Masuk
              </NuxtLink>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center justify-between pt-1">
              <span class="text-xs font-heading text-slate-500">Halo, {{ userStore.userDisplayName }}</span>
              <button 
                @click="handleLogoutMobile" 
                class="text-xs font-heading font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Keluar Akun
              </button>
            </div>
          </template>
        </div>
      </div>
    </Transition>

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
              v-if="userStore.hearts < userStore.maxHearts"
              @click="buyHeartRefill" 
              class="w-full duo-btn-red py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>❤️ Beli Isi Penuh Nyawa</span>
              <span class="bg-black/20 px-2 py-0.5 rounded-full text-xs font-black">20 Koin</span>
            </button>
            <div v-else class="bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-xl border border-emerald-200 font-extrabold">
              ✨ Nyawa kamu sudah penuh (5/5)!
            </div>

            <button 
              @click="confirmReset" 
              class="w-full py-2 text-xs font-heading font-bold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              🔄 Reset Total Semua Progress (XP, Pelajaran & Checkpoint)
            </button>
            <button 
              @click="showHeartModal = false" 
              class="w-full duo-btn-gray py-2 text-sm cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { Flame, Zap, Heart, ChevronDown, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const userStore = useUserStore()

const showHeartModal = ref(false)
const showProfileMenu = ref(false)
const showActivitiesMenu = ref(false)
const showMobileMenu = ref(false)

const isActivityActive = computed(() => {
  const path = route.path
  return ['/tracing', '/games/bubble-pop', '/coloring', '/nursery-rhymes', '/shop', '/stickers', '/parent-dashboard'].some(p => path.startsWith(p))
})

const avatarMap = {
  avatar_kiko: '🐼',
  avatar_fox: '🦊',
  avatar_lion: '🦁',
  avatar_bunny: '🐰',
  avatar_owl: '🦉'
}

const avatarImageMap = {
  avatar_kiko: '/images/characters/avatar_kiko.jpg',
  avatar_fox: '/images/characters/avatar_fox.jpg',
  avatar_lion: '/images/characters/avatar_lion.jpg',
  avatar_bunny: '/images/characters/avatar_bunny.jpg',
  avatar_owl: '/images/characters/avatar_owl.jpg'
}

const userAvatarImage = computed(() => {
  if (userStore.equippedAvatar && avatarImageMap[userStore.equippedAvatar]) {
    return avatarImageMap[userStore.equippedAvatar]
  }
  return null
})

const hatImageMap = {
  hat_crown: '/images/costumes/hat_crown.png',
  hat_grad: '/images/costumes/hat_grad.png',
  hat_cowboy: '/images/costumes/hat_cowboy.png',
  hat_cap: '/images/costumes/hat_cap.png',
  hat_wizard: '/images/costumes/hat_wizard.png'
}

const userHatImage = computed(() => {
  if (userStore.equippedHat && hatImageMap[userStore.equippedHat]) {
    return hatImageMap[userStore.equippedHat]
  }
  return null
})

const hatEmojiMap = {
  hat_crown: '👑',
  hat_grad: '🎓',
  hat_cowboy: '🤠',
  hat_cap: '🧢',
  hat_wizard: '🎩'
}

const userAvatarDisplay = computed(() => {
  if (userStore.equippedAvatar && avatarMap[userStore.equippedAvatar]) {
    return avatarMap[userStore.equippedAvatar]
  }
  return userStore.userAvatar || '🦉'
})

const userHatDisplay = computed(() => {
  if (userStore.equippedHat && hatEmojiMap[userStore.equippedHat]) {
    return hatEmojiMap[userStore.equippedHat]
  }
  return ''
})

const buyHeartRefill = () => {
  try {
    userStore.buyHeartRefill(20)
    showHeartModal.value = false
  } catch (err) {
    alert(err.message)
  }
}

const handleGuestMobile = () => {
  showMobileMenu.value = false
  userStore.loginAsGuest()
  navigateTo('/catalog')
}

const handleLogoutMobile = async () => {
  showMobileMenu.value = false
  await userStore.logout()
  navigateTo('/')
}

const handleLogout = async () => {
  await userStore.logout()
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
