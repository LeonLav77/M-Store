import React from "react";
import { Link } from "react-router-dom";

export const PasswordReset = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log(token);
    function handleSubmit() {
        console.log('submit');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <button onClick={() => {handleSubmit()}}>
                        {token}
                    </button>
                </div>
            </nav>
        </div>
    );
};
