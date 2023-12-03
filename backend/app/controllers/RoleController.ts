import { Request, Response } from "express";
import RoleService from "../services/RoleService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class RoleController{
    constructor(private roleService: RoleService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const roles: ServiceType = await this.roleService.getData()
            
            let response;
            if (roles.status) {
              response = ReturnResponse.success(roles.response, roles.data);
            } else {
              response = ReturnResponse.errorServer(roles.data);
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
            const roles: ServiceType = await this.roleService.createData(data)

            let response;
            if (roles.status) {
              response = ReturnResponse.success(roles.response, roles.data);
            } else {
              if (roles.response == "validation") {
                response = ReturnResponse.errorValidation(roles.errors);
              } else {
                response = ReturnResponse.errorServer(roles.errors, roles.message);
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
          const roles: ServiceType = await this.roleService.detailData(id)
          
          let response;
          if (roles.status) {
            response = ReturnResponse.success(roles.response, roles.data);
          } 
          else {
            if (roles.response == "validation") {
              response = ReturnResponse.errorValidation(null, roles.message);
            }
            else {
              response = ReturnResponse.errorServer(roles.data);
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
          const roles: ServiceType = await this.roleService.updateData(id, req.body)
          
          let response;
          if (roles.status) {
            response = ReturnResponse.success(roles.response, roles.data);
          } 
          else {
            if (roles.response == "validation") {
              response = ReturnResponse.errorValidation(roles.errors, roles.message);
            }
            else {
              response = ReturnResponse.errorServer(roles.data);
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
          const roles: ServiceType = await this.roleService.deleteData(id)
          
          let response;
          if (roles.status) {
            response = ReturnResponse.success(roles.response, roles.data);
          } 
          else {
            if (roles.response == "validation") {
              response = ReturnResponse.errorValidation(null, roles.message);
            }
            else {
              response = ReturnResponse.errorServer(roles.data);
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

export default RoleController
