import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    await prisma.user.deleteMany({
        where: {
            id: id
        }
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: id,
            message: 'User deleted successfully'
        })
    }

})