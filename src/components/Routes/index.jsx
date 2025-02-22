import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import About from "../../pages/About"
import Furniture from "../../pages/Furniture"
import Contact from "../../pages/Contact"
import Signup from "../../pages/signup"
import ProductDetails from "../../pages/ProductDetails"
import Cart from "../../pages/Cart"
import Favourite from "../../pages/favourite"


const AllRoutes = () => {
  return (
  
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/furniture' element={<Furniture/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/furniture/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes