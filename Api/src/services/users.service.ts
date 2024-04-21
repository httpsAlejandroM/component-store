import Users from "../models/users";
import { CartItem, FavItem } from "../interfaces/user.interface";
import getUserInfo from "../utils/getUserInfo";
import { ObjectId } from "mongodb";
import Order from "../models/order";
import mongoose from "mongoose";

const getAllUsers = async () => {
    const allUsers = await Users.find().populate({
        path: 'favorites.productId', // nombre de la propiedad que contiene el ID del producto en el array favorites
        model: 'Product', // nombre del modelo al que hace referencia el ID del producto en el array favorites
        select: "_id title brand image category price stock"  // propiedades específicas que quiero recuperar del producto
    })
        .populate({
            path: 'cart.productId',
            model: 'Product',
            select: "_id title brand image category price stock",
        })
        .populate({
            path: 'cart', // path de la propiedad quantity dentro de cart
            model: 'User',  // probablemente debería ser 'Product', según tu esquema
            select: 'quantity'
        });

    const usersInfo = allUsers.map((user) => getUserInfo(user))
    return usersInfo
}

const getUserById = async (userId: string) => {
    const userById = await Users.findById(userId)
    return userById
}

const getUserByEmail = async (email: string) => {
    const userByEmail = await Users.findOne({ email: email }).populate({
        path: 'favorites.productId',
        model: 'Product',
        select: "_id title brand image category price stock"
    })
        .populate({
            path: 'cart.productId',
            model: 'Product',
            select: "_id title brand image category price stock"
        })

    return userByEmail
}

const updateUserFavs = async (userId: string, ids: string[]) => {

    try {
        const user = await getUserById(userId);
        if (user) {
            const existProduct = user.favorites.filter((product) => ids.includes(product.productId.toString()));

            if (existProduct.length > 0) {
                const filteredProducts = user.favorites.filter((product) => !ids.includes(product.productId.toString()));

                return filteredProducts
            } else {

                return [...user.favorites, { productId: new ObjectId(ids[0]) }]
            }
        }

    } catch (error) {
        throw error;
    }
};

const updateFav = async ({ favComponentId, userId }: FavItem) => {
    const userById = await getUserById(userId)
    if (userById) {
        if (favComponentId) {
            const updatedFavs = await updateUserFavs(userId, favComponentId)
            if (updatedFavs) {
                userById.favorites = updatedFavs
            }
        }

        await userById.save()
        return getUserInfo(userById)
    }

}

const updateCartUser = async ({ cartComponentId, quantity, userId }: CartItem) => {
    const userById = await getUserById(userId)

    if (!userById) return { message: `No existe usuario con id: ${userId}` }
    try {
        if (cartComponentId) {
            const existProduct = userById.cart.some((product) => product.productId.toString() === cartComponentId)
            if (!existProduct) {
                userById.cart = [...userById.cart, { productId: new ObjectId(cartComponentId), quantity: quantity }]
            }
            else {
                if (quantity === 0) {
                    const removedCartItem = userById.cart.filter((product) => product.productId.toString() !== cartComponentId)
                    userById.cart = removedCartItem
                }
                else {
                    const updatedCart = userById.cart.map((product) => {
                    const updatedCartItem = { ...product, quantity: quantity }
                    return product.productId.toString() === cartComponentId ? updatedCartItem : product
                    })
                    userById.cart = updatedCart
                }
            }

            await userById.save()

            return userById
        }


    } catch (error) {
        console.log(error);

    }

}

const allOrders = async (userId:string) => {
    const allUserOrders = await Order.find({userId: userId})
    return allUserOrders
}

const removeUser = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return { message: `El Id ${id} no es válido` }

    const deletedUser = await Users.findByIdAndRemove(id)

    if (deletedUser) return {message:"Usuario eliminado correctamente"}

    else return {message: `No se encontro usuario con el id ${id}`}
}

export {
    getAllUsers,
    updateFav,
    getUserById,
    getUserByEmail,
    updateCartUser,
    allOrders,
    removeUser
}
