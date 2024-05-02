import Navlink from "./Navlink"
import NavDropDown from "./NavDropDown"
import { useState, useRef } from "react"
import logoPag from "../../assets/firebase.png"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { BASE_URL_AUTH } from "../Auth/SignUp"
import { getRefreshToken } from "../../utilities/getRefreshToken"
import { userResponse } from "../../interfaces/user.interface"
import { clearTokens } from "../../redux/slices/user.slice"

function Navbar() {

  const userInfo = useAppSelector((state) => state.userReducer)
  const [prevScroll, setPrevScroll] = useState(window.scrollY)
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false)
  const user = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const collapseElementList = useRef<HTMLDivElement>(null)
  const collapser = useRef<HTMLButtonElement>(null)
  const navBar = useRef<HTMLElement>(null)
  //-356px
  window.onscroll = function () {
    let currentScrollPos = window.scrollY;

    if (navBar.current) {
      if (prevScroll > currentScrollPos) {
        navBar.current.style.top = "0";
      } else {
        const isUserAuthenticated = user.isAuthenticated ? "-697px" : "-356px"
        navBar.current.style.top = isNavbarExpanded ? isUserAuthenticated : "-140px"
      }
    }
    setPrevScroll(currentScrollPos)
  }

  const collapseHandler = () => {
    if (collapser.current) {
      collapser.current.classList.add("collapsed")
      collapser.current.setAttribute("aria-expanded", "false")
      collapseElementList.current && collapseElementList.current.classList.remove("show")
    }
  }

  const userDashboardItems = [
    {
      name: "Compras",
      icon: "bi bi-bag",
      link: PrivateRoutes.DASHBOARD_SHOPPING
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

  const logOutHandler = async () => {
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
    collapseHandler()
  }

  const quantityProducts = userInfo.userInfo.cart.reduce((acc, component) => {
    const totalProducts = component.quantity + acc
    return totalProducts
}, 0)

  return (
    <header ref={navBar} className="header" id="header">
      <nav className="container-fluid navbar navbar-expand-lg d-flex flex-column pt-1">
        <div className="container-fluid d-flex m-0 flex-lg-column " >
          <div className="d-flex d-lg-flex">
            <div className=" d-none d-lg-flex align-items-center col-1 " >
              <Link className=""
                to={`${PublicRoutes.HOME}`}><img
                  className="img-fluid ms-lg-3"
                  src={logoPag}
                  alt="Logo Pagina" /></Link>
            </div>
            <SearchBar styles={`col-11 d-none d-lg-flex container py-4 me-4 ${userInfo.isAuthenticated ? "w-60" : "w-75"}`}></SearchBar>
            <div test-id="userNav" className="align-self-center">
              {
                userInfo.isAuthenticated &&
                <>
                  <Link to={`/dashboard/${PrivateRoutes.DASHBOARD_FAVORITES}`} className="btn btn-outline-success ms-1 border-0 position-relative">
                    <i className="bi bi-heart fs-4"></i>
                    {
                      user.userInfo.favorites.length > 0 
                      ? <span  className="rounded-circle position-absolute user-alert badge rounded-pill bg-danger z-2">
                      {user.userInfo.favorites.length}
                      </span>
                      : null
                    }
                  </Link>
                  <Link  to={`/dashboard/${PrivateRoutes.DASHBOARD_CART}`} className="btn btn-outline-success ms-1 border-0 position-relative">
                    <i className="bi bi-cart2 fs-4"></i>
                    {
                      user.userInfo.cart.length > 0 
                      ? <span className="rounded-circle position-absolute user-alert badge rounded-pill bg-danger z-2">
                      {quantityProducts}
                      </span>
                      : null
                    }
                  </Link>
                </>
              }
              <Link id="userProfile" to={`${PublicRoutes.LOGIN}`} className="btn btn-outline-success ms-1 border-0"><i className="bi bi-person-fill fs-2"></i></Link>
            </div>
          </div>
          <button
            ref={collapser}
            className="navbar-toggler"
            onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div ref={collapseElementList} className="collapse navbar-collapse justify-content-lg-center" id="navbarScroll">
            <div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                <Navlink collapseHandler={collapseHandler} linkName="Inicio" route={PublicRoutes.HOME}></Navlink>
                <Navlink collapseHandler={collapseHandler} linkName="Productos" route={PublicRoutes.SHOP}></Navlink>
                <Navlink collapseHandler={collapseHandler} linkName="Arma tu Pc" route={PublicRoutes.SHOP}></Navlink>
                <NavDropDown collapseHandler={collapseHandler} linkName="Categorias" />
                <Navlink collapseHandler={collapseHandler} linkName="Ayuda" route={PublicRoutes.SUPPORT}></Navlink>
              </ul>

              {
                user.isAuthenticated &&
                <ul className="d-lg-none navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  {
                    userDashboardItems.map((item) => <Navlink key={item.name} collapseHandler={collapseHandler} linkName={item.name} route={`/dashboard/${item.link}`} />)
                  }
                  <li className="nav-item mx-3 fs-5" onClick={() => logOutHandler()}>
                    <Link className="nav-link text-white link-success" aria-current="page" to={PublicRoutes.HOME}>
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              }
              <SearchBar styles="col-11 d-flex container py-2  d-lg-none"></SearchBar>
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar