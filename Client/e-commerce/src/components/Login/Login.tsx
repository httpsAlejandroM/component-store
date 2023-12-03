import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { PrivateRoutes } from "../../utilities/routes"
import axios from "axios"
import { useState } from "react"


function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password:""
  })

  const { email, password } = formState

  const userInfo = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const fetchUser = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/users/login", {

      })
    } catch (error) {
      console.log(error);
    }
  }

  if (userInfo.email) {
    return <Navigate to={`/${PrivateRoutes.DASHBOARD}`} />
  }

  return (
    <section className="min-vh-100 content d-flex justify-content-center align-items-center">
      <form className="bg-light w-25 p-5 d-flex flex-column rounded rounded-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"> Email address </label>
          <input
            type="email"
            placeholder="Ingrese su Email"
            name="email"
            value={email}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Ingrese su password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={(e) => fetchUser(e)} className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}
export default Login