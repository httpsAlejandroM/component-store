import { useAppSelector } from "../../../redux/hooks"
import FavoriteCard from "../../Cards/FavoriteCard"
import CheckboxInput from "../../CheckboxInput"

function Favoritos() {

 const userInfo = useAppSelector((state)=>state.userReducer)

  return (
    <div className="container mb-5 mt-4">
      <h2 className="fs-3 mb-4 text-white">Favoritos</h2>
      <div className="d-flex flex-column bg-light rounded-3">
        <div className="d-flex flex-row justify-content-between pt-3">
          <div className="d-flex gap-2 align-items-center ms-4">
            <CheckboxInput containerStyle="ms-2"  inputStyle="border-2 border-dark-subtle" inputValue="Component" />
            <span className="fs-6">Eliminar favoritos seleccionados</span>
          </div>
          <span className="fs-6 me-4"> Favoritos 1 - 3 de 3</span>
        </div>
        <hr />
        {/* aca van las cartas */}
        <div className="container row">
          {
            userInfo.userInfo.favorites && userInfo.userInfo.favorites.map((component, index) => {
              return (
                <div key={component._id}>
                <div className="row col-12 align-items-center justify-content-center p-4">
                  <CheckboxInput containerStyle="col-1" inputStyle="border-2 border-dark-subtle" inputValue={component._id} />
                  <FavoriteCard containerStyle={`row col-11 align-self-center justify-content-center`} component={component}/>
                </div>
                {userInfo.userInfo.favorites && index !== userInfo.userInfo.favorites.length -1? <hr /> : null}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Favoritos