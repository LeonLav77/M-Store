import { skipToken } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { useFetchWishlistQuery } from "../slices/rtkQuerySlice";
import { Error } from "./Error";

export const Wishlist = () => {
    const [itemRemoved, setItemRemoved] = useState<any>("wishlist");
    const wishlistData = useFetchWishlistQuery(itemRemoved);
    const removeFromWishlist = (product_id) => {
        return axios({
            method: "delete",
            url: `/api/removeFromWishlist/${product_id}`,
        })
            .then((res) => {
                setItemRemoved(
                    itemRemoved == "wishlist" ? "wishlist " : "wishlist"
                );
                console.log(res.data);
                return res;
            })
            .catch((err) => err);
    };
    useEffect(
        () => console.log(wishlistData.data),
        [wishlistData.data, itemRemoved]
    );
    return (
        <>
            <div>
                {wishlistData.isError ? (
                    <Error showError={true} />
                ) : wishlistData.isLoading ? (
                    <h1>Loading...</h1>
                ) : wishlistData.data ? (
                    <div>
                        {wishlistData.data.length == 0 ? (
                            <h1>NO items in wishlist</h1>
                        ) : (
                            wishlistData.data.map((item, id) => (
                                <div key={id}>
                                    <h3>Product: {item.product_id}</h3>
                                    <button
                                        onClick={() =>
                                            removeFromWishlist(item.product_id)
                                        }
                                    >
                                        REmove item from list
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
};
