import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";

//login cu nap s context-on a, register cu samo tamo s useState-ovima

const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("leonlav77@gmail.com");

    const [loggedIn, setLoggedIn] = useState(false);

    async function login() {
        async function loginUser() {
            try {
                const response = await axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/auth/login",
                    data: {
                        email: process.env.MIX_EMAIL,
                        password: "password",
                    },
                })
                    .then((res) => {
                        if (res.config.data) return true;
                        else return false;

                        // if (result.two_factor === true) {
                        // $("#loginModal").modal("hide");  PRIMJER
                        // $("#twoFactorModal").modal("show");
                        // redirect to TFA login
                        // <Redirect to={"/"} />
                        //     window.location.href = "/TFALogin";
                        // }
                        // console.log(res.config.data);
                        // console.log("LOGIN SUCCESS");
                    })
                    .catch((err) => {
                        console.log("LOIGN ERROR");
                    });
                return response;
            } catch {
                return false;
            }
        }
        const results = await loginUser();
        return results;
    }

    function register(formData) {
        axios({
            method: "post",
            url: "http://larareserve.ddns.net/register",
            data: formData,
        })
            .then((res) => {
                console.log("REGISTER SUCCESS");
            })
            .catch((err) => {
                console.log("REGISTER ERROR");
            });
    }

    function userInfo() {
        axios({
            method: "get",
            url: "http://larareserve.ddns.net/userInfo",
        })
            .then((res) => {
                console.log(res);
                // console.log("USER INFO SUCCESS");
            })
            .catch((err) => {
                console.log("USERINFO ERROR");
            });
    }

    function logout() {
        axios({
            method: "post",
            url: "http://larareserve.ddns.net/react/logout",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                console.log("LOGOUT SUCCESS");
            })
            .catch((err) => {
                console.log("LOGOUT ERROR");
            });
    }
    function isLoggedIn() {
        axios({
            method: "get",
            url: "http://larareserve.ddns.net/checkIfLoggedIn",
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const userInfos = useMemo(
        () => ({
            // password,
            // setPassword,
            // email,
            // setEmail,
            login,
            loggedIn,
            // register,
            // userInfo,
            // logout,
            // isLoggedIn,
        }),
        []
        // [password, setPassword, email, setEmail]
    );
    return (
        <AuthUserContext.Provider value={userInfos}>
            {children}
        </AuthUserContext.Provider>
    );
};

export interface AuthContextInterface {
    login?: () => any;
    loggedIn?: boolean;
}

export default function useAuth() {
    return useContext<AuthContextInterface>(AuthUserContext);
}
