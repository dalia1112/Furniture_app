import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice(
  {
    name:"theme",
    initialState:{
      theme:"light",
      languge:"EN"
    },
    reducers:{
      ToggleTheme:(state)=>{
        state.theme=state.theme=="light"?"dark":"light"
      } ,
      ChangLanguage:(state,action)=>{
        state.languge=action.payload
      }
   }
  }
)
export const {ToggleTheme,ChangLanguage} = themeSlice.actions
export default themeSlice.reducer