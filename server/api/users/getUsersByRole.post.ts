import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { role } = await readBody(event);

    const users = await prisma.user.findMany({
        where: {
            role: role
        },
        orderBy: {
            surname: 'asc'
        },
        include: {
            student_courses: true,
            teacher_courses: true,

        }
    })

    return users;

})