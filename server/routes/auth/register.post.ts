import { createJwtToken } from "~~/jwt";
import { prisma } from "~~/db";
import bcrypt from "bcrypt";

interface CreateUserInput {
   name: string;
   surname: string;
   email: string;
   phone: string;
   password: string;
   salt: string;
   last_login_ip_address: string;
   last_logged_in_at: Date;
   current_logged_in_at: Date;
   birthday: Date;
   role: string;
   course?: {
      connect: {
         id: any;
      };
   };
}

export default defineEventHandler(async (event) => {
   const { name, surname, email, phone, password, birthday, role, coursesId } = await readBody(event);

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

      const createUser: any = await prisma.user.create({
         data: {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password: hash,
            salt: salt,
            last_login_ip_address: "",
            last_logged_in_at: new Date(),
            current_logged_in_at: new Date(),
            birthday: new Date(birthday),
            role: role,


         }
      });

      //Remove the password and salt from the object
      delete createUser.password;
      delete createUser.salt;

      //Disconnect Prisma
      prisma.$disconnect();

      //Add success attributes to the object
      createUser.success = true;

      return createUser;
   }
});