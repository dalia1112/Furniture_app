import { createSlice } from "@reduxjs/toolkit";

const themeLanguageSlice = createSlice(
  {
    name:"themeLanguge",
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
export const {ToggleTheme,ChangLanguage} = themeLanguageSlice.actions
export default themeLanguageSlice.reducer