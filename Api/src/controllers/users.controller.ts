import { Request, Response } from "express";
import { getAllUsers, getUserByEmail, updateCartUser, updateFav, allOrders, removeUser, orderById } from "../services/users.service";
import errorHandler from "../utils/errorHandler";
import responseHandler from "../utils/responseHandler";
import { CustomRequest } from "../interfaces/customRequest.interface";
import getUserInfo from "../utils/getUserInfo";


const getUser = async (req: CustomRequest, res: Response) => {
    const { user } = req
    try {
        const isAuthenticated = user? true : false
        if(user) {
            const userByEmail = getUserInfo(await getUserByEmail(user?.email))
            return responseHandler(res,200, {isAuthenticated, userInfo: userByEmail})
        }
        
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
    responseHandler(res,200, {message: "jajasj"})

}
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedUser = await removeUser(id)
        responseHandler(res, 200, deletedUser)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}

const updateFavorites = async (req: CustomRequest, res: Response)=>{
    const { favComponentId, userId  } = req.body
    const { user } = req
    
    if(!userId) return responseHandler(res, 200, {message: "Faltan campos requeridos"})
    try {
        const productById = await updateFav({favComponentId, userId})
        responseHandler(res, 200, productById)
    } catch (error) {
        console.log(error);
        
    }
}

const updateCart = async (req: CustomRequest, res: Response)=>{
    const { cartComponentId, quantity, userId  } = req.body
    const { user } = req
    
    if(!userId) return responseHandler(res, 200, {message: "Faltan campos requeridos"})
    try {
        const productById = await updateCartUser({cartComponentId, quantity, userId})
        responseHandler(res, 200, productById)
    } catch (error) {
        console.log(error);
        
    }
}

const getOrders = async  (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const allUserOrders = await allOrders(userId)
        responseHandler(res, 200, allUserOrders)
    } catch (error) {
        console.log(error);
        
    }
}

const getOrderById = async (req: Request, res: Response) => {
    const { userId, orderId } = req.params

    try {
        const newOrderById = await orderById(userId, orderId)
        responseHandler(res, 200, newOrderById[0])
    } catch (error) {
        console.log(error);
        
    }
}

export {
    getUser,
    getUsers,
    putUser,
    deleteUser,
    updateFavorites,
    updateCart,
    getOrders,
    getOrderById
}