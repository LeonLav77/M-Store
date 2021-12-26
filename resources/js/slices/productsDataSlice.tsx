import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
    }),
    endpoints: (builder) => {
        return {
            fetchProductsPerPage: builder.query({
                query: () => "allProductsWCP?productsPerPage=10",
            }),
            fetchCategories: builder.query({
                query: () => "categories",
            }),
            // fetchOnlyOnePerson: builder.query({
            //     query: (id) => `people/${id}`,
            // }),
        };
    },
});

export const { useFetchProductsPerPageQuery, useFetchCategoriesQuery } =
    apiSlice;
