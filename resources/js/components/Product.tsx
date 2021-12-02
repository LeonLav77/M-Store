import React from "react";
import { useLocation } from "react-router";

export const Product = () => {
    const location = useLocation();
    const {
        item: { name, description, currentPrice },
    } = location.state;
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <h3>{currentPrice.toFixed(2)}</h3>
        </div>
    );
};
