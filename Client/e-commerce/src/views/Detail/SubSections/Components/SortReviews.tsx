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
            <div className="dropdown ">
                <button className="btn btn-buy dropdown-toggle col-12"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentSort}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark second-color col">
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

export default SortReviews