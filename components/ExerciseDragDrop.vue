<template>
  <div class="space-y-6 select-none">
    <!-- Question Header with Audio Player Button -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Instruction Subtitle -->
    <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500">
      👆 Ketuk/seret buah di area atas untuk memasukkannya ke dalam keranjang!
    </p>

    <!-- Source Items Pool -->
    <div class="p-4 bg-amber-50/70 rounded-3xl border-2 border-amber-200 shadow-inner max-w-md mx-auto">
      <div class="text-xs font-heading font-bold text-amber-800 mb-2 text-center uppercase tracking-wider">
        PILIH & KETUK OBJEK:
      </div>
      <div class="flex flex-wrap justify-center gap-3 min-h-[60px]">
        <div
          v-for="(item, idx) in poolItems"
          :key="'pool-' + idx"
          @click="moveToBasket(idx)"
          class="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center text-3xl cursor-pointer hover:scale-110 active:scale-95 transition-transform animate-pop"
        >
          {{ item }}
        </div>
        <div v-if="poolItems.length === 0" class="text-xs font-heading text-slate-400 py-3">
          Semua objek sudah dimasukkan ke keranjang! 🎉
        </div>
      </div>
    </div>

    <!-- Target Basket Container -->
    <div class="p-6 bg-amber-100 rounded-3xl border-4 border-amber-400 shadow-lg max-w-md mx-auto text-center space-y-3 relative overflow-hidden">
      <div class="flex items-center justify-between px-2">
        <span class="font-heading font-extrabold text-amber-900 text-sm sm:text-base">
          🧺 Keranjang
        </span>
        <span class="px-3 py-1 bg-amber-500 text-white rounded-full font-heading font-black text-xs shadow-xs">
          Total: {{ basketItems.length }} Objek
        </span>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 min-h-[100px] border-2 border-amber-300 flex flex-wrap justify-center items-center gap-3 shadow-inner">
        <div
          v-for="(item, idx) in basketItems"
          :key="'basket-' + idx"
          @click="removeFromBasket(idx)"
          class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-2xl sm:text-3xl shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform animate-pop"
        >
          {{ item }}
          <span class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white font-heading font-black text-[10px] flex items-center justify-center shadow-xs">
            {{ idx + 1 }}
          </span>
        </div>

        <div v-if="basketItems.length === 0" class="text-xs font-heading font-bold text-amber-600/70 py-4">
          Seret / ketuk buah di atas untuk memasukkannya ke sini! 🧺
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['updateCount'])

const { playPop } = useSoundEffects()

const poolItems = ref([])
const basketItems = ref([])

const initItems = () => {
  const ex = props.exercise
  const targetCount = parseInt(ex.correct_answer) || 3
  const itemIcon = ex.visual?.label || '🍎'
  
  // Provide extra items to make it a real counting puzzle
  const totalPool = Math.max(targetCount + 2, 5)
  poolItems.value = Array(totalPool).fill(itemIcon)
  basketItems.value = []
  emit('updateCount', 0)
}

watch(() => props.exercise, () => {
  initItems()
}, { immediate: true })

const moveToBasket = (idx) => {
  if (props.isChecked) return
  playPop()
  const item = poolItems.value.splice(idx, 1)[0]
  basketItems.value.push(item)
  emit('updateCount', basketItems.value.length)
  speakWord(`${basketItems.value.length}!`)
}

const removeFromBasket = (idx) => {
  if (props.isChecked) return
  playPop()
  const item = basketItems.value.splice(idx, 1)[0]
  poolItems.value.push(item)
  emit('updateCount', basketItems.value.length)
}

const speakWord = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.1
    window.speechSynthesis.speak(utterance)
  }
}

onMounted(() => {
  initItems()
})
</script>
