<template>
  <Transition name="fade-modal">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
      @click.self="closePaywall"
    >
      <div 
        class="relative w-full max-w-xl bg-gradient-to-b from-white via-amber-50/40 to-white rounded-[32px] sm:rounded-[36px] p-5 sm:p-7 shadow-2xl border-4 border-amber-300 overflow-hidden space-y-5 animate-pop text-slate-800 my-auto"
      >
        <!-- Ambient Glowing Background Ornaments -->
        <div class="absolute -top-16 -right-16 w-48 h-48 bg-amber-300/40 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Close Button -->
        <button 
          @click="closePaywall"
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-500 hover:text-slate-800 flex items-center justify-center font-heading font-black text-sm transition-all z-20 cursor-pointer shadow-2xs"
          title="Tutup"
        >
          ✕
        </button>

        <!-- Dynamic Header based on Trigger Reason -->
        <div class="text-center space-y-2 pt-1 relative z-10">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-sm border border-amber-300 animate-bounce-slow">
            <span>👑 QUIZCERDAS PRO</span>
          </div>

          <h2 class="font-heading text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {{ modalTitle }}
          </h2>

          <p class="text-xs sm:text-sm text-slate-600 font-body max-w-md mx-auto leading-relaxed">
            {{ modalDescription }}
          </p>
        </div>

        <!-- Single Premium Plan Card (Pro Rp 99.000) -->
        <div class="relative bg-gradient-to-br from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-1 shadow-xl relative z-10">
          <div class="bg-white rounded-[22px] p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-full font-heading font-black text-[10px] uppercase">
                  🔥 PENAWARAN SPESIAL
                </div>
                <h3 class="font-heading text-xl font-black text-slate-900 mt-1">
                  Akses Penuh QuizCerdas Pro
                </h3>
              </div>
              <div class="text-left sm:text-right">
                <div class="font-heading text-3xl sm:text-4xl font-black text-slate-900 leading-none">
                  Rp 99.000
                </div>
                <div class="text-[11px] font-heading font-extrabold text-amber-700">
                  Akses 1 Tahun (~Rp 8.250/bulan)
                </div>
              </div>
            </div>

            <!-- Pro Features Highlights -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-heading font-extrabold text-slate-700">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>❤️ Nyawa Tanpa Batas (Bebas Salah)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>🗺️ Akses Seluruh Unit & Kurikulum</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>🎨 Koleksi Lengkap Tracing & Mewarnai</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>📊 Laporan Mingguan ke WhatsApp</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>🖨️ Download Printable PDF Lembar Kerja</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                <span>🚫 100% Bebas Iklan & Aman Anak</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method Selector Simulation -->
        <div class="space-y-1.5 relative z-10">
          <div class="text-[11px] font-heading font-black text-slate-500 uppercase tracking-wider">
            Pilih Metode Pembayaran:
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button 
              v-for="pm in paymentMethods" 
              :key="pm.id"
              @click="selectedPaymentMethod = pm.id"
              class="p-2 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1"
              :class="selectedPaymentMethod === pm.id 
                ? 'bg-amber-50 border-amber-500 shadow-xs text-amber-950 font-black' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 font-bold'"
            >
              <span class="text-base">{{ pm.icon }}</span>
              <span class="text-[10px] truncate max-w-full">{{ pm.name }}</span>
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2 pt-1 relative z-10">
          <button 
            @click="handleSimulatedCheckout" 
            :disabled="isProcessing"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 active:scale-98 text-slate-950 font-heading font-black text-base shadow-xl border-b-4 border-amber-700 cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span v-if="isProcessing" class="animate-spin text-lg">⏳</span>
            <span v-else>🚀</span>
            <span>{{ isProcessing ? 'Memproses Langganan...' : 'Aktifkan QuizCerdas Pro (Rp 99.000)' }}</span>
          </button>

          <!-- Free refill XP alternative if out of hearts -->
          <button 
            v-if="activeReason === 'out_of_hearts'"
            @click="handleBuyHeartWithXP"
            class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>⚡ Atau Isi Ulang 5 Nyawa Pakai 20 XP (Kamu punya {{ userStore.xp }} XP)</span>
          </button>

          <p class="text-[11px] text-center font-heading font-bold text-slate-400">
            🔒 Pembayaran Terenkripsi & Garansi 7 Hari Uang Kembali
          </p>
        </div>

        <!-- Success Celebration Overlay -->
        <Transition name="fade-modal">
          <div 
            v-if="showSuccessOverlay" 
            class="absolute inset-0 z-30 bg-white/95 backdrop-blur-md rounded-[32px] flex flex-col items-center justify-center p-6 text-center space-y-4 animate-pop"
          >
            <div class="w-20 h-20 rounded-3xl bg-amber-400 text-4xl flex items-center justify-center shadow-xl border-4 border-amber-300 animate-bounce">
              👑
            </div>
            <div class="space-y-1">
              <h3 class="font-heading text-2xl sm:text-3xl font-black text-slate-900">
                Selamat! Akunmu Kini PRO! 🎉
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 font-heading font-bold max-w-sm mx-auto">
                Semua unit, nyawa tanpa batas (❤️ ∞), dan modul kreatif kini siap dinikmati si kecil!
              </p>
            </div>
            <button 
              @click="finishCelebration"
              class="duo-btn-green px-8 py-3.5 text-sm font-heading font-black shadow-lg cursor-pointer"
            >
              ✨ Mulai Belajar Sekarang!
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { usePaywall } from '~/composables/usePaywall'
import confetti from 'canvas-confetti'

