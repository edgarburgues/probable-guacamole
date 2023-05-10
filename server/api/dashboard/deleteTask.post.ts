import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    await prisma.todos.delete({
        where: {
            id: id,
        },
    });

    return {
        'statusCode': 200,
        'success': true,
    };
});
