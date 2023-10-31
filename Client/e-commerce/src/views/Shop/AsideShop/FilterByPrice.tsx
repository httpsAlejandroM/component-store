import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { setFetchFilters } from "../../../redux/slices/search.slice"
import { useState } from "react"

interface props{
    styles: string
    inputStyle: string
}

function FilterByPrice({styles, inputStyle}:props) {

const [price, setPrice] = useState({minPrice:"", maxPrice:""})
const fetchFilter = useAppSelector((state)=>state.searchReducer)
const dispatch = useAppDispatch()

const setPriceHandler = (event:any) =>{
    const value = event.target.value
    const prop: "minPrice" | "maxPrice" = event.target.name
    setPrice({...price, [prop]:value})
}

const fetchPrice = (event:any) => {
    event.preventDefault()
    dispatch(setFetchFilters({...fetchFilter, minPrice:price.minPrice, maxPrice:price.maxPrice, page:1, perPage:12}))
    setPrice({minPrice:"", maxPrice:""})
}

  return (
    <div className={`${styles}` }>
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center">
                    <input value={price.minPrice} name="minPrice" onChange={(event)=>setPriceHandler(event)} type="number" className={`${inputStyle}`} placeholder="$ Minimo" />
                    <div className="text-white p-2 d-none d-xl-flex">{`-`}</div>
                    <input value={price.maxPrice} name="maxPrice" onChange={(event)=>setPriceHandler(event)} type="number" className={`${inputStyle}`} placeholder="$ Maximo" />
                </div>
                <button onClick={(event)=>fetchPrice(event)} className="btn btn-outline-success rounded-2 w-100  text-white mt-3  mt-xl-1"><i className="bi bi-chevron-right"></i></button>

            </div>
  )
}

export default FilterByPrice