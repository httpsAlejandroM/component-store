import CardsContainer from "../../components/Cards/CardsContainer"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import SorterComponent from "./SorterComponent"

function Shop() {

  const { data } = useGetComponentsQuery()
  return (
    <section className="container row min-vh-100 justify-content-center">
      <aside className="col-2">

      </aside>
      <section className="col-10 d-flex flex-column">
        <SorterComponent />
        {data && <CardsContainer data={data.data}></CardsContainer>}
      </section>
    </section>
  )
}

export default Shop