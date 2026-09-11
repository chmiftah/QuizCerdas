import { defineStore } from 'pinia'

export interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  grade: string
  dailyGoalMinutes: number
  role: 'student' | 'parent' | 'guest' | 'admin'
  accountRole?: 'student' | 'parent' | 'guest' | 'admin'
}

export interface DailyQuest {
  id: string
  title: string
  description: string
  target: number
  current: number
  rewardXP: number
  rewardHearts: number
  claimed: boolean
  icon: string
  type: 'complete_lessons' | 'earn_xp' | 'perfect_score'
}

export interface ExerciseAttempt {
  id: string
  courseId: string
  courseTitle?: string
  unitId?: string
  unitTitle?: string
  lessonId: string
  lessonTitle?: string
  exerciseId: string
  exerciseType?: string
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation?: string
  answeredAt: string
}

export interface UserState {
  currentUser: UserProfile | null
  isAuthenticated: boolean
  subscriptionTier: 'FREE' | 'PRO' | 'FAMILY'
  subscriptionExpiresAt: string | null
  xp: number
  weeklyXP: number
  coins: number
  hearts: number
  maxHearts: number
  streak: number
  lastActiveDate: string | null
  completedLessonsByCourse: Record<string, string[]>
  completedCheckpointsByCourse: Record<string, string[]>
  completedLessons: string[]
  completedCheckpoints: string[]
  spacedRepetitionQueue: string[]
  unlockedItems: string[]
  equippedHat: string
  equippedAccessory: string
  equippedAvatar: string
  streakFreezeCount: number
  lastQuestResetDate: string | null
  dailyQuests: DailyQuest[]
  claimedChests: string[]
  exerciseHistory: ExerciseAttempt[]
}

