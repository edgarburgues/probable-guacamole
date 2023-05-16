import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const userCourses = await prisma.usercourse.findMany({
        where: {
            user_id: body.user_id
        },
        select: {
            course: {
                select: {
                    id: true,
                    name: true,
                    subjects: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })

    return {
        status: 200,
        body: userCourses
    }

})