import { ComponentInterface } from "../interfaces"

const cartComponentProps = (component:ComponentInterface, quantity: number) => {
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

export {
    cartComponentProps
}