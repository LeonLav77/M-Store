import React from "react";
import "../../css/components/Button.css";

export const Button = ({ title, onClick, type, style }) => {
    //button styles
    //danger-red
    //success-blue
    //submit-black/grey?
    //warning-yellow
    return (
        <div>
            <button type={type} onClick={onClick} style={style}>
                {title}
            </button>
        </div>
    );
};
