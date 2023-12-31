import { UserInterface } from "../interfaces/user.interface"

const getUserInfo = (user:any) :UserInterface => {

    const favoritesDetails = user.favorites.map((product:any)=>product.productId)

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        image: user.image,
        favorites: favoritesDetails,
        cart: user.cart
    }
}

export default getUserInfo