import axios from "axios"
import { CartComponentInterface, ComponentInterface } from "../interfaces"
import { API } from "../redux/componentsApi/componentsApi"

const cartComponentProps = (component: ComponentInterface, quantity: number) => {
    const componentFilteredProps = {
        _id: component._id,
        title: component.title,
        category: component.category,
        image: component.image,
        stock: component.stock,
        price: component.price,
        quantity: quantity
    }

    return componentFilteredProps
}

const checkExistProduct = (cartUser: CartComponentInterface[], product: CartComponentInterface) => {
    const existProduct = cartUser.some((component) => component._id === product._id)

    return existProduct
}

const getProductCartById = (cartUser: CartComponentInterface[], product: CartComponentInterface | ComponentInterface) => {
    const productById = cartUser.find((component) => component._id === product._id)

    return productById
}

const isStockSufficient = (cartUser: CartComponentInterface[], product: CartComponentInterface) => {
    const productToCheck = getProductCartById(cartUser, product)

    if (productToCheck) {
        const totalQuantityTocheck = productToCheck.quantity + product.quantity
       const hasSufficientStock = product.stock >= totalQuantityTocheck ? true : false

       return hasSufficientStock
    }
    return true
}

const filterProductsCartById = (cartUser: CartComponentInterface[], product: CartComponentInterface) => {
    const filteredCart = cartUser.filter((component)=> component._id !== product._id)

    return filteredCart
}

const updateProductById = (cartUser: CartComponentInterface[], product: CartComponentInterface) => {
    const updatedCartProducts = cartUser.map((component) => {
        return component._id === product._id ? product : component;
    });

    return updatedCartProducts
}

const updateCartBD = async (userId: string, cartComponentId: string, quantity: number) => {
    try {
        await axios.put(`${API}/users/update/cart`,{
            userId,
            quantity,
            cartComponentId
        })
    } catch (error) {
        console.log(error);
        
    } 
}


export {
    cartComponentProps,
    getProductCartById,
    checkExistProduct,
    isStockSufficient,
    filterProductsCartById,
    updateProductById,
    updateCartBD
}