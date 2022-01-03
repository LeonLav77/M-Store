import React, { useState } from "react";

export const Cart = () => {
    const [cart, setCart] = useState(Array(3).fill("item"));
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
                    {cart.map((cartItem, id) => {
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
                                <td style={{ display: "flex" }}>Item.Name</td>
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
                                    Item.Number
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
                                <td style={{ display: "flex" }}>Item.Price</td>
                            </tr>
                        );
                    })}
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
};
