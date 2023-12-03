import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class ProductController{
    constructor(private productService: ProductService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
          // console.log(req.files)
            const products: ServiceType = await this.productService.getData()
            
            let response;
            if (products.status) {
              response = ReturnResponse.success(products.response, products.data);
            } else {
              response = ReturnResponse.errorServer(products.data);
            }
            
            return res.status(response.response_code).json(response);
            
        } catch (error: any) {
            const response = ReturnResponse.errorServer( error.message)
            return res.status(response.response_code).json(response);
        }
        
    }

    async createData(req: Request, res: Response): Promise <any> {
      const data = req.body
      data.files = req.files
      try {
          const products: ServiceType = await this.productService.createData(data)

          let response;
          if (products.status) {
            response = ReturnResponse.success(products.response, products.data);
          } else {
            if (products.response == "validation") {
              response = ReturnResponse.errorValidation(products.errors);
            } else {
              response = ReturnResponse.errorServer(products.errors, products.message);
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
          const products: ServiceType = await this.productService.detailData(id)
          
          let response;
          if (products.status) {
            response = ReturnResponse.success(products.response, products.data);
          } 
          else {
            if (products.response == "validation") {
              response = ReturnResponse.errorValidation(null, products.message);
            }
            else {
              response = ReturnResponse.errorServer(products.data);
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
      const data = req.body
      data.files = req.files
      
      try {
          const products: ServiceType = await this.productService.updateData(id, data)
          
          let response;
          if (products.status) {
            response = ReturnResponse.success(products.response, products.data);
          } 
          else {
            if (products.response == "validation") {
              response = ReturnResponse.errorValidation(products.errors, products.message);
            }
            else {
              response = ReturnResponse.errorServer(products.data);
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
          const products: ServiceType = await this.productService.deleteData(id)
          
          let response;
          if (products.status) {
            response = ReturnResponse.success(products.response, products.data);
          } 
          else {
            if (products.response == "validation") {
              response = ReturnResponse.errorValidation(null, products.message);
            }
            else {
              response = ReturnResponse.errorServer(products.data);
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

export default ProductController
