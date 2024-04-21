import { NextFunction, Request, Response } from "express";
import { IRequiredFields } from "../interfaces/missingFields.interface";

const requiredFields: IRequiredFields = {
    "/auth/signup": ["name", "email", "userName", "password"],
    "/auth/login": ["email", "password"],
    "/components/": ["title", "brand", "image", "description", "category", "price", "stock"]
}

const missingFields = (req: Request, res: Response, next: NextFunction) => {
    const path = req.baseUrl + req.path
    const required = requiredFields[path]
    const missingFields = required.filter((field)=> !(field in req.body))
   
    if(missingFields.length > 0){
      return  res.status(400).json({message: `Faltan campos requeridos: ${missingFields.join(", ")}`})
    }
    next()
}

export {
    missingFields
}