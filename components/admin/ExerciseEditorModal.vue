<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      
      <!-- Backdrop Click to Close -->
      <div class="fixed inset-0" @click="closeModal"></div>

      <!-- Main Modal Container -->
      <div class="relative bg-white rounded-3xl sm:rounded-[36px] border-4 border-purple-200 shadow-2xl w-full max-w-3xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        <!-- Header Bar -->
        <div class="bg-purple-700 px-6 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ isEditing ? '✏️' : '➕' }}</span>
            <div>
              <h3 class="font-heading text-lg sm:text-xl font-black leading-tight">
                {{ isEditing ? 'Edit Soal Kuis' : 'Tambah Soal Baru' }}
              </h3>
              <p class="text-xs text-purple-200 font-heading">
                ID: <code class="font-mono bg-white/20 px-1.5 py-0.5 rounded text-[11px] text-white">{{ form.id }}</code>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button 
              @click="triggerPreview" 
              type="button" 
              class="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-heading font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>👁️</span>
              <span>Preview Cepat</span>
            </button>

            <button 
              @click="closeModal" 
              type="button" 
              class="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center font-black text-sm transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Scrollable Form Body -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-50/60 font-heading">
          
          <!-- STEP 1: SELECT EXERCISE TYPE (29 Types Categorized) -->
          <div class="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-3">
            <div class="flex items-center justify-between">
              <label class="font-black text-xs sm:text-sm text-slate-800 uppercase flex items-center gap-1.5">
                <span>🎯</span> 1. Pilih Tipe Soal (29 Tipe Interaktif)
              </label>
              <span class="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                Aktif: {{ currentTypeMeta.icon }} {{ currentTypeMeta.label }}
              </span>
            </div>

            <!-- Category Tabs / Filter for 29 Types -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
              <button 
                v-for="cat in typeCategories" 
                :key="cat.id" 
                @click="activeCategory = cat.id"
                type="button" 
                class="px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-colors"
                :class="activeCategory === cat.id ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'"
              >
                <span>{{ cat.icon }}</span> {{ cat.name }}
              </button>
            </div>

            <!-- Types Grid for Active Category -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 max-h-48 overflow-y-auto">
              <button 
                v-for="t in filteredTypes" 
                :key="t.id"
                @click="selectType(t.id)"
                type="button"
                class="p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between"
                :class="form.type === t.id ? 'bg-purple-50 border-purple-500 shadow-xs ring-2 ring-purple-200' : 'bg-slate-50 hover:bg-white border-slate-200'"
              >
                <div class="flex items-center justify-between w-full">
                  <span class="text-xl">{{ t.icon }}</span>
                  <span v-if="form.type === t.id" class="text-purple-600 font-black text-xs">✓</span>
                </div>
                <p class="font-black text-[11px] text-slate-800 mt-1 line-clamp-1">{{ t.label }}</p>
                <span class="text-[9px] text-slate-400 block">{{ t.tag }}</span>
              </button>
            </div>
          </div>

          <!-- STEP 2: MAIN QUESTION DETAILS -->
          <div class="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-4">
            <h4 class="font-black text-xs sm:text-sm text-slate-800 uppercase flex items-center gap-1.5">
              <span>📝</span> 2. Teks Pertanyaan & Kesulitan
            </h4>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Teks Pertanyaan / Instruksi Kuis *</label>
                <input 
                  v-model="form.question" 
                  type="text" 
                  placeholder="Contoh: Ada berapa buah apel di dalam keranjang?" 
                  class="w-full p-3 rounded-xl border-2 border-slate-200 bg-white font-bold text-slate-800 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Tingkat Kesulitan</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="diff in difficulties" 
                      :key="diff.id"
                      @click="form.difficulty = diff.id"
                      type="button"
                      class="p-2 rounded-xl border-2 text-center text-xs font-black cursor-pointer transition-all"
                      :class="form.difficulty === diff.id ? diff.activeClass : 'border-slate-200 bg-slate-50 text-slate-600'"
                    >
                      {{ diff.label }}
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 mb-1">Penjelasan / Umpan Balik Kiko</label>
                  <input 
                    v-model="form.explanation" 
                    type="text" 
                    placeholder="Contoh: Hebat sekali! Ada 3 buah apel merah segar." 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-semibold text-slate-800 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: VISUAL OBJECT CONFIGURATION -->
          <div class="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-3">
            <h4 class="font-black text-xs sm:text-sm text-slate-800 uppercase flex items-center gap-1.5">
              <span>🎨</span> 3. Ilustrasi Visual Soal (Opsional)
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Emoji Objek Visual</label>
                <div class="flex items-center gap-2">
                  <input 
                    v-model="form.visual_emoji" 
                    type="text" 
                    placeholder="🍎" 
                    class="w-16 p-2 rounded-xl border-2 border-slate-200 bg-white text-center text-xl font-bold"
                  />
                  <!-- Quick Emoji Suggestions -->
                  <div class="flex items-center gap-1 flex-wrap">
                    <button 
                      v-for="em in ['🍎', '⭐', '🐱', '🐶', '🚗', '🎈', '🍕', '🦁']" 
                      :key="em"
                      @click="form.visual_emoji = em"
                      type="button"
                      class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                    >
                      {{ em }}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">Jumlah Objek Visual</label>
                <input 
                  v-model.number="form.visual_count" 
                  type="number" 
                  min="1" 
                  max="20"
                  placeholder="3" 
                  class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-bold text-slate-800"
                />
              </div>

              <div>
                <label class="block font-bold text-slate-700 mb-1">URL Gambar Khusus (Opsional)</label>
                <input 
                  v-model="form.image" 
                  type="text" 
                  placeholder="/images/... atau https://..." 
                  class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white text-[11px] font-mono"
                />
              </div>
            </div>
          </div>

          <!-- STEP 4: TYPE-SPECIFIC ANSWER BUILDER -->
          <div class="bg-purple-50/60 p-4 sm:p-5 rounded-2xl border-2 border-purple-200 space-y-4">
            <h4 class="font-black text-xs sm:text-sm text-purple-900 uppercase flex items-center gap-1.5">
              <span>⚙️</span> 4. Konfigurasi Kunci & Pilihan Jawaban
            </h4>

            <!-- A. MULTIPLE CHOICE / COUNT SELECT / ODD ONE OUT / SHAPE TRANSFORM -->
            <div v-if="['multiple_choice', 'count_select', 'odd_one_out', 'shape_transform', 'sequence_ordering', 'pattern_matching'].includes(form.type)" class="space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-700">Daftar Pilihan Jawaban (Klik tombol centang untuk menentukan kunci jawaban benar):</span>
                <button 
                  @click="addOption" 
                  type="button" 
                  class="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-black cursor-pointer shadow-2xs"
                >
                  ➕ Tambah Opsi
                </button>
              </div>

              <div class="space-y-2">
                <div 
                  v-for="(opt, idx) in optionsList" 
                  :key="idx" 
                  class="flex items-center gap-2 bg-white p-2.5 rounded-xl border-2 transition-colors"
                  :class="form.correct_answer === opt ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'"
                >
                  <!-- Select as correct radio -->
                  <button 
                    @click="form.correct_answer = opt" 
                    type="button" 
                    class="px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-colors"
                    :class="form.correct_answer === opt ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 hover:bg-emerald-100 text-slate-600'"
                    title="Jadikan Kunci Jawaban Benar"
                  >
                    <span v-if="form.correct_answer === opt">✓ KUNCI BENAR</span>
                    <span v-else>Pilih Kunci</span>
                  </button>

                  <input 
                    v-model="optionsList[idx]" 
                    @input="syncOptionsFromList"
                    type="text" 
                    :placeholder="`Pilihan ${idx + 1}...`" 
                    class="flex-1 p-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                  />

                  <button 
                    v-if="optionsList.length > 2"
                    @click="removeOption(idx)" 
                    type="button" 
                    class="w-7 h-7 text-rose-500 hover:bg-rose-50 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- B. MATCHING (LEFT-RIGHT PAIRS) -->
            <div v-else-if="form.type === 'matching'" class="space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-700">Pasangan Mencocokkan (Kiri ➔ Kanan):</span>
                <button 
                  @click="addPair" 
                  type="button" 
                  class="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-black cursor-pointer"
                >
                  ➕ Tambah Pasangan
                </button>
              </div>

              <div class="space-y-2">
                <div v-for="(p, pIdx) in pairsList" :key="pIdx" class="flex items-center gap-2 bg-white p-2.5 rounded-xl border-2 border-purple-200">
                  <span class="text-xs font-black text-purple-700 w-5">#{{ pIdx + 1 }}</span>
                  <input 
                    v-model="p.left" 
                    @input="syncPairs"
                    type="text" 
                    placeholder="Kiri (Contoh: 🍎)" 
                    class="flex-1 p-2 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                  />
                  <span class="text-slate-400 font-black">➔</span>
                  <input 
                    v-model="p.right" 
                    @input="syncPairs"
                    type="text" 
                    placeholder="Kanan (Contoh: 1)" 
                    class="flex-1 p-2 rounded-lg border border-slate-300 font-bold text-xs bg-white"
                  />
                  <button 
                    v-if="pairsList.length > 1"
                    @click="removePair(pIdx)" 
                    type="button" 
                    class="w-7 h-7 text-rose-500 hover:bg-rose-50 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- C. TRUE FALSE / TRUE FALSE IMAGE -->
            <div v-else-if="form.type === 'true_false' || form.type === 'true_false_image'" class="space-y-3">
              <label class="block font-bold text-xs text-slate-700">Kunci Jawaban Benar:</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  @click="form.correct_answer = 'true'" 
                  type="button"
                  class="p-3 rounded-2xl border-2 text-center font-black text-sm cursor-pointer transition-all"
                  :class="form.correct_answer === 'true' ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' : 'bg-white border-slate-200 text-slate-700'"
                >
                  🟢 BENAR (True)
                </button>
                <button 
                  @click="form.correct_answer = 'false'" 
                  type="button"
                  class="p-3 rounded-2xl border-2 text-center font-black text-sm cursor-pointer transition-all"
                  :class="form.correct_answer === 'false' ? 'bg-rose-500 text-white border-rose-600 shadow-sm' : 'bg-white border-slate-200 text-slate-700'"
                >
                  🔴 SALAH (False)
                </button>
              </div>
            </div>

            <!-- D. NUMBER TRACING (DIGIT PICKER) -->
            <div v-else-if="form.type === 'number_tracing'" class="space-y-3">
              <label class="block font-bold text-xs text-slate-700">Pilih Angka Target untuk Ditebalkan Siswa (1 - 10):</label>
              <div class="flex items-center gap-2 flex-wrap">
                <button 
                  v-for="digit in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" 
                  :key="digit"
                  @click="form.correct_answer = digit"
                  type="button"
                  class="w-11 h-11 rounded-2xl font-black text-base border-2 cursor-pointer transition-all flex items-center justify-center"
                  :class="form.correct_answer === digit ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-110' : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400'"
                >
                  {{ digit }}
                </button>
              </div>
            </div>

            <!-- E. TIME READING (ANALOG CLOCK) -->
            <div v-else-if="form.type === 'time_reading'" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Format Jam Kunci (Contoh: 03:00, 06:30)</label>
                  <input 
                    v-model="form.correct_answer" 
                    type="text" 
                    placeholder="03:00" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-black text-sm text-purple-700"
                  />
                  <!-- Preset Times -->
                  <div class="flex items-center gap-1.5 flex-wrap mt-2">
                    <button 
                      v-for="tPreset in ['03:00', '06:00', '09:00', '12:00', '04:30', '08:15']" 
                      :key="tPreset"
                      @click="form.correct_answer = tPreset"
                      type="button"
                      class="px-2 py-1 bg-white hover:bg-purple-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer"
                    >
                      {{ tPreset }}
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block font-bold text-slate-700 mb-1">Pilihan Jam (Dipisahkan Koma)</label>
                  <input 
                    :value="Array.isArray(form.options) ? form.options.join(', ') : form.options" 
                    @input="(e) => form.options = e.target.value.split(',').map(s => s.trim())"
                    type="text" 
                    placeholder="03:00, 04:00, 05:00, 06:00" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <!-- F. CATEGORY SORTING / DRAG TO SORT -->
            <div v-else-if="form.type === 'category_sorting' || form.type === 'drag_to_sort'" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Daftar Kategori (Dipisahkan Koma)</label>
                  <input 
                    v-model="categoryInput" 
                    @input="syncCategories"
                    type="text" 
                    placeholder="Buah, Sayur" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs"
                  />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Kunci Pemetaan Kategori</label>
                  <input 
                    v-model="form.correct_answer" 
                    type="text" 
                    placeholder="Buah:🍎,🍌|Sayur:🥕,🥦" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs text-purple-700"
                  />
                </div>
              </div>
            </div>

            <!-- H. READING (MEMBACA NYARING) -->
            <div v-else-if="form.type === 'reading'" class="space-y-3">
              <div>
                <label class="block font-bold text-xs text-slate-700 mb-1">
                  Teks atau Kalimat yang Wajib Dibaca Siswa:
                </label>
                <textarea
                  v-model="form.correct_answer"
                  rows="2"
                  placeholder="Contoh: Budi suka membaca buku cerita bergambar."
                  class="w-full p-3 rounded-xl border-2 border-indigo-200 bg-white font-black text-sm text-indigo-950 focus:border-indigo-500 outline-none transition-all"
                ></textarea>
                <p class="text-[11px] text-slate-500 mt-1">
                  💡 Kalimat di atas akan ditampilkan dalam bentuk chip kata interaktif yang dapat disentuh dan dibaca menggunakan mikrofon oleh siswa.
                </p>
              </div>

              <!-- Quick Sentence Presets for Kids -->
              <div class="space-y-1.5">
                <label class="block font-bold text-[11px] text-slate-600">Contoh Kalimat Siap Pakai:</label>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <button
                    v-for="preset in [
                      'Budi suka membaca buku cerita.',
                      'Kucing hitam melompat sangat tinggi.',
                      'Ibu memasak nasi goreng enak di dapur.',
                      'Matahari terbit di sebelah timur.',
                      'Satu dua tiga empat lima.'
                    ]"
                    :key="preset"
                    @click="form.correct_answer = preset"
                    type="button"
                    class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-[11px] font-bold text-indigo-800 cursor-pointer transition-colors"
                  >
                    {{ preset }}
                  </button>
                </div>
              </div>
            </div>

            <!-- G. FILL IN BLANK / GENERIC FALLBACK -->
            <div v-else class="space-y-3 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Kunci Jawaban Benar *</label>
                  <input 
                    v-model="form.correct_answer" 
                    type="text" 
                    placeholder="1" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-black text-sm text-emerald-700"
                  />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Pilihan Jawaban (Jika Ada, Dipisahkan Koma)</label>
                  <input 
                    :value="Array.isArray(form.options) ? form.options.join(', ') : form.options" 
                    @input="(e) => form.options = e.target.value.split(',').map(s => s.trim())"
                    type="text" 
                    placeholder="Opsi 1, Opsi 2, Opsi 3" 
                    class="w-full p-2.5 rounded-xl border-2 border-slate-200 bg-white font-bold text-xs"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Footer Actions Bar -->
        <div class="bg-white px-6 py-4 border-t-2 border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button 
            @click="closeModal" 
            type="button" 
            class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-extrabold text-xs rounded-xl transition-all cursor-pointer"
          >
            Batal
          </button>

          <div class="flex items-center gap-2">
            <button 
              @click="triggerPreview" 
              type="button" 
              class="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-heading font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>👁️</span>
              <span>Uji Preview Dulu</span>
            </button>

            <button 
              @click="saveExercise" 
              type="button" 
              class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-heading font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>💾</span>
              <span>Simpan Soal</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  exercise: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save', 'preview'])

