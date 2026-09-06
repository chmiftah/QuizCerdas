<template>
  <div class="space-y-5 sm:space-y-6 select-none max-w-lg mx-auto w-full">
    <!-- Question Header & Audio Player Button -->
    <div class="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-duo-gray-100 shadow-xs">
      <div class="flex items-center gap-2.5">
        <h2 class="font-heading text-lg sm:text-2xl text-slate-800 font-black leading-snug">
          {{ exercise.question }}
        </h2>
        <AudioPlayerButton :text="exercise.question" />
      </div>

      <!-- Seek & Find Badge -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border-2 border-emerald-300 rounded-2xl font-heading font-black text-xs shrink-0 shadow-2xs">
        <span>🔎 Cari Objek</span>
      </div>
    </div>

    <!-- Status Bar & Hint Toast -->
    <div class="space-y-2 max-w-lg mx-auto w-full">
      <div class="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-emerald-950 font-heading font-extrabold text-sm shadow-2xs">
        <span class="flex items-center gap-2">
          <span class="text-base">🔍</span>
          <span class="text-slate-700">Cari Target:</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-xl border border-emerald-200 shadow-2xs">
            <span class="text-2xl animate-bounce">{{ targetIcon }}</span>
            <span class="text-xs font-black text-emerald-800">{{ targetName }}</span>
          </span>
        </span>
        <span 
          class="px-3 py-1 rounded-full text-xs font-heading font-black shadow-xs transition-colors"
          :class="foundCount >= targetCount ? 'bg-emerald-500 text-white animate-bounce' : 'bg-amber-400 text-amber-950'"
        >
          {{ foundCount }} / {{ targetCount }} Ditemukan
        </span>
      </div>

      <!-- Decoy Hint Toast -->
      <transition name="fade">
        <div 
          v-if="decoyHintText" 
          class="px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl text-amber-900 font-heading font-extrabold text-xs text-center shadow-sm animate-bounce flex items-center justify-center gap-1.5"
        >
          <span>💡</span>
          <span>{{ decoyHintText }}</span>
        </div>
      </transition>
    </div>

    <!-- Interactive Garden Scene Box -->
    <div class="relative bg-linear-to-b from-emerald-100/90 to-emerald-200/80 rounded-3xl border-4 border-emerald-300 shadow-xl min-h-[340px] sm:min-h-[380px] overflow-hidden max-w-lg mx-auto p-4 select-none">
      <!-- Cartoon Garden Background Decor (Trees, Flowers, Sun, Clouds) -->
      <span class="absolute bottom-2 left-3 text-4xl opacity-40 pointer-events-none select-none">🌳</span>
      <span class="absolute top-3 right-4 text-4xl opacity-40 pointer-events-none select-none">☀️</span>
      <span class="absolute bottom-3 right-4 text-4xl opacity-40 pointer-events-none select-none">🌸</span>
      <span class="absolute top-4 left-6 text-3xl opacity-30 pointer-events-none select-none">☁️</span>
      <span class="absolute bottom-16 right-16 text-3xl opacity-35 pointer-events-none select-none">🍄</span>
      <span class="absolute top-24 left-1/3 text-2xl opacity-25 pointer-events-none select-none">🌿</span>

      <!-- Scattered Hidden Objects (Targets + Garden Themed Decoys) -->
      <button
        v-for="(item, idx) in hiddenItems"
        :key="idx"
        @click="tapItem(item, idx)"
        type="button"
        :disabled="isChecked"
        class="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md overflow-visible active:scale-95 group"
        :class="[
          foundIndices.has(idx) 
            ? 'bg-amber-300 border-3 border-amber-500 scale-110 shadow-lg ring-4 ring-amber-300/50 z-20' 
            : wrongShakeIdx === idx 
              ? 'bg-rose-100 border-3 border-rose-400 animate-shake scale-105 z-20 ring-4 ring-rose-200'
              : 'bg-white/95 border-2 border-emerald-200 hover:scale-110 hover:border-emerald-400 hover:shadow-lg z-10'
        ]"
        :style="{ left: `${item.x}%`, top: `${item.y}%` }"
        :title="item.isTarget ? targetName : 'Benda lain'"
      >
        <!-- Clean, Consistent Cartoon/Emoji Object -->
        <span class="text-3xl sm:text-4xl flex items-center justify-center w-full h-full select-none filter drop-shadow-xs group-hover:scale-110 transition-transform">
          {{ item.icon }}
        </span>

        <!-- Target Found Checkmark Badge -->
        <span 
          v-if="foundIndices.has(idx)" 
          class="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-heading font-black flex items-center justify-center shadow-md border-2 border-white animate-pop"
        >
          ✓
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['updateCount'])
const { playPop, playError, playCorrect } = useSoundEffects()

