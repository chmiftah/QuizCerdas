import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seedWithRetry(retries = 3) {
  console.log('[POSTGRESQL] Starting course catalog & quiz questions seeding...')

  const courseCountingPath = path.join(__dirname, '../data/course_counting.json')
  const courseAngkaTkPath = path.join(__dirname, '../data/course_mengenal_angka_tk.json')

  const courseCounting = JSON.parse(fs.readFileSync(courseCountingPath, 'utf8'))
  const courseAngkaTk = JSON.parse(fs.readFileSync(courseAngkaTkPath, 'utf8'))

  const courses = [
    {
      id: 'counting_101',
      title: courseCounting.course.title,
      description: courseCounting.course.description,
      targetAudience: courseCounting.course.target_audience,
      category: 'math',
      icon: '🔢',
      themeColor: 'green',
      features: ['🖐️ Berhitung Jari', '🔟 Ten Frame Grid', '👑 Checkpoint Test'],
      isReady: true,
      units: courseCounting.course.units
    },
    {
      id: 'mengenal_angka_tk',
      title: courseAngkaTk.course.title,
      description: courseAngkaTk.course.description,
      targetAudience: courseAngkaTk.course.target_audience,
      category: 'math',
      icon: '🎈',
      themeColor: 'sky',
      features: ['🐥 Hitung Benda', '⭐ Pasang Angka', '🎯 Ujian TK'],
      isReady: true,
      units: courseAngkaTk.course.units
    }
  ]

  for (let attempt = 1; attempt <= retries; attempt++) {
    const prisma = new PrismaClient()
    try {
      for (const c of courses) {
        const record = await prisma.course.upsert({
          where: { id: c.id },
          update: {
            title: c.title,
            description: c.description,
            targetAudience: c.targetAudience,
            category: c.category,
            icon: c.icon,
            themeColor: c.themeColor,
            features: c.features,
            isReady: c.isReady,
            units: c.units
          },
          create: {
            id: c.id,
            title: c.title,
            description: c.description,
            targetAudience: c.targetAudience,
            category: c.category,
            icon: c.icon,
            themeColor: c.themeColor,
            features: c.features,
            isReady: c.isReady,
            units: c.units
          }
        })
        console.log(`[POSTGRESQL] Seeded course "${record.title}" (ID: ${record.id})`)
      }

      const allInDb = await prisma.course.findMany({ select: { id: true, title: true } })
      console.log(`[POSTGRESQL] SUCCESS! Database now contains ${allInDb.length} courses with full quiz data:`, allInDb)
      await prisma.$disconnect()
      return
    } catch (err) {
      console.warn(`[POSTGRESQL] Attempt ${attempt} failed: ${err.message}`)
      await prisma.$disconnect().catch(() => {})
      if (attempt === retries) throw err
      await new Promise(r => setTimeout(r, 1500))
    }
  }
}

seedWithRetry().catch(err => {
  console.error('[POSTGRESQL] Final Seeding Error:', err)
  process.exit(1)
})
