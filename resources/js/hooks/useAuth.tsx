import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";

//login cu nap s context-on a, register cu samo tamo s useState-ovima

const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("leonlav77@gmail.com");

    const [user, setUser] = useState(false);

    // async function login() {
    //     async function loginUser() {
    //         // axios.defaults.headers.common["X-Requested-With"] =
    //         //     "XMLHttpRequest";
    //         try {
    //             const response = await axios({
    //                 method: "post",
    //                 url: "http://127.0.0.1:8000/auth/login",
    //                 data: {
    //                     email: "ni9st",
    //                     password: "password",
    //                 },
    //                 headers: {
    //                     contentType: "application/x-www-form-urlencoded",
    //                     "X-Requested-With": "XMLHttpRequest",
    //                 },
    //             })
    //                 .then((res) => {
    //                     console.log(res);
    //                     if (res.config.data) {
    //                         setUser(true);
    //                         return true;
    //                     } else {
    //                         return false;
    //                     }

    //                     // if (result.two_factor === true) {
    //                     // $("#loginModal").modal("hide");  PRIMJER
    //                     // $("#twoFactorModal").modal("show");
    //                     // redirect to TFA login
    //                     // <Redirect to={"/"} />
    //                     //     window.location.href = "/TFALogin";
    //                     // }
    //                     // console.log(res.config.data);
    //                     // console.log("LOGIN SUCCESS");
    //                 })
    //                 .catch((err) => {
    //                     console.log("LOIGN ERROR");
    //                 });
    //             return response;
    //         } catch {
    //             return false;
    //         }
    //     }
    //     const results = await loginUser();
    //     return results;
    // }

    function login() {
        axios({
            method: "post",
            url: "http://larareserve.ddns.net/auth/login",
            data: {
                email: "ni9st",
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
            user,
            setUser,
            // register,
            // userInfo,
            // logout,
            // isLoggedIn,
        }),
        [user, setUser]
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
    user?: boolean;
    setUser?: (bool: boolean) => any;
}

export default function useAuth() {
    return useContext<AuthContextInterface>(AuthUserContext);
}
