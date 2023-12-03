import { Session } from 'express-session';
import moment from "moment";
import SecurityHelper from "../helpers/SecurityHelper";
import UserInterface from "../repository/UserRepository/UserInterface";
import ServiceType from "../types/ServiceType";
import AuthValidation from "../validation/AuthValidation";
import prisma from '../../config/prisma';

const securityHelper = new SecurityHelper()
class AuthService {
    constructor(private userRepository: UserInterface) {}
    
    public async register(data: any): Promise<ServiceType> {

        let returnData: any
        
        const { error } = AuthValidation.register.validate(data, {abortEarly: false})

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

            if (findUserByEmail.deletedAt != null) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "The email you provided has already been deleted and cannot be used for new data creation",
                };

            }
            else {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "The Email has been registered",
                };
            }

        }
        else {
            const password = securityHelper.hashPassword(data.password);

            const dataUser: object = {
                email: data.email,
                password,
                profiles: {
                    create: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                    }
                },
                
            }
            
            const user: any = await this.userRepository.createData(dataUser);

            const dataUserHasRole = {
                data: {
                    user_id: user.id,
                    role_id: 2,
                },
            };
            
            const userHasRole = await prisma.userHasRole.create(dataUserHasRole);
            
            returnData = {
                status: true,
                response: "success-register",
                message: "Successfully Register",
                data: user,
            };

        }

        return returnData
        

    }
    
    public async login(req: any): Promise<ServiceType> {

        const data = req.body
        let returnData: any
        
        const { error } = AuthValidation.authentication.validate(data, {abortEarly: false})

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

            if (findUserByEmail.deletedAt != null) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "The email you provided has already been deleted and cannot be used for new data creation",
                };
                return returnData
            }

            const checkPassword = await securityHelper.checkPassword(data.password, findUserByEmail.password)

            if (!checkPassword) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "Email or Password doesn't match",
                };
                return returnData
            }

            const generateToken = securityHelper.generateToken(findUserByEmail)

            req.session.currentUser = findUserByEmail
            const dataLogin = {
                authorization: {
                    token: generateToken,
                    expired: moment().add(2, 'hours').toISOString()
                },
                data: findUserByEmail,
            }

            returnData = {
                status: true,
                response: "success",
                message: 'Successfully Login',
                data: dataLogin,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "Email or Password doesn't match",
            };
        }

        return returnData
        

    }

    // public async authentication(req: any): Promise<ServiceType> {

    //     const data = req.body
    //     let returnData: any
        
    //     const { error } = AuthValidation.authentication.validate(data, {abortEarly: false})

    //     if (error) {
    //         const errors = error.details.map((err: any) => err.message);

    //         returnData = {
    //             status: false,
    //             response: "validation",
    //             errors: errors,
    //         };

    //         return returnData
    //     }

    //     const findUserByEmail = await this.userRepository.checkEmailData(data.email)

    //     if (findUserByEmail) {

    //         if (findUserByEmail.deletedAt != null) {
    //             returnData = {
    //                 status: false,
    //                 response: "validation",
    //                 errors: "The email you provided has already been deleted and cannot be used for new data creation",
    //             };
    //             return returnData
    //         }

    //         const checkPassword = await securityHelper.checkPassword(data.password, findUserByEmail.password)

    //         if (!checkPassword) {
    //             returnData = {
    //                 status: false,
    //                 response: "validation",
    //                 message: "Email or Password doesn't match",
    //             };
    //             return returnData
    //         }

    //         const login = await this.login(req, findUserByEmail)

    //         returnData = login
    //     }
    //     else {
    //         const register = await this.register(data)

    //         returnData = register
    //     }

    //     return returnData
        

    // }

    // private async login(req: any, user: any) {
    //     let returnData

    //     const generateToken = securityHelper.generateToken(user)

    //     req.session.currentUser = user
    //     const dataLogin = {
    //         authorization: {
    //             token: generateToken,
    //             expired: moment().add(2, 'hours').toISOString()
    //         },
    //         data: user,
    //     }

    //     returnData = {
    //         status: true,
    //         response: "success",
    //         message: 'Successfully Login',
    //         data: dataLogin,
    //     };
    //     return returnData
    // }

    // private async register(data: any) {
    //     let returnData

    //     const password = securityHelper.hashPassword(data.password);

    //     const dataUser: object = {
    //         email: data.email,
    //         password
    //     };

          
    //     const user: any = await this.userRepository.createData(dataUser);

    //     const dataUserHasRole = {
    //         data: {
    //           user_id: user.id,
    //           role_id: 2,
    //         },
    //       };
          
    //     const userHasRole = await prisma.userHasRole.create(dataUserHasRole);
          
    //     returnData = {
    //         status: true,
    //         response: "success-register",
    //         message: "Successfully Register",
    //         data: user,
    //     };


    //     return returnData
    // }


}



export default AuthService
