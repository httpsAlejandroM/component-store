import { Link, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes"
import axios from "axios"
import useForm from "../../customHooks/useForm"
import { useState } from "react"
import { getUser, setTokens } from "../../redux/slices/user.slice"
import { BASE_URL_AUTH } from "./SignUp"
import onFireGamingLogo from "../../assets/firebase.png"
import facebook from "../../assets/facebok.png"
import google from "../../assets/google.png"

function Login() {
  const initialForm = {
    email: "",
    password: ""
  }
  const { email, password, onInputChange } = useForm(initialForm)
  const [error, setError] = useState("")

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
      else {
        console.log("usuario logeado");

        setError("")
        dispatch(getUser(response.data))
        dispatch(setTokens(response.data))
        //return <Navigate to={`/${PrivateRoutes.DASHBOARD}`}  />
      }

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <section className="min-vh-100 container-fluid content bg-section-login d-flex align-items-center justify-content-center">
      <div className="row container align-items-stretch mt-4 mb-4">
        <div className="col bg-login d-none d-lg-block col-md-5 col-lg-6 rounded-start-3" >

        </div>
        <div className="col bg-light rounded-end-3 p-5">

          <div className="text-end">
            <img src={onFireGamingLogo} style={{ width: 48 }} alt="Logo" />
            <h2 className="fw-bold text-dark text-center py-4">Bienvenido</h2>

            {/* ********** ERROR MESSAGE *********** */}

            <div>
              <p style={{ backgroundColor: "#FFDADA" }} className="text-danger text-start fw-bold">{error}</p>
            </div>

            <form className="bg-light">

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="email" >Correo electrónico</label>
                <input 
                className="form-control" 
                type="email" id="email" 
                value={email} name="email" 
                onChange={onInputChange} />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="password" >Contraseña</label>
                <input 
                className="form-control" 
                type="password" id="password" 
                value={password} name="password" 
                onChange={onInputChange} />
              </div>

              <div className="d-grid">
                <button className="btn btn-buy" type="submit" onClick={fetchUser}>Iniciar Sesión</button>
              </div>

              <div className="my-3 text-dark text-start">
                <span className="text-dark ">No tienes cuenta? <Link className="" to={`/${PublicRoutes.SIGNUP}`}>Regístrate</Link></span>
               
                <br />
                {/* <span><a href="#">Recuperar contraseña</a></span> */}
              </div>
            </form>

            <hr />

            <div className="container w-100 my-5 text-dark ">
              <div className="row text-center">
                <div className="col-12">Iniciar Sesión con</div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-sm">
                  <button className="btn btn-outline-primary w-100 my-1">
                    <div className="row align-items-center">
                      <div className="col-sm-2  col-4 offset-1 offset-sm-0">
                        <img src={facebook} style={{ width: 32 }} alt="Facebook logo" />
                      </div>
                      <div className="col-sm-10 col-2">
                        Facebook
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-12 col-sm">
                  <button className="btn btn-outline-danger w-100 my-1">
                    <div className="row align-items-center">
                      <div className="col-sm-2  col-4 offset-1 offset-sm-0">
                        <img src={google} style={{ width: 32 }} alt="Google logo" />
                      </div>
                      <div className="col-sm-10 col-2">
                        Google
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login