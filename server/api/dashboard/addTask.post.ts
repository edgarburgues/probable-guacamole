import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateTodoInput {
    text: string;
    done: boolean;
    user: {
        connect: {
            id: string;
        };
    };
}



export default defineEventHandler(async (event) => {

    const { id, text } = await readBody(event);

    const newTodo = await prisma.todos.create({
        data: {
            text: text,
            done: false,
            user: {
                connect: {
                    id: id,
                }
            }
        }
    });

    return {
        statusCode: 200,
        success: true,
    };
});
