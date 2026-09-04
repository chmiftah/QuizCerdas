<template>
  <div class="space-y-12 py-4">
    <!-- Empty / Loading State -->
    <div v-if="courseStore.units.length === 0" class="bg-white rounded-3xl p-8 text-center border-4 border-dashed border-slate-300 space-y-4 shadow-sm animate-pop">
      <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto border-2 border-slate-200">
        🗺️
      </div>
      <div class="space-y-1 max-w-sm mx-auto">
        <h3 class="font-heading text-xl font-black text-slate-800">Sedang Memuat Peta Belajar...</h3>
        <p class="text-xs text-slate-500 font-body leading-relaxed">
          Mohon tunggu sebentar, data modul pembelajaran sedang disinkronkan.
        </p>
      </div>
    </div>

    <!-- Unit Chapters Loop -->
    <div 
      v-else
      v-for="(unit, unitIdx) in courseStore.units" 
      :key="unit.id"
      class="rounded-[32px] border-4 p-5 sm:p-7 shadow-2xl relative space-y-8 transition-all duration-300 overflow-visible"
      :class="getUnitContainerTheme(unit.color)"
    >
      <!-- Vibrant Biome Header Banner -->
      <div 
        class="rounded-2xl p-5 sm:p-6 text-white relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border-b-4 border-black/15 z-10 overflow-hidden"
        :class="getUnitHeaderTheme(unit.color)"
      >
        <!-- Decorative Ambient Light Blobs -->
        <div class="absolute -right-8 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -left-8 -top-10 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

        <div class="space-y-1.5 z-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-heading font-black uppercase tracking-wider backdrop-blur-md border border-white/25 shadow-2xs">
            <span>{{ getUnitBiomeIcon(unit.color) }}</span>
            <span>UNIT {{ unit.order }} • {{ getUnitBiomeName(unit.color) }}</span>
          </div>
          <h2 class="font-heading text-2xl sm:text-3xl font-black tracking-tight text-shadow-sm drop-shadow-md">
            {{ unit.title }}
          </h2>
          <p class="text-white/95 text-xs sm:text-sm font-body max-w-xl leading-relaxed drop-shadow-xs">
            {{ getUnitSummary(unit) }}
          </p>
        </div>

        <!-- Unit Completion Progress Badge -->
        <div class="bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/30 font-heading text-xs font-bold text-center shrink-0 space-y-1.5 w-full sm:w-auto z-10 shadow-md">
          <div class="flex items-center justify-center gap-1.5 text-amber-300 font-extrabold text-sm drop-shadow-xs">
            <Trophy class="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
            <span>{{ getUnitProgressPercent(unit) }}% Selesai</span>
          </div>
          <div class="w-full bg-black/30 h-3 rounded-full overflow-hidden p-0.5 min-w-[130px] border border-white/20">
            <div 
              class="h-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
              :style="{ width: `${getUnitProgressPercent(unit)}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Winding 3D Map Path Container -->
      <div 
        class="relative w-full max-w-md mx-auto py-6"
        :style="{ height: `${getUnitContainerHeight(unit)}px` }"
      >
        <!-- Dynamic SVG Winding Curved Trail -->
        <svg 
          class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          :viewBox="`0 0 400 ${getUnitContainerHeight(unit)}`"
        >
          <!-- Outer Shadow Track -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#64748b" 
            stroke-width="28" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            opacity="0.25"
          />
          <!-- Track Outer Border -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#cbd5e1" 
            stroke-width="22" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
          <!-- Track Vibrant Core -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            :stroke="getUnitTrailColor(unit.color)" 
            stroke-width="14" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
          <!-- Track Inner Dashed Guide Line -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#ffffff" 
            stroke-width="4" 
            stroke-dasharray="8 8"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            opacity="0.9"
          />
        </svg>

        <!-- Rich Biome Decorative Floating Scenery Elements -->
        <template v-if="unit.color === 'emerald'">
          <div class="absolute top-6 left-2 text-3xl animate-float pointer-events-none z-0">🌲</div>
          <div class="absolute top-28 right-4 text-2xl animate-bounce pointer-events-none z-0">🦊</div>
          <div class="absolute top-60 left-4 text-2xl pointer-events-none z-0">🍄</div>
          <div class="absolute bottom-24 right-2 text-3xl animate-float pointer-events-none z-0" style="animation-delay: 1.5s;">🌳</div>
        </template>
        
        <template v-else-if="unit.color === 'sky' || unit.color === 'blue'">
          <div class="absolute top-8 right-2 text-3xl animate-float pointer-events-none z-0">☁️</div>
          <div class="absolute top-36 left-2 text-2xl animate-float pointer-events-none z-0" style="animation-delay: 1s;">🕊️</div>
          <div class="absolute top-64 right-4 text-3xl pointer-events-none z-0">🎈</div>
          <div class="absolute bottom-28 left-3 text-2xl animate-bounce pointer-events-none z-0">🌈</div>
        </template>

        <template v-else-if="unit.color === 'amber'">
          <div class="absolute top-10 left-3 text-3xl animate-float pointer-events-none z-0">🌻</div>
          <div class="absolute top-32 right-3 text-3xl animate-pulse pointer-events-none z-0">🏰</div>
          <div class="absolute top-64 left-2 text-2xl pointer-events-none z-0">🦁</div>
          <div class="absolute bottom-20 right-4 text-3xl animate-float pointer-events-none z-0">✨</div>
        </template>

        <template v-else-if="unit.color === 'rose'">
          <div class="absolute top-8 right-3 text-3xl animate-float pointer-events-none z-0">🧁</div>
          <div class="absolute top-36 left-2 text-3xl animate-bounce pointer-events-none z-0">🌸</div>
          <div class="absolute top-60 right-2 text-2xl pointer-events-none z-0">🍬</div>
          <div class="absolute bottom-24 left-4 text-3xl animate-float pointer-events-none z-0">⭐</div>
        </template>

        <!-- Node Items Loop -->
        <div 
          v-for="(item, itemIdx) in getUnitNodeItems(unit)" 
          :key="item.id"
          class="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
          :style="{ left: `${item.x}px`, top: `${item.y}px` }"
        >
          <!-- Kiko Mascot Standing on Active Next Node -->
          <div 
            v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
            class="absolute -top-20 z-30 flex flex-col items-center pointer-events-none animate-bounce"
          >
            <div class="bg-white/95 backdrop-blur-md border-2 border-duo-green px-3 py-1 rounded-2xl shadow-lg text-[10px] font-heading font-black text-slate-800 whitespace-nowrap mb-1 flex items-center gap-1">
              <span>🦉</span>
              <span>Lanjut di sini!</span>
            </div>
            <KikoAvatar size="sm" />
          </div>

          <!-- Interactive Floating Popover Bubble Card -->
          <Transition name="bounce-popover">
            <div 
              v-if="selectedNodeId === item.id"
              @click.outside="selectedNodeId = null"
              class="absolute -top-40 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-5 w-72 shadow-2xl border-4 space-y-3.5 text-center animate-pop"
              :class="item.type === 'checkpoint' ? 'border-amber-400 bg-amber-950/95' : 'border-emerald-400 bg-slate-900/95'"
            >
              <!-- Arrow pointer -->
              <div 
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
                :class="item.type === 'checkpoint' ? 'border-t-amber-950' : 'border-t-slate-900'"
              ></div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-center gap-1.5">
                  <span 
                    class="px-3 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wide shadow-2xs"
                    :class="item.type === 'checkpoint' ? 'bg-amber-400 text-amber-950' : 'bg-emerald-400 text-slate-900'"
                  >
                    {{ item.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : `🎯 PELAJARAN ${itemIdx + 1}` }}
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-extrabold bg-white/20 text-white border border-white/20">
                    {{ item.type === 'checkpoint' ? '+50 XP' : '+20 XP' }}
                  </span>
                </div>

                <h4 class="font-heading text-base font-black text-white leading-snug">
                  {{ item.title }}
                </h4>
                
                <p class="text-xs font-body leading-relaxed" :class="item.type === 'checkpoint' ? 'text-amber-200' : 'text-slate-300'">
                  {{ item.type === 'checkpoint' ? 'Buktikan penguasaan materimu di tantangan akhir unit ini!' : 'Kuis interaktif berhitung seru bergaya Duolingo.' }}
                </p>
              </div>

              <button 
                @click="confirmStartNode(unit.id, item.id, item.type)"
                class="w-full py-3 text-xs font-heading font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-transform"
                :class="item.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
              >
                <span>{{ item.type === 'checkpoint' ? '👑 BUKTIKAN KEMAMPUAN' : '🚀 MULAI BELAJAR' }}</span>
              </button>
            </div>
          </Transition>

          <!-- 3D Tactile Node Button Container -->
          <div class="relative flex items-center justify-center">
            <!-- Cobblestone Base Under Node -->
            <div class="absolute -bottom-2 w-20 h-6 bg-black/15 rounded-full blur-xs pointer-events-none"></div>

            <!-- Lesson Number Badge -->
            <div 
              v-if="item.type === 'lesson' && isLessonUnlocked(unit.id, item.id) && !isLessonCompleted(item.id)" 
              class="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 bg-white border-2 border-slate-300 rounded-full shadow-md text-slate-800 font-heading font-black text-[11px] flex items-center gap-1 whitespace-nowrap"
            >
              <span>Pel.</span>
              <span class="text-duo-green font-black">{{ itemIdx + 1 }}</span>
            </div>

            <!-- Checkpoint Finish Flag Banner Badge -->
            <div 
              v-else-if="item.type === 'checkpoint'"
              class="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 bg-amber-400 text-amber-950 border-2 border-amber-600 rounded-full shadow-lg font-heading font-black text-[11px] flex items-center gap-1 whitespace-nowrap uppercase animate-bounce"
            >
              <span>👑 FINISH UNIT {{ unit.order }}</span>
            </div>

            <!-- Main Bouncy 3D Button Node -->
            <button 
              @click="onNodeTap(unit.id, item.id, item.type)"
              class="flex items-center justify-center font-heading transition-all duration-200 select-none shadow-2xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8"
              :class="[
                item.type === 'checkpoint' ? 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-b-[10px]' : 'w-20 h-20 sm:w-24 sm:h-24 rounded-full',
                getNodeClass(unit.id, item.id, item.type, unit.color)
              ]"
            >
              <!-- Checkmark if completed -->
              <div v-if="isNodeCompleted(unit.id, item.id, item.type)" class="flex flex-col items-center">
                <Check class="w-10 h-10 sm:w-11 sm:h-11 text-white stroke-[4] drop-shadow-md" />
              </div>
              
              <!-- Crown if Checkpoint active -->
              <div v-else-if="item.type === 'checkpoint' && isCheckpointUnlocked(unit.id)" class="flex flex-col items-center">
                <Crown class="w-12 h-12 sm:w-14 sm:h-14 text-amber-900 fill-amber-300 animate-pulse drop-shadow-md" />
              </div>
              
              <!-- Star if Lesson unlocked -->
              <div v-else-if="isLessonUnlocked(unit.id, item.id)" class="flex flex-col items-center">
                <Star class="w-10 h-10 sm:w-11 sm:h-11 text-white fill-white drop-shadow-md" />
              </div>
              
              <!-- Lock icon if locked -->
              <div v-else class="flex flex-col items-center">
                <Lock class="w-8 h-8 sm:w-9 sm:h-9 text-slate-400" />
              </div>

              <!-- Outer Glowing Ripple Ring on Next Active Lesson -->
              <div 
                v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
                class="absolute -inset-3 rounded-full border-4 border-emerald-400 animate-ping pointer-events-none opacity-75"
              ></div>
            </button>
          </div>

          <!-- Clean Centered Title Badge Below Node -->
          <div 
            @click="onNodeTap(unit.id, item.id, item.type)"
            class="mt-3 text-center bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-2xl border-2 border-slate-200/90 shadow-md max-w-[170px] cursor-pointer hover:border-duo-blue hover:scale-105 transition-all"
          >
            <span class="font-heading font-black text-xs text-slate-800 block truncate">
              {{ item.title }}
            </span>
          </div>

        </div>
      </div>
    </div>

    <!-- Auth Prompt Modal Popup -->
    <Teleport to="body">
      <div v-if="showAuthModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl border-4 border-duo-blue animate-pop relative">
          <div class="w-20 h-20 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-4xl shadow-md border-2 border-amber-300">
            🔐
          </div>
          
          <div class="space-y-2">
            <h3 class="font-heading text-2xl font-black text-slate-800">
              Wajib Login Terlebih Dahulu!
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm font-body leading-relaxed">
              Kamu bisa melihat alur pelajaran ini, namun untuk <span class="font-bold text-duo-blue">mulai mengerjakan soal kuis</span> dan mengumpulkan XP, kamu harus masuk ke akunmu terlebih dahulu.
            </p>
          </div>

          <div class="space-y-2.5 pt-2">
            <NuxtLink 
              :to="`/login?redirect=${encodeURIComponent(pendingTargetUrl)}&reason=auth_required`"
              class="w-full duo-btn-blue py-3.5 text-base flex items-center justify-center gap-2 font-heading font-black"
            >
              <span>🔑 Masuk ke Akun Saya</span>
            </NuxtLink>

            <NuxtLink 
              to="/register"
              class="w-full duo-btn-green py-3 text-sm flex items-center justify-center gap-2 font-heading font-black"
            >
              <span>🚀 Daftar Akun Baru (Gratis)</span>
            </NuxtLink>

            <button 
              @click="showAuthModal = false"
              class="w-full py-2.5 text-xs font-heading font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Tutup & Lanjut Jelajah Peta
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCourseStore } from '~/stores/course'
import { useUserStore } from '~/stores/user'
import { Check, Star, Lock, Trophy, Crown } from 'lucide-vue-next'

