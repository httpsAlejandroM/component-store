import { Router } from "express";
import { refreshTokenController, logOutController, signUpController, loginController } from "../controllers/auth.controller";

const router = Router()

router.post("/signup", signUpController)
router.post("/login", loginController)
router.post("/refresh-token", refreshTokenController)
router.delete("/logout", logOutController)

export { router }