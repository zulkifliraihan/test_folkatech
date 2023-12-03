import ReturnResponse from '../traits/ReturnResponse';
import { NextFunction, Request, Response } from 'express';
import UserSessionType from '../types/UserSessionType';


const RoleMiddleware = (restrictedRole: string) => (req: Request, res: Response, next: NextFunction) => {
    
    let response
    try {

        const currentUser: any = req.session.currentUser
        const roleCurrentUseer: string = currentUser.userHasRoles[0].role.name

        if (!currentUser) {
            response = ReturnResponse.errorServer("Session is expired",  "Unauthorized Access", 400 )
            return res.status(response.response_code).json(response);
        }
        
        if (restrictedRole != roleCurrentUseer) {
            response = ReturnResponse.errorServer("Restricted Role!",  "Unauthorized Access", 400 )
            return res.status(response.response_code).json(response);
        }
    
        next();

      } 
      catch(error: any) {
        response = ReturnResponse.errorServer(error.message,  "Unauthorized Access", 400 )
        return res.status(response.response_code).json(response);
      }
      
}

export default RoleMiddleware
