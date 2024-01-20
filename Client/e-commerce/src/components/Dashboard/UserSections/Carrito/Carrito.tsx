import { useAppSelector } from "../../../../redux/hooks"
import AccountSummary from "./AccountSummary"
import CardsCartContainer from "./CardsCartContainer"
import EmptyCart from "./EmptyCart"

function Carrito() {

  const cartItems = useAppSelector((state) => state.userReducer.userInfo.cart)

  const isEmpty = cartItems.length > 0
  return (
    <section className="container mb-5 mt-4">
      {
        isEmpty ?
        <>
        <h2 className="col fs-3 mb-4 text-white text-start">Carrito</h2>
          <div className="row justify-content-between">
            <CardsCartContainer components={cartItems} />
            <AccountSummary components={cartItems} />
          </div>
        </>
          : <EmptyCart/>
      }
    </section>
  )
}
export default Carrito