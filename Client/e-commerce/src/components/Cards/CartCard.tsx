import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { updateState } from "../../redux/slices/user.slice"
import QuantityProduct from "../../views/Detail/SubSections/Components/QuantityProduct"
import { useState } from "react"
import LinkButton from "../Dashboard/UserSections/Carrito/LinkButton"
import { updateCartBD } from "../../utilities/cartHelpers"
import BuyButton from "../../views/Detail/SubSections/Components/BuyButton"

interface props {
  id: string
  image: string
  title: string
  price: number
  quantity: number
  category: string
  stock: number
}

function CartCard({ id, image, title, price, quantity, stock, category }: props) {

  const userInfo = useAppSelector((state)=> state.userReducer.userInfo)
  const [quantityProduct, setQuantityProduct] = useState<number>(quantity)
  const dispatch = useAppDispatch()
  const total = quantityProduct * price

  const cartQuantityHandler = (quantity:number) => {
    const cartComponent = {
      _id:id,
      title,
      image,
      price,
      stock,
      quantity: quantity
    }   
    dispatch(updateState({cartComponent}))
   userInfo.id && updateCartBD(userInfo.id, id, quantity)
  }

  const deleteFromCart = () => {
    dispatch(updateState({removeComponent: id}))
    userInfo.id && updateCartBD(userInfo.id, id, 0)
  }

  return (
    <div className="cart-card row col-12 rounded-3 py-4  bg-light justify-content-between align-items-center">
      <div className="row col-12  col-sm-3 col-lg-2 col-xl-2 align-items-center justify-content-center d-flex">
        <img key={id} className="img-fluid cart-card-img" src={image} alt={title} />
      </div>

      <div className="row col-12  col-sm-9 col-lg-10 col-xl-10 align-items-center justify-content-start">
        <div className="row col-xl-6 align-items-center">

          <div className="col-12 align-items-start d-flex">
            <p title={title} className="fs-5 text-truncate m-0">{title}</p>
          </div>

          <div className="row col-12 my-2 my-sm-0 d-flex">
            <LinkButton onClick={deleteFromCart} children={"Eliminar"}/>
            <BuyButton className="col-auto btn btn-link col-auto fs-7 text-start text-decoration-none" components={[{_id: id, image, title, price, quantity, stock, category}]}/>
          </div>
        </div>

        <div className="row col-12 col-xl-6 align-items-center justify-content-between">
            <QuantityProduct updateCart={true} cartQuantityHandler={cartQuantityHandler} quantityProduct={quantityProduct} setQuantityProduct={setQuantityProduct} stock={stock} styles="col-auto ps-3 ps-xl-0">
              <div className="col-12 text-center d-sm-block d-none" ><span className="fs-7 text-truncate">{`${stock} disponibles`}</span></div>
            </QuantityProduct>
            <span className="fs-4 col-auto">{`$${total.toFixed(2)}`}</span>
        </div>
      </div>
      
    </div>
  )
}
export default CartCard