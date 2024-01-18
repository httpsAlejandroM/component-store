import { CartComponentInterface } from "../../../../interfaces"
import CartCard from "../../../Cards/CartCard"

interface props {
  components: CartComponentInterface[]

}

function CardsCartContainer({components}:props) {
  return (
    <div className="col col-lg-10 col-xl-8  offset-lg-1 offset-xl-0 bg-light rounded-3">
       {
        components.map((component:CartComponentInterface)=>{
          return (
           <div key={component._id} className="d-flex flex-column align-items-center justify-content-center">
            <CartCard 
            id={component._id} 
            price={component.price}
            image={component.image}
            quantity={component.quantity}
            stock={component.stock}
            title={component.title}
            />
            <hr className="col-12 p-0"/>
           </div>
          )
        })
       }
    </div>
  )
}
export default CardsCartContainer