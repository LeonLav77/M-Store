import React from "react";
import axios from "axios";

export const Testing = () => {
    const Login = () =>
        axios({
            method: "post",
            url: "/auth/login",
            data: {
                email: "leonlav77@gmail.com",
                password: "password",
            },
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    const Logout = () =>
        axios({
            method: "post",
            url: "/auth/logout",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    const Check = () =>
        axios({
            method: "post",
            url: "/api/checkIfLoggedIn",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    const Register = () =>
        axios({
            method: "post",
            url: "/auth/register",
            data: {
                name: "Leon",
                email: "leonlav77@gmail.com",
                password: "password",
                password_confirmation: "password",
            },
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

    const Cart = () =>
        axios({
            method: "get",
            url: "/api/cart",
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    return (
        <div>
            <button onClick={() => Login()}>Login</button>
            <button onClick={() => Logout()}>Logout</button>
            <button onClick={() => Check()}>Check</button>
            <button onClick={() => Register()}>Register</button>
            <button onClick={() => Cart()}>Cart</button>
        </div>
    );
};
