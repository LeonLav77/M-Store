import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    filteredProducts: [],
    showFilteredProducts: false,
    status: null,
    recents: [],
    whatPage: "allProducts?page=1",
};

export const fetchFilteredProducts = createAsyncThunk(
    "products/fetchByKeyword",
    async (searchParameters: any, thunkAPI) => {
        let url = `http://127.0.0.1:8000/api/complexFilterSearch?max=${
            searchParameters.maxPrice ?? ""
        }&size=${searchParameters.size ?? ""}&condition=${
            searchParameters.condition ?? ""
        }&color=&countryOfManifacture=&seller=&discount=${
            searchParameters.discount ?? ""
        }&stock=&name=${searchParameters.keyword ?? ""}&category=${
            searchParameters.category ?? ""
        }`;
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
        addToRecents(state, action) {
            state.recents.push(action.payload);
        },
        setFilteredProducts(state, action) {
            state.filteredProducts = action.payload;
        },
        setCurrentPage(state, action) {
            state.whatPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProducts.pending, (state, action) => {
            state.showFilteredProducts = false;
            state.status = "pending";
        });
        builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
            state.showFilteredProducts = false;
            state.status = "rejected";
        });
        builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
            // Add user to the state array
            state.filteredProducts = action.payload;
            state.showFilteredProducts = true;
            state.status = "fulfilled";
        });
    },
});

export const {
    setShowFilteredProducts,
    addToRecents,
    setFilteredProducts,
    setCurrentPage,
} = dataSlice.actions;
export default dataSlice.reducer;
