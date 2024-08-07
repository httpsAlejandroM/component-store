import { CartComponentInterface } from "../../../../interfaces"
import CartCard from "../../../Cards/CartCard"

interface props {
  components: CartComponentInterface[]

}

const offsetsClass = "offset-1 offset-sm-0 offset-lg-1 offset-xl-0"
const colsClass = "col-10 col-sm-12 col-lg-10 col-xl-8"
const flexboxClass = "d-flex flex-column align-items-center justify-content-center  bg-light rounded-3 "

function CardsCartContainer({components}:props) {
  return (
    <div className={`${colsClass} ${offsetsClass} ${flexboxClass}`}>
       {
        components.map((component:CartComponentInterface, index: number)=>{
          return (
           <div key={component._id} className="col-12 d-flex flex-column align-items-center justify-content-center">
            <CartCard 
            id={component._id} 
            price={component.price}
            image={component.image}
            category={component.category}
            quantity={component.quantity}
            stock={component.stock}
            title={component.title}
            />
            {components.length && index !== components.length - 1 ?  <hr className="col-12 my-0 p-0 border-dark-subtle"/> : null}
           </div>
          )
        })
       }
    </div>
  )
}
export default CardsCartContainer