<template>
  <div class="min-h-screen bg-slate-50 pb-20 font-body select-none">
    <!-- Top Header Banner -->
    <header class="bg-amber-400 text-amber-950 pt-8 pb-16 px-4 shadow-md relative overflow-hidden">
      <!-- Ambient Sparkle Shapes -->
      <div class="absolute -top-12 -left-12 w-36 h-36 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-yellow-200/30 rounded-full blur-2xl pointer-events-none"></div>

      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <!-- Title & Subtitle -->
        <div class="text-center sm:text-left space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/10 rounded-full text-xs font-heading font-black uppercase tracking-wider text-amber-900">
            <span>🛍️ TOKO KOSTUM & HADIAH XP</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-heading font-black tracking-tight text-amber-950">
            Toko Kiko Panda 🐼
          </h1>
          <p class="text-xs sm:text-sm font-heading font-semibold text-amber-900/80 max-w-md">
            Tukarkan XP hasil belajar kuis untuk membeli kostum mahkota, kacamata super, dan karakter favoritmu!
          </p>
        </div>

        <!-- User Coins Balance Card -->
        <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-white shadow-xl flex items-center gap-3 shrink-0">
          <div class="w-12 h-12 rounded-xl bg-amber-400 text-white flex items-center justify-center font-heading text-2xl font-black shadow-md animate-bounce-slow">
            🪙
          </div>
          <div>
            <span class="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider block">SALDO KOIN KIKO</span>
            <span class="font-heading font-black text-2xl text-amber-700">{{ userStore.coins }} Koin</span>
            <span class="text-[10px] font-heading text-emerald-700 font-extrabold block">Level {{ userStore.userLevel }} (⭐ {{ userStore.xp }} XP Aman)</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-6">
      <!-- Live Mascot Outfit Preview 3D Stage Card -->
      <div class="bg-gradient-to-b from-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border-4 border-amber-200/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <!-- Ambient Spotlight Glow in Background -->
        <div class="absolute -top-16 left-1/4 -translate-x-1/2 w-72 h-72 bg-radial from-amber-300/30 via-amber-200/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 z-10 w-full md:w-auto">
          <!-- 3D Podium & Mascot Preview -->
          <div class="relative flex flex-col items-center">
            <div class="absolute -top-2 -left-2 text-base animate-bounce-slow">✨</div>
            <div class="absolute -bottom-1 -right-2 text-base animate-pulse">⭐</div>

            <KikoAvatar 
              size="xl" 
              :previewHat="previewHat"
              :previewAccessory="previewAccessory"
              :previewAvatar="previewAvatar"
            />

            <!-- 3D Pedestal / Circular Stage Base -->
            <div class="w-32 sm:w-40 h-5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full shadow-lg -mt-3 border-2 border-white flex items-center justify-center">
              <div class="w-20 sm:w-28 h-2 bg-white/50 rounded-full blur-xs"></div>
            </div>
            <!-- Ground Drop Shadow -->
            <div class="w-36 sm:w-44 h-3 bg-slate-400/20 rounded-full blur-sm -mt-1"></div>
          </div>

          <div class="space-y-1.5 text-center sm:text-left">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span class="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-heading font-black text-[11px] flex items-center gap-1 shadow-xs">
                <span>🎨 3D Maskot</span>
                <span>•</span>
                <span>{{ isPreviewing ? 'Sedang Dicoba' : 'Aktif Dipakai' }}</span>
              </span>
              <button 
                v-if="isPreviewing" 
                @click="resetPreview"
                class="px-2.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-heading font-extrabold transition-colors cursor-pointer"
              >
                ↺ Reset Pratinjau
              </button>
            </div>
            <h2 class="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              {{ previewAvatarName }}
            </h2>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-600">
              Topi: <span class="text-amber-700">{{ previewHatName }}</span> • Aksesoris: <span class="text-duo-blue">{{ previewAccessoryName }}</span>
            </p>
            <p class="text-[11px] font-heading font-semibold text-slate-400 pt-0.5">
              *Klik item kartu di bawah untuk mencoba langsung di atas panggung 3D! 🚀
            </p>
          </div>
        </div>

        <!-- Notification / Status Banner -->
        <div v-if="toastMessage" class="px-4 py-2.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-heading font-extrabold text-xs animate-pop flex items-center gap-2 shadow-sm shrink-0">
          <span>🎉 {{ toastMessage }}</span>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/80 overflow-x-auto">
        <button 
          @click="activeTab = 'hats'"
          class="px-4 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'hats' ? 'bg-white text-slate-800 shadow-md scale-102' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>👑 Topi & Aksesoris</span>
        </button>

        <button 
          @click="activeTab = 'avatars'"
          class="px-4 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'avatars' ? 'bg-white text-slate-800 shadow-md scale-102' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🎨 Karakter Maskot 3D</span>
        </button>

        <button 
          @click="activeTab = 'boosters'"
          class="px-4 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'boosters' ? 'bg-white text-slate-800 shadow-md scale-102' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🧊 Booster & Power-Up</span>
        </button>
      </div>

      <!-- Items Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="item in currentCategoryItems" 
          :key="item.id"
          @click="handleCardClick(item)"
          class="bg-white rounded-3xl p-5 border-4 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-xs hover:shadow-xl cursor-pointer"
          :class="[
            isEquipped(item) ? 'border-duo-green bg-emerald-50/30' : isUnlocked(item) ? 'border-amber-300' : 'border-slate-200',
            isItemPreviewed(item) ? 'ring-4 ring-indigo-400/70 scale-[1.02]' : ''
          ]"
        >
          <!-- Item Badge / 3D Image Preview -->
          <div class="flex items-center justify-between">
            <div 
              v-if="item.image" 
              class="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-md group-hover:scale-110 transition-transform shrink-0 relative flex items-center justify-center p-1"
              :class="item.category === 'avatar' ? 'bg-slate-100 border-amber-200' : 'bg-gradient-to-tr from-amber-50 to-yellow-100 border-amber-300/80'"
            >
              <img 
                :src="item.image" 
                :alt="item.title" 
                class="w-full h-full object-contain filter drop-shadow-sm" 
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none"></div>
            </div>
            <span v-else class="text-2xl p-2 bg-slate-100 rounded-2xl border border-slate-200 group-hover:scale-110 transition-transform">
              {{ item.icon }}
            </span>

            <div class="flex items-center gap-1.5">
              <span 
                v-if="isItemPreviewed(item)"
                class="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-heading font-black text-[9px] uppercase tracking-wider"
              >
                👁️ DICOBA
              </span>

              <span 
                v-if="isEquipped(item)"
                class="px-2.5 py-1 bg-duo-green text-white rounded-full font-heading font-extrabold text-[10px] tracking-wide shadow-xs"
              >
                DIPASANG ✓
              </span>
              <span 
                v-else-if="isUnlocked(item)"
                class="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-extrabold text-[10px]"
              >
                DIMILIKI
              </span>
              <span 
                v-else
                class="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full font-heading font-extrabold text-[10px]"
              >
                🔒 TERKUNCI
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-1">
            <h3 class="font-heading font-black text-slate-800 text-base">
              {{ item.title }}
            </h3>
            <p class="text-xs font-heading font-semibold text-slate-500 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Action Button -->
          <div class="pt-2 space-y-2" @click.stop>
            <!-- If Equipped -->
            <button 
              v-if="isEquipped(item)"
              disabled
              class="w-full py-2.5 bg-emerald-100 text-duo-green-dark font-heading font-extrabold text-xs rounded-2xl cursor-default text-center"
            >
              Sedang Dipakai ✨
            </button>

            <!-- If Unlocked but Not Equipped -->
            <button 
              v-else-if="isUnlocked(item)"
              @click="handleEquip(item)"
              class="w-full py-2.5 duo-btn-green font-heading font-extrabold text-xs rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Pasang Kostum 👕</span>
            </button>

            <!-- If Not Unlocked (Buy with Coins) -->
            <button 
              v-else
              @click="handleBuy(item)"
              class="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading font-black text-xs rounded-2xl shadow-md transition-transform hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              :class="userStore.coins < item.price ? 'opacity-60 cursor-not-allowed' : ''"
            >
              <span>Beli {{ item.price }} Koin</span>
              <span>🪙</span>
            </button>

            <!-- Try-on toggle button for wearable items -->
            <button
              v-if="item.category !== 'booster' && !isEquipped(item)"
              @click="handleTogglePreview(item)"
              type="button"
              class="w-full py-1 text-[11px] font-heading font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{{ isItemPreviewed(item) ? '✕ Lepas Coba' : '👁️ Coba di Maskot' }}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import confetti from 'canvas-confetti'

