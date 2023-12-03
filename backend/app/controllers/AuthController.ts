import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import ServiceType from "../types/ServiceType";
import ReturnResponse from "../traits/ReturnResponse";

class AuthController {
    constructor(private authService: AuthService) {}

    async register(req: Request, res: Response): Promise <any> {
        try {
            const data   = req.body
            const auth: ServiceType = await this.authService.register(data);
            let response;
            if (auth.status) {
              response = ReturnResponse.success(null, auth.data, auth.message);
            } 
            else {
              if (auth.response == "validation") {
                response = ReturnResponse.errorValidation(auth.errors);
              }
              else {
                response = ReturnResponse.errorServer(auth.data);
              }
            }
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer(error.message)
            return res.status(response.response_code).json(response);
        }
    }

    async login(req: Request, res: Response): Promise <any> {
        try {
            const auth: ServiceType = await this.authService.login(req);
            let response;
            if (auth.status) {
              response = ReturnResponse.success(null, auth.data, auth.message);
            } 
            else {
              if (auth.response == "validation") {
                response = ReturnResponse.errorValidation(auth.errors);
              }
              else {
                response = ReturnResponse.errorServer(auth.data);
              }
            }
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer(error.message)
            return res.status(response.response_code).json(response);
        }
    }
        
}

export default AuthController
