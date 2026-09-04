<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between select-none">
    <!-- Header -->
    <HeaderNav />

    <!-- Main Room -->
    <main class="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-6 animate-pop">
      <!-- Title Header -->
      <div class="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-1 text-center sm:text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/20 rounded-full text-xs font-heading font-extrabold">
            🎨 Mewarnai Sesuai Angka
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black">
            Mewarnai Gambar Ceria 🎨
          </h1>
          <p class="text-sm font-heading font-semibold text-rose-100">
            Pilih warna di bawah, lalu ketuk area gambar dengan angka yang cocok!
          </p>
        </div>

        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 animate-bounce">
          🖌️
        </div>
      </div>

      <!-- Color Palette Picker -->
      <div class="bg-white p-4 rounded-3xl border-2 border-duo-gray-100 shadow-sm space-y-2">
        <div class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider text-center">
          PALET WARNA (PILIH WARNA):
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="p in palette"
            :key="p.number"
            @click="selectColor(p)"
            class="px-4 py-2.5 rounded-2xl font-heading font-extrabold text-xs sm:text-sm text-white flex items-center gap-2 border-3 transition-all cursor-pointer shadow-xs active:scale-95"
            :class="[p.bgClass, selectedPalette.number === p.number ? 'ring-4 ring-offset-2 ring-amber-400 scale-110 shadow-md' : 'hover:scale-105']"
          >
            <span class="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-black">
              {{ p.number }}
            </span>
            <span>{{ p.name }}</span>
          </button>
        </div>
      </div>

      <!-- Interactive Vector Coloring Board -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border-2 border-duo-gray-100 shadow-md flex flex-col items-center gap-4">
        <div class="text-xs font-heading font-extrabold text-slate-500">
          Warna Aktif: <span class="text-slate-800 underline font-black">{{ selectedPalette.name }} (Angka {{ selectedPalette.number }})</span>
        </div>

        <svg 
          viewBox="0 0 400 300" 
          class="w-full max-w-md h-auto bg-amber-50/50 rounded-3xl border-4 border-amber-200 shadow-inner cursor-pointer"
        >
          <!-- Sun Region (1) -->
          <circle 
            cx="70" cy="70" r="35" 
            :fill="regionColors['r1'] || '#ffffff'" 
            stroke="#475569" stroke-width="4"
            @click="fillRegion('r1', 1)"
          />
          <text x="70" y="75" text-anchor="middle" font-family="Outfit" font-weight="900" font-size="18" fill="#64748b">1</text>

          <!-- House Roof Region (2) -->
          <polygon 
            points="200,50 110,140 290,140" 
            :fill="regionColors['r2'] || '#ffffff'" 
            stroke="#475569" stroke-width="4"
            @click="fillRegion('r2', 2)"
          />
          <text x="200" y="105" text-anchor="middle" font-family="Outfit" font-weight="900" font-size="20" fill="#64748b">2</text>

          <!-- House Body Region (3) -->
          <rect 
            x="130" y="140" width="140" height="110" 
            :fill="regionColors['r3'] || '#ffffff'" 
            stroke="#475569" stroke-width="4"
            @click="fillRegion('r3', 3)"
          />
          <text x="200" y="195" text-anchor="middle" font-family="Outfit" font-weight="900" font-size="22" fill="#64748b">3</text>

          <!-- Tree Crown Region (4) -->
          <circle 
            cx="330" cy="170" r="40" 
            :fill="regionColors['r4'] || '#ffffff'" 
            stroke="#475569" stroke-width="4"
            @click="fillRegion('r4', 4)"
          />
          <text x="330" y="175" text-anchor="middle" font-family="Outfit" font-weight="900" font-size="20" fill="#64748b">4</text>

          <!-- Tree Trunk Region (5) -->
          <rect 
            x="320" y="210" width="20" height="40" 
            :fill="regionColors['r5'] || '#ffffff'" 
            stroke="#475569" stroke-width="4"
            @click="fillRegion('r5', 5)"
          />
          <text x="330" y="235" text-anchor="middle" font-family="Outfit" font-weight="900" font-size="14" fill="#64748b">5</text>
        </svg>

        <button @click="resetColoring" class="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-heading font-bold text-xs border border-slate-300 shadow-2xs">
          🧹 Reset Warna
        </button>
      </div>
    </main>

    <footer class="p-6 text-center text-xs font-heading font-bold text-slate-400 border-t border-duo-gray-100">
      CountingDuo — Petualangan Berhitung Ceria untuk Anak Indonesia 🇮🇩
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const { playPop, playCorrect } = useSoundEffects()

const palette = [
  { number: 1, name: 'Kuning Kunyit', hex: '#f59e0b', bgClass: 'bg-amber-500 border-amber-600' },
  { number: 2, name: 'Merah Merona', hex: '#ef4444', bgClass: 'bg-rose-500 border-rose-600' },
  { number: 3, name: 'Biru Laut', hex: '#3b82f6', bgClass: 'bg-blue-500 border-blue-600' },
  { number: 4, name: 'Hijau Daun', hex: '#10b981', bgClass: 'bg-emerald-500 border-emerald-600' },
  { number: 5, name: 'Cokelat Kayu', hex: '#78350f', bgClass: 'bg-amber-900 border-amber-950' }
]

const selectedPalette = ref(palette[0])
const regionColors = ref({})

const selectColor = (p) => {
  playPop()
  selectedPalette.value = p
}

const fillRegion = (regionKey, requiredNumber) => {
  playPop()
  if (selectedPalette.value.number === requiredNumber) {
    regionColors.value[regionKey] = selectedPalette.value.hex
    playCorrect()
    speakWord(`Hebat! Warna ${selectedPalette.value.name} cocok!`)
  } else {
    speakWord(`Area ini butuh warna nomor ${requiredNumber}!`)
  }
}

const resetColoring = () => {
  regionColors.value = {}
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
