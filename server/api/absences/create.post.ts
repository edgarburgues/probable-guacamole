import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { userID, subjectID } = await readBody(event);
    /*
    model Absences {
      id         String    @id @default(cuid())
      user       User?     @relation(fields: [user_id], references: [id])
      user_id    String
      date       DateTime
      from_hour  DateTime
      to_hour    DateTime
      justified  Boolean   @default(false)
      state      String    @default("Pendiente")
      subject    Subjects? @relation(fields: [subject_id], references: [id])
      subject_id String
    }
    */



    const absences = await prisma.absences.create({
        data: {
            user: {
                connect: {
                    id: userID
                }
            },
            subject: {
                connect: {
                    id: subjectID
                }
            },
            date: new Date(),
            from_hour: new Date(),
            to_hour: new Date(),
            justified: false,
            state: 'Pendiente'
        },
        include: {
            subject: true,
            user: true
        }
    })


    if (!absences) {
        return {
            statusCode: 404,
            body: 'No absences found'
        }
    }

    return {
        statusCode: 200,
        body: absences
    }
})