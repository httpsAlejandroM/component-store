import { Router } from "express";
import { signOutController } from "../controllers/auth.controller";

const router = Router()

router.delete("/", signOutController)


export { router }