import Loader from "../Loader"
import Carrito from "./UserSections/Carrito"
import Compras from "./UserSections/Compras"
import Favoritos from "./UserSections/Favoritos"
import MiPerfil from "./UserSections/MiPerfil"
import Opiniones from "./UserSections/Opiniones"
import Soporte from "./UserSections/Soporte"

export type userDashboardSections = "Compras" | "Opiniones" | "Favoritos" | "Carrito" | "Soporte" | "MiPerfil"

interface props {
  selectedContent: userDashboardSections
}

function Content({ selectedContent }: props) {

  const currentContent = {
    Compras: <Compras />,
    Opiniones: <Opiniones />,
    Favoritos: <Favoritos />,
    Carrito: <Carrito />,
    Soporte: <Soporte />,
    MiPerfil: <MiPerfil />
  }

  return (
    <section className="container content  mt-5">
      {currentContent[selectedContent] || <Loader/>}
    </section>
  )
}
export default Content