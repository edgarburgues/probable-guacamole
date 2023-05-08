import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    const subjects = await prisma.subjects.findMany()

    return {
        status: 200,
        body: subjects
    }
})