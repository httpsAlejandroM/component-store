import { ComponentInterface } from "../../interfaces";


interface props {
    data: ComponentInterface[]
    setFilter: Function
}

type CategoryCounts = {
    [key: string]: number;
  };
  

function AccordionFilterComponent({data, setFilter}:props) {

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
    

    const linkHoverStyle = "link-offset-1-hover link-underline link-success-dark link-underline-opacity-0 link-underline-opacity-75-hover ms-2"


  return (
    <div className="accordion mt-4 col-12 " id="accordionFlushExample">
                <div className="accordion-item ">
                    <h2 className="accordion-header ">
                        
                        <button className="accordion-button collapsed sbg-color  btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Categorias
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        {
                            Object.entries(categoryCounts).map(([category, count])=>{
                                return (
                                    <div key={category}  className="mt-2 ms-2 fs-7"><a onClick={()=>setFilter(category)} href="#" className={`${linkHoverStyle}`} >{category}<small> ({count})</small></a></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="accordion-item ">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed sbg-color  btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Marcas
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    {
                            Object.entries(brandsCounts).map(([brand, count])=>{
                                return (
                                    <div key={brand} className="mt-2 ms-2 fs-7"><a onClick={()=>setFilter(brand)} className={`${linkHoverStyle}`} href="#">{brand}<small> ({count})</small></a></div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
  )
}

export default AccordionFilterComponent