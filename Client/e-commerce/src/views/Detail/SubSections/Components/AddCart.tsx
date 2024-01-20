import { CartComponentInterface } from "../../../../interfaces"
import { useAppDispatch } from "../../../../redux/hooks"
import { setFavOrCart } from "../../../../redux/slices/user.slice"

interface props {
    component: CartComponentInterface
}

function AddCart({component}:props) {

const dispatch = useAppDispatch()

console.log(component);


const addComponentCart = () => {
    dispatch(setFavOrCart({cartComponent: component}))
}

  return (
    <button onClick={addComponentCart} className="btn btn-add-cart py-2 px-0 col-11 col-sm-8 fw-bolder text-success-alpha">Agregar al carrito</button>
  )
}

export default AddCart