<template>
  <div 
    class="relative inline-flex items-center justify-center select-none cursor-pointer group"
    :class="sizeClasses"
    @click="bounceAvatar"
  >
    <!-- Base Avatar Container with 3D depth and highlights -->
    <div 
      class="w-full h-full rounded-3xl border-4 border-white/95 shadow-xl flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
      :class="[
        isBouncing ? 'animate-bounce' : '', 
        bgGradient,
        size === 'xl' ? 'ring-4 ring-amber-300/50 shadow-2xl' : ''
      ]"
    >
      <!-- 3D Character Image (High Resolution) -->
      <img 
        v-if="avatarImage && !imgError"
        :src="avatarImage" 
        :alt="avatarName"
        class="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-110"
        @error="imgError = true"
      />

      <!-- Fallback Emoji Icon -->
      <span v-else class="leading-none transition-transform" :class="iconSizeClass">
        {{ avatarIcon }}
      </span>

      <!-- 3D Face Accessory Overlay (e.g. 3D Sunglasses, Glasses directly on face) -->
      <div 
        v-if="accessoryData?.type === 'face' && accessoryImage && !accImgError"
        class="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none transition-transform duration-300 group-hover:scale-110"
        :class="faceAccClasses"
      >
        <img 
          :src="accessoryImage" 
          :alt="accessoryName" 
          class="w-full h-full object-contain filter drop-shadow-[0_6px_8px_rgba(0,0,0,0.4)]"
          @error="accImgError = true"
        />
      </div>

      <!-- 3D Collar/Chest Accessory Overlay (e.g. 3D Ribbon on chest) -->
      <div 
        v-else-if="accessoryData?.type === 'collar' && accessoryImage && !accImgError"
        class="absolute left-1/2 bottom-1.5 -translate-x-1/2 z-15 pointer-events-none transition-transform duration-300 group-hover:scale-110"
        :class="collarAccClasses"
      >
        <img 
          :src="accessoryImage" 
          :alt="accessoryName" 
          class="w-full h-full object-contain filter drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)]"
          @error="accImgError = true"
        />
      </div>

      <!-- 3D Claymorphism / Gloss Lighting Overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/25 pointer-events-none"></div>

      <!-- Corner Accessory Badge (for jetpack, backpack, or emoji fallback) -->
      <span 
        v-if="accessoryIcon && accessoryData?.type !== 'face' && accessoryData?.type !== 'collar'" 
        class="absolute bottom-1 right-1 transform translate-x-0.5 translate-y-0.5 drop-shadow-lg z-10 transition-transform group-hover:scale-110"
        :class="badgeSizeClass"
      >
        {{ accessoryIcon }}
      </span>
    </div>

    <!-- 3D Hat Rendering (Sitting naturally on top of the head) -->
    <div 
      v-if="hatImage && !hatImgError"
      class="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105"
      :class="hatPositionClasses"
    >
      <img 
        :src="hatImage" 
        :alt="hatName"
        class="w-full h-full object-contain filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
        @error="hatImgError = true"
      />
    </div>

    <!-- Fallback Emoji Hat -->
    <span 
      v-else-if="hatIcon" 
      class="absolute -top-3 left-1/2 -translate-x-1/2 drop-shadow-xl z-20 animate-pop transition-transform group-hover:-translate-y-1"
      :class="hatSizeClass"
    >
      {{ hatIcon }}
    </span>

    <!-- Level Evolution Pill Badge Overlay (Bottom Floating Badge) -->
    <div 
      v-if="showLevelBadge"
      class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-900/90 border border-amber-400/80 rounded-full text-white text-[10px] font-heading font-black shadow-md whitespace-nowrap z-30 flex items-center gap-1"
    >
      <span>{{ userStore.kikoTitle?.icon || '⭐' }}</span>
      <span>Lvl {{ userStore.userLevel }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
const imgError = ref(false)
const hatImgError = ref(false)
const accImgError = ref(false)

const activeHat = computed(() => props.previewHat !== null ? props.previewHat : userStore.equippedHat)
const activeAccessory = computed(() => props.previewAccessory !== null ? props.previewAccessory : userStore.equippedAccessory)
const activeAvatar = computed(() => props.previewAvatar !== null ? props.previewAvatar : userStore.equippedAvatar)

// Reset image error states when selection changes
watch(activeAvatar, () => {
  imgError.value = false
})

watch(activeHat, () => {
  hatImgError.value = false
})

watch(activeAccessory, () => {
  accImgError.value = false
})

// Maps for 3D items and avatars
const avatarMap = {
  avatar_kiko: { 
    id: 'avatar_kiko',
    icon: '🐼', 
    name: 'Kiko Panda', 
    image: '/images/characters/avatar_kiko.jpg',
    bg: 'from-amber-200 to-yellow-400' 
  },
  avatar_fox: { 
    id: 'avatar_fox',
    icon: '🦊', 
    name: 'Rubah Pintar', 
    image: '/images/characters/avatar_fox.jpg',
    bg: 'from-orange-200 to-amber-400' 
  },
  avatar_lion: { 
    id: 'avatar_lion',
    icon: '🦁', 
    name: 'Singa Berani', 
    image: '/images/characters/avatar_lion.jpg',
    bg: 'from-yellow-300 to-amber-500' 
  },
  avatar_bunny: { 
    id: 'avatar_bunny',
    icon: '🐰', 
    name: 'Kelinci Ceria', 
    image: '/images/characters/avatar_bunny.jpg',
    bg: 'from-pink-200 to-rose-300' 
  },
  avatar_owl: { 
    id: 'avatar_owl',
    icon: '🦉', 
    name: 'Burung Hantu', 
    image: '/images/characters/avatar_owl.jpg',
    bg: 'from-emerald-200 to-teal-400' 
  }
}

const hatMap = {
  hat_none: { icon: '', name: 'Tanpa Topi', image: null },
  hat_crown: { icon: '👑', name: 'Mahkota Emas 3D', image: '/images/costumes/hat_crown.png', type: 'crown' },
  hat_grad: { icon: '🎓', name: 'Toga Kelulusan 3D', image: '/images/costumes/hat_grad.png', type: 'grad' },
  hat_cowboy: { icon: '🤠', name: 'Topi Koboi 3D', image: '/images/costumes/hat_cowboy.png', type: 'cowboy' },
  hat_cap: { icon: '🧢', name: 'Topi Keren 3D', image: '/images/costumes/hat_cap.png', type: 'cap' },
  hat_wizard: { icon: '🎩', name: 'Topi Pesulap 3D', image: '/images/costumes/hat_wizard.png', type: 'wizard' }
}

const accessoryMap = {
  acc_none: { icon: '', name: 'Tanpa Aksesoris', image: null, type: null },
  acc_shades: { icon: '🕶️', name: 'Kacamata Hitam Super 3D', image: '/images/costumes/acc_shades.png', type: 'face' },
  acc_glasses: { icon: '👓', name: 'Kacamata Cerdas 3D', image: '/images/costumes/acc_glasses.png', type: 'face' },
  acc_ribbon: { icon: '🎀', name: 'Pita Merah Ceria 3D', image: '/images/costumes/acc_ribbon.png', type: 'collar' },
  acc_jetpack: { icon: '🚀', name: 'Jetpack Terbang', image: null, type: 'corner' },
  acc_backpack: { icon: '🎒', name: 'Tas Sekolah', image: null, type: 'corner' }
}

const currentAvatarData = computed(() => avatarMap[activeAvatar.value] || null)
const avatarIcon = computed(() => currentAvatarData.value?.icon || '🐼')
const avatarName = computed(() => currentAvatarData.value?.name || 'Kiko Panda')
const avatarImage = computed(() => currentAvatarData.value?.image || null)
const bgGradient = computed(() => currentAvatarData.value?.bg || 'from-amber-200 to-yellow-400')

const hatData = computed(() => hatMap[activeHat.value] || null)
const hatIcon = computed(() => hatData.value?.icon || '')
const hatImage = computed(() => hatData.value?.image || null)
const hatName = computed(() => hatData.value?.name || 'Topi')

const accessoryData = computed(() => accessoryMap[activeAccessory.value] || null)
const accessoryIcon = computed(() => accessoryData.value?.icon || '')
const accessoryImage = computed(() => accessoryData.value?.image || null)
const accessoryName = computed(() => accessoryData.value?.name || 'Aksesoris')

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-10 h-10'
    case 'lg': return 'w-24 h-24'
    case 'xl': return 'w-36 h-36 sm:w-44 sm:h-44'
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

const hatPositionClasses = computed(() => {
  const type = hatData.value?.type || 'crown'
  switch (props.size) {
    case 'sm':
      if (type === 'wizard') return '-top-5 w-10 h-10'
      if (type === 'cowboy') return '-top-3.5 w-11 h-8'
      return '-top-3 w-8 h-8'
    case 'lg':
      if (type === 'wizard') return '-top-12 w-24 h-24'
      if (type === 'cowboy') return '-top-8 w-26 h-18'
      return '-top-7 w-20 h-20'
    case 'xl':
      if (type === 'wizard') return '-top-18 sm:-top-22 w-36 h-36 sm:w-46 sm:h-46'
      if (type === 'cowboy') return '-top-11 sm:-top-13 w-40 h-28 sm:w-48 sm:h-34'
      return '-top-10 sm:-top-13 w-32 h-32 sm:w-42 sm:h-42'
    case 'md':
    default:
      if (type === 'wizard') return '-top-8 w-16 h-16'
      if (type === 'cowboy') return '-top-5 w-18 h-14'
      return '-top-5 w-14 h-14'
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

const faceAccClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-4'
    case 'lg': return 'w-18 h-9'
    case 'xl': return 'w-28 h-14 sm:w-34 sm:h-18'
    case 'md':
    default: return 'w-14 h-7 sm:w-16 sm:h-8'
  }
})

const collarAccClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-6 h-5'
    case 'lg': return 'w-14 h-11'
    case 'xl': return 'w-20 h-16 sm:w-26 sm:h-20'
    case 'md':
    default: return 'w-10 h-8 sm:w-12 sm:h-10'
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
