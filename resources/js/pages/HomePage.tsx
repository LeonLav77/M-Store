import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import "../../css/HomePage.css";
import { Navbar } from "../components/Navbar";
import { useFetchCategoriesQuery } from "../slices/rtkQuerySlice";
import { ItemsList } from "../components/ItemsList";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Slider } from "../components/Slider";
import { useDimensions } from "../hooks/useDimensions";

export const HomePage = () => {
    const dimensions = useDimensions();
    const SLIDE_WIDTH =
        dimensions.screenWidth < 550 ? 550 : 0.85 * dimensions.screenWidth;
    const { user } = useAuth();
    const navigate = useNavigate();
    const fetchCategories = useFetchCategoriesQuery("categories");
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    useEffect(() => {
        // if (!user) navigate("/login");
        // getData();
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

    useEffect(() => {
        setCurrentIndex(1);
        sliderRef.current.style.transform = `translateX(0px)`;
    }, [SLIDE_WIDTH]);

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
                <Slider
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    sliderRef={sliderRef}
                    slideWidth={SLIDE_WIDTH}
                />
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
