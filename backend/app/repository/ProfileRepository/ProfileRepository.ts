import prisma from "../../../config/prisma";
import ProfileInterface from "./ProfileInterface";

class ProfileRepository implements ProfileInterface{
    async getData(): Promise<object[]> {

        const profiles = await prisma.profile.findMany()
        
        return profiles
    }

    async createData(data: any): Promise<object> {

        const profiles = await prisma.profile.create({
            data,
        })

        return profiles
    }

    async detailData(id: number): Promise<any> {

        const profiles = await prisma.profile.findUnique({
            where: {
                id: id
            },
        })
        
        return profiles
    }

    async updateData(id: number, data: any): Promise<object> {

        const profiles = await prisma.profile.update({
            where: {
                id
            },
            data,
        })
        
        return profiles
    }

    async deleteData(id: number): Promise<any> {

        const profiles = await prisma.profile.delete({
            where: {
                id: id
            }
        })
        
        return profiles
    }

    async detailDyanmicData(query: any): Promise<any> {

        const profiles = await prisma.profile.findUnique(query)
        
        return profiles
    }
}

export default ProfileRepository
