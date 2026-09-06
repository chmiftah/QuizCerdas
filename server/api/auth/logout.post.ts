import { destroySessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  
  if (token) {
    destroySessionToken(token)
  }

  deleteCookie(event, 'auth_session')

  return {
    success: true,
    message: 'Berhasil keluar dari akun'
  }
})
