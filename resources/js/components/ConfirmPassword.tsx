import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ConfirmPassword = () => {
    const navigate = useNavigate();
    const [falsePassword, setFalsePassword] = useState(false);
    function confirmPassword(): any {
        try {
            let response = axios({
                method: "post",
                url: "/auth/user/confirm-password",
                data: {
                    password: "password",
                    password_confirmation: "password",
                },
            })
                .then((result) => {
                    setFalsePassword(false);
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                    setFalsePassword(true);
                });
            return response;
        } catch (err) {
            return err;
        }
    }
    function enableTFA() {
        axios({
            method: "POST",
            url: "/auth/user/two-factor-authentication",
        })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err.responseJSON.message);
                console.log(err.status);
            });
    }
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "whitesmoke",
            }}
        >
            <div
                style={{
                    width: 400,
                    margin: 50,
                    height: 250,
                    backgroundColor: "#ebebeb",
                    borderRadius: 15,
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <h2 style={{ margin: 0 }}>Confirm Password</h2>
                <input
                    style={{ width: "70%", marginInline: "auto" }}
                    type="text"
                    placeholder="Password"
                ></input>
                <button
                    style={{ width: "70%", marginInline: "auto" }}
                    onClick={() => {
                        const tryPasswordConfirmation = async () => {
                            const results = await confirmPassword();
                            if (results.status == 201) {
                                await enableTFA();
                                navigate("/user_profile");
                            } else {
                                throw new Error("Wrong passworddd!");
                            }
                        };
                        tryPasswordConfirmation();
                    }}
                >
                    Confirm
                </button>
                {/* <button
                    onClick={() => {
                        enableTFA();
                    }}
                >
                    enable tafa
                </button> */}
            </div>
        </div>
    );
};
