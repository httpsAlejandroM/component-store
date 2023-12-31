import Navlink from "./Navlink"
import NavDropDown from "./NavDropDown"
import { useState, useRef } from "react"
import logoPag from "../../assets/firebase.png"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes"
import { useAppSelector } from "../../redux/hooks"

function Navbar() {

  const userInfo = useAppSelector((state) => state.userReducer)
  const [prevScroll, setPrevScroll] = useState(window.scrollY)
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false)

  const collapseElementList = useRef<HTMLDivElement>(null)
  const collapser = useRef<HTMLButtonElement>(null)
  const navBar = useRef<HTMLElement>(null)

  window.onscroll = function () {
    let currentScrollPos = window.scrollY;

    if (navBar.current) {
      if (prevScroll > currentScrollPos) {
        navBar.current.style.top = "0";
      } else {
        navBar.current.style.top = isNavbarExpanded ? "-356px" : "-140px"
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
            <SearchBar styles={`col-11 d-none d-lg-flex container py-4 me-4 ${userInfo.isAuthenticated? "w-60" : "w-75"}`}></SearchBar>
            <div className="align-self-center">
              {
                userInfo.isAuthenticated &&
                <>
                <Link to={`/dashboard/${PrivateRoutes.DASHBOARD_FAVORITES}`} className="btn btn-outline-success ms-1 pt-2 border-0"><i className="bi bi-heart fs-4"></i></Link>
                <Link to={`/dashboard/${PrivateRoutes.DASHBOARD_CART}`} className="btn btn-outline-success ms-1 pb-2 border-0"><i className="bi bi-cart2 fs-3"></i></Link>
                </>
              }
              <Link to={`${PublicRoutes.LOGIN}`} className="btn btn-outline-success ms-1 border-0"><i className="bi bi-person-fill fs-2"></i></Link>
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
                <Navlink collapseHandler={collapseHandler} linkName="Arma tu Pc" route="arma-tu-pc"></Navlink>
                <NavDropDown collapseHandler={collapseHandler} linkName="Categorias" />
                <Navlink collapseHandler={collapseHandler} linkName="Ayuda" route={PublicRoutes.SUPPORT}></Navlink>
              </ul>
              <SearchBar styles="col-11 d-flex container py-2  d-lg-none"></SearchBar>
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar