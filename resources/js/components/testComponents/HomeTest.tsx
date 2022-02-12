import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useDimensions } from "../../hooks/useDimensions";
import { Navbar } from "../Navbar";
import { Slider } from "../Slider";
import { ItemsList } from "../ItemsList";
import "../../../css/testComponents/HomeTest.css";
import { useFetchCategoriesQuery } from "../../slices/rtkQuerySlice";
import { Tag } from "../Tag";
import { CategoriesList } from "../CategoriesList";

export const HomeTest = () => {
    const dimensions = useDimensions();
    const SLIDE_WIDTH =
        dimensions.screenWidth < 550 ? 550 : 0.85 * dimensions.screenWidth;
    // const { user } = useAuth();
    // const navigate = useNavigate();
    const fetchCategories = useFetchCategoriesQuery("categories");
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    // useEffect(() => {
    //     if (!user) navigate("/login");
    // }, []);
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
                background:
                    "radial-gradient(rgba(5, 5, 5, 1), rgba(5, 5, 5, 0.9))",
            }}
        >
            <div className="main_home_container2">
                <Navbar />
                <div
                    style={{
                        margin: 30,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "center",
                    }}
                >
                    <h1 className="main_heading">Welcome to Yes</h1>
                    <h3>we have no. But pizza jes.</h3>
                    <h3>Say no more, we have it all... BIČ</h3>
                    <Tag title="See All Products" navigateTo="products" />
                </div>
                <Slider
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    sliderRef={sliderRef}
                    slideWidth={SLIDE_WIDTH}
                />
                <div className="routing_tags">
                    <h1 style={{ textAlign: "left", margin: 0 }}>
                        Routing Tags
                    </h1>
                    <div style={{ display: "flex", marginBlock: 20 }}>
                        <Tag title="All Products" navigateTo="products" />
                        <Tag title="Cart" navigateTo="cart" />
                        <Tag title="Wishlist" navigateTo="wishlist" />
                        <Tag title="User Profile" navigateTo="user_profile" />
                        <Tag title="Checkout" navigateTo="checkout" />
                    </div>
                </div>
                <br />
                {fetchCategories.isLoading ? (
                    <h1>Loading...</h1>
                ) : fetchCategories.error ? (
                    <h1>Error...</h1>
                ) : (
                    <>
                        <h1
                            style={{
                                margin: 0,
                                marginLeft: "2%",
                                textAlign: "left",
                                marginBottom: 20,
                            }}
                        >
                            Popoular Cateogires
                        </h1>
                        <div className="related_categories_container2">
                            <CategoriesList data={fetchCategories.data} />
                        </div>
                    </>
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
