import { ComponentInterface } from "../../interfaces"
import CheckboxFilter from "./CheckboxFilter";
import SorterComponent from "./SorterComponent"

interface props {
    data: ComponentInterface[]
}



function FilterDesplegable({ data }: props) {

    return (
        <div className="filter-menu second-color d-flex flex-column align-items-start px-5">
            <span className="text-white fs-5 mb-1">Filtrar por</span>
            <hr className="border-white border-1  my-2 col-12" />
            <div className="accordion col-12 " id="accordionFlushExample">
                <CheckboxFilter data={data}></CheckboxFilter>
                <hr className="border-white border-1  my-3 col-12" />
                <div className="d-flex flex-column align-items-start">
                    <SorterComponent></SorterComponent>
                </div>
                <hr className="border-white border-1  my-3 col-12" />
                <button className="text-white fs-5 btn btn-outline-success"> Limpiar filtro  <i className="bi bi-trash fs-4 "></i></button>
            </div>


        </div>
    )
}

export default FilterDesplegable