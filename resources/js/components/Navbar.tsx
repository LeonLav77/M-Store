import React, { useState } from "react";
import { ImCog, ImCart } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import "../../css/components/Navbar.css";
import { useDimensions } from "../hooks/useDimensions";
import { useDispatch, useSelector } from "react-redux";
import {
    addToRecents,
    setFetchingProps,
    setLastDomainPath,
    setSearchWord,
    setToggleStyle,
} from "../slices/dataSlice";
import { useDebounced } from "../hooks/useDebounced";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import useAuth from "../hooks/useAuth";
import { setUser } from "../slices/userInfoSlice";

export const Navbar = () => {
    const [keyword, setKeyword] = useState("");
    const { screenWidth, screenHeight } = useDimensions();
    const dispatch = useDispatch();
    const { logout, setUser } = useAuth();
    const search = useDebounced(keyword, 500);
    const navigate = useNavigate();
    const [toggleTFAPopup, setToggleTFAPopup] = useState(false);
    const currentPage = useSelector(
        (state: any) => state.productsData.currentPage
    );
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

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
    //overflow handling -> toggle popup u global state
    return (
        <>
            {showSettingsDropdown && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    onClick={() => setShowSettingsDropdown(false)}
                ></div>
            )}
            {toggleTFAPopup && (
                <div className="tfa_popup_overlay">
                    <div
                        style={{
                            position: "absolute",
                            borderRadius: 20,
                            backgroundColor: "#ebebeb",
                            zIndex: 100,
                            width: 500,
                            height: 300,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 20,
                            // border: "2px solid rgb(65, 159, 131)",
                            // boxShado w: "0px 1px 15px 5px rgb(65, 159, 131)",
                        }}
                    >
                        <h1>Before you continue...</h1>
                        <p>Enable TFA for an additional layer of protection</p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                width: "80%",
                                marginInline: "auto",
                            }}
                        >
                            <button
                                onClick={() => {
                                    enableTFA();
                                    navigate("/confirmPassword");
                                }}
                            >
                                Enable TFA
                            </button>
                            <button
                                onClick={() => {
                                    setToggleTFAPopup(false);
                                    dispatch(setToggleStyle(false));
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="navbar_container">
                {screenWidth >= 1250 && (
                    <img
                        src={require("../../images/Mstore.png").default}
                        alt="store_logo"
                        width={200}
                        height={70}
                        onClick={() => navigate("/home")}
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
                        className="search_bar_submit"
                        onClick={() => {
                            dispatch(setSearchWord(search));
                            if (search != "") dispatch(addToRecents(search));
                            dispatch(
                                setFetchingProps({
                                    page: currentPage,
                                    params: { keyword },
                                })
                                // setCurrentPage(currentPage + `&name=${search}`)
                            );
                            setKeyword("");
                            // dispatch(
                            //     fetchFilteredProducts({
                            //         keyword: search,
                            //         // +
                            //         // `&page=${
                            //         //     currentPage
                            //         //         .split("?")[1]
                            //         //         .split("=")[1]
                            //         // }`,
                            //         // "&page=1",
                            //     })
                            // );
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
                            onClick={() => {
                                navigate("/cart");
                            }}
                        />
                        <CgProfile
                            size={25}
                            color="white"
                            onClick={() => {
                                setToggleTFAPopup(true);
                                dispatch(setToggleStyle(true));
                            }}
                        />
                        <ImCog
                            title="settings"
                            size={25}
                            color="white"
                            //show dropdown
                            onClick={() => setShowSettingsDropdown(true)}
                        />
                    </div>
                ) : null}

                {showSettingsDropdown && (
                    <div className="settings_dropdown">
                        <div style={{ position: "relative" }}>
                            <ul className="settings_dropdown_list">
                                <li onClick={() => navigate("/products")}>
                                    All Products
                                </li>
                                <li onClick={() => navigate("/wishlist")}>
                                    Wishlist
                                </li>
                                <li>Last Viewed</li>
                                <li>buy again</li>
                                <li
                                    onClick={() => {
                                        setUser(false);
                                        logout();
                                        navigate("/login");
                                        dispatch(setLastDomainPath("home"));
                                    }}
                                >
                                    Logout
                                </li>
                                {/* if seller */}
                                {/* <li>selling</li>
                            <li>bids/offers</li> */}
                            </ul>
                            <div className="settings_dropdown_shape"></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
