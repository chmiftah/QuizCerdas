import { seedCoursesIfEmpty } from '../server/utils/seedCourses.ts'
import prisma from '../server/utils/prisma.ts'

async function runSeed() {
  console.log('Seeding courses into PostgreSQL database...')
  await seedCoursesIfEmpty()
  const courses = await prisma.course.findMany()
  console.log(`Successfully seeded ${courses.length} courses:`, courses.map(c => c.title))
  await prisma.$disconnect()
}

runSeed()
