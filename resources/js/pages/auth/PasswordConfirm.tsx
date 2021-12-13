import React from "react";
import $ from 'jquery';

export const PasswordConfirm = () => {
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
    return (
        <div>
        <h1>Confirm Password</h1>
        <input type="text" placeholder="Password"></input>
        <button onClick={() => {confirmPassword()}}>
            Confirm
        </button>
        </div>
        
    );
};
