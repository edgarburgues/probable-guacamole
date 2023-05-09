import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { sender, receiver, message } = await readBody(event)

    await prisma.messages.create({
        data: {
            from_id: sender,
            user_id: receiver,
            text: message
        }
    })

    return {
        message: "Message sent",
        success: true
    }

})