import { useAppDispatch } from "../../../redux/hooks"
import { setFetchFilters } from "../../../redux/slices/search.slice"



function CleanFilterButton() {
    
    const dispatch = useAppDispatch()
    
    const cleanFilterHandler = () => {
        dispatch(setFetchFilters({title:"", category:"", brand:"", order:"", page:1, perPage:12, minPrice:"", maxPrice:""}))
    }
    

    return (
        <div className="d-flex flex-column mt-4 col-12">
            <button className="text-white fs-6 btn btn-outline-success" onClick={cleanFilterHandler}> Limpiar filtros  <i className="bi bi-trash fs-5 ms-1 "></i></button>
        </div>
    )
}

export default CleanFilterButton