import prisma from '../server/utils/prisma.ts'
import bcrypt from 'bcryptjs'

async function createTestUser() {
  const email = 'budi.siswa@duo.id'
  const hashedPassword = await bcrypt.hash('siswa123', 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword
    },
    create: {
      name: 'Budi Pratama',
      username: 'budipratama',
      email: email,
      password: hashedPassword,
      avatar: '🦉',
      grade: 'Kelas 1 SD',
      dailyGoalMinutes: 10,
      xp: 150,
      hearts: 5,
      streak: 3
    }
  })

  console.log('User created/verified in PostgreSQL:', user.email, 'ID:', user.id)
  await prisma.$disconnect()
}

createTestUser()
