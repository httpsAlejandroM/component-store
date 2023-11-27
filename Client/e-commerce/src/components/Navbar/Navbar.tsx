import Navlink from "./Navlink"
import NavDropDown from "./NavDropDown"
import { useState, useRef } from "react"
import logoPag from "../../assets/firebase.png"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import { PublicRoutes } from "../../utilities/routes"

function Navbar() {
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
          <div className="d-flex d-lg-flex ">
            <div className=" d-none d-md-flex align-items-center col-1 " >
              <Link className=""
                to="/"><img
                  className="img-fluid ms-lg-3"
                  src={logoPag}
                  alt="Logo Pagina" /></Link>
            </div>
            <SearchBar styles={"col-11 d-none d-lg-flex container py-4 w-75"}></SearchBar>
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