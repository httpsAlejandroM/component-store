import { CartComponentInterface } from "../../../../interfaces"
import CartCard from "../../../Cards/CartCard"

interface props {
  components: CartComponentInterface[]

}

function CardsCartContainer({components}:props) {
  return (
    <div className="col-10 offset-1 offset-sm-0 col-sm-12 col-lg-10 col-xl-8  offset-lg-1 offset-xl-0 bg-light rounded-3 align-items-center d-flex justify-content-center flex-column">
       {
        components.map((component:CartComponentInterface, index: number)=>{
          return (
           <div key={component._id} className="col-12 d-flex flex-column align-items-center justify-content-center">
            <CartCard 
            id={component._id} 
            price={component.price}
            image={component.image}
            quantity={component.quantity}
            stock={component.stock}
            title={component.title}
            />
            {components.length && index !== components.length - 1 ?  <hr className="col-12 my-0 p-0"/> : null}
           </div>
          )
        })
       }
    </div>
  )
}
export default CardsCartContainer