import { ComponentInterface} from "../../interfaces"
import Card from "./Card"

interface arrComponents {
  data: ComponentInterface[]
}

function CardsContainer({data}:arrComponents) {



  return (
    <div className="row d-flex flex-row justify-content-center">
        {
            data && data.map((component: ComponentInterface) => {
                return (
                  
                    <Card 
                    key={component._id}
                    stock={component.stock}
                    title={component.title}
                    price={component.price}
                    image={component.image}
                    />    
                  
                )
            })
        }
    </div>
  )
}

export default CardsContainer