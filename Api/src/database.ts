import mongoose from 'mongoose';
import config from "./config";

const { MONGO_DATABASE } = config

async function connect() {
    try {
      const db = await mongoose.connect(`${MONGO_DATABASE}`, {
        bufferCommands: true
      });

        console.log(`Db connected to ${db.connection.name}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connect