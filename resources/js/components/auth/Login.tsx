import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../../css/components/Login.css";
import useAuth from "../../hooks/useAuth";
import { Error as ErrorMessage } from "../Error";
import { useLocalStorage } from "react-use";

export const Login = () => {
    // const [showFalseTFACode, setShowFalseTFACode, remove] = useLocalStorage(
    //     "falseTFACode",
    //     false
    // );
    function useLocalState(bool) {
        const [myVal, setState] = useState(localStorage.getItem(bool));
        function setMyVal(newBool) {
            localStorage.setItem(bool, newBool);
            setState(newBool);
        }
        return [myVal, setMyVal];
    }
    const localData = useLocalState("false");
    const [error, setError] = useState(false);
    const [showTFAChallenge, setShowTFAChallenge] = useState(false);
    const [TFAChallengeCode, setTFAChallengeCode] = useState("");
    const [showFalseInfoMsg, setShowFalseInfoMsg] = useState(false);

    const navigate = useNavigate();
    const { login, logout, user, setUser } = useAuth();
    // const [isReady, cancel] = useTimeout(1000);

    const TFAChallenge = () =>
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
                console.log(TFAChallengeCode);
                if (res.statusText == "No Content") {
                    setTFAChallengeCode("");
                    setUser(true);
                    navigate("/home");
                }
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    console.log("BIC");
                    // window.location.reload();
                }
            });
    useEffect(() => {
        if (user) navigate("/home");
        logout();
    }, []);

    return (
        <div className="login_container">
            {error ? (
                <ErrorMessage showError={true} />
            ) : (
                <>
                    {showTFAChallenge && (
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
                                onClick={() => setShowTFAChallenge(false)}
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
                                        onClick={() => TFAChallenge()}
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
                        {showFalseInfoMsg && (
                            <h6>
                                Email or Password is incorrect! Try again...
                            </h6>
                        )}
                        <button
                            className="login_submit_button"
                            onClick={() => {
                                const nil = async () => {
                                    const resp = await login();
                                    console.log(resp);
                                    if (resp.data?.two_factor == false) {
                                        setUser(true);
                                        navigate("/home");
                                    } else if (resp.data?.two_factor == true) {
                                        setShowTFAChallenge(true);
                                    } else {
                                        //wrong infos/not logged in
                                        setShowFalseInfoMsg(true);
                                        throw new Error("Failed to login!");
                                    }
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
