import { useState } from "react";
import { ResponseBackend } from "../../../interfaces"
import FilterDesplegable from "./FilterDesplegable";
import { useAppSelector } from "../../../redux/hooks";

interface props {
    data: ResponseBackend
    setBlur: Function
}

function ResponsiveFilter({ data, setBlur }: props) {

    const fetchFilters = useAppSelector((state) => state.searchReducer)
    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);

    const menuHandler = () => {
        setFilterMenuOpen(!isFilterMenuOpen)
        setBlur(!isFilterMenuOpen)
    }

    return (
        <aside className="mt-3 d-flex flex-row row container d-xl-none">
            <div className="d-flex align-items-center justify-content-center col-6">
                {data && <span className="text-white fs-6">{`${fetchFilters.title ? `${data.total} Resultados de busqueda` : `${data.total} Resultados`}`}</span>}
            </div>
            <div className="d-flex align-items-center  justify-content-center position-relative col-6">
                <button aria-label="Boton de filtrado" 
                className="btn" 
                onClick={() => menuHandler()}><i 
                className="bi bi-sort-down menu-desplegable text-white fs-2"></i></button>
                {isFilterMenuOpen && <FilterDesplegable ></FilterDesplegable>}
            </div>
        </aside>
    )
}

export default ResponsiveFilter