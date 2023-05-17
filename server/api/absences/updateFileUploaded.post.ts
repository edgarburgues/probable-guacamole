import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { absenceID } = await readBody(event);


    await prisma.absences.update({
        where: {
            id: absenceID
        },
        data: {
            file_uploaded: true,
        }
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'File uploaded'
        })
    }

})