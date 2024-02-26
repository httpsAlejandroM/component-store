import { Request, Response } from "express";
import utils from "../utils"
import { createPreference } from "../services/payment.services";

const { responseHandler, errorHandler } = utils

const paymentController = async (req: Request, res: Response) => {
    const { items } = req.body
   try {
        const result = await createPreference(items)
     responseHandler(res, 200, result.sandbox_init_point)
   } catch (error) {
    console.log(error);
    
   }
}

const webHookController = async (req: Request, res: Response) => {
    res.status(200).json({message: "jujuuu webhook"})
}

export {
    paymentController,
    webHookController
}