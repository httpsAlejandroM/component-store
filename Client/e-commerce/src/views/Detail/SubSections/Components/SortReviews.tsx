import { useState } from "react"
import { useEffect } from "react"
//import { setFetchFilters } from "../../../redux/slices/search.slice"
import { useAppSelector } from "../../../../redux/hooks"

function SortReviews() {
    const fetchFilters = useAppSelector((state)=>state.searchReducer)
  //  const dispatch = useAppDispatch()
    const [currentSort, setCurrentSort] = useState("Mayor calificación" )
    const sortOptions = ["Más recientes", "Menor calificación", "Mayor calificación"]

    const fetchSortHandler = (order:string) => {
        setCurrentSort(order)
    }

    useEffect(()=>{
    setCurrentSort("Mayor calificación" )
    },[fetchFilters])

    return (
        <>
            <div className="dropdown col-9 col-sm-12">
                <button className="btn btn-buy col-12 dropdown-toggle px-0"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentSort}
                </button>
                <ul className="dropdown-menu bg-white col-12">
                    {
                        sortOptions.map((option: string, index: number) => {
                            return (
                                <li key={index}><button value={option} className={`dropdown-item bg-white text-dark link-bg-light ${currentSort == option? "disabled" : ""}`} onClick={() =>fetchSortHandler(option) }>{option}</button></li>
                            )
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default SortReviews