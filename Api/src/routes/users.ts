import { Router } from "express";
import { getUsers, putUser, deleteUser, getUser, updateWishList } from "../controllers/users.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authenticate, getUser)
router.get("/allusers", getUsers)
router.put("/:id", putUser)
router.put("/cart/fav", updateWishList)
router.delete("/:id", deleteUser)

export { router }

//authenticate