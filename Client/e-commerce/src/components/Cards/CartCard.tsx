import QuantityProduct from "../../views/Detail/SubSections/Components/QuantityProduct"

interface props {
  id: string
image: string
title: string
price: number
quantity: number
stock: number
}

function CartCard({id, image, title, price, quantity,stock}:props) {
  return (
    <div className="row">
      <div className="col-2">
        <img className="img-fluid" src={image} alt="" />
      </div>
      <div className="row col-8">
        <QuantityProduct stock={stock} styles="col-6"/>
        <button className="btn btn-outline-danger col-6">Eliminar</button>
      </div>
      <div className="col-2"></div>
    </div>
  )
}
export default CartCard