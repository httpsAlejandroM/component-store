const mongoose = require("mongoose");
const {MONGO_HOST, MONGO_DATABASE, MONGO_PASSWORD, MONGO_USER} = require("./config");

async function connect() {
    try {
      const db = await mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DATABASE}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Db connected to ${db.connection.name}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connect