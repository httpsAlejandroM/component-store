import axios from "axios";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFetchFilters } from "../../../redux/slices/search.slice";


interface filterInterface {
    category: string
    brand: string
}



function AccordionFilterComponent() {
    
    const [currentFilters, setCurrentFilters] =useState({categories:[], brands:[]})
    const fetchFilters = useAppSelector((state)=>state.searchReducer)
    const dispatch = useAppDispatch()
    const baseURL = "http://localhost:3000/components/categories-and-brands"

    const filterHandler = (producto: filterInterface) => {
        //verifico que la key sea category o brand para que no llore typescript
        const nameOfProperty:"category" | "brand" = Object.keys(producto)[0] === "category" ? "category" : "brand"
        //accedo dinamicamente a las propiedades del state y verifico que incluyan los valores del objeto que llega por parametro en caso de inclurlo lo borro
        if (fetchFilters[nameOfProperty].split(",").includes(producto[nameOfProperty])) {
            const deletedCategory = fetchFilters[nameOfProperty].split(",").filter((categoria) => categoria !== producto[nameOfProperty])
            //hago una copia del state y cambio dinamicamente la propiedad category o brand y la actualizo con el nuevo resultado
            dispatch(setFetchFilters({ ...fetchFilters, [nameOfProperty]: deletedCategory.join(","), page: 1, perPage: 12 }))
        }
        else {
            const newCategory = [...fetchFilters[nameOfProperty], producto[nameOfProperty]]
            dispatch(setFetchFilters({ ...fetchFilters, [nameOfProperty]: newCategory.join(","), page: 1, perPage: 12 }))
        }
    } 
    
    useEffect(() => {
        const getCategories = async () => {
            const categories = (await axios.get(`${baseURL}?&title=${fetchFilters.title}&category=${fetchFilters.category}&brand=${fetchFilters.brand}&minPrice=${fetchFilters.minPrice}&maxPrice=${fetchFilters.maxPrice}`)).data.data
            setCurrentFilters({...currentFilters, categories:categories.categories, brands:categories.brands})
        }
        getCategories()
    }, [fetchFilters])

    const linkHoverStyle = "link-offset-1-hover link-underline link-success-dark link-underline-opacity-0 link-underline-opacity-75-hover ms-2"

    return (
        <div className="accordion mt-4 col-12 " id="accordionFlushExample">
            <div className="accordion-item ">
                <h2 className="accordion-header ">

                    <button className="accordion-button collapsed sbg-color btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Categorias
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    {
                        currentFilters.categories.map(({ count, category }: { count: number, category: string }) => {
                            return (
                                <div key={category} className="mt-2 ms-2 fs-7"><a onClick={() => filterHandler({ category: category, brand:"" })} href="#" className={`${linkHoverStyle}`} >{category}<small> ({count})</small></a></div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="accordion-item ">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed sbg-color btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Marcas
                    </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    {
                        currentFilters.brands.map(({count, brand}:{count:number, brand:string}) => {
                                return (
                                    <div key={brand} className="mt-2 ms-2 fs-7"><a onClick={() => filterHandler({ brand: brand, category:"" })} className={`${linkHoverStyle}`} href="#">{brand}<small> ({count})</small></a></div>
                                )
                            })
                    }
                </div>
            </div>

        </div>
    )
}

export default AccordionFilterComponent