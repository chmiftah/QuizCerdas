import prisma from '../server/utils/prisma.ts'

async function main() {
  console.log('Testing connection to PostgreSQL...')
  try {
    const users = await prisma.user.findMany()
    console.log('Users in DB:', users)
    const courses = await prisma.course.findMany()
    console.log('Courses in DB:', courses)
  } catch (err) {
    console.error('Database query error:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
