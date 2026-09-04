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
            Kamu kehabisan nyawa untuk melanjutkan pelajaran ini. Isi nyawa kembali untuk terus belajar!
          </p>
          <button @click="refillAndContinue" class="w-full duo-btn-red py-3 text-base">
            ❤️ Isi Nyawa Gratis
          </button>
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

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const userStore = useUserStore()

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
  courseStore.loadActiveCourse()

  if (!lesson.value) {
    router.push('/course')
    return
  }

  engine.value = useExerciseEngine(lesson.value.exercises, (xp) => {
    earnedXP.value = xp
    userStore.completeLesson(lessonId, xp, courseStore.activeCourseId)
  })
})

const refillAndContinue = () => {
  userStore.refillHearts()
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
