import { configureStore } from "@reduxjs/toolkit";
import themeLanguageReducer from'../Slices/themelanslice' ;
import productReducer from '../Slices/productSlice';
import cartReducer from '../Slices/cartSlice'
import favourieReducer from '../Slices/favouriteSlice'
const store= configureStore(
  {
    reducer:{
      themeLanguage:themeLanguageReducer,
      products: productReducer,
      cart: cartReducer, 
      favourite:favourieReducer

    }
  }
)
export default store