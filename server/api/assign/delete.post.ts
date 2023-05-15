import { an } from '@fullcalendar/core/internal-common';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { userID, courseID } = await readBody(event);

    const usercourse = await prisma.usercourse.findFirst({
        where: {
            user_id: userID,
            course_id: courseID
        }
    })

    if (usercourse) {
        return await prisma.usercourse.delete({
            where: {
                id: usercourse.id
            }
        }).then(() => {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Se ha eliminado" })
            }
        }).catch((error) => {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "No se ha podido eliminar",
                    error: error
                })
            }
        })
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No se ha podido eliminar" })
        }
    }
})