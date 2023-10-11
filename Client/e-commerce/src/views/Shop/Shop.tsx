import CardsContainer from "../../components/Cards/CardsContainer"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import FilterComponent from "./FilterComponent"
import SorterComponent from "./SorterComponent"

function Shop() {

  const { data } = useGetComponentsQuery()
  return (
    <section className="container min-vh-100 d-flex flex-row justify-content-center">
      {data && <FilterComponent data={data.data}></FilterComponent>}
      <section className="col-10 d-flex flex-column ">
        <SorterComponent/>
        {data && <CardsContainer data={data.data}></CardsContainer>}
      </section>
    </section>
  )
}

export default Shop