<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
    <!-- Header -->
    <HeaderNav />

    <!-- Main Game Area -->
    <main class="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-6 animate-pop">
      <!-- Game Top Status Bar -->
      <div class="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/20 rounded-full text-xs font-heading font-extrabold">
            🎈 Mini Game Berhitung
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-black">
            Pecahkan Balon Angka! 💥
          </h1>
        </div>

        <!-- Target Goal Pill -->
        <div v-if="isPlaying" class="bg-white/20 backdrop-blur-md border-2 border-white/40 px-4 py-2 rounded-2xl text-center shadow-md">
          <span class="text-[10px] uppercase font-heading font-bold text-sky-100 block">Cari & Pecahkan:</span>
          <span class="text-2xl sm:text-3xl font-heading font-black text-amber-300">
            Angka {{ targetNumber }}
          </span>
        </div>

        <!-- Stats -->
        <div v-if="isPlaying" class="flex items-center gap-3">
          <div class="text-center px-3 py-1 bg-white/20 rounded-xl">
            <span class="text-[10px] block font-heading text-sky-100">SKOR</span>
            <span class="font-heading font-black text-xl text-yellow-300">{{ score }}</span>
          </div>
          <div class="text-center px-3 py-1 bg-white/20 rounded-xl">
            <span class="text-[10px] block font-heading text-sky-100">WAKTU</span>
            <span class="font-heading font-black text-xl text-rose-300">{{ timeLeft }}s</span>
          </div>
        </div>
      </div>

      <!-- Game Canvas Box -->
      <div class="relative bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-3xl border-4 border-sky-300 shadow-xl min-h-[420px] overflow-hidden flex flex-col justify-between p-4">
        <!-- Start Screen Overlay -->
        <div v-if="!isPlaying && !isGameOver" class="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 space-y-4 z-20">
          <div class="w-20 h-20 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-5xl shadow-lg animate-bounce">
            🎈
          </div>
          <h2 class="text-3xl font-heading font-black text-slate-800">Siap Bermain?</h2>
          <p class="text-sm font-heading font-semibold text-slate-600 max-w-sm">
            Pecahkan balon yang bertuliskan angka target secepat mungkin sebelum waktu 45 detik habis!
          </p>
          <button @click="startGame" class="px-8 py-3.5 duo-btn-green text-lg font-heading font-extrabold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all">
            🚀 MULAI GAME!
          </button>
        </div>

        <!-- Game Over Screen Overlay -->
        <div v-if="isGameOver" class="absolute inset-0 bg-emerald-500/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 text-white space-y-4 z-20 animate-pop">
          <div class="w-20 h-20 rounded-full bg-white text-amber-500 flex items-center justify-center text-5xl shadow-xl animate-bounce">
            🏆
          </div>
          <h2 class="text-3xl font-heading font-black">Waktu Habis!</h2>
          <p class="text-lg font-heading font-bold text-emerald-100">
            Skor Akhir Kamu: <span class="text-yellow-300 font-black text-2xl">{{ score }} Poin</span>
          </p>
          <p class="text-xs font-heading font-semibold text-emerald-100">
            +{{ Math.floor(score / 2) }} XP Ditambahkan ke Akunmu! ⚡
          </p>
          <button @click="startGame" class="px-8 py-3 bg-white text-emerald-700 rounded-2xl font-heading font-extrabold text-base shadow-lg hover:bg-emerald-50 active:scale-95 transition-all">
            🔄 Main Lagi
          </button>
        </div>

        <!-- Floating Balloons Container -->
        <div class="relative w-full h-[360px] overflow-hidden">
          <div
            v-for="b in balloons"
            :key="b.id"
            @click="popBalloon(b)"
            class="absolute cursor-pointer flex flex-col items-center justify-center font-heading font-black text-2xl text-white rounded-full shadow-lg transition-transform duration-75 active:scale-90"
            :class="b.colorClass"
            :style="{
              left: `${b.x}%`,
              bottom: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size * 1.2}px`
            }"
          >
            <span>{{ b.number }}</span>
            <div class="w-1 h-4 bg-white/40 absolute -bottom-3 rounded-full"></div>
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
import { ref, onUnmounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useSoundEffects } from '~/composables/useSoundEffects'

const userStore = useUserStore()
const { playPop, playCorrect, playWrong } = useSoundEffects()

const isPlaying = ref(false)
const isGameOver = ref(false)
const score = ref(0)
const timeLeft = ref(45)
const targetNumber = ref(1)

const balloons = ref([])
let timer = null
let animationFrame = null

const balloonColors = [
  'bg-rose-500 border-2 border-rose-400',
  'bg-sky-500 border-2 border-sky-400',
  'bg-amber-500 border-2 border-amber-400',
  'bg-emerald-500 border-2 border-emerald-400',
  'bg-purple-500 border-2 border-purple-400'
]

const startGame = () => {
  isPlaying.value = true
  isGameOver.value = false
  score.value = 0
  timeLeft.value = 45
  targetNumber.value = Math.floor(Math.random() * 5) + 1
  balloons.value = []

  speakWord(`Pecahkan semua balon angka ${targetNumber.value}!`)

  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
      if (timeLeft.value % 12 === 0) {
        targetNumber.value = Math.floor(Math.random() * 5) + 1
        speakWord(`Sekarang ganti! Cari angka ${targetNumber.value}!`)
      }
    } else {
      endGame()
    }
  }, 1000)

  spawnBalloonsLoop()
}

const spawnBalloonsLoop = () => {
  if (!isPlaying.value) return

  // Spawn new balloon if count < 7
  if (balloons.value.length < 7 && Math.random() > 0.4) {
    balloons.value.push({
      id: Date.now() + Math.random(),
      number: Math.floor(Math.random() * 6) + 1,
      x: Math.floor(Math.random() * 80) + 5,
      y: -15,
      speed: Math.random() * 0.4 + 0.3,
      size: Math.floor(Math.random() * 15) + 60,
      colorClass: balloonColors[Math.floor(Math.random() * balloonColors.length)]
    })
  }

  // Float balloons upwards
  balloons.value.forEach(b => {
    b.y += b.speed
  })

  // Remove balloons that float past top
  balloons.value = balloons.value.filter(b => b.y < 105)

  animationFrame = requestAnimationFrame(spawnBalloonsLoop)
}

const popBalloon = (balloon) => {
  if (!isPlaying.value) return
  playPop()

  if (balloon.number === targetNumber.value) {
    score.value += 10
    playCorrect()
  } else {
    score.value = Math.max(0, score.value - 2)
    playWrong()
  }

  balloons.value = balloons.value.filter(b => b.id !== balloon.id)
}

const endGame = () => {
  isPlaying.value = false
  isGameOver.value = true
  if (timer) clearInterval(timer)
  if (animationFrame) cancelAnimationFrame(animationFrame)

  const bonusXP = Math.floor(score.value / 2)
  if (bonusXP > 0) {
    userStore.addXP(bonusXP)
  }

  speakWord(`Permainan selesai! Skor kamu ${score.value} poin!`)
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>
