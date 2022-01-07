import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filteredProducts: [],
    showFilteredProducts: false,
    status: null,
};

export const fetchProductsByKeyword = createAsyncThunk(
    "products/fetchByKeyword",
    async (keyword: string, thunkAPI) => {
        let url = `http://127.0.0.1:8000/api/complexFilterSearch?name=${keyword}`;
        console.log(url);
        const response = await axios.get(url);
        return response?.data;
    }
);

export const dataSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setShowFilteredProducts(state) {
            state.showFilteredProducts = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsByKeyword.pending, (state, action) => {
            state.showFilteredProducts = false;
            state.status = "pending";
        });
        builder.addCase(fetchProductsByKeyword.rejected, (state, action) => {
            state.showFilteredProducts = false;
            state.status = "rejected";
        });
        builder.addCase(fetchProductsByKeyword.fulfilled, (state, action) => {
            // Add user to the state array
            state.filteredProducts.push(action.payload);
            state.showFilteredProducts = true;
            state.status = "fulfilled";
        });
    },
});

export const { setShowFilteredProducts } = dataSlice.actions;
export default dataSlice.reducer;
