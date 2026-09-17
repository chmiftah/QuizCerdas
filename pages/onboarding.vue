<template>
  <div class="min-h-screen bg-[#f8fafc] flex flex-col justify-between font-body antialiased relative overflow-x-hidden selection:bg-duo-green selection:text-white">
    
    <!-- Subtle Educational Doodle Pattern Background -->
    <div 
      class="fixed inset-0 pointer-events-none z-0 opacity-[0.045] select-none"
      style="background-image: url('/images/patterns/doodle_pattern.svg'); background-repeat: repeat; background-size: 300px 300px;"
      aria-hidden="true"
    ></div>

    <!-- Top Minimalist Header with Progress Indicator -->
    <header class="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-5 pb-3">
      <div class="flex items-center justify-between gap-4">
        
        <!-- Left: Back Button or Brand Logo -->
        <div class="flex items-center gap-2">
          <button 
            v-if="currentStep > 1 && currentStep <= 4"
            @click="prevStep"
            type="button"
            class="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 active:scale-95 flex items-center justify-center text-slate-600 font-heading font-black text-sm shadow-2xs transition-all cursor-pointer"
            title="Kembali ke langkah sebelumnya"
          >
            ←
          </button>
          <NuxtLink 
            v-else
            to="/" 
            class="flex items-center gap-2 group active:scale-95 transition-transform" 
            title="Pintara - Beranda"
          >
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white font-heading text-lg sm:text-xl shadow-duo-green group-hover:scale-105 transition-transform">
              🦉
            </div>
            <div class="flex items-center leading-none">
              <span class="font-heading text-xl sm:text-2xl font-black text-duo-green tracking-tight">Pint</span>
              <span class="font-heading text-xl sm:text-2xl font-black text-duo-blue tracking-tight">ara</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Center: Step Progress Pills & Track (Only for Step 1–4) -->
        <div v-if="currentStep <= 4" class="flex-1 max-w-xs space-y-1.5">
          <!-- Step Labels -->
          <div class="flex items-center justify-between text-[11px] font-heading font-extrabold text-slate-400">
            <span :class="{ 'text-duo-green font-black': currentStep === 1 }">Kenalan</span>
            <span :class="{ 'text-duo-green font-black': currentStep === 2 }">Level</span>
            <span :class="{ 'text-duo-green font-black': currentStep === 3 }">Minat</span>
            <span :class="{ 'text-duo-green font-black': currentStep === 4 }">Siap</span>
          </div>

          <!-- Progress Bar Track -->
          <div class="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60 shadow-inner">
            <div 
              class="h-full bg-duo-green rounded-full transition-all duration-300 shadow-xs"
              :style="{ width: `${(currentStep / 4) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Right: Step Indicator Badge -->
        <div v-if="currentStep <= 4" class="shrink-0">
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-heading font-black text-xs shadow-2xs">
            {{ currentStep }}/4
          </span>
        </div>

        <!-- Right Placeholder on Completion Screen -->
        <div v-else class="w-10"></div>

      </div>
    </header>

    <!-- Main Dynamic Step Stage -->
    <main class="relative z-10 flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-4 flex flex-col justify-center">
      
      <!-- ============================================================== -->
      <!-- STEP 1: KENALAN (NAMA ANAK)                                     -->
      <!-- ============================================================== -->
      <Transition name="step-slide" mode="out-in">
        <div v-if="currentStep === 1" key="step-1" class="space-y-6">
          
          <!-- Mascot Greeting with Speech Bubble -->
          <div class="flex items-end gap-3 justify-center pt-2">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-[#58cc02] border-3 border-emerald-600 flex items-center justify-center text-3xl sm:text-4xl shadow-duo-green animate-bounce-slow shrink-0 select-none">
              🦉
            </div>
            <div class="bg-white rounded-3xl rounded-bl-sm border-2 border-slate-200/90 p-4 shadow-sm relative max-w-xs sm:max-w-sm animate-pop">
              <p class="font-heading font-black text-slate-800 text-sm sm:text-base leading-snug">
                Halo! Aku <span class="text-duo-green font-black">Kiko</span>, teman belajarmu.
              </p>
              <p class="text-xs text-slate-500 font-heading font-medium mt-0.5">
                Yuk, kenalan dulu agar petualangan kita makin seru! ✨
              </p>
            </div>
          </div>

          <!-- Headline & Subheadline -->
          <div class="text-center space-y-1">
            <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Hai! Yuk, kenalan dulu 👋
            </h1>
            <p class="text-sm font-heading font-bold text-slate-500">
              Siapa nama kamu?
            </p>
          </div>

          <!-- Input Box -->
          <div class="space-y-2 bg-white rounded-3xl border-3 border-slate-200 p-5 sm:p-6 shadow-sm">
            <label for="student-name-input" class="block font-heading text-xs font-black uppercase tracking-wider text-slate-600">
              Nama Kamu
            </label>
            <div class="relative">
              <input 
                id="student-name-input"
                ref="nameInputRef"
                v-model="form.name"
                @keyup.enter="handleStep1Next"
                type="text" 
                maxlength="30"
                placeholder="Tulis namamu di sini..." 
                class="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:border-duo-green focus:bg-white text-base sm:text-lg font-heading font-black text-slate-800 placeholder-slate-400 outline-none transition-all shadow-inner"
                autocomplete="off"
              />
              <span v-if="form.name.trim().length >= 2" class="absolute right-4 top-1/2 -translate-y-1/2 text-lg select-none">
                🌟
              </span>
            </div>

            <!-- Microcopy -->
            <p class="text-[11px] sm:text-xs text-slate-400 font-body leading-relaxed pt-1">
              Nama ini akan digunakan untuk membuat pengalaman belajarmu lebih personal.
            </p>

            <!-- Friendly Non-Technical Validation Warning -->
            <Transition name="fade">
              <div v-if="step1Error" class="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-heading font-bold text-amber-800 animate-shake">
                <span>😊</span>
                <span>{{ step1Error }}</span>
              </div>
            </Transition>
          </div>

          <!-- CTA Button -->
          <div class="pt-2">
            <button 
              @click="handleStep1Next"
              type="button"
              class="w-full py-3.5 sm:py-4 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-black text-base shadow-duo-green active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              :class="{ 'opacity-60 cursor-not-allowed': !form.name.trim() }"
            >
              <span>Lanjut</span>
              <span>→</span>
            </button>
          </div>

        </div>

        <!-- ============================================================== -->
        <!-- STEP 2: PILIH TINGKAT BELAJAR                                   -->
        <!-- ============================================================== -->
        <div v-else-if="currentStep === 2" key="step-2" class="space-y-6">
          
          <div class="text-center space-y-1">
            <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Kamu sekarang belajar di mana? 🎒
            </h1>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-500">
              Pilih jenjang yang paling cocok untuk materi belajarmu.
            </p>
          </div>

          <!-- 3 Large Cards Grid -->
          <div class="space-y-3.5">
            <div 
              v-for="grade in gradeOptions" 
              :key="grade.id"
              @click="selectGrade(grade.id)"
              class="group relative bg-white rounded-3xl border-3 p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer select-none"
              :class="form.grade === grade.id 
                ? 'border-duo-green bg-emerald-50/50 shadow-duo-green scale-[1.015]' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm active:scale-[0.99]'"
            >
              <!-- Icon Container with Themed Background -->
              <div 
                class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 border-2 transition-transform duration-200 group-hover:scale-105"
                :class="form.grade === grade.id 
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700'"
              >
                {{ grade.icon }}
              </div>

              <!-- Text Info -->
              <div class="flex-1 min-w-0 space-y-0.5">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-black text-base sm:text-lg text-slate-800">
                    {{ grade.title }}
                  </h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-extrabold bg-slate-100 text-slate-600">
                    {{ grade.age }}
                  </span>
                </div>
                <p class="text-xs font-heading font-bold text-slate-500">
                  {{ grade.subtitle }}
                </p>
              </div>

              <!-- Selection Checkmark Radio -->
              <div 
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all shrink-0"
                :class="form.grade === grade.id 
                  ? 'bg-duo-green border-emerald-600 text-white shadow-xs scale-105' 
                  : 'border-slate-300 bg-white text-transparent'"
              >
                ✓
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="space-y-2 pt-2">
            <button 
              @click="handleStep2Next"
              type="button"
              class="w-full py-3.5 sm:py-4 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-black text-base shadow-duo-green active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Lanjut</span>
              <span>→</span>
            </button>

            <button 
              @click="prevStep"
              type="button"
              class="w-full py-2 text-center text-xs font-heading font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              ← Kembali
            </button>
          </div>

        </div>

        <!-- ============================================================== -->
        <!-- STEP 3: PILIH MINAT (YANG DISUKAI) - MULTI-SELECT               -->
        <!-- ============================================================== -->
        <div v-else-if="currentStep === 3" key="step-3" class="space-y-6">
          
          <div class="text-center space-y-1">
            <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Kamu suka belajar apa? 🌟
            </h1>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-500">
              Pilih yang paling kamu suka. Boleh lebih dari satu ya!
            </p>
          </div>

          <!-- 2x2 Interactive Cards Grid -->
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div 
              v-for="interest in interestOptions" 
              :key="interest.id"
              @click="toggleInterest(interest.id)"
              class="group relative bg-white rounded-3xl border-3 p-4 sm:p-5 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] transition-all duration-200 cursor-pointer select-none"
              :class="isInterestSelected(interest.id) 
                ? 'border-duo-green bg-emerald-50/40 shadow-duo-green scale-[1.02]' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm active:scale-[0.98]'"
            >
              <!-- Top Row: Icon & Checkmark -->
              <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {{ interest.icon }}
                </div>
                <div 
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all"
                  :class="isInterestSelected(interest.id) 
                    ? 'bg-duo-green border-emerald-600 text-white' 
                    : 'border-slate-300 text-transparent'"
                >
                  ✓
                </div>
              </div>

              <!-- Bottom Content -->
              <div class="space-y-1 pt-2">
                <h3 class="font-heading font-black text-sm sm:text-base text-slate-800">
                  {{ interest.title }}
                </h3>
                <p class="text-[11px] font-heading font-medium text-slate-500 line-clamp-2 leading-tight">
                  {{ interest.subtitle }}
                </p>
              </div>
            </div>
          </div>

          <!-- Helper Hint -->
          <p class="text-center text-[11px] sm:text-xs text-slate-400 font-heading font-medium">
            {{ form.interests.length > 0 ? `${form.interests.length} topik dipilih` : 'Pilih minimal satu topik untuk memulai' }}
          </p>

          <!-- Bottom Actions -->
          <div class="space-y-2 pt-2">
            <button 
              @click="handleStep3Next"
              type="button"
              class="w-full py-3.5 sm:py-4 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-black text-base shadow-duo-green active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              :class="{ 'opacity-60 cursor-not-allowed': form.interests.length === 0 }"
            >
              <span>Lanjut</span>
              <span>→</span>
            </button>

            <button 
              @click="prevStep"
              type="button"
              class="w-full py-2 text-center text-xs font-heading font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              ← Kembali
            </button>
          </div>

        </div>

        <!-- ============================================================== -->
        <!-- STEP 4: PILIH GAYA BELAJAR                                      -->
        <!-- ============================================================== -->
        <div v-else-if="currentStep === 4" key="step-4" class="space-y-6">
          
          <div class="text-center space-y-1">
            <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Hari ini mau belajar seperti apa? 🚀
            </h1>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-500">
              Pilih target harian yang membuatmu merasa nyaman.
            </p>
          </div>

          <!-- 3 Style Cards -->
          <div class="space-y-3.5">
            <div 
              v-for="style in learningStyleOptions" 
              :key="style.id"
              @click="selectLearningStyle(style.id)"
              class="group relative bg-white rounded-3xl border-3 p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer select-none"
              :class="form.learningStyle === style.id 
                ? 'border-duo-green bg-emerald-50/50 shadow-duo-green scale-[1.015]' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm active:scale-[0.99]'"
            >
              <!-- Icon -->
              <div 
                class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 border-2 transition-transform duration-200 group-hover:scale-105"
                :class="form.learningStyle === style.id 
                  ? 'bg-emerald-100 border-emerald-300' 
                  : 'bg-slate-100 border-slate-200'"
              >
                {{ style.icon }}
              </div>

              <!-- Text Info -->
              <div class="flex-1 min-w-0 space-y-0.5">
                <div class="flex items-center gap-2">
                  <h3 class="font-heading font-black text-base sm:text-lg text-slate-800">
                    {{ style.title }}
                  </h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-extrabold bg-slate-100 text-slate-600">
                    {{ style.duration }}
                  </span>
                </div>
                <p class="text-xs font-heading font-bold text-slate-500">
                  {{ style.subtitle }}
                </p>
              </div>

              <!-- Checkmark Radio -->
              <div 
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all shrink-0"
                :class="form.learningStyle === style.id 
                  ? 'bg-duo-green border-emerald-600 text-white shadow-xs scale-105' 
                  : 'border-slate-300 bg-white text-transparent'"
              >
                ✓
              </div>
            </div>
          </div>

          <!-- Microcopy Notice -->
          <p class="text-center text-[11px] sm:text-xs text-slate-400 font-heading font-medium">
            💡 Tenang, kamu bisa mengubahnya nanti kapan saja di pengaturan.
          </p>

          <!-- Bottom Actions -->
          <div class="space-y-2 pt-2">
            <button 
              @click="handleStep4Submit"
              type="button"
              class="w-full py-4 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-black text-base shadow-duo-green active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Siapkan Belajarku</span>
              <span>🚀</span>
            </button>

            <button 
              @click="prevStep"
              type="button"
              class="w-full py-2 text-center text-xs font-heading font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              ← Kembali
            </button>
          </div>

        </div>

        <!-- ============================================================== -->
        <!-- FINAL SCREEN: SELEBRASI & RINGKASAN PERJALANAN                  -->
        <!-- ============================================================== -->
        <div v-else-if="currentStep === 5" key="step-5" class="space-y-6 text-center animate-pop">
          
          <!-- Big Celebratory Mascot -->
          <div class="relative inline-block mx-auto select-none">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-400 border-4 border-amber-300 flex items-center justify-center text-5xl sm:text-6xl shadow-xl animate-bounce-slow mx-auto">
              🦉
            </div>
            <div class="absolute -top-3 -right-3 px-3 py-1 bg-white border-2 border-slate-200 rounded-full font-heading font-black text-xs text-duo-green shadow-md animate-pulse">
              Hore! 🎉
            </div>
          </div>

          <!-- Headline & Subheadline -->
          <div class="space-y-1">
            <h1 class="font-heading text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Semua sudah siap, {{ form.name }}! 🎉
            </h1>
            <p class="text-xs sm:text-sm font-heading font-bold text-slate-500">
              Petualangan belajar kamu dimulai sekarang.
            </p>
          </div>

          <!-- Clean Adventure Summary Card -->
          <div class="bg-white rounded-3xl border-3 border-slate-200 p-5 sm:p-6 shadow-sm text-left space-y-3.5 divide-y divide-slate-100">
            
            <div class="flex items-center justify-between">
              <span class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider">Nama Penjelajah</span>
              <span class="font-heading font-black text-sm sm:text-base text-slate-800">{{ form.name }}</span>
            </div>

            <div class="flex items-center justify-between pt-3">
              <span class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider">Level Belajar</span>
              <span class="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-heading font-black text-xs">
                {{ getGradeLabel(form.grade) }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3">
              <span class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider">Yang Disukai</span>
              <span class="font-heading font-black text-xs sm:text-sm text-slate-700 text-right">
                {{ getInterestsLabel() }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3">
              <span class="text-xs font-heading font-extrabold text-slate-400 uppercase tracking-wider">Gaya Belajar</span>
              <span class="font-heading font-black text-xs sm:text-sm text-amber-700 flex items-center gap-1">
                <span>{{ getStyleIcon(form.learningStyle) }}</span>
                <span>{{ getStyleLabel(form.learningStyle) }}</span>
              </span>
            </div>

          </div>

          <!-- Final Primary CTA -->
          <div class="pt-2">
            <button 
              @click="finishAndStartLearning"
              type="button"
              class="w-full py-4 sm:py-4.5 rounded-2xl bg-duo-green hover:bg-emerald-500 text-white font-heading font-black text-base sm:text-lg shadow-duo-green active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Mulai Belajar</span>
              <span>🚀</span>
            </button>
          </div>

        </div>
      </Transition>

    </main>

    <!-- Bottom Footer Brand Note -->
    <footer class="relative z-10 py-4 text-center text-xs font-heading font-bold text-slate-400 select-none">
      <p>Pintara • Belajar Seru Ramah Anak Usia TK & SD</p>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import confetti from 'canvas-confetti'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { useSoundEffects } from '~/composables/useSoundEffects'

// SEO Meta
useSeoMeta({
  title: 'Siapkan Petualangan Belajarmu — Pintara',
  description: 'Mulai petualangan belajar interaktif dan seru untuk anak usia TK A, TK B, dan SD Kelas 1 di Pintara.',
  robots: 'noindex, follow'
})

const route = useRoute()
const userStore = useUserStore()
const courseStore = useCourseStore()
const soundEffects = useSoundEffects()

// Current Step: 1=Kenalan, 2=Level, 3=Minat, 4=Gaya, 5=Completion
const currentStep = ref(1)
const step1Error = ref('')
const nameInputRef = ref<HTMLInputElement | null>(null)

// Form State
const form = reactive({
  name: '',
  grade: 'tk_a',
  interests: ['angka', 'logika'],
  learningStyle: 'semangat'
})

// Step 2 Grade Options
const gradeOptions = [
  {
    id: 'tk_a',
    title: 'TK A',
    subtitle: 'Mulai mengenal dunia belajar',
    age: '4–5 Thn',
    icon: '🎒'
  },
  {
    id: 'tk_b',
    title: 'TK B',
    subtitle: 'Siap untuk tantangan berikutnya',
    age: '5–6 Thn',
    icon: '🎈'
  },
  {
    id: 'sd_1',
    title: 'SD Kelas 1',
    subtitle: 'Yuk mulai petualangan baru',
    age: '6–7 Thn',
    icon: '🏫'
  }
]

// Step 3 Interest Options
const interestOptions = [
  {
    id: 'angka',
    title: 'Angka & Berhitung',
    subtitle: 'Teka-teki nomor, hitung buah & logika angka',
    icon: '🔢'
  },
  {
    id: 'huruf',
    title: 'Huruf & Kata',
    subtitle: 'Mengenal alfabet, membaca seru & suku kata',
    icon: '🔤'
  },
  {
    id: 'warna',
    title: 'Warna & Bentuk',
    subtitle: 'Pola visual, kreasi warna & bentuk geometris',
    icon: '🎨'
  },
  {
    id: 'logika',
    title: 'Teka-teki & Logika',
    subtitle: 'Puzzle gambar, tebak bayangan & memori flip',
    icon: '🧩'
  }
]

// Step 4 Learning Style Options
const learningStyleOptions = [
  {
    id: 'santai',
    title: 'Santai',
    subtitle: 'Belajar sedikit demi sedikit',
    duration: '5 mnt/hari',
    icon: '🌱'
  },
  {
    id: 'semangat',
    title: 'Semangat',
    subtitle: 'Belajar lebih banyak hari ini',
    duration: '10 mnt/hari',
    icon: '🔥'
  },
  {
    id: 'tantangan',
    title: 'Tantangan',
    subtitle: 'Suka tantangan dan mengumpulkan XP',
    duration: '15+ mnt/hari',
    icon: '🏆'
  }
]

onMounted(() => {
  userStore.loadFromStorage()

  // Jika user sudah menyelesaikan onboarding atau sudah login aktif, langsung bawa ke /course
  if (userStore.hasOnboarded) {
    if (route.query.id) {
      navigateTo({ path: '/course', query: route.query })
    } else {
      navigateTo('/course')
    }
    return
  }

  // Auto focus input on mount
  nextTick(() => {
    nameInputRef.value?.focus()
  })
})

// Step 1 Validation & Navigation
const handleStep1Next = () => {
  const clean = form.name.trim()
  if (!clean || clean.length < 2) {
    step1Error.value = 'Tulis namamu dulu yaa (minimal 2 huruf) agar Kiko bisa menyapamu!'
    soundEffects.playWrong()
    return
  }
  step1Error.value = ''
  soundEffects.playPop()
  currentStep.value = 2
}

// Step 2 Selection
const selectGrade = (gradeId: string) => {
  form.grade = gradeId
  soundEffects.playPop()
}

const handleStep2Next = () => {
  soundEffects.playPop()
  currentStep.value = 3
}

// Step 3 Selection (Multi-choice)
const isInterestSelected = (id: string) => {
  return form.interests.includes(id)
}

const toggleInterest = (id: string) => {
  const idx = form.interests.indexOf(id)
  if (idx >= 0) {
    // Sisakan minimal 1 pilihan
    if (form.interests.length > 1) {
      form.interests.splice(idx, 1)
      soundEffects.playPop()
    }
  } else {
    form.interests.push(id)
    soundEffects.playPop()
  }
}

const handleStep3Next = () => {
  if (form.interests.length === 0) return
  soundEffects.playPop()
  currentStep.value = 4
}

// Step 4 Selection
const selectLearningStyle = (styleId: string) => {
  form.learningStyle = styleId
  soundEffects.playPop()
}

const handleStep4Submit = () => {
  soundEffects.playCorrect()
  currentStep.value = 5

  // Trigger celebration effects
  triggerConfetti()
  setTimeout(() => {
    soundEffects.playCheer()
  }, 200)
}

// Previous step handler
const prevStep = () => {
  if (currentStep.value > 1) {
    soundEffects.playPop()
    currentStep.value -= 1
    if (currentStep.value === 1) {
      nextTick(() => nameInputRef.value?.focus())
    }
  }
}

// Confetti burst effect
const triggerConfetti = () => {
  if (typeof window === 'undefined') return
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff']
    })
  } catch (e) {}
}

