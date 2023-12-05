import { Outlet, Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { PublicRoutes } from "../utilities/routes"

function AuthGuard() {
    const userInfo = useAppSelector((state)=>state.userReducer)

  return userInfo.isAuthenticated? <Outlet/> : <Navigate to={PublicRoutes.LOGIN}/>
}
export default AuthGuard