import { configureStore } from "@reduxjs/toolkit";
import themeLanguageReducer from'../Slices/themeslice' ;
import cartReducer from '../Slices/cartSlice'
import favourieReducer from '../Slices/favouriteSlice'
import categoryReducer from '../Slices/categoriesSlice';
import authReducer from '../Slices/AuthSlice'

const store= configureStore(
  {
    reducer:{
      themeLanguage:themeLanguageReducer,
      categories: categoryReducer,
      cart: cartReducer, 
      favourite:favourieReducer,
      auth:authReducer

    }
  }
)
export default store