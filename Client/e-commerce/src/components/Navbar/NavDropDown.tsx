import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFetchFilters } from "../../redux/slices/search.slice";
import { useEffect, useState } from "react";
import axios from "axios";

interface NavlinkDropwDown {
  linkName: string;
}

function NavDropDown({ linkName }: NavlinkDropwDown) {
  const [submenu, setSubmenu] = useState([])
  const dispatch = useAppDispatch()
  const fetchFilters = useAppSelector((state) => state.searchReducer)
  const toCategoryHandler = (item: string) => {
    dispatch(dispatch(setFetchFilters({ title: "", category: item, brand: "", order: fetchFilters.order,page:1, perPage:12, minPrice:"", maxPrice:"" })))
    collapseHandler()
  }

  useEffect(()=>{
    const getSubmenu = async () => {
      const URL = "https://component-store.onrender.com/components/categories-and-brands"
      const categories = (await axios.get(`${URL}`)).data.data
      setSubmenu(categories.categories)
    }

    getSubmenu()
  },[])

const collapseElementList = document.querySelector("#navbarScroll")
 const collapser = document.querySelector(".navbar-toggler")
 const collapseHandler = () => {
    if (collapser) {
      collapser.classList.add("collapsed")
      collapser.setAttribute("aria-expanded", "false")
      collapseElementList && collapseElementList.classList.remove("show")
    }
  }
  
  return (
    <li className="nav-item dropdown mx-3 fs-5" >
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