import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.userId || !body.action) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UserId dan Action wajib diisi'
    })
  }

  const { userId, action, role, xp, hearts } = body

  try {
    if (action === 'update_role' && role) {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { role }
      })
      console.log(`[POSTGRESQL ADMIN] User ${userId} role updated to: ${role}`)
      return { success: true, user: updated }
    }

    if (action === 'update_xp' && typeof xp === 'number') {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { xp }
      })
      console.log(`[POSTGRESQL ADMIN] User ${userId} XP updated to: ${xp}`)
      return { success: true, user: updated }
    }

    if (action === 'update_hearts' && typeof hearts === 'number') {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { hearts }
      })
      return { success: true, user: updated }
    }

    if (action === 'delete') {
      await prisma.user.delete({
        where: { id: userId }
      })
      console.log(`[POSTGRESQL ADMIN] User ${userId} deleted from DB`)
      return { success: true, deletedId: userId }
    }

    throw createError({
      statusCode: 400,
      statusMessage: `Action '${action}' tidak dikenali`
    })
  } catch (error: any) {
    console.error('[POSTGRESQL ADMIN] User update error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal memperbarui database: ${error.message}`
    })
  }
})
