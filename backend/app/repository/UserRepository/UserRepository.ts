import prisma from "../../../config/prisma";
import UserInterface from "./UserInterface";

class UserRepository implements UserInterface{
    async getData(): Promise<object[]> {

        const users = await prisma.user.findMany({
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        
        return users
    }

    async createData(data: any): Promise<object> {

        console.log(data)
        const users = await prisma.user.create({
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })

        return users
    }

    async detailData(id: number): Promise<any> {

        const users = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        
        return users
    }

    async updateData(id: number, data: any): Promise<object> {

        const users = await prisma.user.update({
            where: {
                id
            },
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        
        return users
    }

    async deleteData(id: number): Promise<any> {

        const users = await prisma.user.delete({
            where: {
                id: id
            },
            include: {
                profiles: true,
            }
        })
        
        return users
    }

    async checkEmailData(email: string): Promise<any> {

        const users = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        
        return users
    }

    async latestData(): Promise<any>{
        const user = await prisma.user.findFirst({
            orderBy: {
              createdAt: 'desc',
            },
        })

        return user
    }

    async updateOrCreateData(id: number, data: any): Promise<object> {

        const users = await prisma.user.update({
            where: {
                id
            },
            data,
            include: {
                profiles: true,
                userHasRoles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        
        return users
    }
}

export default UserRepository
