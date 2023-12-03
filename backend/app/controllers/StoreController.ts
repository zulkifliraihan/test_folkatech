import { Request, Response } from "express";
import StoreService from "../services/StoreService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class StoreController{
    constructor(private storeService: StoreService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const stores: ServiceType = await this.storeService.getData()
            
            let response;
            if (stores.status) {
              response = ReturnResponse.success(stores.response, stores.data);
            } else {
              response = ReturnResponse.errorServer(stores.data);
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
            const stores: ServiceType = await this.storeService.createData(data)

            let response;
            if (stores.status) {
              response = ReturnResponse.success(stores.response, stores.data);
            } else {
              if (stores.response == "validation") {
                response = ReturnResponse.errorValidation(stores.errors);
              } else {
                response = ReturnResponse.errorServer(stores.errors, stores.message);
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
          const stores: ServiceType = await this.storeService.detailData(id)
          
          let response;
          if (stores.status) {
            response = ReturnResponse.success(stores.response, stores.data);
          } 
          else {
            if (stores.response == "validation") {
              response = ReturnResponse.errorValidation(null, stores.message);
            }
            else {
              response = ReturnResponse.errorServer(stores.data);
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
          const stores: ServiceType = await this.storeService.updateData(id, req.body)
          
          let response;
          if (stores.status) {
            response = ReturnResponse.success(stores.response, stores.data);
          } 
          else {
            if (stores.response == "validation") {
              response = ReturnResponse.errorValidation(stores.errors, stores.message);
            }
            else {
              response = ReturnResponse.errorServer(stores.data);
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
          const stores: ServiceType = await this.storeService.deleteData(id)
          
          let response;
          if (stores.status) {
            response = ReturnResponse.success(stores.response, stores.data);
          } 
          else {
            if (stores.response == "validation") {
              response = ReturnResponse.errorValidation(null, stores.message);
            }
            else {
              response = ReturnResponse.errorServer(stores.data);
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

export default StoreController
