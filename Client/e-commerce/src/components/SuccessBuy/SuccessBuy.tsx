import { Link, useLocation } from "react-router-dom"
import logoPag from "../../assets/firebase.png"
import { PublicRoutes } from "../../utilities/routes"

function SuccessBuy() {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const paymentId = query.get('payment_id');

  console.log(paymentId);
  

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
          <hr className="opacity-"/>
          <div className="col-12">
            <p>Pronto llegara a tu domicilio </p>
            <div className="display-1">
              {`Producto con Id: ${paymentId}`}
              {/* <img src="" alt="Producto comprado" /> */}
            </div>
            <hr className=""/>
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