definePageMeta({
  middleware: 'auth'
})

const userStore = useUserStore()
const activeTab = ref('hats')
const toastMessage = ref('')

const previewHat = ref(null)
const previewAccessory = ref(null)
const previewAvatar = ref(null)

onMounted(() => {
  userStore.loadFromStorage()
})

const isPreviewing = computed(() => {
  return previewHat.value !== null || previewAccessory.value !== null || previewAvatar.value !== null
})

const resetPreview = () => {
  previewHat.value = null
  previewAccessory.value = null
  previewAvatar.value = null
}

const hatItems = [
  { id: 'hat_none', category: 'hat', title: 'Tanpa Topi', description: 'Tampilan alami tanpa penutup kepala.', icon: '❌', price: 0 },
  { id: 'hat_crown', category: 'hat', title: 'Mahkota Emas 3D', description: 'Mahkota raja berkilau dengan permata dan emas murni!', icon: '👑', image: '/images/costumes/hat_crown.png', price: 100 },
  { id: 'hat_grad', category: 'hat', title: 'Toga Kelulusan 3D', description: 'Simbol kecerdasan setelah lulus kuis berhitung.', icon: '🎓', image: '/images/costumes/hat_grad.png', price: 150 },
  { id: 'hat_cowboy', category: 'hat', title: 'Topi Koboi 3D', description: 'Topi kulit petualang gagah di padang rumput.', icon: '🤠', image: '/images/costumes/hat_cowboy.png', price: 75 },
  { id: 'hat_cap', category: 'hat', title: 'Topi Keren 3D', description: 'Topi baseball sporty gaya modern.', icon: '🧢', image: '/images/costumes/hat_cap.png', price: 50 },
  { id: 'hat_wizard', category: 'hat', title: 'Topi Pesulap 3D', description: 'Topi sihir ajaib bertabur bintang & bulan emas.', icon: '🎩', image: '/images/costumes/hat_wizard.png', price: 120 },
  { id: 'acc_shades', category: 'accessory', title: 'Kacamata Hitam Super 3D', description: 'Kacamata keren gaya bintang rock!', icon: '🕶️', image: '/images/costumes/acc_shades.png', price: 80 },
  { id: 'acc_ribbon', category: 'accessory', title: 'Pita Merah Ceria 3D', description: 'Pita satin merah berkilau penghias dada.', icon: '🎀', image: '/images/costumes/acc_ribbon.png', price: 40 },
  { id: 'acc_glasses', category: 'accessory', title: 'Kacamata Cerdas 3D', description: 'Kacamata bulat emas untuk ilmuwan cilik.', icon: '👓', image: '/images/costumes/acc_glasses.png', price: 60 },
  { id: 'acc_jetpack', category: 'accessory', title: 'Jetpack Terbang', description: 'Mesin roket pendorong keberanian belajar!', icon: '🚀', price: 200 },
  { id: 'acc_backpack', category: 'accessory', title: 'Tas Sekolah', description: 'Tas gendong perlengkapan petualangan.', icon: '🎒', price: 70 }
]

