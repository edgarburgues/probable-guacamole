import { J } from '@fullcalendar/core/internal-common';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const { id } = await readBody(event);

    const events = await prisma.events.findMany({
        where: {
            user_id: id
        }
    })


    // return students
    return JSON.stringify(events);

})