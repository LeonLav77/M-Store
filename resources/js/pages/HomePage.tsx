import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
    const SLIDE_WIDTH = 0.85 * 0.75 * window.outerWidth;

    const fetchCategories = useFetchCategoriesQuery("categories");
    const [data, setData] = useState<any>([]);
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const getData = () => {
        return axios
            .get("http://127.0.0.1:8000/auth/user/two-factor-qr-code")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getData();
    }, []);
    useLayoutEffect(() => {
        const changeSlide = setInterval(() => {
            for (let i = 1; i <= 3; i++) {
                if (currentIndex >= 3) {
                    setCurrentIndex(1);
                    sliderRef.current.style.transform = `translateX(0px)`;
                    return;
                }
                setCurrentIndex(currentIndex + 1);
                sliderRef.current.style.transform = `translateX(-${
                    currentIndex * SLIDE_WIDTH
                }px)`;
                return;
            }
        }, 5000);
        return () => clearInterval(changeSlide);
    }, [currentIndex]);

    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to top left, #419f83, #097895)",
            }}
        >
            <div className="main_home_container">
                <Navbar />
                <div
                    style={{
                        margin: 30,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <h1 style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
                        Welcome to Yes
                    </h1>
                    <h3>we have no. But pizza jes.</h3>
                    <h3>Say no more, we have it all... BIČ</h3>
                </div>
                <div className="slider_container">
                    <div
                        style={{
                            width: "100%",
                            overflow: "hidden",
                            height: 650,
                        }}
                    >
                        <div
                            style={{
                                width: "fit-content",
                                height: "95%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    height: "100%",
                                    transition: "all 2s",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                                ref={sliderRef}
                            >
                                <div
                                    style={{
                                        width: SLIDE_WIDTH,
                                    }}
                                    // className="slide"
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: 500,
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "#0ED1A7",
                                            borderBottomLeftRadius: 15,
                                            borderBottomRightRadius: 15,
                                            zIndex: -1,
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <img
                                            src={
                                                require("../../images/login_bg1.jpg")
                                                    .default
                                            }
                                            alt=""
                                            width={350}
                                            height={500}
                                        />
                                        <div
                                            style={{
                                                width: "30%",
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                textAlign: "left",
                                            }}
                                        >
                                            <h1
                                                style={{
                                                    fontSize: 40,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Footwerar
                                            </h1>
                                            <h3>veri kull</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Nemo veritatis enim laboriosam
                                                soluta ratione nostrum,
                                                assumenda doloribus ea facere
                                                porro!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    // className="slide"
                                    style={{
                                        width: SLIDE_WIDTH,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: 500,
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "#0ED1A7",
                                            borderBottomLeftRadius: 15,
                                            borderBottomRightRadius: 15,
                                            zIndex: -1,
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={
                                                require("../../images/login_bg1.jpg")
                                                    .default
                                            }
                                            alt=""
                                            width={350}
                                            height={500}
                                        />
                                        <div
                                            style={{
                                                width: "40%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                marginInline: 40,
                                            }}
                                        >
                                            <h1
                                                style={{
                                                    fontSize: 40,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Footwerar
                                            </h1>
                                            <h3>veri kull</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Nemo veritatis enim laboriosam
                                                soluta ratione nostrum,
                                                assumenda doloribus ea facere
                                                porro!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    // className="slide"
                                    style={{
                                        width: SLIDE_WIDTH,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: 500,
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "#0ED1A7",
                                            borderBottomLeftRadius: 15,
                                            borderBottomRightRadius: 15,
                                            zIndex: -1,
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 20,
                                        }}
                                    >
                                        <img
                                            src={
                                                require("../../images/login_bg1.jpg")
                                                    .default
                                            }
                                            alt=""
                                            width={350}
                                            height={500}
                                        />
                                        <div
                                            style={{
                                                width: "40%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexDirection: "column",
                                                textAlign: "left",
                                                marginInline: 40,
                                            }}
                                        >
                                            <h1
                                                style={{
                                                    fontSize: 40,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Footwerar
                                            </h1>
                                            <h3>veri kull</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Nemo veritatis enim laboriosam
                                                soluta ratione nostrum,
                                                assumenda doloribus ea facere
                                                porro!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                background: "transparent",
                            }}
                        >
                            {Array(3)
                                .fill("")
                                .map((_, id) => (
                                    <div
                                        style={
                                            currentIndex - 1 == id
                                                ? {
                                                      backgroundColor: "gray",
                                                      width: 15,
                                                      height: 15,
                                                      borderRadius: "50%",
                                                      margin: 10,
                                                  }
                                                : {
                                                      backgroundColor:
                                                          "lightgray",
                                                      width: 15,
                                                      height: 15,
                                                      borderRadius: "50%",
                                                      margin: 10,
                                                  }
                                        }
                                        key={id}
                                        onClick={() => {
                                            setCurrentIndex(id + 1);
                                            sliderRef.current.style.transform = `translateX(-${
                                                id * SLIDE_WIDTH
                                            }px)`;
                                        }}
                                    ></div>
                                ))}
                        </div>
                    </div>
                    <button
                        className={currentIndex == 1 ? "smol_id" : "prev_btn"}
                        onClick={() => {
                            if (currentIndex <= 1) return;
                            setCurrentIndex(currentIndex - 1);
                            sliderRef.current.style.transform = `translateX(-${
                                (currentIndex - 2) * SLIDE_WIDTH
                            }px)`;
                        }}
                    >
                        <h1>&lt;</h1>
                    </button>
                    <button
                        className={currentIndex == 3 ? "big_id" : "next_btn"}
                        onClick={() => {
                            if (currentIndex >= 3) return;
                            setCurrentIndex(currentIndex + 1);
                            sliderRef.current.style.transform = `translateX(-${
                                currentIndex * SLIDE_WIDTH
                            }px)`;
                        }}
                    >
                        <h1>&gt;</h1>
                    </button>
                </div>
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
        </div>
    );
};
