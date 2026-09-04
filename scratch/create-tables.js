import prisma from '../server/utils/prisma.ts'

async function createTables() {
  console.log('Creating database tables directly in PostgreSQL...')

  const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS "users" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "username" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "avatar" TEXT NOT NULL DEFAULT '🦉',
      "grade" TEXT NOT NULL DEFAULT 'Kelas 1 SD',
      "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 10,
      "role" TEXT NOT NULL DEFAULT 'student',
      "xp" INTEGER NOT NULL DEFAULT 0,
      "hearts" INTEGER NOT NULL DEFAULT 5,
      "maxHearts" INTEGER NOT NULL DEFAULT 5,
      "streak" INTEGER NOT NULL DEFAULT 1,
      "lastActiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "completedLessonsByCourse" JSONB,
      "completedCheckpointsByCourse" JSONB,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );`,

    `CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");`,

    `CREATE TABLE IF NOT EXISTS "progress_logs" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "courseId" TEXT NOT NULL,
      "lessonId" TEXT,
      "xpEarned" INTEGER NOT NULL DEFAULT 20,
      "status" TEXT NOT NULL DEFAULT 'completed',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "progress_logs_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "progress_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS "courses" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "targetAudience" TEXT NOT NULL,
      "category" TEXT NOT NULL DEFAULT 'math',
      "icon" TEXT NOT NULL DEFAULT '🔢',
      "themeColor" TEXT NOT NULL DEFAULT 'green',
      "features" JSONB NOT NULL,
      "isReady" BOOLEAN NOT NULL DEFAULT true,
      "units" JSONB NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
    );`
  ]

  for (const sql of sqlStatements) {
    try {
      await prisma.$executeRawUnsafe(sql)
      console.log('Successfully executed SQL statement.')
    } catch (err) {
      console.error('SQL Execution error:', err.message)
    }
  }

  console.log('All tables created successfully!')
  await prisma.$disconnect()
}

createTables()
