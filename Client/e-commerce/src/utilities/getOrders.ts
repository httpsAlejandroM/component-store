import axios from "axios"
import { API } from "../redux/componentsApi/componentsApi"
import { getAccessToken } from "../auth/AuthHelpers"

const getOrders = async (userId: string) => {
    const accessToken = await getAccessToken()

    try {
        const orders = await axios.get(`${API}/users/${userId}/orders`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
        return orders.data
    } catch (error) {
        console.log(error);
        
    }


}

export {
    getOrders
}