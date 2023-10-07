import { useState } from "react"

function SorterComponent() {

    const [currentSort, setCurrentSort] = useState<string>("Más relevantes")

    const sortOptions = ["De A - Z", "De Z - A", "Menor precio", "Mayor precio", "Más relevantes"]
    return (
        <div className="d-flex flex-row align-items-center justify-content-end me-4 mt-3">
            <span className="text-white fs-5">Ordenar por</span>
            <div className="dropdown ms-2 me-3">
                <button className="btn btn-outline-success dropdown-toggle " style={{ width: 160 }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentSort}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark second-color">
                    {
                        sortOptions.map((option: string, index: number) => {
                            return (
                                <li key={index}><button className={`dropdown-item text-white link-success ${currentSort == option? "disabled" : ""}`} onClick={() => setCurrentSort(option)}>{option}</button></li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}

export default SorterComponent