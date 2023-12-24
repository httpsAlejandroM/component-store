import { Outlet, Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { PublicRoutes } from "../utilities/routes"
import Loader from "./Loader"

function AuthGuard() {
  const userInfo = useAppSelector((state) => state.userReducer)

  if(userInfo.loading){
    return <Loader/>
  }
  else if (userInfo.loading){
    userInfo.isAuthenticated ? <Outlet /> : <Navigate to={PublicRoutes.LOGIN} />
  }


}
export default AuthGuard