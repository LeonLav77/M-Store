import React from "react";
import $ from "jquery";

export const ConfirmEmail = () => {
    return (
        <>
            <h3 style={{ width: "80%" }}>
                An Email has been sent to your email address
            </h3>
            <p style={{ width: "80%" }}>
                If you havent received the email please click the link below
            </p>
            <button
                onClick={() => {
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
                        },
                    });
                }}
            >
                Resend Email
            </button>
        </>
    );
};
