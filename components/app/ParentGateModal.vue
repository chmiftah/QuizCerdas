<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          @click="closeModal" 
          class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        ></div>

        <!-- Modal Card -->
        <div class="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-200 text-center space-y-5 animate-pop">
          
          <!-- Close Button -->
          <button 
            @click="closeModal" 
            type="button"
            class="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-black text-sm cursor-pointer transition-transform active:scale-90"
          >
            ✕
          </button>

          <!-- Icon & Header -->
          <div class="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-900 flex items-center justify-center text-3xl mx-auto shadow-sm">
            👨‍👩‍👧
          </div>

          <div class="space-y-1.5">
            <h3 class="font-heading font-black text-xl text-slate-800">
              Area Khusus Orang Tua
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 font-body">
              Untuk keamanan anak, silakan minta Ayah atau Ibu menyelesaikan tantangan hitungan di bawah ini:
            </p>
          </div>

          <!-- Challenge Question Box -->
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-200/80 shadow-inner">
            <span class="text-xs font-heading font-bold text-amber-800 uppercase tracking-wider">Tantangan Verifikasi</span>
            <div class="text-2xl sm:text-3xl font-heading font-black text-amber-950 mt-1">
              Berapa {{ numA }} × {{ numB }} = ?
            </div>
          </div>

          <!-- Input & Submit Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <input 
                ref="inputRef"
                v-model="userAnswer" 
                type="number" 
                inputmode="numeric"
                pattern="[0-9]*"
                placeholder="Tulis jawaban di sini..." 
                class="w-full text-center text-2xl font-heading font-black py-3 px-4 rounded-2xl border-2 transition-all outline-hidden"
                :class="errorMessage ? 'border-rose-400 bg-rose-50 text-rose-800' : 'border-slate-300 focus:border-duo-green focus:bg-emerald-50/30 text-slate-800'"
                autofocus
              />
              <p v-if="errorMessage" class="text-xs font-heading font-bold text-rose-600 mt-1.5 animate-shake">
                ⚠️ {{ errorMessage }}
              </p>
            </div>

            <div class="flex gap-2.5">
              <button 
                type="button" 
                @click="closeModal" 
                class="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 hover:bg-slate-100 font-heading font-bold text-sm cursor-pointer active:scale-95 transition-all"
              >
                Batal
              </button>

              <button 
                type="submit" 
                class="flex-1 py-3 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-extrabold text-sm shadow-duo-green cursor-pointer active:scale-95 transition-all"
              >
                Masuk Area Ortu ➔
              </button>
            </div>
          </form>

          <!-- Alternative hold option (helpful if keyboard fails) -->
          <div class="pt-2 border-t border-slate-100">
            <button 
              @click="generateNewChallenge" 
              type="button" 
              class="text-[11px] font-heading font-bold text-slate-400 hover:text-slate-600 underline cursor-pointer"
            >
              🔄 Ganti Soal Tantangan
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  modelValue: boolean
  targetPath?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'success'): void
}>()

const isOpen = ref(props.modelValue)
const userAnswer = ref('')
const errorMessage = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const numA = ref(6)
const numB = ref(7)

const generateNewChallenge = () => {
  // Angka perkalian acak antara 6 - 9 (di luar pengetahuan umum balita/anak TK)
  numA.value = Math.floor(Math.random() * 4) + 6
  numB.value = Math.floor(Math.random() * 5) + 6
  userAnswer.value = ''
  errorMessage.value = ''
}

watch(() => props.modelValue, (val) => {
  isOpen.value = val
  if (val) {
    generateNewChallenge()
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

const closeModal = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  errorMessage.value = ''
}

const handleSubmit = () => {
  const correctAnswer = numA.value * numB.value
  const parsed = parseInt(String(userAnswer.value ?? '').trim(), 10)

  if (isNaN(parsed)) {
    errorMessage.value = 'Silakan masukkan angka jawaban.'
    return
  }

  if (parsed === correctAnswer) {
    closeModal()
    emit('success')
    if (props.targetPath) {
      navigateTo(props.targetPath)
    }
  } else {
    errorMessage.value = 'Jawaban belum tepat. Silakan hitung kembali!'
    userAnswer.value = ''
    generateNewChallenge()
  }
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
