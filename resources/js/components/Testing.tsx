import React from "react";
import axios from "axios";

export const Testing = () => {
    const Login = () =>
        axios
            .get("nisto")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    const Logout = () =>
        axios
            .get("nisto")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    const Check = () =>
        axios
            .get("nisto")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    const Register = () =>
        axios
            .get("nisto")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    const Cart = () =>
        axios
            .get("nisto")
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
