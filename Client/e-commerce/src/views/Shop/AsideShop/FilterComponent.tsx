import AccordionFilterComponent from "./AccordionFilterComponent"
import { useAppSelector } from "../../../redux/hooks"
import { useGetComponentsQuery } from "../../../redux/componentsApi/componentsApi"
import Tags from "./Tags"
import CleanFilterButton from "./CleanFilterButton"
import FilterByPrice from "./FilterByPrice"

interface props {
    setComponents: Function
}

function FilterComponent({ }: props) {
    
    const fetchFilters = useAppSelector((state) => state.searchReducer)
    const { data } = useGetComponentsQuery(fetchFilters, {  refetchOnMountOrArgChange: true})
    
    const price = fetchFilters.minPrice && fetchFilters.maxPrice 
    ? `De $${fetchFilters?.minPrice} a $${fetchFilters?.maxPrice}` 
    : fetchFilters.minPrice && !fetchFilters.maxPrice 
    ?  `Desde $${fetchFilters.minPrice}`
    : !fetchFilters.minPrice && fetchFilters.maxPrice
    ? `Hasta $${fetchFilters.maxPrice}`
    : ""
    
    const allFilters = [fetchFilters.title, ...fetchFilters.category.split(","), ...fetchFilters.brand.split(","), price]

    return (
        <aside className={`mt-4 col-2 d-none d-xl-flex flex-xl-column align-items-start`} id="aside">
            <FilterByPrice styles="d-flex flex-column mt-4 col-12" inputStyle="priceInput rounded-2"/>
            <CleanFilterButton/>
            {data && <AccordionFilterComponent ></AccordionFilterComponent>}
            <div className="mt-4 col-12">
                <div className="">
                    <p className="text-white fs-6">{fetchFilters.title ? fetchFilters.title : "Todos los productos"}</p>
                </div>
                {data && <span className="text-white fs-7">{`${fetchFilters.title ? `${data.total} resultados de busqueda` : `${data.total} resultados`}`}</span>}
                <Tags tags={allFilters}></Tags>
            </div>
        </aside>
    )
}

export default FilterComponent