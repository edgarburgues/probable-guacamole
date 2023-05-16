import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const users = await prisma.user.findMany({
        orderBy: {
            surname: 'asc'
        }
    });

    return {
        statusCode: 200,
        body: users
    }

})