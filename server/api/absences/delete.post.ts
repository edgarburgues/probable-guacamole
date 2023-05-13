import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { userID, subjectID } = await readBody(event);
    const absence = await prisma.absences.findFirst({
        where: {
            user_id: userID,
            subject_id: subjectID,
        }
    })

    if (absence) {
        return await prisma.absences.delete({
            where: {
                id: absence.id
            }
        }).then(() => {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Se ha eliminado la ausencia" })
            }
        }).catch((error) => {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No se ha podido eliminar la ausencia" })
            }
        })
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No se ha podido eliminar la ausencia" })
        }
    }
})