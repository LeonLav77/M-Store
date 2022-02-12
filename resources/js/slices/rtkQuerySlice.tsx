import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
    }),
    endpoints: (builder) => {
        return {
            fetchProducts: builder.query({
                //?productsPerPage=xx --> ne dela
                query: ({
                    domainName = `complexFilterSearch?productsPerPage=20`,
                    page,
                    params,
                }) => {
                    let { keyword, ...rest } = params;
                    console.log(
                        `${domainName}&page=${page}&name=${keyword ?? ""}`
                    );
                    return `${domainName}&page=${page}&name=${keyword ?? ""}`;
                },
            }),
            fetchCategories: builder.query({
                query: () => "categories",
            }),
            fetchCart: builder.query({
                query: (broj = 0) => "cart",
            }),
            fetchWishlist: builder.query({
                query: (broj = 0) => "wishlist",
            }),
            // fetchOnlyOnePerson: builder.query({
            //     query: (id) => `people/${id}`,
            // }),
        };
    },
});

export const {
    useFetchProductsQuery,
    useFetchCategoriesQuery,
    useFetchCartQuery,
    useFetchWishlistQuery,
} = apiSlice;
