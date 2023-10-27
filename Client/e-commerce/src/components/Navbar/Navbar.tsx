import Navlink from "./Navlink"
import NavDropDown from "./NavDropDown"
import { useState } from "react"
import logoPag from "../../assets/firebase.png"
import SearchBar from "./SearchBar"

function Navbar() {

  const [prevScroll, setPrevScroll] = useState(window.scrollY)
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false)

  window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    const navBar = document.getElementById("header")

    if (navBar) {
      if (prevScroll > currentScrollPos) {
        navBar.style.top = "0";
      } else {
        navBar.style.top = isNavbarExpanded ? "-356px" : "-140px"
      }
    }
    setPrevScroll(currentScrollPos)
  }

  return (
    <header className="header" id="header">
      <nav className="container-fluid navbar navbar-expand-lg d-flex flex-column pt-1">
        <div className="container-fluid d-flex m-0 flex-lg-column " >
          <a className="col-1 d-md-none"
            href="#"><img
              className="img-fluid ms-lg-3"
              src={logoPag} alt="Logo Pagina" /></a>
          <div className="d-flex d-lg-flex ">
            <div className=" d-none d-md-flex align-items-center col-1 " >
              <a className=""
                href="#"><img
                  className="img-fluid ms-lg-3"
                  src={logoPag}
                  alt="Logo Pagina" /></a>
            </div>
            <SearchBar styles={"col-11 d-none d-lg-flex container py-4 w-75"}></SearchBar>
          </div>
          <button
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
          <div className="collapse navbar-collapse justify-content-lg-center" id="navbarScroll">
            <div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                <Navlink linkName="Inicio" route="/"></Navlink>
                <Navlink linkName="Productos" route="/shop"></Navlink>
                <Navlink linkName="Arma tu Pc" route="arma-tu-pc"></Navlink>
                <NavDropDown linkName="Categorias"  />
                <Navlink linkName="Ayuda" route="/ayuda"></Navlink>
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