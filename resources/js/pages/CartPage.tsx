import React from "react";
import { Cart } from "../components/Cart";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../../css/CartPage.css";

export const CartPage = () => {
    return (
        <div>
            <Navbar />
            <div className="cart_container">
                <Cart />
                <div className="checkout_container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "90%",
                            marginInline: "auto",
                        }}
                    >
                        <h4>Item(1):</h4>
                        <h4> 20lkn</h4>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "90%",
                            marginInline: "auto",
                        }}
                    >
                        <h4>Shipping:</h4>
                        <h4> 3kn </h4>
                    </div>
                    <hr style={{ width: "90%", backgroundColor: "#333" }} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "90%",
                            marginInline: "auto",
                        }}
                    >
                        <h2>Total: </h2>
                        <h2>352kn</h2>
                    </div>
                    <button
                        style={{
                            width: "80%",
                            backgroundColor: "#333",
                            height: 50,
                            marginInline: "auto",
                        }}
                    >
                        <Link
                            to="/checkout"
                            style={{ color: "white", listStyle: "none" }}
                        >
                            Go To Checkkout
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
