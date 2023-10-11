import { ComponentInterface } from "../../interfaces"
import AccordionFilterComponent from "./AccordionFilterComponent"
import { useState } from "react"

interface props {
    data: ComponentInterface[]
}


function FilterComponent({data}:props) {

    const [currentFilters, setCurrentFilters] = useState<string[]>([])

const filterHandler = (category:string) => {
    if(currentFilters.includes(category)){
        const deleteCategory = currentFilters.filter((categoria)=>categoria !== category)
        setCurrentFilters(deleteCategory)
    }
    else{
      const newCategory = [...currentFilters, category]
      setCurrentFilters(newCategory)
    }
}
    
    return (
        <aside className="mt-4 col-2 ">
            
            <div className="d-flex flex-column mt-4">
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center"> 
                   <input type="number" className="priceInput rounded-2"  placeholder="$ Minimo" />
                    <div className="text-white p-2">{`-`}</div>
                   <input type="number"className="priceInput rounded-2"   placeholder="$ Maximo" />
                </div>
                <button className="sbg-color rounded-2 w-100 btn btn-outline-success text-white mt-3  mt-xl-1"><i className="bi bi-chevron-right"></i></button>
               
            </div>
            <AccordionFilterComponent data={data} setFilter={filterHandler}></AccordionFilterComponent>
            <div className="mt-4">
                <p className="text-white fs-6">{`${data.length} resultados`}</p>
            <div className="flex-wrap ">
                {
                    currentFilters.map((filter:string)=>{
                        return (
                            <div key={filter} className="d-inline-flex flex-row align-items-center second-color ps-1 m-1" data-bs-theme="dark">
                                <div  className="text-white"><small>{filter}</small></div><button onClick={()=>filterHandler(filter)} type="button" className="btn-close" aria-label="Close"></button>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </aside>
    )
}

export default FilterComponent