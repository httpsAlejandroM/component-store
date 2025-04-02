import { Schema, Types, model, Model } from "mongoose";
import  Product  from "../interfaces/product.interface";
import Review from "../interfaces/review.interface";

const productSchema = new Schema<Product>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    brand:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: [String],
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        default: 0,
        required: true,
        trim: true
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review" // Referencia al modelo de Review
    }
    ],
    banned:{
        type: Boolean,
        default: false
    },
},
{
    timestamps:true,
    versionKey:false
})

export default model("Product", productSchema)