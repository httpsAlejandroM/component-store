import { Request, Response } from "express";
import responseHandler from "../utils/responseHandler";
import errorHandler from "../utils/errorHandler";
import getTokenFromHeader from "../utils/getTokenFromHeader";
import { findRefreshToken } from "../services/auth.service";


const signOutController = async (req: Request, res: Response) => {
    try {
        res.status(200).send("Sign out")
    } catch (error) {

    }
}


const refreshTokenController = async (req: Request, res: Response) => {
    const refreshToken = getTokenFromHeader(req.headers)    
    try {
        if (refreshToken) {
            const accessToken = findRefreshToken(refreshToken)
            responseHandler(res, 200, { accessToken })
        }
        else {
            responseHandler(res, 401, { message: "No autorizado 1" })
        }
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}



export {
    signOutController,
    refreshTokenController
}