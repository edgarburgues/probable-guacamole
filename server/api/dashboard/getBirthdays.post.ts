import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    const students = await prisma.user.findMany({
        where: {
            role: "2"
        },
        select: {
            id: true,
            name: true,
            surname: true,
            birthday: true,
        }
    })

    const teachers = await prisma.user.findMany({
        where: {
            role: "1"
        },
        select: {
            id: true,
            name: true,
            surname: true,
            birthday: true,
        }
    })

    // return students
    return {
        statusCode: 200,
        body: {
            students,
            teachers,
        }
    }

})