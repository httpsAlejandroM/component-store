import { Link } from "react-router-dom"
import { orderInterface } from "../../../../interfaces/order.interface"
import { PublicRoutes } from "../../../../utilities/routes"



function ShoppingCard({ items, statusDetail, datePayment, total }: orderInterface) {

    const formatDate = (date: string) => {
        const splitedDate = date.split("/")
        const dia = parseInt(splitedDate[0]) < 10 ? `${splitedDate[0].length - 1}` : splitedDate[0]
        const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        return `${dia} de ${mes[Number(splitedDate[1]) - 1]} de ${splitedDate[2].split(",")[0]}`
    }

   const textColor = datePayment === "Pagado" || "Enviado"? "text-success-alpha" : "text-warning"

   
    return (
        <div className="bg-light d-flex flex-column mt-3 rounded-3">
            <div className="row d-flex flex-row align-items-center p-3">
                <p className="p-0 ps-3 m-0 mb-1">{formatDate(datePayment)}</p>
                <hr className="p-0 m-0" />
            </div>
            <div className="row d-flex flex-column">
                {items?.map((component) => {
                    return (
                        <>
                        <div key={component.id} className="d-flex flex-row p-5 align-items-center justify-content-evenly">
                            <div className="row col-2  p-2">
                                <Link to={`${PublicRoutes.DETAIL}/${component.id}`}>
                                <img className="img-fluid" src={component.picture_url} alt="" />
                                </Link>
                                
                            </div>
                            <div className="row col-5 ps-4 d-flex  flex-column justify-content-evenly align-items-center">
                                <p className={`row ${textColor} fs-6`}>{statusDetail}</p>
                                <p className="row fs-5">{component.title}</p>
                                <small className="row">{`${component.quantity} unidad`}</small>
                            </div>
                            <div className="row col-2 fs-4 d-flex flex-row justify-content-center align-items-center">
                                {`$${component.unit_price}`}
                            </div>
                            <div className="row col-3 d-flex flex-column justify-content-center align-items-center gap-2">
                                <Link to={`${PublicRoutes.DETAIL}/${component.id}`} className="btn btn-buy col-10">
                                    Ver compra
                                </Link>
                                <button className={`btn btn-outline-danger ${statusDetail !== "Entregado" ? "disabled" : ""} col-10`}>
                                    Opinar
                                </button>
                            </div>

                        </div>
                        <hr className="p-0 m-0"/>
                        </>
                    )
                })}
            </div>
            <div className="d-flex flex-row justify-content-end align-items-center col-11 p-2 pe-0 fs-5">
                {`Total $${total}`}
            </div>
        </div>
    )
}
export default ShoppingCard