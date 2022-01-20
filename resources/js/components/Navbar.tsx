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

export const Navbar = () => {
    const [keyword, setKeyword] = useState("");
    const { screenWidth, screenHeight } = useDimensions();
    const dispatch = useDispatch();
    const search = useDebounced(keyword, 500);
    const navigate = useNavigate();

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
                    <ImCog size={25} color="white" />
                </div>
            ) : null}
        </div>
    );
};
