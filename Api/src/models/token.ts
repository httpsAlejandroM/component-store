import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    id: {
        type: Object,
    },
    token:{
        type: String,
        require: true
    }
})

export default model("Token", tokenSchema)