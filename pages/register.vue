<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-body antialiased">
    <!-- Header Minimal -->
    <header class="bg-white border-b border-duo-gray-100 px-4 py-3">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-9 h-9 rounded-xl bg-duo-green flex items-center justify-center text-white font-heading text-lg shadow-duo-green">
            🦉
          </div>
          <span class="font-heading text-lg font-bold text-slate-800">CountingDuo</span>
        </NuxtLink>

        <NuxtLink to="/login" class="text-xs font-heading font-bold text-duo-blue hover:underline">
          Sudah punya akun? <span class="font-black">Masuk ➔</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Registration Container -->
    <main class="flex-1 flex items-center justify-center p-4 py-8">
      <div class="w-full max-w-lg bg-white rounded-3xl border-4 border-duo-gray-100 p-6 sm:p-8 shadow-2xl space-y-6 animate-pop">
        
        <!-- Gamified Top Step Progress Bar -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-heading font-bold text-slate-500">
            <span>Langkah {{ currentStep }} dari {{ totalSteps }}</span>
            <span class="text-duo-green font-extrabold">+50 XP Bonus Pendaftaran</span>
          </div>
          <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              class="h-full bg-duo-green rounded-full transition-all duration-300 shadow-sm"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- STEP 1: Profil & Tingkat Kelas -->
        <div v-if="currentStep === 1" class="space-y-5">
          <div class="text-center space-y-1">
            <h2 class="font-heading text-2xl font-black text-slate-800">Siapa Nama Penjelajah Muda?</h2>
            <p class="text-xs text-slate-500 font-heading">Isi profil singkatmu di bawah ini.</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-1.5">
              <label class="block font-heading text-xs font-extrabold text-slate-700">Nama Lengkap</label>
              <input 
                v-model="form.name"
                type="text" 
                placeholder="Contoh: Budi Pratama"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-green focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block font-heading text-xs font-extrabold text-slate-700">Username Unik</label>
              <input 
                v-model="form.username"
                type="text" 
                placeholder="Contoh: budi123"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-green focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block font-heading text-xs font-extrabold text-slate-700">Tingkat Kelas / Sekolah</label>
              <select 
                v-model="form.grade"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-green focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none cursor-pointer"
              >
                <option value="TK A">TK A (4 - 5 Tahun)</option>
                <option value="TK B">TK B (5 - 6 Tahun)</option>
                <option value="Kelas 1 SD">Kelas 1 SD</option>
                <option value="Kelas 2 SD">Kelas 2 SD</option>
                <option value="Kelas 3 SD">Kelas 3 SD</option>
              </select>
            </div>
          </div>
        </div>

        <!-- STEP 2: Email & Password -->
        <div v-if="currentStep === 2" class="space-y-5">
          <div class="text-center space-y-1">
            <h2 class="font-heading text-2xl font-black text-slate-800">Buat Kata Sandi Akun</h2>
            <p class="text-xs text-slate-500 font-heading">Digunakan untuk masuk dan menyimpan progres belajar.</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-1.5">
              <label class="block font-heading text-xs font-extrabold text-slate-700">Email Siswa / Orang Tua</label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="nama@email.com"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-green focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block font-heading text-xs font-extrabold text-slate-700">Kata Sandi</label>
              <input 
                v-model="form.password"
                type="password" 
                placeholder="Minimal 6 karakter"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-green focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- STEP 3: Pilih Mascot Avatar -->
        <div v-if="currentStep === 3" class="space-y-5">
          <div class="text-center space-y-1">
            <h2 class="font-heading text-2xl font-black text-slate-800">Pilih Maskot Avatarmu!</h2>
            <p class="text-xs text-slate-500 font-heading">Karakter ini akan menemanimu di setiap latihan.</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="av in avatars" 
              :key="av.icon"
              @click="form.avatar = av.icon"
              class="p-4 rounded-3xl border-4 text-center cursor-pointer transition-all space-y-2 select-none"
              :class="form.avatar === av.icon ? 'border-duo-green bg-emerald-50 scale-105 shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300'"
            >
              <div class="text-5xl animate-bounce" :style="{ animationDuration: '2s' }">
                {{ av.icon }}
              </div>
              <div>
                <p class="font-heading font-black text-sm text-slate-800">{{ av.name }}</p>
                <p class="text-[11px] font-heading text-slate-500 font-bold">{{ av.trait }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 4: Target Belajar Harian -->
        <div v-if="currentStep === 4" class="space-y-5">
          <div class="text-center space-y-1">
            <h2 class="font-heading text-2xl font-black text-slate-800">Pilih Target Belajar Harian</h2>
            <p class="text-xs text-slate-500 font-heading">Berapa lama kamu ingin latihan setiap hari?</p>
          </div>

          <div class="space-y-3">
            <div 
              v-for="goal in dailyGoals" 
              :key="goal.minutes"
              @click="form.dailyGoalMinutes = goal.minutes"
              class="p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all"
              :class="form.dailyGoalMinutes === goal.minutes ? 'border-duo-blue bg-sky-50 shadow-md' : 'border-slate-200 bg-white hover:bg-slate-50'"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ goal.badge }}</span>
                <div>
                  <p class="font-heading font-black text-sm text-slate-800">{{ goal.title }}</p>
                  <p class="text-xs text-slate-500 font-body">{{ goal.minutes }} menit per hari</p>
                </div>
              </div>
              <span v-if="form.dailyGoalMinutes === goal.minutes" class="text-duo-blue font-extrabold text-lg">✅</span>
            </div>
          </div>
        </div>

        <!-- Error Message Banner -->
        <div v-if="errorMessage" class="p-3 bg-rose-50 border-2 border-rose-200 rounded-2xl text-rose-700 text-xs font-heading font-bold flex items-center gap-2 animate-shake">
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Step Navigation Buttons -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <button 
            v-if="currentStep > 1"
            @click="currentStep--"
            type="button"
            class="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs cursor-pointer"
          >
            ⬅️ Kembali
          </button>
          <div v-else></div>

          <button 
            v-if="currentStep < totalSteps"
            @click="nextStep"
            type="button"
            class="px-8 py-3.5 duo-btn-green text-sm font-heading font-extrabold cursor-pointer"
          >
            <span>Lanjut ➔</span>
          </button>

          <button 
            v-else
            @click="finishRegistration"
            type="button"
            :disabled="loading"
            class="px-8 py-3.5 duo-btn-green text-sm font-heading font-extrabold shadow-lg cursor-pointer"
          >
            <span v-if="!loading">🎉 Selesai & Klaim 50 XP</span>
            <span v-else>Membuat Akun...</span>
          </button>
        </div>

      </div>
    </main>

    <!-- Footer Minimal -->
    <footer class="py-4 text-center text-xs font-heading text-slate-400 border-t border-slate-200 bg-white">
      CountingDuo EdTech App • Belajar Interaktif SD & TK
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const currentStep = ref(1)
const totalSteps = 4
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  username: '',
  grade: 'Kelas 1 SD',
  email: '',
  password: '',
  avatar: '🦉',
  dailyGoalMinutes: 10
})

