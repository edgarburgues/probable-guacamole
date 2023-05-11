import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    const students = await prisma.user.findMany({
        where: {
            role: "2"
        }
    })

    const teachers = await prisma.user.findMany({
        where: {
            role: "1"
        }
    })

    const courses = await prisma.courses.findMany()
    const subjects = await prisma.subjects.findMany()

    const messages = await prisma.messages.findMany({
        where: {
            user_id: id
        }
    })

    const todos = await prisma.todos.findMany({
        where: {
            user_id: id
        }
    })



    // return students
    return {
        statusCode: 200,
        body: {
            students: students.length,
            teachers: teachers.length,
            courses: courses.length,
            subjects: subjects.length,
            messages: messages.length,
            todos: todos
        }
    }

})