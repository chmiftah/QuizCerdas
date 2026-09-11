<template>
  <div>
    <!-- Interactive Exercise Runner Card -->
    <ExerciseCard 
      v-if="lesson && engine" 
      :engine="engine"
      :lessonSummary="lesson.summary"
    />

    <!-- No Hearts Left Alert -->
    <Teleport to="body">
      <div v-if="!userStore.hasHearts" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border-4 border-duo-red animate-pop">
          <div class="w-16 h-16 rounded-full bg-rose-100 mx-auto flex items-center justify-center text-duo-red">
            💔
          </div>
          <h3 class="font-heading text-2xl text-slate-800 font-bold">Nyawa Habis!</h3>
          <p class="text-slate-600 text-sm">
            Kamu kehabisan nyawa untuk melanjutkan pelajaran ini. Gunakan <strong>20 Koin Kiko 🪙</strong> untuk isi nyawa penuh!
          </p>

          <div v-if="userStore.coins >= 20" class="space-y-2 pt-1">
            <button @click="buyAndContinue" class="w-full duo-btn-red py-3 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-md">
              <span>❤️ Isi Penuh Nyawa</span>
              <span class="bg-black/20 px-2 py-0.5 rounded-full text-xs font-black">20 Koin 🪙</span>
            </button>
            <p class="text-[11px] font-heading font-semibold text-slate-400">
              Saldo saat ini: <strong class="text-amber-700">{{ userStore.coins }} Koin</strong>
            </p>
          </div>
          <div v-else class="space-y-2 pt-1">
            <div class="bg-amber-50 text-amber-900 text-xs p-3 rounded-2xl border border-amber-200 font-bold">
              Koin kamu belum cukup (butuh 20 Koin, saat ini: {{ userStore.coins }} Koin).
            </div>
            <NuxtLink to="/shop" class="w-full duo-btn-yellow block py-2.5 text-xs font-extrabold text-center">
              🛍️ Buka Toko Kiko
            </NuxtLink>
            <NuxtLink to="/catalog" class="w-full duo-btn-blue block py-2 text-xs font-extrabold text-center">
              📚 Belajar Modul Lain
            </NuxtLink>
          </div>

          <NuxtLink to="/" class="block text-xs font-heading font-bold text-slate-400 hover:underline pt-2">
            Kembali ke Dashboard
          </NuxtLink>
        </div>
      </div>
    </Teleport>

    <!-- Lesson Finished Celebration Modal -->
    <LessonSummaryModal
      v-if="engine && lesson"
      :isOpen="engine.isLessonFinished"
      :stars="engine.earnedStars"
      :xpEarned="earnedXP"
      :maxCombo="engine.maxCombo"
      :lessonTitle="lesson.title"
      :courseTitle="courseStore.course.title"
      :nextItem="nextItem"
      :isCourseCompleted="isCourseCompleted"
      :completedCount="completedLessonsCount"
      :totalCount="totalLessonsCount"
      @finish="finishLesson"
      @next="goToNextMaterial"
    />
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '~/stores/course'
import { useUserStore } from '~/stores/user'
import { useExerciseEngine } from '~/composables/useExerciseEngine'
import { usePaywall } from '~/composables/usePaywall'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const userStore = useUserStore()
const { openPaywall } = usePaywall()

const unitId = route.params.unitId
const lessonId = route.params.lessonId

const lesson = computed(() => courseStore.getLessonById(unitId, lessonId))
const earnedXP = ref(20)

const nextItem = computed(() => courseStore.getNextItem(unitId, lessonId))

const totalLessonsCount = computed(() => {
  return courseStore.units.reduce((acc, u) => acc + u.lessons.length, 0)
})

const completedLessonsCount = computed(() => {
  return userStore.getCompletedLessonsForCourse(courseStore.activeCourseId).length
})

const isCourseCompleted = computed(() => {
  return totalLessonsCount.value > 0 && completedLessonsCount.value >= totalLessonsCount.value
})

const engine = shallowRef(null)

onMounted(() => {
  userStore.loadFromStorage()
  
  if (!courseStore.courses[courseStore.activeCourseId]) {
    courseStore.loadActiveCourse()
  }

  const isCoursePro = Boolean(courseStore.course?.isPro || courseStore.catalogRegistry.find(c => c.id === courseStore.activeCourseId)?.isPro)
  if (isCoursePro && !userStore.isPro) {
    openPaywall({
      reason: 'unit_locked',
      title: `Akses Terkunci: ${courseStore.course.title || 'Modul Pro'} 👑`,
      description: 'Kursus ini khusus untuk pengguna QuizCerdas Pro. Tingkatkan akun Anda untuk mengakses materi!',
      featureHighlight: 'Akses Penuh Kursus Pro'
    })
    router.push('/catalog')
    return
  }
  
  if (!lesson.value) {
    const currentPath = `/course/${unitId}/${lessonId}`
    if (typeof window !== 'undefined') {
      localStorage.setItem('redirectAfterLoad', currentPath)
    }
    router.push('/course')
    return
  }

  engine.value = useExerciseEngine(lesson.value.exercises, (xp) => {
    earnedXP.value = xp
    userStore.completeLesson(lessonId, xp, courseStore.activeCourseId)
  }, {
    courseId: courseStore.activeCourseId,
    courseTitle: courseStore.course?.title || 'Modul Belajar',
    unitId: unitId,
    unitTitle: courseStore.getUnitById(unitId)?.title || '',
    lessonId: lessonId,
    lessonTitle: lesson.value?.title || 'Pelajaran'
  })
})

const buyAndContinue = () => {
  try {
    userStore.buyHeartRefill(20)
  } catch (err) {
    alert(err.message)
  }
}

const finishLesson = () => {
  router.push(`/course?id=${courseStore.activeCourseId}`)
}

const goToNextMaterial = () => {
  if (nextItem.value && nextItem.value.path) {
    router.push(nextItem.value.path)
  } else {
    finishLesson()
  }
}
</script>
