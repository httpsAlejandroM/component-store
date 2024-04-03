export type orderInterface = {
    id: number
    items : {
        id: string
        title: string
        description: string
        picture_url: string
        quantity: number
        unit_price: number
    }[]
    statusDetail: string
    datePayment: string
    total: number
}
