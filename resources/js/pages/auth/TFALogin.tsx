import React from "react";
import $ from 'jquery';

export const TFALogin = () => {
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
    return (
        <div>
        <h1>Two Factor Authentication Login</h1>
        <input type="text" placeholder="Code"></input>
        <button onClick={() => {sendChallenge()}}>
            Send challenge
        </button>
        </div>
    );
};
