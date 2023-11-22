import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from 'react';
import Loader from "./components/Loader";
import RouteNotFound from "./components/RouteNotFound";
const Footer = lazy(() => import('./components/Footer/Footer'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./views/Home/Home'));
const Shop = lazy(() => import('./views/Shop/Shop'));
const Detail = lazy(() => import('./views/Detail/Detail'));
const Support = lazy(()=> import("./views/Support/Support"))

function App() {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<RouteNotFound/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path={`/detail/:id`} element={<Detail />} />
          <Route path={`/ayuda`} element={<Support />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App
