import React, { useEffect } from "react";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";
import "../../css/CartPage.css";

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
    useEffect(() => {
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
                                    <td style={{ display: "flex" }}>
                                        <h1>{cartItem.product.name}</h1>
                                    </td>
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
                                            <button>-</button>
                                            <h5>{cartItem.quantity}</h5>
                                            <button>+</button>
                                        </div>
                                    </td>
                                    <td style={{ display: "flex" }}>
                                        <h3>
                                            {cartItem.product.price + " Kn" ??
                                                "Null"}
                                        </h3>
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