const courseStore = useCourseStore()
const userStore = useUserStore()

const showAuthModal = ref(false)
const pendingTargetUrl = ref('')
const selectedNodeId = ref(null)

const activeCourseId = computed(() => courseStore.activeCourseId)

const currentCompletedLessons = computed(() => {
  return userStore.getCompletedLessonsForCourse(activeCourseId.value)
})

const currentCompletedCheckpoints = computed(() => {
  return userStore.getCompletedCheckpointsForCourse(activeCourseId.value)
})

// Calculate list of items (lessons + checkpoint) with safe (X, Y) coordinates on 400px canvas
const getUnitNodeItems = (unit) => {
  const items = []
  const baseWidth = 400
  const startY = 85
  const ySpacing = 150
  // Safe wave amplitude [-70px, +70px] centered at 200px
  const waveOffsets = [-70, 70, -70, 70]

  unit.lessons.forEach((lesson, index) => {
    const offset = waveOffsets[index % waveOffsets.length]
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      x: (baseWidth / 2) + offset,
      y: startY + (index * ySpacing)
    })
  })

  // Add Checkpoint at the end of path
  const lastIdx = unit.lessons.length
  const lastOffset = waveOffsets[lastIdx % waveOffsets.length]
  items.push({
    id: unit.checkpoint?.id || `checkpoint_${unit.id}`,
    title: unit.checkpoint?.title || `Checkpoint Unit ${unit.order}`,
    type: 'checkpoint',
    x: (baseWidth / 2) + lastOffset,
    y: startY + (lastIdx * ySpacing)
  })

  return items
}