const createDefaultDailyQuests = (): DailyQuest[] => [
  {
    id: 'quest_lessons',
    title: 'Penjelajah Cilik',
    description: 'Selesaikan 2 modul pelajaran hari ini',
    target: 2,
    current: 0,
    rewardXP: 30,
    rewardHearts: 1,
    claimed: false,
    icon: '📚',
    type: 'complete_lessons'
  },
  {
    id: 'quest_xp',
    title: 'Bintang Berkilau',
    description: 'Kumpulkan total 50 XP hari ini',
    target: 50,
    current: 0,
    rewardXP: 40,
    rewardHearts: 1,
    claimed: false,
    icon: '⚡',
    type: 'earn_xp'
  },
  {
    id: 'quest_streak',
    title: 'Disiplin Belajar',
    description: 'Selesaikan 1 kuis dengan skor sempurna',
    target: 1,
    current: 0,
    rewardXP: 25,
    rewardHearts: 1,
    claimed: false,
    icon: '🔥',
    type: 'perfect_score'
  }
]

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isAuthenticated: false,
    subscriptionTier: 'FREE',
    subscriptionExpiresAt: null,
    xp: 0,
    weeklyXP: 120,
    coins: 100,
    hearts: 5,
    maxHearts: 5,
    streak: 1,
    lastActiveDate: new Date().toISOString(),
    completedLessonsByCourse: {},
    completedCheckpointsByCourse: {},
    completedLessons: [],
    completedCheckpoints: [],
    spacedRepetitionQueue: [],
    unlockedItems: ['hat_none', 'acc_none', 'avatar_kiko'],
    equippedHat: 'hat_none',
    equippedAccessory: 'acc_none',
    equippedAvatar: 'avatar_kiko',
    streakFreezeCount: 0,
    lastQuestResetDate: new Date().toDateString(),
    dailyQuests: createDefaultDailyQuests(),
    claimedChests: [],
    exerciseHistory: []
  }),

  getters: {
    userLevel: (state) => Math.floor(state.xp / 100) + 1,
    xpToNextLevel: (state) => 100 - (state.xp % 100),
    hasHearts: (state) => state.subscriptionTier !== 'FREE' || state.currentUser?.role === 'admin' || state.hearts > 0,
    isPro: (state) => {
      if (state.currentUser?.role === 'admin' || state.currentUser?.accountRole === 'admin') return true
      if (state.subscriptionTier === 'PRO' || state.subscriptionTier === 'FAMILY') {
        if (!state.subscriptionExpiresAt) return true
        return new Date(state.subscriptionExpiresAt).getTime() > Date.now()
      }
      return false
    },
    hasUnlimitedHearts: (state) => {
      if (state.currentUser?.role === 'admin' || state.currentUser?.accountRole === 'admin') return true
      return state.subscriptionTier === 'PRO' || state.subscriptionTier === 'FAMILY'
    },
    subscriptionLabel: (state) => {
      if (state.subscriptionTier === 'FAMILY') return 'Paket Keluarga 👨‍👩‍👧‍👦'
      if (state.subscriptionTier === 'PRO') return 'QuizCerdas Pro 👑'
      return 'Akun Gratis 🐣'
    },
    subscriptionDaysLeft: (state) => {
      if (!state.subscriptionExpiresAt) return 365
      const diffTime = new Date(state.subscriptionExpiresAt).getTime() - Date.now()
      return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
    },
    subscriptionFormattedExpiry: (state) => {
      if (!state.subscriptionExpiresAt) return '1 Tahun ke Depan'
      return new Date(state.subscriptionExpiresAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    canAccessUnit: (state) => (unitIndex: number) => {
      if (state.currentUser?.role === 'admin' || state.currentUser?.accountRole === 'admin') return true
      if (state.subscriptionTier === 'PRO' || state.subscriptionTier === 'FAMILY') return true
      // Free user can only access Unit 0 (Bioma 1)
      return unitIndex === 0
    },
    isLoggedIn: (state) => state.isAuthenticated && !!state.currentUser,
    isAdmin: (state) => state.currentUser?.role === 'admin',
    isActualAdmin: (state) => state.currentUser?.accountRole === 'admin' || state.currentUser?.role === 'admin',
    userDisplayName: (state) => state.currentUser ? state.currentUser.name : 'Penjelajah Muda',
    userAvatar: (state) => state.currentUser ? state.currentUser.avatar : '🦉',

    getCompletedLessonsForCourse: (state) => (courseId: string) => {
      if (!courseId) return []
      return state.completedLessonsByCourse[courseId] || []
    },

    getCompletedCheckpointsForCourse: (state) => (courseId: string) => {
      if (!courseId) return []
      return state.completedCheckpointsByCourse[courseId] || []
    },

    isLessonCompleted: (state) => (lessonId: string, courseId?: string) => {
      if (courseId) {
        const courseLessons = state.completedLessonsByCourse[courseId] || []
        return courseLessons.includes(lessonId)
      }
      return state.completedLessons.includes(lessonId)
    },

    isCheckpointCompleted: (state) => (checkpointId: string, courseId?: string) => {
      if (courseId) {
        const courseCheckpoints = state.completedCheckpointsByCourse[courseId] || []
        return courseCheckpoints.includes(checkpointId)
      }
      return state.completedCheckpoints.includes(checkpointId)
    },

    isChestClaimed: (state) => (chestId: string) => {
      return state.claimedChests.includes(chestId)
    },

    leagueTier: (state) => {
      const xp = state.weeklyXP || 0
      if (xp >= 400) return { name: 'Diamond', icon: '💎', color: 'from-cyan-400 to-blue-600', badgeClass: 'bg-cyan-500 text-white' }
      if (xp >= 250) return { name: 'Gold', icon: '🥇', color: 'from-amber-400 to-yellow-500', badgeClass: 'bg-amber-500 text-white' }
      if (xp >= 100) return { name: 'Silver', icon: '🥈', color: 'from-slate-300 to-slate-400', badgeClass: 'bg-slate-400 text-white' }
      return { name: 'Bronze', icon: '🥉', color: 'from-amber-700 to-orange-800', badgeClass: 'bg-amber-700 text-white' }
    },

    kikoTitle: (state) => {
      const level = Math.floor(state.xp / 100) + 1
      if (level >= 10) return { title: 'Kiko Sang Raja', icon: '👑', subtitle: 'Master Serba Bisa' }
      if (level >= 5) return { title: 'Kiko Cendekia', icon: '🎓', subtitle: 'Pintar & Tekun' }
      if (level >= 3) return { title: 'Kiko Penjelajah', icon: '🧭', subtitle: 'Pemberani' }
      return { title: 'Kiko Pemula', icon: '🐣', subtitle: 'Semangat Belajar' }
    },

    unclaimedQuestsCount: (state) => {
      return (state.dailyQuests || []).filter(q => q.current >= q.target && !q.claimed).length
    },

    getExerciseHistoryForCourse: (state) => (courseId: string) => {
      return (state.exerciseHistory || []).filter(h => h.courseId === courseId)
    },

    getExerciseHistoryStats: (state) => (courseId?: string) => {
      const list = courseId
        ? (state.exerciseHistory || []).filter(h => h.courseId === courseId)
        : (state.exerciseHistory || [])
      const total = list.length
      const correct = list.filter(h => h.isCorrect).length
      const wrong = total - correct
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
      return { total, correct, wrong, accuracy }
    }
  },

  actions: {
    async login(email: string, password?: string) {
      try {
        const res = await $fetch<{ success: boolean; user: any }>('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        if (res && res.user) {
          this.currentUser = {
            id: res.user.id,
            name: res.user.name,
            username: res.user.username,
            email: res.user.email,
            avatar: res.user.avatar || '🦉',
            grade: res.user.grade || 'Kelas 1 SD',
            dailyGoalMinutes: res.user.dailyGoalMinutes || 10,
            role: res.user.role || 'student',
            accountRole: res.user.role || 'student'
          }
          if (res.user.xp !== undefined) this.xp = res.user.xp
          if (res.user.hearts !== undefined) this.hearts = res.user.hearts
          if (res.user.streak !== undefined) this.streak = res.user.streak
          if (res.user.subscriptionTier) this.subscriptionTier = res.user.subscriptionTier
          if (res.user.subscriptionExpiresAt !== undefined) this.subscriptionExpiresAt = res.user.subscriptionExpiresAt
          if (res.user.completedLessonsByCourse) this.completedLessonsByCourse = res.user.completedLessonsByCourse
          if (res.user.completedCheckpointsByCourse) this.completedCheckpointsByCourse = res.user.completedCheckpointsByCourse
          
          this.rebuildFlatCompletedArrays()
          this.isAuthenticated = true
          this.saveToStorage()
          return true
        }
        throw new Error('Respon login dari database tidak valid')
      } catch (err: any) {
        const message = err.data?.statusMessage || err.statusMessage || err.message || 'Gagal terhubung ke database'
        throw new Error(message)
      }
    },

    async register(data: { name: string; username: string; email: string; password?: string; avatar?: string; grade?: string; dailyGoalMinutes?: number }) {
      try {
        const res = await $fetch<{ success: boolean; user: any }>('/api/auth/register', {
          method: 'POST',
          body: data
        })
        if (res && res.user) {
          this.currentUser = {
            id: res.user.id,
            name: res.user.name,
            username: res.user.username,
            email: res.user.email,
            avatar: res.user.avatar || '🦉',
            grade: res.user.grade || 'Kelas 1 SD',
            dailyGoalMinutes: res.user.dailyGoalMinutes || 10,
            role: (res.user.role as any) || 'student',
            accountRole: (res.user.role as any) || 'student'
          }
          if (res.user.xp !== undefined) this.xp = res.user.xp
          this.isAuthenticated = true
          this.saveToStorage()
          return true
        }
        throw new Error('Respon registrasi dari database tidak valid')
      } catch (err: any) {
        const message = err.data?.statusMessage || err.statusMessage || err.message || 'Gagal menyimpan ke database'
        throw new Error(message)
      }
    },

    loginAsGuest() {
      this.currentUser = {
        id: `guest_${Date.now()}`,
        name: 'Tamu Petualang',
        username: 'guest',
        email: 'guest@countingduo.id',
        avatar: '🦊',
        grade: 'TK B / Kelas 1',
        dailyGoalMinutes: 5,
        role: 'guest'
      }
      this.isAuthenticated = true
      this.saveToStorage()
      return true
    },

    toggleAdminRole() {
      if (!this.currentUser) return
      // Keamanan: Hanya akun yang berhak (memiliki role admin) yang dapat beralih peran
      const isCurrentlyAdmin = this.currentUser.role === 'admin'
      const isOriginalAdmin = this.currentUser.accountRole === 'admin' || isCurrentlyAdmin
      if (!isOriginalAdmin) return

      if (!this.currentUser.accountRole) {
        this.currentUser.accountRole = 'admin'
      }
      this.currentUser.role = isCurrentlyAdmin ? 'student' : 'admin'
      this.saveToStorage()
    },

    async logout() {
      this.currentUser = null
      this.isAuthenticated = false
      this.xp = 0
      this.hearts = 5
      this.streak = 1
      this.completedLessonsByCourse = {}
      this.completedCheckpointsByCourse = {}
      this.completedLessons = []
      this.completedCheckpoints = []
      this.saveToStorage()

      if (import.meta.client) {
        try {
          await $fetch('/api/auth/logout', { method: 'POST' })
        } catch (e) {}
      }
    },

    async handleSessionExpired(notify = false) {
      this.currentUser = null
      this.isAuthenticated = false
      if (import.meta.client) {
        try {
          const saved = localStorage.getItem('duo_user_progress')
          if (saved) {
            const data = JSON.parse(saved)
            data.currentUser = null
            data.isAuthenticated = false
            localStorage.setItem('duo_user_progress', JSON.stringify(data))
          }
        } catch (e) {}

        try {
          await $fetch('/api/auth/logout', { method: 'POST' })
        } catch (e) {}

        if (notify) {
          console.warn('[AUTH] Sesi login telah berakhir atau tidak valid. Silakan login kembali.')
        }
      }
    },

    checkAndResetDailyQuests() {
      const today = new Date().toDateString()
      if (this.lastQuestResetDate !== today) {
        this.dailyQuests = createDefaultDailyQuests()
        this.lastQuestResetDate = today
        this.saveToStorage()
      }
    },

    updateQuestProgress(type: 'complete_lessons' | 'earn_xp' | 'perfect_score', amount: number = 1) {
      this.checkAndResetDailyQuests()
      let updated = false
      if (!this.dailyQuests) this.dailyQuests = createDefaultDailyQuests()

      this.dailyQuests.forEach(q => {
        if (q.type === type && !q.claimed) {
          const next = Math.min(q.target, q.current + amount)
          if (next !== q.current) {
            q.current = next
            updated = true
          }
        }
      })
      if (updated) {
        this.saveToStorage()
      }
    },

    claimQuestReward(questId: string) {
      if (!this.dailyQuests) this.dailyQuests = createDefaultDailyQuests()
      const quest = this.dailyQuests.find(q => q.id === questId)
      if (quest && quest.current >= quest.target && !quest.claimed) {
        quest.claimed = true
        this.addXP(quest.rewardXP)
        this.addCoins(15)
        if (quest.rewardHearts > 0 && this.hearts < this.maxHearts) {
          this.hearts = Math.min(this.maxHearts, this.hearts + quest.rewardHearts)
        }
        this.saveToStorage()
        return { xp: quest.rewardXP, hearts: quest.rewardHearts }
      }
      return null
    },

    addXP(amount: number) {
      this.xp += amount
      this.weeklyXP = (this.weeklyXP || 0) + amount
      this.updateQuestProgress('earn_xp', amount)
      this.saveToStorage()
    },

    addCoins(amount: number) {
      this.coins = (this.coins || 0) + amount
      this.saveToStorage()
    },

    loseHeart() {
      if (this.hasUnlimitedHearts) return
      if (this.hearts > 0) {
        this.hearts--
        this.saveToStorage()
      }
    },

    refillHearts() {
      this.hearts = this.maxHearts
      this.saveToStorage()
    },

    recordExerciseAttempt(attempt: ExerciseAttempt) {
      if (!this.exerciseHistory) {
        this.exerciseHistory = []
      }
      this.exerciseHistory.unshift(attempt)
      if (this.exerciseHistory.length > 300) {
        this.exerciseHistory = this.exerciseHistory.slice(0, 300)
      }
      this.saveToStorage()
    },

    buyHeartRefill(cost: number = 20) {
      if ((this.coins || 0) < cost) {
        throw new Error(`Koin kamu belum cukup! Kamu butuh ${cost} Koin untuk isi nyawa.`)
      }
      this.coins -= cost
      this.refillHearts()
    },

    completeLesson(lessonId: string, xpEarned: number = 20, courseId?: string) {
      const activeCourse = courseId || 'counting_101'
      if (!this.completedLessonsByCourse[activeCourse]) {
        this.completedLessonsByCourse[activeCourse] = []
      }
      if (!this.completedLessonsByCourse[activeCourse].includes(lessonId)) {
        this.completedLessonsByCourse[activeCourse].push(lessonId)
      }

      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId)
      }

      this.addXP(xpEarned)
      this.addCoins(10)
      this.updateStreak()
      this.updateQuestProgress('complete_lessons', 1)
      this.updateQuestProgress('perfect_score', 1)
      this.saveToStorage({ lastCompletedLessonId: lessonId, xpEarned, courseId: activeCourse })
    },

    completeCheckpoint(checkpointId: string, xpEarned: number = 50, courseId?: string) {
      const activeCourse = courseId || 'counting_101'
      if (!this.completedCheckpointsByCourse[activeCourse]) {
        this.completedCheckpointsByCourse[activeCourse] = []
      }
      if (!this.completedCheckpointsByCourse[activeCourse].includes(checkpointId)) {
        this.completedCheckpointsByCourse[activeCourse].push(checkpointId)
      }

      if (!this.completedCheckpoints.includes(checkpointId)) {
        this.completedCheckpoints.push(checkpointId)
      }

      this.addXP(xpEarned)
      this.addCoins(25)
      this.updateStreak()
      this.saveToStorage({ lastCompletedCheckpointId: checkpointId, xpEarned, courseId: activeCourse })
    },

    addToSpacedRepetition(exerciseId: string) {
      if (!this.spacedRepetitionQueue.includes(exerciseId)) {
        this.spacedRepetitionQueue.push(exerciseId)
        this.saveToStorage()
      }
    },

    updateStreak() {
      const today = new Date().toDateString()
      const lastDate = this.lastActiveDate ? new Date(this.lastActiveDate).toDateString() : null

      if (!lastDate) {
        this.streak = 1
      } else if (lastDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        if (lastDate === yesterday.toDateString()) {
          this.streak++
        } else {
          this.streak = 1
        }
      }
      this.lastActiveDate = new Date().toISOString()
    },

    resetCourseProgress(courseId: string) {
      if (courseId) {
        const oldCourseLessons = this.completedLessonsByCourse[courseId] || []
        const oldCourseCPs = this.completedCheckpointsByCourse[courseId] || []

        this.completedLessonsByCourse[courseId] = []
        this.completedCheckpointsByCourse[courseId] = []

        this.completedLessons = this.completedLessons.filter(id => !oldCourseLessons.includes(id))
        this.completedCheckpoints = this.completedCheckpoints.filter(id => !oldCourseCPs.includes(id))
      }
      this.saveToStorage()
    },

    resetProgress() {
      this.xp = 0
      this.coins = 100
      this.hearts = 5
      this.maxHearts = 5
      this.streak = 1
      this.completedLessons = []
      this.completedCheckpoints = []
      this.completedLessonsByCourse = {}
      this.completedCheckpointsByCourse = {}
      this.spacedRepetitionQueue = []
      this.exerciseHistory = []
      if (import.meta.client) {
        try {
          localStorage.clear()
          sessionStorage.clear()
        } catch (e) {}
        this.saveToStorage()
      }
    },

    rebuildFlatCompletedArrays() {
      const lessonsSet = new Set<string>()
      Object.values(this.completedLessonsByCourse || {}).forEach(arr => {
        if (Array.isArray(arr)) arr.forEach(id => lessonsSet.add(id))
      })
      this.completedLessons = Array.from(lessonsSet)

      const cpsSet = new Set<string>()
      Object.values(this.completedCheckpointsByCourse || {}).forEach(arr => {
        if (Array.isArray(arr)) arr.forEach(id => cpsSet.add(id))
      })
      this.completedCheckpoints = Array.from(cpsSet)
    },

    async fetchProgressFromDatabase() {
      if (!this.currentUser || this.currentUser.role === 'guest') return
      try {
        const res = await $fetch<{ success: boolean; progress: any }>('/api/progress/me', {
          query: { userId: this.currentUser.id, email: this.currentUser.email }
        })
        if (res && res.success && res.progress) {
          if (res.progress.xp !== undefined) this.xp = res.progress.xp
          if (res.progress.hearts !== undefined) this.hearts = res.progress.hearts
          if (res.progress.streak !== undefined) this.streak = res.progress.streak
          if (res.progress.subscriptionTier) this.subscriptionTier = res.progress.subscriptionTier
          if (res.progress.subscriptionExpiresAt !== undefined) this.subscriptionExpiresAt = res.progress.subscriptionExpiresAt
          if (res.progress.completedLessonsByCourse) this.completedLessonsByCourse = res.progress.completedLessonsByCourse
          if (res.progress.completedCheckpointsByCourse) this.completedCheckpointsByCourse = res.progress.completedCheckpointsByCourse

          this.rebuildFlatCompletedArrays()
          this.saveToStorage()
        }
      } catch (err: any) {
        if (err.statusCode === 401 || err.status === 401 || err.data?.statusCode === 401) {
          await this.handleSessionExpired(true)
        } else {
          console.warn('[POSTGRESQL] Could not sync progress from DB:', err)
        }
      }
    },

    loadFromStorage() {
      if (import.meta.client) {
        const saved = localStorage.getItem('duo_user_progress')
        if (saved) {
          try {
            const data = JSON.parse(saved)
            this.currentUser = data.currentUser ?? null
            this.isAuthenticated = data.isAuthenticated ?? false
            this.subscriptionTier = data.subscriptionTier ?? 'FREE'
            this.subscriptionExpiresAt = data.subscriptionExpiresAt ?? null
            this.xp = data.xp ?? 0
            this.hearts = data.hearts ?? 5
            this.streak = data.streak ?? 1
            this.completedLessonsByCourse = data.completedLessonsByCourse ?? {}
            this.completedCheckpointsByCourse = data.completedCheckpointsByCourse ?? {}
            this.completedLessons = data.completedLessons ?? []
            this.completedCheckpoints = data.completedCheckpoints ?? []
            this.spacedRepetitionQueue = data.spacedRepetitionQueue ?? []
            this.unlockedItems = data.unlockedItems ?? ['hat_none', 'acc_none', 'avatar_kiko']
            this.equippedHat = data.equippedHat ?? 'hat_none'
            this.equippedAccessory = data.equippedAccessory ?? 'acc_none'
            this.equippedAvatar = data.equippedAvatar ?? 'avatar_kiko'
            this.streakFreezeCount = data.streakFreezeCount ?? 0
            this.weeklyXP = data.weeklyXP ?? 120
            this.coins = data.coins ?? Math.max(100, Math.floor((data.xp ?? 100) / 2))
            this.lastQuestResetDate = data.lastQuestResetDate ?? new Date().toDateString()
            this.dailyQuests = data.dailyQuests ?? createDefaultDailyQuests()
            this.claimedChests = data.claimedChests ?? []
            this.exerciseHistory = data.exerciseHistory ?? []

            this.rebuildFlatCompletedArrays()
            this.checkAndResetDailyQuests()
          } catch (e) {
            console.error('Failed to parse user storage:', e)
          }
        }

        if (this.isAuthenticated && this.currentUser && this.currentUser.role !== 'guest') {
          this.fetchProgressFromDatabase()
        }
      }
    },

    async upgradeToPro(tier: 'PRO' | 'FAMILY' = 'PRO', months: number = 12) {
      this.subscriptionTier = tier
      let baseDate = new Date()
      if (this.subscriptionExpiresAt && new Date(this.subscriptionExpiresAt).getTime() > Date.now()) {
        baseDate = new Date(this.subscriptionExpiresAt)
      }
      baseDate.setMonth(baseDate.getMonth() + months)
      this.subscriptionExpiresAt = baseDate.toISOString()
      this.refillHearts()
      this.saveToStorage()

      if (import.meta.client && this.currentUser && this.currentUser.role !== 'guest' && this.isAuthenticated) {
        try {
          const res = await $fetch<any>('/api/subscription/subscribe', {
            method: 'POST',
            body: {
              userId: this.currentUser.id,
              tier: 'PRO',
              durationMonths: months,
              amount: 99000,
              paymentMethod: 'qris'
            }
          })
          if (res?.user?.subscriptionExpiresAt) {
            this.subscriptionExpiresAt = res.user.subscriptionExpiresAt
            this.saveToStorage()
          }
        } catch (e) {
          console.warn('[SUBSCRIPTION] Could not sync to DB:', e)
        }
      }
      return true
    },

    async downgradeToFree() {
      this.subscriptionTier = 'FREE'
      this.subscriptionExpiresAt = null
      this.saveToStorage()

      if (import.meta.client && this.currentUser && this.currentUser.role !== 'guest' && this.isAuthenticated) {
        try {
          await $fetch('/api/subscription/cancel', {
            method: 'POST',
            body: {
              userId: this.currentUser.id
            }
          })
        } catch (e) {
          console.warn('[SUBSCRIPTION] Cancel sync error:', e)
        }
      }
    },

    async toggleProTestMode() {
      if (this.isPro && this.subscriptionTier !== 'FREE') {
        await this.downgradeToFree()
      } else {
        await this.upgradeToPro('PRO', 12)
      }
    },

    claimChest(chestId: string, xpBonus: number = 30) {
      if (!this.claimedChests.includes(chestId)) {
        this.claimedChests.push(chestId)
      }
      this.addXP(xpBonus)
      this.addCoins(30)
      this.saveToStorage({ xpEarned: xpBonus })
    },

    buyItem(itemId: string, price: number) {
      if ((this.coins || 0) < price) {
        throw new Error(`Koin kamu belum cukup! Kamu butuh ${price} Koin.`)
      }
      this.coins -= price
      if (!this.unlockedItems.includes(itemId)) {
        this.unlockedItems.push(itemId)
      }
      this.saveToStorage()
    },

    equipItem(category: 'hat' | 'accessory' | 'avatar', itemId: string) {
      if (category === 'hat') this.equippedHat = itemId
      if (category === 'accessory') this.equippedAccessory = itemId
      if (category === 'avatar') this.equippedAvatar = itemId
      this.saveToStorage()
    },

    buyStreakFreeze(price: number = 50) {
      if ((this.coins || 0) < price) {
        throw new Error(`Koin kamu belum cukup! Kamu butuh ${price} Koin.`)
      }
      this.coins -= price
      this.streakFreezeCount += 1
      this.saveToStorage()
    },

    async saveToStorage(extraData?: { lastCompletedLessonId?: string; lastCompletedCheckpointId?: string; xpEarned?: number; courseId?: string }) {
      if (import.meta.client) {
        const payload = {
          currentUser: this.currentUser,
          isAuthenticated: this.isAuthenticated,
          subscriptionTier: this.subscriptionTier,
          subscriptionExpiresAt: this.subscriptionExpiresAt,
          xp: this.xp,
          weeklyXP: this.weeklyXP,
          coins: this.coins,
          hearts: this.hearts,
          streak: this.streak,
          completedLessonsByCourse: this.completedLessonsByCourse,
          completedCheckpointsByCourse: this.completedCheckpointsByCourse,
          completedLessons: this.completedLessons,
          completedCheckpoints: this.completedCheckpoints,
          spacedRepetitionQueue: this.spacedRepetitionQueue,
          unlockedItems: this.unlockedItems,
          equippedHat: this.equippedHat,
          equippedAccessory: this.equippedAccessory,
          equippedAvatar: this.equippedAvatar,
          streakFreezeCount: this.streakFreezeCount,
          lastQuestResetDate: this.lastQuestResetDate,
          dailyQuests: this.dailyQuests,
          claimedChests: this.claimedChests,
          exerciseHistory: this.exerciseHistory
        }
        localStorage.setItem('duo_user_progress', JSON.stringify(payload))

        // Sync directly to PostgreSQL database if logged in and authenticated
        if (this.currentUser && this.currentUser.role !== 'guest' && this.isAuthenticated) {
          try {
            await $fetch('/api/progress/save', {
              method: 'POST',
              body: {
                userId: this.currentUser.id,
                email: this.currentUser.email,
                xp: this.xp,
                hearts: this.hearts,
                streak: this.streak,
                completedLessonsByCourse: this.completedLessonsByCourse,
                completedCheckpointsByCourse: this.completedCheckpointsByCourse,
                ...(extraData || {})
              }
            })
          } catch (err: any) {
            if (err.statusCode === 401 || err.status === 401 || err.data?.statusCode === 401) {
              await this.handleSessionExpired(false)
            }
          }
        }
      }
    }
  }
})
