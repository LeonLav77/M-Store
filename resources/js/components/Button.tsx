import React from "react";

export const Button = ({ title, onClick }) => {
    return (
        <div>
            <button onClick={onClick}>{title}</button>
        </div>
    );
};
