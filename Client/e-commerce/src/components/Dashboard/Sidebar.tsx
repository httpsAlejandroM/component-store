import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { BASE_URL_AUTH } from "../Auth/SignUp"
import { getRefreshToken } from "../../utilities/getRefreshToken"
import { userResponse } from "../../interfaces/user.interface"
import { clearTokens } from "../../redux/slices/user.slice"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PrivateRoutes } from "../../utilities/routes"
import styles from "./Sidebar.module.css"

interface props {
}

function Sidebar({  }: props) {

    const userInfo = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
   
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
            icon: "bi bi-bag",
            link: PrivateRoutes.DASHBOARD
        },
        {
            name: "Opiniones",
            icon: "bi bi-chat",
            link: PrivateRoutes.DASHBOARD_REVIEWS
        },
        {
            name: "Favoritos",
            icon: "bi bi-heart",
            link: PrivateRoutes.DASHBOARD_FAVORITES
        },

        {
            name: "Carrito",
            icon: "bi bi-cart2",
            link: PrivateRoutes.DASHBOARD_CART
        },
        {
            name: "Soporte",
            icon: "bi bi-question-circle",
            link: PrivateRoutes.DASHBOARD_SUPPORT
        },
        {
            name: "Mi perfil",
            icon: "bi bi-person-fill-gear",
            link: PrivateRoutes.DASHBOARD_MY_PROFILE
        }
    ]

    return (
        <aside className={`${open ? styles.sidebarOpen : styles.sidebarClose} second-color`}>
            {/* MENU HAMBURGUESA */}
            <div className="d-flex align-items-center">
                <i 
                title={"Menú"}
                onClick={()=>setOpen(!open)}
                className={`bi bi-list text-white fs-3 ${styles.hamburger}`}></i>
                {open? <span className={`${styles.hamburger} card-title text-white fs-6 d-inline-block text-truncate w-100`}>{userInfo.userInfo.name}</span> : null}
            </div>
            {/* LINKS TO DASHBOARD SECTIONS */}
            <ul className="list-group mt-4">
                {
                    sectionsUserDashboard.map((item) => {
                        return (
                          <li  key={item.name}
                          title={item.name}
                          >
                            <Link 
                            className={`${open? styles.linkOpen : styles.normal } text-white link-success `} 
                            to={item.link}
                            aria-current="page"
                            >
                            <i className={item.icon}></i>
                            <div className="">
                            {open ? <span className="text-truncate">{item.name}</span> : null}
                            </div>
                            </Link>
                          </li>
                        )
                    })
                }
            </ul>
                {/*LOG OUT */}
            <div className="mt-3 ">
                <i 
                title="Cerrar sesión"
                onClick={logOut}
                className={`bi bi-box-arrow-left text-white fs-4 ${styles.hamburger}`}></i>
            </div>
        </aside>
    )
}
export default Sidebar

