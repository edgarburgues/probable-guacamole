import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);


    const users = await prisma.user.findMany({
        where: {
            id: id
        }
    })

    return users;

})