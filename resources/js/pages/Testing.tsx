import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import "../../css/Testing.css";
import { Link } from "react-router-dom";
// import axios from "axios";

export const Testing = () => {
    return (
        <div className="main_login_container2">
            <div className="login_form_wrapper">
                <div className="login_image_container">
                    <div className="login_image_container_overlay">
                        <div className="login_text_part">
                            <h1
                                style={{
                                    position: "relative",
                                    zIndex: 100,
                                    color: "whitesmoke",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    letterSpacing: 2,
                                    width: "70%",
                                    textAlign: "center",
                                }}
                            >
                                We keep our shit clean
                            </h1>
                            <p
                                style={{
                                    width: "70%",
                                    color: "whitesmoke",
                                    textAlign: "center",
                                    fontSize: 18,
                                }}
                            >
                                Join us before we get drafted for WW3. Keep It
                                Simple :)
                            </p>
                        </div>
                        <div className="socials">
                            <BsFacebook size={20} color="white" />
                            <BsTwitter size={20} color="white" />
                            <BsInstagram size={20} color="white" />
                        </div>
                    </div>
                    <div className="logo_image_container"></div>
                </div>
                <div className="login_form">
                    <h1>User Login</h1>
                    <div>
                        <h4>Email</h4>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="email"
                                id=""
                                placeholder="Enter Email...."
                            />
                        </div>
                    </div>
                    <div>
                        <h4>Password</h4>
                        <div className="wrap_input">
                            <input
                                className="form_input"
                                type="password"
                                id=""
                                placeholder="Enter Password..."
                            />
                        </div>
                    </div>
                    {/* {showFalseInfoMsg && (
                            <h6>
                                Email or Password is incorrect! Try again...
                            </h6>
                        )} */}
                    <button className="login_submit_button2">Login</button>
                    <h6>
                        First time here?{" "}
                        <Link to="/register" style={{ color: "#2a765f" }}>
                            Create Account...
                        </Link>
                    </h6>
                </div>
            </div>
            <div className="login_container_shape"></div>
            <div className="login_container_shape2"></div>
            <div className="login_container_shape3"></div>
            <div className="login_container_shape4"></div>
        </div>
    );
};
// const Login = () =>
//     axios({
//         method: "post",
//         url: "/auth/login",
//         data: {
//             email: process.env.MIX_EMAIL,
//             password: "password",
//         },
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
// const Logout = () =>
//     axios({
//         method: "post",
//         url: "/auth/logout",
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));

// const Check = () =>
//     axios({
//         method: "post",
//         url: "/api/checkIfLoggedIn",
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));

// const Register = () =>
//     axios({
//         method: "post",
//         url: "/auth/register",
//         data: {
//             name: "Leon",
//             email: process.env.MIX_EMAIL,
//             password: "password",
//             password_confirmation: "password",
//         },
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));

// const Cart = () =>
//     axios({
//         method: "get",
//         url: "/api/cart",
//     })
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
// return (
//     <div>
//         <button onClick={() => Login()}>Login</button>
//         <button onClick={() => Logout()}>Logout</button>
//         <button onClick={() => Check()}>Check</button>
//         <button onClick={() => Register()}>Register</button>
//         <button onClick={() => Cart()}>Cart</button>
//     </div>
// );
