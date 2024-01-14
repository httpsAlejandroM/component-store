import {  useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import FavoriteCard from "../../Cards/FavoriteCard"
import CheckboxInput from "../../CheckboxInput"
import { updateState } from "../../../redux/slices/user.slice"
import { favoritesBDHandler } from "../../../utilities/componentsCartAndFavs"

function Favoritos() {
  const userInfo = useAppSelector((state) => state.userReducer)
  const [checkInputs, setCheckInputs] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const handleCheckboxChange = (event: any, componentId: string) => {
    if (checkInputs.includes(componentId)) {
      setCheckInputs(checkInputs.filter((id) => id !== componentId));
      event.target.checked = false
    } else {
      setCheckInputs([...checkInputs, componentId]);
      event.target.checked = true
    }
  };

  const checkedAllcheckbox = (event: any) => {
    if (checkInputs.length < userInfo.userInfo.favorites.length) {
      const componentsFavsId = userInfo.userInfo.favorites.map((component) => component._id)
      setCheckInputs(componentsFavsId)
      event.target.checked = false
    } else {
      setCheckInputs([])
      event.target.checked = false
    }
  }

  const removeSelectedHandler = () => {
    const filteredComponents = userInfo.userInfo.favorites.filter((component)=> !checkInputs.includes(component._id))
    userInfo.userInfo.id && favoritesBDHandler(userInfo.userInfo.id, checkInputs)
    filteredComponents &&  dispatch(updateState(filteredComponents))

  }

 const allCheckedCondition =  userInfo.userInfo.favorites.length === 0? false : checkInputs.length < userInfo.userInfo.favorites.length ? false : true
 
const favoritos = userInfo.userInfo.favorites

  return (
    <div className="container mb-5 mt-4">
      <h2 className="fs-3 mb-4 text-white">Favoritos</h2>
      <div className="d-flex flex-column bg-light rounded-3">
        <div className="d-flex flex-row align-items-center justify-content-between pt-3" id="headFavorites">
          <div className="d-flex gap-2 align-items-center ms-3">
            <CheckboxInput isChecked={allCheckedCondition} checkFunction={checkedAllcheckbox} containerStyle="ms-2 ms-sm-3 px-sm-3" inputStyle="border-2 border-dark-subtle" inputValue="Component" />
            <button 
            disabled={favoritos.length === 0? true : false}
            onClick={removeSelectedHandler}
            className="btn p-0 fs-6 btn-link link-offset col-10"
            title="Eliminar seleccionados"
            >Eliminar seleccionados</button>
          </div>
          <span className="fs-6 me-2 me-sm-4 ">{`Favoritos 1 - ${favoritos.length} de ${favoritos.length}`}</span>
        </div>
        <hr />
        {/* aca van las cartas */}
        <div className="container row ">
          {
            favoritos && favoritos.map((component, index) => {
              return (
                <div key={component._id}>
                  <div className="row col-12 align-items-center justify-content-center p-4">
                    <CheckboxInput isChecked={checkInputs.includes(component._id) ? true : false} checkFunction={handleCheckboxChange} containerStyle="col-1" inputStyle="border-2 border-dark-subtle" inputValue={component._id} />
                    <FavoriteCard containerStyle={`row col-11 col-lg-11 align-self-center justify-content-center favorite-card`} component={component} />
                  </div>
                  {favoritos && index !== favoritos.length - 1 ? <hr /> : null}
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