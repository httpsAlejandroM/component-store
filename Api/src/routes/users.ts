import { Router } from "express";
import { getUsers, getUserByEmail, postUser, putUser, deleteUser } from "../controllers/users.controller";

const router = Router()

router.get("/", getUsers)
router.post("/login", getUserByEmail)
router.post("/", postUser)
router.put("/:id", putUser)
router.delete("/:id", deleteUser)

export { router }