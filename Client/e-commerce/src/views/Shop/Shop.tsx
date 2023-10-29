import { useState, useEffect } from "react"
import CardsContainer from "../../components/Cards/CardsContainer"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import FilterComponent from "./AsideShop/FilterComponent"
import ResponsiveFilter from "./AsideShop/ResponsiveFilter"
import SorterComponent from "./SorterComponent"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { ComponentInterface } from "../../interfaces"

function Shop() {
//FILTRO POR PRECIO
//AGREGAR VIEW DE DETALLE DE PRODUCTO
//AGREGAR A SUGERENCIAS DEL BUSCADOR FUNCIONALIDAD PARA MOVER CON LAS FLECHAS 

const [components, setComponents] = useState<ComponentInterface[]>([])
const fetchFilters = useAppSelector((state)=> state.searchReducer)
const [ blur, setBlur ] = useState(false)
const dispatch = useAppDispatch()

const { data } = useGetComponentsQuery({...fetchFilters, page:fetchFilters.page},{refetchOnMountOrArgChange:true})

const fetchPageHandler = () => dispatch(setFetchFilters({ ...fetchFilters, page:fetchFilters.page +1 }))

useEffect(()=>{
  if (data) fetchFilters.page === 1 
  ? setComponents(data?.data) 
  : setComponents((prevComponent)=> [...prevComponent, ...data?.data]) 
},[data])

useEffect(()=>{
  fetchFilters.page > 1 && dispatch(setFetchFilters({...fetchFilters, page: 1})) 
},[])

  return (
    <section  className={`container min-vh-100 d-flex flex-column align-items-center flex-xl-row justify-content-xl-center align-items-xl-start content`}>
      {data && <ResponsiveFilter data={data} setBlur={setBlur} ></ResponsiveFilter>}
      {data && <FilterComponent setComponents={setComponents}></FilterComponent>}
      <main className="col-10 d-flex flex-column ">
        <div className="d-none d-xl-flex flex-row align-items-center justify-content-end me-4 mt-3 ">
        <span className="text-white fs-5 me-2">Ordenar por</span>
         <SorterComponent/>
        </div>
        {components && <CardsContainer data={components} blur={blur}></CardsContainer>}
        {components.length == data?.total? "" : <button onClick={()=>fetchPageHandler()} className="text-white fs-6 btn btn-outline-success my-4 col-4 align-self-center">Ver más productos</button> }
      </main>
    </section>
  )
}

export default Shop