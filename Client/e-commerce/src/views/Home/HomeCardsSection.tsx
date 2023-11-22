import Spinner from "../../components/Spinner"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"
import CardsCarousel from "./CardsCarousel"

function HomeCardsSection() {
const { data } = useGetComponentsQuery({title:"", category: "", brand: "", order:"", page:1, perPage:45})

const carouselSections = [
  {
    title: "Últimos Ingreso",
    id:"lastsIn",
    items: [30, 45]
  },
  {
    title: "Ofertas",
    id:"offers",
    items: [15, 30]
  },
  {
    title: "Más vendidos",
    id:"MostSells",
    items: [0, 15]
  }
]
  return (
    <article className="container">
    {
      data ? carouselSections.map((section)=>{
        return (
          <div key={section.id} className="my-5">
          <h3 className="text-success">{section.title}</h3>
          <hr className="border-success border-2  my-4" />
         {
          data && <CardsCarousel sectionCards={section.id} arr={data.data.slice(section.items[0], section.items[1])}></CardsCarousel>

         }
    
        </div>
        )
      })
      : carouselSections.map((section)=>{
        return (
          <div key={section.id} className="my-5">
          <h3 className="text-success" >{section.title}</h3>
          <hr className="border-success border-2  my-4" />
         <Spinner styles={{margin:"auto"}}/>
        </div>
        )
      })
    }
      </article>
  )
}

export default HomeCardsSection