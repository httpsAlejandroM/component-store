import Token from "../models/token";
import getUserInfo from "../utils/getUserInfo";
import Users from "../models/users";
import { generateAccessToken, verifyRefreshToken } from "../utils/tokensHelpers";
import { getUserByEmail } from "./users.service";

const createUser = async (name:string, email:string, userName:string, password:string) => {
    const newUser = new Users({name, email, userName, password}) //otra opcion const newUser = await Users.create({name, email, userName, password})
    const errorMessage = []
    const emailExist = await newUser.EmailExist(email)
    const userNameExist = await newUser.userNameExist(userName)

    if(emailExist)  errorMessage.push("Email en uso")
    if(userNameExist) errorMessage.push("Nombre de usuario en uso")
    if(errorMessage.length > 0) return {message: errorMessage.join(", ")}

    return getUserInfo(await newUser.save())
}


const loginUser = async (email:string, password:string) => {
    const userByEmail =  await getUserByEmail(email) //await Users.findOne({email:email})
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
                message: "Correo electrónico o Contraseña incorrectos"
            }
        }
        
    }
    else {
        return {
            message: "Correo electrónico o Contraseña incorrectos"
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
    else return { message: "Expired token" }
}

const deleteRefreshToken = async (refreshToken:string) => {
   const deletedToken = await Token.findOneAndRemove({token: refreshToken})

   if(deletedToken){
    return {success:"Token deleted" }
   }
   else{
    return {message:"Token not found"}
   }
}

export {
    createUser,
    loginUser,
    findRefreshToken,
    deleteRefreshToken
}