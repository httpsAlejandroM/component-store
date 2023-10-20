import { useState } from "react";
import { ComponentInterface } from "../../interfaces"
import FilterDesplegable from "./FilterDesplegable";

interface props {
    data: ComponentInterface[]
    setBlur: Function
}

function ResponsiveFilter({ data, setBlur }: props) {

    const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);

    const menuHandler = () => {
        setFilterMenuOpen(!isFilterMenuOpen)
        setBlur(!isFilterMenuOpen)
    }

    

    return (
        <aside className="mt-3 d-flex flex-row justify-content-evenly container d-xl-none">
            <div className="d-flex align-items-center">
                <span className="text-white fs-4">{`${data.length} resultados`}</span>
            </div>
            <div className="d-flex align-items-center position-relative">
                <button aria-label="Boton de filtrado" className="btn" onClick={() => menuHandler()}><i className="bi bi-filter-square text-white fs-2"></i></button>
                {isFilterMenuOpen && <FilterDesplegable data={data}></FilterDesplegable>}
            </div>
        </aside>
    )
}

export default ResponsiveFilter