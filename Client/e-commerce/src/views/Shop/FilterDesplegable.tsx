import { ComponentInterface } from "../../interfaces"
import CheckboxFilter from "./CheckboxFilter";
import SorterComponent from "./SorterComponent"
import { setFetchFilters } from "../../redux/slices/search.slice";
import { useAppDispatch } from "../../redux/hooks";

interface props {
    data: ComponentInterface[]
}



function FilterDesplegable({ data }: props) {

    const dispatch = useAppDispatch()

    const cleanFilterHandler = () => {
        dispatch(setFetchFilters({title:"", category:"", brand:"", order:"", page:1, perPage:12}))
    }

    return (
        <div className="filter-menu second-color d-flex flex-column align-items-start px-5 pb-3">
            <span className="text-white fs-5 mb-1">Filtrar por</span>
            <hr className="border-white border-1  my-2 col-12" />
            <div className="accordion col-12 " id="accordionFlushExample">
                <CheckboxFilter data={data}></CheckboxFilter>
                <hr className="border-white border-1  my-3 col-12" />
                <div className="d-flex flex-column ">
                <p className="text-white fs-5 me-2 mb-2 text-start">Ordenar por</p>
                    <div className="align-self-start w-100 col-12">
                    <SorterComponent></SorterComponent>
                    </div>
                </div>
                <hr className="border-white border-1  my-3 col-12" />
                <div className="d-flex flex-column mt-4 col-12">

                <button className="text-white fs-5 btn btn-outline-success" onClick={cleanFilterHandler}> Limpiar filtros  <i className="bi bi-trash fs-4 "></i></button>
                </div>
            </div>


        </div>
    )
}

export default FilterDesplegable