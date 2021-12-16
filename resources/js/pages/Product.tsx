import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Button } from "../components/Button";
import "react-medium-image-zoom/dist/styles.css";
import "../../css/ProductPage.css";

export const Product = () => {
    const [relatedItems, setRelatedItems] = useState(Array(9).fill(" "));
    const location = useLocation();
    const {
        item: { name, description, current_price, discount, images },
    } = location.state;
    const [currentId, setCurrentId] = useState(0);
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    const hideSlider = (e) => {
        if (e.target.classList.contains("overlay")) setIsZoomedIn(false);
        else return;
    };

    const getScreenDimensions = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        return { screenHeight, screenWidth };
    };
    const [screenDimensions, setScreenDimensions] = useState(
        getScreenDimensions()
    );
    useEffect(() => {
        function handleResize() {
            setScreenDimensions(getScreenDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [screenDimensions]);

    return (
        <div className="main_container">
            <div className="product_container">
                <div className="product_img_container">
                    {/* SALE / DISCOUNT */}
                    <div
                        className={discount && !isZoomedIn ? "on_sale" : "hide"}
                    >
                        <h1>ON SALE</h1>
                    </div>
                    <div
                        className={`zoom_in_icon ${isZoomedIn ? "hide" : ""}`}
                        onClick={() => setIsZoomedIn(true)}
                    >
                        <img
                            src={
                                require("../../images/search_icon.png").default
                            }
                            width="25"
                            height="25"
                        />
                    </div>
                    {/* OVERLAY / IMAGE iN CAONTEINER*/}
                    {isZoomedIn ? (
                        <div
                            className={`${isZoomedIn ? "overlay" : "hide"}`}
                            onClick={(e) => hideSlider(e)}
                        >
                            <div className="overlay_container">
                                <div className="arrow_container">
                                    <div
                                        className={
                                            currentId == 0
                                                ? "hide"
                                                : "left_arrow"
                                        }
                                        onClick={() => {
                                            if (currentId == 0) return;
                                            else setCurrentId(currentId - 1);
                                        }}
                                    ></div>
                                </div>
                                <img
                                    className="zoomed_image"
                                    src={images[currentId].path}
                                />
                                <div className="arrow_container">
                                    <div
                                        className={
                                            currentId == images.length - 1
                                                ? "hide"
                                                : "right_arrow"
                                        }
                                        onClick={() => {
                                            if (currentId == images.length - 1)
                                                return;
                                            else setCurrentId(currentId + 1);
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <img
                            className={`product_image`}
                            src={images[currentId].path}
                        />
                    )}
                    {/* SMOL IMAGES GALLERY */}
                    <div
                        style={
                            !isZoomedIn
                                ? { margin: 5, border: "2px solid black" }
                                : { display: "none" }
                        }
                    >
                        {images.map((image, id) => (
                            <img
                                key={id}
                                src={image.path}
                                className={`product_slider_image ${
                                    currentId == id ? "active" : ""
                                }`}
                                onClick={() => {
                                    setCurrentId(id);
                                }}
                                alt=""
                                width="50"
                                height="50"
                            />
                        ))}
                    </div>
                </div>
                {/* PRODUCT INFOS */}
                <div className="product_infos">
                    <h1 className="main_title">{name}</h1>
                    <div>
                        <div className="product_info">
                            <span className="first_span">Label: </span>
                            <span>{name}</span>
                        </div>
                        <div className="product_info">
                            <span className="first_span">Category: </span>
                            <span>category</span>
                        </div>
                        <div className="product_info">
                            <span className="first_span">Description:</span>
                            <span style={{ fontSize: 17 }}>{description}</span>
                        </div>
                    </div>
                    <h3 className="product_price">
                        <span className="current_price_span">
                            Current Price:
                        </span>{" "}
                        {discount ? (
                            <>
                                <span className="crossed">
                                    {current_price.toFixed(2)}
                                </span>
                                <span
                                    style={{
                                        letterSpacing: 2,
                                    }}
                                >
                                    {discount.discount.toFixed(2)} Kn
                                </span>
                            </>
                        ) : (
                            <span
                                style={{
                                    letterSpacing: 2,
                                }}
                            >
                                {current_price.toFixed(2)} Kn
                            </span>
                        )}
                    </h3>
                    {/* BUTTONS */}
                    <div className="product_buttons">
                        <Button
                            title="Add To Cart"
                            onClick={() => console.log("added to cart")}
                        />
                        <Button
                            title="Wishlist"
                            onClick={() => console.log("wishlist")}
                        />
                    </div>
                </div>
                {/* RELATED PRODUCTS FGALLEYRY */}
                <div
                    className={
                        screenDimensions.screenWidth > 1660
                            ? `related_products_container vertical_list`
                            : "hide"
                    }
                >
                    <h1 className="related_products_title">Related Items</h1>
                    <div className="related_products">
                        <div className="vertical">
                            {relatedItems.map((item, id) => {
                                return (
                                    <div
                                        key={id}
                                        style={{
                                            margin: 10,
                                            width: "250px",
                                            height: "150px",
                                            backgroundColor: "grey",
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={
                    screenDimensions.screenWidth < 1660
                        ? `related_products_container horizontal_list`
                        : "hide"
                }
            >
                <h1 className="related_products_title">Related Items</h1>
                <div className="related_products">
                    <div className="horizontal">
                        {relatedItems.map((item, id) => {
                            return (
                                <div
                                    key={id}
                                    style={{
                                        margin: 10,
                                        width: "250px",
                                        height: "150px",
                                        backgroundColor: "grey",
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
