import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    categories: [],
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
    },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
