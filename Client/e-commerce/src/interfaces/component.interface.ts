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

export interface productId {
    productId: ComponentInterface
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

export interface ComponentByIdQuery {
    id?: string
}

export interface ResponseComponentById {
    error: boolean,
    total: number
    data: ComponentInterface
}

export interface CartComponentInterface {
    _id: string,
    title: string,
    image: string,
    price: number,
    stock: number
    quantity: number
}