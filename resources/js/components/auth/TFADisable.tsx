import React from "react";
import $ from "jquery";

export const TFADisable = () => {
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
                console.log(error.responseJSON.message);
                console.log(error.status);
                if (
                    error.responseJSON.message ==
                        "Password confirmation required." &&
                    error.status == 423
                ) {
                    // $("#password-confirmation-required").show(); IDEAS
                    // SADA IDE NA DRUGI SCREEN ALI MOZE I SA MODALOM
                    // BITNO DA SALJE POST REQUEST
                    window.location.href = "/confirmPassword";
                }
            },
        });
    }
    return (
        <div>
            <h1>Disable two-factor authentication</h1>
            <button
                onClick={() => {
                    disableTFA();
                }}
            >
                Disable
            </button>
        </div>
    );
};
