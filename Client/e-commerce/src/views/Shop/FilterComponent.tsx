import { ComponentInterface } from "../../interfaces"
import AccordionFilterComponent from "./AccordionFilterComponent"
import { useState } from "react"

interface props {
    data: ComponentInterface[]
    setFetchFilters: Function
    fetchFilters: Object
}

interface filterInterface {
    category:string
    brand:string
}

type filterState = {
    category: string[]
    brand: string[]
}

function FilterComponent({data, setFetchFilters, fetchFilters}:props) {

    const [currentFilters, setCurrentFilters] = useState<filterState>({category:[],brand:[] })

const filterHandler = (producto:filterInterface) => {
    //verifico que la key dinamica sea category o brand para que no llore typescript
    const nombreDeLaPropiedad =  Object.keys(producto)[0] === "category"? "category" : "brand" 
    //accedo dinamicamente a las propiedades del state y verifico que incluyan los valores del objeto que llega por parametro en caso de inclurlo lo borro
    if(currentFilters[nombreDeLaPropiedad].includes(producto[nombreDeLaPropiedad])){
        const deletedCategory = currentFilters[nombreDeLaPropiedad].filter((categoria)=>categoria !== producto[nombreDeLaPropiedad])
    //hago una copia del state y cambio dinamicamente la propiedad category o brand y la actualizo con el nuevo resultado
        setCurrentFilters({...currentFilters, [nombreDeLaPropiedad]: deletedCategory})
        setFetchFilters({...fetchFilters, [nombreDeLaPropiedad]:deletedCategory.join(",")  })
    }
    else{
      const newCategory = [...currentFilters[nombreDeLaPropiedad], producto[nombreDeLaPropiedad]]
      setCurrentFilters({...currentFilters, [nombreDeLaPropiedad]:newCategory})
      setFetchFilters({...fetchFilters, [nombreDeLaPropiedad]: newCategory.join(",")})
    }


}

const btnCloseHandler = (filter:string) => {
    if(currentFilters.category.includes(filter)){
        const deleteFilter = currentFilters.category.filter((filtro)=> filtro !== filter )
        setCurrentFilters({...currentFilters, category: deleteFilter})
        setFetchFilters({...fetchFilters, category:deleteFilter.join(",")  })
    }
    else{
        const deleteFilter = currentFilters.brand.filter((filtro)=> filtro !== filter )
        setCurrentFilters({...currentFilters, brand: deleteFilter})
        setFetchFilters({...fetchFilters, brand:deleteFilter.join(",")  })
    }
}

const allFilters = [...currentFilters.category, ...currentFilters.brand]
    return (
        <aside className="mt-4 col-2 d-none d-xl-flex flex-xl-column align-items-start ">
            
            <div className="d-flex flex-column mt-4 col-12">
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center"> 
                   <input type="number" className="priceInput rounded-2"  placeholder="$ Minimo" />
                    <div className="text-white p-2">{`-`}</div>
                   <input type="number"className="priceInput rounded-2"   placeholder="$ Maximo" />
                </div>
                <button className="sbg-color  btn btn-outline-success rounded-2 w-100  text-white mt-3  mt-xl-1"><i className="bi bi-chevron-right"></i></button>
               
            </div>
            <AccordionFilterComponent data={data} setFilter={filterHandler}></AccordionFilterComponent>
            <div className="mt-4 col-12">
                <p className="text-white fs-6">{`${data.length} resultados`}</p>
            <div className="flex-wrap ">
                {
                    allFilters.map((filter:any)=>{
                        return (
                            <div key={filter} className="d-inline-flex flex-row align-items-center second-color ps-1 m-1" data-bs-theme="dark">
                                <div  className="text-white"><small>{filter}</small></div><button onClick={()=>btnCloseHandler(filter)} type="button" className="btn-close" aria-label="Close"></button>
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