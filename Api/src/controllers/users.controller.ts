import { Request, Response } from "express";
import { getAllUsers } from "../services/users.service";
import errorHandler from "../utils/errorHandler";
import responseHandler from "../utils/responseHandler";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { getComponentById } from "../services/components.service";


const getUser = async (req: CustomRequest, res: Response) => {
    const { user } = req
    try {
        const isAuthenticated = user? true : false
        return responseHandler(res,200, {isAuthenticated, userInfo: user})
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

const putUser = async (req: Request, res: Response) => {

}
const deleteUser = async (req: Request, res: Response) => {

}

const postFavorite = async (req: CustomRequest, res: Response)=>{
    const { componentId } = req.body
    const { user } = req
    
    try {
        const productById = await getComponentById(componentId)
        
        responseHandler(res, 200, productById)
    } catch (error) {
        console.log(error);
        
    }
}

export {
    getUser,
    getUsers,
    putUser,
    deleteUser,
    postFavorite
}