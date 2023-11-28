import { Request, Response } from "express";
import responseHandler from "../utils/responseHandler";
import errorHandler from "../utils/errorHandler";


const signUpController = async (req:Request , res:Response) => {
    const { userName, email } = req.body
    try {
        if(!userName || !email ){
            return errorHandler(res,400,"Fiels are required")
        }
         responseHandler(res, 200, {messsage: "Sign up"})
    } catch (error) {
        console.log(error);
        
    }
}

const signOutController = async (req:Request , res:Response) => {
    try {
        res.status(200).send("Sign out")
    } catch (error) {
        
    }
}

const loginController = async (req:Request , res:Response) => {
    try {
        res.status(200).send("Login")
    } catch (error) {
        
    }
}

const refreshTokenController = async (req:Request , res:Response) => {
    try {
        res.status(200).send("Resfresh Token")
    } catch (error) {
        
    }
}



export {
    signUpController,
    signOutController,
    loginController,
    refreshTokenController
}