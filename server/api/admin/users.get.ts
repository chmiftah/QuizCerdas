import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        grade: true,
        role: true,
        xp: true,
        hearts: true,
        streak: true,
        createdAt: true,
        completedLessonsByCourse: true
      }
    })

    const formattedUsers = users.map(u => {
      const lessonsMap = (u.completedLessonsByCourse as Record<string, string[]>) || {}
      let totalLessons = 0
      Object.values(lessonsMap).forEach(arr => {
        if (Array.isArray(arr)) totalLessons += arr.length
      })

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar || '🦉',
        role: u.role || 'student',
        xp: u.xp || 0,
        hearts: u.hearts || 5,
        streak: u.streak || 1,
        grade: u.grade || 'Kelas 1 SD',
        registeredAt: u.createdAt.toISOString().split('T')[0],
        completedLessonsCount: totalLessons
      }
    })

    console.log(`[POSTGRESQL ADMIN] Served ${formattedUsers.length} users from database`)
    return {
      success: true,
      source: 'postgresql',
      users: formattedUsers
    }
  } catch (error: any) {
    console.warn('[POSTGRESQL ADMIN] Error fetching users from DB:', error.message)
    return {
      success: false,
      message: error.message,
      users: []
    }
  }
})
