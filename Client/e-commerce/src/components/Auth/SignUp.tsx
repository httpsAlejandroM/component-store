import { useNavigate } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../../redux/hooks"
// import { PrivateRoutes } from "../../utilities/routes"
import useForm from "../../customHooks/useForm"
import { useState } from "react"
import axios from "axios"
import { PublicRoutes } from "../../utilities/routes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BASE_URL_AUTH = "http://localhost:3000/auth"

function Login() {
    const messages = {
        confirmPassword : "Por favor, asegurese de ingresar la misma contraseña en ambos campos de confirmación."
    }
    const navigate = useNavigate()
    const initialForm = {
        name: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      }
      const { name,email, userName, password, confirmPassword, onInputChange } = useForm(initialForm)
      const [error, setError ] = useState<string[]>([])

const onClickHandler = async (event:any) => {
    event.preventDefault()   
    const samePassword = password === confirmPassword 
    samePassword? setError([""]) : setError([...messages.confirmPassword])
    try {
        const newUser = (await axios.post(`${BASE_URL_AUTH}/signup`,{
            name,
            email,
            userName,
            password
        })).data

        if(newUser.error){
            setError([...newUser.data.message])
            return
        }
        else{
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
        <section className="min-vh-100 content d-flex justify-content-center align-items-center">
             <ToastContainer />
        <form className="bg-light col-3 p-5 d-flex flex-column rounded rounded-3">
          <div>
            {
                error.map((message:string)=>{
                    return (
                        <p style={{backgroundColor:"#FFDADA"}} className="text-danger fw-bold">{message}</p>
                    )
                })
            }
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Nombre completo</label>
            <input
              type="text"
            //   placeholder="Ingrese su Nombre completo"
              name="name"
              value={name}
              onChange={onInputChange}
              className="form-control"
              id="exampleInputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input
              type="email"
            //   placeholder="Ingrese su Email"
              name="email"
              value={email}
              onChange={onInputChange}
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputUserName" className="form-label">Nombre de usuario</label>
            <input
              type="text"
            //   placeholder="Ingrese su Nombre de usuario"
              name="userName"
              value={userName}
              onChange={onInputChange}
              className="form-control"
              id="exampleInputUserName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
            //   placeholder="Ingrese su contraseña"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirme su contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onInputChange}
            //   placeholder="Confirme su contraseña"
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <button type="submit" onClick={(e) => onClickHandler(e)} className="btn btn-primary align-self-center px-4">Registrar</button>
        </form>
      </section>
    )
}
export default Login