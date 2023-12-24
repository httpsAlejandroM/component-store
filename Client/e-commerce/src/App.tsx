import { Routes, Route } from "react-router-dom"
import { lazy, Suspense, useEffect } from 'react';
import Loader from "./components/Loader";
import RouteNotFound from "./components/RouteNotFound";
import { PrivateRoutes, PublicRoutes } from "./utilities/routes";
import { checkAuth } from "./redux/slices/user.slice";
import { useAppDispatch } from "./redux/hooks";
const Footer = lazy(() => import('./components/Footer/Footer'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./views/Home/Home'));
const Shop = lazy(() => import('./views/Shop/Shop'));
const Detail = lazy(() => import('./views/Detail/Detail'));
const Support = lazy(() => import("./views/Support/Support"))
const SignUp = lazy(() => import("./components/Auth/SignUp"))
const Login = lazy(() => import("./components/Auth/Login"))
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"))
const AuthGuard = lazy(() => import("./components/AuthGuard"))

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path={PublicRoutes.HOME} element={<Home />} />
          <Route path="*" element={<RouteNotFound />} />
          <Route path={PublicRoutes.SHOP} element={<Shop />} />
          <Route path={`${PublicRoutes.DETAIL}/:id`} element={<Detail />} />
          <Route path={PublicRoutes.SUPPORT} element={<Support />} />
          <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.DASHBOARD+"/*"} element={<Dashboard />}/>
          </Route>
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App
