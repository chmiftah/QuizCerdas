<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-pop select-none">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-8 border-amber-300 shadow-2xl space-y-6 relative print:border-4 print:p-8 print:shadow-none">
        <!-- Close Button (Hidden on Print) -->
        <button 
          @click="emit('close')" 
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer print:hidden"
        >
          ✕
        </button>

        <!-- Certificate Header -->
        <div class="text-center space-y-2">
          <div class="w-16 h-16 rounded-3xl bg-amber-400 text-white mx-auto flex items-center justify-center text-4xl shadow-md animate-bounce print:animate-none">
            🎓
          </div>
          <p class="text-xs font-heading font-extrabold text-amber-700 uppercase tracking-widest">
            SERTIFIKAT KELULUSAN RESMI
          </p>
          <h2 class="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            CountingDuo Junior 👑
          </h2>
        </div>

        <!-- Certificate Body -->
        <div class="p-6 bg-gradient-to-b from-amber-50/70 to-yellow-50/70 rounded-2xl border-2 border-dashed border-amber-300 text-center space-y-4">
          <p class="text-sm font-heading font-semibold text-slate-600">
            Diberikan dengan bangga kepada Penjelajah Muda:
          </p>

          <h3 class="text-2xl sm:text-3xl font-heading font-black text-duo-green-dark underline decoration-amber-400 decoration-wavy">
            {{ userStore.userDisplayName }}
          </h3>

          <p class="text-xs sm:text-sm font-heading text-slate-700 max-w-md mx-auto leading-relaxed">
            Atas keberhasilan luar biasa dalam menguasai materi dan menyelesaikan seluruh kuis pada modul:
          </p>

          <div class="px-4 py-2 bg-white rounded-xl border border-amber-200 inline-block font-heading font-extrabold text-amber-900 text-sm sm:text-base shadow-xs">
            🌟 {{ title || 'Petualangan Angka Ceria 1-10' }} 🌟
          </div>
        </div>

        <!-- Certificate Footer Signature & Seal -->
        <div class="flex items-center justify-between px-4 pt-2">
          <div class="text-left space-y-0.5">
            <span class="text-[10px] font-heading font-bold text-slate-400 block uppercase">Tanggal Lulus:</span>
            <span class="text-xs font-heading font-extrabold text-slate-700">{{ currentDate }}</span>
          </div>

          <div class="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-md flex items-center justify-center text-2xl font-black text-white shrink-0">
            ⭐
          </div>

          <div class="text-right space-y-0.5">
            <span class="text-[10px] font-heading font-bold text-slate-400 block uppercase">Maskot Pembimbing:</span>
            <span class="text-xs font-heading font-extrabold text-slate-700">Kiko Si Panda 🐼</span>
          </div>
        </div>

        <!-- Action Buttons (Hidden on Print) -->
        <div class="flex items-center justify-end gap-3 pt-2 print:hidden">
          <button 
            @click="printCertificate" 
            class="px-6 py-3 duo-btn-green text-xs font-heading font-extrabold rounded-2xl shadow-md flex items-center gap-2"
          >
            <span>🖨️ Cetak / Download Sertifikat</span>
          </button>
          <button 
            @click="emit('close')" 
            class="px-5 py-3 duo-btn-gray text-xs font-heading font-bold rounded-2xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits(['close'])
const userStore = useUserStore()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const printCertificate = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>
