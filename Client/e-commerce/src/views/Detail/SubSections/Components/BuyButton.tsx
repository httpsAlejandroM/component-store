import axios from "axios";
import { CartComponentInterface } from "../../../../interfaces"
import { API } from "../../../../redux/componentsApi/componentsApi";

interface props{
  component: CartComponentInterface
}

function BuyButton({component}:props) {

  const buyHandler = async () => {
    try {
     const redirectionToMP = await axios.post(`${API}/payments`,{
          items: [{
            id: component._id,
            title: component.title,
            quantity: component.quantity,
            unit_price: component.price,
          }]
      })
      
      window.location.href = redirectionToMP.data.data
  } catch (error) {
      console.log(error);
      
  } 
  }

  return (
    <button 
    className="btn btn-buy py-2 col-11 col-sm-8 fw-bolder"
    onClick={buyHandler}
    >Comprar ahora</button>
  )
}

export default BuyButton