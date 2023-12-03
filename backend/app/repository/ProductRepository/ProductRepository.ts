import prisma from "../../../config/prisma";
import ProductInterface from "./ProductInterface";

class ProductRepository implements ProductInterface{
    async getData(): Promise<object[]> {

        const products = await prisma.product.findMany({
            include: {
                store: true,
                media: true,
            }
        })
        
        return products
    }

    async createData(data: any): Promise<object> {

        const products = await prisma.product.create({
            data,
            include: {
                media: true,
                store: true
            }
        })

        return products
    }

    async detailData(id: number): Promise<any> {

        const products = await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                media: true,
                store: true
            }
        })
        
        return products
    }

    async updateData(id: number,    data: any): Promise<object> {

        const products = await prisma.product.update({
            where: {
                id
            },
            data,
            include: {
                media: true,
                store: true
            }
        })
        
        return products
    }

    async deleteData(id: number): Promise<any> {

        const products = await prisma.product.delete({
            where: {
                id: id
            },
            include: {
                media: true,
                store: true
            }
        })
        
        return products
    }

    async deleteMedia(id: number): Promise<any> {

        console.log("delete media",id)
        
        const medias = await prisma.media.delete({
            where: {
                id
            },
        })
        
        return medias
    }

}

export default ProductRepository
