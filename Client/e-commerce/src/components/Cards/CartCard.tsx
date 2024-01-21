import { useState } from "react"
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

  const [quantityProduct, setQuantityProduct] = useState<number>(quantity)

  const total = quantityProduct * price

  return (
    <div className="row col-12 rounded-3 py-4  bg-light justify-content-between align-items-center">

      {/* <div className="col-10 offset-1 offset-sm-0 col-sm-3 col-xl-2 align-items-center justify-content-center d-flex">
        <img key={id} className="img-fluid cart-card-img" src={image} alt={title} />
      </div>
      
      <div className="row col-12 offset-sm-0  col-sm-9 col-xl-6 align-items-center justify-content-start">
        <div className="row align-items-center">

          <div className="col-12 align-items-start d-flex">
            <span title={title} className="fs-5 text-truncate">{title}</span>
          </div>

          <div className="row col-12 my-2 my-sm-0 d-flex">
            <button type="button" className="col-auto  btn btn-link col-auto fs-7 text-start  text-decoration-none">
              Eliminar
            </button> 
            <button type="button" className="col-auto  btn btn-link col-auto fs-7 text-start text-decoration-none">
              Comprar ahora
            </button>
          </div>

        </div>
      </div>

      <div className="offset-sm-2 ps-sm-5 ps-xl-0 offset-xl-0 col-5 col-sm-4 col-xl-2 align-items-center d-flex justify-content-start">
        <QuantityProduct quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} stock={stock} styles="col-12 ps-3 ps-xl-0">
        <div className="col-12 text-center d-sm-block d-none" style={{fontSize:"0.6rem"}}><span>{`${stock} disponibles`}</span></div>
        </QuantityProduct>
      </div>

      <div className="col-5 col-sm-3 col-xl-2 align-items-center justify-content-end d-flex">
        <span className="fs-4 col-12">{`$${total}`}</span>
      </div> */}

      <div className="row col-12  col-sm-3 col-lg-2 col-xl-2 align-items-center justify-content-center d-flex">
        <img key={id} className="img-fluid " src={image} alt={title} />
      </div>


      <div className="row col-12  col-sm-9 col-lg-10 col-xl-10 align-items-center justify-content-start">
        <div className="row col-xl-6 align-items-center">

          <div className="col-12 align-items-start d-flex">
            <span title={title} className="fs-5 text-truncate">{title}</span>
          </div>

          <div className="row col-12 my-2 my-sm-0 d-flex">
            <button type="button" className="col-auto  btn btn-link col-auto fs-7 text-start  text-decoration-none">
              Eliminar
            </button>
            <button type="button" className="col-auto  btn btn-link col-auto fs-7 text-start text-decoration-none">
              Comprar ahora
            </button>
          </div>
        </div>

        <div className="row col-12 col-xl-6 align-items-center justify-content-between">
            <QuantityProduct quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} stock={stock} styles="col-auto ps-3 ps-xl-0">
              <div className="col-12 text-center d-sm-block d-none" style={{ fontSize: "0.6rem" }}><span>{`${stock} disponibles`}</span></div>
            </QuantityProduct>
            <span className="fs-4 col-auto">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>
      
    </div>
  )
}
export default CartCard