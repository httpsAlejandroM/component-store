import { ComponentInterface } from "../../interfaces"
import SorterComponent from "./SorterComponent"

interface props {
    data: ComponentInterface[]
}

type CategoryCounts = {
    [key: string]: number;
};


function FilterDesplegable({ data }: props) {

    const categoryCounts = data.reduce((acc: CategoryCounts, component) => {
        const { category } = component;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const brandsCounts = data.reduce((acc: CategoryCounts, component) => {
        const { brand } = component;
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="filter-menu second-color d-flex flex-column align-items-start px-5">
            <span className="text-white fs-5 mb-1">Filtrar por</span>
            <hr className="border-white border-1  my-2 col-12" />

            <div className="accordion col-12 " id="accordionFlushExample">
                <div className="accordion-item second-color px-4 d-flex flex-column justify-content-start">
                    <h2 className="accordion-header">

                        <button className="accordion-button collapsed btn-outline-success second-color" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Categorias 
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse second-color mt-2" data-bs-parent="#accordionFlushExample">
                        {
                            Object.entries(categoryCounts).map(([category]) => {
                                return (
                                    <div key={category} className="form-check form-check px-0 ms-2 my-1">
                                        <input className="form-check-input " type="checkbox" value="" id={`${category}`} />
                                        <label className="form-check-label text-white link-success " htmlFor={`${category}`}>
                                            {`${category}`}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="accordion-item second-color px-4 d-flex flex-column justify-content-start">
                    <h2 className="accordion-header">

                        <button className="accordion-button collapsed btn-outline-success second-color" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Marcas
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse second-color mt-2" data-bs-parent="#accordionFlushExample">
                        {
                            Object.entries(brandsCounts).map(([brand]) => {
                                return (
                                    <div key={brand} className="form-check form-check ps-0 ms-2 my-1">
                                        <input className="form-check-input " type="checkbox" value="" id={`${brand}`} />
                                        <label className="form-check-label text-white link-success " htmlFor={`${brand}`}>
                                            {`${brand}`}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <hr className="border-white border-1  my-3 col-12" />
                <div className="d-flex flex-column align-items-start">
                    <SorterComponent></SorterComponent>
                </div>
                <hr className="border-white border-1  my-3 col-12" />
                <button className="text-white fs-5 btn btn-outline-success"> Limpiar filtro  <i className="bi bi-trash fs-4 "></i></button>
            </div>


        </div>
    )
}

export default FilterDesplegable