import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { name } = await readBody(event);

    return await prisma.courses.create({
        data: {
            name: name
        },
    })


})