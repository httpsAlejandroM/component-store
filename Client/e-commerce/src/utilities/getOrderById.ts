import axios from "axios"
import { API } from "../redux/componentsApi/componentsApi"
import { orderInterface } from "../interfaces/order.interface"
import { getAccessToken } from "../auth/AuthHelpers"

const getOrderById = async (userId: string, orderId: string) => {
    try {
        const accessToken = await getAccessToken()
        const orderById = await axios.get(`${API}/users/${userId}/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        return orderById.data.data as orderInterface
    } catch (error) {

    }
}

export {
    getOrderById
}