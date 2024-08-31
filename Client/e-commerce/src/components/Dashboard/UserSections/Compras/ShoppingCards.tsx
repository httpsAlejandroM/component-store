import { Link } from "react-router-dom"
import { orderInterface } from "../../../../interfaces/order.interface"
import { PublicRoutes } from "../../../../utilities/routes"
import { useRef } from "react";
import OrderDetail from "./OrderDetail";

function ShoppingCard({ items, statusDetail, datePayment, total, id }: orderInterface) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const formatDate = (date: string) => {
        const splitedDate = date.split("/")
        const dia = parseInt(splitedDate[0]) < 10 ? `${splitedDate[0].length - 1}` : splitedDate[0]
        const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        return `${dia} de ${mes[Number(splitedDate[1]) - 1]} de ${splitedDate[2].split(",")[0]}`
    }


    return (
        <div className="bg-light d-flex flex-column mt-3 rounded-3">
            <div className="row d-flex flex-row align-items-center p-3">
                <p className="p-0 ps-3 m-0 mb-1">{formatDate(datePayment)}</p>
                <hr className="p-0 m-0 border-dark-subtle" />
            </div>
            <div className="row d-flex flex-column align-items-center justify-content-center">
                {items?.map((component) => {
                    return (
                        <div className="row d-flex flex-column align-items-center justify-content-center favorite-card" key={component.id}>

                            <div className="row col-12 d-flex flex-row p-3 p-md-5 align-items-center justify-content-center justify-content-lg-evenly">

                                <div className="row col-4 col-md-3 offset-md-1 offset-lg-0 col-lg-2 p-0">
                                    <Link to={`${PublicRoutes.DETAIL}/${component.id}`}>
                                        <img className="img-fluid" style={{ maxHeight: "140px" }} src={component.picture_url} alt={`${component.title}`} title={component.title} />
                                    </Link>
                                </div>

                                <div className="row col-8  col-lg-5 ps-4 d-flex  flex-column justify-content-evenly align-items-center">
                                    <h3 className="row fs-6">{component.title}</h3>
                                    <small className="row">{`${component.quantity} ${component.quantity > 1 ? "Unidades" : "Unidad"}`}</small>
                                </div>

                                <div className="row col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2 mt-4 mt-lg-0">
                                    <button
                                        onClick={openDialog}
                                        className="btn btn-buy shadow-sm col-10">
                                        Ver compra
                                    </button>
                                    <Link to={`${PublicRoutes.DETAIL}/${component.id}`} className={`btn btn-add-cart shadow-sm col-10 fw-bolder text-success-alpha`}>
                                        Volver a comprar
                                    </Link>
                                    <dialog className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 translate-middle top-50 start-50 end-50 border-0 rounded-3" ref={dialogRef}>
                                        <OrderDetail closeDialog={closeDialog} order={{ items, statusDetail, datePayment: formatDate(datePayment), total, id }}></OrderDetail>
                                    </dialog>
                                </div>


                            </div>

                        </div>
                    )
                })}
            </div>
            {/* <div className="d-flex flex-row justify-content-end align-items-center col-11 p-2 pe-0 fs-5">
                {`Total $${total}`}
            </div> */}
        </div>
    )
}
export default ShoppingCard