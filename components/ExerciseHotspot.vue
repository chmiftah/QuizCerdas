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

      <!-- Hotspot Badge -->
      <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-900 border-2 border-sky-300 rounded-2xl font-heading font-black text-xs shrink-0 shadow-2xs">
        <span>📍 Klik Area</span>
      </div>
    </div>

    <!-- Instruction Bar -->
    <div class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs">
      <div class="flex items-center gap-2">
        <span class="text-base sm:text-lg">👆</span>
        <p class="text-xs sm:text-sm font-heading font-bold text-amber-950">
          Sentuh lingkaran target pada gambar untuk memilih bagian yang tepat!
        </p>
      </div>
    </div>

    <!-- Image with Interactive Hotspot Pins -->
    <div v-if="exercise.image" class="relative max-w-lg mx-auto rounded-3xl border-4 border-duo-gray-100 bg-white p-3 shadow-lg overflow-hidden">
      <!-- Dedicated Image Wrapper for exact percentage coordinates -->
      <div class="relative w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100">
        <img 
          :src="exercise.image" 
          :alt="exercise.question" 
          class="w-full h-auto object-cover block"
          @load="onImageLoad"
          @error="(e) => (e.target.style.display = 'none')"
          ref="imageRef"
        />

        <!-- Hotspot Pin Overlays -->
        <template v-if="imageLoaded">
          <button
            v-for="(hotspot, idx) in exercise.hotspots"
            :key="idx"
            @click="selectHotspot(hotspot.id)"
            type="button"
            :disabled="isChecked"
            class="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 group z-20"
            :class="getHotspotClass(hotspot)"
            :style="getHotspotStyle(hotspot)"
          >
            <!-- Radar Beacon Dot when Unselected -->
            <span 
              v-if="!isChecked && selectedHotspot !== hotspot.id" 
              class="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping shrink-0"
            ></span>

            <!-- Status Icons -->
            <span v-if="selectedHotspot === hotspot.id && !isChecked" class="text-base animate-bounce">⭐</span>
            <span v-else-if="isChecked && hotspot.id === exercise.correct_answer" class="text-base">✓</span>
            <span v-else-if="isChecked && selectedHotspot === hotspot.id" class="text-base">✕</span>
            <span v-else class="text-xs">🎯</span>

            <!-- Label -->
            <span>{{ hotspot.label || hotspot.id }}</span>
          </button>
        </template>

        <!-- Floating Guide Tag -->
        <span class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-heading font-extrabold tracking-wider border border-white/30 shadow-sm pointer-events-none">
          👆 SENTUH TITIK TARGET
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  selectedOption: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
const { playPop } = useSoundEffects()

const selectedHotspot = ref(props.selectedOption)
const imageRef = ref(null)
const imageLoaded = ref(false)

watch(() => props.selectedOption, (newVal) => {
  selectedHotspot.value = newVal
})

watch(() => props.exercise, () => {
  selectedHotspot.value = ''
  imageLoaded.value = false
}, { immediate: true })

const onImageLoad = () => {
  imageLoaded.value = true
}

const selectHotspot = (id) => {
  if (props.isChecked) return
  playPop()
  selectedHotspot.value = id
  emit('select', id)
}

const getHotspotStyle = (hotspot) => {
  let x = Number(hotspot.x) || 50
  let y = Number(hotspot.y) || 50

  // If already percentage (0-100)
  if (x <= 100 && y <= 100) {
    return {
      left: `${x}%`,
      top: `${y}%`
    }
  }

  // Fallback for pixel coordinates relative to natural image size
  if (imageRef.value && imageRef.value.naturalWidth) {
    const imgWidth = imageRef.value.naturalWidth
    const imgHeight = imageRef.value.naturalHeight
    return {
      left: `${(x / imgWidth) * 100}%`,
      top: `${(y / imgHeight) * 100}%`
    }
  }

  return { left: '50%', top: '50%' }
}

const getHotspotClass = (hotspot) => {
  const isSelected = selectedHotspot.value === hotspot.id

  if (props.isChecked) {
    if (hotspot.id === props.exercise.correct_answer) {
      return 'bg-emerald-500 text-white border-white ring-4 ring-emerald-300 scale-110 shadow-xl'
    }
    if (isSelected && hotspot.id !== props.exercise.correct_answer) {
      return 'bg-rose-500 text-white border-white ring-4 ring-rose-300 animate-shake'
    }
    return 'bg-white/60 text-slate-400 border-slate-200 opacity-40 pointer-events-none'
  }

  if (isSelected) {
    return 'bg-amber-400 text-amber-950 border-white ring-4 ring-amber-300 scale-110 shadow-xl'
  }

  return 'bg-white/90 text-slate-800 border-white shadow-md backdrop-blur-xs hover:bg-white hover:scale-105'
}
</script>