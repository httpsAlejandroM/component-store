import { Link } from "react-router-dom"
import logoPag from "../../assets/firebase.png"
import { PublicRoutes } from "../../utilities/routes"
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
      console.log(order);
    }
  }

  useEffect(() => {
    orderById()
  }, [userInfo])

  return (
    <section className="container-fluid row p-0 m-0 second-color d-flex justify-content-center">

      <div className="col-9 d-flex justify-content-between align-items-center">
        <div className="d-flex col-11" >
          <Link className="col-2"
            to={`${PublicRoutes.HOME}`}><img
              className="img-fluid col-12 col-sm-9 col-md-6 col-lg-5 col-xl-3"
              src={logoPag}
              alt="Logo Pagina" /></Link>
        </div>
        <p className="col-1 text-white p-0 m-0">Ayuda</p>

      </div>

      <div className="col-12 bg-success w-100 d-flex flex-column align-items-center">

        <div className=" bg-light rounded-3 shadow">
          <div className="col-12 px-5 pt-4">¡Felicidades! Tu compra se ha realizado con éxito</div>
          <hr className="" />

          <div className="d-flex flex-row justify-content-between align-items-center">
            
            <p className="d-flex">Pronto llegara a tu domicilio </p>
            
            <div className="d-flex justify-content-center">
              {order?.items.map((item, index: number) => {
                return (
                  <img className="img-fluid col" src={item.picture_url} alt={`Producto ${index}`} />
                )
              })}
            </div>
            <hr className="col-12" />
          </div>

          <div className="col-12 px-5 pb-4">
            <button className="btn btn-success">
              Ver mis compras
            </button>
          </div>

        </div>
      </div>

      {/* <div className="col-12 bg-light w-100">SuccessBuy</div> */}
    </section>
  )
}
export default SuccessBuy