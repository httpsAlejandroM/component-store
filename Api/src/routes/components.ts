import { Router } from "express";
import { createBD, deleteComponent, getComponent, getComponents, postComponent, putComponent, getCategoriesAndBrands } from "../controllers/components.controller";
import { missingFields } from "../middlewares/missingFieldsMiddleware";

const router = Router()

router.get("/create", createBD)
router.get("/categories-and-brands", getCategoriesAndBrands)
router.get("/", getComponents)
router.get("/:id", getComponent)
router.post("/" , missingFields, postComponent)
router.put("/:id", putComponent)
router.delete("/:id", deleteComponent)

export  { router } 