import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../../css/LoginPage.css";
import useAuth from "../../hooks/useAuth";
import { Error as ErrorMessage } from "../Error";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { useSelector } from "react-redux";

export function checkUser() {
    if (JSON.parse(localStorage.getItem("user"))) return true;
    else return false;
}
export const Login = () => {
    const [error, setError] = useState(false);
    const [showTFAChallenge, setShowTFAChallenge] = useState(false);
    const [TFAChallengeCode, setTFAChallengeCode] = useState("");
    const [showFalseInfoMsg, setShowFalseInfoMsg] = useState(false);

    const [falseTFACode, setFalseTFACode] = useState<boolean>(() =>
        JSON.parse(localStorage.getItem("local"))
    );

    const lastDomainPath = useSelector((state: any) =>
        state.productsData.lastDomainPath == ""
            ? "home"
            : state.productsData.lastDomainPath
    );
    const navigate = useNavigate();
    const { login, setUser } = useAuth();

    const beforeLogin = async () => {
        const resp = await login();
        if (resp.data?.two_factor == false) {
            setUser(true);
            navigate(`/${lastDomainPath}`);
        } else if (resp.data?.two_factor == true) {
            setShowTFAChallenge(true);
        } else {
            //wrong infos/not logged in
            setShowFalseInfoMsg(true);
            throw new Error("Failed to login!");
        }
    };

    const TFAChallenge = () => {
        axios({
            method: "post",
            url: "/auth/two-factor-challenge",
            data: {
                code:
                    TFAChallengeCode.length == 7
                        ? TFAChallengeCode.replace(" ", "")
                        : TFAChallengeCode,
            },
        })
            .then((res) => {
                if (res.statusText == "No Content") {
                    setFalseTFACode(false);
                    setTFAChallengeCode("");
                    setUser(true);
                    navigate(`/${lastDomainPath}`);
                }
            })
            .catch((err) => {
                setFalseTFACode(true);
                window.location.reload();
            });
    };
    useEffect(() => {
        const checkIfLogged = checkUser();
        if (checkIfLogged) navigate(`/${lastDomainPath}`);
    }, []);

    useEffect(() => {
        localStorage.setItem("local", JSON.stringify(falseTFACode));
        if (falseTFACode == true) beforeLogin();
    }, [falseTFACode]);

    return (
        <div className="main_login_container2">
            {error ? (
                <ErrorMessage showError={true} />
            ) : (
                <div>
                    {(showTFAChallenge || falseTFACode) && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 300,
                                backgroundColor: "whitesmoke",
                                border: "1px solid gray",
                                borderRadius: 10,
                                height: 300,
                                zIndex: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AiFillCloseCircle
                                style={{
                                    position: "absolute",
                                    top: "2%",
                                    right: "2%",
                                }}
                                onClick={() => {
                                    setShowTFAChallenge(false);
                                    setFalseTFACode(false);
                                }}
                                size={25}
                            />
                            <h2 style={{ marginBlock: 10 }}>Login With TFA</h2>
                            <div
                                style={{
                                    width: "90%",
                                    marginBlock: 10,
                                }}
                            >
                                <h5>TFA Challenge Code</h5>
                                <div style={{ width: "100%", display: "flex" }}>
                                    <input
                                        value={TFAChallengeCode}
                                        onChange={(e) => {
                                            if (e.target.value.length > 7)
                                                return;
                                            if (e.target.value.length == 3) {
                                                setTFAChallengeCode(
                                                    e.target.value + " "
                                                );
                                            } else {
                                                setTFAChallengeCode(
                                                    e.target.value
                                                );
                                            }
                                        }}
                                    />
                                    <button
                                        style={{ width: "30%" }}
                                        onClick={() => {
                                            TFAChallenge();
                                        }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                            <h6 style={{ margin: 0 }}>OR</h6>
                            <div style={{ width: "90%", marginBlock: 10 }}>
                                <h5>Recovery Codes</h5>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                    }}
                                >
                                    <input type="text" />
                                    <button style={{ width: "30%" }}>
                                        Send
                                    </button>
                                </div>
                            </div>
                            {/* {showFalseTFACode && (
                                <h5 style={{ marginInline: 20 }}>
                                    Code or Recovery Code is incorrect! Try
                                    Again...
                                </h5>
                            )} */}
                        </div>
                    )}
                </div>
            )}
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
                    {showFalseInfoMsg && (
                        <h6>Email or Password is incorrect! Try again...</h6>
                    )}
                    <button
                        className="login_submit_button"
                        onClick={() => {
                            beforeLogin();
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
            </div>
            <div className="login_container_shape"></div>
            <div className="login_container_shape2"></div>
            <div className="login_container_shape3"></div>
            <div className="login_container_shape4"></div>
        </div>
    );
};
