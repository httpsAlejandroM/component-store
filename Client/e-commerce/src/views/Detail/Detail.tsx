import { useParams } from "react-router-dom";
import { useGetComponentByIdQuery, useGetComponentsQuery } from "../../redux/componentsApi/componentsApi";
import CardsCarousel from "../Home/CardsCarousel";
import BuySection from "./SubSections/BuySection";

function Detail() {
    const { id } = useParams()
    const { data: productsRelacionados } = useGetComponentsQuery({title:"", category: "", brand: "", order:"", page:1, perPage:20})

    const {data} = useGetComponentByIdQuery({id:id})

//A INPUT DE CANTIDAD PONER DE PRODUCTOS A COMPRAR PONER PARA ESCRIBIR UN NUMERO Y NO SOLO AUMENTAR O BAJAR CONTIDAD CON BOTONES
//AGREGAR EFECTO DE ZOOM A LA IMAGEN DEL PRODUCTO
//DESCRIPCION CON FORMATO DE TABLA
//COLOR AL CORAZON 
return (
    <main className="container content">
        {data && <BuySection data={data.data}></BuySection>}
        <section>
            <h3 className="text-white fs-2 my-5">Descripcion del producto</h3>
            {
                data?.data.description.map((description:string, index:number)=>{
                    return ( 
                        <p key={index} className="text-white fs-5 mt-4">{description}</p>
                    )
                })
            }
            
        </section>
        <section>
        <div className="my-5">
          <h3 className="text-success">Productos Relacionados</h3>
          <hr className="border-success border-2  my-4" />
          <div></div>
         {
          productsRelacionados && <CardsCarousel sectionCards={"lastsIn"} arr={productsRelacionados?.data.slice(0, 20)}></CardsCarousel>

         }
    
        </div>
        </section>
        <section></section>
    </main>
  )
}

export default Detail