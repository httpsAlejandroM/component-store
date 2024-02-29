import MercadoPagoConfig, { Preference } from "mercadopago";
const { MERCADO_PAGO_ACCESS } = require("../config")

const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS });

const createPreference = async (items:any) => {
    const preference = new Preference(client);
    const result = await preference.create({
        body: {
            items: items,
            binary_mode: true,
            back_urls:{
                success: "https://component-store-delta.vercel.app/",
                failure: "http://127.0.0.1:5173/",
                pending: "http://127.0.0.1:5173/",
            },
            auto_return: "approved",
            notification_url:  "https://82ff-2800-810-5e3-263-7854-9f66-4bfe-4913.ngrok-free.app/payments/webhook" //"https://component-store-delta.vercel.app/payments/webhook"
        }
    })

    return result
}

const webhookPayment = async (type:string, paymentId:string) =>{
    try {
        if(type === "payment"){
        }
    } catch (error) {
        console.log(error);
        
    }
}

export {
    createPreference
}
