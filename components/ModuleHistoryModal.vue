<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border-2 border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-pop"
      >
        <!-- Modal Top Bar -->
        <div class="px-6 py-4 sm:px-8 sm:py-5 bg-slate-800 text-white flex items-center justify-between gap-4 shrink-0 relative overflow-hidden">
          <div class="flex items-center gap-3 min-w-0 z-10">
            <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shrink-0">
              {{ currentCourse?.icon || '📖' }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full text-[10px] font-heading font-extrabold uppercase tracking-wider">
                  Evaluasi Jawaban Modul
                </span>
                <span class="text-xs text-slate-400 font-heading">
                  {{ currentCourse?.target_audience || 'Petualangan Belajar' }}
                </span>
              </div>
              <h2 class="text-lg sm:text-xl font-heading font-black text-white truncate">
                {{ currentCourse?.title || 'Histori Pengerjaan Modul' }}
              </h2>
            </div>
          </div>

          <!-- Quick Course Switcher Dropdown & Close Button -->
          <div class="flex items-center gap-2 z-10 shrink-0">
            <div v-if="allCourses.length > 1" class="hidden sm:block">
              <select
                :value="selectedCourseId"
                @change="onCourseChange($event.target.value)"
                class="px-3 py-1.5 rounded-xl bg-slate-700/80 border border-slate-600 text-white font-heading font-bold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                <option v-for="c in allCourses" :key="c.id" :value="c.id">
                  {{ c.icon }} {{ c.title }}
                </option>
              </select>
            </div>

            <button
              @click="handleClose"
              class="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer text-lg font-black"
              title="Tutup Modal"
            >
              ✕
            </button>
          </div>

          <!-- Decorative glow -->
          <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-indigo-600/30 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Mobile Course Switcher -->
        <div v-if="allCourses.length > 1" class="sm:hidden px-4 py-2 bg-slate-100 border-b border-slate-200">
          <label class="text-[10px] font-heading font-bold text-slate-500 uppercase block mb-1">Ganti Modul Belajar:</label>
          <select
            :value="selectedCourseId"
            @change="onCourseChange($event.target.value)"
            class="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-heading font-bold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option v-for="c in allCourses" :key="c.id" :value="c.id">
              {{ c.icon }} {{ c.title }}
            </option>
          </select>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          <!-- 1. Quick KPI Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <span class="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-wider block">Total Soal</span>
              <p class="text-xl sm:text-2xl font-heading font-black text-slate-800">{{ stats.total }}</p>
              <span class="text-[10px] font-heading text-slate-500 font-semibold">Terekam di sistem</span>
            </div>

            <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
              <span class="text-[10px] font-heading font-bold text-emerald-600 uppercase tracking-wider block">Jawaban Benar</span>
              <p class="text-xl sm:text-2xl font-heading font-black text-emerald-700">
                {{ stats.correct }}
                <span class="text-xs font-bold text-emerald-600">({{ stats.accuracy }}%)</span>
              </p>
              <span class="text-[10px] font-heading text-emerald-600 font-semibold">Berhasil dijawab</span>
            </div>

            <div class="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl">
              <span class="text-[10px] font-heading font-bold text-rose-600 uppercase tracking-wider block">Kurang Tepat</span>
              <p class="text-xl sm:text-2xl font-heading font-black text-rose-700">{{ stats.wrong }}</p>
              <span class="text-[10px] font-heading text-rose-600 font-semibold">Perlu pendampingan</span>
            </div>

            <div class="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl">
              <span class="text-[10px] font-heading font-bold text-indigo-600 uppercase tracking-wider block">Penguasaan</span>
              <p class="text-sm sm:text-base font-heading font-black text-indigo-900 mt-1">
                {{ masteryStatus }}
              </p>
              <span class="text-[10px] font-heading text-indigo-600 font-semibold">{{ stats.accuracy >= 80 ? 'Pertahankan! ⭐' : 'Bimbing lagi ya 👍' }}</span>
            </div>
          </div>

          <!-- 2. Filters Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <!-- Status Tabs -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <button
                @click="statusFilter = 'all'"
                class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer"
                :class="statusFilter === 'all' ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'"
              >
                Semua ({{ items.length }})
              </button>
              <button
                @click="statusFilter = 'wrong'"
                class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
                :class="statusFilter === 'wrong' ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-rose-700 hover:bg-rose-100 border border-rose-200'"
              >
                <span>❌ Salah / Butuh Diulang</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px]" :class="statusFilter === 'wrong' ? 'bg-white/20' : 'bg-rose-100'">
                  {{ stats.wrong }}
                </span>
              </button>
              <button
                @click="statusFilter = 'correct'"
                class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
                :class="statusFilter === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200'"
              >
                <span>✅ Benar</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px]" :class="statusFilter === 'correct' ? 'bg-white/20' : 'bg-emerald-100'">
                  {{ stats.correct }}
                </span>
              </button>
            </div>

            <!-- Lesson Filter Dropdown -->
            <div v-if="lessonOptions.length > 1" class="flex items-center gap-2">
              <span class="text-xs font-heading font-bold text-slate-500 shrink-0">Pelajaran:</span>
              <select
                v-model="selectedLessonFilter"
                class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-heading font-bold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                <option value="all">Semua Pelajaran</option>
                <option v-for="opt in lessonOptions" :key="opt.id" :value="opt.id">
                  {{ opt.title }}
                </option>
              </select>
            </div>
          </div>

          <!-- 3. Empty State -->
          <div v-if="filteredItems.length === 0" class="text-center py-12 px-4 space-y-3 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <span class="text-4xl block">🔍</span>
            <h3 class="font-heading font-black text-base text-slate-700">
              {{ statusFilter === 'wrong' ? 'Tidak Ada Jawaban Salah! 🎉' : 'Belum Ada Riwayat Pengerjaan' }}
            </h3>
            <p class="text-xs text-slate-500 font-heading max-w-md mx-auto leading-relaxed">
              {{ statusFilter === 'wrong'
                ? 'Hebat! Ananda menjawab semua soal yang dikerjakan dengan benar di modul ini.'
                : 'Ananda belum mengerjakan soal di modul ini, atau filter yang dipilih tidak memiliki rekaman jawaban.' }}
            </p>
            <div v-if="statusFilter === 'all'" class="pt-2">
              <NuxtLink
                :to="`/course?id=${selectedCourseId}`"
                @click="handleClose"
                class="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#58cc02] hover:bg-[#46a302] text-white rounded-xl font-heading font-black text-xs shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <span>🚀</span>
                <span>Mulai Belajar Modul Ini</span>
              </NuxtLink>
            </div>
            <div v-else>
              <button
                @click="statusFilter = 'all'; selectedLessonFilter = 'all'"
                class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-heading font-bold text-xs transition-colors cursor-pointer"
              >
                Tampilkan Semua Soal
              </button>
            </div>
          </div>

          <!-- 4. Questions & Answers Feed -->
          <div v-else class="space-y-4">
            <div
              v-for="(item, index) in filteredItems"
              :key="item.id || `${item.exerciseId}_${index}`"
              class="p-4 sm:p-5 rounded-3xl border-2 transition-all hover:shadow-md space-y-3.5 bg-white"
              :class="item.isCorrect ? 'border-emerald-200 shadow-xs' : 'border-rose-200 shadow-xs'"
            >
              <!-- Item Header Bar -->
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div class="flex items-center gap-2 flex-wrap">
                  <!-- Lesson Tag -->
                  <span class="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-heading font-extrabold flex items-center gap-1">
                    <span>📚</span>
                    <span>{{ item.lessonTitle || 'Latihan' }}</span>
                  </span>

                  <!-- Exercise Type Badge -->
                  <span class="px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-md text-[10px] font-heading font-bold">
                    {{ getExerciseTypeLabel(item.exerciseType) }}
                  </span>

                  <!-- Synthetic completed badge if replayed -->
                  <span v-if="item.isCompletedReplay" class="px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-md text-[10px] font-heading font-bold">
                    ✨ Pelajaran Tuntas
                  </span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <!-- Relative Time -->
                  <span class="text-[11px] font-heading font-bold text-slate-400">
                    {{ formatTimestamp(item.answeredAt) }}
                  </span>

                  <!-- Status Pill -->
                  <span
                    class="px-2.5 py-1 rounded-full text-xs font-heading font-black flex items-center gap-1 shadow-2xs"
                    :class="item.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'"
                  >
                    <span>{{ item.isCorrect ? '✓' : '✗' }}</span>
                    <span>{{ item.isCorrect ? 'Benar' : 'Kurang Tepat' }}</span>
                  </span>
                </div>
              </div>

              <!-- Question Prompt -->
              <div class="space-y-1">
                <span class="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-wider block">
                  Soal #{{ index + 1 }}
                </span>
                <p class="text-sm sm:text-base font-heading font-extrabold text-slate-800 leading-snug">
                  {{ item.question }}
                </p>
              </div>

              <!-- Answers Comparison Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <!-- Child's Answer Box -->
                <div
                  class="p-3.5 rounded-2xl border-2 space-y-1"
                  :class="item.isCorrect ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-rose-50/70 border-rose-300 text-rose-950'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-heading font-black uppercase tracking-wider flex items-center gap-1">
                      <span>👦</span>
                      <span>Jawaban Anak:</span>
                    </span>
                    <span class="text-sm font-black">{{ item.isCorrect ? '✅' : '❌' }}</span>
                  </div>
                  <p class="font-heading font-black text-sm sm:text-base break-words">
                    {{ item.userAnswer || '(Tidak ada jawaban)' }}
                  </p>
                </div>

                <!-- Correct Answer Box -->
                <div class="p-3.5 rounded-2xl border-2 bg-emerald-50/30 border-emerald-400 text-emerald-950 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-heading font-black uppercase tracking-wider flex items-center gap-1 text-emerald-800">
                      <span>🎯</span>
                      <span>Kunci Jawaban Benar:</span>
                    </span>
                    <span class="text-sm font-black text-emerald-600">✓</span>
                  </div>
                  <p class="font-heading font-black text-sm sm:text-base text-emerald-900 break-words">
                    {{ item.correctAnswer }}
                  </p>
                </div>
              </div>

              <!-- Explanation / Discussion Box -->
              <div v-if="item.explanation" class="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-950 font-heading">
                <span class="text-base shrink-0">🦉</span>
                <div class="space-y-0.5 min-w-0">
                  <span class="font-black text-indigo-900 block text-[11px]">Pembahasan Kiko:</span>
                  <p class="text-indigo-900/90 leading-relaxed">{{ item.explanation }}</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Modal Bottom Footer -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p class="text-xs font-heading font-semibold text-slate-500 text-center sm:text-left">
            💡 <strong>Tips Orang Tua:</strong> Dampingi anak pada soal yang kurang tepat dengan memberi contoh menggunakan benda konkret di rumah.
          </p>
          <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              @click="handleClose"
              class="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-heading font-black text-xs rounded-xl transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <NuxtLink
              :to="`/course?id=${selectedCourseId}`"
              @click="handleClose"
              class="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>🎮</span>
              <span>Latihan Modul Ini</span>
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  courseId: {
    type: String,
    default: 'counting_101'
  }
})

