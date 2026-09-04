import { defineStore } from 'pinia'

export interface Exercise {
  id: string
  type: 'multiple_choice' | 'true_false' | 'fill_in_blank' | 'matching'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correct_answer: string
  explanation: string
  image?: string
  visual?: Record<string, any>
  spaced_repetition?: boolean
}

export interface Lesson {
  id: string
  title: string
  order: number
  summary: string
  exercises: Exercise[]
}

export interface Checkpoint {
  id: string
  title: string
  exercises: Exercise[]
}

export interface Unit {
  id: string
  title: string
  order: number
  icon: string
  color: string
  lessons: Lesson[]
  checkpoint: Checkpoint
}

export interface Course {
  id: string
  title: string
  description: string
  target_audience: string
  units: Unit[]
}

export interface CatalogCourse {
  id: string
  title: string
  description: string
  target_audience: string
  category: 'math' | 'indonesian' | 'science' | 'art'
  icon: string
  themeColor: 'green' | 'blue' | 'yellow' | 'red' | 'sky'
  features: string[]
  isReady: boolean
  isFromDatabase?: boolean
  source?: string
  courseData?: Course
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    activeCourseId: 'counting_101',
    courses: {} as Record<string, Course>,
    catalogRegistry: [] as CatalogCourse[]
  }),

  getters: {
    allCatalogCourses: (state) => state.catalogRegistry.filter(c => c.isReady),

    course: (state) => state.courses[state.activeCourseId] || {
      id: state.activeCourseId,
      title: 'Memuat Modul...',
      description: 'Memuat data dari database PostgreSQL',
      target_audience: 'Siswa',
      units: []
    },
    units: (state) => {
      const active = state.courses[state.activeCourseId]
      return active ? active.units : []
    },

    getUnitById: (state) => (unitId: string) => {
      const active = state.courses[state.activeCourseId]
      return active ? active.units.find(u => u.id === unitId) : undefined
    },

    getLessonById: (state) => (unitId: string, lessonId: string) => {
      const active = state.courses[state.activeCourseId]
      if (!active) return undefined
      const unit = active.units.find(u => u.id === unitId)
      return unit?.lessons.find(l => l.id === lessonId)
    },

    getCheckpointById: (state) => (unitId: string) => {
      const active = state.courses[state.activeCourseId]
      if (!active) return undefined
      const unit = active.units.find(u => u.id === unitId)
      return unit?.checkpoint
    },

    // Check if unit is unlocked
    isUnitUnlocked: (state) => (unitId: string, completedCheckpoints: string[], completedLessons: string[] = []) => {
      const active = state.courses[state.activeCourseId]
      if (!active || !active.units) return true
      const unitIndex = active.units.findIndex(u => u.id === unitId)
      if (unitIndex <= 0) return true
      const prevUnit = active.units[unitIndex - 1]
      if (!prevUnit) return true

      const checkpointDone = prevUnit.checkpoint ? completedCheckpoints.includes(prevUnit.checkpoint.id) : false
      const allLessonsDone = prevUnit.lessons && prevUnit.lessons.length > 0
        ? prevUnit.lessons.every(l => completedLessons.includes(l.id))
        : false

      return checkpointDone || allLessonsDone
    },

    // Check if lesson is unlocked within unit
    isLessonUnlocked: (state) => (unitId: string, lessonId: string, completedLessons: string[], completedCheckpoints: string[]) => {
      const active = state.courses[state.activeCourseId]
      if (!active || !active.units) return false
      const unitIndex = active.units.findIndex(u => u.id === unitId)
      if (unitIndex < 0) return false
      
      // First check if unit itself is unlocked
      if (unitIndex > 0) {
        const prevUnit = active.units[unitIndex - 1]
        if (prevUnit) {
          const checkpointDone = prevUnit.checkpoint ? completedCheckpoints.includes(prevUnit.checkpoint.id) : false
          const allLessonsDone = prevUnit.lessons && prevUnit.lessons.length > 0
            ? prevUnit.lessons.every(l => completedLessons.includes(l.id))
            : false
          if (!checkpointDone && !allLessonsDone) return false
        }
      }

      const unit = active.units[unitIndex]
      const lessonIndex = unit.lessons.findIndex(l => l.id === lessonId)
      if (lessonIndex <= 0) return true // Lesson 1 of an unlocked unit is always unlocked

      const prevLesson = unit.lessons[lessonIndex - 1]
      return completedLessons.includes(prevLesson.id)
    },

    // Check if unit checkpoint is unlocked
    isCheckpointUnlocked: (state) => (unitId: string, completedLessons: string[]) => {
      const active = state.courses[state.activeCourseId]
      if (!active || !active.units) return false
      const unit = active.units.find(u => u.id === unitId)
      if (!unit) return false
      return unit.lessons.every(l => completedLessons.includes(l.id))
    },

    // Get next lesson or checkpoint after completing a lesson/checkpoint
    getNextItem: (state) => (unitId: string, currentLessonId?: string) => {
      const active = state.courses[state.activeCourseId]
      if (!active || !active.units) return null

      const unitIndex = active.units.findIndex(u => u.id === unitId)
      if (unitIndex < 0) return null

      const currentUnit = active.units[unitIndex]

      if (currentLessonId) {
        const lessonIndex = currentUnit.lessons.findIndex(l => l.id === currentLessonId)
        if (lessonIndex >= 0 && lessonIndex + 1 < currentUnit.lessons.length) {
          const nextL = currentUnit.lessons[lessonIndex + 1]
          return {
            type: 'lesson',
            title: nextL.title,
            path: `/course/${unitId}/${nextL.id}`
          }
        }
        // If last lesson in unit, next is unit's checkpoint
        if (currentUnit.checkpoint) {
          return {
            type: 'checkpoint',
            title: currentUnit.checkpoint.title,
            path: `/course/${unitId}/checkpoint`
          }
        }
      }

      // If checkpoint completed or no checkpoint, check next unit
      if (unitIndex + 1 < active.units.length) {
        const nextUnit = active.units[unitIndex + 1]
        if (nextUnit.lessons && nextUnit.lessons.length > 0) {
          const firstL = nextUnit.lessons[0]
          return {
            type: 'lesson',
            title: firstL.title,
            path: `/course/${nextUnit.id}/${firstL.id}`
          }
        }
      }

      return null
    }
  },

  actions: {
    async fetchCoursesFromApi() {
      try {
        const data = await $fetch<any[]>('/api/course')
        if (data && Array.isArray(data)) {
          const newMap: Record<string, Course> = {}
          const newRegistry: CatalogCourse[] = []

          data.forEach(item => {
            newRegistry.push({
              id: item.id,
              title: item.title,
              description: item.description,
              target_audience: item.target_audience,
              category: item.category || 'math',
              icon: item.icon || '🔢',
              themeColor: item.themeColor || 'green',
              features: item.features || [],
              isReady: item.isReady ?? true,
              isFromDatabase: item.isFromDatabase ?? true,
              source: item.source || 'postgresql_database',
              courseData: item.courseData
            })

            if (item.courseData) {
              newMap[item.id] = item.courseData
            }
          })

          this.catalogRegistry = newRegistry
          this.courses = newMap

          // Update active course ID if current active is not present and registry has items
          if (newRegistry.length > 0 && !newMap[this.activeCourseId]) {
            this.activeCourseId = newRegistry[0].id
          }
        }
      } catch (err) {
        console.warn('Could not fetch courses from server API:', err)
      }
    },

    selectCourse(courseId: string) {
      if (this.courses[courseId]) {
        this.activeCourseId = courseId
        if (typeof window !== 'undefined') {
          localStorage.setItem('activeCourseId', courseId)
        }
      }
    },

    async loadActiveCourse() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('activeCourseId')
        if (saved) {
          this.activeCourseId = saved
        }
      }
      await this.fetchCoursesFromApi()
    },

    async loadCourses() {
      await this.fetchCoursesFromApi()
    },

    addCustomCourse(courseData: any) {
      if (courseData && courseData.id) {
        this.courses[courseData.id] = courseData
        const existingIndex = this.catalogRegistry.findIndex(c => c.id === courseData.id)
        const catalogItem: CatalogCourse = {
          id: courseData.id,
          title: courseData.title || 'Kuis Baru',
          description: courseData.description || '',
          target_audience: courseData.target_audience || 'Siswa',
          category: courseData.category || 'math',
          icon: courseData.icon || '🔢',
          themeColor: courseData.themeColor || 'purple',
          features: courseData.features || ['7 Jenis Soal Interaktif'],
          isReady: true,
          isFromDatabase: true,
          courseData: courseData
        }
        if (existingIndex >= 0) {
          this.catalogRegistry[existingIndex] = catalogItem
        } else {
          this.catalogRegistry.push(catalogItem)
        }
      }
    },

    removeCourseFromRegistry(courseId: string) {
      // Remove from catalogRegistry
      this.catalogRegistry = this.catalogRegistry.filter(c => c.id !== courseId)
      // Remove from courses object
      if (this.courses[courseId]) {
        delete this.courses[courseId]
      }
    }
  }
})
