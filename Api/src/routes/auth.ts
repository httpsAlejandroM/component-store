import { Router } from "express";
import { refreshTokenController, logOutController, signUpController, loginController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.post("/signup", signUpController)
router.post("/login", loginController)
router.post("/refresh-token", refreshTokenController)
router.delete("/logout", authenticate, logOutController)

export { router }