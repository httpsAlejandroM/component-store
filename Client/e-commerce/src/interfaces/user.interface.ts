import { CartComponentInterface, ComponentInterface } from "."
import { orderInterface } from "./order.interface"

export interface User {
    id: string
    name: string
    email: string
}

export interface userInfo {
    id?: string
    name?: string
    email?: string
    birthday?: string
    userName?: string
    direction?: string
    isAdmin?: boolean
    banned?: boolean
    image?: string
    favorites: ComponentInterface[]
    cart: CartComponentInterface[]
    orders: orderInterface[]
}

export interface QueryUser {
    name: string
    email:string
} 

export interface userResponse {
    error: boolean
    total: number
    data: AuthState
}

export interface AuthState {
    isAuthenticated: boolean
    accessToken: string 
    refreshToken: string,
    userInfo: userInfo
    message?: string
}

export interface AccessToken {
    accessToken: string
}

export interface AccessTokenResponse {
    error: boolean
    data : AccessToken
}
