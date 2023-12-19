import { Link } from "react-router-dom"
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { BASE_URL_AUTH } from "../Auth/SignUp"
import { getRefreshToken } from "../../utilities/getRefreshToken"
import { userResponse } from "../../interfaces/user.interface"
import { clearTokens } from "../../redux/slices/user.slice"

function Sidebar() {


    const userInfo = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()

    const logOut = async () => {
        try {
            const response = await fetch(`${BASE_URL_AUTH}/logout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getRefreshToken()}`
                }
            })
            const json = await response.json() as userResponse
            if (json.error) {
                console.log(json.data.message);
                return null
            } else {
                dispatch(clearTokens())
                console.log("Sesión cerrada");
            }

        } catch (error) {
            console.log(error);

        }
    }

    const sectionsUserDashboard = [
        {
            name: "Compras",
            icon: "bi bi-bag"
        },
        {
            name: "Opiniones",
            icon: "bi bi-chat-fill"
        },
        {
            name: "Favoritos",
            icon: "bi bi-heart"
        },
        
        {
            name: "Carrito",
            icon: "bi bi-cart2"
        },
        {
            name: "Soporte",
            icon: "bi bi-question-circle"
        },
        {
            name: "Mi Perfil",
            icon: "bi bi-person-fill-gear"
        }
    ]

const userItems = sectionsUserDashboard.map((item)=>{
return (
    <li className="row p-3 gap-2 btn-outline-success pointer" key={item.name}>
        <i className={`${item.icon} col-2 fs-4 `}></i>
        <span className="col fs-5 align-self-center">{item.name}</span>
    </li>
)
})

    return (
        <aside className="min-vh-100 d-flex flex-column align-items-center second-color col-2 content">
            {
                userInfo && <div className="second-color mt-4" style={{ width: "8rem" }}>
                    <img src={userInfo.userInfo.image} className="card-img" alt="..." />
                    <div className="card-body text-center mt-3">
                        <p className="card-title text-white fs-4">{userInfo.userInfo.userName}</p>
                    </div>
                </div>
            }
            <hr className="border-light border-2  col-10 " />
            <div className="text-white">
            <ul className="">
            {userItems}
            </ul>
            </div>
            <button onClick={logOut} className="btn btn-success mt-5">Cerrar sesión</button>

        </aside>
    )
}
export default Sidebar

