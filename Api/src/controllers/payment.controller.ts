import { Request, Response } from "express";
import utils from "../utils"

const { responseHandler, errorHandler } = utils

const paymentController = async (req: Request, res: Response) => {
   return responseHandler(res, 200, "jujuuu")
}

const webHookController = async (req: Request, res: Response) => {
    res.status(200).json({message: "jujuuu webhook"})
}

export {
    paymentController,
    webHookController
}