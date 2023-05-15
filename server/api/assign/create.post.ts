import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { userID, courseID } = await readBody(event);

    return await prisma.usercourse.create({
        data: {
            user_id: userID,
            course_id: courseID
        }
    }).then(() => {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Se ha creado la asignación" })
        }
    }).catch((error) => {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "No se ha podido crear la asignación" })
        }
    })
})