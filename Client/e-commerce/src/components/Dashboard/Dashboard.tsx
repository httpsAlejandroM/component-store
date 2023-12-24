import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import { PrivateRoutes } from "../../utilities/routes";
import Opiniones from "./UserSections/Opiniones";
import Favoritos from "./UserSections/Favoritos";
import Compras from "./UserSections/Compras";
import Carrito from "./UserSections/Carrito";
import Soporte from "./UserSections/Soporte";
import MiPerfil from "./UserSections/MiPerfil";

function Dashboard() {
//AGREGAR LAZY LOADING
//AGREGAR/SACAR FAVORITOS DE BACKEND
    
    return (
        <main className="min-vh-100 d-flex flex-row content">
           <Sidebar />
          <Routes>
            <Route path="/" element={<Compras/>}/>
              <Route path={PrivateRoutes.DASHBOARD_REVIEWS} element={<Opiniones />} />
              <Route path={PrivateRoutes.DASHBOARD_FAVORITES}  element={<Favoritos />}/>
              <Route path={PrivateRoutes.DASHBOARD_CART} element={<Carrito />} />
              <Route path={PrivateRoutes.DASHBOARD_SUPPORT}  element={<Soporte />}/>
              <Route path={PrivateRoutes.DASHBOARD_MY_PROFILE} element={<MiPerfil />} />
          </Routes>
        </main>
    )
}
export default Dashboard