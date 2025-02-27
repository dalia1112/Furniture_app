import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home"
import About from "../../pages/About"
import Furniture from "../../pages/Furniture"
import Contact from "../../pages/Contact"
import Signup from "../../pages/signup"
import ProductDetails from "../../pages/ProductDetails"
import Cart from "../../pages/Cart"
import Favourite from "../../pages/favourite"
import Register from "../Register"
import Login from "../Login"

import CreateAccountPage from "../../pages/account"
import AddProjectPage from "../../pages/addprojectpage"
import ProtectedRoute from "../protectedRoute"


const AllRoutes = () => {
  return (
  
    <>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/furniture' element={<Furniture/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/furniture/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/favourite' element={<Favourite/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route
          path="/create-account"
          element={
            <ProtectedRoute>
              <CreateAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <ProtectedRoute>
              <AddProjectPage />
            </ProtectedRoute>
          }
        />
    </Routes>
    </>
  )
}

export default AllRoutes