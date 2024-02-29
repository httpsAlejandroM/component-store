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
            }
        }
    })

    return result
}

export {
    createPreference
}
