import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import OrderInterface, { ItemsInterface, PayerInterface } from "../interfaces/order.interface";
import config from "../config"
import Order from "../models/order"
import { formatDate } from "../utils/fomatDate";
import User from "../models/users";
import { filteredItemsById } from "../utils/userHelpers";
import { discountStock } from "../utils/productHelper";

const client = new MercadoPagoConfig({ accessToken: config.MERCADO_PAGO_ACCESS as string });
const preference = new Preference(client);
const payment = new Payment(client)

const createPreference = async (items: ItemsInterface[], payer: PayerInterface, metadata: string) => {

    try {
        const result: any = await preference.create({
            body: {
                items: items,
                payer,
                metadata,
                back_urls: {
                    success: `${config.CLIENT_URL}success_payment/`,
                    failure: "http://127.0.0.1:5173/",
                    pending: "http://127.0.0.1:5173/",
                },
                auto_return: "approved",
                notification_url: config.API_NOTIFICATION_URL
            }
        })

        return result
    } catch (error) {

    }


}

const createOrder = async (order: OrderInterface) => {
    try {
        const user = await User.findOne({ _id: order.userId })
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
