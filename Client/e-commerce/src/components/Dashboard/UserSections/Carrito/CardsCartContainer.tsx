import { CartComponentInterface } from "../../../../interfaces"
import CartCard from "../../../Cards/CartCard"

interface props {
  components: CartComponentInterface[]

}

function CardsCartContainer({components}:props) {
  return (
    <div className="col-8 col-xxl-9 bg-light min-vh-100 rounded-3">
       {
        components.map((component:CartComponentInterface)=>{
          return (
            <CartCard 
            key={component._id}
            id={component._id} 
            price={component.price}
            image={component.image}
            quantity={component.quantity}
            stock={component.stock}
            title={component.title}
            />
          )
        })
       }
    </div>
  )
}
export default CardsCartContainer