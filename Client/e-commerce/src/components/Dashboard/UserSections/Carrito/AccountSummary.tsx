
interface props {
    components: any[]

}

function AccountSummary({ components }: props) {

    const total = components.reduce((acc, component) => {
        const totalByComponent = component.price * component.quantity
        return acc + totalByComponent
    }, 0)

    return (
        <div className="col-3 offset-1">
            <div className="col-12 bg-light justify-content-center p-4">
                <h3 className="text-dark fs-4 text-center">Resumen de compra</h3>
                <hr className="offset-1 col-10" />
                {
                    components.map((component) => {
                        return (
                            <div className="my-4 row justify-content-center" key={component.title}>
                                <span className="fs-5 col-10 text-start">{component.title}</span>
                                <span className="fs-5 col-2 text-center">{`x${component.quantity}`}</span>
                            </div>
                        )
                    })
                }
                <div className="row my-3 text-center">
                    <span className="col-6 fw-bolder fs-4">Total</span>
                    <span className="col-6 fs-4">{`$${total}`}</span>
                </div>
                <button className="offset-1 col-10 btn btn-buy">Continuar compra</button>
            </div>
            <div className="col-12 p-4">

            </div>
        </div>
    )
}
export default AccountSummary