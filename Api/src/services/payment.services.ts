import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import OrderInterface, { ItemsInterface, PayerInterface } from "../interfaces/order.interface";
const { MERCADO_PAGO_ACCESS } = require("../config")
import Order from "../models/order"
import { formatDate } from "../utils/fomatDate";
import User from "../models/users";
import { filteredItemsById } from "../utils/userHelpers";
import Products from "../models/products";
import { discountStock } from "../utils/productHelper";

const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS });
const preference = new Preference(client);
const payment = new Payment(client)

const createPreference = async (items: ItemsInterface[], payer: PayerInterface, metadata: string) => {
    const result = await preference.create({
        body: {
            items: items,
            payer,
            metadata,
            back_urls: {
                success: "https://component-store-delta.vercel.app/",//"http://localhost:5173/",//
                failure: "http://127.0.0.1:5173/",
                pending: "http://127.0.0.1:5173/",
            },
            auto_return: "approved",
            notification_url: "https://component-store.onrender.com/payments/webhook",//"https://236c-2800-810-5e3-345-4868-3e93-c813-7c0.ngrok-free.app/payments/webhook",//
        }
    })

    return result
}

const createOrder = async (order: OrderInterface) => {
    const user = await User.findOne({ _id: order.userId })
    try {
        const existOrder = await Order.findOne({ id: order.id })
        if (!existOrder) {
            const createdOrder = await Order.create(order)
            if (user && user.cart.length > 0) {
                user.cart = filteredItemsById(user.cart, order.items)
                await user.save()
            }
            discountStock(order.items)
            return createdOrder
        }
        return
    } catch (error) {
        console.log(error);

    }
}

const webhookPayment = async (paymentId: string) => {
    try {
        const paymentById: any = await payment.get({ id: paymentId })
        const order: OrderInterface = {
            id: Number(paymentId),
            userId: paymentById.metadata.id,
            items: paymentById.additional_info?.items,
            status: paymentById.status === "approved" ? true : false,
            statusDetail: "Pagado",
            datePayment: formatDate(paymentById.date_approved),
            total: paymentById.transaction_details?.total_paid_amount
        }
        if (paymentById.status === "approved") {
            const newOrder = await createOrder(order)
            console.log("Pago aprobado");

            return { mensaje: "Pago aprobado" }
        }
        return { mensaje: "Pago rechazado" }
    } catch (error) {
        console.log(error);

    }
}

export {
    createPreference,
    webhookPayment
}
