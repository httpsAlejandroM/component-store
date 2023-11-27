import { Navigate } from "react-router-dom"
import { useLoginMutation } from "../../redux/userApi/userApi"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getUser } from "../../redux/slices/user.slice"
import { PrivateRoutes } from "../../utilities/routes"


function Login() {
  const userInfo = useAppSelector((state)=>state.userReducer)
  const [login] = useLoginMutation({ fixedCacheKey: "shared-update-post" })
  const dispatch = useAppDispatch()

  const fetchUser = async (e: any) => {
    e.preventDefault()
    try {
      const userInfo = await login({ email: "Ragnar@asgard.com" }).unwrap()
      userInfo && dispatch(getUser(userInfo))
    } catch (error) {
      console.log(error);

    }
  }

  if(userInfo.email){
    return <Navigate to={`/${PrivateRoutes.DASHBOARD}`}/>
  }
  
  return (
    <section className="min-vh-100 content d-flex justify-content-center align-items-center">
      <form className="bg-light w-25 p-5 d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" onClick={(e) => fetchUser(e)} className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}
export default Login