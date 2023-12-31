import { ComponentInterface } from "../../../../interfaces"
import { useAppDispatch } from "../../../../redux/hooks"
import { setFavOrCart } from "../../../../redux/slices/user.slice"
import { favoritesBDHandler } from "../../../../utilities/componentsCartAndFavs"

interface props {
    styles: string
    isFav?: boolean
    userId?: string
    componentFav: ComponentInterface
    setIsFav: Function
}

function FavButton({styles, isFav, componentFav, userId, setIsFav}:props) {

//AGREGAR TOAST CUIANDO SE AGREGA/QUITA DE FAVORITOS 
//
    const dispatch = useAppDispatch()

    const favHandler = () =>{
        dispatch(setFavOrCart({componentFav}))
        userId && favoritesBDHandler(userId, componentFav._id)
        setIsFav(!isFav)
    }
 
    return (
        <div className={styles}>
            <button className="btn btn-sm p-1 mt-2 mt-lg-0">
                <i className={`bi ${isFav ? "bi-heart-fill": "bi-heart"} fs-2 text-success-alpha`}
                onClick={favHandler}
                >

                </i>
            </button>
        </div>
    )
}

export default FavButton