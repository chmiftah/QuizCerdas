import prisma from '../server/utils/prisma.ts'

async function testFetch() {
  try {
    console.log('Testing prisma.course.findMany()...')
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'asc' }
    })
    console.log(`Found ${courses.length} courses in database:`)
    courses.forEach(c => {
      console.log(`- [${c.id}] ${c.title} (Source: POSTGRESQL DB)`)
    })
  } catch (err) {
    console.error('Error fetching courses from DB:', err)
  } finally {
    await prisma.$disconnect()
  }
}

testFetch()
