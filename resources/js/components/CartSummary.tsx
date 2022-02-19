import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFetchCartQuery } from "../slices/rtkQuerySlice";
import "../../css/components/CartSummary.css";

export const CartSummary = () => {
    const [itemInCart, setItemsInCart] = useState<number | null>(null);
    const [totalItemsPrice, setTotalItemsPrice] = useState<number | null>(null);
    const cartData = useFetchCartQuery(0);
    const location = useLocation();
    const {
        data,
        isLoading,
        error,
    }: { data?: any[]; isLoading?: any; error?: any } = cartData;
    useEffect(() => {
        if (data == undefined) return;
        let totalItems = 0;
        let totalPrice = 0;
        for (let item of data) {
            totalItems += item.quantity;
            totalPrice += item.quantity * item.product.price;
        }
        setItemsInCart(totalItems);
        setTotalItemsPrice(totalPrice);
    }, [data]);
    return (
        <div
            className={
                location.pathname == "/checkout/order"
                    ? // location.pathname.startsWith("/checkout/order/")
                      "checkout_summary_container"
                    : "cart_summary_container"
            }
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    marginInline: "auto",
                }}
            >
                <h4>
                    Items(
                    {isLoading ? "..." : error ? "err" : itemInCart}
                    ):
                </h4>
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
                <h2>
                    {isLoading
                        ? "..."
                        : error
                        ? "err"
                        : totalItemsPrice?.toFixed(2)}
                    kn
                </h2>
            </div>
            {location.pathname.startsWith("/checkout/order/") ? (
                <button
                    style={{
                        width: "80%",
                        backgroundColor: "#333",
                        height: 50,
                        marginInline: "auto",
                    }}
                >
                    <Link
                        to="/products"
                        style={{ color: "white", listStyle: "none" }}
                    >
                        Go Back Shopping{" "}
                    </Link>
                </button>
            ) : (
                <button
                    style={{
                        width: "80%",
                        backgroundColor: "#333",
                        height: 50,
                        marginInline: "auto",
                    }}
                >
                    <Link
                        // to={`/checkout/order/${"" + Date.now()}`}
                        to={"/checkout/order"}
                        //myb to ne rabi
                        style={{ color: "white", listStyle: "none" }}
                    >
                        Go To Checkkout
                    </Link>
                </button>
            )}
        </div>
    );
};
