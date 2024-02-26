import MercadoPagoConfig, { Preference } from "mercadopago";
const { MERCADO_PAGO_ACCESS } = require("../config")

const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCESS });

const createPreference = async (items:any) => {
    const preference = new Preference(client);
    const result = await preference.create({
        body: {
            items: items
        }
    })

    return result
}

export {
    createPreference
}
