import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function seed() {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../data/course_hewan_tk_sd.json'), 'utf8')
    const parsed = JSON.parse(rawData)
    const course = parsed.course

    console.log(`Inserting course "${course.id}" (${course.title}) into database...`)

    const result = await prisma.course.upsert({
      where: { id: course.id },
      update: {
        title: course.title,
        description: course.description,
        targetAudience: course.target_audience,
        category: 'science',
        icon: '🦁',
        themeColor: 'amber',
        features: ['5 Unit Tematik Hewan', 'Suara & Habitat Hewan', 'Permainan Cari & Pasangkan'],
        isReady: true,
        units: course.units
      },
      create: {
        id: course.id,
        title: course.title,
        description: course.description,
        targetAudience: course.target_audience,
        category: 'science',
        icon: '🦁',
        themeColor: 'amber',
        features: ['5 Unit Tematik Hewan', 'Suara & Habitat Hewan', 'Permainan Cari & Pasangkan'],
        isReady: true,
        units: course.units
      }
    })

    console.log(`SUCCESS! Course "${result.id}" successfully inserted/updated in database.`)
  } catch (error) {
    console.error('ERROR SEEDING COURSE:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
