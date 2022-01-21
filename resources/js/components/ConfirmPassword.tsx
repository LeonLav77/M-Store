import React from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export const ConfirmPassword = () => {
    const navigate = useNavigate();
    function confirmPassword() {
        $.ajax({
            method: "POST",
            url: "/auth/user/confirm-password",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: {
                password: "password",
                password_confirmation: "password",
            },
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function enableTFA() {
        $.ajax({
            method: "POST",
            url: "/auth/user/two-factor-authentication",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error.responseJSON.message);
                console.log(error.status);
            },
        });
    }
    return (
        <div>
            <h1>Confirm Password</h1>
            <input type="text" placeholder="Password"></input>
            <button
                onClick={() => {
                    confirmPassword();
                }}
            >
                Confirm
            </button>
            <button
                onClick={() => {
                    enableTFA();
                    navigate("/user_profile");
                }}
            >
                enable tafa
            </button>
        </div>
    );
};
