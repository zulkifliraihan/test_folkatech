import ReturnResponse from '../traits/ReturnResponse';
import SecurityHelper from '../helpers/SecurityHelper';
import { NextFunction, Request, Response } from 'express';
import UserSessionType from '../types/UserSessionType';

const securityHelper = new SecurityHelper()

const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization
    let response
    if (!authHeader) {
        response = ReturnResponse.errorServer("Token is required", "Unauthorized Access", 400 );
        return res.status(response.response_code).json(response);
    }

    const token = authHeader.replace('Bearer ', '')

    try {
        const verifyToken: any = securityHelper.verifyToken(token);

        const data = verifyToken.data

        const currentUser: any = req.session.currentUser

        if (!currentUser) {
            response = ReturnResponse.errorServer("Session is expired",  "Unauthorized Access", 400 )
            return res.status(response.response_code).json(response);
        }

        if (currentUser.id != data.id) {
            response = ReturnResponse.errorServer("Unmatch Authentication ",  "Unauthorized Access", 400 )
            return res.status(response.response_code).json(response);
        }

        return next()
      } catch(error: any) {
        response = ReturnResponse.errorServer(error.message,  "Unauthorized Access", 400 )
        return res.status(response.response_code).json(response);
      }

      
}

export default JWTMiddleware
