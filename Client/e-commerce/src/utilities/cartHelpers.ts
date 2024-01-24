import { CartComponentInterface, ComponentInterface } from "../interfaces"

const cartComponentProps = (component: ComponentInterface, quantity: number) => {
    const componentFilteredProps = {
        _id: component._id,
        title: component.title,
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

const getProductCartById = (cartUser: CartComponentInterface[], product: CartComponentInterface) => {
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

export {
    cartComponentProps,
    getProductCartById,
    checkExistProduct,
    isStockSufficient,
    filterProductsCartById
}