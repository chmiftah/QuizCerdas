<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Visual Comparison Side-by-Side Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
      <!-- Group A -->
      <div 
        @click="selectGroup(optionAValue)"
        class="p-5 bg-rose-50 border-4 rounded-3xl text-center space-y-3 cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm relative overflow-hidden"
        :class="isGroupASelected ? 'border-rose-500 ring-4 ring-rose-300 bg-rose-100/90 shadow-md scale-105' : 'border-rose-200/90 hover:border-rose-300'"
      >
        <div class="font-heading font-extrabold text-xs text-rose-800 uppercase tracking-wider">
          {{ groupALabelDisplay }}
        </div>
        <div class="flex flex-wrap justify-center gap-2 min-h-[70px] items-center py-1">
          <template v-for="n in (groupA.count || 3)" :key="'a-'+n">
            <div 
              v-if="getObjectImageUrl(groupA.icon || groupA.label)" 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-xs border border-rose-300 animate-pop hover:scale-125 transition-transform bg-white"
            >
              <img :src="getObjectImageUrl(groupA.icon || groupA.label)" class="w-full h-full object-cover" />
            </div>
            <span 
              v-else 
              class="text-4xl animate-pop hover:scale-125 transition-transform"
            >
              {{ groupA.icon || '🍎' }}
            </span>
          </template>
        </div>
        <div class="font-heading font-black text-lg text-rose-900">
          {{ groupA.count || 3 }} Objek
        </div>
      </div>

      <!-- Group B -->
      <div 
        @click="selectGroup(optionBValue)"
        class="p-5 bg-sky-50 border-4 rounded-3xl text-center space-y-3 cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm relative overflow-hidden"
        :class="isGroupBSelected ? 'border-sky-500 ring-4 ring-sky-300 bg-sky-100/90 shadow-md scale-105' : 'border-sky-200/90 hover:border-sky-300'"
      >
        <div class="font-heading font-extrabold text-xs text-sky-800 uppercase tracking-wider">
          {{ groupBLabelDisplay }}
        </div>
        <div class="flex flex-wrap justify-center gap-2 min-h-[70px] items-center py-1">
          <template v-for="n in (groupB.count || 5)" :key="'b-'+n">
            <div 
              v-if="getObjectImageUrl(groupB.icon || groupB.label)" 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-xs border border-sky-300 animate-pop hover:scale-125 transition-transform bg-white"
            >
              <img :src="getObjectImageUrl(groupB.icon || groupB.label)" class="w-full h-full object-cover" />
            </div>
            <span 
              v-else 
              class="text-4xl animate-pop hover:scale-125 transition-transform"
            >
              {{ groupB.icon || '🍌' }}
            </span>
          </template>
        </div>
        <div class="font-heading font-black text-lg text-sky-900">
          {{ groupB.count || 5 }} Objek
        </div>
      </div>
    </div>

    <!-- Answer Options Buttons -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
      <button
        v-for="opt in computedOptions"
        :key="opt.value"
        @click="selectGroup(opt.value)"
        type="button"
        class="p-4 rounded-2xl font-heading font-bold text-sm sm:text-base border-3 transition-all cursor-pointer shadow-xs active:scale-95 text-center flex items-center justify-center gap-2 min-h-[56px]"
        :class="isOptionSelected(opt.value)
          ? 'bg-duo-green text-white border-duo-green-dark shadow-md scale-105 ring-4 ring-duo-green/20' 
          : 'bg-white text-slate-800 border-slate-200 hover:border-duo-green hover:bg-emerald-50/30'"
      >
        <img 
          v-if="getObjectImageUrl(opt.value)" 
          :src="getObjectImageUrl(opt.value)" 
          class="w-7 h-7 object-cover rounded-lg shadow-2xs shrink-0" 
        />
        <span>{{ opt.label }}</span>
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

const groupA = computed(() => props.exercise.visual?.groupA || { count: 3, icon: '🍎', label: 'Kelompok A' })
const groupB = computed(() => props.exercise.visual?.groupB || { count: 5, icon: '🍌', label: 'Kelompok B' })

const groupALabelDisplay = computed(() => groupA.value.label || 'Kelompok A')
const groupBLabelDisplay = computed(() => groupB.value.label || 'Kelompok B')

// Resolve correct option values matching exercise JSON
const optionAValue = computed(() => {
  if (props.exercise.options && props.exercise.options.length > 0) {
    return props.exercise.options[0]
  }
  return 'A'
})

const optionBValue = computed(() => {
  if (props.exercise.options && props.exercise.options.length > 1) {
    return props.exercise.options[1]
  }
  return 'B'
})

const optionEqualValue = computed(() => {
  if (props.exercise.options && props.exercise.options.length > 2) {
    return props.exercise.options[2]
  }
  return 'Sama'
})

const computedOptions = computed(() => {
  const labelA = optionAValue.value === 'A' ? 'Kelompok A Lebih Banyak' : `${optionAValue.value} (Kelompok A)`
  const labelB = optionBValue.value === 'B' ? 'Kelompok B Lebih Banyak' : `${optionBValue.value} (Kelompok B)`
  const labelEq = optionEqualValue.value === 'Sama' ? 'Sama Banyak (=)' : optionEqualValue.value

  return [
    { value: optionAValue.value, label: labelA },
    { value: optionBValue.value, label: labelB },
    { value: optionEqualValue.value, label: labelEq }
  ]
})

const isOptionSelected = (val) => {
  if (!props.selectedOption || !val) return false
  return props.selectedOption.trim().toLowerCase() === String(val).trim().toLowerCase()
}

const isGroupASelected = computed(() => isOptionSelected(optionAValue.value) || isOptionSelected('A') || isOptionSelected(groupA.value.label))
const isGroupBSelected = computed(() => isOptionSelected(optionBValue.value) || isOptionSelected('B') || isOptionSelected(groupB.value.label))

const selectGroup = (val) => {
  if (props.isChecked) return
  playPop()
  emit('select', val)
}
</script>
