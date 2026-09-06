import { checkRateLimit } from '../utils/security'

export default defineEventHandler(async (event) => {
  // Apply rate limiting to all /api/ requests
  if (event.path.startsWith('/api/')) {
    const isAuthRequest = event.path.includes('/api/auth/')
    await checkRateLimit(event, isAuthRequest ? 'auth' : 'general')
  }
})
