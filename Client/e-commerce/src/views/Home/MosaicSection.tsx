import { Link } from "react-router-dom"
import mosaico from "../../assets/mosaico.jpg"
import mosaico2 from "../../assets/mosaico2.jpg"
import mosaico3 from "../../assets/mosaico3.jpg"
import mosaico4 from "../../assets/mosaico4.jpg"
import mosaico5 from "../../assets/mosaico5.jpg"
import mosaico6 from "../../assets/mosaico6.jpg"
import { PublicRoutes } from "../../utilities/routes"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"


function MosaicSection() {
    
    const mosaicFilter = {
        perhipherals:"Auriculares,Mouses,Teclados,Monitores",
        Pc:"Equipos armados"
    }
    const fetchFilters = useAppSelector((state)=>state.searchReducer)
    const dispatch = useAppDispatch()

    const getPeripherals = (filter:string) => {
        dispatch(setFetchFilters({...fetchFilters, category:filter, page:1, perPage:12}))
    }

    return (
        <section className="container mt-5 d-flex flex-column justify-content-center align-items-center gap-4">
            <div className="container-fluid">
            <h1 className="text-success text-center mb-4 display-4 fw-bold">Los mejores Componentes de PC te esperan</h1>
            <hr className="border-success border-2  my-4" />
            </div>
            <div className="row mosaico">
                <div className="col-12 col-md-6">
                    <Link  preventScrollReset={true} to={`${PublicRoutes.SHOP}`} onClick={()=>getPeripherals(mosaicFilter.perhipherals)}><img className="img-fluid rounded-1" src={mosaico} alt="Explorá nuestros perifericos" /></Link>
                </div>
                <div className="col-6 col-md-3 mt-4 mt-md-0">
                    <Link preventScrollReset={false} to={`${PublicRoutes.SHOP}`} onClick={()=>getPeripherals(mosaicFilter.Pc)}><img className="img-fluid rounded-1" src={mosaico2} alt="PC gamers armadas" /></Link>
                </div>
                <div className="col-6 col-md-3 mt-4 mt-md-0">
                    <Link   to={`arma-tu-pc`} ><img className="img-fluid rounded-1" src={mosaico3} alt="Armá tu PC" /></Link>
                </div>
            </div>
            <div className="row mosaico">
                <div className="col-6 col-md-3">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico4} alt="Visitá nuestro local" /></a>
                </div>
                <div className="col-6 col-md-3 ">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico5} alt="Horarios" /></a>
                </div>
                <div className="col-12 col-md-6 mt-4 mt-md-0">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico6} alt="Canales de atención al cliente" /></a>
                </div>
            </div>
           
        </section>
    )
}

export default MosaicSection