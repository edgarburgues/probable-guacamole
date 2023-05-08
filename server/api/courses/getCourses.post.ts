import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    const courses = await prisma.courses.findMany()

    return {
        status: 200,
        body: courses
    }
})