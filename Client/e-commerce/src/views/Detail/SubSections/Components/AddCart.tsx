import { CartComponentInterface } from "../../../../interfaces"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { setCart } from "../../../../redux/slices/user.slice"
import { isStockSufficient } from "../../../../utilities/cartHelpers"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface props {
  component: CartComponentInterface
}

function AddCart({ component }: props) {

  const cartItems = useAppSelector((state) => state.userReducer.userInfo.cart)
  const dispatch = useAppDispatch()


  const addButtonToastHandler = (booleano: boolean) => {
    if (booleano) {
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
    const hasSufficientStock = isStockSufficient(cartItems, component)
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