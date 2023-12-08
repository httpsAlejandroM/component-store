import Token from "../models/token";
import getUserInfo from "../utils/getUserInfo";
import Users from "../models/users";
import { generateAccessToken, verifyRefreshToken } from "../utils/tokensHelpers";

const createUser = async (name:string, email:string, userName:string, password:string) => {
    const newUser = new Users({name, email, userName, password}) //otra opcion const newUser = await Users.create({name, email, userName, password})
    const exist = await newUser.userNameExist(userName)
    
    if(exist) return "Username already exist"

    return await newUser.save()
}


const loginUser = async (email:string, password:string) => {
    const userByEmail = await Users.findOne({email:email})
    if(userByEmail) {
        const correctPassword = await userByEmail.comparePassword(password, userByEmail.password)
        if(correctPassword){
            const accessToken = userByEmail.creacteAccessToken()
            const refreshToken = await userByEmail.creacteRefreshToken()
            return {
                isAuthenticated:true,
                accessToken,
                refreshToken,
                userInfo: getUserInfo(userByEmail)
            }
        }
        else{
            return {
                message: "User or password incorrect"
            }
        }
        
    }
    else {
        return {
            message: "User not found"
        }
    }


}

const findRefreshToken = async (refreshToken: string) => {
    const foundToken = await Token.findOne({ token: refreshToken })

    if (!foundToken) return { message: "No autorizado" }

    const token = foundToken.token ? foundToken.token : ""
    const payload: any = verifyRefreshToken(token)
    
    
    if (payload) {
        const accessToken =  generateAccessToken(payload.user)            
        return {
            accessToken
        }
    }
    else return { message: "Unauthorized" }
}

const deleteRefreshToken = async (refreshToken:string) => {
   const deletedToken = await Token.findOneAndRemove({token: refreshToken})

   if(deletedToken){
    return {message:"Token deleted" }
   }
   else{
    return {message:"Token not found"}
   }
}

export {
    createUser,
    loginUser,
    generateAccessToken,
    findRefreshToken,
    deleteRefreshToken
}