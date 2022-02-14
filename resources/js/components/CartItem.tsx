import React, { useState, useEffect } from "react";
import { useDimensions } from "../hooks/useDimensions";
import axios from "axios";

export const CartItem = ({ cartItemData, removeFromCart }) => {
    const dimensions = useDimensions();
    const [quantityCounter, setQuantityCounter] = useState(
        cartItemData.quantity
    );
    const addItemToCart = (product_id, quantity) => {
        return axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/addItemToCart",
            data: {
                product_id,
                quantity,
            },
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <tr>
            <td>
                <img
                    src={cartItemData.product.images[0].path}
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
                <h1>{cartItemData.product.name}</h1>
                <button
                    onClick={() => {
                        console.log("cartItemData.product_id");
                        removeFromCart(cartItemData.product_id);
                    }}
                >
                    Remove item
                </button>
                {dimensions.screenWidth < 1000 && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <button
                                onClick={() => {
                                    addItemToCart(
                                        cartItemData.product_id,
                                        quantityCounter - 1
                                    );
                                    setQuantityCounter(quantityCounter - 1);
                                }}
                            >
                                -
                            </button>
                            <h5>{quantityCounter ?? cartItemData.quantity}</h5>
                            <button
                                onClick={() => {
                                    addItemToCart(
                                        cartItemData.product_id,
                                        quantityCounter + 1
                                    );
                                    setQuantityCounter(quantityCounter + 1);
                                }}
                            >
                                +
                            </button>
                        </div>
                        <div>
                            <h3>
                                {cartItemData.product.price + " Kn" ?? "Null"}
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
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <button
                                onClick={() => {
                                    addItemToCart(
                                        cartItemData.product_id,
                                        quantityCounter - 1
                                    );
                                    setQuantityCounter(quantityCounter - 1);
                                }}
                            >
                                -
                            </button>
                            <h5>{quantityCounter ?? cartItemData.quantity}</h5>
                            <button
                                onClick={() => {
                                    addItemToCart(
                                        cartItemData.product_id,
                                        quantityCounter + 1
                                    );
                                    setQuantityCounter(quantityCounter + 1);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </td>
                    <td style={{ display: "flex" }}>
                        <h3>{cartItemData.product.price + " Kn" ?? "Null"}</h3>
                    </td>
                </>
            )}
        </tr>
    );
};