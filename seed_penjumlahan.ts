import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const json = JSON.parse(fs.readFileSync('./data/course_penjumlahan_buah.json', 'utf-8'))
  const c = json.course
  
  await prisma.course.upsert({
    where: { id: c.id },
    update: {
      title: c.title,
      description: c.description,
      targetAudience: c.target_audience,
      category: c.category,
      icon: '🍎',
      themeColor: 'green',
      features: ['10 Soal dari Worksheet Nyata', 'Penjumlahan Bergambar Buah', '3 Pelajaran Bertingkat', 'Ujian Akhir'],
      isReady: true,
      units: c.units
    },
    create: {
      id: c.id,
      title: c.title,
      description: c.description,
      targetAudience: c.target_audience,
      category: c.category,
      icon: '🍎',
      themeColor: 'green',
      features: ['10 Soal dari Worksheet Nyata', 'Penjumlahan Bergambar Buah', '3 Pelajaran Bertingkat', 'Ujian Akhir'],
      isReady: true,
      units: c.units
    }
  })
  console.log('✅ Course Penjumlahan Buah berhasil dimasukkan ke PostgreSQL!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
