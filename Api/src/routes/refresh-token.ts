import { Router } from "express";
import { refreshTokenController } from "../controllers/auth.controller";

const router = Router()

router.post("/", refreshTokenController)


export { router }