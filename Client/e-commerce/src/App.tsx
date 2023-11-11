import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from 'react';
import Loader from "./components/Loader";
const Footer = lazy(() => import('./components/Footer/Footer'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./views/Home/Home'));
const Shop = lazy(() => import('./views/Shop/Shop'));
const Detail = lazy(() => import('./views/Detail/Detail'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path={`/detail/:id`} element={<Detail />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App
