import { Link } from "react-router-dom"
import { PublicRoutes } from "../../../../utilities/routes"

function EmptyCart() {
  return (
    <section className="text-dark d-flex align-items-center justify-content-center content">
        <div className="bg-light p-4 d-flex flex-column align-items-center justify-content-center rounded-3">
        {/* <i className="bi bi-cart-x display-1 my-3"></i> */}
        <h2>Tu carrito está vacio</h2>
        <p className="fs-6 text-center">¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
        <Link to={PublicRoutes.SHOP} className="btn btn-success">
            Descubrir productos
        </Link>
        </div>
    </section>
  )
}
export default EmptyCart