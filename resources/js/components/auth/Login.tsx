import React, { useEffect, useState } from "react";
import "../../../css/components/Login.css";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { setDefaultResultOrder } from "dns";

export const Login = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
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
                        <h4>Email</h4>
                        <input
                            type="email"
                            id=""
                            placeholder="Enter Email...."
                        />
                        <h4>Password</h4>
                        <input
                            type="password"
                            id=""
                            placeholder="Enter Password..."
                        />
                        <button
                            onClick={async () => {
                                //if succ
                                const res = await login();
                                if (res) navigate("/products");
                                else setError(true);
                            }}
                        >
                            Login
                        </button>
                        <h6>
                            <Link to="/register">Create Account...</Link>
                        </h6>
                    </div>
                </>
            )}
        </div>
    );
};
