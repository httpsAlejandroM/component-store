import { useState, useEffect } from "react"
import CardsContainer from "../../components/Cards/CardsContainer"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import FilterComponent from "./AsideShop/FilterComponent"
import ResponsiveFilter from "./AsideShop/ResponsiveFilter"
import SorterComponent from "./SorterComponent"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { ComponentInterface } from "../../interfaces"
import ShopLoader from "./ShopLoader"
import Loader from "../../components/Loader"

function Shop() {
//POSITION STATIC O FIXED A FLECHA PARA IR HACIA ARRIBA
//AGREGAR A SUGERENCIAS DEL BUSCADOR FUNCIONALIDAD PARA MOVER CON LAS FLECHAS 
const [components, setComponents] = useState<ComponentInterface[]>([])
const [isLoading, setIsLoading] = useState(true)
const fetchFilters = useAppSelector((state)=> state.searchReducer)
const [ blur, setBlur ] = useState(false)
const dispatch = useAppDispatch()
const { data } = useGetComponentsQuery({...fetchFilters, page:fetchFilters.page},{refetchOnMountOrArgChange:true})

const fetchPageHandler = () => {
  setIsLoading(true)
  dispatch(setFetchFilters({ ...fetchFilters, page:fetchFilters.page +1 }))
}

useEffect(()=>{
  if (data) fetchFilters.page === 1 
  ? setComponents(data?.data) 
  : setComponents((prevComponent)=> [...prevComponent,  ...data.data.filter(item => !prevComponent.includes(item))]) 
  setIsLoading(false)

},[data])

useEffect(()=>{
  fetchFilters.page > 1 && dispatch(setFetchFilters({...fetchFilters, page: 1})) 
},[])



 if(data){
  return (
    <section id="shop" className={`container min-vh-100 d-flex flex-column align-items-center flex-xl-row justify-content-xl-center align-items-xl-start content`}>
      {data && <ResponsiveFilter data={data} setBlur={setBlur} ></ResponsiveFilter>}
      {data && <FilterComponent setComponents={setComponents}></FilterComponent>}
      <main className="col-10 d-flex flex-column ">
        <div className="d-none d-xl-flex flex-row align-items-center justify-content-end me-4 mt-3 ">
        <span className="text-white fs-5 me-2">Ordenar por</span>
         <SorterComponent/>
        </div>
        {components && <CardsContainer data={components} blur={blur}></CardsContainer>}
        <div className="d-flex flex-row align-items-center justify-content-center">
          {components.length == data?.total? "" : <ShopLoader isLoading={isLoading} fetchPageHandler={fetchPageHandler}/>}
          {fetchFilters.page > 1 && <a className={`btn arrow-to-top position-absolute arrow-to-top p-0 ${components.length == data?.total? "pb-4 mb-5" : ""}`} href="#shop"><i className="bi bi-chevron-up menu-desplegable text-white display-3"></i></a>
}
        </div>
      </main>
    </section>
  )
 }
 else {
  return ( <Loader/>)
 }
}

export default Shop