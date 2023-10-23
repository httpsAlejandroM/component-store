import { Response } from "express"

const responseHandler = (res:Response, statusCode:number, data:any) => {
    res.status(statusCode).json({
        error: data.hasOwnProperty('message')? true : false,
        data
    })
}

export default responseHandler