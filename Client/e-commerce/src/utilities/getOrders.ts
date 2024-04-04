import axios from "axios"
import { API } from "../redux/componentsApi/componentsApi"
import { getAccessToken } from "../auth/AuthHelpers"

const getOrders = async (userId: string) => {
    const accessToken = await getAccessToken()
    const orders = await axios.get(`${API}/users/${userId}/orders`, {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    return orders.data
}

export {
    getOrders
}