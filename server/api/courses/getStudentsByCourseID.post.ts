import { s } from '@fullcalendar/core/internal-common';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const students = await prisma.courses.findMany({
        where: {
            id: body.id,
        },
        include: {
            users: true,
        },
    })

    return {
        statusCode: 200,
        body: students
    }
})

