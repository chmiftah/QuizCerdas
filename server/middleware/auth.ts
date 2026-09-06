import { validateSessionToken } from '../utils/security'

export default defineEventHandler(async (event) => {
  const protectedPaths = [
    '/api/progress/save',
    '/api/progress/me',
    '/api/admin/'
  ]

  const isProtected = protectedPaths.some(path => event.path.startsWith(path))

  if (isProtected) {
    const token = getCookie(event, 'auth_session')
    const session = validateSessionToken(token)

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Sesi tidak valid atau sudah kadaluarsa. Silakan login kembali.'
      })
    }

    event.context.auth = {
      userId: session.userId,
      email: session.email
    }
  }
})
