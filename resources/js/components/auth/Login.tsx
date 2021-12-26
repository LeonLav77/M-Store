import React from "react";
import "../../../css/components/Login.css";
import $ from "jquery";
import { Link } from "react-router-dom";

export const Login = () => {
    function login() {
        $.ajax({
            method: "POST",
            url: "/auth/login",
            data: {
                email: process.env.MIX_EMAIL,
                password: "password",
            },
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
                if (result.two_factor === true) {
                    // $("#loginModal").modal("hide");  PRIMJER
                    // $("#twoFactorModal").modal("show");
                    // redirect to TFA login
                    // <Redirect to={"/"} />
                    window.location.href = "/TFALogin";
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    return (
        <div className="login_container">
            <img
                src={require("../../../images/login_bg.jpg").default}
                alt=""
                height={"100%"}
                width={"55%"}
                style={{ borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}
                className="login_bg_img"
            />
            <div className="login_form">
                <h1>User Login</h1>
                <h4>Email</h4>
                <input type="email" id="" placeholder="Enter Email...." />
                <h4>Password</h4>
                <input type="password" id="" placeholder="Enter Password..." />
                <button
                    onClick={() => {
                        login();
                    }}
                >
                    Login
                </button>
                <h6>
                    <Link to="/register">Create Account...</Link>
                </h6>
            </div>
        </div>
    );
};
