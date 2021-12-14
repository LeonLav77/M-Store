import React from "react";
import $ from "jquery";

export const Register = () => {
    function register() {
        $.ajax({
            method: "POST",
            url: "/auth/register",
            data: {
                email: "leonlav77@gmail.com",
                name: "leonlav77",
                password: "password",
                password_confirmation: "password",
            },
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
                window.location.href = "/";
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    return (
        <div>
            <h1>Register Page</h1>
            <button
                onClick={() => {
                    register();
                }}
            >
                Register
            </button>
        </div>
    );
};
