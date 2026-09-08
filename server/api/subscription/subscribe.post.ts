import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  const body = await readBody(event)

  let targetUserId = body?.userId

  // If token exists, validate session
  if (token) {
    const session = validateSessionToken(token)
    if (session && session.userId) {
      targetUserId = session.userId
    }
  }

  if (!targetUserId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UserId atau Sesi login diperlukan untuk aktivasi langganan'
    })
  }

  const tier = body?.tier === 'PRO' ? 'PRO' : 'PRO'
  const durationMonths = Number(body?.durationMonths) || 12
  const paymentMethod = body?.paymentMethod || 'qris'
  const amount = Number(body?.amount) || 99000

  try {
    // Check existing expiry if user is renewing before expiry
    const existingUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { subscriptionExpiresAt: true }
    })

    let baseDate = new Date()
    if (existingUser?.subscriptionExpiresAt && existingUser.subscriptionExpiresAt.getTime() > Date.now()) {
      baseDate = new Date(existingUser.subscriptionExpiresAt)
    }
    const expiresAt = new Date(baseDate)
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths)
    // 1. Update user subscription in database
    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        subscriptionTier: tier,
        subscriptionExpiresAt: expiresAt,
        hearts: 5
      }
    })

    // 2. Create subscription history record
    const subscriptionRecord = await prisma.subscription.create({
      data: {
        userId: targetUserId,
        tier: tier,
        status: 'active',
        amount: amount,
        paymentMethod: paymentMethod,
        startsAt: new Date(),
        expiresAt: expiresAt
      }
    })

    console.log(`[POSTGRESQL] User ${targetUserId} subscribed to ${tier} until ${expiresAt.toISOString()}`)

    return {
      success: true,
      message: `Selamat! Akun QuizCerdas ${tier} aktif hingga 1 tahun ke depan! 🎉`,
      subscription: subscriptionRecord,
      user: {
        id: updatedUser.id,
        subscriptionTier: updatedUser.subscriptionTier,
        subscriptionExpiresAt: updatedUser.subscriptionExpiresAt
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Subscription Error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal memproses langganan ke database: ${error.message}`
    })
  }
})