const userStore = useUserStore()
const { isOpen, activeReason, customTitle, customDescription, customFeature, closePaywall } = usePaywall()

const selectedPaymentMethod = ref('qris')
const isProcessing = ref(false)
const showSuccessOverlay = ref(false)

const paymentMethods = [
  { id: 'qris', name: 'QRIS / GoPay', icon: '📱' },
  { id: 'shopee', name: 'ShopeePay', icon: '🛍️' },
  { id: 'bca', name: 'VA BCA', icon: '🏦' },
  { id: 'mandiri', name: 'VA Mandiri', icon: '💳' }
]

const modalTitle = computed(() => {
  if (customTitle.value) return customTitle.value
  switch (activeReason.value) {
    case 'out_of_hearts':
      return 'Nyawa Habis? Terus Belajar Tanpa Batas! ❤️'
    case 'unit_locked':
      return 'Buka Seluruh Petualangan Modul Belajar! 🗺️'
    case 'creative_locked':
      return 'Buka Ratusan Template Mewarnai & Tracing! 🎨'
    case 'parent_analytics':
      return 'Analisis Tumbuh Kembang Akademis Anak 📊'
    case 'whatsapp_report':
      return 'Laporan Belajar Otomatis ke WhatsApp 📲'
    default:
      return 'Dukung Potensi Terbaik Si Kecil Bersama Pro ⭐'
  }
})

const modalDescription = computed(() => {
  if (customDescription.value) return customDescription.value
  switch (activeReason.value) {
    case 'out_of_hearts':
      return 'Di akun Pro, si kecil mendapatkan Nyawa Tanpa Batas (❤️ ∞) sehingga tidak frustrasi saat mencoba soal baru.'
    case 'unit_locked':
      return 'Akses tanpa batas ke seluruh Bioma, modul Calistung, Matematika Logika, dan persiapan masuk SD.'
    case 'creative_locked':
      return 'Latih motorik dan kreativitas anak dengan koleksi lengkap lembar mewarnai dan tracing huruf/angka.'
    case 'parent_analytics':
      return 'Dapatkan wawasan mendalam topik yang sudah dikuasai dan area materi yang perlu bimbingan khusus.'
    default:
      return 'Nikmati pembelajaran interaktif tanpa batas dengan fitur premium terlengkap untuk anak usia 4–9 tahun.'
  }
})

const triggerConfetti = () => {
  if (typeof window === 'undefined') return
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    })
  } catch (e) {}
}

const handleBuyHeartWithXP = () => {
  try {
    userStore.buyHeartRefill(20)
    triggerConfetti()
    closePaywall()
  } catch (err: any) {
    alert(err.message || 'XP kamu belum cukup!')
  }
}

const handleSimulatedCheckout = () => {
  isProcessing.value = true
  setTimeout(() => {
    userStore.upgradeToPro('PRO', 12)
    isProcessing.value = false
    showSuccessOverlay.value = true
    triggerConfetti()
  }, 1000)
}

const finishCelebration = () => {
  showSuccessOverlay.value = false
  closePaywall()
}
</script>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-pop {
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
