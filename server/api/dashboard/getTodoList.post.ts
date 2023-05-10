import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    const todos = await prisma.todos.findMany({
        where: {
            user_id: id
        }
    })

    // return students
    return {
        statusCode: 200,
        body: {
            todos
        }
    }

})