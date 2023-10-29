import axios from "axios";
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks";

interface props {
    setFilter: Function
}


function AccordionFilterComponent({setFilter }: props) {
    
    const [currentFilters, setCurrentFilters] =useState({categories:[], brands:[]})
    const fetchFilters = useAppSelector((state)=>state.searchReducer)
    const baseURL = "http://localhost:3000/components/categories-and-brands"
    
    useEffect(() => {
        const getCategories = async () => {
            const categories = (await axios.get(`${baseURL}?&title=${fetchFilters.title}&category=${fetchFilters.category}&brand=${fetchFilters.brand}`)).data.data
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
                                <div key={category} className="mt-2 ms-2 fs-7"><a onClick={() => setFilter({ category: category })} href="#" className={`${linkHoverStyle}`} >{category}<small> ({count})</small></a></div>
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
                                    <div key={brand} className="mt-2 ms-2 fs-7"><a onClick={() => setFilter({ brand: brand })} className={`${linkHoverStyle}`} href="#">{brand}<small> ({count})</small></a></div>
                                )
                            })
                    }
                </div>
            </div>

        </div>
    )
}

export default AccordionFilterComponent