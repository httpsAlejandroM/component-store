import { Schema, model } from "mongoose";
import User from "../interfaces/user.interface";
import bcrypt from "bcrypt"

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
    password: {
        type: String,
        required: true
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

userSchema.pre("save", function(next){
    if(this.isModified("password") || this.isNew){
    const document = this;
    bcrypt.hash(document.password,10,(err, hash)=>{
        if(err){
            next(err)
        }
        else {
            document.password = hash;
            next()
        }
    });
} else {
    next()
}
})

userSchema.methods.userNameExist = async function(userName:string){
    const result = await this.model("User").find({userName})

    return result.length > 0
}

userSchema.methods.comparePassword = async function(password:string, hash:string){
    const same = await bcrypt.compare(password, hash)
    return same
}

export default model("User", userSchema);
