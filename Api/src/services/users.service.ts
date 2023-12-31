import Users from "../models/users";
import Products from "../models/products"
import { getComponentById } from "./components.service";
import User, { CartAndFavIds } from "../interfaces/user.interface";
import { Types } from "mongoose";
import getUserInfo from "../utils/getUserInfo";

const getAllUsers = async () => {
    const allUsers = await Users.find().populate({
        path: 'favorites.productId', // nombre de la propiedad que contiene el ID del producto en el array favorites
        model: 'Product', // nombre del modelo al que hace referencia el ID del producto en el array favorites
        select: "_id title brand image category price stock"  // propiedades específicas que quiero recuperar del producto
    })
        .populate({
            path: 'cart.productId',
            model: 'Product',
            select: "_id title brand image category price stock"
        })

    const usersInfo = allUsers.map((user)=> getUserInfo(user))
    return usersInfo
}

const getUserById = async (userId: string) => {
    const userById = await Users.findById(userId)
    return userById
}

const getUserByEmail = async (email: string) => {
  const userByEmail =  await Users.findOne({email:email}).populate({
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

const updateUserFavs = async (user: User, prop: "favorites" | "cart", id: string) => {

    const existProduct = user[prop].find((product) => product.productId == id)

    if (existProduct) {
        const newFavorites = user[prop].filter((product) => product.productId != id)
        return newFavorites
    } else {
        user[prop].push({ productId: id })

        return null
    }

}

const updateCartAndFav = async ({ favComponentId, cartComponentId, email }: CartAndFavIds) => {
    const userById = await getUserByEmail(email)

    if (userById) {
        if (favComponentId) {
            const newFavorites = await updateUserFavs(userById, "favorites", favComponentId)
            if (newFavorites) userById.favorites = newFavorites
        }
        if (cartComponentId) {
            const newCart = await updateUserFavs(userById, "cart", cartComponentId)
            if (newCart) userById.cart = newCart
        }
        await userById.save()
        return userById
    }
}

export {
    getAllUsers,
    updateCartAndFav,
    getUserById,
    getUserByEmail
}