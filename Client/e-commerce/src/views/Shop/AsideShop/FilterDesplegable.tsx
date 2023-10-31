import CheckboxFilter from "./CheckboxFilter";
import SorterComponent from "../SorterComponent"
import CleanFilterButton from "./CleanFilterButton";
import FilterByPrice from "./FilterByPrice";

function FilterDesplegable() {
    
    return (
        <div className="filter-menu second-color d-flex flex-column align-items-start pb-3">
            <FilterByPrice styles="d-flex flex-column mt-4 col-12" inputStyle="d-flex flex-column mt-4 col-12"/>
            <hr className="border-white border-1  mt-3 mb-2 col-12" />
            <span className="text-white fs-5 mb-2">Filtrar por</span>
            {/* <hr className="border-white border-1  my-2 col-12" /> */}
            <div className="accordion col-12 " id="accordionFlushExample">
                <CheckboxFilter></CheckboxFilter>
                <hr className="border-white border-1  mt-3 mb-2 col-12" />
                <div className="d-flex flex-column ">
                <p className="text-white fs-5 me-2 mb-2 text-start">Ordenar por</p>
                    <div className="align-self-start w-100 col-12">
                    <SorterComponent></SorterComponent>
                    </div>
                </div>
                <hr className="border-white border-1  my-3 col-12" />
                <CleanFilterButton/>
            </div>


        </div>
    )
}

export default FilterDesplegable