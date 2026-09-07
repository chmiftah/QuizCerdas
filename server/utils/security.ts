import { RateLimiterMemory } from 'rate-limiter-flexible'
import crypto from 'crypto'

// Rate limiter: max 10 requests per 10 seconds for auth endpoints
const authLimiter = new RateLimiterMemory({
  points: 10,
  duration: 10,
})

// General API rate limiter: max 100 requests per 60 seconds
const generalLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
})

export async function checkRateLimit(event: any, type: 'auth' | 'general' = 'general') {
  const ip = getHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress || '127.0.0.1'
  const limiter = type === 'auth' ? authLimiter : generalLimiter

  try {
    await limiter.consume(ip)
  } catch (rejRes) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.'
    })
  }
}

// Cryptographically secure, stateless session token generator & validator
// Persists sessions across server restarts and Nitro worker reloads
const SESSION_SECRET = process.env.SESSION_SECRET || 'duo_edtech_hmac_secret_salt_2026_x9k2p'
const revokedTokens = new Set<string>()

export interface SessionData {
  userId: string
  email: string
  expiresAt: number
}

export function createSessionToken(userId: string, email: string): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours validity
  const payload = {
    userId,
    email,
    expiresAt,
    issuedAt: Date.now()
  }
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url')
  return `${data}.${signature}`
}

export function validateSessionToken(token?: string): SessionData | null {
  if (!token || typeof token !== 'string') return null
  if (revokedTokens.has(token)) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [data, signature] = parts

  try {
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url')
    const sigBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expectedSig)

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null
    }

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'))
    if (!payload.userId || !payload.expiresAt || typeof payload.expiresAt !== 'number') {
      return null
    }

    if (Date.now() > payload.expiresAt) {
      return null
    }

    return {
      userId: payload.userId,
      email: payload.email,
      expiresAt: payload.expiresAt
    }
  } catch {
    return null
  }
}

export function destroySessionToken(token?: string) {
  if (token) {
    revokedTokens.add(token)
  }
}

