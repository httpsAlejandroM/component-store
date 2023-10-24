import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setFetchFilters } from "../../redux/slices/search.slice";

interface NavlinkDropwDown {
    linkName: string;
    submenu: string[];
  }

function NavDropDown({ linkName, submenu }:NavlinkDropwDown) {
  const dispatch = useAppDispatch()

  const toCategoryHandler = (item:string) => {
    dispatch(dispatch(setFetchFilters({ title: "", category:item, brand: "" })))
  }

  return (
    <li className="nav-item dropdown mx-3 fs-5">
          <button className="nav-link dropdown-toggle text-white link-success" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           {linkName}
          </button>
          <ul className="dropdown-menu second-color ">
            {
                submenu.map((item:string, index:number) => {
                    return (
                        <li key={index}><Link to="/shop" onClick={()=>toCategoryHandler(item)} key={index} className="dropdown-item text-white link-success">{item}</Link></li>
                    )
                })
            }
          </ul>
        </li>
  )
}

export default NavDropDown