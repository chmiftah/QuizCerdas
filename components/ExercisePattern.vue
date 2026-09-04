<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Sequence Pattern Box -->
    <div class="p-6 bg-purple-50 rounded-3xl border-3 border-purple-300 shadow-md flex justify-center items-center gap-3 flex-wrap">
      <div
        v-for="(item, idx) in patternList"
        :key="idx"
        class="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl font-heading font-black text-4xl sm:text-5xl flex items-center justify-center border-4 shadow-md bg-white text-slate-800 border-slate-200 animate-pop overflow-hidden p-1"
        :class="item === '?' ? 'bg-purple-200 border-purple-500 animate-pulse text-purple-800' : ''"
      >
        <template v-if="item === '?'">
          <img 
            v-if="selectedOption && getObjectImageUrl(selectedOption)" 
            :src="getObjectImageUrl(selectedOption)" 
            class="w-full h-full object-cover rounded-xl" 
          />
          <span v-else>{{ selectedOption || '?' }}</span>
        </template>
        <template v-else>
          <img 
            v-if="getObjectImageUrl(item)" 
            :src="getObjectImageUrl(item)" 
            :alt="item" 
            class="w-full h-full object-cover rounded-xl" 
          />
          <span v-else>{{ item }}</span>
        </template>
      </div>
    </div>

    <!-- Options Palette -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
      <button
        v-for="opt in (exercise.options || ['🍎', '🍌', '🍇', '🍊'])"
        :key="opt"
        @click="selectOption(opt)"
        type="button"
        class="p-3 sm:p-4 rounded-2xl font-heading font-black border-3 transition-all cursor-pointer shadow-xs active:scale-95 text-center flex items-center justify-center min-h-[70px] overflow-hidden"
        :class="selectedOption === opt 
          ? 'bg-purple-500 text-white border-purple-700 shadow-md scale-110 ring-4 ring-purple-300' 
          : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300'"
      >
        <img 
          v-if="getObjectImageUrl(opt)" 
          :src="getObjectImageUrl(opt)" 
          :alt="opt" 
          class="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shadow-xs" 
        />
        <span v-else class="text-3xl sm:text-4xl">{{ opt }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const patternList = computed(() => {
  return props.exercise.visual?.pattern || ['🍎', '🍌', '🍎', '🍌', '?']
})

const selectOption = (opt) => {
  if (props.isChecked) return
  playPop()
  emit('select', opt)
}
</script>
