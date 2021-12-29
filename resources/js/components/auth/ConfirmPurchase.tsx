import React from "react";
import axios from "axios";

export const ConfirmPurchase = () => {
    const Cart = () =>
        axios({
            method: "get",
            url: "/api/cart",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    return (
        <div>
            <button onClick={() => Cart()}>Cart</button>
        </div>
    );
};
