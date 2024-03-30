import { ItemsInterface } from "../interfaces/order.interface";
import Products from "../models/products";

const discountStock = async (orderItems: ItemsInterface[]) => {
    try {
        for (const component of orderItems) {
            await Products.findByIdAndUpdate(component.id, { $inc: { stock: -component.quantity } })
            console.log(`Se actualizo el stock de ${component.title}`);
        }
    } catch (error) {
        console.log(error);

    }
}

export {
    discountStock
}