import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';

export const Home = () => {
    
    const [data, setData] = useState<any>([]);
    const getData = () => {
        return axios
        .get("http://127.0.0.1:8000/auth/user/two-factor-qr-code")
        .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);
    function getRecoveryCodes() {
        $.ajax({
            method: "GET",
            url: "/auth/user/two-factor-recovery-codes",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function sendChallenge() {
        $.ajax({
            method: "POST",
            url: "/auth/two-factor-challenge",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            data: {
                recovery_code: "m7V3ssG4kq-NpCzqnFcoU"
            },
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function logout() {
        $.ajax({
            method: "POST",
            url: "/auth/logout",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function hasTFA() {
        $.ajax({
            method: "GET",
            url: "/api/hasTFAEnabled",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function enableTFA() {
        $.ajax({
            method: "POST",
            url: "/auth/user/two-factor-authentication",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function confirmPassword() {
        $.ajax({
            method: "POST",
            url: "/auth/user/confirm-password",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            data: { 
                password: "password" ,
                password_confirmation: "password" 
            },
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function disableTFA() {
        $.ajax({
            method: "DELETE",
            url: "/auth/user/two-factor-authentication",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    function renderQRCode() {
        $.ajax({
            method: "GET",
            url: "/auth/user/two-factor-qr-code",
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to="products">
                        Products
                    </Link>
                    <Link className="navbar-brand" to="register">
                        Register
                    </Link>
                    <Link className="navbar-brand" to="login">
                        Login
                    </Link>
                    <button onClick={() => {hasTFA()}}>
                        TFA
                    </button>
                    <Link className="navbar-brand" to="TFAEnable">
                        Enable TFA
                    </Link>
                    <button onClick={() => {disableTFA()}}>
                        DISABLE
                    </button>
                    <button onClick={() => {confirmPassword()}}>
                        Confirm
                    </button>
                    <button onClick={() => {renderQRCode()}}>
                        QR Code
                    </button>
                    <button onClick={() => {logout()}}>
                        logout
                    </button>
                    <button onClick={() => {sendChallenge()}}>
                        Send challenge
                    </button>
                    <button onClick={() => {getRecoveryCodes()}}>
                        Get recovery codes
                    </button>
                </div>
            </nav>
                <div key="main_container">
                <div> { ReactHtmlParser (data.svg) } </div>
                </div>
        </div>
    );
};
