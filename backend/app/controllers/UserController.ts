import { Request, Response } from "express";
import UserService from "../services/UserService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class UserController{
    constructor(private userService: UserService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const users: ServiceType = await this.userService.getData()
            
            let response;
            if (users.status) {
              response = ReturnResponse.success(users.response, users.data);
            } else {
              response = ReturnResponse.errorServer(users.data);
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
        
    } 

    async createData(req: Request, res: Response): Promise <any> {
        try {
            const data   = req.body
            const users: ServiceType = await this.userService.createData(data)

            let response;
            if (users.status) {
              response = ReturnResponse.success(users.response, users.data);
            } else {
              if (users.response == "validation") {
                response = ReturnResponse.errorValidation(users.errors);
              } else {
                response = ReturnResponse.errorServer(users.errors, users.message);
              }
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
        
    } 

    async detailData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)

      try {
          const users: ServiceType = await this.userService.detailData(id)
          
          let response;
          if (users.status) {
            response = ReturnResponse.success(users.response, users.data);
          } 
          else {
            if (users.response == "validation") {
              response = ReturnResponse.errorValidation(null, users.message);
            }
            else {
              response = ReturnResponse.errorServer(users.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    } 

    async updateData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)
      
      try {
          const users: ServiceType = await this.userService.updateData(id, req.body)
          
          let response;
          if (users.status) {
            response = ReturnResponse.success(users.response, users.data);
          } 
          else {
            if (users.response == "validation") {
              response = ReturnResponse.errorValidation(users.errors, users.message);
            }
            else {
              response = ReturnResponse.errorServer(users.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    } 

    async deleteData(req: Request, res: Response): Promise <any> {
      const id: number = parseInt(req.params.id)

      try {
          const users: ServiceType = await this.userService.deleteData(id)
          
          let response;
          if (users.status) {
            response = ReturnResponse.success(users.response, users.data);
          } 
          else {
            if (users.response == "validation") {
              response = ReturnResponse.errorValidation(null, users.message);
            }
            else {
              response = ReturnResponse.errorServer(users.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer(error.message)
          return res.status(response.response_code).json(response);
      }
    } 
}

export default UserController
