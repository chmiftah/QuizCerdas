<template>
  <div class="space-y-6 select-none">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Puzzle Slots -->
    <div class="flex justify-center gap-3">
      <div
        v-for="(piece, idx) in slots"
        :key="idx"
        @click="returnPiece(idx)"
        class="w-20 h-20 rounded-2xl bg-amber-100 border-4 border-amber-300 flex items-center justify-center font-heading text-3xl font-black shadow-inner cursor-pointer hover:bg-amber-200 transition-all"
      >
        {{ piece || '❓' }}
      </div>
    </div>

    <!-- Pieces Pool -->
    <div class="flex justify-center gap-3 pt-4">
      <button
        v-for="(piece, idx) in pool"
        :key="idx"
        @click="placePiece(piece, idx)"
        type="button"
        class="w-20 h-20 rounded-2xl bg-white border-4 border-slate-200 shadow-md flex items-center justify-center font-heading text-3xl font-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': usedPool.has(idx) }"
        :disabled="usedPool.has(idx) || isChecked"
      >
        {{ piece }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const slots = ref([])
const pool = ref([])
const usedPool = ref(new Set())

const init = () => {
  const ex = props.exercise
  const answer = ex.correct_answer.split(',')
  slots.value = Array(answer.length).fill('')
  pool.value = [...answer].sort(() => Math.random() - 0.5)
  usedPool.value = new Set()
  emit('select', '')
}

const placePiece = (piece, idx) => {
  if (props.isChecked || usedPool.value.has(idx)) return
  playPop()
  const firstEmpty = slots.value.findIndex(s => s === '')
  if (firstEmpty !== -1) {
    slots.value[firstEmpty] = piece
    usedPool.value.add(idx)
    emit('select', slots.value.join(','))
  }
}

const returnPiece = (slotIdx) => {
  if (props.isChecked || !slots.value[slotIdx]) return
  playPop()
  slots.value[slotIdx] = ''
  // Reset pool usage
  usedPool.value = new Set()
  emit('select', slots.value.join(','))
}

watch(() => props.exercise, init, { immediate: true })
</script>