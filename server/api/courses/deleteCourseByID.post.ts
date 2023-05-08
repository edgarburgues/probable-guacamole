import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    await prisma.courses.deleteMany({
        where: {
            id: id
        }
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: id,
            message: 'Course deleted successfully'
        })
    }

})