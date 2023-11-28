import { Router } from "express";
import { refreshTokenController } from "../controllers/auth.controller";

const router = Router()

router.get("/", refreshTokenController)


export { router }