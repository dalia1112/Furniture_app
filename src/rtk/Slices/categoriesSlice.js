import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Axios/axiosinstance";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axiosInstance("/categories");
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    selectedCategoryItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedCategoryItems: (state, action) => {
      state.selectedCategoryItems = action.payload;
    },
    addProduct: (state, action) => {
      const { categoryId, product } = action.payload;
      const category = state.items.find((cat) => cat.id === categoryId);
      if (category) {
        category.items.push(product);
        if (state.selectedCategoryItems === category.items) {
          state.selectedCategoryItems = [...category.items];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategoryItems, addProduct } = categorySlice.actions;
export default categorySlice.reducer;
