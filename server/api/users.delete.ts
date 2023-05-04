import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let error = null
    let user = null

    if (body.id) {

        await prisma.users.delete({
            where: {
                id: body.id
            }
        }).then((response) => {
            user = response
        }).catch((err) => {
            error = err
        })

        if (error) {
            return createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error'
            })
        }

        return {
            user: user
        }
    }

})