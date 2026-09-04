<template>
  <div>
    <!-- Interactive Checkpoint Runner Card -->
    <ExerciseCard 
      v-if="checkpoint && engine" 
      :engine="engine"
      :lessonSummary="`👑 ${checkpoint.title} - Buktikan kemampuanmu!`"
    />

    <!-- Checkpoint Finished Celebration Modal -->
    <LessonSummaryModal
      v-if="engine && engine.isLessonFinished"
      :isOpen="engine.isLessonFinished"
      :stars="engine.earnedStars"
      :xpEarned="earnedXP"
      :maxCombo="engine.maxCombo"
      :lessonTitle="checkpoint ? checkpoint.title : 'Checkpoint Unit'"
      :courseTitle="courseStore.course.title"
      :nextItem="nextItem"
      :isCourseCompleted="isCourseCompleted"
      :completedCount="completedLessonsCount"
      :totalCount="totalLessonsCount"
      @finish="finishCheckpoint"
      @next="goToNextMaterial"
    />
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue'
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
const checkpoint = computed(() => courseStore.getCheckpointById(unitId))
const earnedXP = ref(50)

const nextItem = computed(() => courseStore.getNextItem(unitId))

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

  if (!checkpoint.value) {
    router.push('/course')
    return
  }

  engine.value = useExerciseEngine(checkpoint.value.exercises, (xp) => {
    earnedXP.value = xp
    userStore.completeCheckpoint(checkpoint.value.id, xp, courseStore.activeCourseId)
  })
})

const finishCheckpoint = () => {
  router.push(`/course?id=${courseStore.activeCourseId}`)
}

const goToNextMaterial = () => {
  if (nextItem.value && nextItem.value.path) {
    router.push(nextItem.value.path)
  } else {
    finishCheckpoint()
  }
}
</script>
