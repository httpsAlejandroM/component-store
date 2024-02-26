require("dotenv").config();

const {DB, HOST, PORT_API, ACCESS_TOKEN, REFRESH_TOKEN, MERCADO_PAGO_KEY} = process.env;

module.exports = {
    MONGO_DATABASE: DB, // DB
    MONGO_USER: "admin",
    MONGO_PASSWORD: "admin",
    MONGO_HOST: HOST,
    PORT: PORT_API || 3002,
    ACCESS_TOKEN: ACCESS_TOKEN,
    REFRESH_TOKEN: REFRESH_TOKEN,
    MERCADO_PAGO_ACCESS: MERCADO_PAGO_KEY
}