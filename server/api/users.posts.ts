import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let user = null

    if (body.name) {
        user = await prisma.users.create({
            data: {
                name: body.name,
            }
        })
    }

    return {
        user: user
    }
})