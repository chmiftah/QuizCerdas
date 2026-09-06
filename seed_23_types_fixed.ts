import { PrismaClient } from '@prisma/client'
import course23Types from './data/course_23_types.json'

const prisma = new PrismaClient()

async function seedFixed23Course() {
  try {
    // Delete existing 'comprehensive_23_types' or clear all
    await prisma.course.deleteMany({
      where: {
        id: 'comprehensive_23_types'
      }
    })

    const c = course23Types.course

    await prisma.course.create({
      data: {
        id: c.id,
        title: c.title,
        description: c.description,
        targetAudience: c.target_audience,
        category: 'math',
        icon: '🎮',
        themeColor: 'green',
        features: ['24 Jenis Soal', 'Scaffolding 7 Level', 'Audio & Visual'],
        isReady: true,
        units: c.units
      }
    })

    console.log('✅ Course 24 Jenis Soal berhasil di-seed ulang dengan struktur JSON valid!')
  } catch (err) {
    console.error('❌ Error:', err)
  } finally {
    await prisma.$disconnect()
  }
}

seedFixed23Course()
