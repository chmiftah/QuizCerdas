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

        <NuxtLink to="/register" class="text-xs font-heading font-bold text-duo-blue hover:underline">
          Belum punya akun? <span class="font-black">Daftar ➔</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Login Container -->
    <main class="flex-1 flex items-center justify-center p-4 py-12">
      <div class="w-full max-w-md bg-white rounded-3xl border-4 border-duo-gray-100 p-6 sm:p-8 shadow-2xl space-y-6 animate-pop">
        
        <!-- Header Mascot Banner -->
        <div class="text-center space-y-2">
          <div class="w-16 h-16 rounded-2xl bg-duo-blue mx-auto flex items-center justify-center text-3xl text-white shadow-duo-blue">
            🔑
          </div>
          <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Selamat Datang Kembali!
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 font-heading font-semibold">
            Masuk untuk melanjutkan Streak & petualangan belajarmu.
          </p>
        </div>

        <!-- Notification Error / Alert Banner -->
        <div v-if="authRequiredMessage" class="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs font-heading font-extrabold flex items-center gap-3 animate-pop shadow-sm">
          <span class="text-xl">🔒</span>
          <div>
            <p class="font-black text-sm">Wajib Login Terlebih Dahulu!</p>
            <p class="text-[11px] font-body text-amber-800">Kamu perlu masuk atau mendaftar akun untuk membuka kuis dan menyimpan progres belajar.</p>
          </div>
        </div>

        <div v-if="errorMessage" class="p-3 bg-rose-50 border-2 border-rose-200 rounded-2xl text-rose-700 text-xs font-heading font-bold flex items-center gap-2 animate-shake">
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email / Username -->
          <div class="space-y-1.5">
            <label class="block font-heading text-xs font-extrabold text-slate-700">
              Email atau Username
            </label>
            <div class="relative">
              <input 
                v-model="form.email" 
                type="text" 
                required
                placeholder="nama@email.com atau username"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none transition-all"
              />
              <span class="absolute right-3.5 top-3.5 text-slate-400 text-sm">📧</span>
            </div>
          </div>

          <!-- Password with Toggle -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="block font-heading text-xs font-extrabold text-slate-700">
                Kata Sandi
              </label>
              <a href="#" @click.prevent="alertForgotPassword" class="text-[11px] font-heading font-bold text-duo-blue hover:underline">
                Lupa sandi?
              </a>
            </div>
            <div class="relative">
              <input 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                required
                placeholder="Masukkan kata sandi"
                class="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-duo-blue focus:bg-white text-sm font-heading font-bold text-slate-800 outline-none transition-all pr-10"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-heading font-bold cursor-pointer select-none"
              >
                {{ showPassword ? '🙈 Sembunyi' : '👁️ Lihat' }}
              </button>
            </div>
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center gap-2 pt-1">
            <input 
              id="remember" 
              v-model="form.remember" 
              type="checkbox"
              class="w-4 h-4 rounded-md border-slate-300 text-duo-blue focus:ring-duo-blue cursor-pointer"
            />
            <label for="remember" class="text-xs font-heading font-semibold text-slate-600 cursor-pointer">
              Ingat akun saya di perangkat ini
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-4 duo-btn-green text-base sm:text-lg font-heading font-extrabold shadow-lg cursor-pointer"
          >
            <span v-if="!loading">🚀 Masuk Ke Akun</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="animate-spin">🌀</span> Memproses...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative flex items-center justify-center my-4">
          <div class="border-t border-slate-200 w-full"></div>
          <span class="bg-white px-3 text-[11px] font-heading font-extrabold text-slate-400 uppercase tracking-wider absolute">
            Atau Coba Akses Cepat
          </span>
        </div>

        <!-- Quick Demo Accounts -->
        <div class="space-y-2">
          <button 
            @click="fillDemoSiswa" 
            type="button"
            class="w-full py-2.5 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-heading font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>👦 Demo Akun Siswa</span>
            <span class="text-[10px] bg-sky-200 px-2 py-0.5 rounded-md font-extrabold">Otomatis Isi</span>
          </button>

          <button 
            @click="fillDemoGuru" 
            type="button"
            class="w-full py-2.5 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-heading font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>👨‍🏫 Demo Akun Orang Tua / Guru</span>
            <span class="text-[10px] bg-amber-200 px-2 py-0.5 rounded-md font-extrabold">Otomatis Isi</span>
          </button>

          <button 
            @click="handleGuestLogin" 
            type="button"
            class="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🦊 Masuk Mode Tamu Cepat</span>
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
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()

const form = reactive({
  email: '',
  password: '',
  remember: true
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const authRequiredMessage = computed(() => {
  return route.query.reason === 'auth_required' || route.query.redirect
})

const handleSubmit = async () => {
  if (!form.email || !form.password) {
    errorMessage.value = 'Silakan isi email dan kata sandi.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await userStore.login(form.email, form.password)
    loading.value = false
    const targetUrl = route.query.redirect ? String(route.query.redirect) : '/catalog'
    navigateTo(targetUrl)
  } catch (err) {
    loading.value = false
    errorMessage.value = err.message || 'Gagal masuk. Silakan periksa kembali email dan kata sandi.'
  }
}

const fillDemoSiswa = () => {
  form.email = 'budi.siswa@duo.id'
  form.password = 'siswa123'
  errorMessage.value = ''
}

const fillDemoGuru = () => {
  form.email = 'guru.matematika@duo.id'
  form.password = 'guru123'
  errorMessage.value = ''
}

const handleGuestLogin = () => {
  userStore.loginAsGuest()
  navigateTo('/catalog')
}

const alertForgotPassword = () => {
  alert('Gunakan fitur Demo Akun di bawah untuk langsung mencoba login tanpa lupa password!')
}
</script>
