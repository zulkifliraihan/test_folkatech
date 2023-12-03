import prisma from "../../config/prisma"

class StatusRentSeeder {
    async seed() {
        try {
            const status = [
                {
                    name: 'Available',
                },
                {
                    name: 'On Loan',
                },
                {
                    name: 'Reserved',
                },
                {
                    name: 'Overdue',
                },
                {
                    name: 'Returned',
                },
                {
                    name: 'Unavailable',
                },
                {
                    name: 'Lost',
                },
                {
                    name: 'Damaged',
                }
            ]

            const data = {
                data: status
            }

            const statusRent = await prisma.statusRent.createMany(data)

            console.log(`✨ ---- Successfully Seed StatusRentSeeder ---- ✨`)


        } catch (error: any) {
            console.log(`🔥 ---- Failed Seed StatusRentSeeder ---- 🔥`)
            console.log(error.message)
        }
    }
}

export default new StatusRentSeeder()
