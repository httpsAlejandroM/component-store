import { Router } from "express";
import { readdirSync } from "fs";

const router = Router()

readdirSync("./src/routes").filter((file) => {
    const cleanName = file.split(".").shift();
    cleanName !== "index" && 
    import(`./${cleanName}`).then((moduleRouter) =>{router.use(`/${cleanName}`, moduleRouter.router) })
})

export default router