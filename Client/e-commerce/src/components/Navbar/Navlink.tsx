import { Link } from "react-router-dom"


interface NavlinkProps {
    linkName: string;
    route: string
  }
  
  function Navlink({ linkName, route }: NavlinkProps) {
    return (
      <li className="nav-item mx-3 fs-5">
        <Link className="nav-link text-white link-success" aria-current="page" to={route}>
          {linkName}
        </Link>
      </li>
    );
  }
  
  export default Navlink;
  