const avatars = [
  { icon: '🦉', name: 'Kiki Burung Hantu', trait: 'Pintar & Tekun' },
  { icon: '🦊', name: 'Foxy Rubah', trait: 'Cerdas & Cepat' },
  { icon: '🦁', name: 'Leo Singa', trait: 'Pemberani' },
  { icon: '🐰', name: 'Bunny Kelinci', trait: 'Lincah & Ceria' }
]

const dailyGoals = [
  { minutes: 5, title: 'Santai', badge: '🌱' },
  { minutes: 10, title: 'Biasa (Direkomendasikan)', badge: '🔥' },
  { minutes: 15, title: 'Super Petualang', badge: '🚀' }
]

const nextStep = () => {
  errorMessage.value = ''
  if (currentStep.value === 1) {
    if (!form.name) {
      errorMessage.value = 'Silakan isi nama lengkapmu terlebih dahulu.'
      return
    }
  }

  if (currentStep.value === 2) {
    if (!form.email || !form.password) {
      errorMessage.value = 'Silakan isi email dan kata sandi.'
      return
    }
  }

  currentStep.value++
}

const finishRegistration = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    await userStore.register({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      avatar: form.avatar,
      grade: form.grade,
      dailyGoalMinutes: form.dailyGoalMinutes
    })
    
    loading.value = false
    navigateTo('/catalog')
  } catch (err) {
    loading.value = false
    errorMessage.value = err.message || 'Gagal mendaftar. Silakan coba lagi.'
  }
}
</script>
