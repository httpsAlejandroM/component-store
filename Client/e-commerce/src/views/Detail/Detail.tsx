import { useParams } from "react-router-dom";
import { useGetComponentByIdQuery, useGetComponentsQuery } from "../../redux/componentsApi/componentsApi";
import CardsCarousel from "../Home/CardsCarousel";
import BuySection from "./SubSections/BuySection";
import ReviewsSection from "./SubSections/ReviewsSection";
import DescriptionProduct from "./SubSections/DescriptionProduct";
import Loader from "../../components/Loader";

function Detail() {
    const { id } = useParams()
    const { data } = useGetComponentByIdQuery({ id: id })
    const { data: productsRelacionados } = useGetComponentsQuery({
        title: "",
        category: data?.data.category ?? "",
        brand: "",
        order: "",
        page: 1,
        perPage: 20
    })

    //A INPUT DE CANTIDAD PONER DE PRODUCTOS A COMPRAR PONER PARA ESCRIBIR UN NUMERO Y NO SOLO AUMENTAR O BAJAR CONTIDAD CON BOTONES
    //QUE LAS ESTRELLAS SE RELLENEN SOLAS
    //HACER BACKEND USUARIOS, CARRO DE USUARIO, REVIEWS DE USUARIO Y COMPRAS DE USUARIO
    //AGREGAR FUNCIONALIDADES

    return (
        <main className="container-fluid content mt-4">
            {
                data ?
                    <>
                        <section className="bg-light container d-flex flex-column align-items-center rounded-4 py-1">
                            <BuySection data={data.data}></BuySection>
                            <DescriptionProduct description={data.data.description} />
                            <ReviewsSection />
                        </section>
                        <section className="container">
                            <div className="my-5">
                                <h3 className="text-success">Productos Relacionados</h3>
                                <hr className="border-success border-2  my-4" />
                                {
                                    productsRelacionados && <CardsCarousel sectionCards={"Related"} arr={productsRelacionados?.data.slice(0, 20)}></CardsCarousel>

                                }

                            </div>
                        </section>
                    </>
                    : <Loader />
            }
        </main>
    )
}

export default Detail