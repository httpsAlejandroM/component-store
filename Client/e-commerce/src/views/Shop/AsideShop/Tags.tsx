import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { setFetchFilters } from "../../../redux/slices/search.slice"

interface props {
    tags: string[]
}

function Tags({ tags }: props) {

    const dispatch = useAppDispatch()
    const fetchFilters = useAppSelector((state) => state.searchReducer)

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

    return (
        <div className="flex-wrap ">
            {
                tags.map((filter: string) => {
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
    )
}

export default Tags