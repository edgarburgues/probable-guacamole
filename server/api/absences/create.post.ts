import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { userID, subjectID } = await readBody(event);

    return await prisma.absences.create({
        data: {
            user_id: userID,
            subject_id: subjectID,
            date: new Date(),
            from_hour: new Date(),
            to_hour: new Date(),
            justified: false,
            state: "Pendiente"
        }
    }).then(() => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Se ha creado la ausencia" })
        }
    }).catch((error) => {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No se ha podido crear la ausencia" })
        }
    })
})