const getUnitContainerHeight = (unit) => {
  const totalCount = unit.lessons.length + 1 // lessons + checkpoint
  return 85 + ((totalCount - 1) * 150) + 120 // exact height ending at Checkpoint center
}

// Generate smooth cubic bezier SVG path string passing through all node points
const getUnitSvgPath = (unit) => {
  const items = getUnitNodeItems(unit)
  if (items.length === 0) return ''

  let d = `M ${items[0].x} ${items[0].y}`
  for (let i = 0; i < items.length - 1; i++) {
    const current = items[i]
    const next = items[i + 1]
    const midY = (current.y + next.y) / 2
    d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`
  }

  return d
}

const onNodeTap = (unitId, itemId, type) => {
  const isUnlocked = type === 'checkpoint'
    ? isCheckpointUnlocked(unitId)
    : isLessonUnlocked(unitId, itemId)

  if (!isUnlocked) return

  if (selectedNodeId.value === itemId) {
    confirmStartNode(unitId, itemId, type)
  } else {
    selectedNodeId.value = itemId
  }
}

const confirmStartNode = (unitId, itemId, type) => {
  const targetPath = type === 'checkpoint' 
    ? `/course/${unitId}/checkpoint` 
    : `/course/${unitId}/${itemId}`

  if (!userStore.isAuthenticated) {
    pendingTargetUrl.value = targetPath
    showAuthModal.value = true
    return
  }

  selectedNodeId.value = null
  navigateTo(targetPath)
}

const isLessonUnlocked = (unitId, lessonId) => {
  return courseStore.isLessonUnlocked(unitId, lessonId, currentCompletedLessons.value, currentCompletedCheckpoints.value)
}

const isLessonCompleted = (lessonId) => {
  return userStore.isLessonCompleted(lessonId, activeCourseId.value)
}

const isCheckpointUnlocked = (unitId) => {
  return courseStore.isCheckpointUnlocked(unitId, currentCompletedLessons.value)
}

const isCheckpointCompleted = (checkpointId) => {
  return userStore.isCheckpointCompleted(checkpointId, activeCourseId.value)
}

const isNodeCompleted = (unitId, itemId, type) => {
  return type === 'checkpoint' 
    ? isCheckpointCompleted(itemId)
    : isLessonCompleted(itemId)
}

const isNextActiveLesson = (unitId, lessonId) => {
  return isLessonUnlocked(unitId, lessonId) && !isLessonCompleted(lessonId)
}

const getUnitContainerTheme = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-b from-emerald-50/90 via-teal-50/60 to-emerald-100/40 border-emerald-300/80'
    case 'sky': return 'bg-gradient-to-b from-sky-50/90 via-blue-50/60 to-indigo-100/40 border-sky-300/80'
    case 'amber': return 'bg-gradient-to-b from-amber-50/90 via-orange-50/60 to-yellow-100/40 border-amber-300/80'
    case 'rose': return 'bg-gradient-to-b from-rose-50/90 via-pink-50/60 to-purple-100/40 border-rose-300/80'
    default: return 'bg-gradient-to-b from-emerald-50/90 via-teal-50/60 to-emerald-100/40 border-emerald-300/80'
  }
}

const getUnitHeaderTheme = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-700'
    case 'sky': return 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 border-sky-600'
    case 'amber': return 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 border-amber-600'
    case 'rose': return 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 border-rose-600'
    default: return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-700'
  }
}

const getUnitBiomeIcon = (color) => {
  switch (color) {
    case 'emerald': return '🌲'
    case 'sky': return '☁️'
    case 'amber': return '🏰'
    case 'rose': return '🧁'
    default: return '🌴'
  }
}

const getUnitBiomeName = (color) => {
  switch (color) {
    case 'emerald': return 'LEMBAH HIJAU'
    case 'sky': return 'KERAJAN AWAN'
    case 'amber': return 'ISTANA MATAHARI'
    case 'rose': return 'NEGERI MANIS'
    default: return 'PETUALANGAN'
  }
}

const getUnitTrailColor = (color) => {
  switch (color) {
    case 'emerald': return '#10b981'
    case 'sky': return '#0284c7'
    case 'amber': return '#f59e0b'
    case 'rose': return '#e11d48'
    default: return '#10b981'
  }
}

const getUnitSummary = (unit) => {
  return unit.lessons.map(l => l.title).join(' • ')
}

const getUnitProgressPercent = (unit) => {
  const total = unit.lessons.length
  const completed = unit.lessons.filter(l => isLessonCompleted(l.id)).length
  return Math.round((completed / total) * 100)
}

const getNodeClass = (unitId, itemId, type, color) => {
  const unlocked = type === 'checkpoint' ? isCheckpointUnlocked(unitId) : isLessonUnlocked(unitId, itemId)
  const completed = isNodeCompleted(unitId, itemId, type)

  if (completed) {
    return 'bg-gradient-to-b from-amber-300 to-yellow-500 border-amber-600 text-slate-900 shadow-amber-400/40'
  }
  if (unlocked) {
    if (type === 'checkpoint') {
      return 'bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 border-amber-700 text-amber-950 shadow-amber-500/50 animate-pulse-glow'
    }
    switch (color) {
      case 'emerald': return 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-700 text-white shadow-emerald-500/40'
      case 'sky': return 'bg-gradient-to-b from-sky-400 to-blue-600 border-blue-700 text-white shadow-blue-500/40'
      case 'amber': return 'bg-gradient-to-b from-amber-300 to-yellow-500 border-amber-600 text-slate-900 shadow-yellow-500/40'
      case 'rose': return 'bg-gradient-to-b from-rose-400 to-red-600 border-red-700 text-white shadow-rose-500/40'
      default: return 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-700 text-white shadow-emerald-500/40'
    }
  }
  return 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-80 border-b-6 shadow-xs'
}
</script>

<style scoped>
.bounce-popover-enter-active {
  animation: duo-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bounce-popover-leave-active {
  transition: all 0.15s ease-in;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
</style>
