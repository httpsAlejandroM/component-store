import { Router } from "express";
import { createBD, deleteComponent, getComponent, getComponents, postComponent, putComponent } from "../controllers/components.controller";

const router = Router()

router.get("/create", createBD)
router.get("/", getComponents)
router.get("/:id", getComponent)
router.post("/", postComponent)
router.put("/:id", putComponent)
router.delete("/:id", deleteComponent)

export  { router } 