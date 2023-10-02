"use strict";
const server = require("./app");
const db = require("./database");
db();
server.listen(3000, () => {
    console.log(`listening on port ${3000}`);
});
