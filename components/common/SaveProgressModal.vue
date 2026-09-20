<template>
  <Teleport to="body">
    <Transition name="modal-pop">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none"
        role="dialog"
        aria-modal="true"
      >
        <!-- Modal Card Container -->
        <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border-4 border-amber-300 shadow-2xl relative overflow-hidden space-y-5 animate-pop">
          
          <!-- Background Ambient Glow -->
          <div class="absolute -top-20 -left-20 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Close / Dismiss (X) button in top right -->
          <button 
            @click="handleSkip" 
            type="button"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-heading font-black text-sm cursor-pointer transition-colors z-20"
            title="Tutup / Lanjut sebagai tamu"
          >
            ✕
          </button>

          <!-- Top Icon & Header -->
          <div class="relative z-10 text-center space-y-2 pt-1">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 border-3 border-amber-600 mx-auto flex items-center justify-center text-3xl sm:text-4xl shadow-md animate-bounce-gentle">
              🏆
            </div>
            
            <div class="space-y-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 border border-amber-300 rounded-full text-amber-900 text-xs font-heading font-black">
                <span>💾</span>
                <span>Mode Tamu Terdeteksi</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-heading font-black text-slate-800 tracking-tight">
                Simpan Bintang & Pialamu! ✨
              </h2>
              <p class="text-xs sm:text-sm text-slate-500 font-heading font-semibold leading-relaxed max-w-sm mx-auto">
                Kuis selesai! Amankan hasil belajarmu agar bintang, XP, dan koin tidak hilang saat keluar browser.
              </p>
            </div>
          </div>

          <!-- Player Achievements Summary Card -->
          <div class="relative z-10 bg-slate-50 rounded-2xl p-3.5 border-2 border-slate-200/80 space-y-2">
            <div class="flex items-center justify-between text-xs font-heading font-bold text-slate-600">
              <span class="flex items-center gap-1.5">
                <span class="text-base">🦉</span>
                <span class="text-slate-800 font-black">{{ playerName }}</span>
                <span class="text-slate-400">({{ playerGrade }})</span>
              </span>
              <span class="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-black text-[11px]">
                Baru Saja Selesai ⭐
              </span>
            </div>

            <!-- XP & Coins Reward Pills -->
            <div class="grid grid-cols-2 gap-2 pt-1">
              <div class="bg-white rounded-xl p-2 border border-amber-200 flex items-center justify-center gap-2 text-center shadow-2xs">
                <span class="text-lg">⚡</span>
                <div class="text-left">
                  <span class="text-[9px] font-heading font-bold text-slate-400 uppercase block">Total XP</span>
                  <span class="font-heading font-black text-sm text-amber-600">{{ userStore.xp || xpEarned }} XP</span>
                </div>
              </div>

              <div class="bg-white rounded-xl p-2 border border-amber-200 flex items-center justify-center gap-2 text-center shadow-2xs">
                <span class="text-lg">🪙</span>
                <div class="text-left">
                  <span class="text-[9px] font-heading font-bold text-slate-400 uppercase block">Koin Kiko</span>
                  <span class="font-heading font-black text-sm text-amber-700">{{ userStore.coins || 100 }} Koin</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct In-Modal Quick Register Form -->
          <form @submit.prevent="handleRegister" class="relative z-10 space-y-3">
            
            <!-- Error Alert Message -->
            <div v-if="errorMessage" class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-heading font-bold text-rose-700 text-center animate-shake">
              {{ errorMessage }}
            </div>

            <!-- Success Alert Message -->
            <div v-if="successMessage" class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-heading font-black text-emerald-800 text-center">
              🎉 {{ successMessage }}
            </div>

            <div v-if="!successMessage" class="space-y-2.5">
              <!-- Email Input (Untuk Orang Tua) -->
              <div class="space-y-1">
                <label class="block text-xs font-heading font-bold text-slate-700">
                  Email Orang Tua / Akun Belajar
                </label>
                <input 
                  v-model="email" 
                  type="email" 
                  required
                  placeholder="contoh: bunda.anak@gmail.com"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-heading font-bold text-slate-800 focus:bg-white focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <!-- Password Input -->
              <div class="space-y-1">
                <label class="block text-xs font-heading font-bold text-slate-700">
                  Kata Sandi
                </label>
                <input 
                  v-model="password" 
                  type="password" 
                  required
                  placeholder="Minimal 6 karakter"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-heading font-bold text-slate-800 focus:bg-white focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-[#58cc02] hover:from-emerald-600 hover:to-[#46a302] text-white font-heading font-black text-sm rounded-2xl shadow-lg border-b-4 border-emerald-700 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                :class="{ 'opacity-80 pointer-events-none': isSubmitting }"
              >
                <span v-if="isSubmitting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{{ isSubmitting ? 'Menyimpan Akun...' : '🚀 Simpan Progres & Buat Akun' }}</span>
              </button>
            </div>
          </form>

          <!-- Secondary Action: Skip / Continue Later -->
          <div class="relative z-10 text-center pt-1 border-t border-slate-100">
            <button 
              @click="handleSkip" 
              type="button"
              class="text-xs font-heading font-bold text-slate-400 hover:text-slate-700 py-1 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Nanti Saja, Tetap Lanjut Belajar ➔
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import confetti from 'canvas-confetti'
import { useUserStore } from '~/stores/user'
import { useSoundEffects } from '~/composables/useSoundEffects'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  xpEarned: { type: Number, default: 30 },
  stars: { type: Number, default: 3 }
})

const emit = defineEmits(['close', 'skip', 'registered'])

const userStore = useUserStore()
const { playPop, playCheer, playWrong } = useSoundEffects()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const playerName = computed(() => {
  return userStore.currentUser?.name || 'Petualang Cilik'
})

const playerGrade = computed(() => {
  return userStore.currentUser?.grade || 'TK B'
})

const handleSkip = () => {
  playPop()
  emit('skip')
  emit('close')
}

const handleRegister = async () => {
  errorMessage.value = ''
  
  if (!email.value || !email.value.includes('@')) {
    errorMessage.value = 'Silakan masukkan alamat email yang valid'
    playWrong()
    return
  }

  if (!password.value || password.value.length < 6) {
    errorMessage.value = 'Kata sandi minimal 6 karakter agar akunmu aman'
    playWrong()
    return
  }

  isSubmitting.value = true

  try {
    const rawName = userStore.currentUser?.name || 'Petualang Pintara'
    const usernameSlug = rawName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'teman'
    const uniqueUsername = `${usernameSlug}_${Math.floor(1000 + Math.random() * 9000)}`

    await userStore.register({
      name: rawName,
      username: uniqueUsername,
      email: email.value.trim().toLowerCase(),
      password: password.value,
      avatar: userStore.currentUser?.avatar || '🦉',
      grade: userStore.currentUser?.grade || 'TK B',
      dailyGoalMinutes: userStore.currentUser?.dailyGoalMinutes || 10
    })

    successMessage.value = 'Hore! Akunmu berhasil disimpan secara permanen. Selamat belajar!'
    playCheer()

    // Confetti celebration
    if (typeof window !== 'undefined') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        })
      } catch (e) {}
    }

    setTimeout(() => {
      emit('registered')
      emit('close')
    }, 1500)
  } catch (err: any) {
    errorMessage.value = err.message || 'Gagal menyimpan akun. Silakan coba lagi.'
    playWrong()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes bounceGentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.animate-bounce-gentle {
  animation: bounceGentle 2s infinite ease-in-out;
}

@keyframes pop {
  0% { transform: scale(0.92); opacity: 0; }
  70% { transform: scale(1.03); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-pop {
  animation: pop 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
