import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFetchFilters } from "../../../redux/slices/search.slice";
import axios from "axios";
import { API } from "../../../redux/componentsApi/componentsApi";

function CheckboxFilter() {

    const [currentFilters, setCurrentFilters] = useState({categories:[], brands:[]})
    const baseUrl = `${API}/components/categories-and-brands`
    const fetchFilter = useAppSelector((state) => state.searchReducer)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const getFilters = async() =>{
            const filters = (await axios.get(`${baseUrl}?&title=${fetchFilter.title}&category=${fetchFilter.category}&brand=${fetchFilter.brand}`)).data.data
            setCurrentFilters({...currentFilters, categories:filters.categories, brands:filters.brands})
        }
        getFilters()
    },[fetchFilter])

    const fetchHandler = (event: any, productName: string) => {
        const propertyValue: "category" | "brand" = event?.target.value
        if (fetchFilter[propertyValue] && fetchFilter[propertyValue].split(",").includes(productName)) {
            const deletedFilter = fetchFilter[propertyValue].split(",").filter((productBy) => productBy !== productName).join(",")
            dispatch(setFetchFilters({ ...fetchFilter, [propertyValue]: deletedFilter, page: 1, perPage: 12}))
        }
        else {
            const addFilter = [...fetchFilter[propertyValue], productName]
            dispatch(setFetchFilters({ ...fetchFilter, [propertyValue]: addFilter.join(","), page: 1, perPage: 12}))
        }
    }

    return (
        <>
            <div className="accordion-item second-color px-4 d-flex flex-column justify-content-start">
                <h2 className="accordion-header">

                    <button className="accordion-button collapsed btn-outline-success second-color "
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                        aria-expanded="false" aria-controls="flush-collapseOne">
                        Categorias
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse second-color mt-2 " data-bs-parent="#accordionFlushExample">
                    {
                        currentFilters.categories.map(({ count, category }: { count: number, category: string }) => {
                            const isChecked = fetchFilter.category.includes(category)
                            return (
                                <div key={category} className="form-check form-check px-0 ms-2 my-1">
                                    <input className="form-check-input " type="checkbox"
                                        checked={isChecked}
                                        onChange={(event) => { fetchHandler(event, category) }} value="category" id={`${category}`} />
                                    <label className="form-check-label text-white link-success" htmlFor={`${category}`}>
                                        {`${category} (${count})`}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="accordion-item second-color px-4 d-flex flex-column justify-content-start">
                <h2 className="accordion-header">

                    <button className="accordion-button collapsed btn-outline-success second-color" 
                    type="button" data-bs-toggle="collapse" 
                    data-bs-target="#flush-collapseTwo" 
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo">
                        Marcas
                    </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse second-color mt-2" data-bs-parent="#accordionFlushExample">
                    {
                        currentFilters.brands.map(({ count, brand }: { count: number, brand: string }) => {
                            const isChecked = fetchFilter.brand.includes(brand)
                            return (
                                <div key={brand} className="form-check form-check ps-0 ms-2 my-1">
                                    <input className="form-check-input " 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={(event) => { fetchHandler(event, brand) }} value="brand" id={`${brand}`} />
                                    <label className="form-check-label text-white link-success " htmlFor={`${brand}`}>
                                        {`${brand} (${count})`}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CheckboxFilter