import { defineStore } from 'pinia'

export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  role: 'student' | 'admin' | 'parent'
  xp: number
  hearts: number
  streak: number
  grade: string
  registeredAt: string
  completedLessonsCount: number
}

export interface AdminShopItem {
  id: string
  name: string
  category: 'hat' | 'accessory' | 'avatar'
  icon: string
  price: number
  description: string
  color: string
}

export interface AdminSticker {
  id: string
  name: string
  category: string
  icon: string
  rarity: 'Common' | 'Rare' | 'Legendary'
  description: string
}

export interface AdminState {
  users: AdminUser[]
  customShopItems: AdminShopItem[]
  customStickers: AdminSticker[]
  customCourses: any[]
  isLoaded: boolean
}

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    users: [
      {
        id: 'usr_1',
        name: 'Budi Santoso',
        email: 'budi@gmail.com',
        avatar: '🦁',
        role: 'student',
        xp: 450,
        hearts: 5,
        streak: 4,
        grade: 'TK B',
        registeredAt: '2026-08-20',
        completedLessonsCount: 8
      },
      {
        id: 'usr_2',
        name: 'Siti Rahma',
        email: 'siti@gmail.com',
        avatar: '🐱',
        role: 'student',
        xp: 820,
        hearts: 4,
        streak: 7,
        grade: 'Kelas 1 SD',
        registeredAt: '2026-08-15',
        completedLessonsCount: 14
      },
      {
        id: 'usr_3',
        name: 'Admin Utama',
        email: 'admin@countingduo.id',
        avatar: '🛡️',
        role: 'admin',
        xp: 1500,
        hearts: 5,
        streak: 12,
        grade: 'Pengelola',
        registeredAt: '2026-08-01',
        completedLessonsCount: 25
      },
      {
        id: 'usr_4',
        name: 'Orang Tua Budi',
        email: 'ortubudi@gmail.com',
        avatar: '👨‍👩‍👧',
        role: 'parent',
        xp: 120,
        hearts: 5,
        streak: 2,
        grade: 'Orang Tua',
        registeredAt: '2026-08-22',
        completedLessonsCount: 2
      }
    ],
    customShopItems: [
      {
        id: 'hat_crown',
        name: 'Mahkota Emas Raja',
        category: 'hat',
        icon: '👑',
        price: 200,
        description: 'Mahkota megah berkarisma untuk Kiko sang Raja!',
        color: 'from-amber-400 to-yellow-500'
      },
      {
        id: 'acc_sunglasses',
        name: 'Kacamata Hitam Keren',
        category: 'accessory',
        icon: '🕶️',
        price: 150,
        description: 'Tampil gaya dan stylish di setiap kuis!',
        color: 'from-slate-700 to-slate-900'
      },
      {
        id: 'avatar_robot',
        name: 'Kiko Robot Masa Depan',
        category: 'avatar',
        icon: '🤖',
        price: 350,
        description: 'Ubah Kiko menjadi robot canggih pencetus angka!',
        color: 'from-sky-400 to-blue-600'
      }
    ],
    customStickers: [
      {
        id: 'stk_1',
        name: 'Bintang Utama 1',
        category: 'Angka',
        icon: '⭐',
        rarity: 'Common',
        description: 'Hadiah menyelesaikan kuis angka pertama kali.'
      },
      {
        id: 'stk_2',
        name: 'Kucing Jenius 🐱',
        category: 'Hewan',
        icon: '🐱',
        rarity: 'Rare',
        description: 'Stiker eksklusif untuk kuis dunia hewan.'
      },
      {
        id: 'stk_3',
        name: 'Mahkota Juara 🏆',
        category: 'Prestasi',
        icon: '🏆',
        rarity: 'Legendary',
        description: 'Diberikan kepada siswa dengan streak di atas 7 hari.'
      }
    ],
    customCourses: [],
    isLoaded: false
  }),

  getters: {
    totalUsers: (state) => state.users.length,
    totalStudents: (state) => state.users.filter(u => u.role === 'student').length,
    totalAdmins: (state) => state.users.filter(u => u.role === 'admin').length,
    totalXPGranted: (state) => state.users.reduce((acc, u) => acc + u.xp, 0),

    getShopItemsByCategory: (state) => (cat: 'hat' | 'accessory' | 'avatar') => {
      return state.customShopItems.filter(i => i.category === cat)
    }
  },

  actions: {
    async fetchUsersFromDatabase() {
      try {
        const res = await $fetch<{ success: boolean; users: AdminUser[] }>('/api/admin/users')
        if (res && res.success && Array.isArray(res.users) && res.users.length > 0) {
          this.users = res.users
          this.saveToStorage()
        }
      } catch (err) {
        console.warn('[ADMIN STORE] Could not fetch users from backend DB, using cached state:', err)
      }
    },

    loadFromStorage() {
      if (this.isLoaded) return
      if (import.meta.client) {
        const saved = localStorage.getItem('duo_admin_store')
        if (saved) {
          try {
            const data = JSON.parse(saved)
            if (data.users && data.users.length) this.users = data.users
            if (data.customShopItems && data.customShopItems.length) this.customShopItems = data.customShopItems
            if (data.customStickers && data.customStickers.length) this.customStickers = data.customStickers
            if (data.customCourses) this.customCourses = data.customCourses
          } catch (e) {
            console.error('Failed loading admin store from localStorage:', e)
          }
        }
        this.isLoaded = true
        this.fetchUsersFromDatabase()
      }
    },

    saveToStorage() {
      if (import.meta.client) {
        const payload = {
          users: this.users,
          customShopItems: this.customShopItems,
          customStickers: this.customStickers,
          customCourses: this.customCourses
        }
        localStorage.setItem('duo_admin_store', JSON.stringify(payload))
      }
    },

    // --- User Actions ---
    async updateUserRole(userId: string, newRole: 'student' | 'admin' | 'parent') {
      const u = this.users.find(x => x.id === userId)
      if (u) {
        u.role = newRole
        this.saveToStorage()
      }
      try {
        await $fetch('/api/admin/user-update', {
          method: 'POST',
          body: { userId, action: 'update_role', role: newRole }
        })
      } catch (e) {
        // Silent catch for DB sync
      }
    },

    async updateUserXP(userId: string, newXP: number) {
      const u = this.users.find(x => x.id === userId)
      if (u) {
        u.xp = Math.max(0, newXP)
        this.saveToStorage()
      }
      try {
        await $fetch('/api/admin/user-update', {
          method: 'POST',
          body: { userId, action: 'update_xp', xp: newXP }
        })
      } catch (e) {
        // Silent catch for DB sync
      }
    },

    async deleteUser(userId: string) {
      this.users = this.users.filter(x => x.id !== userId)
      this.saveToStorage()
      try {
        await $fetch('/api/admin/user-update', {
          method: 'POST',
          body: { userId, action: 'delete' }
        })
      } catch (e) {
        // Silent catch for DB sync
      }
    },

    addUser(newUser: Omit<AdminUser, 'id' | 'registeredAt'>) {
      const user: AdminUser = {
        ...newUser,
        id: `usr_${Date.now()}`,
        registeredAt: new Date().toISOString().split('T')[0]
      }
      this.users.unshift(user)
      this.saveToStorage()
    },

    // --- Shop Actions ---
    addShopItem(item: Omit<AdminShopItem, 'id'>) {
      const newItem: AdminShopItem = {
        ...item,
        id: `${item.category}_${Date.now()}`
      }
      this.customShopItems.unshift(newItem)
      this.saveToStorage()
    },

    deleteShopItem(itemId: string) {
      this.customShopItems = this.customShopItems.filter(i => i.id !== itemId)
      this.saveToStorage()
    },

    // --- Sticker Actions ---
    addSticker(sticker: Omit<AdminSticker, 'id'>) {
      const newSticker: AdminSticker = {
        ...sticker,
        id: `stk_${Date.now()}`
      }
      this.customStickers.unshift(newSticker)
      this.saveToStorage()
    },

    deleteSticker(stickerId: string) {
      this.customStickers = this.customStickers.filter(s => s.id !== stickerId)
      this.saveToStorage()
    },

    // --- Course Actions ---
    async addCustomCourse(courseData: any) {
      this.customCourses.unshift(courseData)
      this.saveToStorage()
      try {
        await $fetch('/api/admin/course-save', {
          method: 'POST',
          body: { course: courseData }
        })
      } catch (e) {
        console.warn('[ADMIN STORE] Course saved locally, DB sync error:', e)
      }
    }
  }
})
