import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    //NE KORISTIN
    //------------------
    filteredProducts: [],
    showFilteredProducts: false,
    status: null,
    //------------------
    recents: [],
    currentPage: 1,
    listStyle: "block",
    searchWord: "",
    fetchingProps: {
        //default
        domainName: "complexFilterSearch?productsPerPage=20",
        page: "1",
        params: { keyword: "" },
    },
    cartModified: 0,
    lastDomainPath: "",

    toggleStyle: false,
    //register
    //myb ne rabi global zavisi kada posalje mail
    userVerified: false,
};

//NE KORISITIN
//------------------------------------------------------------------------------------------
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
        const response = await axios.get(url);
        return response?.data;
    }
);
//------------------------------------------------------------------------------------------
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
            state.currentPage = action.payload;
        },
        toggleListStyle(state, action) {
            if (action.payload == "flex") state.listStyle = "flex";
            else state.listStyle = "block";
        },
        setFetchingProps(state, action) {
            state.fetchingProps.params = action.payload.params;
            state.fetchingProps.page = action.payload.page;
        },
        setSearchWord(state, action) {
            state.searchWord = action.payload;
        },
        setCartModified(state) {
            state.cartModified += 1;
        },
        setLastDomainPath(state, action) {
            state.lastDomainPath = action.payload;
        },
        setToggleStyle(state, action) {
            state.toggleStyle = action.payload;
        },
        userVerified(state) {
            state.userVerified = true;
        },
    },
    //NE KORISITIN
    //------------------------------------------------------------------------------------------
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
    //------------------------------------------------------------------------------------------
});

export const {
    setShowFilteredProducts,
    addToRecents,
    setFilteredProducts,
    setCurrentPage,
    toggleListStyle,
    setFetchingProps,
    setSearchWord,
    setCartModified,
    setLastDomainPath,
    setToggleStyle,
} = dataSlice.actions;
export default dataSlice.reducer;
