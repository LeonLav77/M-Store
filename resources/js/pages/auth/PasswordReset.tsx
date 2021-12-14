import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const PasswordReset = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    console.log(token);
    function handleSubmit() {
        console.log("submit");
        axios
            .post("/auth/reset-password", {
                email: email,
                token: token,
                password: "password1",
                password_confirmation: "password1",
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        {token}
                    </button>
                </div>
            </nav>
        </div>
    );
};
