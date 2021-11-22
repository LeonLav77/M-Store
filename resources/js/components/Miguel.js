import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Miguel = () => {
    return (
        <div>
            <h1>Miguel</h1>
            <Link to="drugi">go to drugi</Link>
            <Outlet />
        </div>
    );
};
