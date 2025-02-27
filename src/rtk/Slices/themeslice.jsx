import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice(
  {
    name:"theme",
    initialState:{
      theme:"light",
    
    },
    reducers:{
      ToggleTheme:(state)=>{
        state.theme=state.theme=="light"?"dark":"light"
      } 
      
   }
  }
)
export const {ToggleTheme} = themeSlice.actions
export default themeSlice.reducer