import { useEffect, useState } from "react"
import ShoppingCardsContainer from "./Compras/ShoppingCardsContainer"
import { getOrders } from "../../../utilities/getOrders"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import EmptyCart from "./Carrito/EmptyCart"
import { orderInterface } from "../../../interfaces/order.interface"
import { setOrders } from "../../../redux/slices/user.slice"
import Spinner from "../../Spinner"
// import SuccessPayment from "./SuccessPayment/SuccessPayment"

function Compras() {

    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    const userInfo = useAppSelector((state) => state.userReducer.userInfo)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true);
  
    const getUserOrders = async () => {
        if (userInfo?.id) {
                const ordenes = (await getOrders(userInfo.id)).data as orderInterface[]
                dispatch(setOrders({ orders: ordenes }))
                setLoading(false);   
        }
        return
    }

    useEffect(() => {
        getUserOrders();
    }, [isAuthenticated])

    return (
        <section className="container rounded-3 mt-4 mb-4">
            {/* <SuccessPayment/> */}
            <h2 className="col fs-3 mb-2 text-white text-start">Compras</h2>
            {
                loading
                    ? <Spinner styles={{ margin: "auto" }} />
                    : (userInfo.orders?.length
                        ? <ShoppingCardsContainer orders={userInfo.orders} />
                        : <EmptyCart textButton="Descubrir productos" className="content text-dark d-flex align-items-center justify-content-center">
                            <h2>Aún no tienes Compras</h2>
                            <p className="fs-6 text-center">¡Explora todos nuestros componentes!</p>
                        </EmptyCart>
                    )
            }
        </section>
    )
}
export default Compras