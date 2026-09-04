<template>
  <div class="bg-white rounded-3xl border-3 border-amber-200/80 p-5 shadow-lg space-y-4 relative overflow-hidden">
    <!-- Background Sparkle Decor -->
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>

    <!-- Header Section -->
    <div class="flex items-center justify-between border-b border-amber-100 pb-3">
      <div class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md transform -rotate-3">
          🎯
        </div>
        <div>
          <h3 class="font-heading font-black text-slate-800 text-base sm:text-lg flex items-center gap-1.5">
            <span>Misi Harian</span>
            <span v-if="userStore.unclaimedQuestsCount > 0" class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          </h3>
          <p class="text-[11px] text-slate-500 font-body">Reset setiap tengah malam</p>
        </div>
      </div>

      <div class="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-heading font-bold flex items-center gap-1">
        <span>⏰</span>
        <span>{{ formattedCountdown }}</span>
      </div>
    </div>

    <!-- Quests List -->
    <div class="space-y-3.5">
      <div 
        v-for="quest in userStore.dailyQuests" 
        :key="quest.id"
        class="bg-slate-50 rounded-2xl border-2 p-3.5 transition-all space-y-2.5 relative"
        :class="[
          quest.claimed ? 'border-slate-200 opacity-75' : 
          quest.current >= quest.target ? 'border-emerald-300 bg-emerald-50/50 shadow-sm animate-pop' : 'border-slate-200'
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl p-1.5 bg-white rounded-xl shadow-2xs border border-slate-100">{{ quest.icon }}</span>
            <div>
              <h4 class="font-heading font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                <span>{{ quest.title }}</span>
                <span v-if="quest.claimed" class="px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[10px]">Selesai ✔</span>
              </h4>
              <p class="text-[11px] text-slate-500 font-body leading-tight">{{ quest.description }}</p>
            </div>
          </div>

          <!-- Reward Tag -->
          <div class="flex items-center gap-1 bg-amber-100/80 px-2 py-1 rounded-xl text-amber-900 font-heading font-extrabold text-xs">
            <span>+{{ quest.rewardXP }} XP</span>
            <span v-if="quest.rewardHearts > 0">❤️</span>
          </div>
        </div>

        <!-- Progress Bar & Claim Button -->
        <div class="flex items-center gap-3 pt-1">
          <div class="flex-1 bg-slate-200/70 h-3 rounded-full overflow-hidden p-0.5">
            <div 
              class="h-full rounded-full transition-all duration-500"
              :class="quest.claimed ? 'bg-slate-400' : 'bg-gradient-to-r from-amber-400 to-emerald-500'"
              :style="{ width: `${Math.min(100, Math.round((quest.current / quest.target) * 100))}%` }"
            ></div>
          </div>
          
          <span class="font-heading text-xs font-bold text-slate-600 min-w-[3rem] text-right">
            {{ quest.current }}/{{ quest.target }}
          </span>

          <!-- Action Button -->
          <button 
            v-if="!quest.claimed && quest.current >= quest.target"
            @click="handleClaim(quest.id)"
            class="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-heading font-black text-xs rounded-xl shadow-md shadow-emerald-500/30 transition-all cursor-pointer animate-pulse"
          >
            🎁 Klaim!
          </button>
        </div>
      </div>
    </div>

    <!-- Claim Reward Floating Toast Banner -->
    <Transition name="bounce">
      <div 
        v-if="toastMessage" 
        class="absolute inset-x-4 bottom-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-3 text-center shadow-xl border-2 border-white flex items-center justify-center gap-2 z-20"
      >
        <span class="text-xl">🎉</span>
        <span class="font-heading font-black text-xs sm:text-sm">{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useSoundEffects } from '~/composables/useSoundEffects'

const userStore = useUserStore()
const sound = useSoundEffects()

const toastMessage = ref('')
const countdownSeconds = ref(0)

let timer = null

const calculateSecondsToMidnight = () => {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  return Math.floor((midnight.getTime() - now.getTime()) / 1000)
}

onMounted(() => {
  userStore.checkAndResetDailyQuests()
  countdownSeconds.value = calculateSecondsToMidnight()
  timer = setInterval(() => {
    countdownSeconds.value = calculateSecondsToMidnight()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const formattedCountdown = computed(() => {
  const secs = Math.max(0, countdownSeconds.value)
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const handleClaim = (questId) => {
  const reward = userStore.claimQuestReward(questId)
  if (reward) {
    sound.playCheer()
    toastMessage.value = `Selamat! Hadiah +${reward.xp} XP & +${reward.hearts} Nyawa berhasil diklaim!`
    setTimeout(() => {
      toastMessage.value = ''
    }, 3500)
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0.3) translateY(20px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
