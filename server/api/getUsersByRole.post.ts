import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { role } = await readBody(event);


    const users = await prisma.user.findMany({
        where: {
            role: role
        }
    })

    return users;

})