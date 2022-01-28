import React, { useState, useEffect } from "react";
import { ImCog, ImCart } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Button } from "./Button";
import "../../css/components/Navbar.css";
import { useDimensions } from "../hooks/useDimensions";
import { useDispatch } from "react-redux";
import { addToRecents, fetchFilteredProducts } from "../slices/dataSlice";
import { useDebounced } from "../hooks/useDebounced";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

export const Navbar = () => {
    const [keyword, setKeyword] = useState("");
    const { screenWidth, screenHeight } = useDimensions();
    const dispatch = useDispatch();
    const search = useDebounced(keyword, 500);
    const navigate = useNavigate();
    const [toggleTFAPopup, setToggleTFAPopup] = useState(false);

    function enableTFA() {
        $.ajax({
            method: "POST",
            url: "/auth/user/two-factor-authentication",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error.responseJSON.message);
                console.log(error.status);
            },
        });
    }
    return (
        <div className="navbar_container">
            {toggleTFAPopup && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(50%, 50%)",
                        backgroundColor: "red",
                        zIndex: 100,
                    }}
                >
                    <h1>Before you continue...</h1>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => navigate("/user_profile")}>
                            userprofuke
                        </button>
                        <button
                            onClick={() => {
                                enableTFA();
                                navigate("/confirmPassword");
                            }}
                        >
                            Enable TFA
                        </button>
                        <button onClick={() => setToggleTFAPopup(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {screenWidth >= 1250 && (
                <img
                    src={require("../../images/Mstore.png").default}
                    alt="store_logo"
                    width={200}
                    height={70}
                />
            )}
            <div className="search_bar">
                <input
                    type="text"
                    placeholder="yes"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
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
                    onClick={() => {
                        if (search != "") dispatch(addToRecents(search));
                        dispatch(fetchFilteredProducts({ keyword: search }));
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
                    <ImCart
                        size={25}
                        color="white"
                        onClick={() => navigate("/cart")}
                    />
                    <CgProfile
                        size={25}
                        color="white"
                        onClick={() => navigate("/products")}
                    />
                    <ImCog
                        size={25}
                        color="white"
                        onClick={() => setToggleTFAPopup(true)}
                    />
                </div>
            ) : null}
        </div>
    );
};
