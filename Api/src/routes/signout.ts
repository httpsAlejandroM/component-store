import { Router } from "express";
import { signOutController } from "../controllers/auth.controller";

const router = Router()

router.get("/", signOutController)


export { router }