const avatarItems = [
  { id: 'avatar_kiko', category: 'avatar', title: 'Kiko Si Panda 3D', description: 'Maskot utama CountingDuo yang ramah & ceria.', icon: '🐼', image: '/images/characters/avatar_kiko.jpg', price: 0 },
  { id: 'avatar_fox', category: 'avatar', title: 'Rubah Pintar 3D', description: 'Rubah cerdik yang lincah dan cepat berhitung.', icon: '🦊', image: '/images/characters/avatar_fox.jpg', price: 150 },
  { id: 'avatar_lion', category: 'avatar', title: 'Singa Berani 3D', description: 'Raja hutan gagah berani pantang menyerah.', icon: '🦁', image: '/images/characters/avatar_lion.jpg', price: 200 },
  { id: 'avatar_bunny', category: 'avatar', title: 'Kelinci Ceria 3D', description: 'Kelinci lincah bertelinga panjang yang suka melompat.', icon: '🐰', image: '/images/characters/avatar_bunny.jpg', price: 100 },
  { id: 'avatar_owl', category: 'avatar', title: 'Burung Hantu Bijak 3D', description: 'Burung hantu berkacamata cerdas serba tahu.', icon: '🦉', image: '/images/characters/avatar_owl.jpg', price: 180 }
]