const emit = defineEmits(['close', 'selectCourse'])

const userStore = useUserStore()
const courseStore = useCourseStore()

const selectedCourseId = ref(props.courseId || 'counting_101')
const statusFilter = ref('all') // 'all' | 'wrong' | 'correct'
const selectedLessonFilter = ref('all')

watch(() => props.courseId, (newId) => {
  if (newId) {
    selectedCourseId.value = newId
    loadCourseDetails(newId)
  }
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    statusFilter.value = 'all'
    selectedLessonFilter.value = 'all'
    if (selectedCourseId.value) {
      loadCourseDetails(selectedCourseId.value)
    }
  }
})

const allCourses = computed(() => {
  const attempted = (courseStore.catalogRegistry || []).filter(c => {
    const hasCompletedLessons = (userStore.completedLessonsByCourse?.[c.id] || []).length > 0
    const hasCompletedCheckpoints = (userStore.completedCheckpointsByCourse?.[c.id] || []).length > 0
    const hasRecordedAttempts = (userStore.exerciseHistory || []).some(h => h.courseId === c.id)
    return hasCompletedLessons || hasCompletedCheckpoints || hasRecordedAttempts
  })
  return attempted.length > 0 ? attempted : (courseStore.catalogRegistry || [])
})

const currentCourse = computed(() => {
  return courseStore.catalogRegistry.find(c => c.id === selectedCourseId.value) || {
    id: selectedCourseId.value,
    title: 'Modul Belajar',
    icon: '📖',
    target_audience: 'Umum'
  }
})

