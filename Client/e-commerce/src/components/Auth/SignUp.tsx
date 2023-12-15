import { Link, useNavigate } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../../redux/hooks"
// import { PrivateRoutes } from "../../utilities/routes"
import useForm from "../../customHooks/useForm"
import { useState } from "react"
import axios from "axios"
import { PublicRoutes } from "../../utilities/routes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import facebook from "../../assets/facebok.png"
import google from "../../assets/google.png"
import onFireGamingLogo from "../../assets/firebase.png"

export const BASE_URL_AUTH = "http://localhost:3000/auth"

function Login() {
  const messages = {
    confirmPassword: "Por favor, asegurese de confirmar la contraseña."
  }
  const navigate = useNavigate()
  const initialForm = {
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  }
  const { name, email, userName, password, confirmPassword, onInputChange } = useForm(initialForm)
  const [error, setError] = useState<string[]>([])

  const onClickHandler = async (event: any) => {
    event.preventDefault()
    const samePassword = password === confirmPassword
    const samePasswordError = samePassword ? "" : messages.confirmPassword
    if (samePasswordError) {
      setError([samePasswordError])
      return
    }
    try {
      const newUser = (await axios.post(`${BASE_URL_AUTH}/signup`, {
        name,
        email,
        userName,
        password
      })).data

      if (newUser.error) {
        setError([...newUser.data.message, samePasswordError])
        return
      }
      else {
        setError([""])
        toast.success('Usuario creado exitosamente', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate(`/${PublicRoutes.LOGIN}`);
        }, 2500);
      }

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <section className="min-vh-100 bg-section-login content d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="row container align-items-stretch mt-4 mb-4">
        <div className="col bg-login d-none d-lg-block col-md-5 col-lg-6 rounded-start-3">

        </div>
        <div className="col bg-light rounded-end-3 p-5">

          <div className="text-end">
            <img src={onFireGamingLogo} style={{ width: 48 }} alt="Logo" />
            <h2 className="fw-bold text-dark text-center py-5">Bienvenido</h2>

            {/* ********** ERROR MESSAGE *********** */}

            <div>
              {
                error.map((message: string) => {
                  return (
                    <p style={{ backgroundColor: "#FFDADA" }} key={message} className="text-start text-danger fw-bold">{message}</p>
                  )
                })
              }
            </div>

            <form className="bg-light">

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="name" >Nombre completo</label>
                <input
                  className="form-control"
                  type="text" id="name"
                  value={name} name="name"
                  onChange={onInputChange} />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="email" >Correo electrónico</label>
                <input
                  className="form-control"
                  type="email" id="email"
                  value={email} name="email"
                  onChange={onInputChange} />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="userName" >Nombre de usuario</label>
                <input
                  className="form-control"
                  type="text" id="userName"
                  value={userName} name="userName"
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

              <div className="mb-4 text-start">
                <label className="form-label text-dark" htmlFor="confirmPassword" >Confirmar contraseña</label>
                <input
                  className="form-control"
                  type="password" id="confirmPassword"
                  value={confirmPassword} name="confirmPassword"
                  onChange={onInputChange} />
              </div>



              <div className="d-grid">
                <button className="btn btn-buy" type="submit" onClick={onClickHandler}>Registrarse</button>
              </div>

              <div className="my-3 text-dark text-start">
                <span className="text-dark ">Ya estas registrado? <Link className="" to={`/${PublicRoutes.LOGIN}`}>Inicia Sesión</Link></span>

                <br />

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