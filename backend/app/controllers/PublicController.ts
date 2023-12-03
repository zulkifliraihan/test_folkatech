import { Request, Response } from "express";
import PublicService from "../services/PublicService";
import ServiceType from "../types/ServiceType";
import ReturnResponse from "../traits/ReturnResponse";

class PublicController {
    constructor(private publicService: PublicService) {}

    async updateProfile(req: Request, res: Response): Promise <any> {
      const currentUser: any = req.session.currentUser
      const id: number = parseInt(currentUser.id)
      
      try {
          const publicService: ServiceType = await this.publicService.updateProfile(id, req.body)
          
          let response;
          if (publicService.status) {
            response = ReturnResponse.success(publicService.response, publicService.data);
          } 
          else {
            if (publicService.response == "validation") {
              response = ReturnResponse.errorValidation(publicService.errors, publicService.message);
            }
            else {
              response = ReturnResponse.errorServer(publicService.data);
            }
          }
          return res.status(response.response_code).json(response);
          
      } 
      catch (error: any) {
          const response = ReturnResponse.errorServer( error.message)
          return res.status(response.response_code).json(response);
      }
    }

    async rentBook(req: Request, res: Response): Promise <any> {
      const currentUser: any = req.session.currentUser
      const userId: number = parseInt(currentUser.id)

      try {
        const publicService: ServiceType = await this.publicService.rentBook(userId, req.body)
        
        let response;
        if (publicService.status) {
          response = ReturnResponse.success(null, publicService.data, publicService.message);
        } 
        else {
          if (publicService.response == "validation") {
            response = ReturnResponse.errorValidation(publicService.errors, publicService.message);
          }
          else {
            response = ReturnResponse.errorServer(publicService.data);
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

export default PublicController
