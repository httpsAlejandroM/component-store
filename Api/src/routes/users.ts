import { Router } from "express";
import { getUsers, putUser, deleteUser, getUser, updateFavorites, updateCart } from "../controllers/users.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authenticate, getUser)
router.get("/allusers", getUsers)
router.put("/:id", putUser)
router.put("/update/favs", updateFavorites)
router.put("/update/cart", updateCart)
router.delete("/:id", deleteUser)

export { router }

//authenticate