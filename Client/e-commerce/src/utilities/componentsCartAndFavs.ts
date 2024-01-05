import axios from "axios";
import { API } from "../redux/componentsApi/componentsApi";

const favoritesBDHandler = async (userId:string, componentId:string[]) => {
    try {            
        await axios.put(`${API}/users/cart/fav`, {
            userId: userId,
            favComponentId: componentId
        })
    } catch (error) {
        console.log(error);
        
    }
}

export {
    favoritesBDHandler
}