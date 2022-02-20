import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetchWishlistQuery } from "../slices/rtkQuerySlice";
import { Error } from "./Error";

export const Wishlist = () => {
    const [itemRemoved, setItemRemoved] = useState<number>(0);
    const wishlistData = useFetchWishlistQuery(itemRemoved);
    const removeFromWishlist = (product_id: number) => {
        return axios({
            method: "delete",
            url: `/api/removeFromWishlist/${product_id}`,
        })
            .then((res) => {
                setItemRemoved(itemRemoved + 1);
                return res;
            })
            .catch((err) => err);
    };
    useEffect(() => console.log(wishlistData.data), [itemRemoved]);
    return (
        <>
            <div>
                {wishlistData.isError ? (
                    <Error />
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
                                        onClick={() => {
                                            removeFromWishlist(item.product_id);
                                        }}
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
