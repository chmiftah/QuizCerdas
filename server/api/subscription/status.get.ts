import prisma from '~/server/utils/prisma'
import { validateSessionToken } from '../../utils/security'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_session')
  const query = getQuery(event)

  let targetUserId = query?.userId as string | undefined

  if (token) {
    const session = validateSessionToken(token)
    if (session && session.userId) {
      targetUserId = session.userId
    }
  }

  if (!targetUserId) {
    return {
      success: false,
      isPro: false,
      message: 'Belum login'
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        name: true,
        email: true,
        subscriptionTier: true,
        subscriptionExpiresAt: true,
        parentWhatsapp: true
      }
    })

    if (!user) {
      return {
        success: false,
        isPro: false,
        message: 'Pengguna tidak ditemukan'
      }
    }

    // Find latest subscription record
    const latestSub = await prisma.subscription.findFirst({
      where: { userId: targetUserId },
      orderBy: { createdAt: 'desc' }
    })

    const isPro = user.subscriptionTier === 'PRO' || user.subscriptionTier === 'FAMILY'
    const expiresAt = user.subscriptionExpiresAt || latestSub?.expiresAt || null

    let daysLeft = 0
    if (expiresAt) {
      const diff = new Date(expiresAt).getTime() - Date.now()
      daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    const invoiceId = latestSub ? latestSub.id.slice(0, 8).toUpperCase() : user.id.slice(0, 8).toUpperCase()
    const currentYear = new Date().getFullYear()

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        parentWhatsapp: user.parentWhatsapp
      },
      isPro,
      tier: user.subscriptionTier,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      daysLeft,
      subscription: latestSub ? {
        id: latestSub.id,
        status: latestSub.status,
        amount: latestSub.amount,
        paymentMethod: latestSub.paymentMethod,
        startsAt: latestSub.startsAt.toISOString(),
        expiresAt: latestSub.expiresAt.toISOString()
      } : null,
      invoice: {
        number: `INV-QC-${currentYear}-${invoiceId}`,
        planName: 'QuizCerdas Pro (Akses Penuh 1 Tahun)',
        amount: latestSub?.amount || 99000,
        paymentMethod: latestSub?.paymentMethod === 'qris' ? 'QRIS / GoPay / OVO / DANA' : (latestSub?.paymentMethod || 'QRIS Digital Pay'),
        status: isPro ? 'LUNAS / AKTIF' : 'BATAL / TIDAK AKTIF',
        date: latestSub ? latestSub.createdAt.toISOString() : (user.subscriptionExpiresAt ? new Date().toISOString() : null)
      }
    }
  } catch (error: any) {
    console.error('[POSTGRESQL] Subscription Status Error:', error.message)
    return {
      success: false,
      isPro: false,
      message: error.message
    }
  }
})
