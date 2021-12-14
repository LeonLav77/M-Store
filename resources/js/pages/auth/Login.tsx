import React from "react";
import $ from "jquery";

export const Login = () => {
    function login() {
        $.ajax({
            method: "POST",
            url: "/auth/login",
            data: {
                email: "leonlav77@gmail.com",
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
        <div>
            <h1>Login Page</h1>
            <button
                onClick={() => {
                    login();
                }}
            >
                Login
            </button>
        </div>
    );
};
