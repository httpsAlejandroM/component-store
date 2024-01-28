import { UserInterface } from "../interfaces/user.interface"

const getUserInfo = (user:any) :UserInterface => {

    const favoritesDetails = user.favorites.map((product:any)=>product.productId)
    const cartDetails = user.cart.map((product:any)=>{
        return {
            _id: product.productId._id,
            price: product.productId.price,
            image: product.productId.image,
            stock: product.productId.stock,
            title: product.productId.title,
            quantity: product.quantity
        }
    })
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        image: user.image,
        favorites: favoritesDetails,
        cart: cartDetails
    }
}

export default getUserInfo