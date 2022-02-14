import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "../slices/dataSlice";
import { apiSlice } from "../slices/rtkQuerySlice";
import { userSlice } from "../slices/userInfoSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        userInfo: userSlice.reducer,
        productsData: dataSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(
            apiSlice.middleware
        );
    },
});
