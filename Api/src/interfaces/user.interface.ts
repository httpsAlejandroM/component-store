import Favorite from "./favorite.interface";

export default interface User {
    name: string,
    birthday: Date,
    email: string,
    userName: string,
    direction: string,
    isAdmin: boolean,
    banned: boolean,
    image: string,
    favorites: Favorite[]
    cart: Favorite[]
}