const foundIndices = ref(new Set())
const wrongShakeIdx = ref(null)
const decoyHintText = ref('')
let decoyTimer = null

const targetCount = computed(() => parseInt(props.exercise.correct_answer) || 2)

const TARGET_MAP = {
  kupu: { icon: '🦋', name: 'Kupu-kupu' },
  kelinci: { icon: '🐰', name: 'Kelinci' },
  kucing: { icon: '🐱', name: 'Kucing' },
  bebek: { icon: '🦆', name: 'Bebek' },
  ayam: { icon: '🐔', name: 'Ayam' },
  singa: { icon: '🦁', name: 'Singa' },
  gajah: { icon: '🐘', name: 'Gajah' },
  apel: { icon: '🍎', name: 'Apel' },
  bintang: { icon: '⭐', name: 'Bintang' },
  ikan: { icon: '🐟', name: 'Ikan' },
  bunga: { icon: '🌸', name: 'Bunga' }
}

const targetInfo = computed(() => {
  const label = props.exercise.visual?.label
  if (label) {
    for (const [k, val] of Object.entries(TARGET_MAP)) {
      if (label.includes(val.icon) || label.toLowerCase().includes(k)) {
        return val
      }
    }
    return { icon: label, name: 'Target' }
  }

  const q = (props.exercise.question || '').toLowerCase()
  for (const [k, val] of Object.entries(TARGET_MAP)) {
    if (q.includes(k)) {
      return val
    }
  }

  return { icon: '🦋', name: 'Kupu-kupu' }
})

const targetIcon = computed(() => targetInfo.value.icon)
const targetName = computed(() => targetInfo.value.name)

// Harmonious, nature-friendly garden decoys
const GARDEN_DECOY_POOL = ['🌸', '🍄', '🐞', '🐝', '🐸', '🌿', '🌼', '🌻', '🍎']

const hiddenItems = ref([])

function generateScatteredItems() {
  const items = []
  const count = targetCount.value
  const target = targetIcon.value

  // Preset non-overlapping coordinate slots in %
  const slots = [
    { x: 12, y: 15 }, { x: 72, y: 16 }, { x: 40, y: 22 },
    { x: 18, y: 48 }, { x: 76, y: 48 }, { x: 48, y: 64 },
    { x: 14, y: 76 }, { x: 68, y: 76 }, { x: 36, y: 42 }
  ].sort(() => Math.random() - 0.5)

  // 1. Spawn target items
  for (let i = 0; i < count; i++) {
    const slot = slots.pop() || { x: 20 + i * 15, y: 30 }
    items.push({
      x: slot.x,
      y: slot.y,
      icon: target,
      isTarget: true
    })
  }

  // 2. Spawn garden themed decoys
  const availableDecoys = GARDEN_DECOY_POOL.filter(d => d !== target).sort(() => Math.random() - 0.5)
  const decoyCount = Math.min(4, slots.length)

  for (let i = 0; i < decoyCount; i++) {
    const slot = slots.pop()
    if (!slot) break
    items.push({
      x: slot.x,
      y: slot.y,
      icon: availableDecoys[i % availableDecoys.length],
      isTarget: false
    })
  }

  // Shuffle so targets are in random DOM positions
  hiddenItems.value = items.sort(() => Math.random() - 0.5)
}

const foundCount = computed(() => foundIndices.value.size)

const tapItem = (item, idx) => {
  if (props.isChecked) return

  if (item.isTarget) {
    if (!foundIndices.value.has(idx)) {
      foundIndices.value.add(idx)
      emit('updateCount', foundIndices.value.size)

      if (foundIndices.value.size >= targetCount.value) {
        playCorrect()
        speakWord(`Hebat! Semua ${targetName.value} sudah ditemukan!`)
      } else {
        playPop()
        speakWord(`${foundIndices.value.size}!`)
      }

      decoyHintText.value = ''
    }
  } else {
    // Decoy item tapped!
    playError()
    wrongShakeIdx.value = idx
    setTimeout(() => { wrongShakeIdx.value = null }, 500)

    decoyHintText.value = `Oops! Itu ${item.icon}. Cari ${targetName.value} ${targetIcon.value} yang bersembunyi ya!`
    if (decoyTimer) clearTimeout(decoyTimer)
    decoyTimer = setTimeout(() => { decoyHintText.value = '' }, 2500)
    speakWord(`Cari ${targetName.value}!`)
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

watch(() => props.exercise, () => {
  foundIndices.value.clear()
  generateScatteredItems()
  emit('updateCount', 0)
}, { immediate: true })

onMounted(() => {
  foundIndices.value.clear()
  generateScatteredItems()
  emit('updateCount', 0)
})
</script>
