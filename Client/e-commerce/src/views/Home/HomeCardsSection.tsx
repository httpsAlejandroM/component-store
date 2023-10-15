import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import CardsCarousel from "./CardsCarousel"

function HomeCardsSection() {

const { data } = useGetComponentsQuery({})

  return (
    <article className="container">
        <div className="my-5">
          <h3 className="text-success">Últimos Ingresos</h3>
          <hr className="border-success border-2  my-4" />
          <div></div>
         {
          data && <CardsCarousel sectionCards={"lastsIn"} arr={data.data.slice(103, 103+20)}></CardsCarousel>

         }
    
        </div>
        <div className="my-5">
          <h3 className="text-success">Ofertas</h3>
          <hr className="border-success  border-2 my-4" />
          {
            data && <CardsCarousel sectionCards={"offers"} arr={data.data.slice(80, 80+20)}></CardsCarousel>
         }
        </div>
        <div className="my-5">
          <h3 className="text-success">Más vendidos</h3>
          <hr className="border-success  border-2 my-4" />
          {
            data && <CardsCarousel sectionCards={"MostSells"} arr={data.data.slice(0, 20)}></CardsCarousel>
         }
        </div>

      </article>
  )
}

export default HomeCardsSection