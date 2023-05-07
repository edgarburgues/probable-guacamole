import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);



    await prisma.user.update({
        where: {
            id: body.id,
        },
        data: {
            id: body.id,
            name: body.name,
            surname: body.surname,
            email: body.email,
            phone: body.phone,

        },
    }).catch((e) => {
        return {
            statusCode: 400,
            body: e,
        }
    })


    return {
        statusCode: 200,
        body: body.birthday,
    }

})