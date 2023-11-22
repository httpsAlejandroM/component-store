import { ComponentInterface } from "."

export interface User {
    id: string
    name: string
    email: string
}

export interface userInfo {
    id: string
    name: string
    email: string
    birthday: Date
    userName: string
    direction: string
    isAdmin: boolean
    banned: boolean
    image: string
    favotires: ComponentInterface[]
    cart: ComponentInterface[]
}

export interface userResponse {
    error: boolean
    total: number
    data: userInfo
}