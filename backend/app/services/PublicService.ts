import { Session } from 'express-session';
import moment from "moment";
import SecurityHelper from "../helpers/SecurityHelper";
import UserInterface from "../repository/UserRepository/UserInterface";
import ServiceType from "../types/ServiceType";
import PublicValidation from "../validation/PublicValidation";
import prisma from '../../config/prisma';
import BookInterface from '../repository/BookRepository/BookInterface';
import UserHasBookInterface from '../repository/UserHasBookRepository/UserHasBookInterface';

const securityHelper = new SecurityHelper()
class PublicService {
    constructor(
        private userRepository: UserInterface,
        private bookRepository: BookInterface,
        private userHasBookRepository: UserHasBookInterface   
    ) {}
    
    public async updateProfile(id: number, data: any): Promise<ServiceType> 
    {

        const { error } = PublicValidation.updateProfile.validate(data, {abortEarly: false})

        let returnData
        if (error) {
            const errors = error.details.map((err: any) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        const checkUser = await this.userRepository.detailData(id)
        
        if (!checkUser) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
                errors: null
            };
            return returnData
        }

        if (data.email) {
            const findUserByEmail = await this.userRepository.checkEmailData(data.email)

            if (findUserByEmail && findUserByEmail.id !== id) {
            
                if (findUserByEmail.deletedAt === null) {
                    returnData = {
                        status: false,
                        response: "validation",
                        message: "Email is already in use",
                    };
                }
                else {
                    returnData = {
                        status: false,
                        response: "server",
                        message: "The email you provided has already been deleted and cannot be used for new data creation",
                    }
                }
    
                return returnData
            }
        }

        let password
        let birthdayDate
        
        if (data.password) {
            password = new SecurityHelper().hashPassword(data.password)
        }
        
        if (data.birthday_date) {
            birthdayDate = new Date(data.birthday_date)
        }

        const dataUser: object = {
            email: data.email,
            password: password,
            profiles: {
                upsert: {
                    create: {
                        country_id : data.country_id,
                        state_id : data.state_id,
                        city_id : data.city_id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        birthdayAt: birthdayDate,
                        timezone: data.timezone
                    },
                    update: {
                        country_id : data.country_id ?? undefined,
                        state_id : data.state_id ?? undefined,
                        city_id : data.city_id ?? undefined,
                        firstName: data.first_name ?? undefined,
                        lastName: data.last_name ?? undefined,
                        birthdayAt: birthdayDate ?? undefined,
                        timezone: data.timezone ?? undefined
                    }
                }
            }
        }

        const user = await this.userRepository.updateData(id, dataUser)

        returnData = {
            status: true,
            response: "updated",
            data: user,
        };
      
        return returnData;
    }

    public async rentBook(userId: number, data: any): Promise<ServiceType> {
        let returnData

        const { error } = PublicValidation.rentBook.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err: any) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const user = await this.userRepository.detailData(userId)
        if (!user) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
            };
            return returnData
        }
        
        const book = await this.bookRepository.detailData(data.book_id)
        if (!book) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Book Not Found",
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

        const validStatuses = ['Reserved', 'Returned', 'Lost', 'Damaged'];

        const requestedStatus:any = statusRent?.name; 

        if (!validStatuses.includes(requestedStatus)) {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid Status! Status for Book just Reserved/Returned/Lost/Damaged"
            };

            return returnData
        }

        const dataUserHasBook = {
            user_id: userId,
            book_id: data.book_id
        }

        const findUserHasBook = await this.userHasBookRepository.whereByRequest(dataUserHasBook)

        if (findUserHasBook && requestedStatus == 'Reserved' && book.rent.name != 'Available') {
            returnData = {
                status: false,
                response: "validation",
                message: "User has already rented the book! This user can no longer rent a book, please return the book first!",
            };
            return returnData
        }

        if (requestedStatus == 'Reserved') {
            if (book.rent.name == 'Unavailable') {
                returnData = {
                    status: false,
                    response: "validation",
                    message: "Sorry the book is unavailable!",
                };
                return returnData
            }
            else {
                if (!findUserHasBook) {
                    const userHasBook = await this.userHasBookRepository.createData(dataUserHasBook)
                }
                const updateBook = await this.bookRepository.updateData(book.id, {
                    statusrent_id: 2
                })
            }
            
        }
        else {
            const userHasBook = await this.userHasBookRepository.deleteData(findUserHasBook.id)
            const updateBook = await this.bookRepository.updateData(book.id, {
                statusrent_id: 1
            })
        }


        const logUserHasBook = await prisma.logUserHasBook.create({
            data: {
                user_id: userId,
                book_id: data.book_id,
                statusrent_id: data.statusrent_id
            }
        })

        returnData = {
            status: true,
            response: "success",
            message: `Success ${requestedStatus} The Book!`
        };
      
        return returnData;
    }
}



export default PublicService
