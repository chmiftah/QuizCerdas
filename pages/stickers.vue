<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between">
    <!-- Main Top Navigation -->
    <HeaderNav />

    <!-- Sticker Book Container -->
    <main class="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-8 animate-pop">
      <!-- Title & Banner -->
      <div class="bg-amber-400 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center sm:text-left z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-heading font-extrabold tracking-wider uppercase">
            ⭐ Koleksi Hadiah Belajar
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black drop-shadow-md">
            Album Stiker Kiko 📖
          </h1>
          <p class="text-sm sm:text-base font-heading font-semibold text-amber-100 max-w-md">
            Kumpulkan stiker-stiker lucu setiap kali kamu menyelesaikan materi & checkpoint kuis!
          </p>
        </div>

        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center text-5xl shadow-xl shrink-0 animate-bounce">
          🏆
        </div>
      </div>

      <!-- Sticker Stats Bar -->
      <div class="bg-white rounded-2xl p-4 border-2 border-duo-gray-100 shadow-sm flex items-center justify-between font-heading font-bold text-sm">
        <div class="flex items-center gap-2 text-slate-700">
          <span class="text-xl">🎨</span>
          <span>Stiker Terkumpul: <span class="text-duo-green-dark font-extrabold text-lg">{{ unlockedCount }}</span> / {{ allStickers.length }}</span>
        </div>

        <NuxtLink to="/course" class="px-4 py-2 duo-btn-green rounded-xl text-xs font-extrabold">
          Dapatkan Stiker Baru ➔
        </NuxtLink>
      </div>

      <!-- Sticker Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="stiker in allStickers"
          :key="stiker.id"
          @click="selectSticker(stiker)"
          class="relative p-5 rounded-3xl border-3 transition-all duration-200 flex flex-col items-center justify-between text-center gap-3 cursor-pointer select-none group"
          :class="isUnlocked(stiker.id)
            ? 'bg-white border-amber-300 shadow-md hover:border-amber-400 hover:scale-105 hover:shadow-lg'
            : 'bg-slate-100 border-slate-200 opacity-60 grayscale hover:opacity-80'"
        >
          <!-- Unlocked Star Ribbon -->
          <div v-if="isUnlocked(stiker.id)" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
            ✓
          </div>
          <div v-else class="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-400 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
            🔒
          </div>

          <!-- Sticker Emoji Illustration -->
          <div 
            class="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl transition-transform group-hover:scale-110"
            :class="isUnlocked(stiker.id) ? 'bg-amber-50 shadow-inner' : 'bg-slate-200'"
          >
            {{ stiker.icon }}
          </div>

          <!-- Title & Requirement -->
          <div class="space-y-0.5">
            <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">
              {{ stiker.name }}
            </h3>
            <p class="text-[11px] font-heading font-semibold text-slate-500">
              {{ isUnlocked(stiker.id) ? stiker.description : stiker.requirement }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-duo-gray-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useSoundEffects } from '~/composables/useSoundEffects'

const userStore = useUserStore()
const { playPop } = useSoundEffects()

const allStickers = [
  {
    id: 'stiker_apel',
    name: 'Apel Ceria 🍎',
    icon: '🍎',
    description: 'Stiker Selamat Datang!',
    requirement: 'Pelajaran 1'
  },
  {
    id: 'stiker_bintang',
    name: 'Bintang Kejora ⭐',
    icon: '⭐',
    description: 'Penyelamat Angka',
    requirement: 'Pelajaran 2'
  },
  {
    id: 'stiker_singa',
    name: 'Singa Jagoan 🦁',
    icon: '🦁',
    description: 'Pemberani Hitungan',
    requirement: 'Unit 1 Checkpoint'
  },
  {
    id: 'stiker_roket',
    name: 'Roket Angkasa 🚀',
    icon: '🚀',
    description: 'Meluncur Tinggi!',
    requirement: 'Unit 2 Checkpoint'
  },
  {
    id: 'stiker_lumba',
    name: 'Lumba-Lumba 🐬',
    icon: '🐬',
    description: 'Pintar Berenang',
    requirement: 'Pelajaran 5'
  },
  {
    id: 'stiker_mahkota',
    name: 'Mahkota Raja 👑',
    icon: '👑',
    description: 'Juara Kelas TK',
    requirement: 'Unit 3 Checkpoint'
  }
]

const isUnlocked = (stikerId) => {
  // Automatically unlock based on completed lessons count or checkpoints
  const totalLessons = userStore.completedLessons.length
  const totalCheckpoints = userStore.completedCheckpoints.length

  if (stikerId === 'stiker_apel') return true
  if (stikerId === 'stiker_bintang') return totalLessons >= 1
  if (stikerId === 'stiker_singa') return totalCheckpoints >= 1
  if (stikerId === 'stiker_lumba') return totalLessons >= 3
  if (stikerId === 'stiker_roket') return totalCheckpoints >= 2
  if (stikerId === 'stiker_mahkota') return totalCheckpoints >= 3
  return false
}

const unlockedCount = computed(() => {
  return allStickers.filter(s => isUnlocked(s.id)).length
})

const selectSticker = (stiker) => {
  playPop()
  if (isUnlocked(stiker.id)) {
    speakWord(`Selamat! Stiker ${stiker.name} sudah kamu buka!`)
  } else {
    speakWord(`Selesaikan ${stiker.requirement} untuk membuka stiker ini!`)
  }
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}
</script>
