import React, { useState, useEffect } from "react";
import $ from "jquery";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

export const UserInfo = () => {
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
            },
        });
    }
    return (
        <div>
            <button
                onClick={() => {
                    getRecoveryCodes();
                }}
            >
                Get recovery codes
            </button>
            <div key="main_container">
                <div> {ReactHtmlParser(data.svg)} </div>
            </div>
        </div>
    );
};
