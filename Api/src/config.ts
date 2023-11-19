require("dotenv").config();

const {DB, HOST, PORT_API} = process.env;

module.exports = {
    MONGO_DATABASE: DB, //"mongodb://localhost/component-store"
    MONGO_USER: "admin",
    MONGO_PASSWORD: "admin",
    MONGO_HOST: HOST,
    PORT: PORT_API || 3002
}