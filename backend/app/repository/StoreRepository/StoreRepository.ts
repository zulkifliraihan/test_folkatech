import prisma from "../../../config/prisma";
import StoreInterface from "./StoreInterface";

class StoreRepository implements StoreInterface{
    async getData(): Promise<object[]> {

        const stores = await prisma.store.findMany()
        
        return stores
    }

    async createData(data: any): Promise<object> {

        const stores = await prisma.store.create({
            data
        })

        return stores
    }

    async detailData(id: number): Promise<any> {

        const stores = await prisma.store.findUnique({
            where: {
                id: id
            }
        })
        
        return stores
    }

    async updateData(id: number,    data: any): Promise<object> {

        const stores = await prisma.store.update({
            where: {
                id
            },
            data
        })
        
        return stores
    }

    async deleteData(id: number): Promise<any> {

        const stores = await prisma.store.delete({
            where: {
                id: id
            }
        })
        
        return stores
    }

}

export default StoreRepository
