<template>
  <div class="min-h-screen bg-slate-50 pb-20 font-body select-none">
    <!-- Top Header Banner -->
    <header class="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 pt-8 pb-16 px-4 shadow-md relative overflow-hidden">
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

        <!-- User XP Balance Card -->
        <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-white shadow-xl flex items-center gap-3 shrink-0">
          <div class="w-12 h-12 rounded-xl bg-amber-400 text-white flex items-center justify-center font-heading text-2xl font-black shadow-md animate-pulse">
            ⭐
          </div>
          <div>
            <span class="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider block">SALDO XP KAMU</span>
            <span class="font-heading font-black text-2xl text-amber-600">+{{ userStore.xp }} XP</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-6">
      <!-- Live Mascot Outfit Preview Stage Card -->
      <div class="bg-white rounded-3xl p-6 border-4 border-duo-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <!-- Dynamic Mascot Preview -->
          <KikoAvatar 
            size="xl" 
            :previewHat="previewHat"
            :previewAccessory="previewAccessory"
            :previewAvatar="previewAvatar"
          />

          <div class="space-y-1">
            <span class="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-heading font-extrabold text-[11px]">
              ✨ Pratinjau Kostum Maskot
            </span>
            <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800">
              {{ activeAvatarName }}
            </h2>
            <p class="text-xs font-heading font-bold text-slate-500">
              Topi: <span class="text-amber-600">{{ activeHatName }}</span> • Aksesoris: <span class="text-duo-blue">{{ activeAccessoryName }}</span>
            </p>
            <p class="text-[11px] font-heading font-semibold text-slate-400 pt-1">
              *Ketuk karakter untuk melihat gerakan melompat! 🚀
            </p>
          </div>
        </div>

        <!-- Notification / Status Banner -->
        <div v-if="toastMessage" class="px-4 py-2 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-heading font-extrabold text-xs animate-pop flex items-center gap-2">
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
          <span>🎨 Karakter Maskot</span>
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
          class="bg-white rounded-3xl p-5 border-4 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-xs hover:shadow-xl"
          :class="isEquipped(item) ? 'border-duo-green bg-emerald-50/30' : isUnlocked(item) ? 'border-amber-300' : 'border-slate-200'"
        >
          <!-- Item Badge Label -->
          <div class="flex items-center justify-between">
            <span class="text-2xl p-2 bg-slate-100 rounded-2xl border border-slate-200">
              {{ item.icon }}
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
          <div class="pt-2">
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
              class="w-full py-2.5 duo-btn-green font-heading font-extrabold text-xs rounded-2xl shadow-md cursor-pointer"
            >
              Pasang Kostum 👕
            </button>

            <!-- If Not Unlocked (Buy with XP) -->
            <button 
              v-else
              @click="handleBuy(item)"
              class="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading font-black text-xs rounded-2xl shadow-md transition-transform hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              :class="userStore.xp < item.price ? 'opacity-60 cursor-not-allowed' : ''"
            >
              <span>Beli {{ item.price }} XP</span>
              <span>⭐</span>
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

const hatItems = [
  { id: 'hat_none', category: 'hat', title: 'Tanpa Topi', description: 'Tampilan alami tanpa penutup kepala.', icon: '❌', price: 0 },
  { id: 'hat_crown', category: 'hat', title: 'Mahkota Emas', description: 'Mahkota raja untuk penjelajah berprestasi!', icon: '👑', price: 100 },
  { id: 'hat_grad', category: 'hat', title: 'Toga Kelulusan', description: 'Simbol kecerdasan setelah lulus kuis.', icon: '🎓', price: 150 },
  { id: 'hat_cowboy', category: 'hat', title: 'Topi Koboi', description: 'Topi petualang gagah di padang rumput.', icon: '🤠', price: 75 },
  { id: 'hat_cap', category: 'hat', title: 'Topi Keren', description: 'Topi kasual gaya kekinian.', icon: '🧢', price: 50 },
  { id: 'hat_wizard', category: 'hat', title: 'Topi Pesulap', description: 'Topi ajaib pesulap matematika.', icon: '🎩', price: 120 },
  { id: 'acc_shades', category: 'accessory', title: 'Kacamata Hitam Super', description: 'Kacamata keren gaya bintang rock!', icon: '🕶️', price: 80 },
  { id: 'acc_ribbon', category: 'accessory', title: 'Pita Merah Ceria', description: 'Pita cantik penghias Kiko.', icon: '🎀', price: 40 },
  { id: 'acc_glasses', category: 'accessory', title: 'Kacamata Cerdas', description: 'Kacamata bulat untuk ilmuwan cilik.', icon: '👓', price: 60 },
  { id: 'acc_jetpack', category: 'accessory', title: 'Jetpack Terbang', description: 'Mesin roket pendorong keberanian!', icon: '🚀', price: 200 },
  { id: 'acc_backpack', category: 'accessory', title: 'Tas Sekolah', description: 'Tas gendong perlengkapan belajar.', icon: '🎒', price: 70 }
]

const avatarItems = [
  { id: 'avatar_kiko', category: 'avatar', title: 'Kiko Si Panda', description: 'Maskot utama CountingDuo yang ramah.', icon: '🐼', price: 0 },
  { id: 'avatar_fox', category: 'avatar', title: 'Rubah Pintar', description: 'Rubah cerdik yang cepat berhitung.', icon: '🦊', price: 150 },
  { id: 'avatar_lion', category: 'avatar', title: 'Singa Berani', description: 'Raja hutan yang pantang menyerah.', icon: '🦁', price: 200 },
  { id: 'avatar_bunny', category: 'avatar', title: 'Kelinci Ceria', description: 'Kelinci lincah yang suka melompat.', icon: '🐰', price: 100 },
  { id: 'avatar_owl', category: 'avatar', title: 'Burung Hantu', description: 'Burung hantu bijak serba tahu.', icon: '🦉', price: 180 }
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

const activeHatName = computed(() => {
  const found = hatItems.find(i => i.id === userStore.equippedHat)
  return found ? found.title : 'Tanpa Topi'
})

const activeAccessoryName = computed(() => {
  const found = hatItems.find(i => i.id === userStore.equippedAccessory)
  return found ? found.title : 'Tanpa Aksesoris'
})

const activeAvatarName = computed(() => {
  const found = avatarItems.find(i => i.id === userStore.equippedAvatar)
  return found ? found.title : 'Kiko Si Panda'
})

const handleEquip = (item) => {
  userStore.equipItem(item.category, item.id)
  showToast(`Kostum "${item.title}" berhasil dipasang!`)
}

const handleBuy = (item) => {
  if (userStore.xp < item.price) {
    alert(`XP kamu belum cukup (${userStore.xp} / ${item.price} XP). Selesaikan kuis lagi untuk mendapat XP!`)
    return
  }

  try {
    if (item.id === 'booster_streak_freeze') {
      userStore.buyStreakFreeze(item.price)
      showToast('Pelindung Streak berhasil dibeli! 🧊')
    } else if (item.id === 'booster_heart_refill') {
      userStore.xp -= item.price
      userStore.refillHearts()
      showToast('Nyawa berhasil diisi penuh! ❤️')
    } else {
      userStore.buyItem(item.id, item.price)
      userStore.equipItem(item.category, item.id)
      showToast(`Berhasil membeli & memasang "${item.title}"! 🎉`)
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
