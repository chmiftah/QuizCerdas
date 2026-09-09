import { defineStore } from 'pinia'

export interface Exercise {
  id: string
  type: 'multiple_choice' | 'true_false' | 'fill_in_blank' | 'matching' | 'drag_and_drop' | 'shadow_matching' | 'sequence_ordering' | 'pattern_matching' | 'odd_one_out' | 'memory_flip' | 'seek_find' | 'comparison' | 'category_sorting' | 'drag_to_sort' | 'true_false_image' | 'hotspot' | 'word_building' | 'sound_matching' | 'puzzle_assembly' | 'fill_missing_number' | 'time_reading' | 'shape_transform' | 'count_select' | 'number_tracing' | 'reading' | 'number_maze' | 'balance_scale' | 'color_by_number' | 'syllable_clapping'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correct_answer: string
  explanation: string
  image?: string
  visual?: Record<string, any>
  spaced_repetition?: boolean
  hotspots?: { id: string, x: number, y: number, width: number, height: number, label?: string }[]
  audioText?: string
  pairs?: { left: string, right: string }[]
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
  isPro?: boolean
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
  isPro?: boolean
  isFromDatabase?: boolean
  source?: string
  courseData?: Course
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    activeCourseId: 'counting_101',
    courses: {} as Record<string, Course>,
    catalogRegistry: [] as CatalogCourse[],
    isLoading: false,
    hasLoaded: false,
    error: null as string | null,
    currentCourseStatus: 'idle' as 'idle' | 'loading' | 'success' | 'not_found' | 'error',
    currentCourseError: null as string | null
  }),

  getters: {
    allCatalogCourses: (state) => state.catalogRegistry.filter(c => c.isReady),

    hasCurrentCourse: (state) => Boolean(state.courses[state.activeCourseId] && state.courses[state.activeCourseId].units?.length >= 0),

    course: (state) => state.courses[state.activeCourseId] || {
      id: state.activeCourseId,
      title: '',
      description: '',
      target_audience: '',
      units: []
    },
    units: (state) => {
      const active = state.courses[state.activeCourseId]
      return active ? active.units || [] : []
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
      if (lessonIndex < 0) return false // Not a lesson in this unit
      if (lessonIndex === 0) return true // Lesson 1 of an unlocked unit is always unlocked

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
    async fetchCoursesFromApi(force = false) {
      if (this.hasLoaded && !force && this.catalogRegistry.length > 0) {
        return
      }
      this.isLoading = true
      this.error = null
      try {
        const data = await $fetch<any[]>('/api/course')
        if (data && Array.isArray(data)) {
          const newMap: Record<string, Course> = {}
          const newRegistry: CatalogCourse[] = []

          data.forEach(item => {
            const isPro = item.isPro ?? item.courseData?.isPro ?? false
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
              isPro: isPro,
              isFromDatabase: item.isFromDatabase ?? true,
              source: item.source || 'postgresql_database',
              courseData: item.courseData ? { ...item.courseData, isPro } : undefined
            })

            if (item.courseData) {
              newMap[item.id] = { ...item.courseData, isPro }
            }
          })

          this.catalogRegistry = newRegistry
          this.courses = newMap
          this.hasLoaded = true

          // Update active course ID if current active is not present and registry has items
          if (newRegistry.length > 0 && !newMap[this.activeCourseId]) {
            this.activeCourseId = newRegistry[0].id
          }
        }
      } catch (err: any) {
        console.error('Failed to fetch courses from server API:', err)
        this.error = err.data?.statusMessage || err.message || 'Gagal memuat modul pembelajaran dari server'
      } finally {
        this.isLoading = false
      }
    },

    async retryFetchCourses() {
      await this.fetchCoursesFromApi(true)
    },

    async fetchCourseById(courseId: string, force = false): Promise<Course | null> {
      if (!courseId) return null
      
      // If already in courses with units and not forced, set active and return
      if (!force && this.courses[courseId] && Array.isArray(this.courses[courseId].units)) {
        this.activeCourseId = courseId
        this.currentCourseStatus = 'success'
        this.currentCourseError = null
        if (typeof window !== 'undefined') {
          localStorage.setItem('activeCourseId', courseId)
        }
        return this.courses[courseId]
      }

      this.currentCourseStatus = 'loading'
      this.currentCourseError = null
      this.activeCourseId = courseId

      try {
        const data = await $fetch<any>(`/api/course/${courseId}`)
        if (data && data.id) {
          const isPro = data.isPro ?? false
          const courseObj: Course = {
            id: data.id,
            title: data.title,
            description: data.description || '',
            target_audience: data.target_audience || 'Siswa',
            isPro,
            units: data.units || []
          }
          this.courses[data.id] = courseObj
          this.activeCourseId = data.id
          this.currentCourseStatus = 'success'
          if (typeof window !== 'undefined') {
            localStorage.setItem('activeCourseId', data.id)
          }

          // Also update or insert into catalogRegistry
          const existingIdx = this.catalogRegistry.findIndex(c => c.id === data.id)
          const catalogItem: CatalogCourse = {
            id: data.id,
            title: data.title,
            description: data.description || '',
            target_audience: data.target_audience || 'Siswa',
            category: data.category || 'math',
            icon: data.icon || '⭐',
            themeColor: data.themeColor || 'green',
            features: data.features || [],
            isReady: data.isReady ?? true,
            isPro,
            isFromDatabase: true,
            courseData: courseObj
          }
          if (existingIdx >= 0) {
            this.catalogRegistry[existingIdx] = catalogItem
          } else {
            this.catalogRegistry.push(catalogItem)
          }

          return courseObj
        }
        this.currentCourseStatus = 'not_found'
        return null
      } catch (err: any) {
        if (err.statusCode === 404 || err.response?.status === 404) {
          this.currentCourseStatus = 'not_found'
        } else {
          this.currentCourseStatus = 'error'
          this.currentCourseError = err.data?.statusMessage || err.message || 'Gagal memuat modul dari server'
        }
        return null
      }
    },

    async selectCourse(courseId: string) {
      if (!courseId) return
      this.activeCourseId = courseId
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeCourseId', courseId)
      }
      if (this.courses[courseId] && Array.isArray(this.courses[courseId].units)) {
        this.currentCourseStatus = 'success'
        return this.courses[courseId]
      }
      return await this.fetchCourseById(courseId)
    },

    async loadActiveCourse() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('activeCourseId')
        if (saved) {
          this.activeCourseId = saved
        }
      }
      await this.fetchCoursesFromApi()

      if (typeof window !== 'undefined') {
        const redirectPath = localStorage.getItem('redirectAfterLoad')
        if (redirectPath && this.courses[this.activeCourseId]) {
          localStorage.removeItem('redirectAfterLoad')
          navigateTo(redirectPath)
        }
      }
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
          isReady: courseData.isReady !== false,
          isPro: Boolean(courseData.isPro),
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

    async toggleCourseTier(courseId: string, isPro: boolean) {
      // Optimistically update local store
      const regItem = this.catalogRegistry.find(c => c.id === courseId)
      if (regItem) {
        regItem.isPro = isPro
        if (regItem.courseData) regItem.courseData.isPro = isPro
      }
      if (this.courses[courseId]) {
        this.courses[courseId].isPro = isPro
      }

      // Persist to database via API
      try {
        const res = await $fetch<any>('/api/admin/course-toggle-tier', {
          method: 'POST',
          body: { courseId, isPro, title: regItem?.title }
        })
        return res
      } catch (err: any) {
        // Rollback on failure
        if (regItem) regItem.isPro = !isPro
        if (this.courses[courseId]) this.courses[courseId].isPro = !isPro
        throw new Error(err.data?.statusMessage || err.message || 'Gagal mengubah status kursus di server')
      }
    },

    async toggleCourseStatus(courseId: string, isReady: boolean) {
      // Optimistically update local store
      const regItem = this.catalogRegistry.find(c => c.id === courseId)
      if (regItem) {
        regItem.isReady = isReady
      }
      if (this.courses[courseId]) {
        (this.courses[courseId] as any).isReady = isReady
      }

      // Persist to database via API
      try {
        const res = await $fetch<any>('/api/admin/course-toggle-status', {
          method: 'POST',
          body: { courseId, isReady, title: regItem?.title }
        })
        return res
      } catch (err: any) {
        // Rollback on failure
        if (regItem) regItem.isReady = !isReady
        if (this.courses[courseId]) (this.courses[courseId] as any).isReady = !isReady
        throw new Error(err.data?.statusMessage || err.message || 'Gagal mengubah status publikasi kursus di server')
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
