import { Router } from "express"
import { paymentController, webHookController } from "../controllers/payment.controller"

const router = Router()

router.post("/", paymentController) 
// router.get("/success", )
// router.get("/failure", )
// router.get("/pending", )
router.post("/webhook", webHookController)

export { router }
