import prisma from "../../../config/prisma";
import RoleInterface from "./RoleInterface";

class RoleRepository implements RoleInterface{
    async getData(): Promise<object[]> {

        const roles = await prisma.role.findMany()
        
        return roles
    }

    async createData(data: any): Promise<object> {

        const roles = await prisma.role.create({
            data
        })

        return roles
    }

    async detailData(id: number): Promise<any> {

        const roles = await prisma.role.findUnique({
            where: {
                id: id
            }
        })
        
        return roles
    }

    async updateData(id: number,    data: any): Promise<object> {

        const roles = await prisma.role.update({
            where: {
                id
            },
            data
        })
        
        return roles
    }

    async deleteData(id: number): Promise<any> {

        const roles = await prisma.role.delete({
            where: {
                id: id
            }
        })
        
        return roles
    }

}

export default RoleRepository
