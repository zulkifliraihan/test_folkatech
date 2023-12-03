import hashPassword from "../../app/helpers/SecurityHelper";
import prisma from "../../config/prisma";


class RoleSeeder {
    async seed() {
        try {
            const roles = [
                {
                    name: 'admin',
                },
                {
                    name: 'public',
                }
            ]
    
            const data = {
                data: roles
            }
    
            const created = await prisma.role.createMany(data)

            console.log(`✨ ---- Successfully Seed RoleSeeder ---- ✨`)
        } catch (error: any) {
            console.log(`🔥 ---- Failed Seed RoleSeeder ---- 🔥`)
            console.log(error.message)
        }

    }
}
export default new RoleSeeder()