const isEditing = computed(() => !!props.exercise?.id)
const activeCategory = ref('math')

// 29 Interactive Types Definition
const allTypes = [
  // Math & Counting
  { id: 'multiple_choice', label: 'Pilihan Ganda', icon: '🔘', category: 'math', tag: 'Dasar' },
  { id: 'count_select', label: 'Hitung & Pilih', icon: '🔢', category: 'math', tag: 'Angka' },
  { id: 'fill_in_blank', label: 'Isian Singkat', icon: '✍️', category: 'math', tag: 'Ketik' },
  { id: 'fill_missing_number', label: 'Angka Hilang', icon: '❓', category: 'math', tag: 'Deret' },
  { id: 'comparison', label: 'Perbandingan', icon: '⚖️', category: 'math', tag: 'Ukuran' },
  { id: 'balance_scale', label: 'Timbangan Seimbang', icon: '⚖️', category: 'math', tag: 'Kesetaraan' },
  { id: 'number_tracing', label: 'Tebalkan Angka', icon: '✏️', category: 'math', tag: 'Tracing' },
  { id: 'time_reading', label: 'Baca Jam', icon: '⏰', category: 'math', tag: 'Analog' },

  // Visual & Observation
  { id: 'shadow_matching', label: 'Cocok Bayangan', icon: '👥', category: 'visual', tag: 'Siluet' },
  { id: 'seek_find', label: 'Cari & Temukan', icon: '🔎', category: 'visual', tag: 'Observasi' },
  { id: 'color_by_number', label: 'Mewarnai Angka', icon: '🎨', category: 'visual', tag: 'Mewarnai' },
  { id: 'hotspot', label: 'Klik Area', icon: '🎯', category: 'visual', tag: 'Koordinat' },
  { id: 'true_false_image', label: 'Benar/Salah Gambar', icon: '🖼️', category: 'visual', tag: 'Foto' },
  { id: 'shape_transform', label: 'Bentuk Geometri', icon: '🔷', category: 'visual', tag: 'Bentuk' },
  { id: 'puzzle_assembly', label: 'Susun Puzzle', icon: '🧩', category: 'visual', tag: 'Potongan' },

  // Logic & Sorting
  { id: 'matching', label: 'Mencocokkan Pasangan', icon: '🔗', category: 'logic', tag: 'Garis' },
  { id: 'drag_and_drop', label: 'Seret & Lepas', icon: '🖐️', category: 'logic', tag: 'Keranjang' },
  { id: 'number_maze', label: 'Labirin Logika Angka', icon: '🌀', category: 'logic', tag: 'Jalur' },
  { id: 'category_sorting', label: 'Kelompokkan Kategori', icon: '📦', category: 'logic', tag: 'Kategori' },
  { id: 'drag_to_sort', label: 'Seret ke Kategori', icon: '🗂️', category: 'logic', tag: 'Wadah' },
  { id: 'sequence_ordering', label: 'Urutan Logis', icon: '🔢', category: 'logic', tag: 'Kronologis' },
  { id: 'pattern_matching', label: 'Pola Berulang', icon: '🧩', category: 'logic', tag: 'Runtun' },
  { id: 'odd_one_out', label: 'Temukan yang Berbeda', icon: '🔍', category: 'logic', tag: 'Anomali' },

  // Language & Memory
  { id: 'word_building', label: 'Susun Kata', icon: '🔤', category: 'language', tag: 'Huruf' },
  { id: 'syllable_clapping', label: 'Ketukan Suku Kata', icon: '👏', category: 'language', tag: 'Ketukan' },
  { id: 'sound_matching', label: 'Cocokkan Suara', icon: '🔊', category: 'language', tag: 'Audio' },
  { id: 'reading', label: 'Membaca Nyaring', icon: '📖', category: 'language', tag: 'Membaca' },
  { id: 'true_false', label: 'Benar / Salah Teks', icon: '⚖️', category: 'language', tag: 'Logika' },
  { id: 'memory_flip', label: 'Kartu Memori', icon: '🃏', category: 'language', tag: 'Pasangan' }
]

