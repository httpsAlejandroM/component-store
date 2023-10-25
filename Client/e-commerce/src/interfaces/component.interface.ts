export interface ComponentInterface {
    _id: string,
    title: string,
    brand: string,
    image: string,
    description: string[],
    category: string,
    price: number,
    stock: number
    reviews: string,
    banned: boolean,
}

export interface ResponseBackend {
    error: boolean,
    data: ComponentInterface[]
}

export interface QueryApi {
    title: string
    category: string
    brand: string
    order: string
}