import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  const adapterFactory = new PrismaBetterSqlite3({ url: dbPath })
  return new PrismaClient({ adapter: adapterFactory })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
