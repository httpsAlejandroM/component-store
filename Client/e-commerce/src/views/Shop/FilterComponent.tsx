import AccordionFilterComponent from "./AccordionFilterComponent"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import { useGetComponentsQuery } from "../../redux/componentsApi/componentsApi"

//RENDERIZZAR LOS FILTROS DESDE LAS QUERYS Y NO DESDE LE ESTADO LOCAL
//AGREGAR BOTONES PARA LIMPIAR BUSQUEDA EN FILTRO Y FILTRO RESPONSIVE. 
//AGREGAR EL TERMINO DE BUSQUEDA EN FILTRO RESPONSIVE
//AGREGAR PAGINADO Y ORDENAMIENDO
//AGREGAR DIV DE SUGERENCIAS AL BUSCADOR DEL SHOP

interface filterInterface {
    category:string
    brand:string
}

type filterState = {
    category: string[]
    brand: string[]
}

function FilterComponent() {
    
    const [currentFilters, setCurrentFilters] = useState<filterState>({category:[],brand:[] })
    const dispatch = useAppDispatch()
    const fetchFilters = useAppSelector((state)=> state.searchReducer)
    const { data } = useGetComponentsQuery(fetchFilters,{
        refetchOnMountOrArgChange:false
      })

const filterHandler = (producto:filterInterface) => {
    //verifico que la key sea category o brand para que no llore typescript
    const nameOfProperty =  Object.keys(producto)[0] === "category"? "category" : "brand" 
    //accedo dinamicamente a las propiedades del state y verifico que incluyan los valores del objeto que llega por parametro en caso de inclurlo lo borro
    if(currentFilters[nameOfProperty].includes(producto[nameOfProperty])){
        const deletedCategory = currentFilters[nameOfProperty].filter((categoria)=>categoria !== producto[nameOfProperty])
    //hago una copia del state y cambio dinamicamente la propiedad category o brand y la actualizo con el nuevo resultado
        setCurrentFilters({...currentFilters, [nameOfProperty]: deletedCategory})
        dispatch(setFetchFilters({...fetchFilters, [nameOfProperty]:deletedCategory.join(",")  }))
    }
    else{
      const newCategory = [...currentFilters[nameOfProperty], producto[nameOfProperty]]
      setCurrentFilters({...currentFilters, [nameOfProperty]:newCategory})
      dispatch(setFetchFilters({...fetchFilters, [nameOfProperty]: newCategory.join(",")}))
    }
}

const btnCloseHandler = (filter:string) => {
    if(currentFilters.category.includes(filter)){
        const deleteFilter = currentFilters.category.filter((filtro)=> filtro !== filter )
        setCurrentFilters({...currentFilters, category: deleteFilter})
        dispatch(setFetchFilters({...fetchFilters, category:deleteFilter.join(",")  }))
    }
    else{
        const deleteFilter = currentFilters.brand.filter((filtro)=> filtro !== filter )
        setCurrentFilters({...currentFilters, brand: deleteFilter})
        dispatch(setFetchFilters({...fetchFilters, brand:deleteFilter.join(",")  }))
    }
}

const allFilters = [...currentFilters.category, ...currentFilters.brand]

// let prevScrollPos = window.scrollY;

// window.onscroll = function() {
//   let currentScroll = window.scrollY;
//   const aside = document.getElementById("aside")     
//   if (aside){
//     if (currentScroll > 140) {
//         aside.classList.add("sticky-top", "content")
//     }
//     else{
//         aside.classList.remove("sticky-top", "content")
//     }
//   }

//   prevScrollPos = currentScroll
// }

    return (
        <aside className={`mt-4 col-2 d-none d-xl-flex flex-xl-column align-items-start`} id="aside">
            
            <div className="d-flex flex-column mt-4 col-12">
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center"> 
                   <input type="number" className="priceInput rounded-2"  placeholder="$ Minimo" />
                    <div className="text-white p-2">{`-`}</div>
                   <input type="number"className="priceInput rounded-2"   placeholder="$ Maximo" />
                </div>
                <button className="sbg-color  btn btn-outline-success rounded-2 w-100  text-white mt-3  mt-xl-1"><i className="bi bi-chevron-right"></i></button>
               
            </div>
            { data && <AccordionFilterComponent data={data.data} setFilter={filterHandler}></AccordionFilterComponent>}
            <div className="mt-4 col-12">
                <p className="text-white fs-6">{fetchFilters.title? fetchFilters.title : "Todos los productos"}</p>
                {data && <span className="text-white fs-7">{`${fetchFilters.title? `${data.data.length} resultados de busqueda` : `${data.data.length} resultados`}`}</span>}
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