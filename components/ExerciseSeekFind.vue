<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Status Bar & Hint Toast -->
    <div class="space-y-2 max-w-lg mx-auto">
      <div class="flex items-center justify-between px-4 py-2 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-emerald-900 font-heading font-extrabold text-sm shadow-2xs">
        <span class="flex items-center gap-1.5">
          <span>🔍 Cari Target:</span>
          <strong class="text-emerald-700 font-black flex items-center gap-1">
            <img v-if="getObjectImageUrl(targetIcon)" :src="getObjectImageUrl(targetIcon)" class="w-6 h-6 object-cover rounded-md" />
            <span>{{ targetIcon }}</span>
          </strong>
        </span>
        <span class="px-3.5 py-1 bg-emerald-500 text-white rounded-full text-xs font-heading font-black shadow-xs">
          {{ foundCount }} / {{ targetCount }} Ditemukan
        </span>
      </div>

      <!-- Decoy Hint Toast -->
      <transition name="fade">
        <div v-if="decoyHintText" class="px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl text-amber-900 font-heading font-bold text-xs text-center shadow-sm animate-bounce">
          {{ decoyHintText }}
        </div>
      </transition>
    </div>

    <!-- Interactive Scene Box -->
    <div class="relative bg-emerald-50 rounded-3xl border-4 border-emerald-300 shadow-xl min-h-[320px] sm:min-h-[360px] overflow-hidden max-w-lg mx-auto p-4">
      <!-- Background Scenery Details -->
      <span class="absolute bottom-2 left-3 text-4xl opacity-30 pointer-events-none">🌳</span>
      <span class="absolute top-3 right-5 text-4xl opacity-30 pointer-events-none">☀️</span>
      <span class="absolute bottom-3 right-6 text-4xl opacity-30 pointer-events-none">🌸</span>
      <span class="absolute top-12 left-6 text-3xl opacity-20 pointer-events-none">☁️</span>
      <span class="absolute bottom-16 right-20 text-3xl opacity-25 pointer-events-none">🍄</span>

      <!-- Scattered Hidden Objects (Targets + Decoys) -->
      <button
        v-for="(item, idx) in hiddenItems"
        :key="idx"
        @click="tapItem(item, idx)"
        type="button"
        class="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md overflow-hidden"
        :class="[
          foundIndices.has(idx) 
            ? 'bg-amber-300 border-3 border-amber-500 scale-110 shadow-lg ring-4 ring-amber-300/50 z-20' 
            : wrongShakeIdx === idx 
              ? 'bg-rose-100 border-3 border-rose-400 animate-shake scale-105 z-20 ring-4 ring-rose-200'
              : 'bg-white/95 border-2 border-emerald-200 hover:scale-110 hover:border-emerald-400 hover:shadow-lg z-10'
        ]"
        :style="{ left: `${item.x}%`, top: `${item.y}%` }"
      >
        <img 
          v-if="getObjectImageUrl(item.icon)" 
          :src="getObjectImageUrl(item.icon)" 
          :alt="item.icon" 
          @error="(e) => (e.target.style.display = 'none')"
          class="w-full h-full object-cover" 
        />
        <span v-else class="text-2xl sm:text-3xl flex items-center justify-center w-full h-full">
          {{ item.icon }}
        </span>

        <!-- Target Found Badge -->
        <span 
          v-if="foundIndices.has(idx)" 
          class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-heading font-black flex items-center justify-center shadow-sm border-2 border-white animate-pop"
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
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['updateCount'])
const { playPop, playError } = useSoundEffects()

const foundIndices = ref(new Set())
const wrongShakeIdx = ref(null)
const decoyHintText = ref('')
let decoyTimer = null

const targetCount = computed(() => parseInt(props.exercise.correct_answer) || 2)

const targetIcon = computed(() => {
  if (props.exercise.visual?.label) return props.exercise.visual.label
  const q = (props.exercise.question || '').toLowerCase()
  if (q.includes('kelinci')) return '🐰'
  if (q.includes('kucing')) return '🐱'
  if (q.includes('bebek')) return '🦆'
  if (q.includes('ayam')) return '🐔'
  if (q.includes('singa')) return '🦁'
  if (q.includes('gajah')) return '🐘'
  if (q.includes('apel')) return '🍎'
  if (q.includes('kupu')) return '🦋'
  return '🐰'
})

const DECOY_POOL = ['🐱', '🦆', '🐔', '🌸', '🍄', '🦋', '🐝', '🐞', '🐸', '🍎', '🍌']

const hiddenItems = ref([])

function generateScatteredItems() {
  const items = []
  const count = targetCount.value
  const target = targetIcon.value

  // Preset non-overlapping coordinate slots in % (left 10-80, top 10-75)
  const slots = [
    { x: 12, y: 15 }, { x: 72, y: 18 }, { x: 42, y: 22 },
    { x: 20, y: 48 }, { x: 78, y: 52 }, { x: 50, y: 65 },
    { x: 15, y: 78 }, { x: 70, y: 78 }, { x: 38, y: 42 }
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

  // 2. Spawn 4 to 5 decoy items
  const availableDecoys = DECOY_POOL.filter(d => d !== target).sort(() => Math.random() - 0.5)
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

  // Shuffle items so targets are at random array positions
  hiddenItems.value = items.sort(() => Math.random() - 0.5)
}

const foundCount = computed(() => foundIndices.value.size)

const tapItem = (item, idx) => {
  if (props.isChecked) return

  if (item.isTarget) {
    if (!foundIndices.value.has(idx)) {
      playPop()
      foundIndices.value.add(idx)
      emit('updateCount', foundIndices.value.size)
      speakWord(`${foundIndices.value.size}!`)
      decoyHintText.value = ''
    }
  } else {
    // Decoy item tapped!
    playError()
    wrongShakeIdx.value = idx
    setTimeout(() => { wrongShakeIdx.value = null }, 500)

    decoyHintText.value = `💡 Oops! Itu ${item.icon}. Cari ${targetIcon.value} yang bersembunyi!`
    if (decoyTimer) clearTimeout(decoyTimer)
    decoyTimer = setTimeout(() => { decoyHintText.value = '' }, 2500)
    speakWord(`Cari ${targetIcon.value}!`)
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
