import bcrypt from 'bcrypt';
import BookInterface from "../repository/BookRepository/BookInterface";
import ServiceType from "../types/ServiceType";
import BookValidation from '../validation/BookValidation';
import 'moment-timezone';
import prisma from '../../config/prisma';

class BookService {
    constructor(
        private bookRepository: BookInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const books = await this.bookRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: books,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = BookValidation.createBook.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const statusRent = await prisma.statusRent.findUnique({
            where: {
                id: data.statusrent_id
            }
        })

        if (!statusRent) {
            returnData = {
                status: false,
                response: "validation",
                errors: "ID Status Rent Not Found"
            };

            return returnData
        }

        const validStatuses = ['Available', 'On Loan', 'Unavailable'];

        const requestedStatus:any = statusRent?.name; 

        if (!validStatuses.includes(requestedStatus)) {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid Status! Status for Book just Available/On Loan/Unavailable"
            };

            return returnData
        }

        const dataBook: object = {
            name: data.name,
            statusrent_id: data.statusrent_id
        }

        const book = await this.bookRepository.createData(dataBook)

        returnData = {
            status: true,
            response: "created",
            data: book,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const books = await this.bookRepository.detailData(id)

        let returnData
        if (books) {
            returnData = {
                status: true,
                response: "get",
                data: books,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Book Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = BookValidation.updateBook.validate(data, {abortEarly: false})

        let returnData
        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        const checkBook = await this.bookRepository.detailData(id)
        
        if (!checkBook) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Book Not Found",
                errors: null
            };
            return returnData
        }

        if (data.statusrent_id) {
            const statusRent = await prisma.statusRent.findUnique({
                where: {
                    id: data.statusrent_id
                }
            })
    
            if (!statusRent) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "ID Status Rent Not Found"
                };
    
                return returnData
            }
    
            const validStatuses = ['Available', 'On Loan', 'Unavailable'];
    
            const requestedStatus:any = statusRent?.name; 
    
            if (!validStatuses.includes(requestedStatus)) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Invalid Status! Status for Book just Available/On Loan/Unavailable"
                };
    
                return returnData
            }
        }

        const dataBook: object = {
            name: data.name ?? undefined,
            statusrent_id: data.statusrent_id ?? undefined
        }

        const book = await this.bookRepository.updateData(id, dataBook)

        returnData = {
            status: true,
            response: "updated",
            data: book,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkBook = await this.bookRepository.detailData(id)
        
        let returnData
        if (!checkBook) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Book Not Found",
                errors: null
            };
            return returnData
        }

        const books = await this.bookRepository.deleteData(id)

        if (books) {
            returnData = {
                status: true,
                response: "deleted",
                data: books,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Book Not Found",
            };
        }
      
        return returnData;
    }
}

export default BookService
