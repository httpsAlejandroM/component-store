import { ComponentInterface } from "../../interfaces"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFavOrCart } from "../../redux/slices/user.slice"
import { favoritesBDHandler } from "../../utilities/componentsCartAndFavs"

interface props {
    component: ComponentInterface
    containerStyle: string
}

function FavoriteCard({ containerStyle, component}:props) {

    const dispatch = useAppDispatch()

    const userInfo = useAppSelector((state)=> state.userReducer)

    const removeFavHandler = () => {
       userInfo.userInfo.id && favoritesBDHandler(userInfo.userInfo.id, component._id)
        dispatch(setFavOrCart({componentFav: component}))
    }

    return (
        <div className={`${containerStyle}`}>

            <div className="col-2 d-flex align-items-center justify-content-center">
            <img className="img-fluid col-12 align-self-center" src={component.image} alt={component.title} />
            </div>

           <div className="col align-self-center">
            <h3 className="fs-6">{component.title}</h3>
            <span className="fs-3">{`$${component.price}`}</span>
           </div>

           <div className="col-3 d-flex flex-column gap-3 align-self-center">
            <button className="btn btn-buy col-9">
            Agregar al Carrito
            </button>
            <button onClick={removeFavHandler} className="btn btn-outline-danger col-9">
                Eliminar
            </button>
           </div>
        </div>
    )
}
export default FavoriteCard