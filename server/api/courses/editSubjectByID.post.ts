import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    await prisma.subjects.update({
        where: {
            id: body.id,
        },
        data: {
            id: body.id,
            name: body.name,
        },
    }).catch((e) => {
        return {
            statusCode: 400,
            body: e,
        }
    })

    return {
        statusCode: 200,
        body: 'success',
    }

})