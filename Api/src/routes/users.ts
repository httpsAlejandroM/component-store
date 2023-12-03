import { Router } from "express";
import { getUsers, loginController, signUpController, putUser, deleteUser } from "../controllers/users.controller";

const router = Router()

router.get("/", getUsers)
router.post("/login", loginController)
router.post("/", signUpController)
router.put("/:id", putUser)
router.delete("/:id", deleteUser)

export { router }