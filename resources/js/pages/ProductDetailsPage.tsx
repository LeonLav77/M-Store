import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Button } from "../components/Button";
import "react-medium-image-zoom/dist/styles.css";
import "../../css/ProductPage.css";
import axios from "axios";
import { ItemsList } from "../components/ItemsList";

export const ProductDetailsPage = () => {
    const [relatedItems, setRelatedItems] = useState([]);
    const [relatedCategories, setRelatedCategories] = useState([]);
    const location = useLocation();
    const {
        item: {
            name,
            description,
            current_price,
            discount,
            images,
            category_id,
            id,
        },
    } = location.state;
    const [currentId, setCurrentId] = useState(0);
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    const getRelatedProducts = () => {
        return axios
            .get(`http://127.0.0.1:8000/api/relatedProducts/${id}`)
            .then((res) => setRelatedItems(res.data.data))
            .catch((err) => console.log(err));
    };

    const getCategories = () => {
        return axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((res: any) => setRelatedCategories(res.data))
            .catch((err) => console.log(err));
    };

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
        getCategories();
        getRelatedProducts();
    }, []);
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
                        className={
                            discount &&
                            !isZoomedIn &&
                            screenDimensions.screenWidth > 1132
                                ? "on_sale on_sale_main"
                                : "hide"
                        }
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
                    <span style={{ display: "flex" }}>
                        <h1 className="main_title">{name}</h1>
                        {screenDimensions.screenWidth < 1132 && (
                            <h3 className="on_sale on_sale_secondary">
                                ON SALE
                            </h3>
                        )}
                    </span>
                    <div>
                        <div className="product_info">
                            <span className="first_span">Label: </span>
                            <span>{name}</span>
                        </div>
                        <div className="product_info">
                            <span className="first_span">Category: </span>
                            <span>
                                {relatedCategories[category_id - 1]?.name}
                            </span>
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
                            type="submit"
                            style={{}}
                        />
                        <Button
                            title="Wishlist"
                            onClick={() => console.log("wishlist")}
                            type="submit"
                            style={{}}
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
                                            width: "350px",
                                            height: "150px",
                                            backgroundColor: "grey",
                                        }}
                                    >
                                        <h1>{item.name}</h1>
                                    </div>
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
                <ItemsList data={relatedItems} title="Related Items" />
            </div>
            <div className="related_categories_container">
                <ItemsList
                    data={relatedCategories}
                    title="Related Categories"
                />
            </div>
        </div>
    );
};
