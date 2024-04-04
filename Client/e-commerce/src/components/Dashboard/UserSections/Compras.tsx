import { useEffect, useState } from "react"
import { orderInterface } from "../../../interfaces/order.interface"
import ShoppingCardsContainer from "./Compras/ShoppingCardsContainer"
import { getOrders } from "../../../utilities/getOrders"
import { useAppSelector } from "../../../redux/hooks"
import EmptyCart from "./Carrito/EmptyCart"
// import SuccessPayment from "./SuccessPayment/SuccessPayment"

function Compras() {

    const userInfo = useAppSelector((state)=>state.userReducer.userInfo)
    const [ orders, setOrders ] = useState<orderInterface[]>([])

const getUserOrders = async () => {
    if(userInfo.id){
        const ordenes = await getOrders(userInfo.id)
        setOrders(ordenes.data) 
        return
    }
}

 useEffect(()=>{
 getUserOrders()
   
 },[])

    return (
        <section className="container mt-5 w-100 h-100 rounded-3">
            {/* <SuccessPayment/> */}
            <h2 className="col fs-3 mb-4 text-white text-start">Compras</h2>
            {
                orders?.length 
                ?<ShoppingCardsContainer orders={orders}/>
                : 
                <EmptyCart textButton="Descubrir productos" className="content text-dark d-flex align-items-center justify-content-center">
                <h2>Aún no tienes Compras</h2>
                <p className="fs-6 text-center">¡Explora todos nuestros componentes!</p>
              </EmptyCart>
            }
        </section>
    )
}
export default Compras