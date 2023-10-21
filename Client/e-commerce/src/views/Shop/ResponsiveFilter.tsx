import { useState } from "react";
import { ComponentInterface } from "../../interfaces"
import FilterDesplegable from "./FilterDesplegable";
import { useAppSelector } from "../../redux/hooks";

interface props {
    data: ComponentInterface[]
    setBlur: Function
}

function ResponsiveFilter({ data, setBlur }: props) {

    const fetchFilters = useAppSelector((state)=> state.searchReducer)
    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);

    const menuHandler = () => {
        setFilterMenuOpen(!isFilterMenuOpen)
        setBlur(!isFilterMenuOpen)
    }

    

    return (
        <aside className="mt-3 d-flex flex-row justify-content-evenly container d-xl-none">
            <div className="d-flex align-items-center">
                <p className="text-white fs-4 m-0">{fetchFilters.title? fetchFilters.title : "Todos los productos"}</p>
                </div>
            <div className="d-flex align-items-center">
                {data && <span className="text-white fs-4">{`${fetchFilters.title? `${data.length} resultados de busqueda` : `${data.length} resultados`}`}</span>}
            </div>
            <div className="d-flex align-items-center position-relative">
                <button aria-label="Boton de filtrado" className="btn" onClick={() => menuHandler()}><i className="bi bi-filter-square text-white fs-2"></i></button>
                {isFilterMenuOpen && <FilterDesplegable data={data}></FilterDesplegable>}
            </div>
        </aside>
    )
}

export default ResponsiveFilter