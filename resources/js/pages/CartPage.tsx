import React from "react";
import { Cart } from "../components/Cart";
import { Link } from "react-router-dom";

export const CartPage = () => {
    return (
        <div>
            <Cart />
            <Link to="/checkout">Go To Checkkout</Link>
        </div>
    );
};
