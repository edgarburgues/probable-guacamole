import { createJwtToken } from "~~/jwt";
import { prisma } from "~~/db";
import bcrypt from "bcrypt";

interface RegisterTeacher {
   name: string;
   surname: string;
   email: string;
   phone: string;
   password: string;
   birthday: Date;
   role: string;
   sex: string;
   salt: string;
}

interface RegisterStudent {
   name: string;
   surname: string;
   email: string;
   phone: string;
   password: string;
   birthday: Date;
   role: string;
   sex: string;
   salt: string;
   student_courses: {
      connect: {
         id: string;
      }
   }
}

export default defineEventHandler(async (event) => {
   const { name, surname, email, phone, password, birthday, role, sex, course } = await readBody(event);

   const user = await prisma.user.findUnique({
      where: {
         email: email
      }
   });

   if (user != null) {
      prisma.$disconnect();

      return {
         message: `The user with email "${email}" already exists`,
         success: false
      }
   } else {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      let createUser: any;
      if (role == "1") { // profesor
         createUser.value = await prisma.user.create({
            data: {
               name: name,
               surname: surname,
               email: email,
               phone: phone,
               password: hash,
               birthday: new Date(birthday),
               role: role,
               sex: sex,
               salt: salt,
            } as RegisterTeacher
         });

      } else if (role == "2") { // alumno
         createUser.value = await prisma.user.create({
            data: {
               name: name,
               surname: surname,
               email: email,
               phone: phone,
               password: hash,
               birthday: new Date(birthday),
               role: role,
               sex: sex,
               salt: salt,
               student_courses: {
                  connect: {
                     id: course
                  }
               }
            } as RegisterStudent
         });
      }



      //Remove the password and salt from the object
      delete createUser.password;
      delete createUser.salt;

      //Disconnect Prisma
      prisma.$disconnect();

      // Return the user object with the 'success' property set to true
      return {
         ...createUser,
         success: true,
      };
   }
});