import { Router } from "express";
import { refreshTokenController, logOutController, signUpController, loginController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { missingFields } from "../middlewares/missingFieldsMiddleware";

const router = Router()

router.post("/signup", missingFields, signUpController)
router.post("/login", missingFields, loginController)
router.post("/refresh-token", refreshTokenController)
router.delete("/logout", logOutController)

export { router }