import Jwt from "jsonwebtoken"
const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../config");

const sign = (payload: any, isAccessToken: boolean) => {
    return Jwt.sign(
        payload,
        isAccessToken
            ? ACCESS_TOKEN
            : REFRESH_TOKEN,
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
    return Jwt.verify(token, ACCESS_TOKEN)
}

const verifyRefreshToken = (token: string) => {
    if (token) {
        return Jwt.verify(token, REFRESH_TOKEN)
    }
}


export {
    sign,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}