import { Request, Response } from "express";
import BookService from "../services/BookService";
import ReturnResponse from "../traits/ReturnResponse";
import ServiceType from "../types/ServiceType";

class BookController{
    constructor(private bookService: BookService) {}

    async getData(req: Request, res: Response): Promise <any> {
        try {
            const books: ServiceType = await this.bookService.getData()
            
            let response;
            if (books.status) {
              response = ReturnResponse.success(books.response, books.data);
            } else {
              if (books.response == "validation") {
                response = ReturnResponse.errorValidation(books.errors);
              } else {
                response = ReturnResponse.errorServer(books.errors, books.message);
              }
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
            const books: ServiceType = await this.bookService.createData(data)

            let response;
            if (books.status) {
              response = ReturnResponse.success(books.response, books.data);
            } else {
              if (books.response == "validation") {
                response = ReturnResponse.errorValidation(books.errors);
              } else {
                response = ReturnResponse.errorServer(books.errors, books.message);
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
          const books: ServiceType = await this.bookService.detailData(id)
          
          let response;
          if (books.status) {
            response = ReturnResponse.success(books.response, books.data);
          } 
          else {
            if (books.response == "validation") {
              response = ReturnResponse.errorValidation(null, books.message);
            }
            else {
              response = ReturnResponse.errorServer(books.data);
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
          const books: ServiceType = await this.bookService.updateData(id, req.body)
          
          let response;
          if (books.status) {
            response = ReturnResponse.success(books.response, books.data);
          } 
          else {
            if (books.response == "validation") {
              response = ReturnResponse.errorValidation(books.errors, books.message);
            }
            else {
              response = ReturnResponse.errorServer(books.data);
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
          const books: ServiceType = await this.bookService.deleteData(id)
          
          let response;
          if (books.status) {
            response = ReturnResponse.success(books.response, books.data);
          } 
          else {
            if (books.response == "validation") {
              response = ReturnResponse.errorValidation(null, books.message);
            }
            else {
              response = ReturnResponse.errorServer(books.data);
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

export default BookController
