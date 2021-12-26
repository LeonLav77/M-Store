import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/productsDataSlice";
import { counterSlice } from "../slices/counterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter: counterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});
