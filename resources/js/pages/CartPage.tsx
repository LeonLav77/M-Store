import React from "react";
import { Cart } from "../components/Cart";
import { Navbar } from "../components/Navbar";
import "../../css/CartPage.css";
import { CartSummary } from "../components/CartSummary";

export const CartPage = () => {
    return (
        <div>
            <Navbar />
            <div className="cart_container">
                <Cart />
                <CartSummary />
            </div>
        </div>
    );
};
