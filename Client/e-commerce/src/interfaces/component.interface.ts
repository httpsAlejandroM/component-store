export interface ComponentInterface {
    _id:string,
    title:string,
    brand:string,
    image:string,
    description:string[],
    category:string,
    price:number,
    stock:number
    reviews:string,
    banned:boolean,
}

export interface ResponseBackend {
    error: boolean,
    data: ComponentInterface[]
}