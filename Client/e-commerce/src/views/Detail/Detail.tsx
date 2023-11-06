import { useParams } from "react-router-dom";
import { useGetComponentByIdQuery, useGetComponentsQuery } from "../../redux/componentsApi/componentsApi";
import CardsCarousel from "../Home/CardsCarousel";
import BuySection from "./SubSections/BuySection";
import ReviewsSection from "./SubSections/ReviewsSection";

function Detail() {
    const { id } = useParams()
    const { data: productsRelacionados } = useGetComponentsQuery({title:"", category: "", brand: "", order:"", page:1, perPage:20})

    const {data} = useGetComponentByIdQuery({id:id})


 // MODULARIZAR TODAS LAS SECTIONS EN COMPONENTES MAS CHICOS   
//A INPUT DE CANTIDAD PONER DE PRODUCTOS A COMPRAR PONER PARA ESCRIBIR UN NUMERO Y NO SOLO AUMENTAR O BAJAR CONTIDAD CON BOTONES
//AGREGAR EFECTO DE ZOOM A LA IMAGEN DEL PRODUCTO
//AGREGAR FUNCIONALIDADES

return (
    <main className="container-fluid content ">
        <section className="bg-light container rounded-4 px-4 py-1">
        {data && <BuySection data={data.data}></BuySection>}
        
        <section className="container"> 
            <h3 className="text-success-alpha p-1 fs-2 mb-3">Descripción</h3>
            <ul className="bg-light list-group list-group-flush ">

            
            {
                data?.data.description.map((description:string, index:number)=>{
                    return ( 
                        <li key={index} className="text-dark li-description fs-5 py-3 bg-light">{`${description}`}</li>
                    )
                })
            }
            </ul>
        </section>
        <ReviewsSection/>
        </section>
        <section className="container">
        <div className="my-5">
          <h3 className="text-success">Productos Relacionados</h3>
          <hr className="border-success border-2  my-4" />
          <div></div>
         {
          productsRelacionados && <CardsCarousel sectionCards={"lastsIn"} arr={productsRelacionados?.data.slice(0, 20)}></CardsCarousel>

         }
    
        </div>
        </section>
        
    </main>
  )
}

export default Detail