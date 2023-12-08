import { Router } from "express";
import { getUsers, loginController, signUpController, putUser, deleteUser, getUser } from "../controllers/users.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authenticate, getUser)
router.get("/allusers", getUsers)
router.put("/:id", putUser)
router.delete("/:id", deleteUser)

export { router }