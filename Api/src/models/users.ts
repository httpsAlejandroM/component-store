import { Schema, model } from "mongoose";
import User from "../interfaces/user.interface";

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    birthday: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    direction: {
        type: String,
        required: false,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: "https://i.ibb.co/f2cddkj/perfil-default.png",
        trim: true,
    },
    favorites: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: false,
            }
        },
    ],
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: false,
            }
        },
    ]
},
    {
        timestamps: true,
        versionKey: false,
    });

export default model("User", userSchema);
