import { Link, useNavigate } from "react-router-dom"
import useForm from "../../customHooks/useForm"
import { useState } from "react"
import axios from "axios"
import { PublicRoutes } from "../../utilities/routes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import facebook from "../../assets/facebok.png"
import google from "../../assets/google.png"
import onFireGamingLogo from "../../assets/firebase.png"
import { PlacesType, Tooltip } from 'react-tooltip';
import { validateEmail, validatePassword, validateName, isSamePassword, validateUserName } from "../../utilities/inputsValidates"

export const BASE_URL_AUTH = "http://localhost:3000/auth"

interface inputSignUpInterface {
  nameLabel: string
  id: string
  style: string
  type: string
  value: string
  tooltipId: string
  tooltipContent?: string
}

interface TooltipField {
  id: string;
  condition: boolean | string;
  place: PlacesType | undefined
}


function Login() {

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

  const messages = {
    name: "Debe contener entre 3 y 50 caracteres.",
    email: "Introduzca un correo electrónico valido.",
    confirmPassword: "Por favor, asegurese de confirmar la contraseña."
  }

  const inputsArray: inputSignUpInterface[] = [
    {
      nameLabel: "Nombre completo",
      id: "name",
      style: `form-control ${name ? !validateName(name) ? "is-invalid" : "is-valid" : ""}`,
      type: "text",
      value: name,
      tooltipId: "nameTooltip",
      tooltipContent: messages.name
    },
    {
      nameLabel: "Correo electrónico",
      id: "email",
      style: `form-control ${email ? !validateEmail(email) ? "is-invalid" : "is-valid" : ""}`,
      type: "email",
      value: email,
      tooltipId: "my-tooltip",
      tooltipContent: messages.email
    },
    {
      nameLabel: "Nombre de usuario",
      id: "userName",
      style: `form-control ${userName ? !validateUserName(userName) ? "is-invalid" : "is-valid" : ""}`,
      type: "text",
      value: userName,
      tooltipId: "userNameTooltip",
      tooltipContent: messages.name
    },
    {
      nameLabel: "Contraseña",
      id: "password",
      style: `form-control ${password ? !validatePassword(password) ? "is-invalid" : "is-valid" : ""}`,
      type: "password",
      value: password,
      tooltipId: "passwordTooltip"
    },
    {
      nameLabel: "Confrimar contraseña",
      id: "confirmPassword",
      style: `form-control ${confirmPassword ? !isSamePassword(password, confirmPassword) ? "is-invalid" : "is-valid" : ""}`,
      type: "password",
      value: confirmPassword,
      tooltipId: "confirmPasswordTooltip",
      tooltipContent: messages.confirmPassword
    }
  ]

  const inputsSignup = inputsArray.map((input) => {
    return (
      <div key={input.id} className="mb-4 text-start">
        <label className="form-label text-dark" htmlFor={input.id} >{input.nameLabel}</label>
        <input
          autoComplete="off"
          className={input.style}
          type={input.type} id={input.id}
          value={input.value} name={input.id}
          onChange={onInputChange}
          data-tooltip-id={input.tooltipId}
          data-tooltip-delay-show={800}
          data-tooltip-content={input?.tooltipContent}
        />

      </div>
    )
  })

  const onClickHandler = async (event: any) => {
    event.preventDefault()
    const samePassword = isSamePassword(password, confirmPassword)
    const samePasswordError = samePassword ? "" : messages.confirmPassword


    if (!validatePassword(password) || !validateEmail(email) || !validateName(name) || !validateName(userName)) {
      setError(["Complete correctamente los campos"])
      return
    }
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

  const tooltipsValues: TooltipField[] = [
    { id: "nameTooltip", condition: name && !validateName(name), place: "bottom" },
    { id: "my-tooltip", condition: email && !validateEmail(email), place: "bottom" },
    { id: "userNameTooltip", condition: userName && !validateName(userName), place: "bottom" },
    { id: "confirmPasswordTooltip", condition: confirmPassword && !isSamePassword(password, confirmPassword), place: "bottom" }

  ]

  const conditionalToltips = tooltipsValues.map((field) => {
    if (field.condition) {
      return (
        <Tooltip
          key={field.id}
          id={field.id}
          place={field.place}
          isOpen={true}
        />
      );
    }
  });

  const sesionWithValues = [
    {
      style: "btn btn-outline-primary w-100 my-1",
      img: facebook,
      alt: "Facebook logo",
      name: "Facebook"
    },
    {
      style: "btn btn-outline-danger w-100 my-1",
      img: google,
      alt: "Google logo",
      name: "Google"
    }
  ]

  const buttonAuthThird = sesionWithValues.map((value) => {
    return (
      <div key={value.name} className="col-12 col-sm">
        <button className={value.style}>
          <div className="row align-items-center">
            <div className="col-sm-2  col-4 offset-1 offset-sm-0">
              <img src={value.img} style={{ width: 32 }} alt={value.alt} />
            </div>
            <div className="col-sm-10 col-2">
              {value.name}
            </div>
          </div>
        </button>
      </div>
    )
  })

  return (
    <section className="min-vh-100 bg-section-login content d-flex justify-content-center align-items-center">
      <ToastContainer />
      {conditionalToltips}
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
            {/* ********** INPUTS FORMU *********** */}
            <form className="bg-light" noValidate>
              {inputsSignup}
              {/* ********** ACTIONS *********** */}
              <div className="d-grid">
                <button className="btn btn-buy" type="submit" onClick={onClickHandler}>Registrarse</button>
              </div>
              <div className="my-3 text-dark text-start">
                <span className="text-dark ">Ya estas registrado? <Link className="" to={`/${PublicRoutes.LOGIN}`}>Inicia Sesión</Link></span>
                <br />
              </div>
            </form>
            <div className="container w-100 my-5 text-dark ">
              <div className="my-5">
                <div className="border-bottom border-2 text-center" style={{ height: "0.8rem" }}>
                  <span className="col-12 bg-light px-2">O Iniciar Sesión con</span>
                </div>
              </div>
              {/* ********** SESION WITH FACEBOOK, GOOGLE *********** */}
              <div className="row mt-3">
                {buttonAuthThird}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
export default Login