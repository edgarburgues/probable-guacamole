import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);



    const update = await prisma.user.update({
        where: {
            id: body.id,
        },
        data: {
            id: body.id,
            name: body.name,
            surname: body.surname,
            email: body.email,
            phone: body.phone,
            birthday: new Date(body.birthday),
            sex: body.sex
        } as any,
    })

    if (!update) {
        return {
            status: 404,
            body: { message: 'Not found' },
        }
    }

    return {
        status: 200,
        body: update,
    }

})

// BUG: No actualiza el curso --> student_courses