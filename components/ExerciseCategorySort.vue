<template>
  <div class="space-y-6 select-none max-w-xl mx-auto">
    <!-- Question Header -->
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-2xl sm:text-3xl text-slate-800 font-bold leading-tight">
        {{ exercise.question }}
      </h2>
      <AudioPlayerButton :text="exercise.question" />
    </div>

    <!-- Category Buckets Container -->
    <div class="grid grid-cols-2 gap-4">
      <div 
        v-for="(cat, catIdx) in categories" 
        :key="cat"
        @click="placeSelectedInCategory(cat)"
        class="min-h-[160px] sm:min-h-[190px] p-3 rounded-3xl border-3 transition-all duration-200 flex flex-col justify-between relative shadow-sm cursor-pointer"
        :class="[
          selectedItemId 
            ? 'border-dashed border-emerald-400 bg-emerald-50/60 hover:bg-emerald-100/80 animate-pulse' 
            : catIdx === 0 
              ? 'bg-blue-50/70 border-duo-blue/40 hover:border-duo-blue' 
              : 'bg-amber-50/70 border-amber-300/60 hover:border-amber-400'
        ]"
      >
        <!-- Bucket Title Tag -->
        <div class="flex items-center justify-between gap-1 mb-2">
          <span 
            class="px-3 py-1 rounded-full font-heading font-black text-xs sm:text-sm text-white shadow-2xs"
            :class="catIdx === 0 ? 'bg-duo-blue' : 'bg-amber-500'"
          >
            {{ cat }}
          </span>
          <span class="text-xs font-heading font-extrabold text-slate-400">
            {{ getItemsInCategory(cat).length }} item
          </span>
        </div>

        <!-- Placed Items inside bucket -->
        <div class="flex flex-wrap gap-2 flex-1 items-start p-2 bg-white/80 rounded-2xl border border-slate-200 shadow-inner">
          <div 
            v-for="item in getItemsInCategory(cat)" 
            :key="item.id"
            @click.stop="removeItemFromCategory(item.id)"
            class="flex items-center gap-1.5 p-1.5 bg-white rounded-xl border-2 border-slate-200 shadow-2xs hover:border-rose-300 transition-all cursor-pointer group active:scale-95"
            title="Klik untuk kembalikan"
          >
            <div v-if="getObjectImageUrl(item.name)" class="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
              <img :src="getObjectImageUrl(item.name)" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <span class="font-heading font-bold text-xs text-slate-800">{{ item.name }}</span>
            <span class="text-[10px] text-rose-500 opacity-0 group-hover:opacity-100 font-black">✕</span>
          </div>

          <div v-if="getItemsInCategory(cat).length === 0" class="w-full h-full min-h-[80px] flex items-center justify-center text-xs font-heading font-bold text-slate-400 italic">
            Sentuh item di bawah lalu sentuh kotak ini
          </div>
        </div>
      </div>
    </div>

    <!-- Unassigned Items Pool -->
    <div class="p-4 bg-slate-100 rounded-3xl border-2 border-slate-200 space-y-2">
      <h3 class="font-heading text-xs font-black uppercase text-slate-400 tracking-wider">
        Pilih item untuk dikelompokkan:
      </h3>

      <div class="flex flex-wrap gap-3 pt-1">
        <button
          v-for="item in unassignedItems"
          :key="item.id"
          @click="selectItem(item.id)"
          type="button"
          :disabled="isChecked"
          class="flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl border-2 font-heading font-bold text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-sm active:scale-95 select-none"
          :class="[
            selectedItemId === item.id 
              ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md ring-4 ring-emerald-300' 
              : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400 hover:scale-102'
          ]"
        >
          <div v-if="getObjectImageUrl(item.name)" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50">
            <img :src="getObjectImageUrl(item.name)" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <span>{{ item.name }}</span>
        </button>

        <div v-if="unassignedItems.length === 0" class="text-center w-full py-2 font-heading font-bold text-sm text-emerald-600 animate-bounce">
          🎉 Semua item telah dikelompokkan! Tekan "Cek Jawaban" di bawah.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getObjectImageUrl } from '~/composables/useObjectImages'

const props = defineProps({
  exercise: { type: Object, required: true },
  isChecked: { type: Boolean, default: false }
})

const emit = defineEmits(['updateCategoryMap'])

const selectedItemId = ref(null)
const itemCategoryMap = ref({}) // itemId -> categoryName

const categories = computed(() => {
  if (props.exercise.categories && Array.isArray(props.exercise.categories)) {
    return props.exercise.categories
  }
  return ['Hewan 🐶', 'Buah 🍎']
})

const allItems = computed(() => {
  if (props.exercise.items && Array.isArray(props.exercise.items)) {
    return props.exercise.items
  }
  return [
    { id: '1', name: 'Kucing', targetCat: 'Hewan 🐶' },
    { id: '2', name: 'Apel', targetCat: 'Buah 🍎' },
    { id: '3', name: 'Kelinci', targetCat: 'Hewan 🐶' },
    { id: '4', name: 'Pisang', targetCat: 'Buah 🍎' }
  ]
})

const unassignedItems = computed(() => {
  return allItems.value.filter(item => !itemCategoryMap.value[item.id])
})

const getItemsInCategory = (cat) => {
  return allItems.value.filter(item => itemCategoryMap.value[item.id] === cat)
}

const selectItem = (itemId) => {
  if (props.isChecked) return
  if (selectedItemId.value === itemId) {
    selectedItemId.value = null
  } else {
    selectedItemId.value = itemId
  }
}

const placeSelectedInCategory = (cat) => {
  if (props.isChecked) return
  if (selectedItemId.value) {
    itemCategoryMap.value[selectedItemId.value] = cat
    selectedItemId.value = null
    emitMap()
  }
}

const removeItemFromCategory = (itemId) => {
  if (props.isChecked) return
  delete itemCategoryMap.value[itemId]
  emitMap()
}

const emitMap = () => {
  // Format string for checking: "Kucing::Hewan 🐶|Apel::Buah 🍎"
  const formatted = allItems.value
    .map(item => `${item.name}::${itemCategoryMap.value[item.id] || ''}`)
    .join('|')
  emit('updateCategoryMap', formatted)
}

watch(() => props.exercise, () => {
  selectedItemId.value = null
  itemCategoryMap.value = {}
  emitMap()
}, { immediate: true })
</script>
