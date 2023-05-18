import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { userID, subjectID } = await readBody(event);

    const absences = await prisma.absences.create({
        data: {
            user: {
                connect: {
                    id: userID
                }
            },
            subject: {
                connect: {
                    id: subjectID
                }
            },
            date: new Date(),
            from_hour: new Date(),
            to_hour: new Date(),
            justified: false,
            state: 'Pendiente'
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