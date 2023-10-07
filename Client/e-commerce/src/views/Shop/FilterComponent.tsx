import { ComponentInterface } from "../../interfaces"

interface props {
    data: ComponentInterface[]
}

type CategoryCounts = {
    [key: string]: number;
  };
  

function FilterComponent({data}:props) {
    
    const categoryCounts = data.reduce((acc:CategoryCounts, component) => {
        const { category } = component;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
    
      const brandsCounts = data.reduce((acc:CategoryCounts, component) => {
        const { brand } = component;
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
      }, {});
    


    const linkHoverStyle = "link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ms-2"

    return (
        <aside className="mt-5 col-2">
            <div className="d-flex flex-column">
                <h5 className="text-white">Precio</h5>
                <div className="d-flex flex-column flex-xl-row align-items-start justify-content-center"> 
                   <input type="number" className="priceInput rounded-2"  placeholder="$ Minimo" />
                    <div className="text-white p-2">{`-`}</div>
                   <input type="number"className="priceInput rounded-2"   placeholder="$ Maximo" />
                </div>
                <button className="sbg-color rounded-2 w-100 btn btn-outline-success text-white mt-3  mt-xl-0"><i className="bi bi-chevron-right"></i></button>
               
            </div>
            <div className="accordion mt-3" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Categorias
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {
                            Object.entries(categoryCounts).map(([category, count])=>{
                                return (
                                    <div key={category} className="mt-2 ms-2"><p><a className={`${linkHoverStyle}`} href="#">{category}<small> ({count})</small></a></p></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Marcas
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    {
                            Object.entries(brandsCounts).map(([brand, count])=>{
                                return (
                                    <div key={brand} className="mt-2 ms-2"><p><a className={`${linkHoverStyle}`} href="#">{brand}<small> ({count})</small></a></p></div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        </aside>
    )
}

export default FilterComponent