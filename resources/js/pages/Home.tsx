import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import ReactHtmlParser from "react-html-parser";

export const Home = () => {
    const [data, setData] = useState<any>([]);
    const getData = () => {
        return axios
            .get("http://127.0.0.1:8000/auth/user/two-factor-qr-code")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);
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
            },
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
            },
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
            },
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
                    <button
                        onClick={() => {
                            hasTFA();
                        }}
                    >
                        TFA
                    </button>
                    <Link className="navbar-brand" to="TFAEnable">
                        Enable TFA
                    </Link>
                    <Link className="navbar-brand" to="TFADisable">
                        Disable TFA
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                        }}
                    >
                        logout
                    </button>
                </div>
            </nav>
            <div key="main_container">
                <div> {ReactHtmlParser(data.svg)} </div>
            </div>
        </div>
    );
};
