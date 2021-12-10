import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const login = () => {
        $.ajax({
            method: "POST",
            url: "/auth/login",
            data: {
                email: "leonlav77@gmail.com",
                password: "password"
                },
            dataType: "json", 
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            }
        });
    };

    function Login() {
        login();
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
                        
                    <button onClick={() => {Login()}}>
                        Login
                    </button>
                    <button onClick={() => {hasTFA()}}>
                        TFA
                    </button>
                    <button onClick={() => {enableTFA()}}>
                        ENABLE
                    </button>
                    <button onClick={() => {disableTFA()}}>
                        DISABLE
                    </button>
                    <button onClick={() => {confirmPassword()}}>
                        Confirm
                    </button>
                    <button onClick={() => {renderQRCode()}}>
                        QR Code
                    </button>
                </div>
            </nav>
                <div key="main_container">
                <div> { ReactHtmlParser (data.svg) } </div>
                </div>
        </div>
    );
};
