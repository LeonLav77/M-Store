import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";
import "../../css/HomePage.css";
import { Navbar } from "../components/Navbar";
import { useFetchCategoriesQuery } from "../slices/productsDataSlice";
import { ItemsList } from "../components/ItemsList";
import { Link } from "react-router-dom";
export const HomePage = () => {
    // const value = useSelector((state: any) => state.user);
    const fetchCategories = useFetchCategoriesQuery("categories");
    const [data, setData] = useState<any>([]);
    const sliderRef = useRef(null);
    const getData = () => {
        return axios
            .get("http://127.0.0.1:8000/auth/user/two-factor-qr-code")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
        sliderRef.current.style.cursor = "grabbing";
        sliderRef.current.style.userSelect = "none";
        pos = {
            // The current scroll
            left: sliderRef.current.scrollLeft,
            top: sliderRef.current.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        sliderRef.current.scrollTop = pos.top - dy;
        sliderRef.current.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);

        sliderRef.current.style.cursor = "grab";
        sliderRef.current.style.removeProperty("user-select");
    };

    useEffect(() => {
        getData();
    }, []);
    function logout() {
        $.ajax({
            method: "POST",
            url: "/auth/logout",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function hasTFA() {
        $.ajax({
            method: "GET",
            url: "/api/hasTFAEnabled",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    function disableTFA() {
        $.ajax({
            method: "DELETE",
            url: "/auth/user/two-factor-authentication",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: (result) => {
                console.log(result);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    var stop = true;
    $(".draggable").on("drag", function (e) {
        stop = true;

        if (e.originalEvent.clientY < 150) {
            stop = false;
            scroll(-1);
        }

        if (e.originalEvent.clientY > $(window).height() - 150) {
            stop = false;
            scroll(1);
        }
    });

    $(".draggable").on("dragend", function (e) {
        stop = true;
    });

    var scroll = function (step) {
        var scrollY = $(window).scrollTop();
        $(window).scrollTop(scrollY + step);
        if (!stop) {
            setTimeout(function () {
                scroll(step);
            }, 20);
        }
    };

    return (
        <div className="main_home_container">
            <Navbar />
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <img
                    src={require("../../images/blob-haikei.svg").default}
                    alt=""
                    width={150}
                    height={150}
                />
                <img
                    src={require("../../images/login_bg1.jpg").default}
                    alt=""
                    width={150}
                    height={150}
                />
                <div className="container">
                    <Link className="navbar-brand" to="products">
                        Products
                    </Link>
                    <Link className="navbar-brand" to="testingUi">
                        TEstingUtr
                    </Link>
                    <Link className="navbar-brand" to="register">
                        Register
                    </Link>
                    <Link className="navbar-brand" to="login">
                        Login
                    </Link>
                    <button
                        onClick={() => {
                            hasTFA();
                        }}
                    >
                        TFA
                    </button>
                    <Link className="navbar-brand" to="TFAEnable">
                        Enable TFA
                    </Link>
                    <Link className="navbar-brand" to="TFADisable">
                        Disable TFA
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                        }}
                    >
                        logout
                    </button>
                    <Link to="ConfirmPurchase">Confirm purchase</Link>
                </div>
            </nav>
            <div key="main_container">
                <div> {ReactHtmlParser(data.svg)} </div>
            </div>
            {/* <div className="greetings_container">
                <div className="greetings_text">
                    <h1>Welcome to Yes</h1>
                    <p>we have no. But pizza jes.</p>
                    <p>Say no more, we have it all... BIČ</p>
                </div>
                <div className="main_top_products_slider_container">
                    <ScrollContainer
                        horizontal={false}
                        className="top_products_slider_container"
                    > */}
            {/* <div
                    className="top_products_slider_container draggable"
                    ref={sliderRef}
                > */}
            {/* <div
                            style={{ backgroundColor: "red", color: "white" }}
                            className="slide"
                        >
                            <h1>slide 1</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam officiis quasi
                                dolorem, labore ratione itaque? Ad deserunt
                                minus voluptate harum.
                            </p>
                        </div>
                        <div
                            className="slide"
                            style={{ backgroundColor: "blue", color: "white" }}
                        >
                            <h1>slide 2</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam officiis quasi
                                dolorem, labore ratione itaque? Ad deserunt
                                minus voluptate harum.
                            </p>
                        </div>
                        <div
                            className="slide"
                            style={{ backgroundColor: "green", color: "white" }}
                        >
                            <h1>slide 3</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam officiis quasi
                                dolorem, labore ratione itaque? Ad deserunt
                                minus voluptate harum.
                            </p>
                        </div>
                    </ScrollContainer>
                </div>
            </div> */}
            {/* </div> */}
            {fetchCategories.isLoading ? (
                <h1>Loading...</h1>
            ) : fetchCategories.error ? (
                <h1>Error...</h1>
            ) : (
                <div className="related_categories_container">
                    <ItemsList
                        data={fetchCategories.data}
                        title="Popoular Cateogires"
                    />
                </div>
            )}
            {fetchCategories.isLoading ? (
                <h1>Loading...</h1>
            ) : fetchCategories.error ? (
                <h1>Error...</h1>
            ) : (
                <div className="related_categories_container">
                    <ItemsList
                        data={fetchCategories.data}
                        title="Popoular Cateogires"
                    />
                </div>
            )}
        </div>
    );
};
