import { CartComponentInterface } from "../../../../interfaces"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { setCart } from "../../../../redux/slices/user.slice"
import { getProductCartById, isStockSufficient, updateCartBD } from "../../../../utilities/cartHelpers"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface props {
  component: CartComponentInterface
}

function AddCart({ component }: props) {

  const userInfo = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const productInCart = getProductCartById(userInfo.userInfo.cart, component)
  const quantityInCart = productInCart && productInCart.quantity > 0 ? productInCart.quantity : 0
  const quantityTotal = quantityInCart + component.quantity

  const addButtonToastHandler = (booleano: boolean) => {
    if(!userInfo.isAuthenticated){
      toast.info(`Inicia sesión para agregar productos al Carrito`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    if (booleano) {
      userInfo.userInfo.id && updateCartBD(userInfo.userInfo.id, component._id, quantityTotal)
      toast.success(`Se agrego ${component.title} al carrito`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    else {
      toast.warning(`No hay stock suficiente para agregar al carrito`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const addComponentCart = () => {
    const hasSufficientStock = isStockSufficient(userInfo.userInfo.cart, component)
    if (hasSufficientStock) {
      dispatch(setCart({ cartComponent: component }))
      addButtonToastHandler(hasSufficientStock)
    }
    else {
      addButtonToastHandler(hasSufficientStock)
    }

  }

  return (
    <button onClick={addComponentCart} className="btn btn-add-cart py-2 px-0 col-11 col-sm-8 fw-bolder text-success-alpha">Agregar al carrito</button>
  )
}

export default AddCart