
const getUserInfo = (user:any) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        image: user.image,
        favorites: user.favorites,
        cart: user.cart
    }
}

export default getUserInfo