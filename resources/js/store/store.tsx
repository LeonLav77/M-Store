import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../counter/productsDataSlice";
import { counterSlice } from "../counter/counterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter: counterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});
