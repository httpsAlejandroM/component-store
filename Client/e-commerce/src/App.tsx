import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./views/Home/Home"
import Shop from "./views/Shop/Shop"
import Detail from "./views/Detail/Detail"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/shop" element={<Shop />} />
    <Route path={`/detail/:id`} element={<Detail />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
