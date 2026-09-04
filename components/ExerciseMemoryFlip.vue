<template>
  <div class="space-y-6 select-none max-w-md mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Status Bar -->
    <div class="flex items-center justify-between px-4 py-2 bg-amber-50 rounded-2xl border-2 border-amber-200 text-amber-900 font-heading font-extrabold text-sm shadow-2xs">
      <span>🃏 Pasangan Cocok:</span>
      <span class="px-3.5 py-1 bg-amber-500 text-white rounded-full text-xs font-black shadow-xs">
        {{ matchedPairs.size }} / {{ totalPairs }} Pasangan
      </span>
    </div>

    <!-- Memory Cards Grid (2x2 or 2x3) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      <button
        v-for="(card, idx) in cards"
        :key="idx"
        @click="flipCard(idx)"
        type="button"
        :disabled="isChecked || card.isMatched"
        class="h-32 sm:h-36 rounded-3xl border-3 transition-all duration-300 cursor-pointer relative shadow-md overflow-hidden perspective-500"
        :class="[
          card.isFlipped || card.isMatched
            ? 'bg-white border-emerald-400 shadow-lg scale-102'
            : 'bg-emerald-500 border-teal-600 hover:scale-105 active:scale-95'
        ]"
      >
        <!-- Card Front (When Flipped / Matched) -->
        <div v-if="card.isFlipped || card.isMatched" class="w-full h-full p-2.5 flex flex-col items-center justify-between animate-pop">
          <div class="w-full flex-1 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
            <img 
              v-if="getObjectImageUrl(card.value)" 
              :src="getObjectImageUrl(card.value)" 
              :alt="card.value" 
              class="w-full h-full object-cover" 
            />
            <span v-else class="text-4xl flex items-center justify-center">
              {{ card.value }}
            </span>
          </div>
          <span class="font-heading font-extrabold text-xs text-slate-800 tracking-wide mt-1">
            {{ card.value }}
          </span>

          <!-- Matched Checkmark Badge -->
          <span v-if="card.isMatched" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shadow-md border border-white">
            ✓
          </span>
        </div>

        <!-- Card Back (Covered Pattern) -->
        <div v-else class="w-full h-full flex flex-col items-center justify-center text-white space-y-1">
          <span class="text-3xl sm:text-4xl opacity-90 drop-shadow-xs">❓</span>
          <span class="font-heading font-black text-[10px] uppercase tracking-wider text-teal-100 opacity-80">CountingDuo</span>
        </div>
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

const emit = defineEmits(['updateMatchCount'])
const { playPop, playWrong } = useSoundEffects()

const cards = ref([])
const flippedIndices = ref([])
const matchedPairs = ref(new Set())

const rawPairs = computed(() => {
  if (props.exercise.pairs && Array.isArray(props.exercise.pairs)) {
    return props.exercise.pairs
  }
  return ['Kucing', 'Kelinci']
})

const totalPairs = computed(() => rawPairs.value.length)

function setupCards() {
  const cardList = []
  rawPairs.value.forEach(val => {
    // Add two cards for each pair value
    cardList.push({ value: val, isFlipped: false, isMatched: false })
    cardList.push({ value: val, isFlipped: false, isMatched: false })
  })
  // Shuffle cards randomly
  cards.value = cardList.sort(() => Math.random() - 0.5)
  matchedPairs.value.clear()
  flippedIndices.value = []
}

const flipCard = (idx) => {
  if (props.isChecked) return
  const card = cards.value[idx]
  if (card.isFlipped || card.isMatched || flippedIndices.value.length >= 2) return

  playPop()
  card.isFlipped = true
  flippedIndices.value.push(idx)

  if (flippedIndices.value.length === 2) {
    const [firstIdx, secondIdx] = flippedIndices.value
    const firstCard = cards.value[firstIdx]
    const secondCard = cards.value[secondIdx]

    if (firstCard.value === secondCard.value) {
      // Pair Matched!
      setTimeout(() => {
        firstCard.isMatched = true
        secondCard.isMatched = true
        matchedPairs.value.add(firstCard.value)
        flippedIndices.value = []
        emit('updateMatchCount', matchedPairs.value.size)
      }, 300)
    } else {
      // Not Matched -> Flip back after delay
      setTimeout(() => {
        playWrong()
        firstCard.isFlipped = false
        secondCard.isFlipped = false
        flippedIndices.value = []
      }, 800)
    }
  }
}

watch(() => props.exercise, () => {
  setupCards()
  emit('updateMatchCount', 0)
}, { immediate: true })

onMounted(() => {
  setupCards()
  emit('updateMatchCount', 0)
})
</script>
