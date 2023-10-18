import Navlink from "./Navlink"
import NavDropDown from "./NavDropDown"
import { useEffect, useState } from "react"
import { ComponentInterface } from "../../interfaces"
import { sortFunction } from "../../utilities"
import logoPag from "../../assets/firebase.png"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { useAppDispatch } from "../../redux/hooks"


function Navbar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("")
  const [categorys, setCategorys] = useState<string[]>([])
  const { data } = useGetComponentsQuery({title:"", category: "", brand: ""},{
    refetchOnMountOrArgChange:true
  })


  useEffect(() => {

    const getComponents = () => {
      const response = data && data.data;
      const categoriasSinFiltrar = response?.map((producto: ComponentInterface) => producto.category);
      const categorias: string[] = [...new Set(categoriasSinFiltrar)] as string[];
      setCategorys(sortFunction(categorias));
    };
  
    data && getComponents();
  }, [])

  const setInputHandler = (event:any) => {
    const value = event.target.value
    setInput(value)
  }

  const searchHandler = (event:any) => {
    event.preventDefault()
  dispatch(setFetchFilters({title: input, category: "", brand: ""}))
  setInput("")
  }

  return (
    <header className="sticky-top second-color">
      <nav className="container-fluid navbar navbar-expand-lg d-flex flex-column pt-1">
        <div className="container-fluid d-flex m-0 flex-lg-column " >
          <a className="col-1 d-md-none" href="#"><img className="img-fluid ms-lg-3" src={logoPag} alt="Logo Pagina" /></a>
          <div className="d-flex d-lg-flex ">
            <div className=" d-none d-md-flex align-items-center col-1 " >
              <a className="" href="#"><img className="img-fluid ms-lg-3" src={logoPag} alt="Logo Pagina" /></a>
            </div>
            <form className="col-11 d-none d-lg-flex container py-4 w-75" role="search">
              <input className="form-control me-3" type="search" value={input} onChange={setInputHandler} placeholder="Buscar componentes" aria-label="Search" />
              
              <button className="btn btn-outline-success ms-1" onClick={(event)=> searchHandler(event)} type="submit">Buscar</button>
            </form>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-lg-center" id="navbarScroll">
            <div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                <Navlink linkName="Inicio" route="/"></Navlink>
                <Navlink linkName="Productos" route="/shop"></Navlink>
                <Navlink linkName="Arma tu Pc" route="arma-tu-pc"></Navlink>
                <NavDropDown linkName="Categorias" submenu={categorys} />
                <Navlink linkName="Ayuda" route="/ayuda"></Navlink>
              </ul>
              <form className="col-11 d-flex container py-2  d-lg-none" role="search">
                <input className="form-control me-3" type="search" placeholder="Buscar componentes" aria-label="Search" />
                <button className="btn btn-outline-success ms-1" type="submit">Buscar</button>
              </form>
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
