import Jwt from "jsonwebtoken"
import config from "../config";
import Token from "../models/token";

const { REFRESH_TOKEN, ACCESS_TOKEN } = config

const sign = (payload: any, isAccessToken: boolean) => {
    return Jwt.sign(
        payload,
        isAccessToken
            ? ACCESS_TOKEN as string
            : REFRESH_TOKEN as string,
        {
            algorithm: "HS256",
            expiresIn: "7d"
        }
    )
}

const generateAccessToken =  (user: any) => {
    return  sign({ user }, true)
}

const generateRefreshToken = (user: any) => {
    return sign({ user }, false)
}

const verifyAccessToken = (token: string) => {
    return Jwt.verify(token, ACCESS_TOKEN as string)
}

const verifyRefreshToken =  (token: string) => {
    if (token) {
        return Jwt.verify(token, REFRESH_TOKEN as string, (err, res) => {
            if (err){
                 Token.findOneAndRemove({token: token}).then(() => {console.log("token deleted");
                 })
                 return null
            }
            else {
                return res
            }
        })
    }
}

export {
    sign,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}