import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Executing direct PostgreSQL schema update...')
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscriptionTier" TEXT DEFAULT 'FREE';`)
    console.log('✅ Column "subscriptionTier" added to table "users"')
  } catch (e) {
    console.error('Failed to add subscriptionTier:', e.message)
  }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscriptionExpiresAt" TIMESTAMP(3);`)
    console.log('✅ Column "subscriptionExpiresAt" added to table "users"')
  } catch (e) {
    console.error('Failed to add subscriptionExpiresAt:', e.message)
  }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "parentWhatsapp" TEXT;`)
    console.log('✅ Column "parentWhatsapp" added to table "users"')
  } catch (e) {
    console.error('Failed to add parentWhatsapp:', e.message)
  }

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "subscriptions" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "tier" TEXT NOT NULL DEFAULT 'PRO',
        "status" TEXT NOT NULL DEFAULT 'active',
        "amount" INTEGER NOT NULL DEFAULT 99000,
        "paymentMethod" TEXT NOT NULL DEFAULT 'qris',
        "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `)
    console.log('✅ Table "subscriptions" ensured')
  } catch (e) {
    console.error('Failed to create subscriptions table:', e.message)
  }

  try {
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "subscriptions_userId_idx" ON "subscriptions"("userId");`)
    console.log('✅ Index "subscriptions_userId_idx" created')
  } catch (e) {
    console.error('Failed to create index:', e.message)
  }

  console.log('🎉 Schema synchronization finished!')
}

main()
  .catch((e) => {
    console.error('Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
