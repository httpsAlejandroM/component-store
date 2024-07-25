import { Routes, Route } from "react-router-dom"
import { lazy, Suspense, useEffect } from 'react';
import Loader from "./components/Loader";
import RouteNotFound from "./components/RouteNotFound";
import { PrivateRoutes, PublicRoutes } from "./utilities/routes";
import { checkAuth } from "./redux/slices/user.slice";
import { useAppDispatch } from "./redux/hooks";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SuccessBuy from "./components/SuccessBuy/SuccessBuy";
const Home = lazy(() => import('./views/Home/Home'));
const Shop = lazy(() => import('./views/Shop/Shop'));
const Detail = lazy(() => import('./views/Detail/Detail'));
const Support = lazy(() => import("./views/Support/Support"))
const SignUp = lazy(() => import("./components/Auth/SignUp"))
const Login = lazy(() => import("./components/Auth/Login"))
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"))
const AuthGuard = lazy(() => import("./components/AuthGuard"))
const Compras = lazy(() => import("./components/Dashboard/UserSections/Compras"))
const Opiniones = lazy(() => import("./components/Dashboard/UserSections/Opiniones"))
const Favoritos = lazy(() => import("./components/Dashboard/UserSections/Favoritos"))
const Carrito = lazy(() => import("./components/Dashboard/UserSections/Carrito/Carrito"))
const Soporte = lazy(() => import("./components/Dashboard/UserSections/Soporte"))
const MiPerfil = lazy(() => import("./components/Dashboard/UserSections/MiPerfil"))
//const SuccessPayment = lazy(()=> import("./components/Dashboard/UserSections/SuccessPayment/SuccessPayment"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const isSuccessPaymentRoute = location.pathname === `/${PrivateRoutes.SUCCESS_PAYMENT}`;

  return (
    <>
      <Suspense fallback={<Loader />}>
        {!isSuccessPaymentRoute && <Navbar />}
        <Routes>
          <Route path={PublicRoutes.HOME} element={<Home />} />
          <Route path="*" element={<RouteNotFound />} />
          <Route path={PublicRoutes.SHOP} element={<Shop />} />
          <Route path={`${PublicRoutes.DETAIL}/:id`} element={<Detail />} />
          <Route path={PublicRoutes.SUPPORT} element={<Support />} />
          <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />}>
            <Route element={<AuthGuard />}>
              <Route index path={PrivateRoutes.DASHBOARD_SHOPPING} element={<Compras />} />
              <Route path={PrivateRoutes.DASHBOARD_REVIEWS} element={<Opiniones />} />
              <Route path={PrivateRoutes.DASHBOARD_FAVORITES} element={<Favoritos />} />
              <Route path={PrivateRoutes.DASHBOARD_CART} element={<Carrito />} />
              <Route path={PrivateRoutes.DASHBOARD_SUPPORT} element={<Soporte />} />
              <Route path={PrivateRoutes.DASHBOARD_MY_PROFILE} element={<MiPerfil />} />
            </Route>
          </Route>
              <Route path={PrivateRoutes.SUCCESS_PAYMENT} element={<SuccessBuy />} />
        </Routes>
        {!isSuccessPaymentRoute && <Footer />}
      </Suspense>
    </>
  );
}

export default App
