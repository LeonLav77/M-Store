import React, { useState } from "react";
import { useLocation } from "react-router";
import "../../css/ProductPage.css";

export const Product = () => {
    const [relatedItems, setRelatedItems] = useState(Array(9).fill(" "));
    const location = useLocation();
    const {
        item: { name, description, current_price },
    } = location.state;
    return (
        <div className="main_container">
            <div className="product_container">
                <div className="product_img_container">
                    <div className="on_sale">
                        <h1>SALE</h1>
                    </div>
                    <div className="zoom_in_icon">
                        <img
                            src={
                                require("../../images/search_icon.png").default
                            }
                        />
                    </div>
                    <img className="product_image" src="#" />
                </div>
                <div className="product_info">
                    <h1 className="main">{name}</h1>
                    <div>
                        <h4>Label: {name}</h4>
                        <h4>Category: Category</h4>
                        <p>Description: {description}</p>
                    </div>
                    <h3>Current Price: {current_price.toFixed(2)} Kn</h3>
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
