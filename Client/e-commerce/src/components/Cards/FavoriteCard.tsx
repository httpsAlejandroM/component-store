import { Link } from "react-router-dom"
import { ComponentInterface } from "../../interfaces"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFavorites } from "../../redux/slices/user.slice"
import { favoritesBDHandler } from "../../utilities/componentsCartAndFavs"
import { PublicRoutes } from "../../utilities/routes"

interface props {
    component: ComponentInterface
    containerStyle: string
}

function FavoriteCard({ containerStyle, component }: props) {

    const dispatch = useAppDispatch()

    const userInfo = useAppSelector((state) => state.userReducer)

    const removeFavHandler = () => {
        userInfo.userInfo.id && favoritesBDHandler(userInfo.userInfo.id, [component._id])
        dispatch(setFavorites({ componentFav: component }))
    }

    return (
        <div className={`${containerStyle} `}>

            <div className="col-10 col-sm-6 col-lg-2 d-flex  align-items-center justify-content-center order-sm-1 order-1">
                <Link to={`${PublicRoutes.DETAIL}/${component._id}`}>
                    <img className="img-fluid col-12 align-self-center" src={component.image} alt={component.title} />
                </Link>

            </div>

            <div className="col-12 col-sm-6 col-lg align-self-center order-sm-2 order-0">
                <h3 className="fs-6">{component.title}</h3>
                <span className="fs-3">{`$${component.price}`}</span>
            </div>

            <div className="col-12 col-sm-10 col-lg-4 col-xxl-3 d-flex flex-column gap-3 align-self-center order-sm-3 order-2">
                <button className="btn btn-buy col col-xl-10">
                    Agregar al Carrito
                </button>
                <button onClick={removeFavHandler} className="btn btn-outline-danger col col-xl-10">
                    Eliminar
                </button>
            </div>
        </div>
    )
}
export default FavoriteCard