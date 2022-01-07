import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: false,
    cart: [],
    cartStatus: null,
};

export const fetchUserCart = createAsyncThunk(
    "userInfo/cart",
    async (thunkAPI) => {
        let url = `http://127.0.0.1:8000/api/cart`;
        const response = await axios.get(url).then((res) => res.data);
        return response;
    }
);

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser(state, payload) {
            state.user = payload.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.pending, (state, action) => {
            state.cartStatus = "pending";
        });
        builder.addCase(fetchUserCart.rejected, (state, action) => {
            state.cartStatus = "reject";
        });
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.cart.push(action.payload);
            state.cartStatus = "fulfilled";
        });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