// Finish Onboarding & Redirect
const finishAndStartLearning = () => {
  soundEffects.playPop()

  // Save guest onboarding data to pinia and local storage
  const gradeLabelMap: Record<string, string> = {
    tk_a: 'TK A',
    tk_b: 'TK B',
    sd_1: 'Kelas 1 SD'
  }

  userStore.completeGuestOnboarding({
    name: form.name.trim(),
    grade: gradeLabelMap[form.grade] || 'TK A',
    interests: form.interests,
    learningStyle: form.learningStyle
  })

  // Select appropriate starter course or target course from query
  const targetCourseId = (route.query.id as string) || (form.grade === 'sd_1' ? 'counting_101' : 'counting_101')
  courseStore.selectCourse(targetCourseId)

  // Redirect to learning journey with query parameter if present
  if (route.query.id) {
    navigateTo({ path: '/course', query: route.query })
  } else {
    navigateTo('/course')
  }
}

// Display Label Helpers
const getGradeLabel = (gId: string) => {
  const g = gradeOptions.find(o => o.id === gId)
  return g ? `${g.title} (${g.age})` : 'TK A'
}

const getInterestsLabel = () => {
  const titleMap: Record<string, string> = {
    angka: 'Angka',
    huruf: 'Huruf',
    warna: 'Warna',
    logika: 'Logika'
  }
  return form.interests.map(i => titleMap[i] || i).join(' · ')
}

const getStyleLabel = (sId: string) => {
  const s = learningStyleOptions.find(o => o.id === sId)
  return s ? s.title : 'Semangat'
}

const getStyleIcon = (sId: string) => {
  const s = learningStyleOptions.find(o => o.id === sId)
  return s ? s.icon : '🔥'
}
</script>

<style scoped>
/* Step Slide Transition */
.step-slide-enter-active,
.step-slide-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.step-slide-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.step-slide-leave-to {
  opacity: 0;
  transform: translateX(-18px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
