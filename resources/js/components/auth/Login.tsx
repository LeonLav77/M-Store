import React, { useEffect, useState } from "react";
import "../../../css/components/Login.css";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { setUser } from "../../slices/userInfoSlice";
import { useDispatch } from "react-redux";
import { useTimeout } from "react-use";
import axios from "axios";

export const Login = () => {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { login, user, setUser } = useAuth();
    const [isReady, cancel] = useTimeout(1000);
    useEffect(() => {
        const Logout = () =>
            axios({
                method: "post",
                url: "/auth/logout",
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        Logout();
    }, []);

    function login() {
        return axios({
            method: "post",
            url: "/auth/login",
            data: {
                email: process.env.MIX_EMAIL,
                password: "password",
            },
            headers: {
                contentType: "application/x-www-form-urlencoded",
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // function login() {
    //     $.ajax({
    //         method: "POST",
    //         url: "/auth/login",
    //         data: {
    //             email: process.env.MIX_EMAIL,
    //             password: "password",
    //         },
    //         dataType: "json",
    //         contentType: "application/x-www-form-urlencoded",
    //         success: (result) => {
    //             console.log(result);
    //             if (result.two_factor === true) {
    //                 // $("#loginModal").modal("hide");  PRIMJER
    //                 // $("#twoFactorModal").modal("show");
    //                 // redirect to TFA login
    //                 // <Redirect to={"/"} />
    //                 window.location.href = "/TFALogin";
    //             }
    //         },
    //         error: (error) => {
    //             console.log(error);
    //         },
    //     });
    // }
    return (
        <div className="login_container">
            {error ? (
                <h1 onClick={() => setError(false)}>Error...</h1>
            ) : (
                <>
                    <img
                        src={require("../../../images/login_bg.jpg").default}
                        alt=""
                        height={"100%"}
                        width={"55%"}
                        style={{
                            borderBottomLeftRadius: 15,
                            borderTopLeftRadius: 15,
                        }}
                        className="login_bg_img"
                    />
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
                        <button
                            className="login_submit_button"
                            // onClick={async () => {
                            //     //if succ
                            //     const res = await login();

                            //     if (res) {
                            //         if (isReady()) {
                            //             setUser(true);
                            //         }
                            //         // dispatch(setUser(true));
                            //         console.log(user);
                            //         navigate("/");
                            //     } else setError(true);
                            // }}
                            onClick={() => login()}
                        >
                            Login
                        </button>
                        <h6>
                            First time here?{" "}
                            <Link to="/register" style={{ color: "#2a765f" }}>
                                Create Account...
                            </Link>
                        </h6>
                    </div>
                </>
            )}
        </div>
    );
};
