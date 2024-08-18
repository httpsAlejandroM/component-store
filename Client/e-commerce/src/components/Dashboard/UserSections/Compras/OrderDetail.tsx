import { orderInterface } from "../../../../interfaces/order.interface";

interface props {
    order: orderInterface
    closeDialog: VoidFunction
}

export default function OrderDetail({order, closeDialog}: props) {


    const textColor = {
        "En proceso": "text-warning",
        "Pagado": "text-success-alpha",
        "Enviado": "text-primary",
        "Entregado": "text-success",
        "Cancelado": "text-danger"
    }

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <span className="fs-5">Detalle de la compra</span>
                    <button onClick={closeDialog} type="button" className="btn-close "></button>
                </div>
                <small className="text-light-emphasis">
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
                                className="d-flex flex-row justify-content-end align-items-center gap-5"
                                >
                                    <div className="d-flex flex-row justify-content-start align-items-center text-light-emphasis">
                                        <small>{`$${component.unit_price}`}</small>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end align-items-center ">
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
                    <span className={`${textColor["Pagado"]}`}>
                        {order.statusDetail}
                    </span>
                </div>
            </div>

            <hr className="border-dark-subtle" />
            <div className="d-flex flex-row justify-content-between">
                    <div className="">
                        Total
                    </div>
                    <div className="text-light-emphasis">
                        {`$${order.total}`}
                    </div>
            </div>
        </>
    )
}