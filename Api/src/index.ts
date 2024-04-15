import app from "./app";
import config from "./config";
import connect from "./database"

connect()

app.listen(config.PORT, () => {
    console.log(`listening on port ${config.PORT}`)
})
