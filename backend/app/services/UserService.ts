import bcrypt from 'bcrypt';
import UserInterface from "../repository/UserRepository/UserInterface";
import ServiceType from "../types/ServiceType";
import UserValidation from '../validation/UserValidation';
import 'moment-timezone';
import ProfileInterface from '../repository/ProfileRepository/ProfileInterface';

class UserService {
    constructor(
        private userRepository: UserInterface,
        private profileRepository: ProfileInterface
    ) {}

    async getData(): Promise<ServiceType> {
        const users = await this.userRepository.getData()
       
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: users,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = UserValidation.createUser.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err: any) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        
        const findUserByEmail = await this.userRepository.checkEmailData(data.email)
        if (findUserByEmail) {
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

        const password: string = bcrypt.hashSync(data.password, 10)
        const birthdayDate = new Date(data.birthday_date)

        const dataUser: object = {
            email: data.email,
            password,
            profiles: {
                create: {
                    country_id : data.country_id,
                    state_id : data.state_id,
                    city_id : data.city_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    birthdayAt: birthdayDate,
                    timezone: data.timezone
                }
            }
        }

        const user = await this.userRepository.createData(dataUser)

        returnData = {
            status: true,
            response: "created",
            data: user,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const users = await this.userRepository.detailData(id)

        let returnData
        if (users) {
            returnData = {
                status: true,
                response: "get",
                data: users,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = UserValidation.updateUser.validate(data, {abortEarly: false})

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
            password = bcrypt.hashSync(data.password, 10)
        }
        
        if (data.birthday_date) {
            birthdayDate = new Date(data.birthday_date)
        }

        const dataUser: object = {
            email: data.email ?? undefined,
            password: password ?? undefined,
            profiles: {
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

        const user = await this.userRepository.updateData(id, dataUser)

        returnData = {
            status: true,
            response: "updated",
            data: user,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkUser = await this.userRepository.detailData(id)
        
        let returnData
        if (!checkUser) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
                errors: null
            };
            return returnData
        }

        const users = await this.userRepository.deleteData(id)

        if (users) {
            returnData = {
                status: true,
                response: "deleted",
                data: users,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
            };
        }
      
        return returnData;
    }
}

export default UserService
