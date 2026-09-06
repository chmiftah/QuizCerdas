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

// In-memory / stateless token generator and validator for secure session management
const activeSessions = new Map<string, { userId: string; email: string; expiresAt: number }>()

export function createSessionToken(userId: string, email: string): string {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  activeSessions.set(token, { userId, email, expiresAt })
  return token
}

export function validateSessionToken(token?: string) {
  if (!token) return null
  const session = activeSessions.get(token)
  if (!session) return null
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token)
    return null
  }
  return session
}

export function destroySessionToken(token?: string) {
  if (token) {
    activeSessions.delete(token)
  }
}
