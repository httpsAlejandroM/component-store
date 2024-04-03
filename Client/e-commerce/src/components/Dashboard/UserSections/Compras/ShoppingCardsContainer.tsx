import { orderInterface } from "../../../../interfaces/order.interface"
import ShoppingCard from "./ShoppingCards"

interface props {
    orders: orderInterface[]
}

function ShoppingCardsContainer({orders}:props) {
  return (
    <div className="rounded-3 mb-4 col-12 d-flex flex-column">
        {
            orders.map((order)=>{
                return (
                    <ShoppingCard
                    key={order.id}
                    id={order.id}
                    items={order.items}
                    statusDetail={order.statusDetail}
                    datePayment={order.datePayment}
                    total={order.total}
                    />
                )
            })
        }
    </div>
  )
}
export default ShoppingCardsContainer