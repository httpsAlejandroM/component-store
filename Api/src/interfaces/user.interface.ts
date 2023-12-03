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
    cart: Favorite[]
    userNameExist(userName: string): Promise<boolean>;
    comparePassword(password: string, hash:string): Promise<boolean>;
    creacteAccessToken(): Promise<string>
    creacteRefreshToken(): Promise<string>
}

export interface UserInterface {
    userName: string
    name: string
    _id: string
    image: string
}