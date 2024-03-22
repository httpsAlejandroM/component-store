import axios from "axios";
import { CartComponentInterface } from "../../../../interfaces"
import { API } from "../../../../redux/componentsApi/componentsApi";
import { useAppSelector } from "../../../../redux/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonHTMLAttributes, FC } from "react";


type BuyButtonComponent = ButtonHTMLAttributes<HTMLButtonElement> & {
  components: CartComponentInterface[]
}

const BuyButton:FC<BuyButtonComponent> = ({components, ...rest}) => {
  const userInfo = useAppSelector((state)=>state.userReducer.userInfo)
  const isAuthenticated = useAppSelector((state)=> state.userReducer.isAuthenticated)

  const buyHandler = async () => {
    if(!isAuthenticated){
      toast.info(`Inicia sesión para continuar con la compra`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
    try {
      const items = components.map((component: CartComponentInterface)=>{
        return {
          id: component._id,
          title: component.title,
          quantity: component.quantity,
          unit_price: component.price,
        }
      })
     const redirectionToMP = await axios.post(`${API}/payments`,{
          items,
          payer:{
            name: userInfo.name,
            surname: userInfo.userName,
            email: userInfo.email,
            address: {
              zip_code: 1615,
              street_name: "Kattegat",
              street_number: 1
            }
          }
      })
      
      window.location.href = redirectionToMP.data.data
  } catch (error) {
      console.log(error);
      
  }
}
  }

  return (
    <button {...rest}
    onClick={buyHandler}
    >Comprar ahora</button>
  )
}

export default BuyButton