import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const students = await prisma.user.findMany({
        where: {
            role: "2"
        }
    })

    const teachers = await prisma.user.findMany({
        where: {
            role: "1"
        }
    })

    // return students
    return {
        statusCode: 200,
        body: {
            students: students.length,
            teachers: teachers.length
        }
    }

})