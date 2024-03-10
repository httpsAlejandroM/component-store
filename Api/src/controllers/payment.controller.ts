import { Request, Response } from "express";
import utils from "../utils"
import { createPreference, webhookPayment } from "../services/payment.services";

const { responseHandler, errorHandler } = utils

const paymentController = async (req: Request, res: Response) => {
    const { items, payer } = req.body
   try {
        const result = await createPreference(items, payer)
     responseHandler(res, 200, result.sandbox_init_point)
   } catch (error) {
    console.log(error);
    
   }
}

const webHookController = async (req: Request, res: Response) => {
    const { query, body } = req    
    try {
        if(query.type === "payment"){
            const paymentId = query["data.id"] as string
            const result = await webhookPayment(paymentId)    

            responseHandler(res, 200, {success: true})
        }
        if(query.topic === "merchant_order"){
            return res.sendStatus(201)
        }
        
    } catch (error) {
        
    }
}

export {
    paymentController,
    webHookController
}