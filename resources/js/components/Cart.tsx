import React, { useEffect } from "react";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";
import "../../css/CartPage.css";
import { useDimensions } from "../hooks/useDimensions";
import axios from "axios";

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
    const cartData = useFetchCartQuery("cart");
    const {
        data,
        isLoading,
        error,
    }: { data?: any[]; isLoading?: any; error?: any } = cartData;
    const dimensions = useDimensions();
    useEffect(() => console.log(data), [data]);
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
                    ) : (
                        data.map((cartItem, id: number) => {
                            return (
                                <tr key={id}>
                                    <td>
                                        <img
                                            src={
                                                cartItem.product.images[0].path
                                            }
                                            alt=""
                                            height={150}
                                            width={150}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <h1>{cartItem.product.name}</h1>
                                        {dimensions.screenWidth < 1000 && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <div
                                                    style={{ display: "flex" }}
                                                >
                                                    <button>-</button>
                                                    <h5>{cartItem.quantity}</h5>
                                                    <button>+</button>
                                                </div>
                                                <div>
                                                    <h3>
                                                        {cartItem.product
                                                            .price + " Kn" ??
                                                            "Null"}
                                                    </h3>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    {dimensions.screenWidth > 1000 && (
                                        <>
                                            <td
                                                style={{
                                                    position: "relative",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 20,
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <button>-</button>
                                                    <h5>{cartItem.quantity}</h5>
                                                    <button>+</button>
                                                </div>
                                            </td>
                                            <td style={{ display: "flex" }}>
                                                <h3>
                                                    {cartItem.product.price +
                                                        " Kn" ?? "Null"}
                                                </h3>
                                            </td>
                                        </>
                                    )}
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
