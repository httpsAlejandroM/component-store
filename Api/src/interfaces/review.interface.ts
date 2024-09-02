import { ObjectId } from "mongodb"

export default interface Review {
    userName: string,
    productId: ObjectId
    comment: string,
    calification: number,
    date: string
}

