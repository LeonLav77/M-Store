import React from "react";
import $ from "jquery";

export const Login = () => {
    return (
        <div>
            <h1>An Email has been sent to your email address</h1>
            <p>If you havent received the email please click the link below</p>
            <button className="btn btn-primary" onClick={() => {
                $.ajax({
                    url: "/api/auth/resend-email",
                    method: "POST",
                    data: {
                        email: process.env.MIX_EMAIL,
                    },
                    success: (data) => {
                        console.log(data);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }}>Resend Email</button>
        </div>
    );
};