const boosterItems = [
  { id: 'booster_streak_freeze', category: 'booster', title: 'Pelindung Streak 🧊', description: 'Melindungi streak kamu jika lupa belajar selama 1 hari!', icon: '🧊', price: 50 },
  { id: 'booster_heart_refill', category: 'booster', title: 'Isi Penuh Nyawa ❤️', description: 'Langsung isi ulang 5 nyawa kamu untuk melanjutkan kuis.', icon: '❤️', price: 20 }
]

const currentCategoryItems = computed(() => {
  if (activeTab.value === 'hats') return hatItems
  if (activeTab.value === 'avatars') return avatarItems
  return boosterItems
})

const isUnlocked = (item) => {
  if (item.price === 0) return true
  if (item.category === 'booster') return false
  return userStore.unlockedItems.includes(item.id)
}

const isEquipped = (item) => {
  if (item.category === 'hat') return userStore.equippedHat === item.id
  if (item.category === 'accessory') return userStore.equippedAccessory === item.id
  if (item.category === 'avatar') return userStore.equippedAvatar === item.id
  return false
}

const isItemPreviewed = (item) => {
  if (item.category === 'hat') return previewHat.value === item.id
  if (item.category === 'accessory') return previewAccessory.value === item.id
  if (item.category === 'avatar') return previewAvatar.value === item.id
  return false
}

const handleCardClick = (item) => {
  if (item.category !== 'booster') {
    handleTogglePreview(item)
  }
}

const handleTogglePreview = (item) => {
  if (item.category === 'hat') {
    previewHat.value = previewHat.value === item.id ? null : item.id
  } else if (item.category === 'accessory') {
    previewAccessory.value = previewAccessory.value === item.id ? null : item.id
  } else if (item.category === 'avatar') {
    previewAvatar.value = previewAvatar.value === item.id ? null : item.id
  }
}

const previewHatName = computed(() => {
  const hatId = previewHat.value !== null ? previewHat.value : userStore.equippedHat
  const found = hatItems.find(i => i.id === hatId)
  return found ? found.title : 'Tanpa Topi'
})

const previewAccessoryName = computed(() => {
  const accId = previewAccessory.value !== null ? previewAccessory.value : userStore.equippedAccessory
  const found = hatItems.find(i => i.id === accId)
  return found ? found.title : 'Tanpa Aksesoris'
})

const previewAvatarName = computed(() => {
  const avId = previewAvatar.value !== null ? previewAvatar.value : userStore.equippedAvatar
  const found = avatarItems.find(i => i.id === avId)
  return found ? found.title : 'Kiko Si Panda'
})

const handleEquip = (item) => {
  userStore.equipItem(item.category, item.id)
  resetPreview()
  showToast(`Kostum "${item.title}" berhasil dipasang!`)
}

const triggerConfetti = () => {
  if (typeof window !== 'undefined' && typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    })
  }
}

const handleBuy = (item) => {
  if (userStore.coins < item.price) {
    alert(`Koin kamu belum cukup (${userStore.coins} / ${item.price} Koin). Selesaikan kuis untuk mendapatkan lebih banyak koin!`)
    return
  }

  try {
    if (item.id === 'booster_streak_freeze') {
      userStore.buyStreakFreeze(item.price)
      showToast('Pelindung Streak berhasil dibeli! 🧊')
      triggerConfetti()
    } else if (item.id === 'booster_heart_refill') {
      userStore.buyHeartRefill(item.price)
      showToast('Nyawa berhasil diisi penuh! ❤️')
      triggerConfetti()
    } else {
      userStore.buyItem(item.id, item.price)
      userStore.equipItem(item.category, item.id)
      resetPreview()
      triggerConfetti()
      showToast(`Berhasil membeli & memasang "${item.title}"! (XP & Level tetap aman) 🎉`)
    }
  } catch (err) {
    alert(err.message)
  }
}

const showToast = (msg) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 4000)
}
</script>
