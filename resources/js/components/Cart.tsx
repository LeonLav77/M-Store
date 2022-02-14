import React, { useEffect, useState } from "react";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";
import "../../css/CartPage.css";
import { useDimensions } from "../hooks/useDimensions";
import axios from "axios";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setCartModified } from "../slices/dataSlice";

//nanovo
// interface CartDataInterface {
//     cart_id: number;
//     created_at: string;
//     current_price: null | number;
//     id: number;
//     product_id: number;
//     quantity: number;
//     updated_at: string;
// }

export const Cart = () => {
    const itemRemoved = useSelector(
        (state: any) => state.productsData.cartModified
    );
    // const [itemRemoved, setItemRemoved] = useState(0);
    const dispatch = useDispatch();
    const cartData = useFetchCartQuery(itemRemoved);
    const {
        data,
        isLoading,
        error,
    }: { data?: any[]; isLoading?: any; error?: any } = cartData;
    const dimensions = useDimensions();
    const clearCart = () => {
        return axios({
            method: "delete",
            url: "/api/emptyCart",
        })
            .then((res) => {
                // setItemRemoved(itemRemoved + 1);
                dispatch(setCartModified());
                console.log(res.data);
            })
            .catch((err) => err);
    };
    const removeFromCart = (product_id) => {
        return axios({
            method: "delete",
            url: `/api/itemFromCart/${product_id}`,
            data: {
                product_id,
            },
        })
            .then((res) => {
                dispatch(setCartModified());
                // setItemRemoved(itemRemoved + 1);
                console.log(res.data);
                return res;
            })
            .catch((err) => err);
    };
    useEffect(() => console.log(data), [itemRemoved]);
    return (
        <div style={{ width: "70%", marginLeft: 20 }}>
            <table cellPadding={20}>
                <thead
                    style={
                        dimensions.screenWidth < 1000
                            ? { display: "none" }
                            : null
                    }
                >
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
                    {isLoading ? (
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td>Erorr</td>
                        </tr>
                    ) : data.length == 0 ? (
                        <tr>
                            <td>
                                <h1>NO items in cart...</h1>
                            </td>
                        </tr>
                    ) : (
                        data.map((cartItemData, id) => (
                            <CartItem
                                cartItemData={cartItemData}
                                key={id}
                                removeFromCart={removeFromCart}
                            />
                        ))
                    )}
                    <tr></tr>
                </tbody>
            </table>
            <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
    );
};
