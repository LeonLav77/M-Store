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
            .then((res) => console.log(res.data))
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
    function addToCart() {
        $.ajax({
            method: "POST",
            url: "/api/addItemToCart",
            dataType: "json",
            data: {
                product_id: "2",
                quantity: "1",
            },
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function confirmPurchase() {
        $.ajax({
            method: "POST",
            url: "/api/confirmPurchase",
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
    // <script src="https://js.stripe.com/v3/"></script>
    $(document).ready(function () {
        console.log("ready!");
        // var stripe = Stripe('pk_test_51Jw50WDB0ZXzzlRgrPMcKbe72z3tlRuuOCikk9pfHRennyyvIh8ztZEOtG8shUKaxWbuU4Bfc5FPipBAy8ZYAh9P007llCXJzS');
    });

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
                <Link to="StripePage">Confirm purchase</Link>
            </div>
            <button onClick={() => Cart()}>Cart</button>
            <button onClick={() => addToCart()}>add Item To cart</button>
            {/* <form>
                <input type="text" name="username" placeholder="username" />
                
            </form> */}
            <br />
            <br />
            <br />
            <button onClick={() => confirmPurchase()}>Confirm purchase</button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <form>
                <div id="card-element"></div>
            </form>
        </div>
    );
};
