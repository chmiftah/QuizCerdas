<template>
  <div 
    class="relative inline-flex items-center justify-center select-none cursor-pointer group"
    :class="sizeClasses"
    @click="bounceAvatar"
  >
    <!-- Base Avatar Container -->
    <div 
      class="w-full h-full rounded-3xl bg-gradient-to-tr from-amber-200 via-yellow-300 to-amber-400 border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105"
      :class="[isBouncing ? 'animate-bounce' : '', bgGradient]"
    >
      <!-- Base Character Icon -->
      <span class="leading-none transition-transform" :class="iconSizeClass">
        {{ avatarIcon }}
      </span>

      <!-- Accessory Badge Overlay (Bottom/Side) -->
      <span 
        v-if="accessoryIcon" 
        class="absolute bottom-0.5 right-0.5 transform translate-x-1 translate-y-1 drop-shadow-md z-10"
        :class="badgeSizeClass"
      >
        {{ accessoryIcon }}
      </span>
    </div>

    <!-- Hat Overlay (Top Floating Badge) -->
    <span 
      v-if="hatIcon" 
      class="absolute -top-3 left-1/2 -translate-x-1/2 drop-shadow-lg z-20 animate-pop"
      :class="hatSizeClass"
    >
      {{ hatIcon }}
    </span>

    <!-- Level Evolution Pill Badge Overlay (Bottom Floating Badge) -->
    <div 
      v-if="showLevelBadge"
      class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-900/90 border border-amber-400/80 rounded-full text-white text-[10px] font-heading font-black shadow-md whitespace-nowrap z-30 flex items-center gap-1"
    >
      <span>{{ userStore.kikoTitle.icon }}</span>
      <span>Lvl {{ userStore.userLevel }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'

const props = defineProps({
  size: { type: String, default: 'md' }, // 'sm', 'md', 'lg', 'xl'
  previewHat: { type: String, default: null },
  previewAccessory: { type: String, default: null },
  previewAvatar: { type: String, default: null },
  showLevelBadge: { type: Boolean, default: false }
})

const userStore = useUserStore()
const isBouncing = ref(false)

const activeHat = computed(() => props.previewHat !== null ? props.previewHat : userStore.equippedHat)
const activeAccessory = computed(() => props.previewAccessory !== null ? props.previewAccessory : userStore.equippedAccessory)
const activeAvatar = computed(() => props.previewAvatar !== null ? props.previewAvatar : userStore.equippedAvatar)

// Maps for items
const avatarMap = {
  avatar_kiko: { icon: '🐼', name: 'Kiko Panda', bg: 'from-amber-200 to-yellow-400' },
  avatar_fox: { icon: '🦊', name: 'Rubah Pintar', bg: 'from-orange-200 to-amber-400' },
  avatar_lion: { icon: '🦁', name: 'Singa Berani', bg: 'from-yellow-300 to-amber-500' },
  avatar_bunny: { icon: '🐰', name: 'Kelinci Ceria', bg: 'from-pink-200 to-rose-300' },
  avatar_owl: { icon: '🦉', name: 'Burung Hantu', bg: 'from-emerald-200 to-teal-400' }
}

const hatMap = {
  hat_none: '',
  hat_crown: '👑',
  hat_grad: '🎓',
  hat_cowboy: '🤠',
  hat_cap: '🧢',
  hat_wizard: '🎩'
}

const accessoryMap = {
  acc_none: '',
  acc_shades: '🕶️',
  acc_ribbon: '🎀',
  acc_glasses: '👓',
  acc_jetpack: '🚀',
  acc_backpack: '🎒'
}

const avatarIcon = computed(() => avatarMap[activeAvatar.value]?.icon || '🐼')
const bgGradient = computed(() => avatarMap[activeAvatar.value]?.bg || 'from-amber-200 to-yellow-400')
const hatIcon = computed(() => hatMap[activeHat.value] || '')
const accessoryIcon = computed(() => accessoryMap[activeAccessory.value] || '')

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-10 h-10'
    case 'lg': return 'w-24 h-24'
    case 'xl': return 'w-32 h-32 sm:w-40 sm:h-40'
    case 'md':
    default: return 'w-16 h-16 sm:w-20 sm:h-20'
  }
})

const iconSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-xl'
    case 'lg': return 'text-5xl'
    case 'xl': return 'text-7xl sm:text-8xl'
    case 'md':
    default: return 'text-3xl sm:text-4xl'
  }
})

const hatSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-sm'
    case 'lg': return 'text-3xl'
    case 'xl': return 'text-4xl sm:text-5xl'
    case 'md':
    default: return 'text-2xl sm:text-3xl'
  }
})

const badgeSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-[10px]'
    case 'lg': return 'text-2xl'
    case 'xl': return 'text-3xl sm:text-4xl'
    case 'md':
    default: return 'text-lg sm:text-xl'
  }
})

const bounceAvatar = () => {
  isBouncing.value = true
  setTimeout(() => {
    isBouncing.value = false
  }, 800)
}
</script>
