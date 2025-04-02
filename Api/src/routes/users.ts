import { Router } from "express";
import { getUsers, putUser, deleteUser, getUser, updateFavorites, updateCart, getOrders, getOrderById, postReview } from "../controllers/users.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authenticate, getUser)
router.get("/users", getUsers)
router.put("/:id", putUser)
router.put("/update/favs", updateFavorites)//cambiar "update" por :id y cambiar solicitud en front
router.put("/update/cart", updateCart)//cambiar "update" por :id y cambiar solicitud en front
router.delete("/:id", deleteUser)
router.get("/:userId/orders", authenticate, getOrders)
router.get("/:userId/:orderId",authenticate, getOrderById)
router.post("/review", postReview)

export { router }

//authenticate