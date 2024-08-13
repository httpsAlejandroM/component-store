import { orderInterface } from "../../../../interfaces/order.interface";

interface props {
    order: orderInterface
    closeDialog: VoidFunction
}

export default function OrderDetail({order, closeDialog}: props) {
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <span className="fs-5">Detalle de la compra</span>
                    <button onClick={closeDialog} type="button" className="btn-close "></button>
                </div>
                <small>
                {`${order.datePayment} | ${order.id}`}
                </small>
            </div>

            <hr className="border-dark-subtle" />
            <div className="d-flex flex-column">
                <div>
                    <span className="fs-5">Producto/s</span>
                </div>
                <div className="d-flex flex-column">
                    {
                        order.items.map((component)=>{
                            return (
                                <div key={component.title}
                                className="d-flex flex-row justify-content-end align-items-center"
                                >
                                    <div className="d-flex flex-row justify-content-start align-items-center">
                                        <small>{`$${component.unit_price}`}</small>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                        <img className="img-fluid" style={{maxWidth: "100px"}} src={component.picture_url} alt={component.title} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <hr className="border-dark-subtle" />
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <span>Estado</span>
                </div>
                <div>
                    <span>
                        {order.statusDetail}
                    </span>
                </div>
            </div>

            <hr className="border-dark-subtle" />
            <div className="d-flex flex-row justify-content-between">
                    <div>
                        Total
                    </div>
                    <div>
                        {`$${order.total}`}
                    </div>
            </div>
        </>
    )
}