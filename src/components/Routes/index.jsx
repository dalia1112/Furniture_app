import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import Furniture from "../../pages/Furniture"
import Contact from "../../pages/Contact"
import Signup from "../../pages/signup"
import ProductDetails from "../../pages/ProductDetails"
import Cart from "../../pages/Cart"
import Favourite from "../../pages/favourite"
import Register from "../Register"

import ProtectedRoute from "../protectedRoute"
import AddProduct from "../../pages/addproduct"
import Login from "../Login"



const AllRoutes = () => {
  return (
  
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/furniture' element={<Furniture/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/furniture/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
          <AddProduct/>
          }
        />
    </Routes>
    </>
  )
}

export default AllRoutes