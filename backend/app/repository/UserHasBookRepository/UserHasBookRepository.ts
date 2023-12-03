import prisma from "../../../config/prisma";
import UserHasBookInterface from "./UserHasBookInterface";

class UserHasBookRepository implements UserHasBookInterface{
    async getData(): Promise<object[]> {

        const userHasBooks = await prisma.userHasBook.findMany()
        
        return userHasBooks
    }

    async createData(data: any): Promise<object> {

        const userHasBooks = await prisma.userHasBook.create({
            data
        })

        return userHasBooks
    }

    async detailData(id: number): Promise<any> {

        const userHasBooks = await prisma.userHasBook.findUnique({
            where: {
                id: id
            }
        })
        
        return userHasBooks
    }

    async updateData(id: number, data: any): Promise<object> {

        const userHasBooks = await prisma.userHasBook.update({
            where: {
                id
            },
            data
        })
        
        return userHasBooks
    }

    async deleteData(id: number): Promise<any> {

        const userHasBooks = await prisma.userHasBook.delete({
            where: {
                id: id
            }
        })
        
        return userHasBooks
    }

    async whereByRequest(data: any): Promise <any> {
        const userHasBooks = await prisma.userHasBook.findFirst({
            where: data
        })

        return userHasBooks
    }

}

export default UserHasBookRepository
