const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../config");
import Jwt from "jsonwebtoken"

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

export {
    generateAccessToken,
    generateRefreshToken
}