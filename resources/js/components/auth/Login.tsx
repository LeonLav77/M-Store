import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/components/Login.css";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { login, logout, user, setUser } = useAuth();
    // const [isReady, cancel] = useTimeout(1000);
    useEffect(() => {
        console.log(user);

        if (user) navigate("/home");
        logout();
    }, []);

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
                            onClick={() => {
                                const nil = async () => {
                                    const resp = await login();
                                    console.log(resp);
                                    if (resp.statusText == "OK") {
                                        setUser(true);
                                        navigate("/home");
                                    } else throw new Error("BITHC!");
                                };
                                nil();
                            }}
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
