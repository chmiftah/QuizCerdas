<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-x-0 top-0 z-50 bg-slate-900/40 backdrop-blur-xs p-4 flex justify-center items-start"
      >
        <div class="bg-white rounded-3xl border-4 border-duo-gray-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-pop">
          <!-- Header Bar with Minimize Button -->
          <div class="p-4 bg-slate-800 text-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">🗺️</span>
              <div>
                <h3 class="font-heading text-base font-extrabold leading-none text-amber-400">
                  Progress Jalur Belajar
                </h3>
                <p class="text-xs text-slate-300 font-heading font-medium mt-0.5" v-if="unit">
                  {{ unit.title }}
                </p>
              </div>
            </div>

            <!-- Minimize / Hide Button -->
            <button 
              @click="$emit('close')"
              class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-heading font-bold transition-colors cursor-pointer"
            >
              <span>Sembunyikan / Minimize</span>
              <ChevronUp class="w-4 h-4" />
            </button>
          </div>

          <!-- Unit Progress Bar -->
          <div v-if="unit" class="px-6 pt-4 pb-2 flex items-center justify-between text-xs font-heading font-bold text-slate-600">
            <span>Progress Unit {{ unit.order }}: {{ progressPercent }}% Selesai</span>
            <span class="text-duo-green-dark">{{ completedCount }} / {{ totalNodes }} Tahap</span>
          </div>

          <!-- Horizontal Path Step Timeline -->
          <div v-if="unit" class="p-6 overflow-x-auto">
            <div class="flex items-center justify-start sm:justify-center min-w-max gap-4 px-2 py-4">
              <!-- Lesson Nodes -->
              <div 
                v-for="(lesson, idx) in unit.lessons" 
                :key="lesson.id"
                class="flex items-center gap-4"
              >
                <!-- Node Circle -->
                <div class="flex flex-col items-center gap-1.5 relative">
                  <div 
                    class="w-14 h-14 rounded-2xl flex items-center justify-center font-heading text-lg transition-all shadow-md relative"
                    :class="getNodeClass(lesson.id)"
                  >
                    <Check v-if="userStore.isLessonCompleted(lesson.id)" class="w-7 h-7 text-white stroke-[3]" />
                    <Star v-else-if="lesson.id === currentLessonId" class="w-7 h-7 text-white fill-white animate-bounce" />
                    <Star v-else-if="isLessonUnlocked(lesson.id)" class="w-6 h-6 text-white fill-white opacity-90" />
                    <Lock v-else class="w-6 h-6 text-duo-gray-300" />

                    <!-- Active pulsing ring -->
                    <div 
                      v-if="lesson.id === currentLessonId"
                      class="absolute -inset-1.5 rounded-2xl border-3 border-duo-green animate-ping opacity-75 pointer-events-none"
                    ></div>
                  </div>

                  <span class="text-[11px] font-heading font-bold max-w-[90px] text-center truncate"
                        :class="lesson.id === currentLessonId ? 'text-duo-green-dark underline font-extrabold' : 'text-slate-600'">
                    {{ lesson.title }}
                  </span>
                </div>

                <!-- Connector Line -->
                <div 
                  class="w-8 h-1 rounded-full shrink-0"
                  :class="userStore.isLessonCompleted(lesson.id) ? 'bg-duo-yellow' : 'bg-duo-gray-200'"
                ></div>
              </div>

              <!-- Checkpoint Node -->
              <div class="flex flex-col items-center gap-1.5">
                <div 
                  class="w-16 h-16 rounded-2xl flex items-center justify-center font-heading transition-all shadow-md"
                  :class="getCheckpointNodeClass()"
                >
                  <Trophy v-if="userStore.isCheckpointCompleted(unit.checkpoint?.id)" class="w-8 h-8 text-white fill-duo-yellow" />
                  <Crown v-else-if="isCheckpointUnlocked()" class="w-8 h-8 text-white fill-white animate-bounce" />
                  <Lock v-else class="w-6 h-6 text-duo-gray-300" />
                </div>
                <span class="text-[11px] font-heading font-bold text-amber-800">
                  👑 Checkpoint
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Footer Close Button -->
          <div class="p-4 bg-slate-50 border-t border-duo-gray-100 flex justify-end">
            <button 
              @click="$emit('close')"
              class="duo-btn-gray px-6 py-2 text-sm font-heading font-bold rounded-xl"
            >
              Tutup & Lanjutkan Kuiz
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '~/stores/course'
import { useUserStore } from '~/stores/user'
import { Check, Star, Lock, Trophy, Crown, ChevronUp } from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

defineEmits(['close'])

const route = useRoute()
const courseStore = useCourseStore()
const userStore = useUserStore()

const unitId = computed(() => route.params.unitId || 'unit_1')
const currentLessonId = computed(() => route.params.lessonId || '')

const unit = computed(() => courseStore.getUnitById(unitId.value))

const totalNodes = computed(() => (unit.value?.lessons.length || 0) + 1)

const completedCount = computed(() => {
  if (!unit.value) return 0
  let count = unit.value.lessons.filter(l => userStore.isLessonCompleted(l.id)).length
  if (userStore.isCheckpointCompleted(unit.value.checkpoint?.id)) count++
  return count
})

const progressPercent = computed(() => {
  if (totalNodes.value === 0) return 0
  return Math.round((completedCount.value / totalNodes.value) * 100)
})

const isLessonUnlocked = (lessonId) => {
  return courseStore.isLessonUnlocked(unitId.value, lessonId, userStore.completedLessons, userStore.completedCheckpoints)
}

const isCheckpointUnlocked = () => {
  return courseStore.isCheckpointUnlocked(unitId.value, userStore.completedLessons)
}

const getNodeClass = (lessonId) => {
  if (userStore.isLessonCompleted(lessonId)) {
    return 'bg-duo-yellow border-b-4 border-duo-yellow-dark'
  }
  if (lessonId === currentLessonId.value) {
    return 'bg-duo-green border-b-4 border-duo-green-dark scale-105 shadow-duo-green'
  }
  if (isLessonUnlocked(lessonId)) {
    return 'bg-duo-blue border-b-4 border-duo-blue-dark'
  }
  return 'bg-duo-gray-100 border-b-4 border-duo-gray-200 opacity-70'
}

const getCheckpointNodeClass = () => {
  if (userStore.isCheckpointCompleted(unit.value?.checkpoint?.id)) {
    return 'bg-duo-yellow border-b-4 border-duo-yellow-dark'
  }
  if (isCheckpointUnlocked()) {
    return 'bg-amber-400 border-b-4 border-amber-600 animate-pulse'
  }
  return 'bg-duo-gray-100 border-b-4 border-duo-gray-200 opacity-70'
}
</script>
