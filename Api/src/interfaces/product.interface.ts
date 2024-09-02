import { Types } from "mongoose"
import Review from "./review.interface"

export default interface Product {
    title:string,
    brand:string,
    image:string,
    description:string[], //Types.Array<string>,
    category:string,
    price:number,
    stock:number,
    reviews: Review[],
    banned:boolean
}
