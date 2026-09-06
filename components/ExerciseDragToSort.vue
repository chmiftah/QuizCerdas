<template>
  <div class="space-y-6 select-none">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Instruction -->
    <p class="text-xs sm:text-sm font-heading font-semibold text-slate-500 text-center">
      👆 Seret objek ke kategori yang tepat!
    </p>

    <!-- Source Items Pool -->
    <div class="p-4 bg-sky-50/70 rounded-3xl border-2 border-sky-200 shadow-inner max-w-2xl mx-auto">
      <div class="text-xs font-heading font-bold text-sky-800 mb-3 text-center uppercase tracking-wider">
        SERET KE KATEGORI:
      </div>
      <div class="flex flex-wrap justify-center gap-3 min-h-[80px] pb-3">
        <div
          v-for="(item, idx) in poolItems"
          :key="'pool-' + idx"
          draggable="true"
          @dragstart="dragStart(item, idx)"
          class="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center text-3xl cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform animate-pop"
        >
          {{ item }}
        </div>
      </div>
      <p class="text-[11px] font-heading text-slate-400 text-center mt-2">
        Seret objek ke salah satu kategori di bawah ⬇️
      </p>
    </div>

    <!-- Categories -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
      <div
        v-for="category in categories"
        :key="category.name"
        @dragover.prevent
        @drop="dropToCategory(category.name)"
        class="p-4 rounded-3xl border-3 border-dashed transition-all min-h-[120px] flex flex-col items-center justify-center gap-2"
        :class="{
          'bg-emerald-50 border-emerald-300 hover:bg-emerald-100/70': category.name === 'darat',
          'bg-blue-50 border-blue-300 hover:bg-blue-100/70': category.name === 'air',
          'bg-amber-50 border-amber-300 hover:bg-amber-100/70': category.name === 'udara',
        }"
      >
        <div class="text-3xl">{{ category.icon }}</div>
        <div class="font-heading font-black text-lg text-slate-800">{{ category.label }}</div>
        <div class="text-xs font-heading font-semibold text-slate-600 mt-1">
          {{ getCategoryCount(category.name) }} objek
        </div>

        <!-- Items in this category -->
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <div
            v-for="(item, idx) in getItemsInCategory(category.name)"
            :key="`${category.name}-${idx}`"
            @click="removeFromCategory(category.name, idx)"
            class="w-10 h-10 rounded-xl bg-white/90 border border-slate-300 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- Reset Button -->
    <div class="flex justify-center pt-4">
      <button
        @click="resetSorting"
        type="button"
        class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-heading font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
      >
        <span>🔄 Reset Semua Kategori</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  exercise: { type: Object, required: true },
  isChecked: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false }
})

const emit = defineEmits(['updateCategoryMap'])

const { playPop } = useSoundEffects()

const poolItems = ref([])
const categories = ref([
  { name: 'darat', label: 'Hewan Darat', icon: '🐘' },
  { name: 'air', label: 'Hewan Air', icon: '🐟' },
  { name: 'udara', label: 'Hewan Udara', icon: '🦅' }
])
const categoryMap = ref({})

const dragItem = ref(null)
const dragIdx = ref(null)

const initItems = () => {
  const ex = props.exercise
  const items = ex.visual?.items || ['🐘', '🐟', '🦅', '🐱', '🐬', '🦜', '🐄', '🐳', '🦋']
  poolItems.value = [...items]
  categoryMap.value = {}
  emit('updateCategoryMap', '')
}

const dragStart = (item, idx) => {
  if (props.isChecked) return
  dragItem.value = item
  dragIdx.value = idx
}

const dropToCategory = (categoryName) => {
  if (props.isChecked || !dragItem.value) return
  playPop()

  // Remove from pool
  poolItems.value.splice(dragIdx.value, 1)

  // Add to category
  if (!categoryMap.value[categoryName]) {
    categoryMap.value[categoryName] = []
  }
  categoryMap.value[categoryName].push(dragItem.value)

  // Update engine
  const mapString = Object.entries(categoryMap.value)
    .map(([cat, items]) => items.map(item => `${item}::${cat}`).join('|'))
    .join('|')
  emit('updateCategoryMap', mapString)

  dragItem.value = null
  dragIdx.value = null
}

const removeFromCategory = (categoryName, idx) => {
  if (props.isChecked) return
  playPop()
  const item = categoryMap.value[categoryName].splice(idx, 1)[0]
  poolItems.value.push(item)

  // Clean empty category
  if (categoryMap.value[categoryName].length === 0) {
    delete categoryMap.value[categoryName]
  }

  const mapString = Object.entries(categoryMap.value)
    .map(([cat, items]) => items.map(item => `${item}::${cat}`).join('|'))
    .join('|')
  emit('updateCategoryMap', mapString)
}

const getCategoryCount = (categoryName) => {
  return categoryMap.value[categoryName]?.length || 0
}

const getItemsInCategory = (categoryName) => {
  return categoryMap.value[categoryName] || []
}

const resetSorting = () => {
  initItems()
}

watch(() => props.exercise, initItems, { immediate: true })
</script>