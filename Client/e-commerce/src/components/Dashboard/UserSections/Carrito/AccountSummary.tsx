
interface props {
    components: any[]

}

function AccountSummary({ components }: props) {

    const total = components.reduce((acc, component) => {
        const totalByComponent = component.price * component.quantity
        return acc + totalByComponent
    }, 0)

    const quantityProducts = components.reduce((acc, component) => {
        const totalProducts = component.quantity + acc
        return totalProducts
    }, 0)

    const totalProducts = <div className="my-1 my-sm-2 row justify-content-center">
        <span className="fs-6 text-start col-12">
            {`Productos (${quantityProducts})`}
        </span>
    </div>

    const detailProducts = components.map((component) => {
        return (
            <div key={component.title} className="my-1 my-sm-2 row justify-content-center">
                <span className="fs-6 col-10 text-start">{component.title}</span>
                <span className="fs-6 col-2 text-center">{`x${component.quantity}`}</span>
            </div>
        )
    })

    return (
        <div className="col-12 col-xl-4 col-xxl-3 sticky-bottom mt-5 mt-xl-0 position-lg-static z-0">
            <div className="col-12 bg-light justify-content-center p-3 rounded-3">
                <h3 className="fs-5 text-start">
                    Resumen de compra
                </h3>
                <hr className="col-12 " />
                <div className="my-3 row justify-content-center" >
                    {totalProducts}
                    {detailProducts}
                </div>
                <div className="row my-3 text-center">
                    <span className="col-6 fw-bolder fs-5">
                        Total
                    </span>
                    <span className="col-6 fw-bolder fs-5">
                        {`$${total.toFixed(2)}`}
                    </span>
                </div>
                <button className="offset px-0 col-12 btn btn-buy">
                    Continuar compra
                </button>
            </div>
        </div>
    )
}
export default AccountSummary