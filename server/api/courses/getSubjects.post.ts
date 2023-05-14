import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// export default defineEventHandler(async () => {
//     const subjects = await prisma.subjects.findMany({
//         orderBy: {
//
//     })
//
//     return {
//         status: 200,
//         body: subjects
//     }
// })

export default defineEventHandler(async () => {
    const subjects = await prisma.subjects.findMany({
        orderBy: {
            course: {
                name: 'asc'
            }
        }
    })

    return {
        status: 200,
        body: subjects
    }
})