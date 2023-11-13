import { Link } from "react-router-dom"


interface NavlinkProps {
    linkName: string;
    route: string
  }

 const collapseElementList = document.querySelector("#navbarScroll")
 const collapser = document.querySelector(".navbar-toggler")
 export const collapseHandler = () => {
    if (collapser) {
      collapser.classList.add("collapsed")
      collapser.setAttribute("aria-expanded", "false")
      collapseElementList && collapseElementList.classList.remove("show")
    }
  }
  
  function Navlink({ linkName, route }: NavlinkProps) {
    
    return (
      <li className="nav-item mx-3 fs-5" onClick={collapseHandler}>
        <Link className="nav-link text-white link-success" aria-current="page" to={route}>
          {linkName}
        </Link>
      </li>
    );
  }
  
  export default Navlink;
  