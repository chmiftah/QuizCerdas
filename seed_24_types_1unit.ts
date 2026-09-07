import { PrismaClient } from '@prisma/client'
import course24Data from './data/course_24_types_1unit.json'

const prisma = new PrismaClient()

async function seed24Types1UnitCourse() {
  try {
    const c = course24Data.course

    await prisma.course.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.description,
        targetAudience: c.target_audience,
        category: 'math',
        icon: '🏆',
        themeColor: 'green',
        features: ['1 Unit Praktis', '29 Jenis Soal Lengkap', 'Marathon & Sesi Bertahap'],
        isReady: true,
        units: c.units
      },
      create: {
        id: c.id,
        title: c.title,
        description: c.description,
        targetAudience: c.target_audience,
        category: 'math',
        icon: '🏆',
        themeColor: 'green',
        features: ['1 Unit Praktis', '29 Jenis Soal Lengkap', 'Marathon & Sesi Bertahap'],
        isReady: true,
        units: c.units
      }
    })

    console.log('✅ Course 1 Unit 29 Jenis Soal berhasil di-seed!')
  } catch (err) {
    console.error('❌ Error seeding course_24_types_1unit:', err)
  } finally {
    await prisma.$disconnect()
  }
}

seed24Types1UnitCourse()
