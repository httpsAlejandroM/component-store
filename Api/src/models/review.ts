import { Schema, model } from "mongoose";
import Review from "../interfaces/review.interface";

const reviewSchema = new Schema<Review>({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    calification: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: String,
        trim: true
    }
},
{
    timestamps:true,
    versionKey:false
})

export default model("Review", reviewSchema)