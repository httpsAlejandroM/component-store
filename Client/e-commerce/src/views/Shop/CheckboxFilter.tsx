import { ComponentInterface } from "../../interfaces"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFetchFilters } from "../../redux/slices/search.slice";


interface props {
    data: ComponentInterface[]
}

type CategoryCounts = {
    [key: string]: number;
};

function CheckboxFilter({ data }: props) {

    const fetchFilter = useAppSelector((state)=> state.searchReducer)
    const dispatch = useAppDispatch()

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

    const fetchHandler = (event:any, productName:string) => {
        const propertyValue:"category" | "brand" = event?.target.value 
        console.log(fetchFilter);
        if(fetchFilter[propertyValue] && fetchFilter[propertyValue].split(",").includes(productName) ){
            const deletedFilter = fetchFilter[propertyValue].split(",").filter((productBy) => productBy !== productName ).join(",")
            dispatch(setFetchFilters({...fetchFilter, [propertyValue]: deletedFilter }))
        }
        else{
            const addFilter = [...fetchFilter[propertyValue], productName]
            dispatch(setFetchFilters({...fetchFilter, [propertyValue]:addFilter.join(",")}))
        }
    }

    // const categorysFilter = fetchFilter.category && [...fetchFilter.category.split(",")]
    // const brandsFilter = fetchFilter.brand && [...fetchFilter.brand.split(",")]

    return (
        <>
            <div className="accordion-item second-color px-4 d-flex flex-column justify-content-start ">
                <h2 className="accordion-header">

                    <button className="accordion-button collapsed btn-outline-success second-color " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Categorias
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse second-color mt-2 " data-bs-parent="#accordionFlushExample">
                    {
                        Object.entries(categoryCounts).map(([category]) => {
                            return (
                                <div key={category} className="form-check form-check px-0 ms-2 my-1">
                                    <input className="form-check-input " type="checkbox" onClick={(event)=>{fetchHandler(event, category)}} value="category" id={`${category}`} />
                                    <label className="form-check-label text-white link-success"  htmlFor={`${category}`}>
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
                                    <input className="form-check-input " type="checkbox" onClick={(event)=>{fetchHandler(event, brand)}} value="brand" id={`${brand}`} />
                                    <label className="form-check-label text-white link-success " htmlFor={`${brand}`}>
                                        {`${brand}`}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CheckboxFilter