const loadCourseDetails = async (cId) => {
  if (!cId) return
  if (!courseStore.courses[cId]) {
    try {
      await courseStore.fetchCourseById(cId)
    } catch (e) {
      console.warn('Failed to load course details for modal:', e)
    }
  }
}

onMounted(async () => {
  if (courseStore.catalogRegistry.length === 0) {
    await courseStore.fetchCoursesFromApi(true)
  }
  if (selectedCourseId.value) {
    await loadCourseDetails(selectedCourseId.value)
  }
})

const onCourseChange = (newCourseId) => {
  selectedCourseId.value = newCourseId
  selectedLessonFilter.value = 'all'
  loadCourseDetails(newCourseId)
  emit('selectCourse', newCourseId)
}

const handleClose = () => {
  emit('close')
}

// ─── Lesson Filter Options ───────────────────────────────────────────────────
const lessonOptions = computed(() => {
  const cData = courseStore.courses[selectedCourseId.value]
  if (!cData || !Array.isArray(cData.units)) return []

  const list = []
  cData.units.forEach(unit => {
    if (Array.isArray(unit.lessons)) {
      unit.lessons.forEach(lesson => {
        list.push({
          id: lesson.id,
          title: `${unit.title ? unit.title + ': ' : ''}${lesson.title}`
        })
      })
    }
    if (unit.checkpoint) {
      list.push({
        id: unit.checkpoint.id,
        title: `🏆 ${unit.checkpoint.title}`
      })
    }
  })
  return list
})

