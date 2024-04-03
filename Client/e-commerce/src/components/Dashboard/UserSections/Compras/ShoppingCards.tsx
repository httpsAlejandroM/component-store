import { orderInterface } from "../../../../interfaces/order.interface"



function ShoppingCard({ items, statusDetail, datePayment, total }: orderInterface) {

    const formatDate = (date: string) => {
        const splitedDate = date.split("/")
        const dia = parseInt(splitedDate[0]) < 10 ? `${splitedDate[0].length - 1}` : splitedDate[0]
        const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        return `${dia} de ${mes[Number(splitedDate[1]) - 1]} de ${splitedDate[2].split(",")[0]}`
    }

    return (
        <div  className="bg-light d-flex flex-column mt-3 rounded-3">
            <div className="row d-flex flex-row align-items-center p-3">
                <p className="p-0 ps-3 m-0 mb-1">{formatDate(datePayment)}</p>
                <hr className="p-0 m-0" />
            </div>
            <div className="row d-flex flex-column">
                {items.map((component) => {
                    return (
                        <div key={component.id} className="d-flex flex-row p-5 align-items-center justify-content-center">
                            <div className="row col-2  p-2">
                                <img className="img-fluid" src={component.picture_url} alt="" />
                            </div>
                            <div className="row col-5 ps-4 d-flex  flex-column justify-content-center align-items-center gap-3">
                                <div className="row">{statusDetail}</div>
                                <div className="row">{component.title}</div>
                                <div className="row">{`${component.quantity} unidad`}</div>
                            </div>
                            <div className="row col-2 d-flex flex-row justify-content-center align-items-center">
                                {`$${component.unit_price}`}
                            </div>
                            <div className="row col-3 d-flex flex-column justify-content-center align-items-center gap-2">
                                <button className="btn btn-success col-10">
                                    Ver compra
                                </button>
                                <button className={`btn btn-danger ${statusDetail !== "Entregado" ? "disabled" : ""} col-10`}>
                                    Opinar
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ShoppingCard