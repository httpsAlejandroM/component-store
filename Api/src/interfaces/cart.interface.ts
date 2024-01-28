import { ObjectId } from "mongodb";

export default interface Cart {
    productId: ObjectId,
    quantity: number
}