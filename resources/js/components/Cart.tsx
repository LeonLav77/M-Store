import React, { useEffect } from "react";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";
import "../../css/CartPage.css";

interface CartDataInterface {
    cart_id: number;
    created_at: string;
    current_price: null | number;
    id: number;
    product_id: number;
    quantity: number;
    updated_at: string;
}

export const Cart = () => {
    const cartData = useFetchCartQuery("cart");
    const {
        data,
        isLoading,
        error,
    }: { data?: CartDataInterface[]; isLoading?: any; error?: any } = cartData;
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
