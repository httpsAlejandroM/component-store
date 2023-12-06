import { Request, Response } from "express";
import { loginUser, createUser, getAllUsers } from "../services/users.service";
import errorHandler from "../utils/errorHandler";
import responseHandler from "../utils/responseHandler";
import { CustomRequest } from "../interfaces/customRequest.interface";


const getUser = async (req: CustomRequest, res: Response) => {
    const { user } = req
    try {
        return responseHandler(res,200, {userInfo: user})
    } catch (error) {
        errorHandler(res, 400, "Algo salio mal", error)
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getAllUsers()
        responseHandler(res, 200, allUsers)
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
const signUpController = async (req: Request, res: Response) => {
    const { name, email, userName, password } = req.body
    try {
        if (!userName || !email || !userName || !password) {
            return errorHandler(res, 400, "Faltan campos requeridos")
        }
        const newUser = await createUser(name, email, userName, password)
        responseHandler(res, 200, newUser)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}
const putUser = async (req: Request, res: Response) => {

}
const deleteUser = async (req: Request, res: Response) => {

}

export {
    getUser,
    getUsers,
    loginController,
    signUpController,
    putUser,
    deleteUser
}