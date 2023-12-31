import { ComponentInterface } from "../../../../interfaces"
import { useAppDispatch } from "../../../../redux/hooks"
import { setFavOrCart } from "../../../../redux/slices/user.slice"

interface props {
    styles: string
    isFav?: boolean
    userId?: string
    componentFav: ComponentInterface
}

function FavButton({styles, isFav, componentFav, userId}:props) {

//AGREGAR LOS FAVS A LA BD
    const dispatch = useAppDispatch()

    const favHandler = () =>{
        dispatch(setFavOrCart({componentFav}))
    }
 
    return (
        <div className={styles}>
            <button className="btn btn-sm p-1 mt-2 mt-lg-0">
                <i className={`bi ${isFav ? "bi-heart-fill": "bi-heart"} fs-2 text-success-alpha`}
                onClick={()=>favHandler()}
                >

                </i>
            </button>
        </div>
    )
}

export default FavButton