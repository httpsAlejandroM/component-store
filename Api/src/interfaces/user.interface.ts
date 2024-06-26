import Cart from "./cart.interface";
import Favorite from "./favorite.interface";

export default interface User {
    name: string,
    birthday: Date,
    email: string,
    password: string,
    userName: string,
    direction: string,
    isAdmin: boolean,
    banned: boolean,
    image: string,
    favorites: Favorite[],
    cart: Cart[],
    userNameExist(userName:string): Promise<boolean>;
    EmailExist(email:string): Promise<boolean>;
    comparePassword(password: string, hash:string): Promise<boolean>;
    creacteAccessToken(): Promise<string>
    creacteRefreshToken(): Promise<string>
}

export interface UserInterface {
    id: string
    name: string
    email: string
    userName: string
    image: string
    favorites: Favorite[]
    cart: Cart[]
}

interface userId  {
    userId: string
}

export interface FavItem extends userId {
    favComponentId?: string[]
}

export interface CartItem extends userId {
    cartComponentId: string
    quantity: number
}

