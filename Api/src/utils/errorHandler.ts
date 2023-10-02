import { ErrorRequestHandler, Response } from "express"


const errorHandler = (res:Response,statusCode:number, message:string, error?:any) => {
    res.status(statusCode).json({message})
    console.log(error);
    
}

export default errorHandler