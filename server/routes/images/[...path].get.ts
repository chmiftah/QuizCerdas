import fs from 'fs'
import path from 'path'
import { defineEventHandler, createError, sendStream } from 'h3'

export default defineEventHandler((event) => {
  const reqPath = event.context.params?.path || ''
  const filePath = path.join(process.cwd(), 'public/images', reqPath)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase()
    let contentType = 'image/jpeg'
    if (ext === '.png') contentType = 'image/png'
    else if (ext === '.webp') contentType = 'image/webp'
    else if (ext === '.svg') contentType = 'image/svg+xml'

    event.node.res.setHeader('Content-Type', contentType)
    event.node.res.setHeader('Cache-Control', 'public, max-age=86400')
    return sendStream(event, fs.createReadStream(filePath))
  }

  throw createError({
    statusCode: 404,
    statusMessage: `Image not found: ${reqPath}`
  })
})
