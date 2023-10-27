import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFetchFilters } from "../../redux/slices/search.slice";
import { useEffect, useState } from "react";
import axios from "axios";

interface NavlinkDropwDown {
  linkName: string;
  //submenu: string[];
}

function NavDropDown({ linkName }: NavlinkDropwDown) {
  const [submenu, setSubmenu] = useState([])
  const dispatch = useAppDispatch()
  const fetchFilters = useAppSelector((state) => state.searchReducer)
  const toCategoryHandler = (item: string) => {
    dispatch(dispatch(setFetchFilters({ title: "", category: item, brand: "", order: fetchFilters.order })))
  }

  useEffect(()=>{
    const getSubmenu = async () => {
      const categories = (await axios.get("http://localhost:3000/components/categories-and-brands")).data.data
      setSubmenu(categories.categories)
    }

    getSubmenu()
  },[])

  return (
    <li className="nav-item dropdown mx-3 fs-5">
      <button className="nav-link dropdown-toggle text-white link-success" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {linkName}
      </button>
      <ul className="dropdown-menu second-color ">
        {
          submenu.map((item:{count:number, category:string}, index: number) => {
            return (
              <li key={index}><Link to="/shop" onClick={() => toCategoryHandler(item.category)} key={index} className="dropdown-item text-white link-success">{item.category}</Link></li>
            )
          })
        }
      </ul>
    </li>
  )
}

export default NavDropDown