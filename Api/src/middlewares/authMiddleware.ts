import { NextFunction, Request, Response } from "express"
import getTokenFromHeader from "../utils/getTokenFromHeader"
import responseHandler from "../utils/responseHandler"
import { verifyAccessToken } from "../services/auth.service"
import { CustomRequest } from "../interfaces/customRequest.interface"

const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = getTokenFromHeader(req.headers)
    
    if (token) {
        const decoded:any = verifyAccessToken(token)        
        if (decoded) {
            req.user = { ...decoded.user }            
            next()
        }
        else {
            responseHandler(res, 401, { message: "No token provided" })
        }
    }
    else {
        responseHandler(res, 401, { message: "No token provided" })
    }
}

export {
    authenticate
}