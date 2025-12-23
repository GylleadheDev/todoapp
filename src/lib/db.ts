// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// 1. Cria um tipo global para armazenar o Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// 2. Função para criar o PrismaClient
function createPrismaClient() {
    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    return new PrismaClient({ adapter })
}

// 3. Usa o Prisma existente OU cria um novo
export const prisma = globalForPrisma.prisma || createPrismaClient()

// 4. Em desenvolvimento, salva na global para reusar
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}