import QuantityProduct from "../../views/Detail/SubSections/Components/QuantityProduct"

interface props {
  id: string
  image: string
  title: string
  price: number
  quantity: number
  stock: number
}

function CartCard({ id, image, title, price, quantity, stock }: props) {

  const total = quantity * price

  return (
    <div className="row col-12 rounded-3 py-5 bg-light justify-content-between align-items-center ">

      <div className=" col-lg-3 col-xl-2">
        <img key={id} className="img-fluid" src={image} alt={title} />
      </div>
      
      <div className="row col-lg-9 col-xl-6 align-items-center justify-content-start">
        <div className="row align-items-center">

          <div className="col-12 align-items-start d-flex">
            <span className="fs-5 text-truncate">{title}</span>
          </div>

          <div className="row col-12">
            <button type="button" className=" btn btn-link col-auto fs-6 text-start  text-decoration-none">
              Eliminar
            </button> 
            <button type="button" className="btn btn-link col-auto fs-6 text-start text-decoration-none">
              Comprar ahora
            </button>
          </div>

        </div>
      </div>

      <div className="offset-lg-2 ps-5 ps-xl-0 offset-xl-0 col-lg-4 col-xl-2 align-items-center d-flex justify-content-start">
        <QuantityProduct stock={stock} styles="col-12 ps-3 ps-xl-0">
        <div className="col-12 text-center" style={{fontSize:"0.6rem"}}><span>{`${stock} disponibles`}</span></div>
        </QuantityProduct>
      </div>

      <div className="col-lg-3 col-xl-2 align-items-center justify-content-lg-end d-flex">
        <span className="fs-4 col-12">{`$${total}`}</span>
      </div>
    </div>
  )
}
export default CartCard