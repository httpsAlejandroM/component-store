import { Router } from "express";
import { getUsers, loginHandler, postUser, putUser, deleteUser } from "../controllers/users.controller";

const router = Router()

router.get("/", getUsers)
router.post("/login", loginHandler)
router.post("/", postUser)
router.put("/:id", putUser)
router.delete("/:id", deleteUser)

export { router }