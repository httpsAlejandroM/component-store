import { Request, Response } from "express";
import { UserByEmail, createUser, getAllUsers } from "../services/users.service";
import errorHandler from "../utils/errorHandler";
import responseHandler from "../utils/responseHandler";

const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await getAllUsers()
        responseHandler(res, 200, allUsers)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}
const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params
    try {
        const userByEmail = await UserByEmail(email)
        responseHandler(res, 200, userByEmail)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}
const postUser = async (req: Request, res: Response) => {
    const { name, email, birthday, userName } = req.body
    try {
        const newUser = await createUser(name, email, userName)
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
    getUsers,
    getUserByEmail,
    postUser,
    putUser,
    deleteUser
}