// ─── Combined Items (Live Attempts + Completed Lesson Fallback) ─────────────
const items = computed(() => {
  const cId = selectedCourseId.value
  const recorded = (userStore.exerciseHistory || []).filter(h => h.courseId === cId)

  // If there are recorded attempts, return them (newest first)
  if (recorded.length > 0) {
    return recorded
  }

  // Fallback: If user has completed lessons in this course but no live granular history was saved yet,
  // reconstruct exercise entries from the course definition so parent can see questions & answers.
  const completedLessonIds = userStore.completedLessonsByCourse?.[cId] || []
  const cData = courseStore.courses[cId]
  if (completedLessonIds.length > 0 && cData && Array.isArray(cData.units)) {
    const fallbackList = []
    cData.units.forEach(unit => {
      if (Array.isArray(unit.lessons)) {
        unit.lessons.forEach(lesson => {
          if (completedLessonIds.includes(lesson.id) && Array.isArray(lesson.exercises)) {
            lesson.exercises.forEach(ex => {
              fallbackList.push({
                id: `fallback_${lesson.id}_${ex.id}`,
                courseId: cId,
                courseTitle: cData.title,
                unitId: unit.id,
                unitTitle: unit.title,
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                exerciseId: ex.id,
                exerciseType: ex.type,
                question: ex.question || 'Pertanyaan Latihan',
                userAnswer: formatDisplayAnswer(ex),
                correctAnswer: formatDisplayAnswer(ex),
                isCorrect: true,
                explanation: ex.explanation || '',
                answeredAt: null,
                isCompletedReplay: true
              })
            })
          }
        })
      }
    })
    return fallbackList
  }

  return []
})

const formatDisplayAnswer = (ex) => {
  if (ex.type === 'matching' || ex.type === 'category_sorting' || ex.type === 'drag_to_sort') {
    return ex.correct_answer.replace(/::/g, ' ➔ ').replace(/\|/g, ', ')
  }
  if (ex.type === 'sequence_ordering') {
    return ex.correct_answer.split(',').join(' ➔ ')
  }
  if (ex.type === 'true_false' || ex.type === 'true_false_image') {
    return ex.correct_answer.toLowerCase() === 'true' ? 'Benar' : (ex.correct_answer.toLowerCase() === 'false' ? 'Salah' : ex.correct_answer)
  }
  return ex.correct_answer || '-'
}

// ─── Filtered Items ──────────────────────────────────────────────────────────
const filteredItems = computed(() => {
  return items.value.filter(item => {
    // Status Filter
    if (statusFilter.value === 'wrong' && item.isCorrect) return false
    if (statusFilter.value === 'correct' && !item.isCorrect) return false

    // Lesson Filter
    if (selectedLessonFilter.value !== 'all' && item.lessonId !== selectedLessonFilter.value) return false

    return true
  })
})

// ─── Statistics ──────────────────────────────────────────────────────────────
const stats = computed(() => {
  const list = items.value
  const total = list.length
  const correct = list.filter(i => i.isCorrect).length
  const wrong = total - correct
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  return { total, correct, wrong, accuracy }
})

const masteryStatus = computed(() => {
  if (stats.value.total === 0) return 'Belum Ada Data'
  if (stats.value.accuracy >= 90) return '🌟 Mahir & Menguasai'
  if (stats.value.accuracy >= 75) return '👍 Baik / Berkembang'
  if (stats.value.accuracy >= 50) return '🟡 Cukup Baik'
  return '⚠️ Butuh Pendampingan'
})

// ─── Format Helpers ──────────────────────────────────────────────────────────
const getExerciseTypeLabel = (type) => {
  const map = {
    'multiple_choice': 'Pilihan Ganda',
    'true_false': 'Benar / Salah',
    'fill_in_blank': 'Isi Titik-Titik',
    'fill_missing_number': 'Angka Hilang',
    'matching': 'Mencocokkan Pasangan',
    'drag_and_drop': 'Seret & Lepas',
    'sequence_ordering': 'Urutan Barisan',
    'pattern_matching': 'Pola Logika',
    'odd_one_out': 'Temukan yang Berbeda',
    'memory_flip': 'Kartu Memori',
    'seek_find': 'Cari & Temukan',
    'category_sorting': 'Kelompokkan Kategori',
    'drag_to_sort': 'Seret Kategori',
    'word_building': 'Susun Kata',
    'reading': 'Membaca Nyaring',
    'time_reading': 'Membaca Jam',
    'balance_scale': 'Timbangan'
  }
  return map[type] || 'Latihan'
}

const formatTimestamp = (isoDate) => {
  if (!isoDate) return 'Tercatat Selesai'
  try {
    const d = new Date(isoDate)
    const now = new Date()
    const diffMinutes = Math.floor((now - d) / 1000 / 60)

    if (diffMinutes < 1) return 'Baru saja'
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} jam lalu`
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}
</script>
