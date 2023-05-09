import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    const message = await prisma.messages.findMany({
        where: {
            user_id: id
        }
    })

    return {
        statusCode: 200,
        body: message
    }

})