import { Router } from "express";
import { getUsers, putUser, deleteUser, getUser, updateFavorites, updateCart, getOrders } from "../controllers/users.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authenticate, getUser)
router.get("/users", getUsers)
router.put("/:id", putUser)
router.put("/update/favs", updateFavorites)
router.put("/update/cart", updateCart)
router.delete("/:id", deleteUser)
router.get("/:userId/orders", authenticate, getOrders)

export { router }

//authenticate