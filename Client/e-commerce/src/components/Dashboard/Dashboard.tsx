import { userResponse } from "../../interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { clearTokens } from "../../redux/slices/user.slice";
import { getRefreshToken } from "../../utilities/getRefreshToken";
import { BASE_URL_AUTH } from "../Auth/SignUp";
import Sidebar from "./Sidebar";

function Dashboard() {

    //const userInfo = useAppSelector((state)=>state.userReducer)
    //const dispatch = useAppDispatch()
    
    // const logOut = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL_AUTH}/logout`,{
    //             method: "DELETE",
    //             headers: {
    //               "Content-Type": "application/json",
    //               Authorization: `Bearer ${getRefreshToken()}`
    //             }
    //           })
    //           const json = await response.json() as userResponse
    //           if(json.error){
    //             console.log(json.data.message);
    //           return null
    //           }else{
    //             dispatch(clearTokens())
    //             console.log("Sesión cerrada");
    //           }
              
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }
  
    return (
        <section className="min-vh-100 d-flex flex-row">
           <Sidebar/>
           
        </section>
    )
}
export default Dashboard