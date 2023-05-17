import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { studentID } = await readBody(event);

    const absences = await prisma.absences.findMany({
        where: {
            user_id: studentID
        },
        include: {
            subject: true,
            user: true
        }
    })

    if (!absences) {
        return {
            statusCode: 404,
            body: 'No absences found'
        }
    }

    return {
        statusCode: 200,
        body: absences
    }
})