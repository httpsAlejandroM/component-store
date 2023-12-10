import { Request, Response } from "express";
import responseHandler from "../utils/responseHandler";
import errorHandler from "../utils/errorHandler";
import getTokenFromHeader from "../utils/getTokenFromHeader";
import { createUser, deleteRefreshToken, findRefreshToken, loginUser } from "../services/auth.service";

const signUpController = async (req: Request, res: Response) => {
    const { name, email, userName, password } = req.body
    try {
        if (!userName || !email || !userName || !password) {
            return responseHandler(res, 200, {message: ["Faltan campos requeridos"]})
        }
        const newUser = await createUser(name, email, userName, password)
        responseHandler(res, 200, newUser)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return responseHandler(res, 200, { message: "Faltan campos requeridos" })
        }
        const userByEmail = await loginUser(email, password)
        responseHandler(res, 200, userByEmail)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}

const refreshTokenController = async (req: Request, res: Response) => {
    const refreshToken = getTokenFromHeader(req.headers)    
    try {
        if (refreshToken) {
            const accessToken = await findRefreshToken(refreshToken)
            responseHandler(res, 200, { accessToken })
        }
        else {
            responseHandler(res, 401, { message: "No autorizado 1" })
        }
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}


const logOutController = async (req: Request, res: Response) => {
    const refreshToken = getTokenFromHeader(req.headers)
    try {
        if(refreshToken){
            const deletedToken = await deleteRefreshToken(refreshToken)
            responseHandler(res,200, deletedToken)
        }
    } catch (error) {
        errorHandler(res,400, "Algo salio mal", error)
    }
}




export {
    signUpController,
    loginController,
    refreshTokenController,
    logOutController,
}