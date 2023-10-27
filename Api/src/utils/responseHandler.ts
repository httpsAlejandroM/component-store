import { Response } from "express"

const responseHandler = (res:Response, statusCode:number, data:any, total?:any) => {
    res.status(statusCode).json({
        error: data.hasOwnProperty('message')? true : false,
        total,
        data
    })
}

export default responseHandler