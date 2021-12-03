import React from "react";
import { useLocation } from "react-router";
import "../../css/app.css";

export const Product = () => {
    const location = useLocation();
    const {
        item: { name, description, current_price },
    } = location.state;
    return (
        <div>
            <h1 className="main">{name}</h1>
            <p>{description}</p>
            <h3>{current_price.toFixed(2)}</h3>
        </div>
    );
};
