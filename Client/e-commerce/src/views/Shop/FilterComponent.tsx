import AccordionFilterComponent from "./AccordionFilterComponent"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"

interface filterInterface {
    category: string
    brand: string
}

interface props {
    setComponents: Function
}

function FilterComponent({}:props) {

    const dispatch = useAppDispatch()
    const fetchFilters = useAppSelector((state) => state.searchReducer)
    const { data } = useGetComponentsQuery(fetchFilters, {
        refetchOnMountOrArgChange: true
    })

    const filterHandler = (producto: filterInterface) => {
        //verifico que la key sea category o brand para que no llore typescript
        const nameOfProperty = Object.keys(producto)[0] === "category" ? "category" : "brand"
        //accedo dinamicamente a las propiedades del state y verifico que incluyan los valores del objeto que llega por parametro en caso de inclurlo lo borro
        if (fetchFilters[nameOfProperty].split(",").includes(producto[nameOfProperty])) {
            const deletedCategory = fetchFilters[nameOfProperty].split(",").filter((categoria) => categoria !== producto[nameOfProperty])
            //hago una copia del state y cambio dinamicamente la propiedad category o brand y la actualizo con el nuevo resultado
            dispatch(setFetchFilters({ ...fetchFilters, [nameOfProperty]: deletedCategory.join(","), page:1, perPage: 12 }))
        }
        else {
            const newCategory = [...fetchFilters[nameOfProperty], producto[nameOfProperty]]
            dispatch(setFetchFilters({ ...fetchFilters, [nameOfProperty]: newCategory.join(","), page:1, perPage:12 }))
        }
    }

    const btnCloseHandler = (filter: string) => {
        if (fetchFilters.title === filter) {
            dispatch(setFetchFilters({ ...fetchFilters, title: "" }))
        }
        else if (fetchFilters.category.split(",").includes(filter)) {
            const deleteFilter = fetchFilters.category.split(",").filter((filtro) => filtro !== filter)
            dispatch(setFetchFilters({ ...fetchFilters, category: deleteFilter.join(",") }))
        }
        else {
            const deleteFilter = fetchFilters.brand.split(",").filter((filtro) => filtro !== filter)
            dispatch(setFetchFilters({ ...fetchFilters, brand: deleteFilter.join(",") }))
        }
    }

    const cleanFilterHandler = () => {
        dispatch(setFetchFilters({ title: "", category: "", brand: "", order: "", page: 1, perPage:12 }))
      
    }

    const allFilters = [fetchFilters.title, ...fetchFilters.category.split(","), ...fetchFilters.brand.split(",")]

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
            <div className="d-flex flex-column mt-4 col-12">
                <button className="text-white fs-6 btn btn-outline-success" onClick={cleanFilterHandler}> Limpiar filtros <i className="bi bi-trash fs-5 ms-1"></i></button>

            </div>
            {data && <AccordionFilterComponent setFilter={filterHandler}></AccordionFilterComponent>}
            <div className="mt-4 col-12">
                <div className="">
                    <p className="text-white fs-6">{fetchFilters.title ? fetchFilters.title : "Todos los productos"}</p>
                </div>
                {data && <span className="text-white fs-7">{`${fetchFilters.title ? `${data.total} resultados de busqueda` : `${data.total} resultados`}`}</span>}
                <div className="flex-wrap ">
                    {
                        allFilters.map((filter: string) => {
                            if (filter.length) {
                                return (
                                    <div key={filter} className="d-inline-flex flex-row align-items-center second-color ps-1 m-1" data-bs-theme="dark">
                                        <div className="text-white"><small>{filter}</small></div><button onClick={() => btnCloseHandler(filter)} type="button" className="btn-close" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

            </div>
        </aside>
    )
}

export default FilterComponent