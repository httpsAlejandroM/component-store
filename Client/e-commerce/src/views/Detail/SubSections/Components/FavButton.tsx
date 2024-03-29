import { ComponentInterface } from "../../../../interfaces"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { setFavorites } from "../../../../redux/slices/user.slice"
import { favoritesBDHandler } from "../../../../utilities/componentsCartAndFavs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface props {
    styles: string
    isFav?: boolean
    userId?: string
    componentFav: ComponentInterface
    setIsFav: Function
}

function FavButton({styles, isFav, componentFav, userId, setIsFav}:props) {

    const dispatch = useAppDispatch()
    const userIsAuth = useAppSelector((state)=>state.userReducer.isAuthenticated)

    const favToast = () => {
        if(!userIsAuth){
            toast.info(`Inicia sesión para agregar productos a Favoritos`, {
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
            toast.success(`${isFav ? `Se quitó ${componentFav.title} de Favoritos` : `Se agregó ${componentFav.title} a Favoritos`}`, {
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
      
    }

    const favHandler = () =>{
        dispatch(setFavorites({componentFav}))
        userId && favoritesBDHandler(userId, [componentFav._id])
        setIsFav(!isFav)
        favToast()
    }
 
    return (
        <div className={styles}>
              <ToastContainer />
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