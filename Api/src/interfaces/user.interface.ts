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
    favorites: Favorite[]
    cart: Favorite[]
    userNameExist(userName: string): Promise<boolean>;
    comparePassword(password: string): Promise<boolean>;
}