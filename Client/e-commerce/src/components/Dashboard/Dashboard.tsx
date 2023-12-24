import { Outlet, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "../../utilities/routes";
import { lazy, Suspense } from "react";
import Loader from "../Loader";
import Sidebar from "./Sidebar";
const Compras = lazy(()=> import("./UserSections/Compras"))
const Opiniones = lazy(()=> import("./UserSections/Opiniones"))
const Favoritos = lazy(()=>import("./UserSections/Favoritos"))
const Carrito = lazy(()=>import("./UserSections/Carrito"))
const Soporte = lazy(()=>import("./UserSections/Soporte"))
const MiPerfil = lazy(()=>import("./UserSections/MiPerfil"))

function Dashboard() {
//AGREGAR LAZY LOADING
//AGREGAR/SACAR FAVORITOS DE BACKEND
//RESPONSE FAVORITE COMPONENT
    
    return (
      <Suspense fallback={<Loader/>}>
        <main className="min-vh-100 d-flex flex-row content">
           <Sidebar />
           <Outlet/>
          <Routes>
            <Route path={PrivateRoutes.DASHBOARD_SHOPPING} element={<Compras/>}/>
              <Route path={PrivateRoutes.DASHBOARD_REVIEWS} element={<Opiniones />} />
              <Route path={PrivateRoutes.DASHBOARD_FAVORITES}  element={<Favoritos />}/>
              <Route path={PrivateRoutes.DASHBOARD_CART} element={<Carrito />} />
              <Route path={PrivateRoutes.DASHBOARD_SUPPORT}  element={<Soporte />}/>
              <Route path={PrivateRoutes.DASHBOARD_MY_PROFILE} element={<MiPerfil />} />
          </Routes>
        </main>
        </Suspense>
    )
}
export default Dashboard