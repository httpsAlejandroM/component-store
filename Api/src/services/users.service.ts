import Users from "../models/users";
import { CartAndFavIds } from "../interfaces/user.interface";
import getUserInfo from "../utils/getUserInfo";
import { ObjectId } from "mongodb";

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

const updateUserFavs = async (userId: string, prop: 'favorites' | 'cart', ids: string[]) => {

    try {
        const user = await getUserById(userId);
        if (user){
            const existProduct = user[prop].filter((product) =>  ids.includes(product.productId.toString()));
            
            if(existProduct.length > 0){
                const filteredProducts = user[prop].filter((product) =>  !ids.includes(product.productId.toString()));

                return filteredProducts
            }else {

                return [...user[prop], {productId: new ObjectId(ids[0])}]
            }
        }

    } catch (error) {
        throw error;
    }
};


const updateCartAndFav = async ({ favComponentId, cartComponentId, userId }: CartAndFavIds) => {
    const userById = await getUserById(userId)
    if (userById) {
        if (favComponentId) {
            const updatedFavs = await updateUserFavs(userId, "favorites", favComponentId)
            if (updatedFavs) {
                userById.favorites = updatedFavs
            }
        }
        if (cartComponentId) {


        }

        await userById.save()
        return getUserInfo(userById)
    }

}

export {
    getAllUsers,
    updateCartAndFav,
    getUserById,
    getUserByEmail
}


 // if (!user) {
        //     throw new Error('Usuario no encontrado');
        // }

        // const existingProductIds = user[prop].map(product => product.productId.toString());
        // console.log(existingProductIds);
        
        // const newProductIds = ids.filter(id => !existingProductIds.includes(id.toString()));

        // if (newProductIds.length > 0) {
        //     // Agregar nuevos productos a la lista de favoritos del usuario
        //     user[prop].push(...newProductIds.map(productId => ({ productId: new ObjectId(productId) })));
        //     await user.save();
        // } else {
        //     // Eliminar productos existentes de la lista de favoritos del usuario
        //     user[prop] = user[prop].filter(product => !ids.includes(product.productId));
        //     await user.save();
        // }