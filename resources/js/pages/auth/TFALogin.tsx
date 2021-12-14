import React from "react";
import $ from "jquery";

export const TFALogin = () => {
    function sendChallenge() {
        $.ajax({
            method: "POST",
            url: "/auth/two-factor-challenge",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: {
                code: $("#code").val(),
            },
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
            <h1>Two Factor Authentication Login</h1>
            <input type="text" placeholder="Code" id="code" name="code"></input>
            <button
                onClick={() => {
                    sendChallenge();
                }}
            >
                Send challenge
            </button>
        </div>
    );
};
