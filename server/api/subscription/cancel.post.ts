import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  const body = await readBody(event)

  let targetUserId = body?.userId

  if (token) {
    const session = validateSessionToken(token)
    if (session && session.userId) {
      targetUserId = session.userId
    }
  }

  if (!targetUserId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UserId atau Sesi login diperlukan untuk membatalkan langganan'
    })
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        subscriptionTier: 'FREE',
        subscriptionExpiresAt: null
      }
    })

    // Also update any active subscription record to cancelled
    await prisma.subscription.updateMany({
      where: {
        userId: targetUserId,
        status: 'active'
      },
      data: {
        status: 'cancelled'
      }
    })

    console.log(`[POSTGRESQL] User ${targetUserId} subscription cancelled`)

    return {
      success: true,
      message: 'Langganan QuizCerdas Pro berhasil dibatalkan.',
      user: {
        id: updatedUser.id,
        subscriptionTier: updatedUser.subscriptionTier,
        subscriptionExpiresAt: null
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Cancel Subscription Error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal membatalkan langganan: ${error.message}`
    })
  }
})
