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
    total: number
    data: ComponentInterface[]
}

export interface QueryApi {
    title: string
    category: string
    brand: string
    order: string
    page: number
    perPage: number
    minPrice?: number | string
    maxPrice?: number | string
}