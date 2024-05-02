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
import { validateEmail, validatePassword } from "../../utilities/inputsValidates"
import { Tooltip, } from "react-tooltip"

function Login() {
  const initialForm = {
    email: "",
    password: ""
  }
  const { email, password, onInputChange } = useForm(initialForm)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  const userInfo = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  if (userInfo.isAuthenticated) {
    return <Navigate to={`${PrivateRoutes.DASHBOARD}`} />
  }

  const fetchUser = async (e: any) => {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_AUTH}/login`, {
        email,
        password
      })
      if (response.data.error) {
        setError(response.data.data.message)
        setLoading(false);
      }
      else {
        setError("")
        setLoading(false);
        dispatch(getUser(response.data))
        dispatch(setTokens(response.data))
      }

    } catch (error) {
      console.log(error);
    }
  }

  const loadingSpinner = <div style={{width:"1.1rem", height:"1.1rem", borderWidth:"0.2em"}} className="spinner-border text-light p-0 m-0" role="status">
    <i className="visually-hidden p-0">Loading...</i>
  </div>


  return (
    <section className="min-vh-100 container-fluid content bg-section-login d-flex align-items-center justify-content-center">
      {email && !validateEmail(email) && <Tooltip
        id="my-tooltip"
        place="bottom"
        isOpen={true}
        style={{ backgroundColor: "#13181d" }}
      />
      }
      {
        password && !validatePassword(password) &&
        <Tooltip
          id="passwordTooltip"
          place="bottom"
          isOpen={true}
          style={{ backgroundColor: "#13181d" }}
        >
          <div className="text-start bg-tooltip">
            <p>La contraseña debe contener:</p>
            <ul className="bg-tooltip px-3">
              <li className="bg-tooltip">Al menos una letra mayúscula.</li>
              <li className="bg-tooltip">Al menos un número.</li>
              <li className="bg-tooltip">Entre 8 a 20 caracteres.</li>
            </ul>
          </div>
        </Tooltip>
      }
      <div className="row container align-items-stretch mt-4 mb-4">
        <div className="col bg-login d-none d-lg-block col-md-5 col-lg-6 rounded-start-3" >

        </div>
        <div className="col bg-light rounded-end-3 p-5">

          <div className="text-end">
            <img src={onFireGamingLogo} style={{ width: 48 }} alt="Logo" />
            <h2 className="fw-bold text-dark text-center py-4">Bienvenido</h2>

            {/* ********** ERROR MESSAGE *********** */}

            <div id="errorLogin">
              {error && <p style={{ backgroundColor: "#fce8e8" }} className="text-danger text-start py-1 px-2">{error}</p>}
            </div>


            <form id="loginForm" className="bg-light " noValidate>

              <div className="mb-4 text-start ">
                <label className="form-label text-dark" htmlFor="email" >Correo electrónico</label>
                <input
                  autoComplete="off"
                  className={`form-control ${email ? !validateEmail(email) ? "is-invalid" : "is-valid" : ""}`}
                  type="email" id="email"
                  value={email} name="email"
                  onChange={onInputChange}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Introduzca un correo electrónico valido"
                  data-tooltip-delay-show={800}
                />

              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="password" >Contraseña</label>
                <input
                  data-tooltip-id="passwordTooltip"
                  className={`form-control ${password ? !validatePassword(password) ? "is-invalid" : "is-valid" : ""}`}
                  type="password" id="password"
                  value={password} name="password"
                  onChange={onInputChange}
                />

              </div>

              <div className="d-grid">
                <button id="loginBtn" className={`btn btn-buy`} disabled={!validateEmail(email) || !validatePassword(password) && true} type="submit" onClick={fetchUser}>{loading ? loadingSpinner : "Iniciar Sesión"}</button>
              </div>

              <div className="my-3 text-dark text-start my-4">
                <span className="text-dark ">No tienes cuenta? <Link className="" to={`${PublicRoutes.SIGNUP}`}>Regístrate</Link></span>

                <br />
                {/* <span><a href="#">Recuperar contraseña</a></span> */}
              </div>
            </form>

            <div className="mt-4">
              <div className="border-bottom border-2 text-center" style={{ height: "0.8rem" }}>
                <span className="col-12 bg-light px-2">O Iniciar Sesión con</span>
              </div>
            </div>

            <div className="container w-100 my-5 text-dark ">

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