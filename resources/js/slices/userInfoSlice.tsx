import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
    categories: [],
};

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser(state, payload) {
            state.user = payload.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
