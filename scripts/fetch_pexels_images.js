import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PEXELS_API_KEY = 'THDdr4NLwNrEYzLSgysPwlij0lIeIuXRnmLrt0eIVwPz8jT8DRMIFEwh'
const OUTPUT_DIR = path.join(__dirname, '../public/images/pexels')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Map keywords to search term & target filename
const IMAGE_SUBJECTS = {
  gajah: 'cute elephant',
  singa: 'cute lion',
  semut: 'ant macro',
  kepik: 'ladybug',
  bebek: 'cute duck',
  ayam: 'cute chicken rooster',
  kucing: 'cute cat kitten',
  kelinci: 'cute rabbit bunny',
  kupu_kupu: 'butterfly flower',
  lebah: 'cute bee',
  sapi: 'cute cow',
  zebra: 'cute zebra',
  jerapah: 'cute giraffe',
  apel: 'red apple',
  pisang: 'yellow banana',
  jeruk: 'fresh orange fruit',
  semangka: 'watermelon slice',
  stroberi: 'fresh strawberry'
}

function fetchPexelsImageUrl(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`
    const req = https.get(url, {
      headers: {
        'Authorization': PEXELS_API_KEY,
        'User-Agent': 'EdTech-Pexels-Downloader/1.0'
      }
    }, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          if (json.photos && json.photos.length > 0) {
            // Use 'medium' or 'small' size (NOT HD, fast loading)
            const photoUrl = json.photos[0].src.medium || json.photos[0].src.small || json.photos[0].src.tiny
            resolve(photoUrl)
          } else {
            resolve(null)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
    req.on('error', reject)
  })
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject)
      }
      const fileStream = fs.createWriteStream(destPath)
      res.pipe(fileStream)
      fileStream.on('finish', () => {
        fileStream.close()
        resolve(true)
      })
    }).on('error', reject)
  })
}

async function main() {
  console.log('🖼️ Fetching compressed images from Pexels API...')
  const downloadedMap = {}

  for (const [key, searchKeyword] of Object.entries(IMAGE_SUBJECTS)) {
    const filePath = path.join(OUTPUT_DIR, `${key}.jpg`)
    const publicUrl = `/images/pexels/${key}.jpg`

    if (fs.existsSync(filePath)) {
      console.log(`- Local image for "${key}" already exists: ${publicUrl}`)
      downloadedMap[key] = publicUrl
      continue
    }

    try {
      console.log(`- Searching Pexels for "${searchKeyword}" (${key})...`)
      const imgUrl = await fetchPexelsImageUrl(searchKeyword)
      if (imgUrl) {
        await downloadImage(imgUrl, filePath)
        console.log(`  ✅ Downloaded compressed image: ${publicUrl}`)
        downloadedMap[key] = publicUrl
      } else {
        console.warn(`  ⚠️ No Pexels photo found for: ${searchKeyword}`)
      }
    } catch (err) {
      console.error(`  ❌ Error downloading "${key}":`, err.message)
    }

    // Friendly throttle to respect rate limits
    await new Promise(r => setTimeout(r, 400))
  }

  console.log('\n🔄 Enriching exercise JSON files with local Pexels image paths...')

  // 1. Update course_hewan_tk_sd.json
  const hewanPath = path.join(__dirname, '../data/course_hewan_tk_sd.json')
  const hewanData = JSON.parse(fs.readFileSync(hewanPath, 'utf8'))

  for (const unit of hewanData.course.units) {
    for (const lesson of (unit.lessons || [])) {
      for (const ex of (lesson.exercises || [])) {
        attachImageToExercise(ex, downloadedMap)
      }
    }
    if (unit.checkpoint && unit.checkpoint.exercises) {
      for (const ex of unit.checkpoint.exercises) {
        attachImageToExercise(ex, downloadedMap)
      }
    }
  }

  fs.writeFileSync(hewanPath, JSON.stringify(hewanData, null, 2), 'utf8')
  console.log('✅ Updated data/course_hewan_tk_sd.json with local image paths!')

  // 2. Update course_mengenal_angka_tk.json
  const angkaPath = path.join(__dirname, '../data/course_mengenal_angka_tk.json')
  const angkaData = JSON.parse(fs.readFileSync(angkaPath, 'utf8'))

  for (const unit of angkaData.course.units) {
    for (const lesson of (unit.lessons || [])) {
      for (const ex of (lesson.exercises || [])) {
        attachImageToExercise(ex, downloadedMap)
      }
    }
    if (unit.checkpoint && unit.checkpoint.exercises) {
      for (const ex of unit.checkpoint.exercises) {
        attachImageToExercise(ex, downloadedMap)
      }
    }
  }

  fs.writeFileSync(angkaPath, JSON.stringify(angkaData, null, 2), 'utf8')
  console.log('✅ Updated data/course_mengenal_angka_tk.json with local image paths!')

  // 3. Seed PostgreSQL database with updated JSONs
  console.log('\n⚡ Seeding PostgreSQL database with new image fields...')
  const prisma = new PrismaClient()
  try {
    await prisma.course.upsert({
      where: { id: hewanData.course.id },
      update: { units: hewanData.course.units },
      create: {
        id: hewanData.course.id,
        title: hewanData.course.title,
        description: hewanData.course.description,
        targetAudience: hewanData.course.target_audience,
        category: 'science',
        icon: '🦁',
        themeColor: 'amber',
        features: ['5 Unit Tematik Hewan', 'Suara & Habitat Hewan', 'Permainan Cari & Pasangkan'],
        isReady: true,
        units: hewanData.course.units
      }
    })

    await prisma.course.upsert({
      where: { id: angkaData.course.id },
      update: { units: angkaData.course.units },
      create: {
        id: angkaData.course.id,
        title: angkaData.course.title,
        description: angkaData.course.description,
        targetAudience: angkaData.course.target_audience,
        category: 'math',
        icon: '🎈',
        themeColor: 'sky',
        features: ['Hitung Benda', 'Pasang Angka', 'Ujian TK'],
        isReady: true,
        units: angkaData.course.units
      }
    })
    console.log('🎉 Database PostgreSQL successfully updated with local Pexels images!')
  } catch (e) {
    console.warn('⚠️ Database sync warning:', e.message)
  } finally {
    await prisma.$disconnect()
  }
}

function attachImageToExercise(ex, map) {
  const q = (ex.question || '').toLowerCase()
  const exp = (ex.explanation || '').toLowerCase()

  if (q.includes('gajah') && map.gajah) ex.image = map.gajah
  else if (q.includes('singa') && map.singa) ex.image = map.singa
  else if (q.includes('semut') && map.semut) ex.image = map.semut
  else if (q.includes('kepik') && map.kepik) ex.image = map.kepik
  else if (q.includes('bebek') && map.bebek) ex.image = map.bebek
  else if (q.includes('ayam') && map.ayam) ex.image = map.ayam
  else if (q.includes('kucing') && map.kucing) ex.image = map.kucing
  else if (q.includes('kelinci') && map.kelinci) ex.image = map.kelinci
  else if (q.includes('kupu-kupu') && map.kupu_kupu) ex.image = map.kupu_kupu
  else if (q.includes('lebah') && map.lebah) ex.image = map.lebah
  else if (q.includes('sapi') && map.sapi) ex.image = map.sapi
  else if (q.includes('zebra') && map.zebra) ex.image = map.zebra
  else if (q.includes('jerapah') && map.jerapah) ex.image = map.jerapah
  else if (q.includes('apel') && map.apel) ex.image = map.apel
  else if (q.includes('pisang') && map.pisang) ex.image = map.pisang
  else if (q.includes('jeruk') && map.jeruk) ex.image = map.jeruk
  else if (q.includes('semangka') && map.semangka) ex.image = map.semangka
  else if (q.includes('stroberi') && map.stroberi) ex.image = map.stroberi
}

main()
