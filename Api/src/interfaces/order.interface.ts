import { ObjectId } from "mongodb";

export interface ItemsInterface {
    id: string,
    title: string,
    description: string,
    picture_url: string,
    quantity: number,
    unit_price: number
}

interface AddressInterface {
    zip_code: string,
    street_name: string,
    street_number: number
}

export interface PayerInterface {
    name: string, //nombre del comprador
    surname: string, //apellido del comprador
    email: string,
    address: AddressInterface,
    identification: {
        number: string
    }
}

export enum StatusDetail {
    inProcess = "En proceso",
    paid = "Pagado",
    shipped = "Enviado",
    delivered = "Entregado",
    cancelled = "Cancelado"
}

export default interface OrderInterface {
    id: Number, 
    userId: ObjectId,
    items: ItemsInterface,
    status: boolean,
    statusDetail: "En proceso" | "Pagado" | "Enviado" | "Entregado" | "Cancelado"
    datePayment: String,
    total: Number
}