import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { useEffect } from "react"

function SorterComponent() {
    
    const fetchFilters = useAppSelector((state)=>state.searchReducer)
    const dispatch = useAppDispatch()
    const [currentSort, setCurrentSort] = useState(fetchFilters.order? fetchFilters.order :"Más relevantes" )
    const sortOptions = ["De A - Z", "De Z - A", "Menor precio", "Mayor precio", "Más relevantes"]

    const fetchSortHandler = (order:string) => {
        dispatch(setFetchFilters({...fetchFilters, order:order, page:1, perPage:12}))
        setCurrentSort(order)
    }

    useEffect(()=>{
    setCurrentSort(fetchFilters.order? fetchFilters.order :"Más relevantes" )
    },[fetchFilters])

    return (
        <>
            <div className="dropdown ">
                <button className="btn btn-outline-success dropdown-toggle col-12"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentSort}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark second-color col-12">
                    {
                        sortOptions.map((option: string, index: number) => {
                            return (
                                <li key={index}><button value={option} className={`dropdown-item text-white link-success ${currentSort == option? "disabled" : ""}`} onClick={() =>fetchSortHandler(option) }>{option}</button></li>
                            )
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default SorterComponent