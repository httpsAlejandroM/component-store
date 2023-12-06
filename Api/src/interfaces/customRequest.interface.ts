import { Request } from "express"
import { UserInterface } from "./user.interface"

interface CustomRequest extends Request  {
    user?: UserInterface
}

export {
    CustomRequest
}