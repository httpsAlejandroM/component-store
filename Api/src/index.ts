const server = require("./app")
const { PORT } = require("./config");
require("./database")()

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
