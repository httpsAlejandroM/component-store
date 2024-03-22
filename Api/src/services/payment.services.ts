import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import OrderInterface, { ItemsInterface, PayerInterface } from "../interfaces/order.interface";
const { MERCADO_PAGO_ACCESS } = require("../config")
import Order from "../models/order"
import { ObjectId } from "mongodb";
import { formatDate } from "../utils/fomatDate";

const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS });
const preference = new Preference(client);
const payment = new Payment(client)

const createPreference = async (items: ItemsInterface[], payer: PayerInterface) => {
    const result = await preference.create({
        body: {
            items: items,
            payer,
            back_urls: {
                success: "https://component-store-delta.vercel.app/",//"http://localhost:5173/",
                failure: "http://127.0.0.1:5173/",
                pending: "http://127.0.0.1:5173/",
            },
            auto_return: "approved",
            notification_url: "https://component-store.onrender.com/payments/webhook",//"https://4d7a-2800-810-5e3-263-dd8b-d14b-1e60-96b2.ngrok-free.app/payments/webhook"
        }
    })

    return result
}

const createOrder = async (order:OrderInterface) => {
    try {
        const existOrder = await Order.findOne({id: order.id})
        
        if(existOrder){
            //agregar logica para modificar orden
            return existOrder
        }
        else{
            const newOrder = await Order.create(order)
            //vaciar carro del usuario
            //logica para descontar stock
            
            return newOrder
        }
    } catch (error) {
        
    }
}

const webhookPayment = async (paymentId: string) => {
    try { 
        const paymentById : any = await payment.get({ id: paymentId })
        const order : OrderInterface = {
            id: Number(paymentId),
            userId: new ObjectId("6566353b329786713a020376"),
            items: paymentById.additional_info?.items,
            status: paymentById.status === "approved"? true : false,
            statusDetail: "Pagado",
            datePayment: formatDate(paymentById.date_approved),
            total: paymentById.transaction_details?.total_paid_amount
        }
        if(paymentById.status === "approved"){
            const newOrder = await createOrder(order)
            console.log({newOrder});
            
            return {mensaje: "Pago aprobado"}
        }
        return {mensaje: "Pago rechazado"}
    } catch (error) {
        console.log(error);

    }
}

export {
    createPreference,
    webhookPayment
}
