import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { absenceID, state } = await readBody(event);

    if (state !== 'Aceptado') {
        const absences = await prisma.absences.findFirst({
            where: {
                id: absenceID
            }
        })
        await prisma.absences.update({
            where: {
                id: absenceID
            },
            data: {
                state: state,
                justified: false
            }
        })

    } else {
        const absences = await prisma.absences.findFirst({
            where: {
                id: absenceID
            }
        })
        await prisma.absences.update({
            where: {
                id: absenceID
            },
            data: {
                justified: true,
                state: state
            }
        })

    }

})