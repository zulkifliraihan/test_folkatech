import moment from "moment";
import hashPassword from "../../app/helpers/SecurityHelper";
import prisma from "../../config/prisma";
import { faker } from '@faker-js/faker';
import SecurityHelper from "../../app/helpers/SecurityHelper";


class UserSeeder {
    async seed() {
        try {
            
            for (let i = 0; i < 1000; i++) {
                const randomNumberRole = Math.floor(Math.random() * 2) + 1;

                const data: any = {
                    email: faker.internet.email(),
                    password: new SecurityHelper().hashPassword('123123123'),
                    profiles: {
                        create: {
                            firstName: faker.name.firstName(),
                            lastName: faker.name.lastName(),
                        }
                    },
                };
            
                const user: any = await prisma.user.create({ data })

                const dataUserHasRole = {
                    data: {
                      user_id: user.id,
                      role_id: randomNumberRole,
                    },
                  };
                  
                const userHasRole = await prisma.userHasRole.create(dataUserHasRole);
                  
            }
            console.log(`✨ ---- Successfully Seed UserSeeder ---- ✨`)
        } catch (error: any) {
            console.log(`🔥 ---- Failed Seed UserSeeder ---- 🔥`)
            console.log(error.message)
        }

    }
}
export default new UserSeeder()
