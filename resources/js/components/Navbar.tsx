import React, { useState, useEffect } from "react";
import { ImCog, ImCart } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Button } from "./Button";
import "../../css/components/Navbar.css";
import { useDimensions } from "../hooks/useDimensions";

export const Navbar = () => {
    const { screenWidth, screenHeight } = useDimensions();
    return (
        <div className="navbar_container">
            {screenWidth >= 1250 && (
                <img
                    src={require("../../images/Mstore.png").default}
                    alt="store_logo"
                    width={200}
                    height={70}
                />
            )}
            <div className="search_bar">
                <input type="text" placeholder="yes" />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingInline: 10,
                        border: "2px solid white",
                        borderLeft: "none",
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        height: 44,
                    }}
                >
                    <FaSearch size={25} color="white" />
                </div>
            </div>
            {/* tu je size a ne widht i heihgt */}
            {screenWidth >= 600 ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: 400,
                    }}
                >
                    <ImCart size={25} color="white" />
                    <CgProfile size={25} color="white" />
                    <ImCog size={25} color="white" />
                </div>
            ) : null}
        </div>
    );
};
