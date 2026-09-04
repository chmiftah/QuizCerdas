<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
    <!-- Header -->
    <HeaderNav />

    <!-- Main Song Player Room -->
    <main class="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-8 animate-pop">
      <!-- Title & Banner -->
      <div class="bg-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center sm:text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/20 rounded-full text-xs font-heading font-extrabold">
            🎵 Lagu Hitungan Anak
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black">
            Karaoke Angka Ceria 🎤
          </h1>
          <p class="text-sm font-heading font-semibold text-indigo-100">
            Bernyanyi sambil belajar mengenal angka bersama Kiko!
          </p>
        </div>

        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 animate-bounce">
          🎶
        </div>
      </div>

      <!-- Song Selector Tabs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="s in songList"
          :key="s.id"
          @click="selectSong(s)"
          class="p-4 rounded-3xl border-3 transition-all cursor-pointer flex items-center gap-3 select-none"
          :class="currentSong.id === s.id
            ? 'bg-purple-50 border-purple-400 shadow-md scale-102'
            : 'bg-white border-slate-200 hover:border-purple-200 shadow-xs'"
        >
          <div class="w-12 h-12 rounded-2xl bg-purple-500 text-white font-heading font-black text-xl flex items-center justify-center shadow-md shrink-0">
            {{ s.icon }}
          </div>
          <div class="space-y-0.5">
            <h3 class="font-heading font-bold text-sm text-slate-800">{{ s.title }}</h3>
            <p class="text-[11px] font-heading font-semibold text-slate-500">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Active Song Player Box -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-duo-gray-100 shadow-md space-y-6 text-center">
        <div class="flex items-center justify-center gap-3">
          <span class="text-3xl animate-bounce">🐼🎶</span>
          <h2 class="text-2xl font-heading font-black text-slate-800">
            {{ currentSong.title }}
          </h2>
        </div>

        <!-- Lyrics Container -->
        <div class="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 min-h-[160px] flex flex-col justify-center gap-3 font-heading font-extrabold text-base sm:text-lg text-slate-700">
          <p
            v-for="(line, idx) in currentSong.lyrics"
            :key="idx"
            class="transition-all duration-300"
            :class="activeLineIndex === idx ? 'text-purple-600 font-black text-xl sm:text-2xl scale-105' : 'opacity-70'"
          >
            {{ line }}
          </p>
        </div>

        <!-- Player Controls Bar -->
        <div class="flex items-center justify-center gap-4">
          <button
            @click="togglePlay"
            class="px-8 py-3.5 duo-btn-purple text-base font-heading font-extrabold rounded-2xl shadow-lg flex items-center gap-2"
          >
            <span class="text-xl">{{ isPlaying ? '⏸️ Pause' : '▶️ Putar Lagu' }}</span>
          </button>
          <button
            @click="stopSong"
            class="px-5 py-3.5 duo-btn-gray text-sm font-heading font-bold rounded-2xl"
          >
            ⏹️ Stop
          </button>
        </div>
      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-duo-gray-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const songList = [
  {
    id: 'satu_satu',
    title: 'Satu Satu Aku Sayang Ibu 🎵',
    icon: '1️⃣',
    desc: 'Lagu klasik mengenal angka 1, 2, 3',
    lyrics: [
      'Satu satu, aku sayang Ibu 💖',
      'Dua dua, juga sayang Ayah 👨',
      'Tiga tiga, sayang Adik Kakak 👦👧',
      'Satu dua tiga, sayang semuanya! 🎉'
    ]
  },
  {
    id: 'dua_mata',
    title: 'Dua Mata Saya 👁️',
    icon: '2️⃣',
    desc: 'Mengenal jumlah anggota tubuh',
    lyrics: [
      'Dua mata saya, hidung saya satu 👃',
      'Dua kaki saya, pakai sepatu baru 👟',
      'Dua telinga saya, yang kiri dan kanan 👂',
      'Satu mulut saya, tidak berhenti makan! 😋'
    ]
  },
  {
    id: 'balonku',
    title: 'Balonku Ada Lima 🎈',
    icon: '5️⃣',
    desc: 'Lagu angka 5 dan warna-warni',
    lyrics: [
      'Balonku ada lima, rupa-rupa warnanya 🎨',
      'Hijau, kuning, kelabu, merah muda dan biru 💙',
      'Meletus balon hijau... DOR! 💥',
      'Hatiku sangat kacau... Balonku tinggal empat! 🎈'
    ]
  }
]

const currentSong = ref(songList[0])
const isPlaying = ref(false)
const activeLineIndex = ref(-1)

let songTimer = null

const selectSong = (song) => {
  stopSong()
  currentSong.value = song
}

const togglePlay = () => {
  if (isPlaying.value) {
    stopSong()
  } else {
    isPlaying.value = true
    playLyricsSequence()
  }
}

const playLyricsSequence = () => {
  activeLineIndex.value = 0
  speakLine(currentSong.value.lyrics[0])

  songTimer = setInterval(() => {
    if (activeLineIndex.value < currentSong.value.lyrics.length - 1) {
      activeLineIndex.value++
      speakLine(currentSong.value.lyrics[activeLineIndex.value])
    } else {
      stopSong()
    }
  }, 4000)
}

const stopSong = () => {
  isPlaying.value = false
  activeLineIndex.value = -1
  if (songTimer) clearInterval(songTimer)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

const speakLine = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.replace(/[^\w\s]/gi, ''))
    utterance.lang = 'id-ID'
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }
}

onUnmounted(() => {
  stopSong()
})
</script>
