import { Schema, model } from "mongoose";
import OrderInterface, { StatusDetail } from "../interfaces/order.interface";

const orderSchema = new Schema<OrderInterface>({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    items:[
        {
            id:{
                type: String,
                required: true
            },
            title:{
                type: String,
                required: true
            },

            description:{
                type: String,
                required: false
            },
            picture_url:{
                type: String,
                required: false
            },
            quantity:{
                type: Number,
                required: true
            },
            unit_price:{
                type: Number,
                required: true
            }
        }
    ],
    status:{
        type: Boolean,
        default: false
    },
    statusDetail:{
        type: String,
        enum: Object.values(StatusDetail),
        required: true
    },
    datePayment:{
        type: Date,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
},
{
    timestamps:true,
    versionKey:false
})

export default model("Order", orderSchema)