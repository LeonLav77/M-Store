// resources/assets/js/components/Header.js

import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <Link className="navbar-brand" to="nesto">
                        Tasksman
                    </Link>
                    <Link className="navbar-brand" to="miguel">
                        miguel
                    </Link>
                    <Link className="navbar-brand" to="products">
                        Products
                    </Link>
                </div>
            </nav>
        </div>
    );
};
