import { useState } from "react"

function SorterComponent() {

    const [currentSort, setCurrentSort] = useState<string>("Más relevantes")

    const sortOptions = ["De A - Z", "De Z - A", "Menor precio", "Mayor precio", "Más relevantes"]
    return (
        <>
            <div className="dropdown ">
                <button className="btn btn-outline-success dropdown-toggle col-12"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentSort}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark second-color col-12">
                    {
                        sortOptions.map((option: string, index: number) => {
                            return (
                                <li key={index}><button className={`dropdown-item text-white link-success ${currentSort == option? "disabled" : ""}`} onClick={() => setCurrentSort(option)}>{option}</button></li>
                            )
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default SorterComponent