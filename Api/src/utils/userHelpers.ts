import Cart from "../interfaces/cart.interface"
import { ItemsInterface } from "../interfaces/order.interface"

const filteredItemsById = (cart: Cart[], order: ItemsInterface[]) => {
  return  cart.filter((cartComponent) => {
        return !order.some((orderComponent) => {
            return orderComponent.id === cartComponent.productId.toString()
        })
    })


}

export {
    filteredItemsById
}