const typeCategories = [
  { id: 'math', name: 'Angka & Hitung', icon: '🔢' },
  { id: 'visual', name: 'Visual & Gambar', icon: '🎨' },
  { id: 'logic', name: 'Logika & Pola', icon: '🧩' },
  { id: 'language', name: 'Bahasa & Audio', icon: '🔤' }
]

const filteredTypes = computed(() => {
  return allTypes.filter(t => t.category === activeCategory.value)
})

const currentTypeMeta = computed(() => {
  return allTypes.find(t => t.id === form.value.type) || { label: 'Pilihan Ganda', icon: '🔘' }
})

const difficulties = [
  { id: 'easy', label: '🟢 Mudah', activeClass: 'bg-emerald-500 text-white border-emerald-600 shadow-xs' },
  { id: 'medium', label: '🟡 Sedang', activeClass: 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs' },
  { id: 'hard', label: '🔴 Menantang', activeClass: 'bg-rose-500 text-white border-rose-600 shadow-xs' }
]

// Form State
const defaultForm = () => ({
  id: `ex_${Date.now()}`,
  type: 'multiple_choice',
  difficulty: 'easy',
  question: '',
  options: ['1', '2', '3', '4'],
  correct_answer: '1',
  explanation: '',
  visual_emoji: '🍎',
  visual_count: 1,
  image: '',
  pairs: [
    { left: '🍎', right: '1' },
    { left: '🐱', right: '2' }
  ]
})

const form = ref(defaultForm())
const optionsList = ref(['1', '2', '3', '4'])
const pairsList = ref([{ left: '🍎', right: '1' }])
const categoryInput = ref('')

const syncOptionsFromList = () => {
  form.value.options = [...optionsList.value]
}

const addOption = () => {
  const nextNum = optionsList.value.length + 1
  optionsList.value.push(String(nextNum))
  syncOptionsFromList()
}

const removeOption = (idx) => {
  optionsList.value.splice(idx, 1)
  syncOptionsFromList()
  if (!optionsList.value.includes(form.value.correct_answer)) {
    form.value.correct_answer = optionsList.value[0] || ''
  }
}

const addPair = () => {
  pairsList.value.push({ left: '', right: '' })
  syncPairs()
}

const removePair = (idx) => {
  pairsList.value.splice(idx, 1)
  syncPairs()
}

const syncPairs = () => {
  form.value.pairs = [...pairsList.value]
}

const syncCategories = () => {
  if (categoryInput.value) {
    form.value.categories = categoryInput.value.split(',').map(s => s.trim()).filter(Boolean)
  }
}

const selectType = (typeId) => {
  form.value.type = typeId
  // Adjust defaults per type
  if (typeId === 'number_tracing' && !['1','2','3','4','5','6','7','8','9','10'].includes(form.value.correct_answer)) {
    form.value.correct_answer = '1'
  } else if (typeId === 'time_reading' && !form.value.correct_answer.includes(':')) {
    form.value.correct_answer = '03:00'
    form.value.options = ['03:00', '06:00', '09:00', '12:00']
    optionsList.value = [...form.value.options]
  } else if (typeId === 'true_false' || typeId === 'true_false_image') {
    form.value.correct_answer = 'true'
    form.value.options = ['true', 'false']
  } else if (typeId === 'reading') {
    if (!form.value.correct_answer || form.value.correct_answer === '1' || form.value.correct_answer === 'true') {
      form.value.correct_answer = 'Budi suka membaca buku cerita.'
    }
    if (!form.value.question) {
      form.value.question = 'Bacalah kalimat berikut dengan suara lantang dan jelas:'
    }
  } else if (typeId === 'number_maze') {
    if (!form.value.question) {
      form.value.question = 'Bantu Kiko melewati labirin dengan melangkah sesuai angka genap!'
    }
    form.value.correct_answer = '2,4,6,8,10'
  } else if (typeId === 'balance_scale') {
    if (!form.value.question) {
      form.value.question = 'Tambahkan bobot yang pas di piring kanan agar timbangan seimbang!'
    }
    form.value.correct_answer = '3'
    form.value.options = ['1', '2', '3', '4', '5']
    optionsList.value = [...form.value.options]
  } else if (typeId === 'color_by_number') {
    if (!form.value.question) {
      form.value.question = 'Warnai setiap bagian gambar kupu-kupu sesuai nomor pada palet cat!'
    }
    form.value.correct_answer = 'completed'
  } else if (typeId === 'syllable_clapping') {
    if (!form.value.question) {
      form.value.question = 'Hitung berapa ketukan suku kata pada kata berikut!'
    }
    form.value.correct_answer = '2'
    form.value.options = ['1', '2', '3', '4']
    optionsList.value = [...form.value.options]
  }
}

// Watch props.exercise to populate form when modal opens
watch(() => props.exercise, (newEx) => {
  if (newEx) {
    form.value = {
      id: newEx.id || `ex_${Date.now()}`,
      type: newEx.type || 'multiple_choice',
      difficulty: newEx.difficulty || 'easy',
      question: newEx.question || '',
      options: Array.isArray(newEx.options) ? [...newEx.options] : (newEx.options ? newEx.options.split(',').map(s => s.trim()) : ['1', '2', '3', '4']),
      correct_answer: String(newEx.correct_answer ?? newEx.answer ?? '1'),
      explanation: newEx.explanation || '',
      visual_emoji: newEx.visual?.label || newEx.visual_emoji || '🍎',
      visual_count: newEx.visual?.count || newEx.visual_count || 1,
      image: newEx.image || '',
      pairs: newEx.pairs ? [...newEx.pairs] : [{ left: '🍎', right: '1' }]
    }

    optionsList.value = Array.isArray(form.value.options) ? [...form.value.options] : []
    pairsList.value = form.value.pairs ? [...form.value.pairs] : []

    // Locate category of active type
    const match = allTypes.find(t => t.id === form.value.type)
    if (match) {
      activeCategory.value = match.category
    }
  } else {
    form.value = defaultForm()
    optionsList.value = [...form.value.options]
    pairsList.value = [...form.value.pairs]
  }
}, { immediate: true, deep: true })

const closeModal = () => {
  emit('close')
}

const buildPayload = () => {
  const copy = { ...form.value }
  
  // Format visual object
  if (copy.visual_emoji) {
    copy.visual = {
      type: 'objects',
      label: copy.visual_emoji,
      count: copy.visual_count || 1
    }
  }

  // Ensure options is array
  if (typeof copy.options === 'string') {
    copy.options = copy.options.split(',').map(s => s.trim()).filter(Boolean)
  }

  return copy
}

const triggerPreview = () => {
  emit('preview', buildPayload())
}

const saveExercise = () => {
  if (!form.value.question.trim()) {
    alert('Harap isi teks pertanyaan kuis!')
    return
  }
  emit('save', buildPayload())
}
</script>
