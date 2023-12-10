import { Link, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes"
import axios from "axios"
import useForm from "../../customHooks/useForm"
import { useState } from "react"
import { getUser, setTokens } from "../../redux/slices/user.slice"
import { BASE_URL_AUTH } from "./SignUp"


function Login() {
  const initialForm = {
    email: "",
    password: ""
  }
  const { email, password, onInputChange } = useForm(initialForm)
  const [error, setError ] = useState("")

  const userInfo = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  if (userInfo.isAuthenticated) {
    return <Navigate to={`/${PrivateRoutes.DASHBOARD}`} />
  }

  const fetchUser = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL_AUTH}/login`, {
        email,
        password
      })
      if (response.data.error) {
        setError(response.data.data.message)
      }
      else{
      setError("")  
      dispatch(getUser(response.data))
      dispatch(setTokens(response.data))
      return <Navigate to={`/${PrivateRoutes.DASHBOARD}`} />
      }

    } catch (error) {
      console.log(error);
    }
  }


 
  return (
    <section className="min-vh-100 content d-flex justify-content-center align-items-center">
      <form className="bg-light w-25 p-5 d-flex flex-column rounded rounded-3">
        <div>
          <p style={{backgroundColor:"#FFDADA"}} className="text-danger fw-bold">{error}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            placeholder="Ingrese su Email"
            name="email"
            value={email}
            onChange={onInputChange}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Ingrese su password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={(e) => fetchUser(e)} className="btn btn-primary">Submit</button>
        <div className="d-flex mt-4"><p>Aun no esta registrado? <Link className="link-primary" to={`/${PublicRoutes.SIGNUP}`}>Registrese</Link></p></div>
      </form>
    </section>
  )
}
export default Login