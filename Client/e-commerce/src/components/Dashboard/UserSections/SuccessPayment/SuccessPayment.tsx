import { useRef, useState } from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { getAccessToken } from "../../../../auth/AuthHelpers"

function SuccessPayment() {

  const userInfo = useAppSelector((state) => state.userReducer.userInfo)
  const [isOpen, setIsOpen] = useState(true)
  const modal = useRef<HTMLDivElement>(null)

  //Setear isOpen si el usuario realizo una orden de compra recientemente mostrar el modal
  if (modal.current) {
    modal.current.classList.add(`${isOpen ? "noShow" : "show"}`)
    modal.current.setAttribute("style", `${isOpen ? "display:none" : "display:block"}`)
    modal.current.setAttribute("aria-modal", `${isOpen ? "false" : "true"}`)
    modal.current.setAttribute("role", `${isOpen ? "" : "dialog"}`)
    modal.current.setAttribute("aria-hidden", `${isOpen ? "true" : "false"}`)
    if (!isOpen) {
      const backdropDiv = document.createElement("div")
      backdropDiv.classList.add("modal-backdrop","fade", "show");
      document.body.appendChild(backdropDiv);
    } else{
      const backdropDiv = document.querySelector(".modal-backdrop");
      if (backdropDiv) {
        document.body.removeChild(backdropDiv);
      }
    }
  }

  return (
    <>

      {/* <button onClick={() => setIsOpen(!isOpen)}>un boton random</button> */}
      <button onClick={()=>console.log(getAccessToken())}>isOpenButton</button>
      <div ref={modal} className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">¡Felicidades por tu Compra!</h1>
              <button type="button" onClick={() => setIsOpen(!isOpen)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pb-0">
              <p>
                {`¡Hola ${userInfo.name}!`}
              </p>
              <p>
                Gracias por elegirnos. Esperamos que disfrutes tu compra al máximo.

              </p>
              <p>
                Saludos.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={() => setIsOpen(!isOpen)} data-bs-dismiss="modal">Ver Compras</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SuccessPayment