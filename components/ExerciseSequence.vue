<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Sequence Cards Display -->
    <div class="p-5 sm:p-6 bg-amber-50/80 rounded-3xl border-3 border-amber-300 shadow-md flex justify-center items-center gap-2.5 sm:gap-3.5 flex-wrap">
      <button
        v-for="(item, idx) in currentSequence"
        :key="idx"
        @click="handleCardClick(idx)"
        type="button"
        class="rounded-2xl font-heading font-black flex items-center justify-center border-4 shadow-md transition-all duration-200 cursor-pointer active:scale-95 px-3 py-2.5 sm:px-5 sm:py-3.5"
        :class="[
          isLongText(item) 
            ? 'min-w-[110px] sm:min-w-[130px] h-16 sm:h-20 text-sm sm:text-base md:text-lg whitespace-nowrap' 
            : 'w-16 h-20 sm:w-20 sm:h-24 text-3xl sm:text-4xl',
          item === '?' 
            ? 'bg-amber-300 text-amber-950 border-amber-500 animate-pulse' 
            : selectedIdx === idx 
              ? 'bg-amber-400 text-white border-amber-600 scale-105 shadow-lg ring-4 ring-amber-300/50' 
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
        ]"
      >
        <div class="flex items-center justify-center gap-2">
          <img 
            v-if="getObjectImageUrl(item)" 
            :src="getObjectImageUrl(item)" 
            :alt="item" 
            class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg shadow-2xs border border-slate-200 shrink-0" 
          />
          <span>{{ item }}</span>
        </div>
      </button>
    </div>

    <!-- Options Palette -->
    <div 
      v-if="exercise.options && exercise.options.length > 0" 
      :class="hasLongTextOptions ? 'flex flex-wrap justify-center gap-3 max-w-xl mx-auto' : 'grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto'"
    >
      <button
        v-for="opt in exercise.options"
        :key="opt"
        @click="selectMissingOption(opt)"
        type="button"
        class="rounded-2xl font-heading font-black border-3 transition-all cursor-pointer shadow-sm active:scale-95 text-center flex items-center justify-center gap-2"
        :class="[
          hasLongTextOptions 
            ? 'px-5 py-3.5 text-sm sm:text-base min-w-[120px] shadow-md' 
            : 'p-3 sm:p-4 text-xl sm:text-2xl min-h-[64px]',
          selectedOption === opt 
            ? 'bg-duo-green text-white border-duo-green-dark scale-105 shadow-md ring-4 ring-duo-green/20' 
            : 'bg-white text-slate-800 border-slate-200 hover:border-duo-green hover:bg-emerald-50/50'
        ]"
      >
        <img 
          v-if="getObjectImageUrl(opt)" 
          :src="getObjectImageUrl(opt)" 
          :alt="opt" 
          class="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-lg shadow-2xs shrink-0" 
        />
        <span>{{ opt }}</span>
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
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select', 'updateSequence'])
const { playPop } = useSoundEffects()

const currentSequence = ref([])
const selectedIdx = ref(null)

const isLongText = (text) => {
  if (!text) return false
  const clean = String(text).replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/gu, '').trim()
  return clean.length > 3
}

const hasLongTextOptions = computed(() => {
  if (!props.exercise.options || props.exercise.options.length === 0) return false
  return props.exercise.options.some(opt => isLongText(opt))
})

const initSequence = () => {
  if (props.exercise.visual?.sequence) {
    currentSequence.value = [...props.exercise.visual.sequence]
  } else {
    currentSequence.value = ['1', '2', '?', '4']
  }
  selectedIdx.value = null
}

const selectMissingOption = (opt) => {
  if (props.isChecked) return
  playPop()
  emit('select', opt)
  
  // Replace '?' in sequence
  const newSeq = [...currentSequence.value]
  const qIdx = newSeq.indexOf('?')
  if (qIdx !== -1) {
    newSeq[qIdx] = opt
    currentSequence.value = newSeq
  }
}

const handleCardClick = (idx) => {
  if (props.isChecked) return
  playPop()
  if (selectedIdx.value === null) {
    selectedIdx.value = idx
  } else {
    // Swap two cards
    const arr = [...currentSequence.value]
    const temp = arr[selectedIdx.value]
    arr[selectedIdx.value] = arr[idx]
    arr[idx] = temp
    currentSequence.value = arr
    selectedIdx.value = null
    emit('select', arr.join(','))
  }
}

watch(() => props.exercise, () => {
  initSequence()
}, { immediate: true })

onMounted(() => {
  initSequence()
})
</script>
