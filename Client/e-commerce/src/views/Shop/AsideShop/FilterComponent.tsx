import AccordionFilterComponent from "./AccordionFilterComponent"
import { useAppSelector } from "../../../redux/hooks"
import { useGetComponentsQuery } from "../../../redux/componentsApi/componentsApi"
import Tags from "./Tags"
import CleanFilterButton from "./CleanFilterButton"

interface props {
    setComponents: Function
}

function FilterComponent({ }: props) {
    const fetchFilters = useAppSelector((state) => state.searchReducer)
    const allFilters = [fetchFilters.title, ...fetchFilters.category.split(","), ...fetchFilters.brand.split(",")]

    const { data } = useGetComponentsQuery(fetchFilters, {  refetchOnMountOrArgChange: true})

    return (
        <aside className={`mt-4 col-2 d-none d-xl-flex flex-xl-column align-items-start`} id="aside">
            <div className="d-flex flex-column mt-4 col-12">
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center">
                    <input type="number" className="priceInput rounded-2" placeholder="$ Minimo" />
                    <div className="text-white p-2">{`-`}</div>
                    <input type="number" className="priceInput rounded-2" placeholder="$ Maximo" />
                </div>
                <button className="sbg-color  btn btn-outline-success rounded-2 w-100  text-white mt-3  mt-xl-1"><i className="bi bi-chevron-right"></i></button>

            </div>
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