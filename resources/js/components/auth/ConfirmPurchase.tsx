import React from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";

export const ConfirmPurchase = () => {
    const Cart = () =>
        axios({
            method: "get",
            url: "/api/cart",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    function logout() {
        $.ajax({
            method: "POST",
            url: "/auth/logout",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function hasTFA() {
        $.ajax({
            method: "GET",
            url: "/api/hasTFAEnabled",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function disableTFA() {
        $.ajax({
            method: "DELETE",
            url: "/auth/user/two-factor-authentication",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    return (
        <div>
            <div className="container">
                <Link className="navbar-brand" to="products">
                    Products
                </Link>
                <Link className="navbar-brand" to="testingUi">
                    TEstingUtr
                </Link>
                <Link className="navbar-brand" to="register">
                    Register
                </Link>
                <Link className="navbar-brand" to="login">
                    Login
                </Link>
                <button
                    onClick={() => {
                        hasTFA();
                    }}
                >
                    TFA
                </button>
                <Link className="navbar-brand" to="TFAEnable">
                    Enable TFA
                </Link>
                <Link className="navbar-brand" to="TFADisable">
                    Disable TFA
                </Link>
                <button
                    onClick={() => {
                        logout();
                    }}
                >
                    logout
                </button>
                <Link to="ConfirmPurchase">Confirm purchase</Link>
            </div>
            <button onClick={() => Cart()}>Cart</button>
        </div>
    );
};
