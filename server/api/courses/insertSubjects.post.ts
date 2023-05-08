import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateSubjectInput {
  name: string;
  course: {
    connect: {
      id: string;
    };
  };
}

export default defineEventHandler(async (event) => {
  const { name, idCourse } = await readBody(event);




  const subject = await prisma.subjects.create({
    data: {
      name,
      course: {
        connect: { id: idCourse }
      }
    } as CreateSubjectInput
  });

  return {
    body: JSON.stringify(subject)
  };
});
