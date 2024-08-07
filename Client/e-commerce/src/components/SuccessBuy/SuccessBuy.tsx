import { Link } from "react-router-dom"
import logoPag from "../../assets/firebase.png"
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes"
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { getOrderById } from "../../utilities/getOrderById";
import { useAppSelector } from "../../redux/hooks";
import { orderInterface } from "../../interfaces/order.interface";

function SuccessBuy() {

  const [order, setOrder] = useState<orderInterface | null>(null)
  const userInfo = useAppSelector((state) => state.userReducer.userInfo)
  const query = useQuery();
  const paymentId = query.get('payment_id');

  const orderById = async () => {
    if (userInfo?.id && paymentId) {
      const orderById = await getOrderById(userInfo?.id, paymentId) as orderInterface
      setOrder(orderById)
      console.log(orderById);
    }
  }

  useEffect(() => {
    userInfo?.id && paymentId && orderById()
  }, [userInfo, paymentId])

  return (
    <section className="container-fluid  p-0 m-0 flex-column d-flex align-items-center vh-100">

      <div className="col-12 bg-dark d-flex justify-content-around gap-5 align-items-center">
        <div className="d-flex me-5" >
          <Link className=""
            to={`${PublicRoutes.HOME}`}><img
              className="img-fluid"
              style={{ maxWidth: "60px" }}
              src={logoPag}
              alt="Logo Pagina" /></Link>
        </div>

        <p className=" text-white p-0 my-0 ms-5">Ayuda</p>

      </div>

      <div className="d-flex flex-row justify-content-center align-items-center content">

        <div className="bg-light rounded-3 shadow">
          <div className="px-5 pt-4 fs-5 text-dark">¡Felicidades! Tu compra se ha realizado con éxito</div>
          <hr className="border-dark-subtle" />

          <div className="d-flex flex-row justify-content-around align-items-center">

            <p className="d-flex p-0 m-0">{`Pronto llegara a tu domicilio`} </p>

            <div className={`d-flex ${order && order.items.length > 1 ? "flex-column" : "flex-row"} justify-content-center align-items-center`}>
              {order?.items.map((item, index: number) => {
                return (
                  <img
                    style={{ maxWidth: "150px" }}
                    key={index}
                    className="img-fluid"
                    src={item.picture_url}
                    alt={`Producto ${item.title}`} />
                )
              })}
            </div>
          </div>
          <hr className="border-dark-subtle" />
          <div className="col-12 px-5 pb-3">
            <Link className="btn btn-sm btn-success" to={`${PrivateRoutes.DASHBOARD}`}>
              Ver mis compras
            </Link>
          </div>

        </div>
      </div>

    </section>
  )
}
export default SuccessBuy