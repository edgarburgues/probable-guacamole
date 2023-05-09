import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    await prisma.messages.delete({
        where: {
            id: id
        }
    })

    return {
        message: 'Message deleted successfully',
        success: true
    }

})