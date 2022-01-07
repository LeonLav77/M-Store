import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../slices/userInfoSlice";
import axios from "axios";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";

export const Cart = () => {
    const cart = useSelector((state: any) => state.userInfo.cart);
    const cartStatus = useSelector((state: any) => state.userInfo.cartStatus);
    const dispatch = useDispatch();
    const cartData: any = useFetchCartQuery("cart");
    // const getCartData = () => {
    //     return axios
    //         .get("http://127.0.0.1:8000/api/cart")
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // };
    useEffect(() => {
        // getCartData();
        // dispatch(fetchUserCart());
        console.log(cartData.data);
    }, [cartData.isLoading]);

    return (
        <div style={{ width: "70%", marginLeft: 20 }}>
            <table cellPadding={20}>
                <thead>
                    <tr
                        style={{
                            padding: 20,
                            textAlign: "center",
                            justifyContent: "space-around",
                            fontSize: 24,
                        }}
                    >
                        <th style={{ minWidth: 200, width: 250 }}>Image</th>
                        <th style={{ minWidth: 200, width: 250 }}>Name</th>
                        <th style={{ minWidth: 300, width: 400 }}>Quantity</th>
                        <th style={{ minWidth: 200, width: 250 }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.isLoading ? (
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    ) : cartData.isError ? (
                        <tr>
                            <td>Erorr</td>
                        </tr>
                    ) : (
                        cartData.data.map((cartItem, id) => {
                            return (
                                <tr key={id}>
                                    <td>
                                        <img
                                            src="cartItemImg"
                                            alt=""
                                            height={150}
                                            width={150}
                                        />
                                    </td>
                                    <td style={{ display: "flex" }}>
                                        {cartItem.product_id}
                                    </td>
                                    <td
                                        style={{
                                            position: "relative",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "15%",
                                                left: "47%",
                                                transform: "rotateZ(-90deg)",
                                                fontSize: 36,
                                            }}
                                        >
                                            &gt;
                                        </div>
                                        {cartItem.quantity}
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "15%",
                                                left: "47%",
                                                transform: "rotateZ(90deg)",
                                                fontSize: 36,
                                            }}
                                        >
                                            &gt;
                                        </div>
                                    </td>
                                    <td style={{ display: "flex" }}>
                                        {cartItem.current_price ?? "Null"}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
};
