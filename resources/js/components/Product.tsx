import React, { useState } from "react";
import { useLocation } from "react-router";
import "../../css/ProductPage.css";

export const Product = () => {
    const [relatedItems, setRelatedItems] = useState(Array(9).fill(" "));
    const location = useLocation();
    const {
        item: { name, description, current_price, discount },
    } = location.state;
    return (
        <div className="main_container">
            <div className="product_container">
                <div className="product_img_container">
                    <div className={discount ? "on_sale" : "hide"}>
                        <h1>ON SALE</h1>
                    </div>
                    <div className="zoom_in_icon">
                        <img
                            src={
                                require("../../images/search_icon.png").default
                            }
                            width="25"
                            height="25"
                        />
                    </div>
                    <img className="product_image" src="#" />
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
                                <span>{discount.discount.toFixed(2)} Kn</span>
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
                        <button>Add To Cart</button>
                        <button>Wishlist</button>
                    </div>
                </div>
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
