const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../config");
import Jwt from "jsonwebtoken"
import Token from "../models/token";

const sign = (payload: any, isAccessToken: boolean) => {
    return Jwt.sign(
        payload,
        isAccessToken
            ? ACCESS_TOKEN
            : REFRESH_TOKEN,
        {
            algorithm: "HS256",
            expiresIn: 3600
        }
    )
}

const generateAccessToken = (user: any) => {
    return sign({ user }, true)
}

const generateRefreshToken = (user: any) => {
    return sign({ user }, false)
}

const verifyAccessToken = (token: string) => {
    return Jwt.verify(token, ACCESS_TOKEN)
}

const verifyRefreshToken = (token: string | undefined) => {
    if(token){
        return Jwt.verify(token, REFRESH_TOKEN)
    }
}

const findRefreshToken = async (refreshToken: string ) => {
    const foundToken = await Token.findOne({ token: refreshToken })

    if (!foundToken) {
        return { message: "No autorizado" }
    }

    //const token = foundToken.token ? foundToken.token : ""
    const payload:any = verifyRefreshToken(foundToken.token)

    if(payload){
        //console.log(payload.user);
        const accessToken = generateAccessToken(payload.user) 
        //console.log(accessToken);
        
        return {
            accessToken
        }
    }
    else{
        return {message: "Unauthorized"}
    }

}

export {
    generateAccessToken,
    generateRefreshToken,
    findRefreshToken
}