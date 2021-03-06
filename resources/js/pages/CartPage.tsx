import React, { useEffect } from "react";
import { Cart } from "../components/Cart";
import { Navbar } from "../components/Navbar";
import "../../css/CartPage.css";
import { CartSummary } from "../components/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RootState, setLastDomainPath } from "../slices/dataSlice";

export const CartPage = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const toggleStyle = useSelector(
        (state: RootState) => state.productsData.toggleStyle
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/login");
        dispatch(setLastDomainPath("cart"));
    }, []);
    return (
        <div>
            <Navbar />
            <div
                className={`cart_container ${
                    toggleStyle ? "styleToggled" : ""
                }`}
            >
                <Cart />
                <CartSummary />
            </div>
        </div>
    );
};
