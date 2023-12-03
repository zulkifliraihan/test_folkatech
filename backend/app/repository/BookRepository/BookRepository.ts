import prisma from "../../../config/prisma";
import BookInterface from "./BookInterface";

class BookRepository implements BookInterface{
    async getData(): Promise<object[]> {

        const books = await prisma.book.findMany({
            include: {
                rent: true
            }
        })
        
        return books
    }

    async createData(data: any): Promise<object> {

        const books = await prisma.book.create({
            data,
            include: {
                rent: true
            }
        })

        return books
    }

    async detailData(id: number): Promise<any> {

        const books = await prisma.book.findUnique({
            where: {
                id: id
            },
            include: {
                rent: true
            }
        })
        
        return books
    }

    async updateData(id: number, data: any): Promise<object> {

        const books = await prisma.book.update({
            where: {
                id
            },
            data,
            include: {
                rent: true
            }
        })
        
        return books
    }

    async deleteData(id: number): Promise<any> {

        const books = await prisma.book.delete({
            where: {
                id: id
            }
        })
        
        return books
    }

}

export default BookRepository
