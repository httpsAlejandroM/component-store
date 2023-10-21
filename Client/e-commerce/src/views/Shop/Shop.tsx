import { useState } from "react"
import CardsContainer from "../../components/Cards/CardsContainer"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import FilterComponent from "./FilterComponent"
import ResponsiveFilter from "./ResponsiveFilter"
import SorterComponent from "./SorterComponent"
import { useAppSelector } from "../../redux/hooks"

function Shop() {

  const fetchFilters = useAppSelector((state)=> state.searchReducer)
  const [ blur, setBlur ] = useState(false)
  const { data } = useGetComponentsQuery(fetchFilters,{
    refetchOnMountOrArgChange:false
  })

  return (
    <section  className={`container min-vh-100 d-flex flex-column align-items-center flex-xl-row justify-content-xl-center align-items-xl-start content`}>
      {data && <ResponsiveFilter data={data.data} setBlur={setBlur} ></ResponsiveFilter>}
      {data && <FilterComponent ></FilterComponent>}
      <section className="col-10 d-flex flex-column ">
        <div className="d-none d-xl-flex flex-row align-items-center justify-content-end me-4 mt-3 ">
        <span className="text-white fs-5 me-2">Ordenar por</span>
         <SorterComponent/>
        </div>
        {data && <CardsContainer data={data.data} blur={blur}></CardsContainer>}
      </section>
    </section>
  )
}

export default Shop