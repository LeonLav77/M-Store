import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/productsDataSlice";
import { userSlice } from "../slices/userInfoSlice";
import { setUser } from "../slices/userInfoSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        userInfo: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});
