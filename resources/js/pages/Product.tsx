import React, { useState, useCallback } from "react";
import { useLocation } from "react-router";
import { Button } from "../components/Button";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
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

    return (
        <div className="main_container">
            <div className="product_container">
                <div className="product_img_container">
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
                    <div
                        className={`${isZoomedIn ? "overlay" : ""}`}
                        onClick={(e) => hideSlider(e)}
                    >
                        <img
                            className={`product_image ${
                                isZoomedIn ? "zoom_active" : ""
                            }`}
                            src={images[currentId].path}
                        />
                    </div>
                    <div
                        style={
                            !isZoomedIn
                                ? { margin: 5, border: "2px solid black" }
                                : { display: "none" }
                        }
                    >
                        {images.map((image, id) => (
                            <img
                                key={image.id}
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
            </div>
            <div
                className={`main_arrow_container left_arrow ${
                    isZoomedIn && currentId != 0 ? "" : "hide"
                }`}
                onClick={() => {
                    if (currentId == 0) return;
                    else setCurrentId(currentId - 1);
                }}
            >
                <div className="prev_slide"></div>
            </div>
            <div
                className={`main_arrow_container right_arrow ${
                    isZoomedIn && currentId < images.length - 1 ? "" : "hide"
                }`}
                onClick={() => {
                    if (currentId == images.length - 1) return;
                    else setCurrentId(currentId + 1);
                }}
            >
                <div className="next_slide"></div>
            </div>
            <div className="related_products_container">
                <h1 className="related_products_title">Related Items</h1>
                <div className="related_products">
                    <div>
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
