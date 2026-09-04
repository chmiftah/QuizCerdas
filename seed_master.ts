import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const json = JSON.parse(fs.readFileSync('./data/course_master_13_types.json', 'utf-8'))
  const c = json.course
  
  await prisma.course.upsert({
    where: { id: c.id },
    update: {
      title: c.title,
      description: c.description,
      targetAudience: c.target_audience,
      category: c.category,
      icon: '🕹️',
      themeColor: 'red',
      features: ['Menampilkan 13 Tipe Soal', 'Seret & Lepas', 'Tarik Garis', 'Soal Bergambar'],
      isReady: true,
      units: c.units
    },
    create: {
      id: c.id,
      title: c.title,
      description: c.description,
      targetAudience: c.target_audience,
      category: c.category,
      icon: '🕹️',
      themeColor: 'red',
      features: ['Menampilkan 13 Tipe Soal', 'Seret & Lepas', 'Tarik Garis', 'Soal Bergambar'],
      isReady: true,
      units: c.units
    }
  })
  console.log('Successfully inserted Master Showcase course into PostgreSQL!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
